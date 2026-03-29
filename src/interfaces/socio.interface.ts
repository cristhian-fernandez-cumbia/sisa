export type EstadoSocio = 'pagado' | 'atendido' | 'deuda' | 'libre';

export interface Socio {
  id: string;
  nombre: string;
  celular: string;
  dni: string;
  puestoId: string;
  sectorId: string;
  sisaDiaria: number;
  deudaTotal: number;
  diasDeuda: number;
  estado: EstadoSocio;
  fechaIngreso: string;   // ISO date string "YYYY-MM-DD"
  activo: boolean;
}

export interface SocioCreate {
  nombre: string;
  celular: string;
  dni: string;
  puestoId: string;
  sectorId: string;
  sisaDiaria: number;
}

export interface SocioUpdate extends Partial<SocioCreate> {
  id: string;
  deudaTotal?: number;
  diasDeuda?: number;
  estado?: EstadoSocio;
  activo?: boolean;
}