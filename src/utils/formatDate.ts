import { DIAS_SEMANA, MESES } from './constants';

/**
 * Formatea fecha ISO a "Lunes, 20 enero 2025"
 */
export function formatDateLong(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const diaSemanaIdx = date.getDay(); // 0=Dom
  const ordenDia = [6, 0, 1, 2, 3, 4, 5][diaSemanaIdx]; // mapear a Lun=0
  const diasCompletos = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
  const dia = date.getDate();
  const mes = MESES[date.getMonth()].toLowerCase();
  const anio = date.getFullYear();
  return `${diasCompletos[ordenDia]}, ${dia} ${mes} ${anio}`;
}

/**
 * Formatea fecha ISO a "Lun, 20 Ene"
 */
export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const diaSemanaIdx = date.getDay();
  const ordenDia = [6, 0, 1, 2, 3, 4, 5][diaSemanaIdx];
  const dia = date.getDate();
  const mes = MESES[date.getMonth()].substring(0, 3);
  return `${DIAS_SEMANA[ordenDia]}, ${dia} ${mes}`;
}

/**
 * Formatea fecha ISO a "20 May"
 */
export function formatDateDayMonth(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const dia = date.getDate();
  const mes = MESES[date.getMonth()].substring(0, 3);
  return `${dia} ${mes}`;
}

/**
 * Retorna "YYYY-MM-DD" de hoy
 */
export function getTodayISO(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

/**
 * Retorna array de los últimos N días en "YYYY-MM-DD"
 */
export function getLastNDays(n: number): string[] {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }
  return days;
}

/**
 * Retorna el día de semana corto para una fecha ISO
 */
export function getDiaSemana(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const idx = date.getDay(); // 0=Dom
  const orden = [6, 0, 1, 2, 3, 4, 5][idx];
  return DIAS_SEMANA[orden];
}