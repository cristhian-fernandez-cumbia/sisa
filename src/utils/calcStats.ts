import type { Cobro } from '@/interfaces/cobro.interface';
import type { Puesto } from '@/interfaces/puesto.interface';
import type { Sector } from '@/interfaces/sector.interface';
import type { StatsResumen, StatsDia } from '@/interfaces/stats.interface';
import { getLastNDays, getDiaSemana } from './formatDate';

/**
 * Calcula el resumen de estadísticas para un período de fechas.
 */
export function calcResumen(
  cobros: Cobro[],
  puestos: Puesto[],
  fechas: string[],
): StatsResumen {
  const cobrosDelPeriodo = cobros.filter((c) => fechas.includes(c.fecha));

  const totalRecaudado = cobrosDelPeriodo.reduce((sum, c) => sum + c.monto, 0);
  const totalTransacciones = cobrosDelPeriodo.length;

  const puestosTotales = puestos.filter((p) => p.inquilinoId !== null).length;
  const puestosPagados = puestos.filter((p) => p.estado === 'pagado').length;
  const puestosDeuda   = puestos.filter((p) => p.estado === 'deuda').length;
  const puestosLibres  = puestos.filter((p) => p.estado === 'libre').length;
  const puestosVisitados = puestos.filter((p) =>
    ['pagado', 'atendido', 'deuda'].includes(p.estado),
  ).length;

  const totalPosible = puestos
    .filter((p) => p.inquilinoId)
    .reduce((sum, p) => sum + p.sisaDiaria * fechas.length, 0);

  const tasaCobro = totalPosible > 0
    ? Math.round((totalRecaudado / totalPosible) * 100)
    : 0;

  const deudaSocios = puestos
    .filter((p) => p.estado === 'deuda')
    .reduce((sum, p) => sum + (p.sisaDiaria * 3), 0); // aprox

  return {
    totalRecaudado:      Math.round(totalRecaudado * 100) / 100,
    totalDeudaAcumulada: Math.round(deudaSocios * 100) / 100,
    tasaCobro:           Math.min(100, tasaCobro),
    puestosVisitados,
    puestosTotales,
    puestosPagados,
    puestosDeuda,
    puestosLibres,
    totalTransacciones,
  };
}

/**
 * Calcula cobros agrupados por día para la gráfica de barras.
 * Retorna los últimos N días (default 7).
 */
export function calcPorDia(cobros: Cobro[], nDias = 7): StatsDia[] {
  const dias = getLastNDays(nDias);
  return dias.map((fecha) => {
    const cobrosDelDia = cobros.filter((c) => c.fecha === fecha);
    const total = cobrosDelDia.reduce((sum, c) => sum + c.monto, 0);
    return {
      fecha,
      diaSemana: getDiaSemana(fecha),
      totalRecaudado: Math.round(total * 100) / 100,
      totalTransacciones: cobrosDelDia.length,
    };
  });
}

/**
 * Calcula estadísticas por sector.
 */
export function calcPorSector(
  sectores: Sector[],
  puestos: Puesto[],
  cobros: Cobro[],
  fechas: string[],
) {
  return sectores.map((sector) => {
    const puestosDelSector = puestos.filter((p) => p.sectorId === sector.id);
    const cobrosDelSector = cobros.filter(
      (c) =>
        fechas.includes(c.fecha) &&
        puestosDelSector.some((p) => p.id === c.puestoId),
    );
    const totalRecaudado = cobrosDelSector.reduce((sum, c) => sum + c.monto, 0);
    const totalPosible = puestosDelSector
      .filter((p) => p.inquilinoId)
      .reduce((sum, p) => sum + p.sisaDiaria * fechas.length, 0);
    const porcentaje = totalPosible > 0
      ? Math.round((totalRecaudado / totalPosible) * 100)
      : 0;

    return {
      sectorId: sector.id,
      nombre: sector.nombre,
      totalRecaudado: Math.round(totalRecaudado * 100) / 100,
      totalPosible:   Math.round(totalPosible * 100) / 100,
      porcentajeCobro: Math.min(100, porcentaje),
      puestosActivos: puestosDelSector.filter((p) => p.inquilinoId).length,
      puestosTotales: puestosDelSector.length,
    };
  });
}