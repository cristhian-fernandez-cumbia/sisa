import type { Metadata } from 'next';
import DeudoresScreen from '@/screens/DeudoresScreen';

export const metadata: Metadata = {
  title: 'Deudores',
};

export default function DeudoresPage() {
  return <DeudoresScreen />;
}