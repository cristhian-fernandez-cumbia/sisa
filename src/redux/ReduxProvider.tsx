'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

interface ReduxProviderProps {
  children: ReactNode;
}

/**
 * Wrapper de Redux para el App Router de Next.js.
 * Se usa en app/layout.tsx para envolver toda la app.
 */
export default function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}