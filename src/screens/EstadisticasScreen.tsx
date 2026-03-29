'use client';

import { useEffect } from 'react';
import TopBar, { TopBarIconBtn } from '@/components/layout/TopBar';
import MobileLayout               from '@/components/layout/MobileLayout';
import { PeriodTabs }             from '@/components/stats/';
import { SummaryMetrics }         from '@/components/stats/';
import { BarChartCobros }         from '@/components/stats/';
import { SectorBreakdown }        from '@/components/stats/';
import { TopDebtors }             from '@/components/stats/';
import { useStats }               from '@/hooks/useStats';

export default function EstadisticasScreen() {
  const { calcular } = useStats();

  /* Calcular stats al montar la pantalla */
  useEffect(() => { calcular(); }, []);

  return (
    <>
      <TopBar
        title="Estadísticas"
        showMenuBtn
        rightAction={
          <TopBarIconBtn label="Buscar">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </TopBarIconBtn>
        }
      />

      <MobileLayout>
        {/* Selector Hoy / Semana / Mes */}
        <div className="mb-5">
          <PeriodTabs showSublabel />
        </div>

        {/* 3 tarjetas: Recaudado / Deuda / Tasa */}
        <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-3">
          Resumen del Período
        </p>
        <div className="mb-5">
          <SummaryMetrics />
        </div>

        {/* Gráfica de barras */}
        <div className="mb-5">
          <BarChartCobros />
        </div>

        {/* Desglose por sector */}
        <p className="text-sm font-bold text-gray-900 mb-3">Desglose por Sector</p>
        <div className="mb-5">
          <SectorBreakdown />
        </div>

        {/* Ranking de deudores */}
        <div className="mb-6">
          <TopDebtors limit={3} showViewAll />
        </div>
      </MobileLayout>
    </>
  );
}