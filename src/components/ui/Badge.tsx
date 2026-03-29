'use client';

import clsx from 'clsx';
import { ReactNode } from 'react';

type BadgeVariant = 'pagado' | 'atendido' | 'deuda' | 'libre' | 'info' | 'gray' | 'warning';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  pagado:   'bg-green-100 text-green-700 border border-green-200',
  atendido: 'bg-amber-100 text-amber-700 border border-amber-200',
  deuda:    'bg-red-100 text-red-600 border border-red-200',
  libre:    'bg-gray-100 text-gray-500 border border-gray-200',
  info:     'bg-blue-100 text-blue-700 border border-blue-200',
  gray:     'bg-gray-100 text-gray-600 border border-gray-200',
  warning:  'bg-orange-100 text-orange-600 border border-orange-200',
};

const dotColors: Record<BadgeVariant, string> = {
  pagado:   'bg-sisa-green',
  atendido: 'bg-sisa-amber',
  deuda:    'bg-sisa-red',
  libre:    'bg-gray-400',
  info:     'bg-sisa-blue',
  gray:     'bg-gray-400',
  warning:  'bg-orange-500',
};

export default function Badge({
  children,
  variant = 'info',
  size = 'sm',
  dot = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-semibold rounded-full',
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        variantStyles[variant],
        className,
      )}
    >
      {dot && (
        <span className={clsx('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />
      )}
      {children}
    </span>
  );
}