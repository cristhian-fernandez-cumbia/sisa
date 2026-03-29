import type { Metadata } from 'next';
import EstadisticasScreen from '@/screens/EstadisticasScreen';

export const metadata: Metadata = {
  title: 'Estadísticas',
};

export default function StatsPage() {
  return <EstadisticasScreen />;
}