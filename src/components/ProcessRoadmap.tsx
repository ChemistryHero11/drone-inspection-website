'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FileText, Plane, Cpu, Package } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Mission Plan',
    description: 'Detailed flight path planning, airspace coordination, and safety protocols tailored to your site.',
    icon: FileText,
  },
  {
    number: '02',
    title: 'Flight Execution',
    description: 'Precision autonomous flights with redundant safety systems and real-time monitoring.',
    icon: Plane,
  },
  {
    number: '03',
    title: 'Data Processing',
    description: 'AI-powered analysis transforms raw imagery into actionable intelligence within 24 hours.',
    icon: Cpu,
  },
  {
    number: '04',
    title: 'Delivery',
    description: 'Comprehensive reports, 3D models, and integration with your existing project management tools.',
    icon: Package,
  },
];

export default function ProcessRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.5"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="py-20 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-24 relative overflow-hidden" ref={containerRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 mesh-bg opacity-30" />
      
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12 sm:mb-20 relative z-10"
      >
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-safety-orange">
          How It Works
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mt-4">
          Our Process
        </h2>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto">
        {/* SVG Line */}
        <svg
          className="absolute left-[21px] sm:left-[23px] md:left-1/2 md:-translate-x-1/2 top-0 h-full w-1"
          viewBox="0 0 4 100"
          preserveAspectRatio="none"
        >
          {/* Background line */}
          <line
            x1="2"
            y1="0"
            x2="2"
            y2="100"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="4"
          />
          {/* Animated line */}
          <motion.line
            x1="2"
            y1="0"
            x2="2"
            y2="100"
            stroke="url(#lineGradient)"
            strokeWidth="4"
            style={{ pathLength }}
          />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff4d00" />
              <stop offset="50%" stopColor="#4a7c9b" />
              <stop offset="100%" stopColor="#ff4d00" />
            </linearGradient>
          </defs>
        </svg>

        {/* Steps */}
        <div className="space-y-12 sm:space-y-16 md:space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative flex items-start gap-8 md:gap-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Node */}
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                <motion.div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background border-2 border-safety-orange/50 flex items-center justify-center"
                  whileInView={{ 
                    borderColor: 'rgba(255, 77, 0, 1)',
                    boxShadow: '0 0 30px rgba(255, 77, 0, 0.5)'
                  }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <step.icon className="w-4 h-4 sm:w-5 sm:h-5 text-safety-orange" />
                </motion.div>
              </div>

              {/* Content */}
              <div className={`flex-1 pl-16 sm:pl-20 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                <div className="glass rounded-2xl p-4 sm:p-6 md:p-8 glass-hover transition-all duration-300 group">
                  <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <span className="text-xs font-mono text-safety-orange tracking-wider">
                      STEP {step.number}
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold mb-2 sm:mb-3 group-hover:text-safety-orange transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-foreground/50 leading-relaxed text-sm sm:text-base">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
