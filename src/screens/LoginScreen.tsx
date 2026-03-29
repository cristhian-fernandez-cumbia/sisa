'use client';

import { LoginForm } from '@/components/auth';

export default function LoginScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F4F7] px-6 py-10">

      {/* ── Logo + título ── */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-20 h-20 rounded-3xl bg-sisa-blue flex items-center justify-center shadow-fab mb-5">
          <svg
            className="w-10 h-10 text-white"
            fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth={1.8}
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-sisa-blue tracking-tight">SISA</h1>
        <p className="text-sm text-gray-500 mt-1 font-medium">
          Control de Cobros del Mercado
        </p>
      </div>

      {/* ── Formulario ── */}
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>

      {/* ── Versión ── */}
      <p className="mt-12 text-xs text-gray-400 flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Versión 2.4.0 — Collector View
      </p>
    </div>
  );
}