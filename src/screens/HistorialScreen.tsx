'use client';

import { useState } from 'react';
import TopBar, { TopBarIconBtn } from '@/components/layout/TopBar';
import MobileLayout               from '@/components/layout/MobileLayout';
import { HistorialSummary }       from '@/components/historial/';
import { HistorialList }          from '@/components/historial/';
import { getTodayISO, getLastNDays } from '@/utils/formatDate';
import clsx from 'clsx';

export default function HistorialScreen() {
  const [fechaSelected, setFechaSelected] = useState(getTodayISO());

  /* Últimos 7 días para el selector de fecha */
  const ultimos7 = getLastNDays(7).reverse();

  return (
    <>
      <TopBar
        title="Historial"
        showMenuBtn
        rightAction={
          <div className="flex gap-1">
            <TopBarIconBtn label="Buscar">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </TopBarIconBtn>
            <TopBarIconBtn label="Más opciones">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </TopBarIconBtn>
          </div>
        }
      />

      <MobileLayout>
        {/* ── Selector de fecha (últimos 7 días) ── */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 mb-4">
          {ultimos7.map((fecha) => {
            const isToday    = fecha === getTodayISO();
            const isSelected = fecha === fechaSelected;
            const d          = new Date(fecha + 'T00:00:00');
            const dayNum     = d.getDate();
            const dayName    = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'][d.getDay()];

            return (
              <button
                key={fecha}
                onClick={() => setFechaSelected(fecha)}
                className={clsx(
                  'flex flex-col items-center px-3 py-2 rounded-2xl shrink-0 min-w-13',
                  'transition-all duration-150',
                  isSelected
                    ? 'bg-sisa-blue text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-sisa-blue',
                )}
              >
                <span className="text-[10px] font-semibold">{dayName}</span>
                <span className="text-base font-extrabold">{dayNum}</span>
                {isToday && (
                  <span className={clsx(
                    'w-1.5 h-1.5 rounded-full mt-0.5',
                    isSelected ? 'bg-white' : 'bg-sisa-blue',
                  )} />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Resumen del día seleccionado ── */}
        <div className="mb-5">
          <HistorialSummary fecha={fechaSelected} />
        </div>

        {/* ── Lista cronológica con exportar PDF ── */}
        <HistorialList
          fecha={fechaSelected}
          showGroups
          showExport
        />
      </MobileLayout>
    </>
  );
}