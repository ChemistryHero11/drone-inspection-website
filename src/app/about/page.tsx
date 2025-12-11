import { Metadata } from 'next';
import AboutPageContent from './AboutPageContent';

export const metadata: Metadata = {
  title: 'About | SkyHigh Imaging',
  description: 'Learn about SkyHigh Imaging - FAA Part 107 certified drone inspection specialists serving the Bay Area.',
};

export default function AboutPage() {
  return <AboutPageContent />;
}
