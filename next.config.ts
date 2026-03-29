import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* ── Optimizaciones de imágenes ── */
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },

  /* ── Alias para importar JSON de la carpeta api ── */
  experimental: {
    // Turbopack está activado via --turbopack en dev script
  },

  /* ── Seguridad: headers HTTP ── */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',        value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },

  /* ── Redirección raíz ── */
  async redirects() {
    return [
      {
        source:      '/',
        destination: '/login',
        permanent:   false,
      },
    ];
  },
};

export default nextConfig;