'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopBar, { TopBarIconBtn } from '@/components/layout/TopBar';
import MobileLayout               from '@/components/layout/MobileLayout';
import { Avatar, Button }         from '@/components/ui';
import { SummaryCards } from '@/components/dashboard';
import { ProgressRoute }          from '@/components/dashboard';
import { RecentActivity }         from '@/components/dashboard';
import { useAppSelector }         from '@/redux/hooks';
import { formatDateLong, getTodayISO } from '@/utils/formatDate';
import { ROUTES } from '@/utils/constants';

export default function DashboardScreen() {
  const router = useRouter();
  const user   = useAppSelector((s) => s.auth.user);
  const [search, setSearch] = useState('');

  const fechaLabel = formatDateLong(getTodayISO()).toUpperCase();

  return (
    <>
      <TopBar
        showMenuBtn
        rightAction={
          <TopBarIconBtn
            label="Configuración"
            onClick={() => router.push(ROUTES.PERFIL)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </TopBarIconBtn>
        }
      />

      <MobileLayout>
        {/* ── Saludo + fecha ── */}
        <div className="flex items-center gap-3 mb-5">
          <Avatar name={user?.nombre} src={user?.avatar} size="md" badge="online" />
          <div>
            <p className="text-lg font-bold text-gray-900">
              Buenos días, {user?.nombre.split(' ')[0]} 👋
            </p>
            <p className="text-xs text-gray-400 font-medium">{fechaLabel}</p>
          </div>
        </div>

        {/* ── Búsqueda rápida ── */}
        <div className="relative mb-5">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Buscar puestos o clientes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sisa-blue/30 focus:border-sisa-blue transition-all"
          />
        </div>

        {/* ── Resumen de hoy ── */}
        <h2 className="text-sm font-bold text-gray-700 mb-3">Resumen de Hoy</h2>
        <div className="mb-5">
          <SummaryCards />
        </div>

        {/* ── Progreso del recorrido ── */}
        <div className="mb-5">
          <ProgressRoute showBreakdown />
        </div>

        {/* ── Actividad reciente ── */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-700">Actividad Reciente</h2>
          <button
            onClick={() => router.push(ROUTES.HISTORIAL)}
            className="text-xs text-sisa-blue font-semibold hover:underline"
          >
            Ver todo
          </button>
        </div>
        <div className="mb-6">
          <RecentActivity limit={5} query={search} />
        </div>

        {/* ── FAB: Ir al mapa ── */}
        <div className="fixed bottom-20 left-0 right-0 px-4 lg:bottom-6 lg:left-64 pointer-events-none">
          <div className="max-w-2xl mx-auto pointer-events-auto">
            <Button
              fullWidth
              size="lg"
              onClick={() => router.push(ROUTES.MAPA)}
              className="shadow-fab"
              leftIcon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              }
            >
              IR AL MAPA DE PUESTOS
            </Button>
          </div>
        </div>
      </MobileLayout>
    </>
  );
}