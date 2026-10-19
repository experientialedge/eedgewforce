// ==============================================================================
// EDGEWFORCE - SUPABASE AUTH & JWT AUTHENTICATION MIDDLEWARE
// Supports real Supabase Auth sessions, token verification & identity linking
// ==============================================================================

import jwt from 'jsonwebtoken';
import { db, supabase } from '../config/database.js';
import { workplaceAccessService } from '../services/workplaceAccessService.js';

const JWT_SECRET = process.env.JWT_SECRET || '3458929f44e69c199398c77212600d9f760aabb9b1dda42680556892307277ea';

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Authentication required. Please provide a valid Bearer token.' }
      });
    }

    const token = authHeader.split(' ')[1];
    let user = null;
    let authUserId = null;
    let authEmail = null;
    let workplaceSessionId = null;
    if (jwt.decode(token)?.iss === 'edgewforce-workplace') {
      const decoded = jwt.verify(token, JWT_SECRET, { issuer: 'edgewforce-workplace', algorithms: ['HS256'] });
      if (decoded.token_use !== 'access') throw new Error('Invalid token purpose.');
      authUserId = decoded.userId;
      workplaceSessionId = decoded.workplace_session_id;
    }

    // 1. Attempt Supabase Auth Token Verification
    if (!authUserId && supabase && typeof supabase.auth?.getUser === 'function') {
      try {
        const { data: sbData, error: sbErr } = await supabase.auth.getUser(token);
        if (!sbErr && sbData?.user) {
          authUserId = sbData.user.id;
          authEmail = sbData.user.email?.toLowerCase();
        }
      } catch {
        // Fall through to JWT decoding
      }
    }

    // 2. Fallback / JWT Token Decoding
    if (!authUserId) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.token_use && decoded.token_use !== 'access') throw new Error('Invalid token purpose.');
        authUserId = decoded.auth_user_id || decoded.uuid || decoded.userId || decoded.id || decoded.sub;
        authEmail = decoded.email?.toLowerCase();
      } catch (error) {
        throw error;
      }
    }

    if (!authUserId && !authEmail) {
      return res.status(401).json({
        success: false,
        error: { code: 'INVALID_TOKEN', message: 'Invalid or expired authentication token.' }
      });
    }

    // 3. Resolve Linked EdgeWForce Staff Profile
    if (authUserId && /^[0-9a-f]{8}-/i.test(String(authUserId))) {
      user = await db.findOne('users', { auth_user_id: authUserId }) ||
             await db.findOne('users', { uuid: authUserId }) ||
             (!db.isCloud ? await db.findById('users', authUserId) : null);
    }

    if (!user && authUserId && /^\d+$/.test(String(authUserId))) user = await db.findById('users', authUserId);

    if (!user && authEmail) {
      user = await db.findOne('users', { email: authEmail });
      // If user matched by email and auth_user_id is not yet set, link it now!
      if (user && authUserId && /^[0-9a-f]{8}-/i.test(String(authUserId)) && !user.auth_user_id) {
        db.update('users', user.id, { auth_user_id: authUserId, uuid: authUserId }).catch(() => {});
      }
    }

    // Check by employee work email / personal email
    if (!user && authEmail) {
      const employees = await db.find('employees');
      const emp = employees.find(e =>
        (e.work_email && e.work_email.toLowerCase() === authEmail) ||
        (e.personal_email && e.personal_email.toLowerCase() === authEmail) ||
        (e.email && e.email.toLowerCase() === authEmail)
      );
      if (emp?.user_id) {
        user = await db.findById('users', emp.user_id);
        if (user && authUserId && /^[0-9a-f]{8}-/i.test(String(authUserId))) {
          db.update('users', user.id, { auth_user_id: authUserId }).catch(() => {});
        }
      }
    }

    if (!user || user.status !== 'active') {
      return res.status(401).json({
        success: false,
        error: {
          code: 'USER_INACTIVE',
          message: user ? 'This account has been deactivated. Please contact your administrator.' : 'No EdgeWForce staff profile is linked to this authenticated user.'
        }
      });
    }

    const employee = await db.findOne('employees', { user_id: user.id }) ||
                     (user.auth_user_id ? await db.findOne('employees', { auth_user_id: user.auth_user_id }) : null);
    const issuedAt = jwt.decode(token)?.iat;
    if (user.session_invalid_before && (!Number.isFinite(issuedAt) || issuedAt < Math.floor(Date.parse(user.session_invalid_before) / 1000))) return res.status(401).json({success:false,error:{code:'TOKEN_EXPIRED',message:'Your password changed. Sign in again.'}});
    await workplaceAccessService.validate(user, employee, workplaceSessionId, ['/api/workplace-access/ping','/api/auth/logout'].includes(req.originalUrl?.split('?')[0]));
    
    const [rank, department] = await Promise.all([
      employee?.rank_code ? db.findOne('ranks', { code: employee.rank_code }) : null,
      employee?.department_id ? db.findById('departments', employee.department_id) : (employee?.department ? { name: employee.department } : null)
    ]);

    // Attach complete security context to request
    req.user = {
      ...user,
      workplace_session_id: workplaceSessionId,
      employee,
      rank,
      department
    };

    next();
  } catch (error) {
    if (['LOCATION_REQUIRED','WORKPLACE_SESSION_REVOKED'].includes(error.code)) return res.status(401).json({ success:false,error:{code:error.code,message:error.message} });
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: { code: 'TOKEN_EXPIRED', message: 'Session token has expired. Please sign in again.' }
      });
    }
    return res.status(401).json({
      success: false,
      error: { code: 'INVALID_TOKEN', message: 'Invalid authentication token.' }
    });
  }
}

export function signUserToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      auth_user_id: user.auth_user_id || user.uuid || null,
      email: user.email,
      role: user.role_code
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

