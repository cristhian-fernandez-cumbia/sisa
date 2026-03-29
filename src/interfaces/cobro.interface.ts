export type TipoCobro = 'pago' | 'abono' | 'solo_asistencia';
export type TurnoTrabajo = 'mañana' | 'tarde' | 'noche';

export interface Cobro {
  id: string;
  puestoId: string;
  socioId: string;
  fecha: string;        // "YYYY-MM-DD"
  hora: string;         // "HH:MM"
  monto: number;
  montoSisa: number;    // parte correspondiente a la sisa diaria
  montoAbono: number;   // parte que abona a la deuda anterior
  tipo: TipoCobro;
  turno: TurnoTrabajo;
  ticketId: string | null;
  registradoPor: string;
}

export interface CobroCreate {
  puestoId: string;
  socioId: string;
  fecha: string;
  hora: string;
  monto: number;
  montoSisa: number;
  montoAbono: number;
  tipo: TipoCobro;
  turno?: TurnoTrabajo;
  registradoPor: string;
}

/** Vista enriquecida con datos del puesto y socio */
export interface CobroDetalle extends Cobro {
  puesto: { codigo: string; sectorId: string };
  socio: { nombre: string; celular: string };
}