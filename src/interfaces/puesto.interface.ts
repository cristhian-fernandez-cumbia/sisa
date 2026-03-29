export type PuestoEstado = 'pagado' | 'atendido' | 'deuda' | 'libre';
export type PuestoTamano = 'Pequeño' | 'Mediano' | 'Grande';

export interface Puesto {
  id: string;
  codigo: string;
  sectorId: string;
  tamano: PuestoTamano;
  estado: PuestoEstado;
  inquilinoId: string | null;
  sisaDiaria: number;
  orden: number;
}

export interface PuestoCreate {
  codigo: string;
  sectorId: string;
  tamano: PuestoTamano;
  sisaDiaria: number;
}

export interface PuestoUpdate extends Partial<PuestoCreate> {
  id: string;
  estado?: PuestoEstado;
  inquilinoId?: string | null;
}

/** Puesto con datos del socio ya combinados (para vistas) */
export interface PuestoConSocio extends Puesto {
  socio?: {
    id: string;
    nombre: string;
    celular: string;
    deudaTotal: number;
    diasDeuda: number;
  } | null;
}