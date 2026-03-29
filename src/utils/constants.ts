/* ─── Rutas de navegación ─── */
export const ROUTES = {
  HOME:        '/',
  LOGIN:       '/login',
  DASHBOARD:   '/dashboard',
  MAPA:        '/mapa',
  STATS:       '/stats',
  HISTORIAL:   '/historial',
  DEUDORES:    '/deudores',
  PERFIL:      '/perfil',
} as const;

/* ─── Claves de localStorage ─── */
export const LS_KEYS = {
  AUTH:        'sisa_auth',
  SOCIOS:      'sisa_socios',
  PUESTOS:     'sisa_puestos',
  SECTORES:    'sisa_sectores',
  COBROS:      'sisa_cobros',
  ASISTENCIAS: 'sisa_asistencias',
  CONFIG:      'sisa_config',
  THEME:       'sisa_theme',
} as const;

/* ─── Estados de puesto ─── */
export const ESTADO_LABELS: Record<string, string> = {
  pagado:   'Pagado',
  atendido: 'Atendido',
  deuda:    'Deuda',
  libre:    'Libre',
};

/* ─── Tipos de cobro ─── */
export const TIPO_COBRO_LABELS: Record<string, string> = {
  pago:             'Pago',
  abono:            'Abono',
  solo_asistencia:  'Solo asistencia',
};

/* ─── Colores Tailwind por estado (para clases dinámicas) ─── */
export const ESTADO_BG: Record<string, string> = {
  pagado:   'bg-sisa-green',
  atendido: 'bg-sisa-amber',
  deuda:    'bg-sisa-red',
  libre:    'bg-gray-300',
};

export const TIPO_COBRO_BORDER: Record<string, string> = {
  pago:            'border-l-sisa-green',
  abono:           'border-l-sisa-amber',
  solo_asistencia: 'border-l-gray-300',
};

/* ─── Número de ticket inicial ─── */
export const TICKET_START_NUMBER = 247;

/* ─── Breakpoints (mirror de tailwind.config) ─── */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
} as const;

/* ─── Días de semana cortos ─── */
export const DIAS_SEMANA = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

/* ─── Meses ─── */
export const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];