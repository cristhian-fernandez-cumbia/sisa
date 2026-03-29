/**
 * seedData.ts
 * Carga los JSON iniciales en localStorage si aún no existen.
 * Se llama una sola vez desde el layout raíz al montar la app.
 */
import { saveToStorage, storageExists } from './localStorage';
import { LS_KEYS } from './constants';

// Importación estática de los JSON (Next.js los incluye en el bundle)
import authData        from '@/api/auth.json';
import sociosData      from '@/api/socios.json';
import puestosData     from '@/api/puestos.json';
import sectoresData    from '@/api/sectores.json';
import cobrosData      from '@/api/cobros.json';
import asistenciasData from '@/api/asistencias.json';
import configData      from '@/api/config.json';

export function seedLocalStorage(): void {
  if (typeof window === 'undefined') return;

  // Solo se carga si el storage está vacío (primera visita)
  if (!storageExists(LS_KEYS.SOCIOS)) {
    saveToStorage(LS_KEYS.SOCIOS,      sociosData.socios);
    saveToStorage(LS_KEYS.PUESTOS,     puestosData.puestos);
    saveToStorage(LS_KEYS.SECTORES,    sectoresData.sectores);
    saveToStorage(LS_KEYS.COBROS,      cobrosData.cobros);
    saveToStorage(LS_KEYS.ASISTENCIAS, asistenciasData.asistencias);
    saveToStorage(LS_KEYS.CONFIG,      configData);
    // auth NO se guarda en LS (solo se usa para validar login)
    console.info('[SISA] Datos semilla cargados en localStorage ✓');
  }
}

/**
 * Reinicia el localStorage con los datos originales del JSON.
 * Útil en desarrollo o desde el panel de configuración.
 */
export function resetToSeedData(): void {
  if (typeof window === 'undefined') return;
  saveToStorage(LS_KEYS.SOCIOS,      sociosData.socios);
  saveToStorage(LS_KEYS.PUESTOS,     puestosData.puestos);
  saveToStorage(LS_KEYS.SECTORES,    sectoresData.sectores);
  saveToStorage(LS_KEYS.COBROS,      cobrosData.cobros);
  saveToStorage(LS_KEYS.ASISTENCIAS, asistenciasData.asistencias);
  saveToStorage(LS_KEYS.CONFIG,      configData);
  console.info('[SISA] Datos reseteados a semilla ✓');
}

/** Devuelve las credenciales válidas (solo para comparar en login) */
export function getAuthUsers() {
  return authData.users;
}