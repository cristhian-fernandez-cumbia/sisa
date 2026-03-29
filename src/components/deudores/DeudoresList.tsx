'use client';

import { useRouter } from 'next/navigation';
import { EmptyState } from '@/components/ui';
import DeudorCard from './DeudorCard';
import { useDeudores } from '@/hooks/useDeudores';
import { usePuestos }  from '@/hooks/usePuestos';
import { formatCurrency } from '@/utils/formatCurrency';
import { ROUTES } from '@/utils/constants';
import clsx from 'clsx';

interface DeudoresListProps {
  /** Mostrar banner de resumen sticky en la parte superior */
  showSummary?: boolean;
  /** Mostrar número de ranking en cada tarjeta */
  showRank?:    boolean;
  /** Límite de items a mostrar (undefined = todos) */
  limit?:       number;
}

export default function DeudoresList({
  showSummary = true,
  showRank    = false,
  limit,
}: DeudoresListProps) {
  const router = useRouter();
  const {
    deudoresFiltrados,
    totalDeuda,
    busqueda,
  } = useDeudores();
  const { puestos, seleccionar } = usePuestos();

  const lista = limit !== undefined
    ? deudoresFiltrados.slice(0, limit)
    : deudoresFiltrados;

  const handleCobrar = (socioId: string) => {
    const puesto = puestos.find((p) => p.inquilinoId === socioId);
    if (puesto) {
      router.push(ROUTES.MAPA);
      /* Pequeño delay para que la página cargue antes de abrir el sheet */
      setTimeout(() => seleccionar(puesto.id), 350);
    }
  };

  /* Helper para encontrar el puesto de un socio */
  const getPuesto = (socioId: string) => {
    const p = puestos.find((p) => p.inquilinoId === socioId);
    if (!p) return null;
    return { codigo: p.codigo, sectorId: p.sectorId };
  };

  return (
    <div className="flex flex-col gap-3">
      {/* ── Banner resumen (sticky) ── */}
      {showSummary && totalDeuda > 0 && lista.length > 0 && (
        <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
          <div>
            <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-0.5">
              Resumen de Cartera
            </p>
            <div className="flex items-baseline gap-1.5">
              <p className="text-xl font-extrabold text-sisa-red">
                {formatCurrency(totalDeuda)}
              </p>
              <p className="text-sm text-red-400 font-medium">
                en {deudoresFiltrados.length} puesto{deudoresFiltrados.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-sisa-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
      )}

      {/* ── Lista ── */}
      {lista.length === 0 ? (
        <EmptyState
          icon={
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          title={busqueda ? 'Sin resultados' : '¡Sin deudores!'}
          description={
            busqueda
              ? `No se encontró "${busqueda}"`
              : 'Todos los puestos están al día 🎉'
          }
        />
      ) : (
        <>
          {lista.map((socio, idx) => (
            <DeudorCard
              key={socio.id}
              socio={socio}
              puesto={getPuesto(socio.id)}
              onCobrar={handleCobrar}
              rank={showRank ? idx : undefined}
            />
          ))}

          {/* "Ver todos" si se usa limit */}
          {limit !== undefined && deudoresFiltrados.length > limit && (
            <button
              onClick={() => router.push(ROUTES.DEUDORES)}
              className="w-full py-3 text-sm font-semibold text-sisa-blue hover:text-blue-700 transition-colors"
            >
              Ver {deudoresFiltrados.length - limit} deudores más →
            </button>
          )}
        </>
      )}
    </div>
  );
}