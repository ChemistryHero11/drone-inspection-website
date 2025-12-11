'use client';

import { useEffect, useState, useRef } from 'react';

const CURSOR_STYLE_ID = 'custom-cursor-style';

export default function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Log environment info, but always enable cursor on client
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    const isLargeScreen = window.matchMedia('(min-width: 768px)').matches;

    console.log('[CustomCursor] conditions', { hasPointer, isLargeScreen });
    console.log('[CustomCursor] forcing enabled');
    setIsEnabled(true);

    // Inject global style to hide default cursor
    let styleEl = document.getElementById(CURSOR_STYLE_ID) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = CURSOR_STYLE_ID;
      styleEl.textContent = `
        *, *::before, *::after {
          cursor: none !important;
        }
      `;
      document.head.appendChild(styleEl);
    }

    // Animation loop for smooth ring following
    let animationId: number;
    const animate = () => {
      // Lerp ring position towards cursor for smooth follow
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.15;
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.15;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPosRef.current.x}px, ${ringPosRef.current.y}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    const moveCursor = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
    };

    // Track hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverTarget = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-cursor-hover]');
      
      setIsHovering(!!isHoverTarget);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousemove', handleElementHover);

    return () => {
      cancelAnimationFrame(animationId);
      const el = document.getElementById(CURSOR_STYLE_ID);
      if (el) el.remove();
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', handleElementHover);
    };
  }, []);

  if (!isEnabled) {
    return null;
  }

  const ringSize = isHovering ? 60 : 40;
  const dotSize = isHovering ? 8 : 6;

  return (
    <>
      {/* Outer glow ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[10001] mix-blend-difference"
        style={{ willChange: 'transform' }}
      >
        <div
          className="rounded-full border-2 border-white transition-all duration-200"
          style={{
            width: ringSize,
            height: ringSize,
            marginLeft: -ringSize / 2,
            marginTop: -ringSize / 2,
          }}
        />
      </div>

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10001]"
        style={{ willChange: 'transform' }}
      >
        <div
          className="rounded-full bg-safety-orange transition-all duration-150"
          style={{
            width: dotSize,
            height: dotSize,
            marginLeft: -dotSize / 2,
            marginTop: -dotSize / 2,
          }}
        />
      </div>
    </>
  );
}
