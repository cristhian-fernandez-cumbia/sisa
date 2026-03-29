import type { Cobro } from '@/interfaces/cobro.interface';
import type { Asistencia } from '@/interfaces/asistencia.interface';
import type { Socio } from '@/interfaces/socio.interface';

/**
 * Recalcula la deuda de un socio a partir de sus asistencias y cobros.
 * Regla: solo se cobra si abrió el puesto (asistencia.abrio = true).
 * Si abrió y no pagó → se suma la sisaDiaria a la deuda.
 */
export function calcDeudaSocio(
  socio: Socio,
  asistencias: Asistencia[],
  cobros: Cobro[],
): { deudaTotal: number; diasDeuda: number } {
  const asisDelSocio = asistencias.filter(
    (a) => a.socioId === socio.id && a.abrio,
  );

  let deudaAcum = 0;
  let diasSinPagar = 0;

  for (const asis of asisDelSocio) {
    const pagoDelDia = cobros.find(
      (c) =>
        c.socioId === socio.id &&
        c.fecha === asis.fecha &&
        (c.tipo === 'pago' || c.tipo === 'abono'),
    );
    if (!pagoDelDia) {
      deudaAcum += socio.sisaDiaria;
      diasSinPagar += 1;
    } else if (pagoDelDia.monto < socio.sisaDiaria) {
      deudaAcum += socio.sisaDiaria - pagoDelDia.monto;
    }
  }

  return { deudaTotal: Math.round(deudaAcum * 100) / 100, diasDeuda: diasSinPagar };
}

/**
 * Calcula el nuevo saldo de deuda después de un pago.
 */
export function calcDeudaTrasAbono(
  deudaActual: number,
  montoAbono: number,
): number {
  return Math.max(0, Math.round((deudaActual - montoAbono) * 100) / 100);
}