'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loadPuestos }     from '@/redux/slices/puestosSlice';
import { loadCobros }      from '@/redux/slices/cobrosSlice';
import { loadAsistencias } from '@/redux/slices/asistenciasSlice';
import { loadSocios }      from '@/redux/slices/sociosSlice';
import { loadConfig }      from '@/redux/slices/configSlice';
import { seedLocalStorage } from '@/utils/seedData';
import { ROUTES } from '@/utils/constants';
import SideNav   from './SideNav';
import BottomNav from './BottomNav';
import Toast     from '@/components/ui/Toast';

const PUBLIC_ROUTES = [ROUTES.LOGIN];

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const dispatch        = useAppDispatch();
  const router          = useRouter();
  const pathname        = usePathname();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const isPublicRoute   = PUBLIC_ROUTES.includes(pathname as typeof ROUTES.LOGIN);
  const theme           = useAppSelector((s) => s.ui.theme);

  /*
   * ── Fix hydration mismatch ──────────────────────────────────────────────────
   * isAuthenticated se hidrata desde localStorage solo en el cliente.
   * En el servidor siempre es false → el árbol SSR no tiene <SideNav> ni
   * <BottomNav>. En el cliente puede ser true → React ve árboles distintos
   * y lanza el error de hidratación.
   *
   * Solución: no renderizar los navs condicionados a isAuthenticated hasta
   * que el componente esté montado en el cliente. El primer render del
   * cliente coincide con el SSR (sin navs), y después del mount React puede
   * actualizar el DOM libremente sin conflicto.
   * ───────────────────────────────────────────────────────────────────────────
   */
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  /* ── 1. Seed localStorage con datos iniciales ── */
  useEffect(() => {
    seedLocalStorage();
  }, []);

  /* ── 2. Guardia de autenticación ── */
  useEffect(() => {
    if (!isPublicRoute && !isAuthenticated) {
      router.replace(ROUTES.LOGIN);
    }
    if (isPublicRoute && isAuthenticated) {
      router.replace(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, isPublicRoute, router]);

  /* ── 3. Cargar datos en Redux cuando el usuario está autenticado ── */
  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(loadConfig());
    dispatch(loadSocios());
    dispatch(loadPuestos());
    dispatch(loadCobros());
    dispatch(loadAsistencias());
  }, [isAuthenticated, dispatch]);

  /* ── 4. Aplicar tema dark/light al elemento <html> ── */
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const showNav = mounted && !isPublicRoute && isAuthenticated;

  return (
    <div className="relative flex min-h-screen bg-(--bg-page)">
      {showNav && <SideNav />}

      <div className="flex-1 min-w-0">
        {children}
      </div>

      {showNav && <BottomNav />}

      {/* Toast siempre presente — no depende de auth */}
      <Toast />
    </div>
  );
}