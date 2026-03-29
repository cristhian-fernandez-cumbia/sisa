import { ReactNode } from 'react';
import clsx from 'clsx';

interface MobileLayoutProps {
  children:   ReactNode;
  /** true = sin padding-bottom para bottom nav (ej: página login) */
  noNav?:     boolean;
  /** true = sin padding-top para top bar (páginas con header custom) */
  noTopBar?:  boolean;
  /** Clase extra para el contenedor interno */
  className?: string;
}

/**
 * Envuelve el contenido de cada página con el padding correcto
 * según si tiene TopBar y/o BottomNav.
 *
 * En desktop (lg+): agrega margen izquierdo para el SideNav (w-64 = 16rem).
 */
export default function MobileLayout({
  children,
  noNav    = false,
  noTopBar = false,
  className,
}: MobileLayoutProps) {
  return (
    <main
      className={clsx(
        'w-full min-h-screen bg-[var(--bg-page)]',
        /* Offset para SideNav en desktop */
        'lg:ml-64',
        /* Padding top para TopBar fijo */
        !noTopBar && 'pt-16',
        /* Padding bottom para BottomNav fijo */
        !noNav && 'pb-20 lg:pb-6',
        className,
      )}
    >
      {/* Contenedor centrado — limita ancho en pantallas grandes */}
      <div className="w-full max-w-2xl mx-auto px-4 py-4 lg:max-w-4xl lg:px-8 lg:py-6">
        {children}
      </div>
    </main>
  );
}