export interface AppConfig {
  mercadoId: string;
  mercadoNombre: string;
  mercadoDireccion: string;
  cobradorId: string;
  cobradorNombre: string;
  cobradorCelular: string;
  version: string;
  moneda: string;
  zonaHoraria: string;
  diasSemana: string[];
  mesesAnio: string[];
}

export type AppTheme = 'light' | 'dark';

export interface UIState {
  theme: AppTheme;
  toasts: ToastItem[];
  ticketModalOpen: boolean;
  puestoSheetOpen: boolean;
  selectedPuestoId: string | null;
  sideNavOpen: boolean;
}

export interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}