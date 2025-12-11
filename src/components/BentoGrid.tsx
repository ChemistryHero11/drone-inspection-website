'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Thermometer, Scan, Home, ArrowUpRight } from 'lucide-react';

interface BentoItemProps {
  title: string;
  description: string;
  icon: React.ElementType;
  className?: string;
  isLarge?: boolean;
  isTall?: boolean;
  gradientClass?: string;
  hoveredItem: string | null;
  setHoveredItem: (item: string | null) => void;
  itemKey: string;
}

function BentoItem({ 
  title, 
  description, 
  icon: Icon, 
  className = '', 
  isLarge, 
  isTall,
  gradientClass,
  hoveredItem,
  setHoveredItem,
  itemKey
}: BentoItemProps) {
  const isHovered = hoveredItem === itemKey;
  const isDimmed = hoveredItem !== null && hoveredItem !== itemKey;

  return (
    <motion.div
      className={`group relative glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${className}`}
      onMouseEnter={() => setHoveredItem(itemKey)}
      onMouseLeave={() => setHoveredItem(null)}
      animate={{
        opacity: isDimmed ? 0.4 : 1,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${gradientClass || 'bg-gradient-to-br from-steel-blue/20 to-transparent'}`} />
      
      {/* Video Preview for large card */}
      {isLarge && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
          <video
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
            onMouseLeave={(e) => {
              const video = e.target as HTMLVideoElement;
              video.pause();
              video.currentTime = 0;
            }}
          >
            <source src="/placeholder-video.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {/* Thermal Effect for tall card */}
      {isTall && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500 bg-gradient-to-t from-red-600/30 via-yellow-500/20 to-blue-500/30" />
      )}

      {/* Content */}
      <div className={`relative z-10 h-full flex flex-col ${isLarge || isTall ? 'p-5 sm:p-8' : 'p-4 sm:p-6'}`}>
        {/* Icon */}
        <div className="mb-auto">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-safety-orange/20 transition-colors duration-300">
            <Icon className="w-6 h-6 text-foreground/60 group-hover:text-safety-orange transition-colors duration-300" />
          </div>
        </div>

        {/* Text Content */}
        <div className="mt-auto">
          <h3 className={`font-display font-semibold mb-2 group-hover:text-safety-orange transition-colors duration-300 ${isLarge ? 'text-2xl sm:text-3xl' : isTall ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
            {title}
          </h3>
          <p className="text-foreground/50 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Arrow indicator */}
        <motion.div
          className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          animate={{ rotate: isHovered ? 45 : 0 }}
        >
          <ArrowUpRight className="w-4 h-4" />
        </motion.div>
      </div>

      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(255, 77, 0, 0.3)',
        }}
      />
    </motion.div>
  );
}

export default function BentoGrid() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="services" className="py-20 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-24" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-safety-orange">
          What We Do
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mt-4">
          Our Services
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 auto-rows-[180px] sm:auto-rows-[200px] lg:auto-rows-[240px]"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Large Card - Construction Progression */}
        <motion.div variants={itemVariants} className="sm:col-span-2 sm:row-span-2">
          <BentoItem
            itemKey="construction"
            title="Construction Progression"
            description="Weekly aerial documentation tracking site progress, material delivery, and workforce deployment with millimeter precision."
            icon={Building2}
            isLarge
            className="h-full"
            gradientClass="bg-gradient-to-br from-steel-blue/30 via-steel-blue/10 to-transparent"
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
          />
        </motion.div>

        {/* Tall Card - Thermal Analysis */}
        <motion.div variants={itemVariants} className="sm:row-span-2">
          <BentoItem
            itemKey="thermal"
            title="Thermal Analysis"
            description="Infrared imaging reveals hidden moisture, insulation gaps, and electrical anomalies invisible to the naked eye."
            icon={Thermometer}
            isTall
            className="h-full"
            gradientClass="bg-gradient-to-t from-red-600/20 via-orange-500/10 to-blue-600/10"
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
          />
        </motion.div>

        {/* Small Card - LiDAR Mapping */}
        <motion.div variants={itemVariants}>
          <BentoItem
            itemKey="lidar"
            title="LiDAR Mapping"
            description="3D point cloud generation with sub-centimeter accuracy."
            icon={Scan}
            className="h-full"
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
          />
        </motion.div>

        {/* Small Card - Roof Inspections */}
        <motion.div variants={itemVariants}>
          <BentoItem
            itemKey="roof"
            title="Roof Inspections"
            description="Comprehensive condition assessments without scaffolding."
            icon={Home}
            className="h-full"
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
