import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import ReduxProvider from '@/redux/ReduxProvider';
import AppShell     from '@/components/layout/AppShell';
import '@/styles/globals.css';
import '@/styles/ticket.css';

/* ── Fuente ── */
const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter',
  display:  'swap',
});

/* ── SEO / metadata ── */
export const metadata: Metadata = {
  title: {
    default:  'SISA — Control de Cobros',
    template: '%s | SISA',
  },
  description: 'Sistema de control de cobros del mercado. Registra asistencias, pagos y genera comprobantes.',
  keywords:    ['sisa', 'mercado', 'cobros', 'control', 'pagos'],
  authors:     [{ name: 'SISA Control' }],
  icons:       { icon: '/favicon.ico' },
  manifest:    '/manifest.json',
};

/* ── Viewport (PWA + notch) ── */
export const viewport: Viewport = {
  width:           'device-width',
  initialScale:    1,
  maximumScale:    1,
  userScalable:    false,
  themeColor:      '#2E7CF6',
  viewportFit:     'cover',
};

/* ── Layout raíz ── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={inter.variable}
      suppressHydrationWarning
    >
      {/*
        suppressHydrationWarning en <html> evita el warning de React
        cuando AppShell agrega/remueve la clase "dark" en el cliente.
      */}
      <body className="antialiased">
        <ReduxProvider>
          {/*
            AppShell se encarga de:
              1. Seed inicial de localStorage
              2. Guardia de autenticación (redirige a /login si no está auth)
              3. Carga de datos en Redux al autenticarse
              4. Aplica el tema dark/light al <html>
              5. Monta SideNav + BottomNav + Toast globalmente
          */}
          <AppShell>
            {children}
          </AppShell>
        </ReduxProvider>
      </body>
    </html>
  );
}