'use client';

import { useState, useEffect } from 'react';
import { Input, Button }       from '@/components/ui';
import { useAuth }             from '@/hooks/useAuth';
import clsx from 'clsx';

interface LoginFormProps {
  /** Callback adicional al hacer login exitoso */
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const { login, loading, error, clearError } = useAuth();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [touched,  setTouched]  = useState(false);

  /* Limpiar error al editar campos */
  useEffect(() => {
    if (error) clearError();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  const emailError    = touched && !email.trim()    ? 'El usuario es requerido'    : undefined;
  const passwordError = touched && !password        ? 'La contraseña es requerida' : undefined;
  const isValid       = email.trim().length > 0 && password.length >= 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    await login({ email: email.trim(), password });
    onSuccess?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full flex flex-col gap-4"
    >
      {/* Campo usuario */}
      <Input
        label="Usuario"
        type="email"
        placeholder="Ingrese su usuario"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="username"
        autoCapitalize="none"
        spellCheck={false}
        error={emailError}
        leftIcon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
      />

      {/* Campo contraseña */}
      <Input
        label="Contraseña"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        showPasswordToggle
        error={passwordError}
        leftIcon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        }
      />

      {/* Error de autenticación del servidor */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-2xl"
        >
          <svg
            className="w-4 h-4 text-sisa-red shrink-0 mt-0.5"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm text-red-600 font-medium leading-snug">{error}</p>
        </div>
      )}

      {/* Botón submit */}
      <div className="mt-1">
        <Button
          type="submit"
          fullWidth
          loading={loading}
          disabled={!isValid && touched}
          rightIcon={
            !loading
              ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              )
              : undefined
          }
        >
          Iniciar Recorrido
        </Button>
      </div>

      {/* Link olvidé contraseña */}
      <button
        type="button"
        className="text-sm text-sisa-blue font-medium text-center hover:underline focus:outline-none"
      >
        ¿Olvidó su contraseña?
      </button>
    </form>
  );
}