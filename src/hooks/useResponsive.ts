'use client';

import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '@/utils/constants';

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

interface ResponsiveState {
  width:       number;
  breakpoint:  Breakpoint;
  isMobile:    boolean;
  isTablet:    boolean;
  isDesktop:   boolean;
}

function getBreakpoint(width: number): Breakpoint {
  if (width < BREAKPOINTS.MD) return 'mobile';
  if (width < BREAKPOINTS.LG) return 'tablet';
  return 'desktop';
}

export function useResponsive(): ResponsiveState {
  const [width, setWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : BREAKPOINTS.MD,
  );

  useEffect(() => {
    let raf: number;
    const handler = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setWidth(window.innerWidth));
    };
    window.addEventListener('resize', handler, { passive: true });
    return () => {
      window.removeEventListener('resize', handler);
      cancelAnimationFrame(raf);
    };
  }, []);

  const breakpoint = getBreakpoint(width);

  return {
    width,
    breakpoint,
    isMobile:  breakpoint === 'mobile',
    isTablet:  breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
  };
}