import React, { useEffect, useRef, useState } from 'react';
import { Download, FileText, RefreshCw, Printer, AlertTriangle } from 'lucide-react';
import { api } from '../lib/api';

const definitions = [
  ['daily_ops', 'Daily operations summary'], ['attendance', 'Workforce attendance & work locations'],
  ['agent_perf', 'Agent activity & recorded sales'], ['visits', 'Store visits & merchandising'],
  ['sales', 'Commercial sales'], ['orders', 'Orders & approval status'], ['customers', 'Customer balances'],
  ['collections', 'Payment collections'], ['inventory', 'Current inventory valuation'],
  ['deliveries', 'Deliveries & dispatch'], ['red_flags', 'Exceptions & geofence alerts'], ['gps_tracking', 'Reported GPS locations']
];
const lagosDay = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Lagos' }).format(new Date());
const display = value => {
  if (value == null || value === '') return 'Not recorded';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'number') return value.toLocaleString('en-NG');
  if (/^\d{4}-\d{2}-\d{2}T/.test(String(value)) && Number.isFinite(Date.parse(value))) return new Intl.DateTimeFormat('en-NG', { timeZone: 'Africa/Lagos', dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
  return String(value);
};

export default function ReportsCenterDashboard() {
  const [reportType, setReportType] = useState('daily_ops');
  const [range, setRange] = useState(() => ({ start: lagosDay(), end: lagosDay() }));
  const [bundle, setBundle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');
  const requestId = useRef(0);
  const query = () => `/field/reports?reportType=overview&dateFrom=${encodeURIComponent(range.start)}&dateTo=${encodeURIComponent(range.end)}`;
  const fetchReport = async () => {
    const id = ++requestId.current;
    setLoading(true); setError(''); setBundle(null);
    try {
      if (!range.start || !range.end || range.start > range.end) throw new Error('Choose a valid date range with the start on or before the end.');
      const response = await api.get(query());
      const next = response?.data || response;
      if (!next?.reports) throw new Error('The report response is incomplete. Please refresh.');
      if (id === requestId.current) setBundle(next);
    } catch (failure) { if (id === requestId.current) setError(failure.message); }
    finally { if (id === requestId.current) setLoading(false); }
  };
  useEffect(() => { fetchReport(); return () => { requestId.current++; }; }, [range.start, range.end]);
  const exportExcel = async () => {
    setExporting(true); setError('');
    try {
      const blob = await api.get(`${query()}&format=xlsx&selected=${encodeURIComponent(reportType)}`, { responseType: 'blob' });
      const url = URL.createObjectURL(blob), link = document.createElement('a');
      link.href = url; link.download = `EdgeWForce-${reportType}-${range.start}-${range.end}.xlsx`; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (failure) { setError(failure.message); }
    finally { setExporting(false); }
  };
  const report = bundle?.reports?.[reportType];
  return (
    <main className="mx-auto max-w-7xl space-y-5 p-4 lg:p-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div><p className="text-xs font-bold uppercase tracking-widest text-orange-500">Operational intelligence</p><h1 className="mt-2 text-2xl font-black text-zinc-900 dark:text-zinc-100 lg:text-3xl">Your records. Ready to review.</h1><p className="mt-2 text-sm text-zinc-500">Choose a report, check the dates and download a real Excel workbook.</p></div>
        <div className="flex flex-wrap gap-2"><button type="button" className="btn-secondary" onClick={fetchReport} disabled={loading}><RefreshCw size={15} /> Refresh</button><button type="button" className="btn-secondary" onClick={() => window.print()} disabled={!report || loading}><Printer size={15} /> Print</button><button type="button" className="btn-primary" onClick={exportExcel} disabled={!report || loading || exporting}><Download size={15} /> {exporting ? 'Preparing Excel...' : 'Download Excel'}</button></div>
      </header>
      <div className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 md:grid-cols-3">
        <label className="space-y-2 text-xs font-bold text-zinc-600 dark:text-zinc-300">Report<select aria-label="Report" className="form-input w-full" value={reportType} onChange={event => setReportType(event.target.value)}>{definitions.map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></label>
        <label className="space-y-2 text-xs font-bold text-zinc-600 dark:text-zinc-300">Start date<input aria-label="Start date" className="form-input w-full" type="date" value={range.start} onChange={event => setRange({ ...range, start: event.target.value })} /></label>
        <label className="space-y-2 text-xs font-bold text-zinc-600 dark:text-zinc-300">End date<input aria-label="End date" className="form-input w-full" type="date" value={range.end} onChange={event => setRange({ ...range, end: event.target.value })} /></label>
      </div>
      {error && <div role="alert" className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-600 dark:text-rose-300"><AlertTriangle size={18} />{error}</div>}
      <section className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-100"><FileText size={18} />{definitions.find(([id]) => id === reportType)?.[1]}</h2>{bundle && <p className="mt-1 text-xs text-zinc-500">{bundle.date_from} to {bundle.date_to} · Generated {display(bundle.generated_at)} WAT · Company {bundle.company_id}</p>}</div>{report && <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-500">{report.rows.length} rows</span>}</div>
        {bundle && <p className="text-xs leading-relaxed text-zinc-500">{bundle.snapshot_note}</p>}
        {loading ? <p role="status" className="py-12 text-center text-sm text-zinc-500">Loading recorded report data...</p> : report && <div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead className="bg-zinc-50 text-zinc-500 dark:bg-zinc-950"><tr>{report.columns.map(column => <th key={column} className="whitespace-nowrap px-3 py-3 font-bold">{column}</th>)}</tr></thead><tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">{report.rows.map((row, index) => <tr key={index}>{row.map((value, cell) => <td key={cell} className="px-3 py-3 text-zinc-700 dark:text-zinc-300">{display(value)}</td>)}</tr>)}{!report.rows.length && <tr><td colSpan={report.columns.length} className="py-12 text-center text-zinc-500">No matching records for this report and date range.</td></tr>}</tbody></table></div>}
      </section>
    </main>
  );
}
