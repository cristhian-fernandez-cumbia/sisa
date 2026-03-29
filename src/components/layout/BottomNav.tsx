'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { ROUTES } from '@/utils/constants';

const NAV_ITEMS = [
  {
    href:  ROUTES.DASHBOARD,
    label: 'Dashboard',
    icon: (active: boolean) => (
      <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href:  ROUTES.MAPA,
    label: 'Mapa',
    icon: (active: boolean) => (
      <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    href:  ROUTES.STATS,
    label: 'Stats',
    icon: (active: boolean) => (
      <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    href:  ROUTES.HISTORIAL,
    label: 'Historial',
    icon: (active: boolean) => (
      <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href:  ROUTES.PERFIL,
    label: 'Perfil',
    icon: (active: boolean) => (
      <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className={clsx(
        'fixed bottom-0 left-0 right-0 z-30',
        'bg-white border-t border-gray-100 shadow-nav',
        'pb-safe',
        /* En desktop se oculta — la nav lateral toma el control */
        'lg:hidden',
      )}
    >
      <ul className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={clsx(
                  'flex flex-col items-center justify-center gap-0.5 py-1 rounded-2xl mx-0.5',
                  'transition-colors duration-150 select-none',
                  active
                    ? 'text-sisa-blue'
                    : 'text-gray-400 hover:text-gray-600',
                )}
                aria-current={active ? 'page' : undefined}
              >
                {icon(active)}
                <span
                  className={clsx(
                    'text-[10px] font-semibold tracking-wide',
                    active ? 'text-sisa-blue' : 'text-gray-400',
                  )}
                >
                  {label.toUpperCase()}
                </span>
                {/* Punto indicador activo */}
                {active && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-sisa-blue" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}