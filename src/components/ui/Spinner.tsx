'use client';

import clsx from 'clsx';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'blue' | 'gray';
}

const sizeMap = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' };
const colorMap = {
  white: 'border-white/30 border-t-white',
  blue:  'border-sisa-blue/30 border-t-sisa-blue',
  gray:  'border-gray-300 border-t-gray-500',
};

export default function Spinner({ size = 'md', color = 'blue' }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Cargando"
      className={clsx(
        'inline-block rounded-full border-2 animate-spin',
        sizeMap[size],
        colorMap[color],
      )}
    />
  );
}