'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui';
import { useAsistencias } from '@/hooks/useAsistencias';
import { useCobros }      from '@/hooks/useCobros';
import { formatDateDayMonth } from '@/utils/formatDate';
import { formatCurrency }     from '@/utils/formatCurrency';
import clsx from 'clsx';

interface PuestoHistorialProps {
  puestoId: string;
  limit?:   number;
}

type DiaEstado = 'pagado' | 'atendido' | 'no_abrio';

interface DiaEntry {
  fecha:    string;
  estado:   DiaEstado;
  monto:    number;
  abrio:    boolean;
}

/* ── Ícono por estado del día ── */
function DayIcon({ estado }: { estado: DiaEstado }) {
  if (estado === 'pagado') {
    return (
      <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
        <svg className="w-3.5 h-3.5 text-sisa-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    );
  }
  if (estado === 'atendido') {
    return (
      <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
        <svg className="w-3.5 h-3.5 text-sisa-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  );
}

export default function PuestoHistorial({ puestoId, limit = 5 }: PuestoHistorialProps) {
  const { getHistorialPuesto }  = useAsistencias();
  const { getCobrosDelPuesto }  = useCobros();

  const asistencias   = getHistorialPuesto(puestoId, limit);
  const cobros        = getCobrosDelPuesto(puestoId, limit * 2);

  const dias: DiaEntry[] = useMemo(() =>
    asistencias.map((asi) => {
      const cobro = cobros.find(
        (c) => c.fecha === asi.fecha && c.tipo !== 'solo_asistencia',
      );

      let estado: DiaEstado = 'no_abrio';
      if (asi.abrio && cobro && cobro.monto > 0) {
        estado = 'pagado';
      } else if (asi.abrio) {
        estado = 'atendido';
      }

      return {
        fecha:  asi.fecha,
        estado,
        monto:  cobro?.monto ?? 0,
        abrio:  asi.abrio,
      };
    }),
    [asistencias, cobros],
  );

  return (
    <div>
      <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-2">
        Historial Reciente
      </p>

      <Card padding="md">
        {dias.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-3 italic">
            Sin historial registrado
          </p>
        ) : (
          <div className="flex flex-col gap-0">
            {dias.map((dia, idx) => (
              <div key={dia.fecha}>
                <div className="flex items-center gap-3 py-2">
                  <DayIcon estado={dia.estado} />

                  {/* Línea vertical conectora (excepto el último) */}
                  <div className="relative flex flex-col items-center self-stretch">
                    {idx < dias.length - 1 && (
                      <div className="absolute top-7 left-1/2 -translate-x-1/2 w-px h-full bg-gray-100" />
                    )}
                  </div>

                  {/* Fecha */}
                  <p className="text-sm text-gray-600 flex-1 font-medium">
                    {formatDateDayMonth(dia.fecha)}
                  </p>

                  {/* Resultado */}
                  <p className={clsx(
                    'text-sm font-semibold',
                    dia.estado === 'pagado'  ? 'text-sisa-green'
                    : dia.estado === 'atendido' ? 'text-sisa-amber'
                    : 'text-gray-400 italic',
                  )}>
                    {dia.estado === 'pagado'
                      ? formatCurrency(dia.monto)
                      : dia.estado === 'atendido'
                      ? 'Debe'
                      : 'No abrió'}
                  </p>
                </div>

                {/* Separador sutil entre filas */}
                {idx < dias.length - 1 && (
                  <div className="ml-10 border-t border-gray-50" />
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}