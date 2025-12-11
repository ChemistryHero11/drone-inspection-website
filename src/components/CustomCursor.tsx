'use client';

import { useEffect, useRef, useState } from 'react';

const CURSOR_STYLE_ID = 'custom-cursor-style';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    console.log('[CustomCursor overlay]', { isMobile });

    if (isMobile) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = 'none';

    // Hide system cursor for all elements while enabled
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

    const moveCursor = (e: MouseEvent) => {
      const el = cursorRef.current;
      if (!el) return;
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      el.style.opacity = '1';
    };

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
      const el = document.getElementById(CURSOR_STYLE_ID);
      if (el) el.remove();
      document.body.style.cursor = previousCursor;
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', handleElementHover);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  const size = isHovering ? 40 : 32;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[10001] pointer-events-none opacity-0 transition-opacity duration-150"
      style={{ transform: 'translate3d(-9999px, -9999px, 0)' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        className="drop-shadow-[0_0_8px_rgba(255,77,0,0.8)] transition-transform duration-150"
        style={{ transform: isHovering ? 'scale(1.1)' : 'scale(1)' }}
      >
        <g stroke="#ff4d00" strokeWidth="1.5" strokeLinecap="round">
          <ellipse cx="6" cy="8" rx="5" ry="2" opacity="0.6" />
          <ellipse cx="26" cy="8" rx="5" ry="2" opacity="0.6" />
          <ellipse cx="6" cy="24" rx="5" ry="2" opacity="0.6" />
          <ellipse cx="26" cy="24" rx="5" ry="2" opacity="0.6" />
          <line x1="10" y1="12" x2="14" y2="14" />
          <line x1="22" y1="12" x2="18" y2="14" />
          <line x1="10" y1="20" x2="14" y2="18" />
          <line x1="22" y1="20" x2="18" y2="18" />
          <rect
            x="12"
            y="13"
            width="8"
            height="6"
            rx="2"
            fill="#ff4d00"
            opacity="0.3"
          />
          <circle cx="16" cy="16" r="2" fill="#ff4d00" />
        </g>
      </svg>
    </div>
  );
}
