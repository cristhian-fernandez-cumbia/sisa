'use client';

import clsx from 'clsx';
import { Card } from '@/components/ui';
import { useCobros } from '@/hooks/useCobros';
import { formatCurrency } from '@/utils/formatCurrency';

interface HistorialSummaryProps {
  /** Fecha override (YYYY-MM-DD). Si no se pasa, usa hoy */
  fecha?:   string;
  compact?: boolean;
}

interface StatProps {
  label: string;
  value: number;
  color: string;
}

function Stat({ label, value, color }: StatProps) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className={clsx('text-base font-extrabold', color)}>{value}</span>
      <span className="text-[10px] text-gray-400 font-medium">{label}</span>
    </div>
  );
}

export default function HistorialSummary({
  fecha,
  compact = false,
}: HistorialSummaryProps) {
  const { cobros, totalHoy } = useCobros();

  /* Filtrar por fecha específica si se provee */
  const cobrosDelDia = fecha
    ? cobros.filter((c) => c.fecha === fecha)
    : cobros.filter((c) => {
        const hoy = new Date().toISOString().split('T')[0];
        return c.fecha === hoy;
      });

  const total = fecha
    ? cobrosDelDia.reduce((s, c) => s + c.monto, 0)
    : totalHoy;

  const operaciones    = cobrosDelDia.length;
  const soloAsistencia = cobrosDelDia.filter((c) => c.tipo === 'solo_asistencia').length;
  const pagos          = cobrosDelDia.filter((c) => c.tipo === 'pago').length;
  const abonos         = cobrosDelDia.filter((c) => c.tipo === 'abono').length;

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div>
          <p className="text-xs text-gray-400 font-medium">Total cobrado</p>
          <p className="text-lg font-extrabold text-sisa-blue">{formatCurrency(total)}</p>
        </div>
        <div className="w-px h-10 bg-gray-200" />
        <div>
          <p className="text-xs text-gray-400 font-medium">Operaciones</p>
          <p className="text-lg font-extrabold text-gray-900">{operaciones}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Total cobrado */}
      <Card padding="md">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-sisa-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Total Hoy
          </p>
        </div>
        <p className="text-xl font-extrabold text-sisa-blue">{formatCurrency(total)}</p>
      </Card>

      {/* Operaciones */}
      <Card padding="md">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Operaciones
          </p>
        </div>
        <p className="text-xl font-extrabold text-gray-900">{operaciones}</p>
      </Card>

      {/* Desglose de tipos — solo si hay operaciones */}
      {operaciones > 0 && (
        <div className="col-span-2">
          <Card padding="sm" className="bg-gray-50 border-0">
            <div className="flex items-center justify-around">
              <Stat label="Pagos"       value={pagos}          color="text-sisa-green" />
              <div className="w-px h-8 bg-gray-200" />
              <Stat label="Abonos"      value={abonos}         color="text-sisa-amber" />
              <div className="w-px h-8 bg-gray-200" />
              <Stat label="Solo asist." value={soloAsistencia} color="text-gray-400"   />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}