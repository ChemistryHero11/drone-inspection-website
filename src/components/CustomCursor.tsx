'use client';

import { useEffect, useState, useRef } from 'react';

const CURSOR_STYLE_ID = 'custom-cursor-style';

// Drone SVG - clean version without comments
const DRONE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><g stroke="%23ff4d00" stroke-width="1.5" stroke-linecap="round"><ellipse cx="6" cy="8" rx="5" ry="2" opacity="0.6"/><ellipse cx="26" cy="8" rx="5" ry="2" opacity="0.6"/><ellipse cx="6" cy="24" rx="5" ry="2" opacity="0.6"/><ellipse cx="26" cy="24" rx="5" ry="2" opacity="0.6"/><line x1="10" y1="12" x2="14" y2="14"/><line x1="22" y1="12" x2="18" y2="14"/><line x1="10" y1="20" x2="14" y2="18"/><line x1="22" y1="20" x2="18" y2="18"/><rect x="12" y="13" width="8" height="6" rx="2" fill="%23ff4d00" opacity="0.3"/><circle cx="16" cy="16" r="2" fill="%23ff4d00"/></g></svg>`;

export default function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const droneRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const smoothPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Enable on large screens - mousemove events only fire with actual mouse anyway
    const isLargeScreen = window.matchMedia('(min-width: 768px)').matches;
    
    // Simple mobile detection based on user agent
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    console.log('[CustomCursor]', { isLargeScreen, isMobile });

    if (!isLargeScreen || isMobile) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    // Hide default cursor while custom cursor is active
    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = 'none';

    // Inject global style to hide cursor for all elements as a fallback
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

    // Animation loop for smooth following
    let animationId: number;
    const animate = () => {
      // Lerp position for smooth follow
      smoothPosRef.current.x += (posRef.current.x - smoothPosRef.current.x) * 0.2;
      smoothPosRef.current.y += (posRef.current.y - smoothPosRef.current.y) * 0.2;
      
      if (droneRef.current) {
        droneRef.current.style.transform = `translate(${smoothPosRef.current.x}px, ${smoothPosRef.current.y}px)`;
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
      document.body.style.cursor = previousCursor;
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', handleElementHover);
    };
  }, []);

  if (!isEnabled) {
    return null;
  }

  const size = isHovering ? 48 : 32;

  return (
    <div
      ref={droneRef}
      className="fixed top-0 left-0 pointer-events-none z-[10001] transition-all duration-200"
      style={{ 
        willChange: 'transform',
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        filter: isHovering ? 'drop-shadow(0 0 8px rgba(255, 77, 0, 0.8))' : 'drop-shadow(0 0 4px rgba(255, 77, 0, 0.5))',
      }}
    >
      <div 
        className="w-full h-full rounded-full transition-transform duration-200"
        style={{
          transform: isHovering ? 'scale(1.2)' : 'scale(1)',
          // Solid orange background so the cursor is always visible
          backgroundColor: '#ff4d00',
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(DRONE_SVG)}")`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </div>
  );
}
