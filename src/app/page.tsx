import HeroSection from '@/components/HeroSection';
import ClientTicker from '@/components/ClientTicker';
import TrustBadges from '@/components/TrustBadges';
import BentoGrid from '@/components/BentoGrid';
import StatsSection from '@/components/StatsSection';
import Testimonials from '@/components/Testimonials';
import ProcessRoadmap from '@/components/ProcessRoadmap';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Client Ticker */}
      <ClientTicker />

      {/* Trust Badges */}
      <TrustBadges />
      
      {/* Services Bento Grid */}
      <BentoGrid />

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials */}
      <Testimonials />
      
      {/* Process Roadmap */}
      <ProcessRoadmap />
      
      {/* Contact Form */}
      <ContactForm />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
