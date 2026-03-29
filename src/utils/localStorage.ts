/**
 * Helpers tipados para interactuar con localStorage de forma segura.
 * Toda la persistencia de la app pasa por estas funciones.
 */

/** Guarda un valor serializado en localStorage */
export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`[localStorage] Error guardando "${key}":`, err);
  }
}

/** Lee y deserializa un valor de localStorage */
export function getFromStorage<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`[localStorage] Error leyendo "${key}":`, err);
    return null;
  }
}

/** Elimina una clave de localStorage */
export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(`[localStorage] Error eliminando "${key}":`, err);
  }
}

/** Limpia TODO el localStorage de la app (solo claves sisa_*) */
export function clearAppStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith('sisa_'))
      .forEach((k) => localStorage.removeItem(k));
  } catch (err) {
    console.error('[localStorage] Error limpiando storage:', err);
  }
}

/** Verifica si una clave existe */
export function storageExists(key: string): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(key) !== null;
}