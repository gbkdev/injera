'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { Fallback2DCard } from './Fallback2DCard';
import { Loader2 } from 'lucide-react';

interface CanvasWrapperProps {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  stageNumber?: number;
  cameraPosition?: [number, number, number];
  fov?: number;
  className?: string;
}

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function CanvasWrapper({
  children,
  fallbackTitle = 'Ethiopian Injera Experience',
  fallbackSubtitle = 'Traditional Culinary Craft',
  stageNumber,
  className = 'w-full h-full min-h-[400px]',
}: CanvasWrapperProps) {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setHasWebGL(checkWebGLSupport());
  }, []);

  if (!isMounted || hasWebGL === null) {
    return (
      <div className={`flex items-center justify-center bg-ethiopia-obsidian rounded-2xl border border-ethiopia-earth-800 ${className}`}>
        <div className="flex flex-col items-center gap-3 text-ethiopia-teff-400">
          <Loader2 className="w-8 h-8 animate-spin text-ethiopia-clay-500" />
          <span className="text-xs uppercase tracking-widest font-mono text-ethiopia-earth-300">
            Preparing 3D Hearth...
          </span>
        </div>
      </div>
    );
  }

  if (!hasWebGL) {
    return (
      <div className={className}>
        <Fallback2DCard
          title={fallbackTitle}
          subtitle={fallbackSubtitle}
          stageNumber={stageNumber}
        />
      </div>
    );
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-b from-ethiopia-obsidian via-[#120F0D] to-ethiopia-obsidian border border-ethiopia-teff-500/20 shadow-2xl ${className}`}>
      {children}
    </div>
  );
}
