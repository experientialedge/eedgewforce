import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';
import { db } from '../config/database.js';
import { locationService } from './locationService.js';
import { calculateHaversineDistance, validateCoordinates } from '../utils/haversine.js';

const secret = () => process.env.JWT_SECRET || '3458929f44e69c199398c77212600d9f760aabb9b1dda42680556892307277ea';
const fail = (message, code = 'LOCATION_REQUIRED', status = 403) => { throw Object.assign(new Error(message), { code, status }); };
export const workplaceRadius = location => String(location.location_type).toLowerCase() === 'market' ? 300 : Number(location.geofence_radius || location.geofence_radius_meters || 150);
export const workplaceAccessService = {
  enabled() { return process.env.WORKFORCE_GEOFENCE_ENFORCED === 'true'; },
  applies(user, employee) { return this.enabled() && !['SUPER_ADMIN','ADMIN','IT_ADMIN','HR','HR_MANAGER','CEO','CTO'].includes(String(user.role_code).toUpperCase()); },
  async challenge(result) {
    if (!this.applies(result.user, result.user.employee)) return result;
    const employee = result.user.employee;
    if (!employee || employee.status !== 'active') fail('HR must link an active staff profile and assign a workstation before sign-in.');
    const permitted = await locationService.getActivePermittedLocations(employee.id, result.user.company_id);
    if (!permitted.length) fail('HR must assign an active workstation before you can sign in.');
    const nonce = randomUUID();
    const session = await db.insert('workforce_access_sessions', { company_id: result.user.company_id, user_id: result.user.id, employee_id: employee.id, token_id: nonce, state: 'pending', expires_at: new Date(Date.now()+300000).toISOString(), created_at: new Date().toISOString() });
    return { location_required: true, challenge: jwt.sign({ userId: result.user.id, companyId: result.user.company_id, sessionId: session.id, nonce, token_use: 'location_challenge' }, secret(), { issuer: 'edgewforce-location-challenge', expiresIn: '5m' }), message: 'Verify your location inside an assigned workstation to complete sign-in.' };
  },
  async observation(employee, input, now = Date.now(), anchorLocationId = null) {
    const coordinates = validateCoordinates(input.latitude,input.longitude), accuracy = Number(input.accuracy);
    if (!coordinates.valid || input.accuracy == null || !Number.isFinite(accuracy) || accuracy<0 || accuracy>100) fail('A precise GPS fix within ±100 metres is required. Enable precise location and move closer to the workstation.', 'GPS_UNCERTAIN',400);
    if (!Number.isFinite(input.timestamp) || Math.abs(now-input.timestamp)>60000) fail('The GPS fix is stale. Get a fresh location and try again.', 'GPS_STALE',400);
    const locations = (await locationService.getActivePermittedLocations(employee.id,employee.company_id)).filter(l=>!anchorLocationId||Number(l.id)===Number(anchorLocationId));
    if (!locations.length) fail('No active workstation is assigned. Contact HR.');
    const measures = locations.map(l=>({ location:l, distance:calculateHaversineDistance(coordinates.latitude,coordinates.longitude,l.latitude,l.longitude), radius:workplaceRadius(l) }));
    const inside = measures.find(m=>m.distance+accuracy<=m.radius);
    const outside = measures.every(m=>m.distance-accuracy>m.radius);
    const nearest = measures.sort((a,b)=>a.distance-b.distance)[0];
    const known = (await db.find('work_locations',{company_id:Number(employee.company_id),status:'active'})).map(l=>({location:l,distance:calculateHaversineDistance(coordinates.latitude,coordinates.longitude,l.latitude,l.longitude)})).filter(m=>validateCoordinates(m.location.latitude,m.location.longitude).valid&&m.distance+accuracy<=workplaceRadius(m.location)).sort((a,b)=>a.distance-b.distance)[0];
    return { latitude:coordinates.latitude,longitude:coordinates.longitude,accuracy,inside:Boolean(inside),outside,location_id:(inside||nearest).location.id,location_name:(inside||nearest).location.name,distance_meters:(inside||nearest).distance,radius_meters:(inside||nearest).radius,detected_location_id:known?.location.id||null,detected_location_name:known?.location.name||null };
  },
  async complete(challenge, input) {
    let claim;try { claim=jwt.verify(challenge,secret(),{issuer:'edgewforce-location-challenge',algorithms:['HS256']}); }catch { fail('Sign-in verification expired. Enter your credentials again.','CHALLENGE_EXPIRED',401); }
    const session=await db.findById('workforce_access_sessions',claim.sessionId);
    if (!session||session.token_id!==claim.nonce||session.state!=='pending'||Date.parse(session.expires_at)<Date.now()||Number(session.user_id)!==Number(claim.userId)) fail('This sign-in challenge is no longer valid.','CHALLENGE_EXPIRED',401);
    const user=await db.findById('users',session.user_id), employee=await db.findById('employees',session.employee_id);
    if(user?.status!=='active'||employee?.status!=='active'||Number(employee.user_id)!==Number(user.id)||Number(employee.company_id)!==Number(claim.companyId)) fail('Account is not active.');
    const observation=await this.observation(employee,input);
    if(!observation.inside) fail('You must be confidently inside an assigned work location to sign in. Move closer to its centre.','OUTSIDE_WORKPLACE');
    const active=await this.commit(session,'activate',observation);
    return { userId:user.id,workplace_session_id:active.id,token:jwt.sign({ userId:user.id,workplace_session_id:active.id,token_use:'access' },secret(),{issuer:'edgewforce-workplace',expiresIn:'12h'}),auth_mode:'workplace_session' };
  },
  async validate(user, employee, sessionId, allowStale=false) {
    if(!this.applies(user,employee)) return null;
    if(employee?.status!=='active') fail('Your staff profile is not active. Contact HR.','LOCATION_REQUIRED',401);
    const session=sessionId ? await db.findById('workforce_access_sessions',Number(sessionId)) : null;
    if(!session||Number(session.user_id)!==Number(user.id)||Number(session.company_id)!==Number(user.company_id)||session.state!=='active'||Date.parse(session.expires_at)<=Date.now()) fail('Your workplace session has ended. Return to your assigned location and sign in again.','WORKPLACE_SESSION_REVOKED',401);
    if(Date.now()-Date.parse(session.last_verified_at)>120000) {
      await this.logout({...user,workplace_session_id:session.id});
      fail('Your location could not be verified. Return to your workstation and sign in again.','LOCATION_REQUIRED',401);
    }
    return session;
  },
  async ping(actor,input) {
    const session=await this.validate(actor,actor.employee,actor.workplace_session_id,true);
    if(!session) return {enabled:false};
    const observation=await this.observation(actor.employee,input,Date.now(),session.location_id);
    const result=await this.commit(session,'observe',observation);
    return {enabled:true,state:result.state,inside:observation.inside,message:result.state==='revoked'?'A departure was confirmed. Your sessions have ended. Return to an assigned workstation to sign in.':observation.inside?'Workplace location verified.':'Checking the boundary. A second accurate outside fix is required.'};
  },
  async commit(session, action, data, now=Date.now()) {
    if(db.isCloud) return db.rpc('workforce_access_commit',{p_session_id:session.id,p_user_id:session.user_id,p_company_id:session.company_id,p_action:action,p_data:data});
    return db.transaction(async()=>{
      const current=await db.findById('workforce_access_sessions',session.id), time=new Date(now).toISOString();
      if(!current||current.state===(action==='activate'?'active':'revoked')||current.state==='revoked'||Date.parse(current.expires_at)<=now) fail('Workplace session ended.','WORKPLACE_SESSION_REVOKED',401);
      if(action==='activate') {
        if(current.state!=='pending') fail('Sign-in challenge already used.');
        const active=await db.update('workforce_access_sessions',current.id,{state:'active',location_id:data.location_id,last_verified_at:time,last_seen_at:time,outside_since:null,expires_at:new Date(now+43200000).toISOString()});
        await db.insert('workforce_movement_events',{company_id:session.company_id,user_id:session.user_id,employee_id:session.employee_id,session_id:session.id,kind:'location_login',location_id:data.location_id,observed_at:time,details:data});return active;
      }
      if(current.state!=='active') fail('Session is not active.');
      if(data.inside) return db.update('workforce_access_sessions',current.id,{last_verified_at:time,last_seen_at:time,outside_since:null});
      if(!data.outside) return db.update('workforce_access_sessions',current.id,{last_seen_at:time,outside_since:null});
      if(!current.outside_since||now-Date.parse(current.outside_since)>120000) return db.update('workforce_access_sessions',current.id,{last_seen_at:time,outside_since:time});
      if(now-Date.parse(current.outside_since)<15000) return current;
      const event=await db.insert('workforce_movement_events',{company_id:session.company_id,user_id:session.user_id,employee_id:session.employee_id,session_id:session.id,kind:'workplace_departure',location_id:current.location_id,observed_at:time,details:data});
      for(const row of await db.find('workforce_access_sessions',{user_id:session.user_id,company_id:session.company_id})) if(['active','pending'].includes(row.state)) await db.update('workforce_access_sessions',row.id,{state:'revoked',revoked_at:time,revoke_reason:'confirmed_departure'});
      for(const user of (await db.find('users',{company_id:session.company_id,status:'active'})).filter(u=>['HR','HR_MANAGER','ADMIN','SUPER_ADMIN'].includes(u.role_code))) await db.insert('workforce_movement_notices',{company_id:session.company_id,user_id:user.id,event_id:event.id,title:'Workplace departure confirmed',body:`Staff left ${data.location_name}. ${data.detected_location_name?'Observed at '+data.detected_location_name+'.':'Destination is unconfirmed.'} Workplace sessions ended.`,read_at:null,created_at:time});
      return db.findById('workforce_access_sessions',current.id);
    });
  },
  async logout(actor) {
    if(!actor.workplace_session_id) return;
    if(db.isCloud) return db.rpc('workforce_access_commit',{p_session_id:actor.workplace_session_id,p_user_id:actor.id,p_company_id:actor.company_id,p_action:'logout',p_data:{}});
    const session=await db.findById('workforce_access_sessions',actor.workplace_session_id);if(session)await db.update('workforce_access_sessions',session.id,{state:'revoked',revoked_at:new Date().toISOString(),revoke_reason:'sign_out'});
  }
};
