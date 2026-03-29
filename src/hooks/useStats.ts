'use client';

import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { calcularStats, setPeriodo } from '@/redux/slices/statsSlice';
import type { StatsPeriodo } from '@/interfaces/stats.interface';

export function useStats() {
  const dispatch  = useAppDispatch();
  const sectores  = useAppSelector((s) => s.config.data ? [] : []);
  const cobros    = useAppSelector((s) => s.cobros.items);
  const puestos   = useAppSelector((s) => s.puestos.items);
  const { resumen, porDia, periodo, loading, error } = useAppSelector((s) => s.stats);

  // Calcular stats cuando cambie el período, cobros o puestos
  const calcular = useCallback(
    (p?: StatsPeriodo) => {
      const periodoActual = p ?? periodo;
      dispatch(calcularStats({ cobros, puestos, sectores, periodo: periodoActual }));
    },
    [dispatch, cobros, puestos, sectores, periodo],
  );

  const cambiarPeriodo = useCallback(
    (p: StatsPeriodo) => {
      dispatch(setPeriodo(p));
      dispatch(calcularStats({ cobros, puestos, sectores, periodo: p }));
    },
    [dispatch, cobros, puestos, sectores],
  );

  // Recalcular automáticamente al montar
  useEffect(() => {
    if (cobros.length > 0 && puestos.length > 0) {
      calcular();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cobros.length, puestos.length, periodo]);

  return {
    resumen,
    porDia,
    periodo,
    loading,
    error,
    calcular,
    cambiarPeriodo,
  };
}