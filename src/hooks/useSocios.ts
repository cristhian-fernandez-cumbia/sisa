'use client';

import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loadSocios, addSocio, updateSocio, deleteSocio } from '@/redux/slices/sociosSlice';
import { addToast } from '@/redux/slices/uiSlice';
import type { SocioCreate, SocioUpdate } from '@/interfaces/socio.interface';

export function useSocios() {
  const dispatch = useAppDispatch();
  const socios   = useAppSelector((s) => s.socios.items);
  const loading  = useAppSelector((s) => s.socios.loading);

  // ── Solo socios activos ───────────────────────────────────────────────────
  const sociosActivos = useMemo(() =>
    socios.filter((s) => s.activo),
    [socios],
  );

  // ── Obtener socio por ID ──────────────────────────────────────────────────
  const getSocioById = useCallback(
    (id: string) => socios.find((s) => s.id === id) ?? null,
    [socios],
  );

  // ── Obtener socio por puesto ──────────────────────────────────────────────
  const getSocioPorPuesto = useCallback(
    (puestoId: string) => socios.find((s) => s.puestoId === puestoId) ?? null,
    [socios],
  );

  // ── Buscar socios por nombre o celular ────────────────────────────────────
  const buscar = useCallback(
    (query: string) => {
      const q = query.toLowerCase().trim();
      if (!q) return sociosActivos;
      return sociosActivos.filter(
        (s) =>
          s.nombre.toLowerCase().includes(q) ||
          s.celular.includes(q) ||
          s.puestoId.toLowerCase().includes(q),
      );
    },
    [sociosActivos],
  );

  // ── Acciones ──────────────────────────────────────────────────────────────
  const load   = useCallback(() => dispatch(loadSocios()), [dispatch]);

  const crear  = useCallback((data: SocioCreate) => {
    dispatch(addSocio(data));
    dispatch(addToast({ type: 'success', message: 'Inquilino registrado correctamente' }));
  }, [dispatch]);

  const editar = useCallback((data: SocioUpdate) => {
    dispatch(updateSocio(data));
    dispatch(addToast({ type: 'success', message: 'Datos actualizados' }));
  }, [dispatch]);

  const eliminar = useCallback((id: string) => {
    dispatch(deleteSocio(id));
    dispatch(addToast({ type: 'info', message: 'Inquilino desactivado' }));
  }, [dispatch]);

  return {
    socios,
    sociosActivos,
    loading,
    load,
    getSocioById,
    getSocioPorPuesto,
    buscar,
    crear,
    editar,
    eliminar,
  };
}