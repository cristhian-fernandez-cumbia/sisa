'use client';

import { useMemo, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import type { Socio } from '@/interfaces/socio.interface';

type FiltroDeudores = 'todos' | 'mayor_deuda' | 'mas_dias' | 'por_sector';

export function useDeudores() {
  const socios  = useAppSelector((s) => s.socios.items);
  const puestos = useAppSelector((s) => s.puestos.items);

  const [filtro, setFiltro]   = useState<FiltroDeudores>('mayor_deuda');
  const [busqueda, setBusqueda] = useState('');
  const [sectorFiltro, setSectorFiltro] = useState<string>('todos');

  // ── Solo socios con deuda activa ──────────────────────────────────────────
  const deudores: Socio[] = useMemo(() =>
    socios.filter((s) => s.activo && s.deudaTotal > 0),
    [socios],
  );

  // ── Total de deuda global ──────────────────────────────────────────────────
  const totalDeuda = useMemo(() =>
    deudores.reduce((sum, s) => sum + s.deudaTotal, 0),
    [deudores],
  );

  // ── Deudores filtrados y ordenados ─────────────────────────────────────────
  const deudoresFiltrados = useMemo(() => {
    let lista = [...deudores];

    // Filtrar por búsqueda
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase();
      lista = lista.filter(
        (s) =>
          s.nombre.toLowerCase().includes(q) ||
          s.puestoId.toLowerCase().includes(q),
      );
    }

    // Filtrar por sector
    if (sectorFiltro !== 'todos') {
      lista = lista.filter((s) => s.sectorId === sectorFiltro);
    }

    // Ordenar
    switch (filtro) {
      case 'mayor_deuda':
        lista.sort((a, b) => b.deudaTotal - a.deudaTotal);
        break;
      case 'mas_dias':
        lista.sort((a, b) => b.diasDeuda - a.diasDeuda);
        break;
      case 'por_sector':
        lista.sort((a, b) => a.sectorId.localeCompare(b.sectorId));
        break;
      default:
        break;
    }

    return lista;
  }, [deudores, filtro, busqueda, sectorFiltro]);

  // ── Top 3 deudores (para estadísticas) ────────────────────────────────────
  const topDeudores = useMemo(() =>
    [...deudores]
      .sort((a, b) => b.deudaTotal - a.deudaTotal)
      .slice(0, 3),
    [deudores],
  );

  // ── Puesto del deudor ─────────────────────────────────────────────────────
  const getPuestoDeudor = (socioId: string) =>
    puestos.find((p) => p.inquilinoId === socioId) ?? null;

  return {
    deudores,
    deudoresFiltrados,
    topDeudores,
    totalDeuda,
    filtro,
    busqueda,
    sectorFiltro,
    setFiltro,
    setBusqueda,
    setSectorFiltro,
    getPuestoDeudor,
  };
}