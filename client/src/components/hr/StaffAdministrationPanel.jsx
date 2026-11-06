import React,{useEffect,useState} from 'react';
import {Hash,Trash2,RotateCcw,ShieldCheck} from 'lucide-react';
import Modal from '../common/Modal';
import {api} from '../../lib/api';

export const NUMBERING_DEPARTMENTS={FIN:'Finance',HR:'Human Resources',IT:'Information Technology',SM:'Sales & Marketing',OPS:'Operations',STG:'Strategy',CRE:'Creative',CMP:'Compliance',PUR:'Procurement',EXE:'Executive'};
export function CorrectEmployeeNumber({employee,onCorrected}){
 const [open,setOpen]=useState(false),[number,setNumber]=useState(''),[reason,setReason]=useState(''),[confirmation,setConfirmation]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState('');
 const current=employee.employee_code||employee.staff_id||'',valid=/^(FIN|HR|IT|SM|OPS|STG|CRE|CMP|PUR|EXE)(?:19|[2-9]\d)\d{2}(?!0000)\d{4}$/.test(number);
 async function submit(e){e.preventDefault();setBusy(true);setError('');try{const updated=await api.put(`/hr/employees/${employee.id}/number`,{employee_number:number,reason,confirmation});await onCorrected?.(updated);setOpen(false);}catch(err){setError(err.message);}finally{setBusy(false);}}
 return <section className="rounded-xl border border-orange-500/30 p-4 space-y-3">
  <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-bold">Super Admin · Staff ID correction</p><p className="text-xs text-zinc-500 mt-1">Correct an imported numbering mistake with a recorded reason. The old ID stays reserved.</p></div><button type="button" disabled={busy} onClick={()=>{setOpen(!open);setError('');}} className="shrink-0 rounded-lg border border-orange-500/40 px-3 py-2 text-xs font-bold">{open?'Cancel correction':'Correct staff ID'}</button></div>
  {open&&<form onSubmit={submit} className="space-y-3">
   <p className="text-xs text-zinc-500">Save any corrected hiring date before changing the ID. Use an approved department code, the saved hiring year and an unused four-digit sequence. This action updates only the staff ID; other unsaved profile edits are not included.</p>
   <label className="block text-xs font-semibold">Corrected staff ID<input required maxLength={11} autoComplete="off" value={number} onChange={e=>setNumber(e.target.value.toUpperCase().trim())} placeholder="IT20260001" className="mt-1 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent p-2 font-mono"/></label>
   <label className="block text-xs font-semibold">Reason for correction<textarea required minLength={10} maxLength={500} value={reason} onChange={e=>setReason(e.target.value)} className="mt-1 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent p-2"/></label>
   <label className="block text-xs font-semibold">Type current ID {current} to confirm<input required autoComplete="off" value={confirmation} onChange={e=>setConfirmation(e.target.value)} className="mt-1 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent p-2 font-mono"/></label>
   <p className="text-xs text-zinc-500">The corrected ID becomes the staff member’s ID for sign-in. Their account, password and work history stay linked.</p>
   {error&&<p role="alert" className="text-sm text-red-600">{error}</p>}
   <button type="submit" disabled={busy||!valid||number===current||reason.trim().length<10||confirmation!==current} className="rounded-lg bg-orange-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-40">{busy?'Saving correction…':'Save staff ID correction'}</button>
  </form>}
 </section>;
}
export function StaffDeletionDialog({employee,restore=false,onClose,onDone}){
 const [reason,setReason]=useState(''),[confirmation,setConfirmation]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState('');
 if(!employee)return null;
 const number=employee.employee_code||employee.staff_id;
 async function submit(e){e.preventDefault();setBusy(true);setError('');try{
  const body={reason,confirmation};
  if(restore)await api.post(`/hr/employees/${employee.id}/restore`,body);
  else await api.delete(`/hr/employees/${employee.id}`,{body:JSON.stringify(body)});
  await onDone?.();onClose();
 }catch(err){setError(err.message);}finally{setBusy(false);}}
 return <Modal title={restore?'Restore staff':'Delete staff'} subtitle={employee.full_name||`${employee.first_name} ${employee.last_name}`} onClose={()=>!busy&&onClose()}>
  <form onSubmit={submit} className="space-y-4">
   <p className="text-sm text-zinc-600 dark:text-zinc-300">{restore?'Restore this record to the staff directory with its original number. HR must separately reactivate the account before the employee can sign in.':'Remove this staff member from the directory and disable their account immediately. Attendance, payroll, project and task history will be retained. You can restore the record later.'}</p>
   <p className="rounded-xl bg-orange-500/10 p-3 text-sm"><strong>{number}</strong> will remain permanently reserved for this employee.</p>
   <label className="block text-sm font-semibold">Reason<textarea required minLength={10} maxLength={500} value={reason} onChange={e=>setReason(e.target.value)} className="mt-2 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent p-3" placeholder={restore?'Explain why this staff record should be restored':'Example: Employee has left the organisation'}/></label>
   <label className="block text-sm font-semibold">Type {number} to confirm<input required autoComplete="off" value={confirmation} onChange={e=>setConfirmation(e.target.value)} className="mt-2 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent p-3 font-mono"/></label>
   {error&&<p role="alert" className="text-sm text-red-600">{error}</p>}
   <div className="flex justify-end gap-3"><button type="button" disabled={busy} onClick={onClose} className="px-4 py-2 text-sm">Cancel</button><button disabled={busy||reason.trim().length<10||confirmation.trim()!==number} className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-40">{busy?'Saving…':restore?'Restore staff':'Delete staff'}</button></div>
  </form>
 </Modal>;
}
export function AssignEmployeeNumber({employee,onAssigned}){
 const [code,setCode]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState('');
 if(employee.employee_number_assigned_at)return <p className="text-xs text-zinc-500">Reserved employee number. Department transfers and departure do not change it. Corrections require an audited Super Admin action.</p>;
 return <section className="rounded-xl border border-orange-500/30 p-4 space-y-3">
  <p className="text-sm font-bold">Assign a permanent employee number</p><p className="text-xs text-zinc-500">Save the correct hiring date first. The server assigns the next unused number. Later corrections require a Super Admin and a recorded reason.</p>
  <label className="block text-xs font-semibold">Numbering department<select value={code} onChange={e=>setCode(e.target.value)} className="mt-1 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent p-2"><option value="">Choose a code</option>{Object.entries(NUMBERING_DEPARTMENTS).map(([c,n])=><option key={c} value={c}>{c} · {n}</option>)}</select></label>
  <button type="button" disabled={!code||busy} className="rounded-lg bg-orange-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-40" onClick={async()=>{setBusy(true);setError('');try{const result=await api.post(`/hr/employees/${employee.id}/number`,{department_code:code});await onAssigned?.(result);}catch(e){setError(e.message);}finally{setBusy(false);}}}>{busy?'Assigning…':'Assign permanent number'}</button>
  {error&&<p role="alert" className="text-xs text-red-600">{error}</p>}
 </section>;
}
export default function StaffAdministrationPanel({onChanged,canDelete}){
 const [view,setView]=useState(''),[rows,setRows]=useState([]),[error,setError]=useState(''),[busy,setBusy]=useState(false),[confirmed,setConfirmed]=useState(false),[selected,setSelected]=useState(null),[message,setMessage]=useState('');
 async function open(type){setView(type);setRows([]);setError('');setMessage('');setConfirmed(false);setBusy(true);try{const result=await api.get(type==='numbers'?'/hr/employees/numbering/preview':'/hr/employees?include_deleted=true');setRows(type==='numbers'?result:result.filter(e=>e.deleted_at));}catch(e){setError(e.message);}finally{setBusy(false);}}
 useEffect(()=>{if(!view)setSelected(null);},[view]);
 return <section className="surface-card rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 flex flex-wrap items-center justify-between gap-3">
  <div className="flex items-center gap-3"><ShieldCheck className="text-orange-500" size={21}/><div><h3 className="text-sm font-bold">Staff records & permanent numbers</h3><p className="text-xs text-zinc-500">Department + hiring year + four-digit sequence. Issued numbers are never reused.</p></div></div>
  <div className="flex flex-wrap gap-2"><button onClick={()=>open('numbers')} className="flex gap-2 items-center rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-xs font-bold"><Hash size={14}/>Employee numbering</button>{canDelete&&<button onClick={()=>open('removed')} className="flex gap-2 items-center rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-xs font-bold"><Trash2 size={14}/>Removed staff</button>}</div>
  {view&&!selected&&<Modal title={view==='numbers'?'Employee numbering':'Removed staff'} onClose={()=>!busy&&setView('')}>
   <div className="space-y-4"><p className="text-sm text-zinc-500">{view==='numbers'?'Review unnumbered profiles. Existing issued numbers remain permanent. Correct missing hiring dates or choose a code in Edit staff.':'Removed profiles retain their attendance, payroll and collaboration history. Restoring a record keeps its original number and leaves account access inactive.'}</p>
    {busy&&<p role="status">Loading…</p>}{error&&<p role="alert" className="text-red-600 text-sm">{error}</p>}{message&&<p role="status" className="text-sm text-emerald-600">{message}</p>}
    {!busy&&!rows.length&&<p className="p-4 rounded-xl bg-emerald-500/10 text-sm">{view==='numbers'?'Every current staff profile has a permanent employee number.':'No removed staff records.'}</p>}
    <ul className="space-y-2">{rows.map(r=><li key={r.employee_id||r.id} className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-3 text-sm"><div className="flex justify-between gap-3"><strong>{r.name||r.full_name||`${r.first_name} ${r.last_name}`}</strong>{view==='removed'&&<button className="flex gap-1 items-center text-orange-600 font-bold text-xs" onClick={()=>setSelected(r)}><RotateCcw size={13}/>Restore</button>}</div><p className="text-xs text-zinc-500 mt-1">{view==='numbers'?(r.ready?`${r.department_code} · ${r.hiring_year} · Ready to assign`:r.reason):`${r.employee_code} · ${r.deletion_reason||'Removed from directory'}`}</p></li>)}</ul>
    {view==='numbers'&&rows.some(r=>r.ready)&&<><label className="flex items-start gap-2 text-xs"><input type="checkbox" checked={confirmed} onChange={e=>setConfirmed(e.target.checked)}/>I have reviewed the department codes and hiring years. Assign permanent numbers to the ready profiles.</label><button disabled={!confirmed||busy} className="rounded-xl bg-orange-600 text-white px-4 py-2 text-sm font-bold disabled:opacity-40" onClick={async()=>{setBusy(true);setError('');try{const result=await api.post('/hr/employees/numbering/assign',{});setRows(result.results.filter(r=>!r.assigned));setMessage(`${result.assigned} numbers assigned; ${result.pending} profiles need review.`);await onChanged?.();}catch(e){setError(e.message);}finally{setBusy(false);}}}>Assign {rows.filter(r=>r.ready).length} employee numbers</button></>}
   </div>
  </Modal>}
  {selected&&<StaffDeletionDialog employee={selected} restore onClose={()=>setSelected(null)} onDone={async()=>{setSelected(null);await open('removed');await onChanged?.();}}/>}
 </section>;
}
