'use client';

import { useMemo } from 'react';
import { Card, Badge } from '@/components/ui';
import { useStats }    from '@/hooks/useStats';
import { formatCurrency } from '@/utils/formatCurrency';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';

interface CustomTooltipProps {
  active?:  boolean;
  payload?: Array<{ value: number }>;
  label?:   string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl shadow-card px-3 py-2.5 border border-gray-100 text-xs">
      <p className="font-bold text-gray-900 mb-1">{label}</p>
      <p className="text-sisa-blue font-semibold">{formatCurrency(payload[0].value)}</p>
    </div>
  );
}

export default function BarChartCobros() {
  const { porDia, periodo } = useStats();

  const promedio = useMemo(() =>
    porDia.length > 0
      ? porDia.reduce((s, d) => s + d.totalRecaudado, 0) / porDia.length
      : 0,
    [porDia],
  );

  const maxVal = useMemo(() =>
    Math.max(...porDia.map((d) => d.totalRecaudado), 0),
    [porDia],
  );

  const periodoLabel = {
    hoy:    'hoy',
    semana: 'semanal',
    mes:    'mensual',
  }[periodo];

  return (
    <Card padding="md">
      {/* Cabecera */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-bold text-gray-900">Gráfica de Cobros</p>
          <p className="text-xs text-gray-400 mt-0.5">
            Rendimiento {periodoLabel}
          </p>
        </div>
        <Badge variant="info" size="sm">
          PROM: {formatCurrency(promedio)}
        </Badge>
      </div>

      {/* Gráfica */}
      {porDia.length === 0 ? (
        <div className="h-36 flex items-center justify-center">
          <p className="text-sm text-gray-400">Sin datos para mostrar</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={160}>
          <ReBarChart
            data={porDia}
            margin={{ top: 10, right: 4, left: -22, bottom: 0 }}
          >
            <XAxis
              dataKey="diaSemana"
              tick={{ fontSize: 11, fill: '#9CA3AF', fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#9CA3AF' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => v > 0 ? `${v}` : ''}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(46,124,246,0.05)', radius: 8 }}
            />
            {/* Línea de promedio */}
            <ReferenceLine
              y={promedio}
              stroke="#93C5FD"
              strokeDasharray="4 3"
              strokeWidth={1.5}
            />
            <Bar dataKey="totalRecaudado" radius={[6, 6, 0, 0]} maxBarSize={40}>
              {porDia.map((entry, idx) => {
                const isMax = entry.totalRecaudado === maxVal && maxVal > 0;
                return (
                  <Cell
                    key={idx}
                    fill={isMax ? '#2E7CF6' : '#BFDBFE'}
                  />
                );
              })}
            </Bar>
          </ReBarChart>
        </ResponsiveContainer>
      )}

      {/* Leyenda */}
      <div className="flex items-center gap-4 mt-2 pt-2 border-t border-gray-100">
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-3 h-3 rounded bg-sisa-blue inline-block" />
          Mayor cobro
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-3 h-3 rounded bg-blue-200 inline-block" />
          Resto de días
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-5 h-0.5 border-t-2 border-dashed border-blue-300 inline-block" />
          Promedio
        </span>
      </div>
    </Card>
  );
}