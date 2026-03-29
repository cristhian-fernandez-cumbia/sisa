export type StatsPeriodo = 'hoy' | 'semana' | 'mes';

export interface StatsResumen {
  totalRecaudado: number;
  totalDeudaAcumulada: number;
  tasaCobro: number;           // 0–100 porcentaje
  puestosVisitados: number;
  puestosTotales: number;
  puestosPagados: number;
  puestosDeuda: number;
  puestosLibres: number;
  totalTransacciones: number;
}

export interface StatsDia {
  fecha: string;               // "YYYY-MM-DD"
  diaSemana: string;           // "Lun", "Mar", etc.
  totalRecaudado: number;
  totalTransacciones: number;
}

export interface StatsState {
  periodo: StatsPeriodo;
  resumen: StatsResumen;
  porDia: StatsDia[];          // últimos 7 días
  loading: boolean;
  error: string | null;
}