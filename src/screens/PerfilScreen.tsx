'use client';

import { ReactNode } from 'react';
import TopBar        from '@/components/layout/TopBar';
import MobileLayout  from '@/components/layout/MobileLayout';
import { Card, Avatar, Badge } from '@/components/ui';
import { useAuth }             from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleTheme }   from '@/redux/slices/uiSlice';
import { addToast }      from '@/redux/slices/uiSlice';
import { resetToSeedData } from '@/utils/seedData';
import clsx from 'clsx';

/* ── Componentes internos reutilizables ── */

interface SettingItemProps {
  icon:     ReactNode;
  label:    string;
  value?:   string;
  badge?:   ReactNode;
  onClick?: () => void;
  danger?:  boolean;
}

function SettingItem({ icon, label, value, badge, onClick, danger }: SettingItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex items-center gap-3 w-full px-4 py-3.5 text-left transition-colors duration-150',
        danger ? 'hover:bg-red-50 active:bg-red-100' : 'hover:bg-gray-50 active:bg-gray-100',
        !onClick && 'cursor-default',
      )}
    >
      <span className={clsx('shrink-0 w-4 h-4', danger ? 'text-sisa-red' : 'text-sisa-blue')}>
        {icon}
      </span>
      <span className={clsx('flex-1 text-sm font-medium', danger ? 'text-sisa-red' : 'text-gray-700')}>
        {label}
      </span>
      {badge && <span className="shrink-0">{badge}</span>}
      {value && <span className="text-xs text-gray-400 shrink-0">{value}</span>}
      {onClick && !badge && !value && (
        <svg className="w-4 h-4 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );
}

function SectionGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-4">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-1 mb-2">
        {title}
      </p>
      <Card padding="none" className="overflow-hidden divide-y divide-gray-100">
        {children}
      </Card>
    </div>
  );
}

/* ── Pantalla principal ── */

export default function PerfilScreen() {
  const dispatch = useAppDispatch();
  const { user, logout } = useAuth();
  const theme  = useAppSelector((s) => s.ui.theme);
  const config = useAppSelector((s) => s.config.data);

  const handleResetData = () => {
    resetToSeedData();
    dispatch(addToast({ type: 'success', message: 'Datos reseteados al estado inicial ✓' }));
    window.location.reload();
  };

  return (
    <>
      <TopBar
        title="SISA Control"
        showMenuBtn
        rightAction={
          user ? (
            <div className="w-8 h-8 rounded-full bg-sisa-blue flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {user.nombre.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
              </span>
            </div>
          ) : undefined
        }
      />

      <MobileLayout>

        {/* ── Header del perfil ── */}
        <div className="flex flex-col items-center py-6 mb-4">
          <div className="relative mb-3">
            <Avatar name={user?.nombre} src={user?.avatar} size="xl" />
            <button
              type="button"
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-sisa-blue flex items-center justify-center shadow-sm"
              aria-label="Editar foto"
            >
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          <h2 className="text-lg font-extrabold text-gray-900">{user?.nombre}</h2>
          <p className="text-sm text-sisa-blue font-semibold">{user?.cargo}</p>
          {config && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-xs text-gray-400">{config.mercadoNombre}</p>
            </div>
          )}
        </div>

        {/* ── Mi Perfil ── */}
        <SectionGroup title="Mi Perfil">
          <SettingItem
            onClick={() => {}}
            label="Cambiar contraseña"
            icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
          />
          <SettingItem
            onClick={() => {}}
            label="Datos personales"
            icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2" /></svg>}
          />
        </SectionGroup>

        {/* ── Mi Ruta ── */}
        <SectionGroup title="Mi Ruta">
          <SettingItem onClick={() => {}} label="Puestos asignados"    icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>} />
          <SettingItem onClick={() => {}} label="Configurar sectores"  icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>} />
          <SettingItem onClick={() => {}} label="Orden de recorrido"   icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>} />
        </SectionGroup>

        {/* ── Puestos ── */}
        <SectionGroup title="Puestos">
          <SettingItem onClick={() => {}} label="Gestionar inquilinos"   icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
          <SettingItem onClick={() => {}} label="Configurar sisa diaria" icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
          <SettingItem onClick={() => {}} label="Agregar/editar puesto"  icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>} />
        </SectionGroup>

        {/* ── Reportes ── */}
        <SectionGroup title="Reportes">
          <SettingItem onClick={() => {}} label="Enviar reporte diario"   icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>} />
          <SettingItem onClick={() => {}} label="Exportar historial"      icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} />
          <SettingItem onClick={() => {}} label="Configurar WhatsApp"     icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>} />
        </SectionGroup>

        {/* ── Sistema ── */}
        <SectionGroup title="Sistema">
          {/* Toggle dark/light */}
          <div className="px-4 py-3.5 flex items-center gap-3">
            <span className="text-sisa-blue shrink-0 w-4 h-4">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </span>
            <span className="flex-1 text-sm font-medium text-gray-700">Tema claro / oscuro</span>
            <button
              type="button"
              onClick={() => dispatch(toggleTheme())}
              role="switch"
              aria-checked={theme === 'dark'}
              className={clsx(
                'relative w-12 h-7 rounded-full transition-colors duration-200',
                theme === 'dark' ? 'bg-sisa-blue' : 'bg-gray-300',
              )}
            >
              <span className={clsx(
                'absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-200',
                theme === 'dark' ? 'translate-x-5.5' : 'translate-x-0.5',
              )} />
            </button>
          </div>

          <SettingItem
            onClick={() => {}}
            label="Notificaciones"
            icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>}
          />
          <SettingItem
            onClick={() => {}}
            label="Sincronización"
            badge={<Badge variant="pagado" size="sm">AL DÍA</Badge>}
            icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>}
          />
          <SettingItem
            onClick={handleResetData}
            label="Resetear datos (dev)"
            value="⚠️"
            icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>}
          />
          <SettingItem
            label="Acerca de"
            value={`VERSIÓN ${config?.version ?? '2.4.0'}`}
            icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
        </SectionGroup>

        {/* ── Cerrar sesión ── */}
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-red-50 border border-red-200 rounded-2xl text-sisa-red font-semibold text-sm hover:bg-red-100 transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          CERRAR SESIÓN
        </button>
      </MobileLayout>
    </>
  );
}