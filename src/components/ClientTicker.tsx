'use client';

import { motion } from 'framer-motion';

const clients = [
  'SKANSKA',
  'TURNER',
  'D.R. HORTON',
  'AECOM',
  'BECHTEL',
  'KIEWIT',
  'FLUOR',
  'JACOBS',
  'PCL',
  'MORTENSON',
  'WHITING-TURNER',
  'GILBANE',
];

export default function ClientTicker() {
  return (
    <section className="py-10 sm:py-16 border-y border-white/5 overflow-hidden bg-background/50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 px-4">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-foreground/40">
            Trusted By Industry Leaders
          </span>
        </div>

        {/* Marquee Container */}
        <div className="relative flex overflow-hidden">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10" />

          {/* First Row */}
          <div className="flex animate-marquee whitespace-nowrap">
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`row1-${index}`}
                className="flex items-center mx-4 sm:mx-8"
              >
                <span className="text-lg sm:text-2xl md:text-3xl font-display font-light tracking-wider text-foreground/20 hover:text-foreground/40 transition-colors duration-300">
                  {client}
                </span>
                <span className="ml-4 sm:ml-8 text-safety-orange/30">•</span>
              </div>
            ))}
          </div>

          {/* Duplicate for seamless loop */}
          <div className="flex animate-marquee whitespace-nowrap" aria-hidden>
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`row1-dup-${index}`}
                className="flex items-center mx-4 sm:mx-8"
              >
                <span className="text-lg sm:text-2xl md:text-3xl font-display font-light tracking-wider text-foreground/20 hover:text-foreground/40 transition-colors duration-300">
                  {client}
                </span>
                <span className="ml-4 sm:ml-8 text-safety-orange/30">•</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
