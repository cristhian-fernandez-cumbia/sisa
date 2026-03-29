import type { Metadata } from 'next';
import HistorialScreen from '@/screens/HistorialScreen';

export const metadata: Metadata = {
  title: 'Historial',
};

export default function HistorialPage() {
  return <HistorialScreen />;
}