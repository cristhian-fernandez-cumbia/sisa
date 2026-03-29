'use client';

import { useEffect } from 'react';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removeToast } from '@/redux/slices/uiSlice';

const typeStyles = {
  success: 'bg-white border-l-4 border-sisa-green text-gray-900',
  error:   'bg-white border-l-4 border-sisa-red text-gray-900',
  info:    'bg-white border-l-4 border-sisa-blue text-gray-900',
  warning: 'bg-white border-l-4 border-sisa-amber text-gray-900',
};

const iconMap = {
  success: (
    <svg className="w-5 h-5 text-sisa-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 text-sisa-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5 text-sisa-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5 text-sisa-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
};

function ToastItem({ id, type, message }: { id: string; type: keyof typeof typeStyles; message: string }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => dispatch(removeToast(id)), 3500);
    return () => clearTimeout(timer);
  }, [id, dispatch]);

  return (
    <div
      className={clsx(
        'flex items-start gap-3 px-4 py-3.5 rounded-2xl shadow-lg min-w-72 max-w-sm pointer-events-auto',
        typeStyles[type],
      )}
    >
      <span className="shrink-0 mt-0.5">{iconMap[type]}</span>
      <p className="text-sm font-medium leading-snug flex-1">{message}</p>
      <button
        onClick={() => dispatch(removeToast(id))}
        className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Cerrar"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export default function Toast() {
  const toasts = useAppSelector((s) => s.ui.toasts);

  if (!toasts.length) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} {...t} />
      ))}
    </div>
  );
}