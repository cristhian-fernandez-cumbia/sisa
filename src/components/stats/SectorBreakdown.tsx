'use client';

import { useMemo } from 'react';
import { Card, ProgressBar } from '@/components/ui';
import { useStats }    from '@/hooks/useStats';
import { usePuestos }  from '@/hooks/usePuestos';
import { useAppSelector } from '@/redux/hooks';
import { calcPorSector }  from '@/utils/calcStats';
import { formatCurrency } from '@/utils/formatCurrency';
import clsx from 'clsx';

export default function SectorBreakdown() {
  const { porDia }  = useStats();
  const { puestos } = usePuestos();
  const cobros      = useAppSelector((s) => s.cobros.items);

  /* Construir lista de sectores únicos desde los socios */
  const socios = useAppSelector((s) => s.socios.items);
  const sectores = useMemo(() => {
    const ids = [...new Set(socios.map((s) => s.sectorId))].sort();
    return ids.map((id) => ({
      id,
      nombre:       id.replace('sec_', 'Sector '),
      descripcion:  '',
      totalPuestos: 0,
      sisaBase:     0,
    }));
  }, [socios]);

  const fechas = porDia.map((d) => d.fecha);

  const sectorStats = useMemo(() =>
    calcPorSector(sectores, puestos, cobros, fechas),
    [sectores, puestos, cobros, fechas],
  );

  if (sectorStats.length === 0) {
    return (
      <Card padding="md">
        <p className="text-sm text-gray-400 text-center py-4">
          Sin datos de sectores disponibles
        </p>
      </Card>
    );
  }

  return (
    <Card padding="md">
      <div className="flex flex-col gap-5">
        {sectorStats.map((sec) => (
          <div key={sec.sectorId}>
            {/* Fila: nombre + porcentaje */}
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-bold text-gray-800">{sec.nombre}</p>
              <span className={clsx(
                'text-sm font-extrabold',
                sec.porcentajeCobro >= 80 ? 'text-sisa-green'
                : sec.porcentajeCobro >= 50 ? 'text-sisa-blue'
                : 'text-sisa-amber',
              )}>
                {sec.porcentajeCobro}%
              </span>
            </div>

            {/* Barra de progreso */}
            <ProgressBar
              value={sec.porcentajeCobro}
              size="md"
              color={
                sec.porcentajeCobro >= 80 ? 'green'
                : sec.porcentajeCobro >= 50 ? 'blue'
                : 'amber'
              }
            />

            {/* Montos */}
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-gray-400">
                {formatCurrency(sec.totalRecaudado)} cobrado
              </p>
              <p className="text-xs text-gray-400">
                de {formatCurrency(sec.totalPosible)} posible
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}