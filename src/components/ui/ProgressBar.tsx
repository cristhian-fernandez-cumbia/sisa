'use client';

import clsx from 'clsx';

interface ProgressBarProps {
  value: number;         // 0–100
  max?: number;
  color?: 'blue' | 'green' | 'red' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  className?: string;
}

const colorStyles: Record<string, string> = {
  blue:  'bg-sisa-blue',
  green: 'bg-sisa-green',
  red:   'bg-sisa-red',
  amber: 'bg-sisa-amber',
};

const trackColors: Record<string, string> = {
  blue:  'bg-blue-100',
  green: 'bg-green-100',
  red:   'bg-red-100',
  amber: 'bg-amber-100',
};

const sizeStyles: Record<string, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3.5',
};

export default function ProgressBar({
  value,
  max = 100,
  color = 'blue',
  size = 'md',
  showLabel = false,
  label,
  animated = false,
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={clsx('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs text-gray-500">{label}</span>}
          {showLabel && (
            <span className="text-xs font-bold text-sisa-blue ml-auto">
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div className={clsx('w-full rounded-full overflow-hidden', sizeStyles[size], trackColors[color])}>
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-700 ease-out',
            colorStyles[color],
            animated && 'animate-pulse',
          )}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}