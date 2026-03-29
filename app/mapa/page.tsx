import type { Metadata } from 'next';
import MapaScreen from '@/screens/MapaScreen';

export const metadata: Metadata = {
  title: 'Mapa de Puestos',
};

export default function MapaPage() {
  return <MapaScreen />;
}