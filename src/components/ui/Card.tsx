'use client';

import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Acento de color en el borde izquierdo */
  accent?: 'green' | 'red' | 'blue' | 'amber' | 'gray' | 'none';
  padding?: 'sm' | 'md' | 'lg' | 'none';
  hoverable?: boolean;
}

const accentStyles: Record<string, string> = {
  green: 'border-l-4 border-l-sisa-green',
  red:   'border-l-4 border-l-sisa-red',
  blue:  'border-l-4 border-l-sisa-blue',
  amber: 'border-l-4 border-l-sisa-amber',
  gray:  'border-l-4 border-l-gray-300',
  none:  '',
};

const paddingStyles: Record<string, string> = {
  sm:   'p-3',
  md:   'p-4',
  lg:   'p-5',
  none: '',
};

export default function Card({
  children,
  accent = 'none',
  padding = 'md',
  hoverable = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-2xl shadow-card border border-gray-100',
        accentStyles[accent],
        paddingStyles[padding],
        hoverable && 'cursor-pointer transition-all duration-150 hover:shadow-card-hover active:scale-[0.99]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}