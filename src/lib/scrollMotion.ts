"use client";

import { useEffect, useState } from "react";

export const SOFT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const SCENE_COUNT = 8;

/* Amplitude decays from full motion at scene 1 to near-static by scene 8. */
const AMPLITUDE_BY_SCENE: Record<number, number> = {
  1: 1.0,
  2: 0.85,
  3: 0.65,
  4: 0.7,
  5: 0.45,
  6: 0.3,
  7: 0.2,
  8: 0.1,
};

export function amplitudeForScene(scene: number): number {
  return AMPLITUDE_BY_SCENE[scene] ?? 0.3;
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mq.matches);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [breakpoint]);
  return isMobile;
}
