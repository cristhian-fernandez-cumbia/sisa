'use client';

import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  loadPuestos,
  selectPuesto,
  setSectorFilter,
  cambiarEstadoPuesto,
  addPuesto,
  updatePuesto,
  liberarPuesto,
} from '@/redux/slices/puestosSlice';
import { openPuestoSheet, closePuestoSheet } from '@/redux/slices/uiSlice';
import type { PuestoCreate, PuestoUpdate, PuestoEstado, PuestoConSocio } from '@/interfaces/puesto.interface';

export function usePuestos() {
  const dispatch  = useAppDispatch();
  const puestos   = useAppSelector((s) => s.puestos.items);
  const socios    = useAppSelector((s) => s.socios.items);
  const filter    = useAppSelector((s) => s.puestos.filterSector);
  const selectedId = useAppSelector((s) => s.ui.selectedPuestoId);
  const loading   = useAppSelector((s) => s.puestos.loading);

  // ── Puestos enriquecidos con datos del socio ──────────────────────────────
  const puestosConSocio: PuestoConSocio[] = useMemo(() =>
    puestos.map((p) => {
      const socio = p.inquilinoId
        ? socios.find((s) => s.id === p.inquilinoId)
        : null;
      return {
        ...p,
        socio: socio
          ? { id: socio.id, nombre: socio.nombre, celular: socio.celular, deudaTotal: socio.deudaTotal, diasDeuda: socio.diasDeuda }
          : null,
      };
    }),
    [puestos, socios],
  );

  // ── Filtrado por sector ────────────────────────────────────────────────────
  const puestosFiltrados: PuestoConSocio[] = useMemo(() =>
    filter === 'todos'
      ? puestosConSocio
      : puestosConSocio.filter((p) => p.sectorId === filter),
    [puestosConSocio, filter],
  );

  // ── Puesto seleccionado actual ─────────────────────────────────────────────
  const selectedPuesto = useMemo(() =>
    selectedId ? puestosConSocio.find((p) => p.id === selectedId) ?? null : null,
    [puestosConSocio, selectedId],
  );

  // ── Contadores rápidos ─────────────────────────────────────────────────────
  const contadores = useMemo(() => ({
    total:    puestos.filter((p) => p.inquilinoId).length,
    pagados:  puestos.filter((p) => p.estado === 'pagado').length,
    deuda:    puestos.filter((p) => p.estado === 'deuda').length,
    atendidos:puestos.filter((p) => p.estado === 'atendido').length,
    libres:   puestos.filter((p) => p.estado === 'libre').length,
  }), [puestos]);

  // ── Acciones ──────────────────────────────────────────────────────────────
  const load           = useCallback(() => dispatch(loadPuestos()), [dispatch]);
  const setFilter      = useCallback((s: string) => dispatch(setSectorFilter(s)), [dispatch]);
  const seleccionar    = useCallback((id: string) => { dispatch(selectPuesto(id)); dispatch(openPuestoSheet(id)); }, [dispatch]);
  const deseleccionar  = useCallback(() => { dispatch(selectPuesto(null)); dispatch(closePuestoSheet()); }, [dispatch]);
  const cambiarEstado  = useCallback((puestoId: string, estado: PuestoEstado) => dispatch(cambiarEstadoPuesto({ puestoId, estado })), [dispatch]);
  const crear          = useCallback((data: PuestoCreate) => dispatch(addPuesto(data)), [dispatch]);
  const editar         = useCallback((data: PuestoUpdate) => dispatch(updatePuesto(data)), [dispatch]);
  const liberar        = useCallback((id: string) => dispatch(liberarPuesto(id)), [dispatch]);

  return {
    puestos,
    puestosConSocio,
    puestosFiltrados,
    selectedPuesto,
    contadores,
    filter,
    loading,
    load,
    setFilter,
    seleccionar,
    deseleccionar,
    cambiarEstado,
    crear,
    editar,
    liberar,
  };
}