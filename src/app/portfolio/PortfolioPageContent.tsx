'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import Footer from '@/components/Footer';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  category: string;
  videoSrc: string;
}

const videos: VideoItem[] = [
  {
    id: 'construction-progression',
    title: 'Construction Progression',
    description: 'Weekly aerial documentation of a commercial development project.',
    category: 'Progression',
    videoSrc: '/construction.mp4',
  },
  {
    id: 'thermal-inspection',
    title: 'Thermal Roof Inspection',
    description: 'Infrared imaging reveals moisture intrusion on industrial facility.',
    category: 'Thermal',
    videoSrc: '/thermal.mp4',
  },
  {
    id: 'industrial-survey',
    title: 'Industrial Site Survey',
    description: 'Complete aerial survey of a large industrial campus.',
    category: 'Survey',
    videoSrc: '/industrial.mp4',
  },
];

const thermalComparisons = [
  {
    id: 'roof-moisture',
    title: 'Roof Moisture Detection',
    description: 'Thermal imaging revealed significant moisture trapped beneath roofing membrane, preventing costly structural damage.',
    beforeImage: '/roof-standard.png',
    afterImage: '/roof-thermal.png',
  },
  {
    id: 'solar-analysis',
    title: 'Solar Panel Efficiency',
    description: 'Identified underperforming solar cells and connection hotspots, optimizing array output by 25%.',
    beforeImage: '/solar-standard.png',
    afterImage: '/solar-thermal.png',
  },
];

export default function PortfolioPageContent() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

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
            Our Work
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mt-4 mb-6">
            Project Portfolio
          </h1>
          <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl">
            Explore our recent projects showcasing thermal analysis, construction documentation, and aerial surveys.
          </p>
        </motion.div>
      </section>

      {/* Video Gallery */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-safety-orange">
            Video Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mt-4">
            Recent Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer glass"
              onClick={() => setActiveVideo(video)}
            >
              {/* Video thumbnail */}
              <video
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                onMouseLeave={(e) => {
                  const vid = e.target as HTMLVideoElement;
                  vid.pause();
                  vid.currentTime = 0;
                }}
              >
                <source src={video.videoSrc} type="video/mp4" />
              </video>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-safety-orange/80 transition-all duration-300">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-xs font-mono text-safety-orange mb-1 block">
                  {video.category}
                </span>
                <h3 className="font-display font-semibold text-lg text-white">
                  {video.title}
                </h3>
              </div>

              {/* Hover border */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 2px rgba(255, 77, 0, 0.5)' }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Thermal Before/After */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 py-20 border-y border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-safety-orange">
            Thermal Analysis
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mt-4">
            Before & After
          </h2>
          <p className="text-foreground/50 mt-3 max-w-2xl">
            Drag the slider to compare standard imagery with thermal analysis. See what&apos;s invisible to the naked eye.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {thermalComparisons.map((comparison, index) => (
            <motion.div
              key={comparison.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <BeforeAfterSlider
                beforeImage={comparison.beforeImage}
                afterImage={comparison.afterImage}
                beforeLabel="Standard"
                afterLabel="Thermal"
              />
              <div className="mt-4">
                <h3 className="font-display font-semibold text-lg mb-1">
                  {comparison.title}
                </h3>
                <p className="text-sm text-foreground/50">
                  {comparison.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Video Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveVideo(null)}
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />

            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <video autoPlay controls playsInline className="w-full h-full object-cover">
                <source src={activeVideo.videoSrc} type="video/mp4" />
              </video>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
            >
              <h3 className="text-xl font-display font-semibold text-white mb-1">
                {activeVideo.title}
              </h3>
              <p className="text-sm text-foreground/50">{activeVideo.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
