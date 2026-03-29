'use client';

import { InputHTMLAttributes, ReactNode, useState } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** Si type="password", muestra botón ojo automáticamente */
  showPasswordToggle?: boolean;
}

export default function Input({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  showPasswordToggle = false,
  type = 'text',
  className,
  id,
  ...props
}: InputProps) {
  const [showPwd, setShowPwd] = useState(false);
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const resolvedType = type === 'password' && showPwd ? 'text' : type;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold tracking-widest uppercase text-gray-500"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3.5 text-gray-400 pointer-events-none">
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          type={resolvedType}
          className={clsx(
            'w-full bg-white border rounded-2xl px-4 py-3.5 text-base text-gray-900',
            'placeholder:text-gray-400 transition-all duration-150',
            'focus:outline-none focus:ring-2 focus:ring-sisa-blue/40 focus:border-sisa-blue',
            error
              ? 'border-sisa-red/60 focus:ring-sisa-red/30 focus:border-sisa-red'
              : 'border-gray-200 hover:border-gray-300',
            leftIcon && 'pl-10',
            (rightIcon || (type === 'password' && showPasswordToggle)) && 'pr-11',
            className,
          )}
          {...props}
        />

        {type === 'password' && showPasswordToggle ? (
          <button
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPwd ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        ) : rightIcon ? (
          <span className="absolute right-3.5 text-gray-400 pointer-events-none">{rightIcon}</span>
        ) : null}
      </div>

      {error && <p className="text-xs text-sisa-red font-medium">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}