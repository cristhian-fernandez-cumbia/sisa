'use client';

import clsx from 'clsx';
import type { PuestoConSocio, PuestoEstado } from '@/interfaces/puesto.interface';

interface PuestoCardProps {
  puesto:    PuestoConSocio;
  onClick?:  (puesto: PuestoConSocio) => void;
  size?:     'sm' | 'md';
  /** Resaltar el puesto (ej: resultado de búsqueda) */
  highlight?: boolean;
}

/* ── Mapas de estilos por estado ── */
const BG_MAP: Record<PuestoEstado, string> = {
  pagado:   'bg-sisa-green',
  atendido: 'bg-sisa-amber',
  deuda:    'bg-sisa-red',
  libre:    'bg-gray-200',
};

const TEXT_MAP: Record<PuestoEstado, string> = {
  pagado:   'text-white',
  atendido: 'text-amber-900',
  deuda:    'text-white',
  libre:    'text-gray-400',
};

const RING_MAP: Record<PuestoEstado, string> = {
  pagado:   'ring-green-400',
  atendido: 'ring-amber-400',
  deuda:    'ring-red-400',
  libre:    'ring-gray-300',
};

/* ── Íconos de estado (esquina superior derecha) ── */
const STATUS_ICON: Record<PuestoEstado, React.ReactNode> = {
  pagado: (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  atendido: (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  deuda: (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    </svg>
  ),
  libre: (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  ),
};

export default function PuestoCard({
  puesto,
  onClick,
  size      = 'md',
  highlight = false,
}: PuestoCardProps) {
  const isClickable = !!puesto.inquilinoId && !!onClick;

  return (
    <button
      type="button"
      onClick={() => isClickable && onClick!(puesto)}
      aria-label={`Puesto ${puesto.codigo} — ${puesto.estado}`}
      disabled={!isClickable}
      className={clsx(
        /* Base */
        'relative flex flex-col items-center justify-center',
        'rounded-2xl font-extrabold select-none transition-all duration-150',
        /* Tamaño */
        size === 'md' ? 'aspect-square text-base' : 'aspect-square text-sm',
        /* Estado */
        BG_MAP[puesto.estado],
        TEXT_MAP[puesto.estado],
        /* Interacción */
        isClickable
          ? 'active:scale-90 hover:brightness-105 cursor-pointer'
          : 'cursor-default opacity-60',
        /* Resaltado */
        highlight && `ring-2 ring-offset-1 ${RING_MAP[puesto.estado]}`,
      )}
    >
      {/* Ícono de estado — esquina superior derecha */}
      <span className={clsx(
        'absolute top-1.5 right-1.5 opacity-90',
        TEXT_MAP[puesto.estado],
      )}>
        {STATUS_ICON[puesto.estado]}
      </span>

      {/* Código del puesto */}
      <span className="leading-none">{puesto.codigo}</span>

      {/* Punto de deuda si tiene deuda (solo en pagado/atendido con deuda) */}
      {puesto.estado !== 'deuda' && (puesto.socio?.deudaTotal ?? 0) > 0 && (
        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sisa-red" />
      )}
    </button>
  );
}