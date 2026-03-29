'use client';

import { useMemo } from 'react';
import clsx from 'clsx';
import { usePuestos } from '@/hooks/usePuestos';
import { useAppSelector } from '@/redux/hooks';
import type { PuestoEstado } from '@/interfaces/puesto.interface';

interface SectorFilterProps {
  /** Callback adicional al cambiar sector (opcional) */
  onChange?: (sectorId: string) => void;
}

/* Mini indicadores de estado dentro de cada chip */
const ESTADO_DOT: Record<PuestoEstado, string> = {
  pagado:   'bg-sisa-green',
  atendido: 'bg-sisa-amber',
  deuda:    'bg-sisa-red',
  libre:    'bg-gray-300',
};

export default function SectorFilter({ onChange }: SectorFilterProps) {
  const { puestosConSocio, filter, setFilter } = usePuestos();

  /* Construir lista de sectores únicos con conteo */
  const sectores = useMemo(() => {
    const map = new Map<string, { pagados: number; deuda: number; total: number }>();

    for (const p of puestosConSocio) {
      if (!map.has(p.sectorId)) {
        map.set(p.sectorId, { pagados: 0, deuda: 0, total: 0 });
      }
      const entry = map.get(p.sectorId)!;
      entry.total += 1;
      if (p.estado === 'pagado')         entry.pagados += 1;
      else if (p.estado === 'deuda')     entry.deuda   += 1;
    }

    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([id, counts]) => ({
        id,
        label: id.replace('sec_', 'Sector '),
        ...counts,
      }));
  }, [puestosConSocio]);

  const totalDeuda = puestosConSocio.filter((p) => p.estado === 'deuda').length;

  const handleSelect = (id: string) => {
    setFilter(id);
    onChange?.(id);
  };

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
      {/* Chip "Todos" */}
      <button
        onClick={() => handleSelect('todos')}
        className={clsx(
          'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold',
          'transition-all duration-150 whitespace-nowrap shrink-0 select-none',
          'focus:outline-none focus:ring-2 focus:ring-sisa-blue/40',
          filter === 'todos'
            ? 'bg-sisa-blue text-white shadow-sm'
            : 'bg-white text-gray-600 border border-gray-200 hover:border-sisa-blue hover:text-sisa-blue',
        )}
      >
        Todos
        {totalDeuda > 0 && (
          <span className={clsx(
            'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
            filter === 'todos'
              ? 'bg-white/20 text-white'
              : 'bg-red-100 text-sisa-red',
          )}>
            {totalDeuda}
          </span>
        )}
      </button>

      {/* Chip por cada sector */}
      {sectores.map(({ id, label, deuda }) => (
        <button
          key={id}
          onClick={() => handleSelect(id)}
          className={clsx(
            'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold',
            'transition-all duration-150 whitespace-nowrap shrink-0 select-none',
            'focus:outline-none focus:ring-2 focus:ring-sisa-blue/40',
            filter === id
              ? 'bg-sisa-blue text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-sisa-blue hover:text-sisa-blue',
          )}
        >
          {label}
          {deuda > 0 && (
            <span className={clsx(
              'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
              filter === id
                ? 'bg-white/20 text-white'
                : 'bg-red-100 text-sisa-red',
            )}>
              {deuda}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}