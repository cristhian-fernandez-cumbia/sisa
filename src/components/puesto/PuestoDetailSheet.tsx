'use client';

import { useCallback, useState } from 'react';
import { BottomSheet }       from '@/components/ui';
import PuestoInfo            from './PuestoInfo';
import PuestoHistorial       from './PuestoHistorial';
import PuestoRegistroForm    from './PuestoRegistroForm';
import type { RegistroFormData } from './PuestoRegistroForm';
import TicketModal           from '@/components/ticket/TicketModal';
import { usePuestos }        from '@/hooks/usePuestos';
import { useCobros }         from '@/hooks/useCobros';
import { useAsistencias }    from '@/hooks/useAsistencias';
import { useTicket }         from '@/hooks/useTicket';
import { useAppSelector }    from '@/redux/hooks';

export default function PuestoDetailSheet() {
  const [forzarReregistro, setForzarReregistro] = useState(false);
  const { selectedPuesto, deseleccionar: _deseleccionar } = usePuestos();
  const deseleccionar = useCallback(() => {
    setForzarReregistro(false);
    _deseleccionar();
  }, [_deseleccionar]);
  const { registrar: registrarCobro }      = useCobros();
  const { registrar: registrarAsistencia, yaRegistrado } = useAsistencias();
  const { isOpen: ticketOpen }             = useTicket();
  const isSheetOpen = useAppSelector((s) => s.ui.puestoSheetOpen);
  const user        = useAppSelector((s) => s.auth.user);
  

  const yaFueRegistrado = selectedPuesto
    ? yaRegistrado(selectedPuesto.id) && !forzarReregistro
    : false;

  const handleSubmit = useCallback(
    async (data: RegistroFormData) => {
      if (!selectedPuesto || !user) return;

      const today = new Date().toISOString().split('T')[0];
      const hora  = new Date().toTimeString().slice(0, 5);

      /* 1. Registrar asistencia */
      registrarAsistencia({
        puestoId:      selectedPuesto.id,
        socioId:       selectedPuesto.inquilinoId ?? '',
        abrio:         data.asistencia,
        registradoPor: user.id,
      });

      /* 2. Registrar cobro si corresponde */
      if (data.asistencia) {
        await registrarCobro({
          puestoId:      selectedPuesto.id,
          socioId:       selectedPuesto.inquilinoId ?? '',
          fecha:         today,
          hora,
          monto:         data.realizoPago
            ? data.monto + (data.abonaDeuda ? data.montoAbono : 0)
            : 0,
          montoSisa:     data.realizoPago ? data.monto : 0,
          montoAbono:    data.abonaDeuda ? data.montoAbono : 0,
          tipo:          !data.realizoPago
            ? 'solo_asistencia'
            : data.abonaDeuda && data.montoAbono > 0
            ? 'abono'
            : 'pago',
          registradoPor: user.id,
        });
      }

      /* 3. Si no hubo pago, cerrar el sheet */
      if (!data.realizoPago) {
        deseleccionar();
      }
      /* Si hubo pago → el cobrosSlice abre el TicketModal automáticamente */
    },
    [selectedPuesto, user, registrarAsistencia, registrarCobro, deseleccionar],
  );

  return (
    <>
      <BottomSheet
        open={isSheetOpen}
        onClose={deseleccionar}
        maxHeight="95vh"
      >
        {selectedPuesto ? (
          <div className="flex flex-col gap-5 px-5 pt-1 pb-36">
            {/* ── Título del sheet ── */}
            <div className="flex items-center justify-between">
              <button
                onClick={deseleccionar}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 -ml-1"
                aria-label="Cerrar"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-base font-bold text-gray-900">
                Detalle del Puesto {selectedPuesto.codigo}
              </h2>
              <div className="w-7" />
            </div>

            {/* ── Sección 1: Info del puesto ── */}
            <PuestoInfo puesto={selectedPuesto} />

            {/* ── Sección 2: Historial reciente ── */}
            <PuestoHistorial puestoId={selectedPuesto.id} limit={5} />

            {/* ── Sección 3: Formulario de registro ── */}
            <PuestoRegistroForm
              sisaDiaria={selectedPuesto.sisaDiaria}
              deudaActual={selectedPuesto.socio?.deudaTotal ?? 0}
              onSubmit={handleSubmit}
              disabled={yaFueRegistrado}
            />

            {/* Aviso si ya fue registrado */}
            {yaFueRegistrado && (
              <div className="flex items-center justify-between px-4 py-3 bg-green-50 border border-green-200 rounded-2xl -mt-2">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-sisa-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs font-semibold text-sisa-green">Ya registrado hoy</p>
                </div>
                <button
                  onClick={() => setForzarReregistro(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-green-300 rounded-xl text-xs font-semibold text-green-700 hover:bg-green-100 active:bg-green-200 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Volver a registrar
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="h-48 flex items-center justify-center">
            <p className="text-gray-400 text-sm">Selecciona un puesto del mapa</p>
          </div>
        )}
      </BottomSheet>

      {/* Modal de ticket — se activa desde cobrosSlice */}
      {ticketOpen && <TicketModal onClose={() => setForzarReregistro(false)} />}
    </>
  );
}