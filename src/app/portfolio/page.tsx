import { Metadata } from 'next';
import PortfolioPageContent from './PortfolioPageContent';

export const metadata: Metadata = {
  title: 'Portfolio | SkyHigh Imaging',
  description: 'View our drone inspection portfolio featuring thermal imaging, construction progression, and aerial surveys.',
};

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
