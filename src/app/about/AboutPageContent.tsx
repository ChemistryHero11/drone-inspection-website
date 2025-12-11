'use client';

import { motion } from 'framer-motion';
import { Award, Shield, FileCheck, Users, Target, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '@/config/siteConfig';
import Footer from '@/components/Footer';

const values = [
  {
    icon: Target,
    title: 'Precision',
    description: 'Every flight is meticulously planned and executed with millimeter-level accuracy.',
  },
  {
    icon: Shield,
    title: 'Safety',
    description: 'OSHA-trained operations with comprehensive insurance and risk management protocols.',
  },
  {
    icon: Zap,
    title: 'Speed',
    description: '24-hour turnaround on standard deliverables. We respect your project timelines.',
  },
  {
    icon: Users,
    title: 'Partnership',
    description: 'We integrate seamlessly with your team, acting as an extension of your operations.',
  },
];

const certifications = [
  { icon: Award, label: 'FAA Part 107 Certified', description: 'Licensed commercial drone operator' },
  { icon: Shield, label: '$1M General Liability', description: 'Comprehensive coverage protection' },
  { icon: FileCheck, label: 'OSHA 10 Trained', description: 'Safety-first job site protocols' },
];

export default function AboutPageContent() {
  return (
    <main className="pt-32 pb-20">
      {/* Hero */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-safety-orange">
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mt-4 mb-6">
            Precision From Above
          </h1>
          <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl">
            {siteConfig.brand.tagline}
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 mb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
              Our Mission
            </h2>
            <div className="space-y-4 text-foreground/60 leading-relaxed">
              <p>
                SkyHigh Imaging was founded with a simple mission: to bring aerospace-grade inspection technology to commercial and industrial clients who demand precision, reliability, and actionable data.
              </p>
              <p>
                We&apos;ve completed over 500 inspections across the Bay Area, serving construction firms, industrial facilities, and infrastructure projects of all scales. Our clients trust us because we deliver more than just images—we provide insights that drive decisions.
              </p>
              <p>
                Every flight is executed with military precision, comprehensive safety protocols, and a commitment to exceeding expectations. When you partner with SkyHigh, you&apos;re getting a team that treats your project as if it were our own.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-2xl overflow-hidden glass"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-steel-blue/30 to-safety-orange/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl sm:text-8xl font-display font-bold text-safety-orange mb-2">
                  500+
                </div>
                <div className="text-sm font-mono uppercase tracking-wider text-foreground/50">
                  Inspections Completed
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 py-20 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-safety-orange">
              Core Values
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-4">
              What Drives Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-safety-orange/10 transition-colors">
                  <value.icon className="w-8 h-8 text-safety-orange" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-foreground/50">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-safety-orange">
              Credentials
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mt-4">
              Certified & Insured
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 text-center"
              >
                <cert.icon className="w-10 h-10 mx-auto text-safety-orange mb-4" />
                <h3 className="font-display font-semibold mb-1">{cert.label}</h3>
                <p className="text-sm text-foreground/50">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Ready to work together?
          </h2>
          <p className="text-foreground/50 mb-8">
            Let&apos;s discuss how we can support your next project.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-safety-orange rounded-full text-white font-semibold uppercase tracking-wider hover:shadow-[0_0_40px_rgba(255,77,0,0.5)] transition-all"
          >
            Get In Touch
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
