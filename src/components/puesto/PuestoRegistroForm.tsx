'use client';

import { useState } from 'react';
import { Toggle, Button } from '@/components/ui';
import { formatCurrency } from '@/utils/formatCurrency';
import clsx from 'clsx';

export interface RegistroFormData {
  asistencia:  boolean;
  realizoPago: boolean;
  monto:       number;
  montoAbono:  number;
  abonaDeuda:  boolean;
}

interface PuestoRegistroFormProps {
  sisaDiaria:  number;
  deudaActual: number;
  onSubmit:    (data: RegistroFormData) => Promise<void> | void;
  loading?:    boolean;
  disabled?:   boolean;
}

export default function PuestoRegistroForm({
  sisaDiaria,
  deudaActual,
  onSubmit,
  loading  = false,
  disabled = false,
}: PuestoRegistroFormProps) {
  const [asistencia,  setAsistencia]  = useState(false);
  const [realizoPago, setRealizoPago] = useState(false);
  const [monto,       setMonto]       = useState(sisaDiaria.toFixed(2));
  const [abonaDeuda,  setAbonaDeuda]  = useState(false);
  const [montoAbono,  setMontoAbono]  = useState('');
  const [error,       setError]       = useState('');

  /* ── Handlers con reseteo directo, sin useEffect ── */

  const handleAsistencia = (value: boolean) => {
    setAsistencia(value);
    if (!value) {
      // Al desmarcar asistencia, resetear todo lo dependiente
      setRealizoPago(false);
      setAbonaDeuda(false);
      setMontoAbono('');
      setError('');
    }
  };

  const handleRealizoPago = (value: boolean) => {
    setRealizoPago(value);
    if (!value) {
      setAbonaDeuda(false);
      setMontoAbono('');
      setError('');
    }
  };

  const handleAbonaDeuda = (value: boolean) => {
    setAbonaDeuda(value);
    if (!value) setMontoAbono('');
  };

  /* ── Cálculos derivados ── */
  const montoNum      = parseFloat(monto)      || 0;
  const montoAbonoNum = parseFloat(montoAbono) || 0;
  const totalACobrar  = montoNum + (abonaDeuda ? montoAbonoNum : 0);
  const canSubmit     = !disabled && asistencia;

  /* ── Submit con validación ── */
  const handleSubmit = async () => {
    setError('');

    if (realizoPago && montoNum <= 0) {
      setError('El monto a cobrar debe ser mayor a S/ 0.00');
      return;
    }
    if (abonaDeuda && montoAbonoNum <= 0) {
      setError('El monto de abono debe ser mayor a S/ 0.00');
      return;
    }
    if (abonaDeuda && montoAbonoNum > deudaActual) {
      setError(`El abono no puede superar la deuda de ${formatCurrency(deudaActual)}`);
      return;
    }

    await onSubmit({
      asistencia,
      realizoPago,
      monto:      realizoPago ? montoNum : 0,
      montoAbono: abonaDeuda  ? montoAbonoNum : 0,
      abonaDeuda,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
        Registro Diario de Hoy
      </p>

      {/* Toggle asistencia */}
      <Toggle
        checked={asistencia}
        onChange={handleAsistencia}
        disabled={disabled}
        label="Asistencia"
        description={asistencia ? 'El puesto abrió hoy' : 'Marcar si el puesto abrió'}
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
      />

      {/* Toggle pago — solo si asistencia=true */}
      {asistencia && (
        <Toggle
          checked={realizoPago}
          onChange={handleRealizoPago}
          disabled={disabled}
          label="¿Realizó Pago?"
          description={realizoPago ? 'Sí, realizó el pago' : 'Registrar sin cobro'}
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
      )}

      {/* Campos de monto — solo si asistencia + pago */}
      {asistencia && realizoPago && (
        <div className="flex flex-col gap-1.5">
          <p className="text-[10px] font-bold tracking-widest uppercase text-sisa-blue">
            Monto a Cobrar (S/)
          </p>

          {/* Input monto sisa */}
          <div className={clsx(
            'flex items-center bg-gray-50 rounded-2xl border px-4 py-3',
            'focus-within:ring-2 focus-within:ring-sisa-blue/30 focus-within:border-sisa-blue transition-all',
            error && montoNum <= 0 ? 'border-sisa-red' : 'border-gray-200',
          )}>
            <span className="text-gray-400 font-semibold mr-2 text-lg">S/</span>
            <input
              type="number"
              step="0.50"
              min="0"
              value={monto}
              onChange={(e) => { setMonto(e.target.value); setError(''); }}
              disabled={disabled}
              className="flex-1 bg-transparent text-2xl font-extrabold text-gray-900 focus:outline-none min-w-0"
              placeholder="0.00"
            />
          </div>
          <p className="text-xs text-gray-400 italic">
            El monto por defecto es la sisa diaria ({formatCurrency(sisaDiaria)})
          </p>

          {/* Checkbox abono a deuda — solo si hay deuda */}
          {deudaActual > 0 && (
            <div className="mt-1">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className={clsx(
                  'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0',
                  abonaDeuda
                    ? 'bg-sisa-blue border-sisa-blue'
                    : 'bg-white border-gray-300 group-hover:border-sisa-blue',
                )}>
                  <input
                    type="checkbox"
                    checked={abonaDeuda}
                    onChange={(e) => handleAbonaDeuda(e.target.checked)}
                    disabled={disabled}
                    className="sr-only"
                  />
                  {abonaDeuda && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  ¿Abona a deuda anterior?{' '}
                  <span className="text-sisa-red font-semibold">
                    ({formatCurrency(deudaActual)})
                  </span>
                </span>
              </label>

              {/* Input monto abono */}
              {abonaDeuda && (
                <div className={clsx(
                  'flex items-center bg-gray-50 rounded-2xl border px-4 py-3 mt-2',
                  'focus-within:ring-2 focus-within:ring-sisa-blue/30 focus-within:border-sisa-blue transition-all',
                  error && montoAbonoNum <= 0 ? 'border-sisa-red' : 'border-gray-200',
                )}>
                  <span className="text-gray-400 font-semibold mr-2">S/</span>
                  <input
                    type="number"
                    step="0.50"
                    min="0"
                    max={deudaActual}
                    value={montoAbono}
                    onChange={(e) => { setMontoAbono(e.target.value); setError(''); }}
                    disabled={disabled}
                    className="flex-1 bg-transparent text-lg font-bold text-gray-900 focus:outline-none"
                    placeholder="Monto abono deuda"
                  />
                </div>
              )}
            </div>
          )}

          {/* Total a recibir */}
          {abonaDeuda && montoAbonoNum > 0 && (
            <div className="flex items-center justify-between bg-blue-50 rounded-xl px-4 py-2.5 mt-1">
              <span className="text-xs font-semibold text-sisa-blue">Total a recibir</span>
              <span className="text-sm font-extrabold text-sisa-blue">
                {formatCurrency(totalACobrar)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Error de validación */}
      {error && (
        <div className="flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-red-200 rounded-xl">
          <svg className="w-4 h-4 text-sisa-red shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-xs text-sisa-red font-medium">{error}</p>
        </div>
      )}

      {/* Botón principal */}
      <div className="pt-1">
        <Button
          fullWidth
          loading={loading}
          disabled={!canSubmit}
          onClick={handleSubmit}
          leftIcon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
        >
            {!asistencia
            ? 'REGISTRAR'
            : realizoPago
            ? 'REGISTRAR ASISTENCIA Y COBRO'
            : 'REGISTRAR ASISTENCIA'}
        </Button>
        <p className="text-xs text-gray-400 text-center mt-2">
          {realizoPago
            ? 'Se generará un ticket de comprobante'
            : asistencia
            ? 'Se registrará solo la asistencia'
            : 'Activa la asistencia para continuar'}
        </p>
      </div>
    </div>
  );
}