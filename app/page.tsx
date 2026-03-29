import { redirect } from 'next/navigation';

/**
 * Ruta raíz — redirige siempre a /login.
 * AppShell se encargará de redirigir a /dashboard
 * si el usuario ya tiene sesión activa en localStorage.
 */
export default function RootPage() {
  redirect('/login');
}