import { TICKET_START_NUMBER } from './constants';
import { getFromStorage, saveToStorage } from './localStorage';
import { LS_KEYS } from './constants';

const LS_TICKET_COUNTER = 'sisa_ticket_counter';

/**
 * Genera el siguiente número de ticket como "TKT-000247"
 */
export function generateTicketId(): string {
  const current = getFromStorage<number>(LS_TICKET_COUNTER) ?? TICKET_START_NUMBER;
  const next = current + 1;
  saveToStorage(LS_TICKET_COUNTER, next);
  return `TKT-${String(next).padStart(6, '0')}`;
}

/**
 * Formatea un número a "N° 000247"
 */
export function formatTicketNumber(ticketId: string): string {
  const num = ticketId.replace('TKT-', '');
  return `N° ${num}`;
}