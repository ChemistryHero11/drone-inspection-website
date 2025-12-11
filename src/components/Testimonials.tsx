'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "Their thermal imaging caught a major insulation defect we would have never found. Saved us easily $200K in remediation costs down the line.",
    author: "Marcus Chen",
    title: "Project Director",
    company: "Turner Construction",
  },
  {
    quote: "The weekly progression documentation has become indispensable for our stakeholder meetings. Professional, punctual, and the data quality is exceptional.",
    author: "Sarah Mitchell",
    title: "VP of Operations",
    company: "Kiewit Infrastructure",
  },
  {
    quote: "We've used drone services before, but never at this level. The LiDAR accuracy and turnaround time exceeded every expectation.",
    author: "David Okonkwo",
    title: "Chief Engineer",
    company: "AECOM",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => {
      if (dir === 1) return (prev + 1) % testimonials.length;
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-steel-blue/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-safety-orange">
            Client Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-4">
            What They Say
          </h2>
        </motion.div>

        {/* Quote Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-safety-orange/10 flex items-center justify-center">
            <Quote className="w-8 h-8 text-safety-orange" />
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative min-h-[280px] sm:min-h-[240px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <blockquote className="text-center">
                <p className="text-xl sm:text-2xl md:text-3xl font-display font-light leading-relaxed text-foreground/90 mb-8">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>
                <footer>
                  <cite className="not-italic">
                    <span className="block text-lg font-semibold text-foreground">
                      {testimonials[current].author}
                    </span>
                    <span className="block text-sm font-mono text-foreground/50 mt-1">
                      {testimonials[current].title} · {testimonials[current].company}
                    </span>
                  </cite>
                </footer>
              </blockquote>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-foreground/50 hover:border-safety-orange/50 hover:text-safety-orange transition-all duration-300 touch-manipulation"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? 'bg-safety-orange w-6'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => navigate(1)}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-foreground/50 hover:border-safety-orange/50 hover:text-safety-orange transition-all duration-300 touch-manipulation"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
