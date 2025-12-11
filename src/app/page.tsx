import HeroSection from '@/components/HeroSection';
import FloatingNav from '@/components/FloatingNav';
import ClientTicker from '@/components/ClientTicker';
import BentoGrid from '@/components/BentoGrid';
import ProcessRoadmap from '@/components/ProcessRoadmap';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      {/* Floating Navigation */}
      <FloatingNav />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Client Ticker */}
      <ClientTicker />
      
      {/* Services Bento Grid */}
      <BentoGrid />
      
      {/* Process Roadmap */}
      <ProcessRoadmap />
      
      {/* Contact Form */}
      <ContactForm />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
