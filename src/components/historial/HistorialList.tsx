'use client';

import { useMemo, useState } from 'react';
import { EmptyState, Button } from '@/components/ui';
import HistorialItem  from './HistorialItem';
import { useCobros }  from '@/hooks/useCobros';
import { usePuestos } from '@/hooks/usePuestos';
import { useSocios }  from '@/hooks/useSocios';
import { useAppSelector } from '@/redux/hooks';
import { exportHistorialPDF } from '@/utils/pdfExport';
import { formatCurrency }    from '@/utils/formatCurrency';
import { getHourLabel }      from '@/utils/formatTime';
import { getTodayISO }       from '@/utils/formatDate';
import type { CobroDetalle } from '@/interfaces/cobro.interface';
import clsx from 'clsx';

interface HistorialListProps {
  /** Fecha a mostrar (YYYY-MM-DD). Por defecto: hoy */
  fecha?: string;
  /** Mostrar botón de exportar PDF al final */
  showExport?: boolean;
  /** Mostrar agrupación por franja horaria */
  showGroups?: boolean;
}

export default function HistorialList({
  fecha:      fechaProp,
  showExport  = true,
  showGroups  = true,
}: HistorialListProps) {
  const fecha = fechaProp ?? getTodayISO();

  const { cobros }  = useCobros();
  const { puestos } = usePuestos();
  const { socios }  = useSocios();
  const config      = useAppSelector((s) => s.config.data);
  const [exporting, setExporting] = useState(false);

  /* Cobros del día enriquecidos */
  const cobrosDetalle: CobroDetalle[] = useMemo(() =>
    cobros
      .filter((c) => c.fecha === fecha)
      .map((c) => {
        const puesto = puestos.find((p) => p.id === c.puestoId);
        const socio  = socios.find((s) => s.id === c.socioId);
        return {
          ...c,
          puesto: { codigo: puesto?.codigo ?? '—', sectorId: puesto?.sectorId ?? '' },
          socio:  { nombre: socio?.nombre ?? 'Sin nombre', celular: socio?.celular ?? '' },
        };
      })
      .sort((a, b) => b.hora.localeCompare(a.hora)),
    [cobros, fecha, puestos, socios],
  );

  /* Agrupar por franja horaria */
  const grouped = useMemo(() => {
    if (!showGroups) return null;
    const map = new Map<string, CobroDetalle[]>();
    for (const cobro of cobrosDetalle) {
      const label = getHourLabel(cobro.hora);
      if (!map.has(label)) map.set(label, []);
      map.get(label)!.push(cobro);
    }
    return Array.from(map.entries());
  }, [cobrosDetalle, showGroups]);

  const handleExport = async () => {
    setExporting(true);
    await exportHistorialPDF(
      cobrosDetalle,
      fecha,
      config?.mercadoNombre  ?? 'SISA Mercado',
      config?.cobradorNombre ?? 'Cobrador',
    );
    setExporting(false);
  };

  if (cobrosDetalle.length === 0) {
    return (
      <EmptyState
        icon={
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        title="Sin cobros registrados"
        description="No hay actividad para este día"
      />
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {showGroups && grouped ? (
        /* Vista agrupada por franja horaria */
        grouped.map(([franja, items]) => {
          const totalFranja = items.reduce((s, c) => s + c.monto, 0);
          return (
            <div key={franja} className="mb-2">
              {/* Cabecera de franja */}
              <div className="flex items-center justify-between bg-gray-100 rounded-xl px-3 py-2 mb-1.5">
                <span className="text-xs font-bold text-gray-500">{franja}</span>
                <span className="text-xs font-bold text-gray-600">
                  {formatCurrency(totalFranja)} cobrado
                </span>
              </div>
              {/* Ítems de la franja */}
              <div className="flex flex-col gap-1.5">
                {items.map((cobro) => (
                  <HistorialItem key={cobro.id} cobro={cobro} />
                ))}
              </div>
            </div>
          );
        })
      ) : (
        /* Vista plana sin agrupación */
        <div className="flex flex-col gap-1.5">
          {cobrosDetalle.map((cobro) => (
            <HistorialItem key={cobro.id} cobro={cobro} />
          ))}
        </div>
      )}

      {/* Botón exportar PDF */}
      {showExport && (
        <div className="mt-4">
          <Button
            variant="outline"
            fullWidth
            size="md"
            loading={exporting}
            onClick={handleExport}
            leftIcon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          >
            EXPORTAR REPORTE DEL DÍA
          </Button>
        </div>
      )}
    </div>
  );
}