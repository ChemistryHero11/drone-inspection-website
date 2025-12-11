'use client';

import { motion } from 'framer-motion';
import { Building2, Thermometer, Scan, Home, Camera, Map, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

const services = [
  {
    icon: Building2,
    title: 'Construction Progression',
    description: 'Weekly aerial documentation tracking site progress, material delivery, and workforce deployment with millimeter precision. Perfect for stakeholder updates and project management.',
    features: ['4K Video Documentation', 'Orthomosaic Maps', 'Progress Reports', 'Timeline Comparisons'],
    color: 'from-steel-blue/30 to-steel-blue/10',
  },
  {
    icon: Thermometer,
    title: 'Thermal Analysis',
    description: 'Infrared imaging reveals hidden moisture, insulation gaps, electrical anomalies, and HVAC inefficiencies invisible to the naked eye.',
    features: ['Moisture Detection', 'Insulation Gaps', 'Electrical Hotspots', 'HVAC Analysis'],
    color: 'from-red-600/20 to-orange-500/10',
  },
  {
    icon: Scan,
    title: 'LiDAR Mapping',
    description: '3D point cloud generation with sub-centimeter accuracy. Create detailed topographical maps and as-built models for engineering and planning.',
    features: ['Point Cloud Data', 'Topographical Maps', 'Volume Calculations', 'BIM Integration'],
    color: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    icon: Home,
    title: 'Roof Inspections',
    description: 'Comprehensive condition assessments without scaffolding or safety risks. Identify damage, wear patterns, and maintenance needs.',
    features: ['Damage Assessment', 'Warranty Documentation', 'Insurance Claims', 'Maintenance Planning'],
    color: 'from-amber-500/20 to-yellow-500/10',
  },
  {
    icon: Camera,
    title: 'Aerial Photography',
    description: 'High-resolution stills and cinematic video for marketing, documentation, and project showcases. 4K/6K RAW capture available.',
    features: ['Marketing Assets', 'Project Archives', 'Cinematic Reels', 'Social Media Content'],
    color: 'from-purple-500/20 to-pink-500/10',
  },
  {
    icon: Map,
    title: 'Site Surveys',
    description: 'Complete aerial surveys for pre-construction planning, land development, and property assessment. Faster and more accurate than traditional methods.',
    features: ['Boundary Mapping', 'Elevation Models', 'Area Calculations', 'GIS Integration'],
    color: 'from-blue-500/20 to-indigo-500/10',
  },
];

export default function ServicesPageContent() {
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
            Our Services
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mt-4 mb-6">
            Inspection Solutions
          </h1>
          <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl">
            From thermal imaging to LiDAR mapping, we provide comprehensive aerial inspection services tailored to your industry needs.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group glass rounded-2xl p-6 sm:p-8 glass-hover transition-all duration-300"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-safety-orange/20 transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-foreground/60 group-hover:text-safety-orange transition-colors duration-300" />
                </div>

                {/* Content */}
                <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-3 group-hover:text-safety-orange transition-colors">
                  {service.title}
                </h2>
                <p className="text-foreground/50 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 rounded-full bg-white/5 text-xs font-mono text-foreground/50"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-safety-orange group-hover:underline"
                >
                  Request Service
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Not sure which service you need?
          </h2>
          <p className="text-foreground/50 mb-8">
            Let&apos;s discuss your project and find the right solution for your requirements.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-safety-orange rounded-full text-white font-semibold uppercase tracking-wider hover:shadow-[0_0_40px_rgba(255,77,0,0.5)] transition-all"
          >
            Schedule a Consultation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
