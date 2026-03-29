'use client';

import clsx from 'clsx';
import { useStats } from '@/hooks/useStats';
import type { StatsPeriodo } from '@/interfaces/stats.interface';

const TABS: { id: StatsPeriodo; label: string; sublabel: string }[] = [
  { id: 'hoy',    label: 'Hoy',    sublabel: 'Últimas 24h'  },
  { id: 'semana', label: 'Semana', sublabel: 'Últimos 7d'   },
  { id: 'mes',    label: 'Mes',    sublabel: 'Últimos 30d'   },
];

interface PeriodTabsProps {
  /** Mostrar sublabel descriptivo debajo del tab activo */
  showSublabel?: boolean;
}

export default function PeriodTabs({ showSublabel = false }: PeriodTabsProps) {
  const { periodo, cambiarPeriodo } = useStats();

  const activeSublabel = TABS.find((t) => t.id === periodo)?.sublabel;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex bg-gray-100 rounded-2xl p-1">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => cambiarPeriodo(id)}
            className={clsx(
              'flex-1 py-2 rounded-xl text-sm font-semibold',
              'transition-all duration-150 focus:outline-none',
              'focus:ring-2 focus:ring-sisa-blue/30 focus:ring-offset-1',
              periodo === id
                ? 'bg-white text-sisa-blue shadow-sm'
                : 'text-gray-500 hover:text-gray-700',
            )}
          >
            {label}
          </button>
        ))}
      </div>
      {showSublabel && activeSublabel && (
        <p className="text-xs text-gray-400 text-center">{activeSublabel}</p>
      )}
    </div>
  );
}