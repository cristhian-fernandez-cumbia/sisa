'use client';

import clsx from 'clsx';
import Image from 'next/image';

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  badge?: 'online' | 'offline';
}

const sizeStyles: Record<string, string> = {
  xs: 'w-7 h-7 text-xs',
  sm: 'w-9 h-9 text-sm',
  md: 'w-11 h-11 text-base',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
};

const badgeSizeStyles: Record<string, string> = {
  xs: 'w-2 h-2',
  sm: 'w-2.5 h-2.5',
  md: 'w-3 h-3',
  lg: 'w-3.5 h-3.5',
  xl: 'w-4 h-4',
};

function getInitials(name?: string): string {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Avatar({ src, name, size = 'md', className, badge }: AvatarProps) {
  return (
    <div className={clsx('relative inline-flex shrink-0', className)}>
      <div
        className={clsx(
          'rounded-full overflow-hidden flex items-center justify-center font-semibold',
          sizeStyles[size],
          !src && 'bg-sisa-blue text-white',
        )}
        /*
         * suppressHydrationWarning aquí porque el contenido depende del usuario
         * que viene de localStorage (solo disponible en el cliente). El servidor
         * renderiza '?' y el cliente renderiza las iniciales reales. React lo
         * actualizará en el primer render del cliente sin error.
         */
        suppressHydrationWarning
      >
        {src ? (
          <Image src={src} alt={name ?? 'avatar'} fill className="object-cover" sizes="80px" />
        ) : (
          <span suppressHydrationWarning>{getInitials(name)}</span>
        )}
      </div>

      {badge && (
        <span
          className={clsx(
            'absolute bottom-0 right-0 rounded-full border-2 border-white',
            badgeSizeStyles[size],
            badge === 'online' ? 'bg-sisa-green' : 'bg-gray-300',
          )}
        />
      )}
    </div>
  );
}