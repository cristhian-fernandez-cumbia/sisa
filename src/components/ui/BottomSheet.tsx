'use client';

import { ReactNode, useEffect, useRef } from 'react';
import clsx from 'clsx';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  /** Altura máxima como fracción de la pantalla */
  maxHeight?: '70vh' | '80vh' | '90vh' | '95vh';
  showHandle?: boolean;
  className?: string;
}

export default function BottomSheet({
  open,
  onClose,
  title,
  children,
  maxHeight = '90vh',
  showHandle = true,
  className,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        style={{ maxHeight }}
        className={clsx(
          'fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl',
          'flex flex-col overflow-hidden',
          'transition-transform duration-300 ease-out',
          open ? 'translate-y-0' : 'translate-y-full',
          className,
        )}
      >
        {/* Handle */}
        {showHandle && (
          <div className="flex justify-center pt-3 pb-1 shrink-0">
            <div className="w-10 h-1 rounded-full bg-gray-300" />
          </div>
        )}

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-5 py-3 shrink-0 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Content — scrollable */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
    </>
  );
}