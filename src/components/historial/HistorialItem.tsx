'use client';

import { Card, Badge } from '@/components/ui';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatTime12h }  from '@/utils/formatTime';
import { TIPO_COBRO_LABELS, TIPO_COBRO_BORDER } from '@/utils/constants';
import type { CobroDetalle } from '@/interfaces/cobro.interface';
import clsx from 'clsx';

interface HistorialItemProps {
  cobro:     CobroDetalle;
  onClick?:  (cobro: CobroDetalle) => void;
}

/* Variante del badge según tipo de cobro */
const BADGE_MAP: Record<string, 'pagado' | 'atendido' | 'libre' | 'gray'> = {
  pago:            'pagado',
  abono:           'atendido',
  solo_asistencia: 'libre',
};

/* Ícono según tipo */
function TipoIcon({ tipo }: { tipo: string }) {
  if (tipo === 'pago') {
    return (
      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
        <svg className="w-4 h-4 text-sisa-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    );
  }
  if (tipo === 'abono') {
    return (
      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
        <svg className="w-4 h-4 text-sisa-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </div>
  );
}

export default function HistorialItem({ cobro, onClick }: HistorialItemProps) {
  const isPago  = cobro.tipo === 'pago' || cobro.tipo === 'abono';
  const hasAbono = cobro.montoAbono > 0;

  return (
    <Card
      padding="md"
      hoverable={!!onClick}
      onClick={() => onClick?.(cobro)}
      className={clsx(
        'border-l-4',
        TIPO_COBRO_BORDER[cobro.tipo] ?? 'border-l-gray-200',
      )}
    >
      <div className="flex items-center gap-3">
        <TipoIcon tipo={cobro.tipo} />

        {/* Centro: puesto + nombre + hora */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              PUESTO {cobro.puesto.codigo}
            </span>
            <span className="text-xs text-gray-400">
              {formatTime12h(cobro.hora)}
            </span>
          </div>
          <p className="text-sm font-semibold text-gray-900 truncate">
            {cobro.socio.nombre}
          </p>
          {/* Detalle de abono si aplica */}
          {hasAbono && (
            <p className="text-xs text-gray-400 mt-0.5">
              Sisa: {formatCurrency(cobro.montoSisa)} + Abono: {formatCurrency(cobro.montoAbono)}
            </p>
          )}
        </div>

        {/* Derecha: monto + tipo */}
        <div className="text-right shrink-0">
          <p className={clsx(
            'text-sm font-extrabold leading-tight',
            isPago       ? 'text-sisa-green'
            : 'text-gray-400',
          )}>
            {cobro.monto > 0 ? formatCurrency(cobro.monto) : 'S/ 0.00'}
          </p>
          <Badge
            variant={BADGE_MAP[cobro.tipo] ?? 'gray'}
            size="sm"
            className="mt-1"
          >
            {TIPO_COBRO_LABELS[cobro.tipo] ?? cobro.tipo}
          </Badge>
        </div>
      </div>
    </Card>
  );
}