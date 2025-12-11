'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoSrc: string;
}

const videos: VideoItem[] = [
  {
    id: 'construction-progression',
    title: 'Construction Progression',
    description: 'Weekly aerial documentation of a 50-story commercial development.',
    thumbnail: '/thumbnails/construction.jpg',
    videoSrc: '/videos/construction.mp4',
  },
  {
    id: 'thermal-inspection',
    title: 'Thermal Roof Inspection',
    description: 'Infrared imaging reveals moisture intrusion on industrial facility.',
    thumbnail: '/thumbnails/thermal.jpg',
    videoSrc: '/videos/thermal.mp4',
  },
  {
    id: 'industrial-survey',
    title: 'Industrial Site Survey',
    description: 'Complete aerial survey of a 200-acre industrial campus.',
    thumbnail: '/thumbnails/industrial.jpg',
    videoSrc: '/videos/industrial.mp4',
  },
];

export default function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <section id="gallery" className="py-20 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-24 relative">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg opacity-20" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-safety-orange">
            Recent Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mt-4">
            Project Gallery
          </h2>
        </motion.div>

        {/* Video Grid */}
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
              {/* Thumbnail placeholder - replace with actual thumbnails */}
              <div className="absolute inset-0 bg-gradient-to-br from-steel-blue/30 to-safety-orange/20" />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-safety-orange/80 transition-all duration-300">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="font-display font-semibold text-lg text-white mb-1">
                  {video.title}
                </h3>
                <p className="text-sm text-white/60 line-clamp-1">
                  {video.description}
                </p>
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 0 2px rgba(255, 77, 0, 0.5)',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

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
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />

            {/* Close button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors touch-manipulation"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                autoPlay
                controls
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={activeVideo.videoSrc} type="video/mp4" />
              </video>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
            >
              <h3 className="text-xl font-display font-semibold text-white mb-1">
                {activeVideo.title}
              </h3>
              <p className="text-sm text-foreground/50">
                {activeVideo.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
