// ==============================================================================
// EDGEWFORCE - NIGERIA TIMEZONE & SMART SHIFT ATTENDANCE ENGINE
// Authoritative Time Calculation for Africa/Lagos (UTC+1, West Africa Time)
// ==============================================================================

/**
 * Returns detailed date and time components computed strictly in the Africa/Lagos timezone.
 * Nigeria does NOT observe Daylight Saving Time (DST) and is always UTC+1 (offset +60m).
 *
 * @param {Date|string|number} [dateInput=new Date()]
 * @returns {{
 *   date: Date,
 *   year: number,
 *   month: number,
 *   day: number,
 *   hours: number,
 *   minutes: number,
 *   seconds: number,
 *   totalMinutes: number,
 *   dateStr: string,
 *   timeStr: string,
 *   formatted12h: string,
 *   isoLagos: string
 * }}
 */
export function getLagosTime(dateInput = new Date()) {
  const dateObj = dateInput instanceof Date ? dateInput : new Date(dateInput);

  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date provided to getLagosTime.');
  }

  // Format parts using Intl with timeZone 'Africa/Lagos'
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Lagos',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23'
  });

  const parts = formatter.formatToParts(dateObj);
  const partMap = {};
  for (const p of parts) {
    partMap[p.type] = p.value;
  }

  const year = parseInt(partMap.year, 10);
  const month = parseInt(partMap.month, 10);
  const day = parseInt(partMap.day, 10);
  const hours = parseInt(partMap.hour, 10);
  const minutes = parseInt(partMap.minute, 10);
  const seconds = parseInt(partMap.second, 10);

  const totalMinutes = hours * 60 + minutes;
  const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  const formatted12h = `${String(hour12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
  const isoLagos = `${dateStr} ${timeStr}`;

  return {
    date: dateObj,
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
    totalMinutes,
    dateStr,
    timeStr,
    formatted12h,
    isoLagos
  };
}

/**
 * Roles eligible for shift-based attendance:
 * - Sales Agents (SALES_AGENT)
 * - Field Agents (FIELD_AGENT)
 * - Brand Ambassadors (BRAND_AMBASSADOR)
 * - Promoters (PROMOTER)
 *
 * Normal Staff (STAFF_MEMBER, EMPLOYEE, OPERATIONS_OFFICER, HR, ACCOUNTANT, etc.) are EXEMPT.
 */
export function isShiftEligibleRole(roleCode, position = '') {
  const normRole = String(roleCode || '').toUpperCase().trim();
  const normPos = String(position || '').toUpperCase().trim();

  if (['SALES_AGENT', 'FIELD_AGENT', 'BRAND_AMBASSADOR', 'PROMOTER'].includes(normRole)) {
    return true;
  }

  if (
    normPos.includes('SALES AGENT') ||
    normPos.includes('FIELD AGENT') ||
    normPos.includes('BRAND AMBASSADOR') ||
    normPos.includes('PROMOTER')
  ) {
    return true;
  }

  return false;
}

/**
 * Attendance Shift Windows in Africa/Lagos Local Time:
 * 1. Morning: 08:00–09:00; late morning: 09:00–10:00.
 * 2. Midday: 12:00–13:00.
 * 3. Evening clock-out: 17:00–18:00. End boundaries are exclusive.
 *
 * @param {Date|string|number} [dateInput=new Date()]
 * @returns {{
 *   allowed: boolean,
 *   attendance_type: 'MORNING_ATTENDANCE'|'MIDDAY_ATTENDANCE'|'EVENING_CLOCK_OUT'|null,
 *   label: string,
 *   button_label: string,
 *   action_type: 'CLOCK_IN'|'CLOCK_OUT'|'CLOSED',
 *   message: string,
 *   next_window: string,
 *   lagos_time: ReturnType<typeof getLagosTime>
 * }}
 */
export function determineShiftAttendanceWindow(dateInput = new Date()) {
  const lagos = getLagosTime(dateInput), m = lagos.totalMinutes;
  const base = { lagos_time: lagos, allowed: true, action_type: 'CLOCK_IN', is_late: false };
  if (m >= 480 && m < 600) return { ...base, attendance_type: 'MORNING_ATTENDANCE', label: m < 540 ? 'Morning Attendance' : 'Late Morning Attendance', button_label: m < 540 ? 'MORNING CLOCK-IN' : 'LATE CLOCK-IN', is_late: m >= 540, message: m < 540 ? 'Morning clock-in is open (8:00 AM – 9:00 AM).' : 'Late clock-in is open (9:00 AM – 10:00 AM). This arrival is recorded as late.', next_window: 'Midday clock-in: 12:00 PM – 1:00 PM' };
  if (m >= 720 && m < 780) return { ...base, attendance_type: 'MIDDAY_ATTENDANCE', label: 'Midday Attendance', button_label: 'MIDDAY CLOCK-IN', message: 'Midday clock-in is open (12:00 PM – 1:00 PM).', next_window: 'Evening clock-out: 5:00 PM – 6:00 PM' };
  if (m >= 1020 && m < 1080) return { ...base, action_type: 'CLOCK_OUT', attendance_type: 'EVENING_CLOCK_OUT', label: 'Evening Clock-Out', button_label: 'EVENING CLOCK-OUT', message: 'Evening clock-out is open (5:00 PM – 6:00 PM).', next_window: 'Morning clock-in tomorrow at 8:00 AM' };
  const next = m < 480 ? 'Morning clock-in opens at 8:00 AM.' : m < 720 ? 'Midday clock-in opens at 12:00 PM.' : m < 1020 ? 'Evening clock-out opens at 5:00 PM.' : 'Morning clock-in opens tomorrow at 8:00 AM.';
  return { ...base, allowed: false, action_type: 'CLOSED', attendance_type: null, label: 'Attendance Closed', button_label: 'ATTENDANCE CLOSED', message: 'Attendance is closed. ' + next, next_window: next };
}
