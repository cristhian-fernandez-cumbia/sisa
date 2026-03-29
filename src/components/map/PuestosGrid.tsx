'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import PuestoCard    from './PuestoCard';
import SectorFilter  from './SectorFilter';
import PuestosLegend from './PuestosLegend';
import { EmptyState } from '@/components/ui';
import { usePuestos } from '@/hooks/usePuestos';
import type { PuestoConSocio } from '@/interfaces/puesto.interface';

interface PuestosGridProps {
  onSelectPuesto?: (puesto: PuestoConSocio) => void;
  /** Mostrar barra de búsqueda interna */
  showSearch?: boolean;
  /** Número de columnas forzado (por defecto responsivo) */
  cols?: 3 | 4 | 5 | 6;
}

const COLS_CLASS: Record<number, string> = {
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

export default function PuestosGrid({
  onSelectPuesto,
  showSearch = false,
  cols,
}: PuestosGridProps) {
  const { puestosConSocio, filter } = usePuestos();
  const [search, setSearch]         = useState('');
  const [zoom,   setZoom]           = useState<'sm' | 'md'>('md');

  /* Filtrar por sector activo + búsqueda */
  const puestosMostrados = useMemo(() => {
    let list = filter === 'todos'
      ? puestosConSocio
      : puestosConSocio.filter((p) => p.sectorId === filter);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.codigo.toLowerCase().includes(q) ||
          p.socio?.nombre.toLowerCase().includes(q),
      );
    }

    /* Ordenar: primero por sector, luego por orden */
    return [...list].sort((a, b) => {
      const sectorCmp = a.sectorId.localeCompare(b.sectorId);
      if (sectorCmp !== 0) return sectorCmp;
      return a.orden - b.orden;
    });
  }, [puestosConSocio, filter, search]);

  const gridClass = cols
    ? COLS_CLASS[cols]
    : 'grid-cols-4 sm:grid-cols-5 lg:grid-cols-6';

  return (
    <div className="flex flex-col gap-3">
      {/* Búsqueda interna (opcional) */}
      {showSearch && (
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Buscar puesto o inquilino..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sisa-blue/30 focus:border-sisa-blue transition-all"
          />
        </div>
      )}

      {/* Filtros de sector */}
      <SectorFilter />

      {/* Contador de resultados cuando hay búsqueda */}
      {search.trim() && (
        <p className="text-xs text-gray-500 font-medium">
          {puestosMostrados.length} resultado{puestosMostrados.length !== 1 ? 's' : ''} para &ldquo;{search}&rdquo;
        </p>
      )}

      {/* Grid */}
      {puestosMostrados.length === 0 ? (
        <EmptyState
          icon={
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
          title="Sin puestos"
          description={search ? 'No coincide con ningún puesto' : 'No hay puestos en este sector'}
        />
      ) : (
        <div className={clsx('grid gap-2.5', gridClass)}>
          {puestosMostrados.map((puesto) => (
            <PuestoCard
              key={puesto.id}
              puesto={puesto}
              size={zoom}
              highlight={!!search && (
                puesto.codigo.toLowerCase().includes(search.toLowerCase()) ||
                (puesto.socio?.nombre.toLowerCase().includes(search.toLowerCase()) ?? false)
              )}
              onClick={onSelectPuesto}
            />
          ))}
        </div>
      )}

      {/* Controles de zoom flotantes */}
      <div className="fixed bottom-24 right-4 flex flex-col gap-2 z-20 lg:bottom-8">
        <button
          onClick={() => setZoom('md')}
          className={clsx(
            'w-10 h-10 rounded-2xl flex items-center justify-center shadow-card transition-all',
            zoom === 'md' ? 'bg-sisa-blue text-white' : 'bg-white text-gray-500 hover:bg-gray-50',
          )}
          aria-label="Zoom normal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button
          onClick={() => setZoom('sm')}
          className={clsx(
            'w-10 h-10 rounded-2xl flex items-center justify-center shadow-card transition-all',
            zoom === 'sm' ? 'bg-sisa-blue text-white' : 'bg-white text-gray-500 hover:bg-gray-50',
          )}
          aria-label="Zoom reducido"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
          </svg>
        </button>
      </div>
    </div>
  );
}