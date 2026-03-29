'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';
import { useAppDispatch } from '@/redux/hooks';
import { toggleSideNav } from '@/redux/slices/uiSlice';

interface TopBarProps {
  title?:       string;
  leftAction?:  ReactNode;   // Botón back o menú custom
  rightAction?: ReactNode;   // Íconos de la derecha
  /** Si true, muestra el botón hamburguesa que abre el SideNav en tablet */
  showMenuBtn?: boolean;
  transparent?: boolean;
  className?:   string;
}

export default function TopBar({
  title,
  leftAction,
  rightAction,
  showMenuBtn = false,
  transparent = false,
  className,
}: TopBarProps) {
  const dispatch = useAppDispatch();

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-20 h-16 flex items-center px-4 pt-safe',
        !transparent && 'bg-white/90 backdrop-blur-sm border-b border-gray-100',
        /* En desktop se desplaza para dar espacio al SideNav (w-64) */
        'lg:left-64',
        className,
      )}
    >
      {/* Izquierda: botón hamburguesa (tablet) o acción custom */}
      <div className="flex items-center gap-2 min-w-10">
        {showMenuBtn && (
          <button
            onClick={() => dispatch(toggleSideNav())}
            className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors lg:hidden"
            aria-label="Abrir menú"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        {leftAction}
      </div>

      {/* Centro: título */}
      {title && (
        <h1 className="flex-1 text-center text-base font-bold text-gray-900 truncate px-2">
          {title}
        </h1>
      )}

      {/* Derecha: acciones */}
      <div className="flex items-center gap-1 min-w-10 justify-end">
        {rightAction}
      </div>
    </header>
  );
}

/* ── Botones reutilizables para usar en TopBar ── */

export function TopBarIconBtn({
  onClick,
  label,
  children,
}: {
  onClick?: () => void;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 active:bg-gray-200 transition-colors"
    >
      {children}
    </button>
  );
}

export function BackButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick ?? (() => window.history.back())}
      aria-label="Volver"
      className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}