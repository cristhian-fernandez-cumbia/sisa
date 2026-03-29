'use client';

import { ReactNode, useEffect } from 'react';
import clsx from 'clsx';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  showClose?: boolean;
  className?: string;
}

const sizeStyles: Record<string, string> = {
  sm:   'max-w-sm',
  md:   'max-w-md',
  lg:   'max-w-lg',
  full: 'max-w-full mx-4',
};

export default function Modal({
  open,
  onClose,
  title,
  children,
  size = 'md',
  showClose = true,
  className,
}: ModalProps) {
  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={clsx(
          'relative w-full bg-white rounded-3xl shadow-2xl',
          'max-h-[90vh] overflow-y-auto',
          sizeStyles[size],
          className,
        )}
      >
        {(title || showClose) && (
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            {title && <h2 className="text-lg font-bold text-gray-900">{title}</h2>}
            {showClose && (
              <button
                onClick={onClose}
                className="ml-auto text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                aria-label="Cerrar"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
        <div className="px-5 pb-5">{children}</div>
      </div>
    </div>
  );
}