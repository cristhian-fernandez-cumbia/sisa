'use client';

import { useRouter } from 'next/navigation';
import { Card, Badge, Button, EmptyState } from '@/components/ui';
import { useDeudores } from '@/hooks/useDeudores';
import { usePuestos }  from '@/hooks/usePuestos';
import { formatCurrency } from '@/utils/formatCurrency';
import { ROUTES } from '@/utils/constants';
import clsx from 'clsx';

interface TopDebtorsProps {
  limit?: number;
  showViewAll?: boolean;
}

const MEDAL_COLORS = [
  'bg-yellow-100 text-yellow-700 border-yellow-200',   // 1º — oro
  'bg-gray-100   text-gray-600   border-gray-200',     // 2º — plata
  'bg-orange-100 text-orange-600 border-orange-200',   // 3º — bronce
];

export default function TopDebtors({
  limit      = 3,
  showViewAll = true,
}: TopDebtorsProps) {
  const router = useRouter();
  const { topDeudores } = useDeudores();
  const { seleccionar } = usePuestos();

  const lista = topDeudores.slice(0, limit);

  const handleCobrar = (socioId: string) => {
    const puestoId = /* buscar en puestos */ socioId;
    router.push(ROUTES.MAPA);
  };

  if (lista.length === 0) {
    return (
      <EmptyState
        icon={
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        title="¡Sin deudores!"
        description="Todos los puestos están al día"
      />
    );
  }

  return (
    <div>
      {/* Cabecera con link */}
      {showViewAll && (
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-gray-900">Ranking de Deudores</p>
          <button
            onClick={() => router.push(ROUTES.DEUDORES)}
            className="text-xs text-sisa-blue font-semibold hover:underline"
          >
            Ver todos
          </button>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {lista.map((socio, idx) => (
          <Card
            key={socio.id}
            padding="md"
            hoverable
            onClick={() => router.push(ROUTES.DEUDORES)}
            className="border-l-4 border-l-sisa-red"
          >
            <div className="flex items-center gap-3">
              {/* Posición con estilo de medalla */}
              <div className={clsx(
                'w-8 h-8 rounded-xl flex items-center justify-center shrink-0',
                'border font-extrabold text-sm',
                MEDAL_COLORS[idx] ?? 'bg-red-50 text-sisa-red border-red-200',
              )}>
                {idx + 1}
              </div>

              {/* Datos del deudor */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {socio.nombre}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <p className="text-xs text-gray-400 truncate">
                    {socio.puestoId}
                  </p>
                  <Badge variant="deuda" size="sm">
                    {socio.diasDeuda} días
                  </Badge>
                </div>
              </div>

              {/* Monto + botón */}
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <p className="text-sm font-extrabold text-sisa-red">
                  {formatCurrency(socio.deudaTotal)}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCobrar(socio.id);
                  }}
                  className="text-[10px] font-bold text-sisa-blue bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-full transition-colors"
                >
                  VER DETALLE
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}