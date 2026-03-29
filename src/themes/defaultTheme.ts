/**
 * SISA — Interfaz del tema (usa string, no literales)
 * Esto permite que tanto defaultTheme como darkTheme satisfagan el mismo tipo.
 */
export interface Theme {
  name: 'light' | 'dark';

  colors: {
    primary:       string;
    primaryHover:  string;
    primaryLight:  string;

    pagado:        string;
    pagadoLight:   string;
    atendido:      string;
    atendidoLight: string;
    deuda:         string;
    deudaLight:    string;
    libre:         string;
    libreLight:    string;

    bgPage:        string;
    bgCard:        string;
    bgInput:       string;
    bgMuted:       string;

    textPrimary:   string;
    textSecondary: string;
    textMuted:     string;
    textInverse:   string;

    border:        string;
    borderLight:   string;

    shadowCard:      string;
    shadowCardHover: string;
    shadowModal:     string;

    navBg:       string;
    navActive:   string;
    navInactive: string;
  };

  typography: {
    fontFamily:         string;
    fontSizeXs:         string;
    fontSizeSm:         string;
    fontSizeMd:         string;
    fontSizeLg:         string;
    fontSizeXl:         string;
    fontSize2xl:        string;
    fontSize3xl:        string;
    fontWeightNormal:   string;
    fontWeightMedium:   string;
    fontWeightSemibold: string;
    fontWeightBold:     string;
    lineHeightTight:    string;
    lineHeightNormal:   string;
    lineHeightLoose:    string;
  };

  spacing: {
    xs:    string;
    sm:    string;
    md:    string;
    lg:    string;
    xl:    string;
    '2xl': string;
  };

  borderRadius: {
    sm:    string;
    md:    string;
    lg:    string;
    xl:    string;
    '2xl': string;
    full:  string;
  };

  breakpoints: {
    sm:  string;
    md:  string;
    lg:  string;
    xl:  string;
  };
}

/**
 * SISA — Tema Claro (por defecto)
 * Modifica aquí para cambiar toda la paleta de la app.
 */
export const defaultTheme: Theme = {
  name: 'light',

  colors: {
    /* ── Marca principal ── */
    primary:       '#2E7CF6',   // Azul SISA
    primaryHover:  '#1d6de3',
    primaryLight:  '#EBF3FF',

    /* ── Estados de puestos ── */
    pagado:        '#34C759',   // Verde
    pagadoLight:   '#E8F8ED',
    atendido:      '#FFB800',   // Ámbar
    atendidoLight: '#FFF8E1',
    deuda:         '#FF453A',   // Rojo/Coral
    deudaLight:    '#FFEEED',
    libre:         '#C5C5C5',   // Gris neutro
    libreLight:    '#F4F4F4',

    /* ── Fondos ── */
    bgPage:        '#F2F4F7',
    bgCard:        '#FFFFFF',
    bgInput:       '#FFFFFF',
    bgMuted:       '#F8F9FB',

    /* ── Texto ── */
    textPrimary:   '#1A1A2E',
    textSecondary: '#6B7280',
    textMuted:     '#9CA3AF',
    textInverse:   '#FFFFFF',

    /* ── Bordes ── */
    border:        '#E5E7EB',
    borderLight:   '#F3F4F6',

    /* ── Sombras ── */
    shadowCard:      '0 2px 12px rgba(0,0,0,0.08)',
    shadowCardHover: '0 6px 20px rgba(0,0,0,0.12)',
    shadowModal:     '0 20px 60px rgba(0,0,0,0.18)',

    /* ── Nav ── */
    navBg:       '#FFFFFF',
    navActive:   '#2E7CF6',
    navInactive: '#9CA3AF',
  },

  typography: {
    fontFamily:         "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSizeXs:         '0.75rem',    // 12px
    fontSizeSm:         '0.875rem',   // 14px
    fontSizeMd:         '1rem',       // 16px
    fontSizeLg:         '1.125rem',   // 18px
    fontSizeXl:         '1.25rem',    // 20px
    fontSize2xl:        '1.5rem',     // 24px
    fontSize3xl:        '1.875rem',   // 30px
    fontWeightNormal:   '400',
    fontWeightMedium:   '500',
    fontWeightSemibold: '600',
    fontWeightBold:     '700',
    lineHeightTight:    '1.25',
    lineHeightNormal:   '1.5',
    lineHeightLoose:    '1.75',
  },

  spacing: {
    xs:    '0.25rem',   // 4px
    sm:    '0.5rem',    // 8px
    md:    '1rem',      // 16px
    lg:    '1.5rem',    // 24px
    xl:    '2rem',      // 32px
    '2xl': '3rem',      // 48px
  },

  borderRadius: {
    sm:    '0.5rem',    // 8px
    md:    '0.75rem',   // 12px
    lg:    '1rem',      // 16px
    xl:    '1.25rem',   // 20px
    '2xl': '1.5rem',    // 24px
    full:  '9999px',
  },

  breakpoints: {
    sm:  '640px',
    md:  '768px',
    lg:  '1024px',
    xl:  '1280px',
  },
};

/** @deprecated Usa `Theme` directamente */
export type DefaultTheme = Theme;