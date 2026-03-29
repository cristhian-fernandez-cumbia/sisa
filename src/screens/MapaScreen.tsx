'use client';

import TopBar, { TopBarIconBtn } from '@/components/layout/TopBar';
import MobileLayout               from '@/components/layout/MobileLayout';
import { PuestosGrid }            from '@/components/map';
import { PuestosLegend }          from '@/components/map';
import { PuestoDetailSheet }      from '@/components/puesto';
import { usePuestos }             from '@/hooks/usePuestos';
import type { PuestoConSocio }    from '@/interfaces/puesto.interface';

export default function MapaScreen() {
  const { seleccionar } = usePuestos();

  const handleSelectPuesto = (puesto: PuestoConSocio) => {
    if (puesto.inquilinoId) seleccionar(puesto.id);
  };

  return (
    <>
      <TopBar
        title="SISA Market"
        showMenuBtn
        rightAction={
          <TopBarIconBtn label="Buscar">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </TopBarIconBtn>
        }
      />

      {/* Padding bottom extra para la leyenda fija */}
      <MobileLayout className="pb-28">
        <PuestosGrid
          onSelectPuesto={handleSelectPuesto}
          showSearch
        />
      </MobileLayout>

      {/* Leyenda fija sobre el bottom nav */}
      <PuestosLegend variant="bar" showCounts />

      {/* Bottom sheet de detalle + modal de ticket (montados fuera del scroll) */}
      <PuestoDetailSheet />
    </>
  );
}