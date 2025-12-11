'use client';

import { motion } from 'framer-motion';
import { Linkedin, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

const { brand, contact, social, meta } = siteConfig;

const socialLinks = [
  { icon: Linkedin, href: social.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: social.twitter, label: 'Twitter' },
  { icon: Instagram, href: social.instagram, label: 'Instagram' },
];

const quickLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="relative py-12 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-24 border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg opacity-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-3 sm:mb-4">
              {brand.shortName}
              <span className="text-safety-orange">.</span>
            </h3>
            <p className="text-foreground/50 max-w-md mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              {brand.tagline}
            </p>
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 sm:w-10 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-foreground/50 hover:border-safety-orange/50 hover:text-safety-orange active:bg-white/5 transition-all duration-300 touch-manipulation"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/40 mb-4 sm:mb-6">
              Navigation
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-foreground/60 hover:text-safety-orange transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/40 mb-4 sm:mb-6">
              Contact
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-center gap-3 text-foreground/60">
                <Mail className="w-4 h-4 text-safety-orange/60" />
                <span className="font-mono text-xs sm:text-sm break-all">{contact.leadEmail}</span>
              </li>
              <li className="flex items-center gap-3 text-foreground/60">
                <Phone className="w-4 h-4 text-safety-orange/60" />
                <a href={`tel:${contact.phoneNumber.replace(/[^+\d]/g, '')}`} className="font-mono text-xs sm:text-sm hover:text-safety-orange transition-colors">{contact.phoneNumber}</a>
              </li>
              <li className="flex items-start gap-3 text-foreground/60">
                <MapPin className="w-4 h-4 text-safety-orange/60 mt-0.5" />
                <span className="font-mono text-xs sm:text-sm">
                  {contact.addressLines[0]}<br />
                  {contact.addressLines[1]}
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4"
        >
          <p className="text-xs font-mono text-foreground/30">
            © {meta.copyrightYear} {brand.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs font-mono text-foreground/30">
            <a href="#" className="hover:text-foreground/50 transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground/50 transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground/50 transition-colors">Cookies</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
