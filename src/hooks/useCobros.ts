'use client';

import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loadCobros, registrarCobro, clearLastCobro } from '@/redux/slices/cobrosSlice';
import { cambiarEstadoPuesto } from '@/redux/slices/puestosSlice';
import { actualizarDeudaSocio } from '@/redux/slices/sociosSlice';
import { openTicketModal, addToast } from '@/redux/slices/uiSlice';
import type { CobroCreate } from '@/interfaces/cobro.interface';
import type { PuestoEstado } from '@/interfaces/puesto.interface';
import { getTodayISO } from '@/utils/formatDate';
import { calcDeudaTrasAbono } from '@/utils/calcDeuda';

export function useCobros() {
  const dispatch   = useAppDispatch();
  const cobros     = useAppSelector((s) => s.cobros.items);
  const lastCobro  = useAppSelector((s) => s.cobros.lastCobro);
  const socios     = useAppSelector((s) => s.socios.items);
  const loading    = useAppSelector((s) => s.cobros.loading);
  const today      = getTodayISO();

  // ── Cobros de hoy ─────────────────────────────────────────────────────────
  const cobrosHoy = useMemo(() =>
    [...cobros]
      .filter((c) => c.fecha === today)
      .sort((a, b) => b.hora.localeCompare(a.hora)),
    [cobros, today],
  );

  // ── Total recaudado hoy ────────────────────────────────────────────────────
  const totalHoy = useMemo(() =>
    cobrosHoy.reduce((sum, c) => sum + c.monto, 0),
    [cobrosHoy],
  );

  // ── Cobros por puesto en fecha determinada ─────────────────────────────────
  const getCobrosDelPuesto = useCallback(
    (puestoId: string, limit = 5) =>
      [...cobros]
        .filter((c) => c.puestoId === puestoId)
        .sort((a, b) => b.fecha.localeCompare(a.fecha) || b.hora.localeCompare(a.hora))
        .slice(0, limit),
    [cobros],
  );

  // ── Registrar cobro completo (cobro + actualizar puesto + actualizar socio) ─
  const registrar = useCallback(
    async (payload: CobroCreate) => {
      // 1. Registrar cobro
      dispatch(registrarCobro(payload));

      // 2. Calcular nuevo estado del puesto
      let nuevoEstado: PuestoEstado = 'atendido';
      if (payload.tipo === 'pago' || payload.tipo === 'abono') {
        const socio = socios.find((s) => s.id === payload.socioId);
        if (socio) {
          const nuevaDeuda = calcDeudaTrasAbono(socio.deudaTotal, payload.montoAbono);
          nuevoEstado = nuevaDeuda <= 0 ? 'pagado' : 'deuda';

          // 3. Actualizar deuda del socio
          dispatch(actualizarDeudaSocio({
            socioId:    socio.id,
            deudaTotal: nuevaDeuda,
            diasDeuda:  nuevaDeuda > 0 ? Math.ceil(nuevaDeuda / socio.sisaDiaria) : 0,
          }));
        } else {
          nuevoEstado = 'pagado';
        }
      }

      // 4. Cambiar estado visual del puesto
      dispatch(cambiarEstadoPuesto({ puestoId: payload.puestoId, estado: nuevoEstado }));

      // 5. Mostrar ticket si hubo pago real
      if (payload.tipo !== 'solo_asistencia') {
        dispatch(openTicketModal());
        dispatch(addToast({ type: 'success', message: 'Cobro registrado correctamente ✓' }));
      } else {
        dispatch(addToast({ type: 'info', message: 'Asistencia registrada sin cobro' }));
      }
    },
    [dispatch, socios],
  );

  const load          = useCallback(() => dispatch(loadCobros()), [dispatch]);
  const limpiarUltimo = useCallback(() => dispatch(clearLastCobro()), [dispatch]);

  return {
    cobros,
    cobrosHoy,
    totalHoy,
    lastCobro,
    loading,
    load,
    registrar,
    limpiarUltimo,
    getCobrosDelPuesto,
  };
}