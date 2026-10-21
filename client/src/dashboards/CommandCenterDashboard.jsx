import ExecutiveActivityBrief from '../components/hr/ExecutiveActivityBrief';
import React, { useState, useEffect, useRef } from 'react';
import {commandCenterMetrics} from '../lib/commandCenterMetrics';
import {
  Building2,
  Users,
  MapPin,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Filter,
  Eye,
  Sliders,
  Compass,
  FileText,
  UserPlus,
  Megaphone,
  Cake,
  ClipboardList,
  ShieldAlert,
  Network,
  Activity,
  Calendar,
  CalendarCheck,
  XCircle
} from 'lucide-react';
import { api } from '../lib/api';
import SupervisorLiveMap from '../components/maps/SupervisorLiveMap';
import Customer360Modal from '../components/customers/Customer360Modal';
import OrderApprovalModal from '../components/sales/OrderApprovalModal';
import CompanyOnboardingWizard from '../components/admin/CompanyOnboardingWizard';
import HRDashboard from './HRDashboard';
import IdleReviewModal from '../components/hr/IdleReviewModal';
import { formatDate } from '../lib/formatters';

export default function CommandCenterDashboard({ user, onNavigate, initialView = 'operations' }) {
  const [viewMode, setViewMode] = useState(initialView || 'operations'); // 'operations' | 'hr'
  const [hrSubTab, setHrSubTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('today');
  const [regionFilter, setRegionFilter] = useState('all');
  const [territoryFilter, setTerritoryFilter] = useState('all');

  // Core Data
  const [metrics, setMetrics] = useState(()=>commandCenterMetrics({}).metrics);
  const [loadError,setLoadError] = useState('');
  const [loadedAt,setLoadedAt] = useState(null);
  const [loadedScope,setLoadedScope] = useState('');
  const requestVersion = useRef(0);
  const [teamMembers, setTeamMembers] = useState([]);
  const [stores, setStores] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [insights, setInsights] = useState([]);

  // HR Intelligence Data (for Executive overview)
  const [hrStats, setHrStats] = useState(null);
  const [sosEvents, setSosEvents] = useState([]);
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [idleAlerts, setIdleAlerts] = useState([]);
  const [activeIdleAlert, setActiveIdleAlert] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');

  // Modals
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  // Time of day greeting
  const getGreeting = () => {
    const hour = Number(new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Lagos',hour:'2-digit',hourCycle:'h23'}).format(new Date()));
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const loadCommandCenterData = async () => {
    const version=++requestVersion.current;
    setLoading(true);
    try {
      const sources=[['Orders','/sales/orders'],['Field alerts','/field/supervisor/alerts'],['HR overview','/hr/dashboard'],['Emergency reports','/hr/sos'],['Leave requests','/hr/leave'],['Stores','/field/stores'],['Team','/field/supervisor/team'],['Payments','/sales/payments'],['Customers','/sales/customers']];
      const results=await Promise.allSettled(sources.map(([,path])=>api.get(path,{requireOnline:true,signal:AbortSignal.timeout(25000)})));
      if(version!==requestVersion.current)return;
      const failures=results.flatMap((result,i)=>result.status==='rejected'?[sources[i][0]]:[]);
      if(failures.length)throw Error('Could not refresh '+failures.join(', ')+'. Previously loaded information is retained. Retry when connected.');
      const values=results.map(r=>r.value);
      const list=value=>Array.isArray(value)?value:Array.isArray(value?.data)?value.data:[];
      const [ordersRes,alertsRes,hrDashRes,hrSosRes,hrLeaveRes,storesRes,teamRes,paymentsRes,customersRes]=values;
      const next=commandCenterMetrics({orders:list(ordersRes),team:list(teamRes),stores:list(storesRes),payments:list(paymentsRes),customers:list(customersRes)},{dateFilter,regionFilter});
      setStores(next.stores);setAlerts(list(alertsRes));setOrders(next.orders);setTeamMembers(next.team);setMetrics(next.metrics);
      setHrStats(hrDashRes);setSosEvents(list(hrSosRes));setPendingLeaves(list(hrLeaveRes?.requests||hrLeaveRes).filter(l=>String(l.status).toLowerCase()==='pending'));setIdleAlerts(hrDashRes?.idle_records||[]);
      const activeAlerts=list(alertsRes).filter(a=>['active','open'].includes(String(a.status).toLowerCase())).length;
      const activeSos=list(hrSosRes).filter(s=>String(s.status).toLowerCase()==='active').length;
      const observations=[{type:'sales',text:'Recorded order value: ₦'+next.metrics.sales.salesToday.toLocaleString()+' for '+next.period.start+' to '+next.period.end+'. Cancelled and rejected orders are excluded.'},{type:'workforce',text:next.metrics.workforce.activeAgents+' staff have an open recorded shift today. Missing attendance does not establish absence.'}];
      if(activeAlerts)observations.push({type:'alert',text:activeAlerts+' open field alerts require supervisor review.'});
      if(activeSos)observations.push({type:'sos',text:activeSos+' active emergency report(s) need attention.'});
      setInsights(observations);setLoadedAt(new Date());setLoadedScope(next.period.start+' to '+next.period.end+' · Region: '+(regionFilter==='all'?'All regions':regionFilter));setLoadError('');
    } catch (err) {
      if(version===requestVersion.current)setLoadError(err.message);
    } finally {
      if(version===requestVersion.current)setLoading(false);
    }
  };

  // Handle SOS emergency resolution
  const handleResolveSOS = async (id) => {
    try {
      await api.put(`/hr/sos/${id}/resolve`, { resolution_notes: 'CEO Executive Review - Verified safe & dispatch completed.' });
      setStatusMsg('✓ SOS Emergency Beacon resolved & stopped.');
      loadCommandCenterData();
    } catch (err) {
      setStatusMsg(`SOS resolution error: ${err.message}`);
    }
  };

  // Handle Leave approval from Executive quick pulse
  const handleApproveLeave = async (id) => {
    try {
      await api.put(`/hr/leave/${id}/approve`, {});
      setStatusMsg('✓ Leave request approved & balances adjusted.');
      loadCommandCenterData();
    } catch (err) {
      setStatusMsg(`Approval error: ${err.message}`);
    }
  };

  const handleRejectLeave = async (id) => {
    try {
      await api.put(`/hr/leave/${id}/reject`, { reason: 'Executive operational requirements' });
      setStatusMsg('✓ Leave request rejected.');
      loadCommandCenterData();
    } catch (err) {
      setStatusMsg(`Rejection error: ${err.message}`);
    }
  };

  useEffect(() => {
    loadCommandCenterData();
    return ()=>{requestVersion.current++;};
  }, [dateFilter, regionFilter]);

  const activeSosList = Array.isArray(sosEvents) ? sosEvents.filter(s => s.status === 'active') : [];

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      <ExecutiveActivityBrief onOpenNexus={()=>onNavigate?.('nexus')} />
      {loadError&&<div role="alert" className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm">{loadError}<button onClick={loadCommandCenterData} disabled={loading} className="btn-secondary ml-3 text-xs">Retry dashboard</button></div>}
      <p role="status" className="text-xs text-zinc-500">{loading?'Refreshing recorded operations…':loadedAt?'Updated '+loadedAt.toLocaleTimeString('en-GB',{timeZone:'Africa/Lagos'})+' WAT':'Operational data has not loaded yet.'} · Workforce and visits: today. Sales and collections: {loadedScope||'waiting for records'}. Receivables: current balance. Regional filters omit records without matching regional information.</p>
      {/* 1. Header & Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
              Enterprise Command & Strategic Governance
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              CEO Master Control
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-zinc-900 dark:text-zinc-100 mt-1">
            {getGreeting()}, {user?.full_name || 'Chief Executive Officer'}
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Africa/Lagos' })} &bull; Africa/Lagos (GMT+1) &bull; Full Executive & Workforce Authority
          </p>
        </div>

        {/* Global Action Triggers (CEO & HR Capabilities) */}
        <div className="flex flex-wrap items-center gap-2">
          {/* HR Action 1: Register Staff */}
          <button
            onClick={() => {
              setViewMode('hr');
              setHrSubTab('people');
            }}
            className="px-3 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
            title="Register new staff member & generate login credentials"
          >
            <UserPlus size={14} /> <span>Register Staff</span>
          </button>

          {/* HR Action 2: Post Announcement */}
          <button
            onClick={() => {
              setViewMode('hr');
              setHrSubTab('announcements');
            }}
            className="px-3 py-2 border border-orange-500/30 text-orange-600 dark:text-orange-400 hover:bg-orange-500/10 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
            title="Broadcast official company announcement"
          >
            <Megaphone size={14} /> <span>Announcement</span>
          </button>

          {/* HR Action 3: Set Birthday */}
          <button
            onClick={() => {
              setViewMode('hr');
              setHrSubTab('birthdays');
            }}
            className="px-3 py-2 border border-pink-500/30 text-pink-600 dark:text-pink-400 hover:bg-pink-500/10 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
            title="Manage staff birthdays & celebratory broadcasts"
          >
            <Cake size={14} /> <span>Birthdays</span>
          </button>

          {/* HR Action 4: Assign Task */}
          <button
            onClick={() => {
              setViewMode('hr');
              setHrSubTab('tasks');
            }}
            className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
            title="Dispatch strategic directives and tasks"
          >
            <ClipboardList size={14} /> <span>Assign Task</span>
          </button>

          {/* POS Commercial Order */}
          <button
            onClick={() => onNavigate && onNavigate('sales')}
            className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
          >
            <ShoppingCart size={14} /> + New Order (POS)
          </button>

          {/* Refresh */}
          <button
            onClick={loadCommandCenterData}
            disabled={loading}
            className="p-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl text-xs font-bold transition"
            title="Refresh All Real-Time Telemetry"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-700 dark:text-orange-300 text-xs font-semibold flex items-center justify-between animate-in fade-in">
          <span>{statusMsg}</span>
          <button onClick={() => setStatusMsg('')} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">×</button>
        </div>
      )}

      {/* 2. Top-Level Executive View Switcher: Operations vs HR Intelligence */}
      <div className="flex items-center gap-2 p-1.5 bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl border border-zinc-200 dark:border-zinc-700/60">
        <button
          onClick={() => setViewMode('operations')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 ${
            viewMode === 'operations'
              ? 'bg-white dark:bg-zinc-900 text-orange-600 dark:text-orange-400 shadow-sm'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          <Compass size={16} />
          <span>Executive Operations & Fleet Radar</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold">
            Revenue & Field Live
          </span>
        </button>

        <button
          onClick={() => setViewMode('hr')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 ${
            viewMode === 'hr'
              ? 'bg-white dark:bg-zinc-900 text-orange-600 dark:text-orange-400 shadow-sm'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          <Users size={16} />
          <span>Workforce Intelligence & HR Command</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
            All 11 HR Modules & Governance
          </span>
        </button>
      </div>

      {/* RENDER VIEW MODE: WORKFORCE INTELLIGENCE & HR SUITE */}
      {viewMode === 'hr' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <HRDashboard user={user} initialTab={hrSubTab} />
        </div>
      )}

      {/* RENDER VIEW MODE: EXECUTIVE OPERATIONS & REVENUE COCKPIT */}
      {viewMode === 'operations' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Critical Emergency SOS Callout Banner (if active SOS exists) */}
          {activeSosList.map((sos) => (
            <div
              key={sos.id}
              className="p-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border-2 border-red-400 animate-pulse"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-white/20 text-white shrink-0">
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-white text-red-700 tracking-wider">
                      CRITICAL FIELD EMERGENCY
                    </span>
                    <span className="text-[11px] opacity-80 font-mono">
                      {formatDate(sos.created_at)}
                    </span>
                  </div>
                  <h4 className="text-sm font-black mt-1">
                    {sos.agent?.first_name || 'Field Agent'} {sos.agent?.last_name || ''}: {sos.message}
                  </h4>
                  <p className="text-xs opacity-90 mt-0.5">
                    Coordinates: {sos.latitude?.toFixed(5)}, {sos.longitude?.toFixed(5)} (±{Math.round(sos.accuracy || 0)}m)
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`https://maps.google.com/?q=${sos.latitude},${sos.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1.5"
                >
                  <MapPin size={13} />
                  <span>Live Coordinates</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleResolveSOS(sos.id)}
                  className="px-4 py-2 rounded-lg bg-white text-red-700 hover:bg-emerald-50 hover:text-emerald-700 text-xs font-black shadow-lg transition flex items-center gap-1.5"
                >
                  <CheckCircle2 size={15} className="text-emerald-600" />
                  <span>Stop SOS Beacon & Mark Safe</span>
                </button>
              </div>
            </div>
          ))}

      {/* 2. Contextual Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
          <div className="flex flex-wrap items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
            {['today', 'yesterday', 'this_week', 'this_month'].map(d => (
              <button
                key={d}
                onClick={() => setDateFilter(d)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition capitalize ${
                  dateFilter === d
                    ? 'bg-white dark:bg-zinc-900 text-orange-600 dark:text-orange-400 shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {d.replace('_', ' ')}
              </button>
            ))}
          </div>

          <select
            aria-label="Filter operations by region"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs"
          >
            <option value="all">All Regions (SW, NC, SS)</option>
            <option value="SW">South-West (Lagos & Ogun)</option>
            <option value="NC">North-Central (Abuja)</option>
            <option value="SS">South-South (Rivers)</option>
          </select>
        </div>

        <div className="text-[11px] font-bold text-zinc-400">
          Viewing: <span className="text-zinc-700 dark:text-zinc-200 font-bold">Nexfeild Master Organization</span>
        </div>
      </div>

      {/* 3. AI Insights Bar */}
      {insights.length > 0 && (
        <div className="p-3.5 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-transparent border border-orange-500/20 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-black text-orange-700 dark:text-orange-300">
            <Sparkles size={16} className="text-orange-500 animate-pulse" />
            Operational observations
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
            {insights.map((ins, idx) => (
              <div key={idx} className="p-2.5 bg-white/70 dark:bg-zinc-900/70 rounded-xl border border-orange-500/15">
                {ins.text}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Executive KPI Groups (Workforce, Field, Sales, Payments) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Workforce */}
        <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-zinc-400">1. Workforce</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600"><Users size={16} /></div>
          </div>
          <div>
            <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
              {metrics.workforce.activeAgents} <span className="text-sm font-normal text-zinc-400">/ {metrics.workforce.totalAgents} recorded open shifts</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-500">
              <div>Checked In: <strong className="text-emerald-600">{metrics.workforce.checkedIn}</strong></div>
              <div>No clock-in: <strong className="text-rose-500">{metrics.workforce.notCheckedIn}</strong></div>
              <div>Inside Geo: <strong className="text-emerald-600">{metrics.workforce.onField}</strong></div>
              <div>Avg Shift: <strong className="text-zinc-700 dark:text-zinc-300">{metrics.workforce.avgHours}</strong></div>
            </div>
          </div>
        </div>

        {/* Field Ops */}
        <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-zinc-400">2. Field Operations</span>
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-600"><Building2 size={16} /></div>
          </div>
          <div>
            <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
              {metrics.field.completionPercent===null?'Not recorded':metrics.field.completionPercent+'%'} <span className="text-sm font-normal text-zinc-400">visit completion</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-500">
              <div>Completed: <strong className="text-emerald-600">{metrics.field.completedVisits}</strong></div>
              <div>Recorded visits: <strong className="text-zinc-700 dark:text-zinc-300">{metrics.field.plannedVisits}</strong></div>
              <div>New Stores: <strong className="text-orange-600">Not recorded</strong></div>
              <div>Short Visits: <strong className="text-amber-500">{metrics.field.shortVisits??'Not recorded'}</strong></div>
            </div>
          </div>
        </div>

        {/* Sales */}
        <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-zinc-400">3. Commercial Sales</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600"><ShoppingCart size={16} /></div>
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              ₦{metrics.sales.salesToday.toLocaleString()}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-500">
              <div>Target: <strong>{metrics.sales.targetToday===null?'Not configured':'₦'+metrics.sales.targetToday.toLocaleString()}</strong></div>
              <div>Achieved: <strong className="text-emerald-600">{metrics.sales.achievementPercent===null?'Not available':metrics.sales.achievementPercent+'%'}</strong></div>
              <div>Total Orders: <strong className="text-zinc-800 dark:text-zinc-200">{metrics.sales.totalOrders}</strong></div>
              <div>Approved: <strong className="text-emerald-600">{metrics.sales.approvedOrders}</strong></div>
            </div>
          </div>
        </div>

        {/* Payments */}
        <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-zinc-400">4. Collections & Risk</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600"><DollarSign size={16} /></div>
          </div>
          <div>
            <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
              ₦{metrics.payments.collectedToday.toLocaleString()}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-500">
              <div>Receivable: <strong>₦{(metrics.payments.totalReceivable / 1000000).toFixed(1)}M</strong></div>
              <div>Outstanding: <strong>₦{(metrics.payments.outstanding / 1000000).toFixed(1)}M</strong></div>
              <div>Overdue: <strong className="text-rose-500">{metrics.payments.overdue===null?'Not recorded':'₦'+(metrics.payments.overdue/1000000).toFixed(1)+'M'}</strong></div>
              <div>Due Today: <strong className="text-amber-500">{metrics.payments.dueToday===null?'Not recorded':'₦'+(metrics.payments.dueToday/1000000).toFixed(1)+'M'}</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Live Operations Map & Telemetry Radar */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Compass size={18} className="text-orange-500" />
              Live Operations Map & Fleet Radar
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Field and sales locations with customer stop boundaries. Confirmed workplace departures appear in the executive activity brief.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Active (Green)</span>
            <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Late/Idle (Yellow)</span>
            <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Alert (Red)</span>
          </div>
        </div>

        <SupervisorLiveMap
          teamMembers={teamMembers}
          stores={stores}
          onSelectAgent={(agent) => {
            if (onNavigate) onNavigate('supervisor_dashboard');
          }}
          onSelectStore={(store) => {
            setSelectedCustomerId(store.id);
          }}
        />
      </div>

      {/* 6. Two Columns: Leaderboard & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Leaderboard */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <TrendingUp size={16} className="text-orange-500" /> Team Performance Overview
            </h3>
            <button
              onClick={() => onNavigate && onNavigate('supervisor_dashboard')}
              className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
            >
              View Full Team &rarr;
            </button>
          </div>

          <p className="text-xs text-zinc-500">Scores appear only when recorded. A score does not establish compliance or productivity.</p>
          {!loading&&!teamMembers.length&&<p className="text-sm text-zinc-500">No field or sales staff match this region.</p>}
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {[...teamMembers].sort((a,b)=>(b.performance_score??-1)-(a.performance_score??-1)).slice(0, 5).map((agent, rank) => (
              <div key={agent.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${
                    rank === 0 ? 'bg-amber-400 text-amber-950' : rank === 1 ? 'bg-zinc-300 text-zinc-800' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                  }`}>
                    {rank + 1}
                  </div>
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100 block">{agent.first_name} {agent.last_name}</span>
                    <span className="text-[11px] text-zinc-400">{agent.role_code || 'Agent'} &bull; {agent.territory || 'Territory not recorded'}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-black text-emerald-600 dark:text-emerald-400 text-xs block">
                    {agent.performance_score===null?'Not scored':agent.performance_score+'% recorded score'}
                  </span>
                  <span className="text-[10px] text-zinc-400">Recorded operational data</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Sign-Off & Approvals Queue */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <ShoppingCart size={16} className="text-orange-500" /> Commercial Orders Queue
            </h3>
            <button
              onClick={() => onNavigate && onNavigate('sales')}
              className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
            >
              Sales Cockpit &rarr;
            </button>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 block">{order.order_number}</span>
                  <span className="text-[11px] text-zinc-400">₦{Number(order.total_amount).toLocaleString()} &bull; {order.payment_method}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    order.status === 'APPROVED' || order.status === 'DELIVERED'
                      ? 'bg-emerald-500/10 text-emerald-600'
                      : order.status === 'PENDING_APPROVAL'
                      ? 'bg-amber-500/10 text-amber-600'
                      : 'bg-zinc-100 text-zinc-600'
                  }`}>
                    {order.status}
                  </span>
                  {order.status === 'PENDING_APPROVAL' && (
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-2.5 py-1 bg-orange-500 text-white rounded-lg font-bold text-[10px]"
                    >
                      Review
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Integrated Executive HR Governance & Workforce Directives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Leave Requests Approvals */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Calendar size={16} className="text-orange-500" /> Pending Leave Approvals ({pendingLeaves.length})
            </h3>
            <button
              onClick={() => {
                setViewMode('hr');
                setHrSubTab('leave');
              }}
              className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
            >
              Leave Center &rarr;
            </button>
          </div>

          <div className="space-y-2.5">
            {pendingLeaves.slice(0, 3).map((lv) => (
              <div key={lv.id} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 flex items-center justify-between text-xs border border-zinc-200 dark:border-zinc-700/60">
                <div>
                  <b className="text-zinc-900 dark:text-zinc-100">
                    {lv.employee?.first_name} {lv.employee?.last_name}
                  </b>
                  <div className="text-[10px] text-zinc-400">
                    {lv.leave_type} • {lv.days} days ({formatDate(lv.start_date)} → {formatDate(lv.end_date)})
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleApproveLeave(lv.id)}
                    className="text-xs py-1 px-2.5 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRejectLeave(lv.id)}
                    className="text-xs py-1 px-2.5 text-rose-500 border border-rose-200 dark:border-rose-900/50 rounded-lg font-bold hover:bg-rose-500/10 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
            {pendingLeaves.length === 0 && (
              <div className="p-4 text-center text-xs text-zinc-400">No pending leave requests requiring CEO review.</div>
            )}
          </div>
        </div>

        {/* Inactivity Telemetry Alerts */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Activity size={16} className="text-orange-500" /> Workstation Inactivity Telemetry ({idleAlerts.length})
            </h3>
            <button
              onClick={() => {
                setViewMode('hr');
                setHrSubTab('overview');
              }}
              className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
            >
              Workforce Audit &rarr;
            </button>
          </div>

          <div className="space-y-2.5">
            {idleAlerts.slice(0, 3).map((alert) => (
              <div
                key={alert.id}
                onClick={() => setActiveIdleAlert(alert)}
                className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 flex items-center justify-between text-xs cursor-pointer hover:border-orange-500/50 border border-zinc-200 dark:border-zinc-700/60 transition"
              >
                <div>
                  <b className="text-zinc-900 dark:text-zinc-100">
                    {alert.employee?.first_name} {alert.employee?.last_name}
                  </b>
                  <div className="text-[10px] text-zinc-400">
                    Reason: {alert.reason || 'Break'} • Duration: {Math.round(alert.duration_seconds / 60)} mins
                  </div>
                </div>
                <button className="text-xs font-bold text-orange-500 hover:underline">
                  Review Alert
                </button>
              </div>
            ))}
            {idleAlerts.length === 0 && (
              <div className="p-4 text-center text-xs text-zinc-400">No active inactivity exceptions detected.</div>
            )}
          </div>
        </div>
      </div>

    </div>
  )}

      {/* Customer 360 Modal */}
      {selectedCustomerId && (
        <Customer360Modal
          customerId={selectedCustomerId}
          isOpen={true}
          onClose={() => setSelectedCustomerId(null)}
        />
      )}

      {/* Order Approval Drawer */}
      {selectedOrder && (
        <OrderApprovalModal
          order={selectedOrder}
          isOpen={true}
          onClose={() => setSelectedOrder(null)}
          onSuccess={loadCommandCenterData}
        />
      )}

      {/* Company Onboarding Wizard Modal */}
      {onboardingOpen && (
        <CompanyOnboardingWizard
          isOpen={true}
          onClose={() => setOnboardingOpen(false)}
          onSuccess={loadCommandCenterData}
        />
      )}

      {/* Idle Review Modal */}
      {activeIdleAlert && (
        <IdleReviewModal
          alert={activeIdleAlert}
          isOpen={true}
          onClose={() => setActiveIdleAlert(null)}
          onSuccess={() => {
            setActiveIdleAlert(null);
            loadCommandCenterData();
          }}
        />
      )}
    </div>
  );
}
