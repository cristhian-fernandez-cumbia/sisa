import type { Theme } from './defaultTheme';

/**
 * SISA — Tema Oscuro
 * Satisface la interfaz Theme con valores propios para dark mode.
 */
export const darkTheme: Theme = {
  name: 'dark',

  colors: {
    /* ── Marca principal ── */
    primary:       '#4F95FF',
    primaryHover:  '#3D83F0',
    primaryLight:  '#1A2A3F',

    /* ── Estados de puestos ── */
    pagado:        '#30D158',
    pagadoLight:   '#0D2B18',
    atendido:      '#FFD60A',
    atendidoLight: '#2B2200',
    deuda:         '#FF6961',
    deudaLight:    '#2E1515',
    libre:         '#636366',
    libreLight:    '#2C2C2E',

    /* ── Fondos ── */
    bgPage:        '#0F1117',
    bgCard:        '#1C1E26',
    bgInput:       '#252730',
    bgMuted:       '#1A1C24',

    /* ── Texto ── */
    textPrimary:   '#F2F2F7',
    textSecondary: '#8E8E93',
    textMuted:     '#636366',
    textInverse:   '#1A1A2E',

    /* ── Bordes ── */
    border:        '#2C2E38',
    borderLight:   '#22242C',

    /* ── Sombras ── */
    shadowCard:      '0 2px 12px rgba(0,0,0,0.4)',
    shadowCardHover: '0 6px 20px rgba(0,0,0,0.5)',
    shadowModal:     '0 20px 60px rgba(0,0,0,0.6)',

    /* ── Nav ── */
    navBg:       '#1C1E26',
    navActive:   '#4F95FF',
    navInactive: '#636366',
  },

  typography: {
    fontFamily:         "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSizeXs:         '0.75rem',
    fontSizeSm:         '0.875rem',
    fontSizeMd:         '1rem',
    fontSizeLg:         '1.125rem',
    fontSizeXl:         '1.25rem',
    fontSize2xl:        '1.5rem',
    fontSize3xl:        '1.875rem',
    fontWeightNormal:   '400',
    fontWeightMedium:   '500',
    fontWeightSemibold: '600',
    fontWeightBold:     '700',
    lineHeightTight:    '1.25',
    lineHeightNormal:   '1.5',
    lineHeightLoose:    '1.75',
  },

  spacing: {
    xs:    '0.25rem',
    sm:    '0.5rem',
    md:    '1rem',
    lg:    '1.5rem',
    xl:    '2rem',
    '2xl': '3rem',
  },

  borderRadius: {
    sm:    '0.5rem',
    md:    '0.75rem',
    lg:    '1rem',
    xl:    '1.25rem',
    '2xl': '1.5rem',
    full:  '9999px',
  },

  breakpoints: {
    sm:  '640px',
    md:  '768px',
    lg:  '1024px',
    xl:  '1280px',
  },
};