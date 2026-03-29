'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Badge, EmptyState } from '@/components/ui';
import { useCobros }  from '@/hooks/useCobros';
import { usePuestos } from '@/hooks/usePuestos';
import { useSocios }  from '@/hooks/useSocios';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatTime12h }  from '@/utils/formatTime';
import { ROUTES, TIPO_COBRO_LABELS } from '@/utils/constants';
import clsx from 'clsx';

interface RecentActivityProps {
  limit?: number;
  /** Filtra por nombre de socio o código de puesto */
  query?: string;
}

type EstadoIcon = 'pagado' | 'atendido' | 'noAbrio';

function ActivityIcon({ tipo }: { tipo: EstadoIcon }) {
  if (tipo === 'pagado') {
    return (
      <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
        <svg className="w-4 h-4 text-sisa-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    );
  }
  if (tipo === 'atendido') {
    return (
      <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
        <svg className="w-4 h-4 text-sisa-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    </div>
  );
}

const BADGE_VARIANT_MAP: Record<string, 'pagado' | 'atendido' | 'deuda' | 'libre'> = {
  pago:            'pagado',
  abono:           'atendido',
  solo_asistencia: 'libre',
};

const ACCENT_MAP: Record<string, string> = {
  pago:            'border-l-sisa-green',
  abono:           'border-l-sisa-amber',
  solo_asistencia: 'border-l-gray-200',
};

export default function RecentActivity({ limit = 5, query = '' }: RecentActivityProps) {
  const router      = useRouter();
  const { cobrosHoy } = useCobros();
  const { puestos }   = usePuestos();
  const { socios }    = useSocios();

  const items = useMemo(() => {
    let list = cobrosHoy.slice(0, limit * 2); // traemos más para filtrar

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((c) => {
        const socio  = socios.find((s) => s.id === c.socioId);
        const puesto = puestos.find((p) => p.id === c.puestoId);
        return (
          socio?.nombre.toLowerCase().includes(q) ||
          puesto?.codigo.toLowerCase().includes(q)
        );
      });
    }

    return list.slice(0, limit).map((c) => ({
      cobro:  c,
      socio:  socios.find((s) => s.id === c.socioId),
      puesto: puestos.find((p) => p.id === c.puestoId),
    }));
  }, [cobrosHoy, limit, query, socios, puestos]);

  if (items.length === 0) {
    return (
      <EmptyState
        icon={
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        title={query ? 'Sin resultados' : 'Sin actividad hoy'}
        description={query ? 'Prueba con otro término' : 'Los cobros registrados aparecerán aquí'}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {items.map(({ cobro, socio, puesto }) => {
        const isPago     = cobro.tipo === 'pago' || cobro.tipo === 'abono';
        const iconTipo: EstadoIcon =
          cobro.tipo === 'pago'            ? 'pagado'
          : cobro.tipo === 'abono'         ? 'atendido'
          : 'noAbrio';

        return (
          <Card
            key={cobro.id}
            padding="md"
            hoverable
            onClick={() => router.push(ROUTES.HISTORIAL)}
            className={clsx('border-l-4', ACCENT_MAP[cobro.tipo] ?? 'border-l-gray-200')}
          >
            <div className="flex items-center gap-3">
              <ActivityIcon tipo={iconTipo} />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {puesto?.codigo ?? '—'} — {socio?.nombre ?? 'Sin nombre'}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {formatTime12h(cobro.hora)}
                </p>
              </div>

              <div className="text-right shrink-0">
                <p className={clsx(
                  'text-sm font-bold',
                  isPago ? 'text-sisa-green' : 'text-gray-400',
                )}>
                  {cobro.monto > 0 ? formatCurrency(cobro.monto) : 'S/ 0.00'}
                </p>
                <Badge
                  variant={BADGE_VARIANT_MAP[cobro.tipo] ?? 'libre'}
                  size="sm"
                  className="mt-0.5"
                >
                  {TIPO_COBRO_LABELS[cobro.tipo] ?? cobro.tipo}
                </Badge>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}