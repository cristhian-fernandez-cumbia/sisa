import type { Ticket } from '@/interfaces/ticket.interface';
import { formatDateLong } from './formatDate';
import { formatTime12h } from './formatTime';
import { formatCurrency } from './formatCurrency';
import { formatTicketNumber } from './generateTicketId';

/**
 * Genera el mensaje de texto para el comprobante de WhatsApp.
 */
export function buildWhatsappMessage(ticket: Ticket): string {
  const lines = [
    `🧾 *COMPROBANTE DE PAGO - SISA*`,
    `📋 ${formatTicketNumber(ticket.id)}`,
    ``,
    `🏪 *${ticket.mercadoNombre}*`,
    `📅 ${formatDateLong(ticket.fechaEmision)} · ${formatTime12h(ticket.horaEmision)}`,
    `👤 Cobrador: ${ticket.cobradorNombre}`,
    ``,
    `━━━━━━━━━━━━━━━━━━`,
    `🏬 Puesto: *${ticket.puestoCodigo}* | ${ticket.sectorNombre}`,
    `👨‍💼 Inquilino: *${ticket.inquilinoNombre}*`,
    ``,
    `💵 Sisa Diaria:   ${formatCurrency(ticket.sisaDiaria)}`,
    `💳 Abono Deuda:   ${formatCurrency(ticket.montoAbono)}`,
    `━━━━━━━━━━━━━━━━━━`,
    `✅ *TOTAL PAGADO: ${formatCurrency(ticket.totalPagado)}*`,
    ticket.deudaRestante > 0
      ? `⚠️ Deuda Restante: ${formatCurrency(ticket.deudaRestante)}`
      : `🎉 Sin deuda pendiente`,
    ``,
    `_Mercado Central Norte - SISA v2.4.0_`,
  ];

  return lines.join('\n');
}

/**
 * Genera la URL wa.me para abrir WhatsApp con el mensaje pre-cargado.
 * @param celular Número sin prefijo, ej: "987654321"
 */
export function buildWhatsappUrl(ticket: Ticket): string {
  const mensaje = buildWhatsappMessage(ticket);
  const celularLimpio = ticket.inquilinoCelular.replace(/\D/g, '');
  // Perú: prefijo +51
  const telefono = celularLimpio.startsWith('51')
    ? celularLimpio
    : `51${celularLimpio}`;
  const encoded = encodeURIComponent(mensaje);
  return `https://wa.me/${telefono}?text=${encoded}`;
}