'use client';

import clsx from 'clsx';
import { ReactNode } from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  description?: string;
  icon?: ReactNode;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export default function Toggle({
  checked,
  onChange,
  label,
  description,
  icon,
  disabled = false,
  size = 'md',
}: ToggleProps) {
  return (
    <label
      className={clsx(
        'flex items-center justify-between gap-3 w-full',
        'bg-gray-50 rounded-2xl px-4 py-3.5 border border-gray-100',
        !disabled && 'cursor-pointer hover:bg-gray-100 transition-colors',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-sisa-blue shrink-0">
            {icon}
          </div>
        )}
        {(label || description) && (
          <div>
            {label && <p className="text-sm font-semibold text-gray-900">{label}</p>}
            {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
          </div>
        )}
      </div>

      <div className="relative shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div
          className={clsx(
            'rounded-full transition-all duration-200 ease-in-out',
            size === 'sm' ? 'w-10 h-6' : 'w-12 h-7',
            checked ? 'bg-sisa-blue' : 'bg-gray-300',
          )}
        />
        <div
          className={clsx(
            'absolute top-0.5 rounded-full bg-white shadow-sm transition-all duration-200 ease-in-out',
            size === 'sm' ? 'w-5 h-5' : 'w-6 h-6',
            checked
              ? size === 'sm' ? 'translate-x-[18px]' : 'translate-x-[22px]'
              : 'translate-x-0.5',
          )}
        />
      </div>
    </label>
  );
}