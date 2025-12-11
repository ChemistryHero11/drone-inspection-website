'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Plane, Mail, Briefcase } from 'lucide-react';

const navItems = [
  { name: 'Services', icon: Briefcase, href: '#services' },
  { name: 'Process', icon: Plane, href: '#process' },
  { name: 'Contact', icon: Mail, href: '#contact' },
];

export default function FloatingNav() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => setIsExpanded(!isExpanded);
  const handleLinkClick = () => setIsExpanded(false);

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <motion.div
        className="glass rounded-full px-2 py-2 flex items-center gap-2"
        animate={{ 
          width: isExpanded ? 'auto' : '52px',
          paddingLeft: isExpanded ? '16px' : '6px',
          paddingRight: isExpanded ? '6px' : '6px'
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1"
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-full text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-white/5 active:bg-white/10 transition-all duration-300"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="whitespace-nowrap hidden sm:inline">{item.name}</span>
                </motion.a>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
        
        <motion.button
          className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-safety-orange flex items-center justify-center text-white hover:bg-safety-orange/90 active:bg-safety-orange/80 transition-colors touch-manipulation"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggle}
          aria-label="Toggle navigation menu"
          aria-expanded={isExpanded}
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </motion.nav>
  );
}
