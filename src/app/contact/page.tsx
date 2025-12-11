import { Metadata } from 'next';
import ContactPageContent from './ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact | SkyHigh Imaging',
  description: 'Get in touch with SkyHigh Imaging for your drone inspection needs. Request a quote or schedule a consultation.',
};

export default function ContactPage() {
  return <ContactPageContent />;
}
