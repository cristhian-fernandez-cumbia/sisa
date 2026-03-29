export interface Sector {
  id: string;
  nombre: string;
  descripcion: string;
  totalPuestos: number;
  sisaBase: number;
}

export interface SectorStats {
  sectorId: string;
  nombre: string;
  puestosTotales: number;
  puestosActivos: number;
  puestosPagados: number;
  puestosDeuda: number;
  puestosLibres: number;
  totalRecaudado: number;
  totalPosible: number;
  porcentajeCobro: number;
}