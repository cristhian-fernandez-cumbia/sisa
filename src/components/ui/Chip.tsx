'use client';

import clsx from 'clsx';
import { ReactNode } from 'react';

interface ChipProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function Chip({ children, active = false, onClick, disabled, className }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold',
        'transition-all duration-150 whitespace-nowrap shrink-0 select-none',
        'focus:outline-none focus:ring-2 focus:ring-sisa-blue/40',
        active
          ? 'bg-sisa-blue text-white shadow-sm'
          : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      {children}
    </button>
  );
}