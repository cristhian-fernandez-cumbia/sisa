export { defaultTheme }            from './defaultTheme';
export { darkTheme }               from './darkTheme';
export type { Theme, DefaultTheme } from './defaultTheme';

import { defaultTheme } from './defaultTheme';
import { darkTheme }    from './darkTheme';
import type { AppTheme } from '@/interfaces/config.interface';
import type { Theme }    from './defaultTheme';

/** Devuelve el tema según el modo activo */
export function getTheme(mode: AppTheme): Theme {
  return mode === 'dark' ? darkTheme : defaultTheme;
}

/** Mapa de colores de estado para usar en className dinámico */
export const estadoColorMap: Record<string, {
  bg:     string;
  text:   string;
  border: string;
  light:  string;
}> = {
  pagado:   { bg: 'bg-sisa-green',  text: 'text-white',     border: 'border-sisa-green',  light: 'bg-green-100 text-green-700'  },
  atendido: { bg: 'bg-sisa-amber',  text: 'text-amber-900', border: 'border-sisa-amber',  light: 'bg-amber-100 text-amber-700'  },
  deuda:    { bg: 'bg-sisa-red',    text: 'text-white',     border: 'border-sisa-red',    light: 'bg-red-100   text-red-600'    },
  libre:    { bg: 'bg-gray-200',    text: 'text-gray-500',  border: 'border-gray-200',    light: 'bg-gray-100  text-gray-500'   },
};