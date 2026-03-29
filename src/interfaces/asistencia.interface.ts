export interface Asistencia {
  id: string;
  puestoId: string;
  socioId: string;
  fecha: string;        // "YYYY-MM-DD"
  abrio: boolean;
  horaRegistro: string; // "HH:MM"
  registradoPor: string;
}

export interface AsistenciaCreate {
  puestoId: string;
  socioId: string;
  fecha: string;
  abrio: boolean;
  horaRegistro: string;
  registradoPor: string;
}