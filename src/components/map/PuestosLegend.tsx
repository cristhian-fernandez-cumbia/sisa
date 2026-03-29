'use client';

import { useMemo } from 'react';
import clsx from 'clsx';
import { usePuestos } from '@/hooks/usePuestos';
import type { PuestoEstado } from '@/interfaces/puesto.interface';

interface LegendItem {
  estado:  PuestoEstado;
  label:   string;
  color:   string;
  count:   number;
}

interface PuestosLegendProps {
  /** Si true muestra el conteo de puestos en cada estado */
  showCounts?: boolean;
  /** 'bar' muestra la leyenda fija pegada al fondo, 'inline' la muestra como fila */
  variant?: 'bar' | 'inline';
}

export default function PuestosLegend({
  showCounts = false,
  variant    = 'bar',
}: PuestosLegendProps) {
  const { puestos } = usePuestos();

  const items: LegendItem[] = useMemo(() => [
    {
      estado: 'pagado',
      label:  'Pagado',
      color:  'bg-sisa-green',
      count:  puestos.filter((p) => p.estado === 'pagado').length,
    },
    {
      estado: 'atendido',
      label:  'Atendido',
      color:  'bg-sisa-amber',
      count:  puestos.filter((p) => p.estado === 'atendido').length,
    },
    {
      estado: 'deuda',
      label:  'Deuda',
      color:  'bg-sisa-red',
      count:  puestos.filter((p) => p.estado === 'deuda').length,
    },
    {
      estado: 'libre',
      label:  'Libre',
      color:  'bg-gray-300',
      count:  puestos.filter((p) => p.estado === 'libre').length,
    },
  ], [puestos]);

  const content = (
    <div className={clsx(
      'flex items-center',
      variant === 'bar'
        ? 'justify-around lg:justify-start lg:gap-8'
        : 'gap-4 flex-wrap',
    )}>
      {items.map(({ estado, label, color, count }) => (
        <span
          key={estado}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-600"
        >
          <span className={clsx('w-2.5 h-2.5 rounded-full shrink-0', color)} />
          <span>{label}</span>
          {showCounts && count > 0 && (
            <span className="text-gray-400 font-normal">({count})</span>
          )}
        </span>
      ))}
    </div>
  );

  if (variant === 'inline') {
    return content;
  }

  /* Variant 'bar' — barra fija pegada al bottom nav */
  return (
    <div className={clsx(
      'fixed bottom-[64px] left-0 right-0 z-20',
      'bg-white border-t border-gray-100 shadow-nav',
      'lg:left-64 lg:bottom-0',
    )}>
      <div className="max-w-2xl mx-auto px-4 py-2.5 lg:max-w-4xl lg:px-8">
        {content}
      </div>
    </div>
  );
}