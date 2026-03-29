import type { Metadata } from 'next';
import LoginScreen from '@/screens/LoginScreen';

export const metadata: Metadata = {
  title: 'Iniciar sesión',
};

export default function LoginPage() {
  return <LoginScreen />;
}