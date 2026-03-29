'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setSideNav } from '@/redux/slices/uiSlice';
import { useAuth } from '@/hooks/useAuth';
import Avatar from '@/components/ui/Avatar';
import { ROUTES } from '@/utils/constants';

const NAV_ITEMS = [
  {
    href:  ROUTES.DASHBOARD,
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href:  ROUTES.MAPA,
    label: 'Mapa de puestos',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    href:  ROUTES.STATS,
    label: 'Estadísticas',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    href:  ROUTES.HISTORIAL,
    label: 'Historial',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href:  ROUTES.DEUDORES,
    label: 'Deudores',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    href:  ROUTES.PERFIL,
    label: 'Perfil',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

export default function SideNav() {
  const pathname    = usePathname();
  const dispatch    = useAppDispatch();
  const isOpen      = useAppSelector((s) => s.ui.sideNavOpen);
  const { user, logout } = useAuth();

  const close = () => dispatch(setSideNav(false));

  return (
    <>
      {/* Overlay para tablet cuando el nav está abierto como drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <aside
        className={clsx(
          'fixed top-0 left-0 h-full z-30 flex flex-col',
          'bg-white border-r border-gray-100 shadow-sm',
          'transition-transform duration-300 ease-out',
          'w-64',
          // En desktop siempre visible, en móvil solo si isOpen
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-sisa-blue flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">SISA</p>
            <p className="text-xs text-gray-400">Control de Cobros</p>
          </div>
        </div>

        {/* Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ href, label, icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium',
                  'transition-all duration-150',
                  active
                    ? 'bg-blue-50 text-sisa-blue'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                )}
                aria-current={active ? 'page' : undefined}
              >
                <span className={clsx('shrink-0', active ? 'text-sisa-blue' : 'text-gray-400')}>
                  {icon}
                </span>
                {label}
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sisa-blue" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer: usuario + logout */}
        <div className="px-3 py-4 border-t border-gray-100">
          {user && (
            <div className="flex items-center gap-3 px-3 py-2.5 mb-2 rounded-xl bg-gray-50">
              <Avatar name={user.nombre} src={user.avatar} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{user.nombre}</p>
                <p className="text-xs text-gray-400 truncate">{user.cargo}</p>
              </div>
            </div>
          )}
          <button
            onClick={logout}
            className={clsx(
              'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium',
              'text-red-500 hover:bg-red-50 transition-colors duration-150',
            )}
          >
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}