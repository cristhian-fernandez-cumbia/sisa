'use client';

import { formatCurrency }       from '@/utils/formatCurrency';
import { formatDateLong }       from '@/utils/formatDate';
import { formatTime12h }        from '@/utils/formatTime';
import { formatTicketNumber }   from '@/utils/generateTicketId';
import type { Ticket }          from '@/interfaces/ticket.interface';
import clsx                     from 'clsx';

interface TicketContentProps {
  ticket:   Ticket;
  /** id para captura PDF — default "ticket-content" */
  domId?:   string;
  compact?: boolean;
}

function TicketRow({
  label,
  value,
  highlight,
}: {
  label:      string;
  value:      string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className={clsx('font-semibold', highlight ? 'text-gray-900' : 'text-gray-700')}>
        {value}
      </span>
    </div>
  );
}

export default function TicketContent({
  ticket,
  domId   = 'ticket-content',
  compact = false,
}: TicketContentProps) {
  return (
    <div
      id={domId}
      className={clsx(
        'bg-white rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden',
        compact && 'text-xs',
      )}
    >
      {/* ── Cabecera ── */}
      <div className="flex flex-col items-center pt-5 pb-4 px-5 bg-gray-50 border-b border-dashed border-gray-200">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-2">
          <svg
            className="w-5 h-5 text-sisa-blue"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">
          Comprobante de Pago
        </p>
        <p className="text-sm font-bold text-gray-700 mt-0.5">
          {formatTicketNumber(ticket.id)}
        </p>
      </div>

      {/* ── Cuerpo ── */}
      <div className="px-5 py-4 flex flex-col gap-4">

        {/* Mercado + fecha */}
        <div className="text-center">
          <p className="text-sm font-extrabold text-gray-900">{ticket.mercadoNombre}</p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-1">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDateLong(ticket.fechaEmision)}</span>
            <span>·</span>
            <span>{formatTime12h(ticket.horaEmision)}</span>
          </div>
        </div>

        {/* Separador punteado */}
        <div className="border-t border-dashed border-gray-200" />

        {/* Datos del cobrador y puesto */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-semibold">Cobrador</p>
            <p className="text-xs font-semibold text-gray-800">{ticket.cobradorNombre}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-semibold">Puesto / Sector</p>
            <p className="text-xs font-semibold text-gray-800">
              {ticket.puestoCodigo} | {ticket.sectorNombre}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-[10px] text-gray-400 uppercase font-semibold">Inquilino</p>
            <p className="text-xs font-semibold text-gray-800">{ticket.inquilinoNombre}</p>
          </div>
        </div>

        {/* Separador punteado */}
        <div className="border-t border-dashed border-gray-200" />

        {/* Montos */}
        <div className="flex flex-col gap-2">
          <TicketRow label="Sisa Diaria"  value={formatCurrency(ticket.sisaDiaria)} />
          <TicketRow label="Abono Deuda"  value={formatCurrency(ticket.montoAbono)} />
        </div>

        {/* Separador sólido */}
        <div className="border-t border-gray-200" />

        {/* Total pagado */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Total Pagado
          </p>
          <p className="text-4xl font-extrabold text-sisa-blue leading-none">
            {formatCurrency(ticket.totalPagado)}
          </p>
          {ticket.deudaRestante > 0 ? (
            <div className="bg-red-50 px-4 py-1.5 rounded-full">
              <p className="text-xs font-bold text-sisa-red">
                Deuda Restante: {formatCurrency(ticket.deudaRestante)}
              </p>
            </div>
          ) : (
            <div className="bg-green-50 px-4 py-1.5 rounded-full">
              <p className="text-xs font-bold text-sisa-green">
                ¡Sin deuda pendiente! 🎉
              </p>
            </div>
          )}
        </div>

        {/* QR placeholder */}
        <div className="border-t border-dashed border-gray-200 pt-4 flex flex-col items-center gap-2">
          <div className="w-20 h-20 border-2 border-gray-200 rounded-xl flex items-center justify-center bg-gray-50">
            <svg className="w-10 h-10 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h7v7H3zm1 1v5h5V4zm1 1h3v3H5zm8-2h7v7h-7zm1 1v5h5V4zm1 1h3v3h-3zM3 13h7v7H3zm1 1v5h5v-5zm1 1h3v3H5zm8 0h2v2h-2zm3 0h2v2h-2zm-3 3h2v2h-2zm3 0h2v2h-2z" />
            </svg>
          </div>
          <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">
            Escanee para verificar pago
          </p>
        </div>

      </div>
    </div>
  );
}