'use client';

import { useMemo } from 'react';
import { Card, ProgressBar } from '@/components/ui';
import { useAsistencias } from '@/hooks/useAsistencias';
import { usePuestos }     from '@/hooks/usePuestos';
import clsx from 'clsx';

interface ProgressRouteProps {
  /** Mostrar desglose por estado debajo de la barra */
  showBreakdown?: boolean;
}

export default function ProgressRoute({ showBreakdown = false }: ProgressRouteProps) {
  const { contadores: asiContadores } = useAsistencias();
  const { puestos, contadores }       = usePuestos();

  const totalConInquilino = puestos.filter((p) => p.inquilinoId).length;

  const progresoPct = totalConInquilino > 0
    ? Math.round((asiContadores.total / totalConInquilino) * 100)
    : 0;

  /* Color de la barra según progreso */
  const barColor = progresoPct >= 80
    ? 'green'
    : progresoPct >= 40
    ? 'blue'
    : 'amber';

  const breakdown = useMemo(() => [
    {
      label:  'Pagados',
      count:  contadores.pagados,
      color:  'bg-sisa-green',
      text:   'text-sisa-green',
    },
    {
      label:  'Atendidos',
      count:  contadores.atendidos,
      color:  'bg-sisa-amber',
      text:   'text-sisa-amber',
    },
    {
      label:  'Con deuda',
      count:  contadores.deuda,
      color:  'bg-sisa-red',
      text:   'text-sisa-red',
    },
    {
      label:  'Sin abrir',
      count:  contadores.libres,
      color:  'bg-gray-300',
      text:   'text-gray-400',
    },
  ], [contadores]);

  return (
    <Card padding="md">
      {/* Cabecera */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-bold text-gray-900">Progreso del Recorrido</p>
          {totalConInquilino > 0 && (
            <p className="text-xs text-gray-400 mt-0.5">
              {asiContadores.total} de {totalConInquilino} puestos visitados hoy
            </p>
          )}
        </div>
        <span className={clsx(
          'text-lg font-extrabold',
          barColor === 'green' ? 'text-sisa-green'
          : barColor === 'blue' ? 'text-sisa-blue'
          : 'text-sisa-amber',
        )}>
          {progresoPct}%
        </span>
      </div>

      {/* Barra de progreso */}
      <ProgressBar
        value={progresoPct}
        size="lg"
        color={barColor}
      />

      {/* Indicador de ruta */}
      <div className="flex items-center gap-1.5 mt-2">
        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        <p className="text-xs text-gray-400">
          {progresoPct === 100
            ? '¡Recorrido completo! 🎉'
            : progresoPct === 0
            ? 'Recorrido no iniciado'
            : `${totalConInquilino - asiContadores.total} puestos restantes`}
        </p>
      </div>

      {/* Desglose opcional */}
      {showBreakdown && (
        <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-gray-100">
          {breakdown.map(({ label, count, color, text }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1">
                <span className={clsx('w-2 h-2 rounded-full', color)} />
                <span className={clsx('text-sm font-extrabold', text)}>{count}</span>
              </div>
              <span className="text-[10px] text-gray-400 text-center leading-tight">{label}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}