import type { Metadata } from 'next';
import PerfilScreen from '@/screens/PerfilScreen';

export const metadata: Metadata = {
  title: 'Perfil',
};

export default function PerfilPage() {
  return <PerfilScreen />;
}