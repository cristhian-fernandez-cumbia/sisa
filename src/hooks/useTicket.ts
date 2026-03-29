'use client';

import { useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeTicketModal } from '@/redux/slices/uiSlice';
import { clearLastCobro }  from '@/redux/slices/cobrosSlice';
import type { Ticket }     from '@/interfaces/ticket.interface';
import { buildWhatsappUrl }    from '@/utils/whatsappLink';
import { exportElementAsPDF }  from '@/utils/pdfExport';
import { formatTicketNumber }  from '@/utils/generateTicketId';
import { getTodayISO }         from '@/utils/formatDate';
import { getCurrentTime }      from '@/utils/formatTime';

export function useTicket() {
  const dispatch  = useAppDispatch();
  const lastCobro = useAppSelector((s) => s.cobros.lastCobro);
  const puestos   = useAppSelector((s) => s.puestos.items);
  const socios    = useAppSelector((s) => s.socios.items);
  const config    = useAppSelector((s) => s.config.data);
  const isOpen    = useAppSelector((s) => s.ui.ticketModalOpen);

  // ── Construir objeto Ticket a partir del último cobro ─────────────────────
  const ticket: Ticket | null = useMemo(() => {
    if (!lastCobro || !config) return null;

    const puesto = puestos.find((p) => p.id === lastCobro.puestoId);
    const socio  = socios.find((s) => s.id === lastCobro.socioId);

    if (!puesto || !socio) return null;

    // Usar ticketId ya generado por cobrosSlice, o el id del cobro como fallback.
    // Ambos son valores estables que ya existen en el estado — sin Date.now().
    const ticketId = lastCobro.ticketId ?? `TKT-${lastCobro.id}`;
    const numero   = lastCobro.ticketId
      ? parseInt(lastCobro.ticketId.replace('TKT-', ''), 10)
      : 0;

    return {
      id:               ticketId,
      cobroId:          lastCobro.id,
      numero,
      fechaEmision:     lastCobro.fecha || getTodayISO(),
      horaEmision:      lastCobro.hora  || getCurrentTime(),
      mercadoNombre:    config.mercadoNombre,
      cobradorNombre:   config.cobradorNombre,
      puestoCodigo:     puesto.codigo,
      sectorNombre:     `Sector ${puesto.sectorId.replace('sec_', '')}`,
      inquilinoNombre:  socio.nombre,
      inquilinoCelular: socio.celular,
      sisaDiaria:       socio.sisaDiaria,
      montoSisa:        lastCobro.montoSisa,
      montoAbono:       lastCobro.montoAbono,
      totalPagado:      lastCobro.monto,
      deudaRestante:    Math.max(0, socio.deudaTotal),
      qrData:           `SISA|${ticketId}|${socio.nombre}|${lastCobro.monto}`,
    };
  }, [lastCobro, puestos, socios, config]);

  // ── Acciones ──────────────────────────────────────────────────────────────
  const cerrar = useCallback(() => {
    dispatch(closeTicketModal());
    dispatch(clearLastCobro());
  }, [dispatch]);

  const compartirWhatsApp = useCallback(() => {
    if (!ticket) return;
    window.open(buildWhatsappUrl(ticket), '_blank');
  }, [ticket]);

  const imprimir = useCallback(async () => {
    await exportElementAsPDF(
      'ticket-content',
      `SISA_${ticket?.id ?? 'ticket'}.pdf`,
    );
  }, [ticket]);

  const numeroFormateado = ticket ? formatTicketNumber(ticket.id) : '';

  return {
    ticket,
    isOpen,
    cerrar,
    compartirWhatsApp,
    imprimir,
    numeroFormateado,
  };
}