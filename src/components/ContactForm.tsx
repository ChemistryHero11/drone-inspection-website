'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Building2, Home, Shield, ChevronRight } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

const { contact, leadFiltering, business } = siteConfig;
const projectTypes = contact.projectTypes.map((type) => ({
  ...type,
  icon:
    type.id === 'industrial'
      ? Building2
      : type.id === 'residential'
      ? Home
      : Shield,
}));
const timeframes = contact.timeframes;
const budgetRanges = leadFiltering.budgetRanges;

export default function ContactForm() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    location: '',
    details: '',
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      ...formData,
      projectType: selectedType,
      timeframe: selectedTimeframe,
      budgetRange: selectedBudget,
    });
  };

  return (
    <section id="contact" className="py-20 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-24 relative" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 mesh-bg opacity-20" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-safety-orange">
            Start a Mission
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mt-4">
            Request Inspection
          </h2>
          <p className="mt-4 text-xs md:text-sm font-mono text-foreground/40">
            Serving {business.serviceRadiusCopy} &middot; Minimum engagement {leadFiltering.minEngagementLabel}
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-12">
          {/* Project Type Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <label className="block text-xs font-mono uppercase tracking-[0.2em] text-foreground/40 mb-6">
              // Project Classification
            </label>
            <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-4">
              {projectTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id)}
                  className={`group relative p-4 sm:p-6 rounded-xl border transition-all duration-300 touch-manipulation ${
                    selectedType === type.id
                      ? 'border-safety-orange bg-safety-orange/10'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex flex-col items-center gap-4">
                    <type.icon className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors ${
                      selectedType === type.id ? 'text-safety-orange' : 'text-foreground/40 group-hover:text-foreground/60'
                    }`} />
                    <span className={`font-display text-base sm:text-lg font-semibold tracking-wide ${
                      selectedType === type.id ? 'text-safety-orange' : 'text-foreground/70'
                    }`}>
                      {type.label}
                    </span>
                  </div>
                  
                  {/* Selection indicator */}
                  <div className={`absolute top-3 right-3 w-3 h-3 rounded-full transition-all ${
                    selectedType === type.id ? 'bg-safety-orange' : 'bg-white/10'
                  }`} />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Budget Filtering */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <label className="block text-xs font-mono uppercase tracking-[0.2em] text-foreground/40 mb-6">
              // Project_Budget (USD)
            </label>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
              {budgetRanges.map((range) => (
                <button
                  key={range.id}
                  type="button"
                  onClick={() => setSelectedBudget(range.id)}
                  className={`px-4 sm:px-6 py-3 rounded-xl sm:rounded-full border font-mono text-xs sm:text-sm text-left transition-all duration-300 touch-manipulation ${
                    selectedBudget === range.id
                      ? 'border-safety-orange bg-safety-orange/15 text-safety-orange'
                      : 'border-white/10 text-foreground/50 hover:border-white/20 hover:text-foreground/70'
                  }`}
                >
                  <span className="block">{range.label}</span>
                  {range.hint && (
                    <span className="block text-[10px] md:text-xs text-foreground/40 mt-1">
                      {range.hint}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Timeframe Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <label className="block text-xs font-mono uppercase tracking-[0.2em] text-foreground/40 mb-6">
              // Mission Timeframe
            </label>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {timeframes.map((tf) => (
                <button
                  key={tf.id}
                  type="button"
                  onClick={() => setSelectedTimeframe(tf.id)}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border font-mono text-xs sm:text-sm transition-all duration-300 touch-manipulation ${
                    selectedTimeframe === tf.id
                      ? 'border-steel-blue bg-steel-blue/20 text-steel-blue-light'
                      : 'border-white/10 text-foreground/50 hover:border-white/20 hover:text-foreground/70'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Input Fields - Cockpit Style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Company */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-[0.2em] text-foreground/40">
                // Company_Name
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/[0.02] border border-white/10 rounded-lg font-mono text-sm sm:text-base text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-safety-orange/50 focus:bg-white/[0.04] transition-all"
                placeholder="Enter company name..."
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-[0.2em] text-foreground/40">
                // Contact_Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/[0.02] border border-white/10 rounded-lg font-mono text-sm sm:text-base text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-safety-orange/50 focus:bg-white/[0.04] transition-all"
                placeholder="email@company.com"
              />
            </div>

            {/* Location */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs font-mono uppercase tracking-[0.2em] text-foreground/40">
                // Site_Coordinates
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/[0.02] border border-white/10 rounded-lg font-mono text-sm sm:text-base text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-safety-orange/50 focus:bg-white/[0.04] transition-all"
                placeholder="Enter address or GPS coordinates..."
              />
            </div>

            {/* Details */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs font-mono uppercase tracking-[0.2em] text-foreground/40">
                // Mission_Brief
              </label>
              <textarea
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                rows={4}
                className="w-full px-4 py-4 bg-white/[0.02] border border-white/10 rounded-lg font-mono text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-safety-orange/50 focus:bg-white/[0.04] transition-all resize-none"
                placeholder="Describe inspection requirements..."
              />
            </div>
          </motion.div>

          {/* Work we are not a fit for */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="border border-white/5 rounded-xl px-4 py-4 md:px-6 md:py-5 bg-white/[0.01]"
          >
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/40 mb-3">
              // Not a fit for
            </p>
            <ul className="space-y-1 text-xs md:text-sm text-foreground/45">
              {leadFiltering.excludedJobTypes.map((item) => (
                <li key={item}>
                  • {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row sm:justify-end"
          >
            <button
              type="submit"
              className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-safety-orange rounded-full text-white font-semibold text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,77,0,0.5)] active:scale-[0.98] flex items-center justify-center sm:justify-start gap-3 w-full sm:w-auto touch-manipulation"
            >
              <span className="relative z-10">Initialize Request</span>
              <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <Send className="absolute right-4 w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all" />
            </button>
          </motion.div>
        </form>

        {/* Decorative Elements */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-safety-orange/5 rounded-full blur-3xl" />
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-steel-blue/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
