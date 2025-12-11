'use client';

import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { ArrowRight, Play } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

const { hero, brand } = siteConfig;
const headline = hero.headline;

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5 + i * 0.04,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.5,
    },
  },
};

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={hero.video.poster}
        >
          <source src={hero.video.src} type="video/mp4" />
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 mesh-bg opacity-60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-6">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <span className="glass px-4 py-2 rounded-full text-xs font-mono uppercase tracking-[0.2em] text-foreground/60">
            {hero.badge}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-center tracking-tighter leading-[0.9]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {headline.split('').map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              custom={index}
              className={char === ' ' ? 'inline-block w-4 sm:w-6 md:w-8' : 'inline-block'}
              style={{
                textShadow: '0 0 80px rgba(255, 77, 0, 0.3)',
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-foreground/60 max-w-2xl text-center font-light px-2"
        >
          {hero.subheading}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          <MagneticButton className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-safety-orange rounded-full text-white font-semibold text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,77,0,0.5)] w-full sm:w-auto justify-center">
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-safety-orange to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </MagneticButton>

          <MagneticButton className="group px-6 sm:px-8 py-3.5 sm:py-4 glass rounded-full text-foreground font-semibold text-sm uppercase tracking-wider glass-hover w-full sm:w-auto justify-center">
            <span className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Watch Reel
            </span>
          </MagneticButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-24 sm:bottom-32 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-foreground/40">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-foreground/40 to-transparent" />
          </motion.div>
        </motion.div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="font-display text-2xl font-bold tracking-tight"
        >
          {brand.shortName}
          <span className="text-safety-orange">.</span>
        </motion.div>
      </div>

      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10 hidden md:block">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-xs font-mono text-foreground/40 text-right"
        >
          <div>{brand.location.coordinates.lat}</div>
          <div>{brand.location.coordinates.lng}</div>
        </motion.div>
      </div>
    </section>
  );
}
