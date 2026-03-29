'use client';

import { Card, ProgressBar } from '@/components/ui';
import { useStats }    from '@/hooks/useStats';
import { useDeudores } from '@/hooks/useDeudores';
import { formatCurrency } from '@/utils/formatCurrency';
import clsx from 'clsx';

export default function SummaryMetrics() {
  const { resumen } = useStats();
  const { totalDeuda } = useDeudores();

  return (
    <div className="flex flex-col gap-3">

      {/* ── Total Recaudado ── */}
      <Card padding="md" className="border-l-4 border-l-sisa-green">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Total Recaudado
            </p>
            <p className="text-2xl font-extrabold text-gray-900">
              {formatCurrency(resumen.totalRecaudado)}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {resumen.totalTransacciones} transacciones
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-sisa-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </Card>

      {/* ── Deuda Acumulada ── */}
      <Card padding="md" className="border-l-4 border-l-sisa-red">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Total Deuda Acumulada
            </p>
            <p className="text-2xl font-extrabold text-gray-900">
              {formatCurrency(totalDeuda)}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Puestos con deuda activa
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-sisa-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        </div>
      </Card>

      {/* ── Tasa de Cobro ── */}
      <Card padding="md" className="border-l-4 border-l-sisa-blue">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Tasa de Cobro
            </p>
            <p className="text-2xl font-extrabold text-gray-900 mb-2">
              {resumen.tasaCobro}%
            </p>
            <ProgressBar
              value={resumen.tasaCobro}
              size="md"
              color={
                resumen.tasaCobro >= 80 ? 'green'
                : resumen.tasaCobro >= 50 ? 'blue'
                : 'red'
              }
            />
            <p className="text-xs text-gray-400 mt-1.5">
              {resumen.puestosPagados} de {resumen.puestosTotales} puestos pagaron
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
            <span className="text-sisa-blue font-extrabold text-lg">%</span>
          </div>
        </div>
      </Card>

    </div>
  );
}