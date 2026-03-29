/**
 * Convierte "09:34" → "09:34 AM" / "13:45" → "01:45 PM"
 */
export function formatTime12h(time24: string): string {
  const [hStr, mStr] = time24.split(':');
  let h = parseInt(hStr, 10);
  const m = mStr ?? '00';
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${String(h).padStart(2, '0')}:${m} ${ampm}`;
}

/**
 * Devuelve la hora actual en formato "HH:MM"
 */
export function getCurrentTime(): string {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

/**
 * Agrupa cobros por franja horaria "HH:00 — (HH+1):00"
 */
export function getHourLabel(time24: string): string {
  const [hStr] = time24.split(':');
  const h = parseInt(hStr, 10);
  const next = (h + 1) % 24;
  return `${String(h).padStart(2, '0')}:00 — ${String(next).padStart(2, '0')}:00`;
}