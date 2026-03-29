'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loginThunk, logout, clearAuthError } from '@/redux/slices/authSlice';
import { addToast } from '@/redux/slices/uiSlice';
import type { LoginCredentials } from '@/interfaces/auth.interface';
import { ROUTES } from '@/utils/constants';

export function useAuth() {
  const dispatch = useAppDispatch();
  const router   = useRouter();
  const { user, isAuthenticated, loading, error } = useAppSelector((s) => s.auth);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const result = await dispatch(loginThunk(credentials));
      if (loginThunk.fulfilled.match(result)) {
        dispatch(addToast({ type: 'success', message: `¡Bienvenida, ${result.payload.nombre}!` }));
        router.push(ROUTES.DASHBOARD);
      }
    },
    [dispatch, router],
  );

  const logoutUser = useCallback(() => {
    dispatch(logout());
    router.push(ROUTES.LOGIN);
  }, [dispatch, router]);

  const clearError = useCallback(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout: logoutUser,
    clearError,
  };
}