'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Building2, Home, Shield, ChevronRight, Mail, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import Footer from '@/components/Footer';

const { contact, leadFiltering, business } = siteConfig;
const projectTypes = contact.projectTypes.map((type) => ({
  ...type,
  icon: type.id === 'industrial' ? Building2 : type.id === 'residential' ? Home : Shield,
}));
const timeframes = contact.timeframes;
const budgetRanges = leadFiltering.budgetRanges;

export default function ContactPageContent() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    location: '',
    details: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          projectType: selectedType,
          timeframe: selectedTimeframe,
          budgetRange: selectedBudget,
        }),
      });

      if (!response.ok) throw new Error('Request failed');
      setSubmitStatus('success');
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-32 pb-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-safety-orange">
              Contact Us
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mt-4 mb-6">
              Let&apos;s Talk
            </h1>
            <p className="text-lg text-foreground/60 mb-8">
              Ready to get started? Fill out the form and we&apos;ll get back to you within 24 hours with a custom proposal.
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-safety-orange/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-safety-orange" />
                </div>
                <div>
                  <p className="text-sm text-foreground/50">Email</p>
                  <p className="font-mono">{contact.leadEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-safety-orange/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-safety-orange" />
                </div>
                <div>
                  <p className="text-sm text-foreground/50">Phone</p>
                  <a href={`tel:${contact.phoneNumber.replace(/[^+\d]/g, '')}`} className="font-mono hover:text-safety-orange transition-colors">
                    {contact.phoneNumber}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-safety-orange/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-safety-orange" />
                </div>
                <div>
                  <p className="text-sm text-foreground/50">Location</p>
                  <p className="font-mono">
                    {contact.addressLines[0]}<br />
                    {contact.addressLines[1]}
                  </p>
                </div>
              </div>
            </div>

            {/* Service area */}
            <div className="glass rounded-2xl p-6">
              <p className="text-xs font-mono uppercase tracking-wider text-foreground/40 mb-2">
                Service Area
              </p>
              <p className="text-foreground/70">{business.serviceRadiusCopy}</p>
              <p className="text-sm text-foreground/50 mt-2">
                Minimum engagement: {leadFiltering.minEngagementLabel}
              </p>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Project Type */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-[0.2em] text-foreground/40 mb-4">
                  Project Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 rounded-xl border transition-all duration-300 touch-manipulation ${
                        selectedType === type.id
                          ? 'border-safety-orange bg-safety-orange/10'
                          : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                      }`}
                    >
                      <type.icon className={`w-6 h-6 mx-auto mb-2 ${selectedType === type.id ? 'text-safety-orange' : 'text-foreground/40'}`} />
                      <span className={`block text-sm font-medium ${selectedType === type.id ? 'text-safety-orange' : 'text-foreground/70'}`}>
                        {type.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-[0.2em] text-foreground/40 mb-4">
                  Budget Range
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {budgetRanges.map((range) => (
                    <button
                      key={range.id}
                      type="button"
                      onClick={() => setSelectedBudget(range.id)}
                      className={`px-4 py-3 rounded-xl border text-left transition-all touch-manipulation ${
                        selectedBudget === range.id
                          ? 'border-safety-orange bg-safety-orange/10 text-safety-orange'
                          : 'border-white/10 text-foreground/50 hover:border-white/20'
                      }`}
                    >
                      <span className="block font-mono text-sm">{range.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeframe */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-[0.2em] text-foreground/40 mb-4">
                  Timeframe
                </label>
                <div className="flex flex-wrap gap-3">
                  {timeframes.map((tf) => (
                    <button
                      key={tf.id}
                      type="button"
                      onClick={() => setSelectedTimeframe(tf.id)}
                      className={`px-5 py-2.5 rounded-full border font-mono text-sm transition-all touch-manipulation ${
                        selectedTimeframe === tf.id
                          ? 'border-steel-blue bg-steel-blue/20 text-steel-blue-light'
                          : 'border-white/10 text-foreground/50 hover:border-white/20'
                      }`}
                    >
                      {tf.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white/[0.02] border border-white/10 rounded-xl font-mono text-sm placeholder:text-foreground/30 focus:outline-none focus:border-safety-orange/50 transition-all"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white/[0.02] border border-white/10 rounded-xl font-mono text-sm placeholder:text-foreground/30 focus:outline-none focus:border-safety-orange/50 transition-all"
                />
              </div>

              <input
                type="text"
                placeholder="Site Location / Address"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3.5 bg-white/[0.02] border border-white/10 rounded-xl font-mono text-sm placeholder:text-foreground/30 focus:outline-none focus:border-safety-orange/50 transition-all"
              />

              <textarea
                placeholder="Tell us about your project..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                rows={4}
                className="w-full px-4 py-3.5 bg-white/[0.02] border border-white/10 rounded-xl font-mono text-sm placeholder:text-foreground/30 focus:outline-none focus:border-safety-orange/50 transition-all resize-none"
              />

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative px-8 py-4 bg-safety-orange rounded-full text-white font-semibold uppercase tracking-wider overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,77,0,0.5)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Request'}</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <Send className="absolute right-6 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              {submitStatus === 'success' && (
                <p className="text-center text-sm font-mono text-emerald-400">
                  Request sent successfully! We&apos;ll be in touch within 24 hours.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-center text-sm font-mono text-red-400">
                  Something went wrong. Please try again or contact us directly.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
