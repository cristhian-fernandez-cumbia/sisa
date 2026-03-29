'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui';
import { useCobros }      from '@/hooks/useCobros';
import { useAsistencias } from '@/hooks/useAsistencias';
import { usePuestos }     from '@/hooks/usePuestos';
import { useSocios }      from '@/hooks/useSocios';
import { formatCurrency } from '@/utils/formatCurrency';
import clsx from 'clsx';

interface SummaryCardData {
  label:     string;
  value:     string;
  sub:       string;
  accentClass: string;
  bgLight:   string;
  iconColor: string;
  icon:      React.ReactNode;
}

function SummaryCard({ card }: { card: SummaryCardData }) {
  return (
    <Card
      padding="md"
      className={clsx('border-l-4', card.accentClass)}
    >
      {/* Ícono */}
      <div className={clsx(
        'w-9 h-9 rounded-xl flex items-center justify-center mb-2.5',
        card.bgLight,
        card.iconColor,
      )}>
        {card.icon}
      </div>

      {/* Sub-etiqueta de estado */}
      <p className={clsx('text-[10px] font-bold tracking-widest uppercase mb-0.5', card.iconColor)}>
        {card.sub}
      </p>

      {/* Valor principal */}
      <p className="text-[15px] font-extrabold text-gray-900 leading-tight">
        {card.value}
      </p>

      {/* Label descriptivo */}
      <p className="text-xs text-gray-400 mt-0.5">{card.label}</p>
    </Card>
  );
}

export default function SummaryCards() {
  const { totalHoy }                    = useCobros();
  const { contadores: asiContadores }   = useAsistencias();
  const { contadores: pstContadores, puestos } = usePuestos();
  const { socios }                      = useSocios();

  const totalConInquilino = puestos.filter((p) => p.inquilinoId).length;

  const totalPendiente = useMemo(() =>
    socios
      .filter((s) => s.activo && s.deudaTotal > 0)
      .reduce((sum, s) => sum + s.deudaTotal, 0),
    [socios],
  );

  const cards: SummaryCardData[] = [
    {
      label:       'Cobrado Hoy',
      value:       formatCurrency(totalHoy),
      sub:         'Completado',
      accentClass: 'border-l-sisa-green',
      bgLight:     'bg-green-50',
      iconColor:   'text-sisa-green',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      label:       'Pendiente',
      value:       formatCurrency(totalPendiente),
      sub:         'Deuda',
      accentClass: 'border-l-sisa-red',
      bgLight:     'bg-red-50',
      iconColor:   'text-sisa-red',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    {
      label:       'Visitados',
      value:       `${asiContadores.total}/${totalConInquilino}`,
      sub:         'Puestos',
      accentClass: 'border-l-sisa-blue',
      bgLight:     'bg-blue-50',
      iconColor:   'text-sisa-blue',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
    },
    {
      label:       'Sin Abrir',
      value:       `${pstContadores.libres} puestos`,
      sub:         'Hoy',
      accentClass: 'border-l-gray-300',
      bgLight:     'bg-gray-50',
      iconColor:   'text-gray-400',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {cards.map((card) => (
        <SummaryCard key={card.label} card={card} />
      ))}
    </div>
  );
}