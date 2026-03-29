'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import Spinner from './Spinner';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'whatsapp';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:   'bg-sisa-blue text-white hover:bg-blue-600 active:bg-blue-700 shadow-sm',
  secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300',
  danger:    'bg-sisa-red text-white hover:bg-red-600 active:bg-red-700 shadow-sm',
  ghost:     'bg-transparent text-sisa-blue hover:bg-blue-50 active:bg-blue-100',
  outline:   'bg-transparent border-2 border-sisa-blue text-sisa-blue hover:bg-blue-50 active:bg-blue-100',
  whatsapp:  'bg-[#25D366] text-white hover:bg-[#20b858] active:bg-[#1da44e] shadow-sm',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm rounded-xl',
  md: 'h-12 px-5 text-sm rounded-2xl',
  lg: 'h-14 px-6 text-base rounded-2xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'lg',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150',
        'focus:outline-none focus:ring-2 focus:ring-sisa-blue/40 focus:ring-offset-1 select-none',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {loading ? (
        <Spinner
          size="sm"
          color={['primary', 'danger', 'whatsapp'].includes(variant) ? 'white' : 'blue'}
        />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}