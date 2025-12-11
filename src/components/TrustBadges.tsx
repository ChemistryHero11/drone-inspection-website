'use client';

import { motion } from 'framer-motion';
import { Shield, Award, FileCheck, Lock } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

const badges = [
  {
    icon: Award,
    label: siteConfig.business.certifications[0].label,
    description: 'Licensed commercial drone operator',
  },
  {
    icon: Shield,
    label: siteConfig.business.certifications[1].label,
    description: 'Comprehensive coverage protection',
  },
  {
    icon: FileCheck,
    label: siteConfig.business.certifications[2].label,
    description: 'Safety-first job site protocols',
  },
  {
    icon: Lock,
    label: 'Secure Data Handling',
    description: 'Encrypted deliverables & NDA ready',
  },
];

export default function TrustBadges() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-24 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-4 group-hover:border-safety-orange/30 group-hover:bg-safety-orange/5 transition-all duration-300">
                <badge.icon className="w-6 h-6 sm:w-7 sm:h-7 text-safety-orange/70 group-hover:text-safety-orange transition-colors" />
              </div>
              <h3 className="font-display font-semibold text-sm sm:text-base mb-1">
                {badge.label}
              </h3>
              <p className="text-xs text-foreground/40 hidden sm:block">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
