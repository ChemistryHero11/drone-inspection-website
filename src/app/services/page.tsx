import { Metadata } from 'next';
import ServicesPageContent from './ServicesPageContent';

export const metadata: Metadata = {
  title: 'Services | SkyHigh Imaging',
  description: 'Professional drone inspection services including thermal analysis, construction progression, LiDAR mapping, and roof inspections.',
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
