'use client';

import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loadAsistencias, registrarAsistencia } from '@/redux/slices/asistenciasSlice';
import { cambiarEstadoPuesto } from '@/redux/slices/puestosSlice';
import type { AsistenciaCreate } from '@/interfaces/asistencia.interface';
import { getTodayISO } from '@/utils/formatDate';
import { getCurrentTime } from '@/utils/formatTime';

export function useAsistencias() {
  const dispatch     = useAppDispatch();
  const asistencias  = useAppSelector((s) => s.asistencias.items);
  const loading      = useAppSelector((s) => s.asistencias.loading);
  const today        = getTodayISO();

  // ── Asistencias de hoy ────────────────────────────────────────────────────
  const asistenciasHoy = useMemo(() =>
    asistencias.filter((a) => a.fecha === today),
    [asistencias, today],
  );

  // ── Contadores de hoy ─────────────────────────────────────────────────────
  const contadores = useMemo(() => ({
    abrieron:    asistenciasHoy.filter((a) => a.abrio).length,
    noAbrieron:  asistenciasHoy.filter((a) => !a.abrio).length,
    total:       asistenciasHoy.length,
  }), [asistenciasHoy]);

  // ── Verificar si un puesto ya fue registrado hoy ──────────────────────────
  const yaRegistrado = useCallback(
    (puestoId: string): boolean =>
      asistenciasHoy.some((a) => a.puestoId === puestoId),
    [asistenciasHoy],
  );

  // ── Obtener asistencia de un puesto en fecha específica ───────────────────
  const getAsistencia = useCallback(
    (puestoId: string, fecha?: string) =>
      asistencias.find(
        (a) => a.puestoId === puestoId && a.fecha === (fecha ?? today),
      ) ?? null,
    [asistencias, today],
  );

  // ── Historial de un puesto (últimos N días) ───────────────────────────────
  const getHistorialPuesto = useCallback(
    (puestoId: string, limit = 5) =>
      [...asistencias]
        .filter((a) => a.puestoId === puestoId)
        .sort((a, b) => b.fecha.localeCompare(a.fecha))
        .slice(0, limit),
    [asistencias],
  );

  // ── Registrar asistencia + cambiar estado del puesto ──────────────────────
  const registrar = useCallback(
    (payload: Omit<AsistenciaCreate, 'fecha' | 'horaRegistro'> & { fecha?: string }) => {
      const data: AsistenciaCreate = {
        ...payload,
        fecha:        payload.fecha ?? today,
        horaRegistro: getCurrentTime(),
      };
      dispatch(registrarAsistencia(data));

      // Si no abrió → puesto queda como 'libre' visualmente
      if (!data.abrio) {
        dispatch(cambiarEstadoPuesto({ puestoId: data.puestoId, estado: 'libre' }));
      }
    },
    [dispatch, today],
  );

  const load = useCallback(() => dispatch(loadAsistencias()), [dispatch]);

  return {
    asistencias,
    asistenciasHoy,
    contadores,
    loading,
    load,
    registrar,
    yaRegistrado,
    getAsistencia,
    getHistorialPuesto,
  };
}