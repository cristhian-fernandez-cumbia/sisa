'use client';

import TopBar, { TopBarIconBtn } from '@/components/layout/TopBar';
import MobileLayout               from '@/components/layout/MobileLayout';
import { DeudoresFilter }         from '@/components/deudores/';
import { DeudoresList }           from '@/components/deudores/';

export default function DeudoresScreen() {
  return (
    <>
      <TopBar
        title="Deudores"
        showMenuBtn
        rightAction={
          <TopBarIconBtn label="Filtrar">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </TopBarIconBtn>
        }
      />

      <MobileLayout>
        {/* Búsqueda + chips de filtro */}
        <div className="mb-4">
          <DeudoresFilter showSearch />
        </div>

        {/* Lista de deudores con banner de resumen */}
        <DeudoresList showSummary showRank />
      </MobileLayout>
    </>
  );
}