'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function AnimatedStat({ value, suffix, label, delay }: StatProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = value / steps;
    let current = 0;

    const delayTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(interval);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      viewport={{ once: true }}
      className="text-center group"
    >
      <div className="relative inline-block">
        <span className="text-5xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight">
          {displayValue.toLocaleString()}
        </span>
        <span className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-safety-orange">
          {suffix}
        </span>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-safety-orange/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </div>
      <p className="mt-3 text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-foreground/50">
        {label}
      </p>
    </motion.div>
  );
}

const stats = [
  { value: 500, suffix: '+', label: 'Inspections Completed' },
  { value: 98, suffix: '%', label: 'Client Retention' },
  { value: 24, suffix: 'hr', label: 'Average Turnaround' },
  { value: 15, suffix: 'M', label: 'Sq Ft Documented' },
];

export default function StatsSection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 md:px-12 lg:px-24 relative overflow-hidden border-y border-white/5">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg opacity-20" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-safety-orange/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-steel-blue/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-safety-orange">
            Track Record
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-4">
            Proven Results
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat, index) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
