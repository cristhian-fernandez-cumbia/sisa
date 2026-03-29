'use client';

import { useMemo } from 'react';
import { Chip }    from '@/components/ui';
import { useDeudores } from '@/hooks/useDeudores';
import { useAppSelector } from '@/redux/hooks';
import clsx from 'clsx';

type FiltroId = 'todos' | 'mayor_deuda' | 'mas_dias' | 'por_sector';

const FILTROS: { id: FiltroId; label: string; icon: React.ReactNode }[] = [
  {
    id: 'todos',
    label: 'Todos',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    id: 'mayor_deuda',
    label: 'Mayor Deuda',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    id: 'mas_dias',
    label: 'Más Días',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'por_sector',
    label: 'Por Sector',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
];

interface DeudoresFilterProps {
  /** Mostrar también la barra de búsqueda */
  showSearch?: boolean;
}

export default function DeudoresFilter({ showSearch = true }: DeudoresFilterProps) {
  const {
    filtro,
    busqueda,
    setFiltro,
    setBusqueda,
    deudores,
    deudoresFiltrados,
  } = useDeudores();

  /* Contar deudores por sector para mostrar badge */
  const socios = useAppSelector((s) => s.socios.items);
  const sectorCounts = useMemo(() => {
    const map = new Map<string, number>();
    deudores.forEach((s) => {
      map.set(s.sectorId, (map.get(s.sectorId) ?? 0) + 1);
    });
    return map;
  }, [deudores]);

  return (
    <div className="flex flex-col gap-3">
      {/* Búsqueda */}
      {showSearch && (
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Buscar por nombre o puesto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sisa-blue/30 focus:border-sisa-blue transition-all"
          />
          {/* Limpiar búsqueda */}
          {busqueda && (
            <button
              onClick={() => setBusqueda('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Chips de filtro */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
        {FILTROS.map(({ id, label, icon }) => {
          const isActive = filtro === id;
          /* Contar resultados para el filtro activo */
          const showCount = id === 'todos' && deudores.length > 0;

          return (
            <button
              key={id}
              onClick={() => setFiltro(id as typeof filtro)}
              className={clsx(
                'flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold',
                'transition-all duration-150 whitespace-nowrap shrink-0 select-none',
                'focus:outline-none focus:ring-2 focus:ring-sisa-blue/40',
                isActive
                  ? 'bg-sisa-blue text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-sisa-blue hover:text-sisa-blue',
              )}
            >
              <span className={clsx(
                'shrink-0',
                isActive ? 'text-white' : 'text-gray-400',
              )}>
                {icon}
              </span>
              {label}
              {showCount && (
                <span className={clsx(
                  'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
                  isActive ? 'bg-white/20 text-white' : 'bg-red-100 text-sisa-red',
                )}>
                  {deudores.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Contador de resultados cuando hay búsqueda */}
      {busqueda.trim() && (
        <p className="text-xs text-gray-500 font-medium px-1">
          {deudoresFiltrados.length} resultado{deudoresFiltrados.length !== 1 ? 's' : ''}{' '}
          para &ldquo;{busqueda}&rdquo;
        </p>
      )}
    </div>
  );
}