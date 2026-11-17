'use client';

import React from 'react';
import { Sparkles, Info } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface Fallback2DCardProps {
  title: string;
  subtitle?: string;
  stageNumber?: number;
  description?: string;
  badge?: string;
}

export function Fallback2DCard({
  title,
  subtitle,
  stageNumber,
  description,
  badge = 'Interactive 2D Visualizer',
}: Fallback2DCardProps) {
  const { language } = useLanguage();

  return (
    <div className="w-full h-full min-h-[380px] rounded-2xl bg-gradient-to-br from-ethiopia-earth-900 via-ethiopia-obsidian to-ethiopia-clay-900/40 p-6 flex flex-col justify-between border border-ethiopia-teff-500/30 relative overflow-hidden shadow-2xl">
      {/* Background Decorative Rings (Mesob motif) */}
      <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full border border-ethiopia-teff-500/10 pointer-events-none animate-slow-spin"></div>
      <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full border border-ethiopia-clay-500/20 pointer-events-none"></div>

      <div className="relative z-10 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ethiopia-earth-800/80 border border-ethiopia-teff-500/30 text-xs text-ethiopia-teff-300 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-ethiopia-clay-400" />
          <span>{badge}</span>
        </span>
        {stageNumber !== undefined && (
          <span className="text-3xl font-black text-ethiopia-teff-500/30 font-mono">
            {stageNumber < 10 ? `0${stageNumber}` : stageNumber}
          </span>
        )}
      </div>

      {/* Central Visual Articulation */}
      <div className="relative z-10 my-auto text-center py-6">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-tr from-ethiopia-clay-500/30 via-ethiopia-teff-500/20 to-transparent border border-ethiopia-teff-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(197,147,52,0.15)]">
          <div className="w-16 h-16 rounded-full bg-ethiopia-earth-900 flex items-center justify-center border border-ethiopia-teff-500/20">
            <span className="text-2xl font-bold text-ethiopia-teff-400 serif-display">ጤ</span>
          </div>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-ethiopia-linen serif-display mb-1">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs sm:text-sm text-ethiopia-teff-300/80 max-w-md mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom informational note */}
      <div className="relative z-10 bg-ethiopia-earth-900/90 rounded-xl p-3 border border-ethiopia-earth-700/60 text-xs text-ethiopia-earth-300 flex items-start gap-2">
        <Info className="w-4 h-4 text-ethiopia-clay-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {description || (language === 'am' 
            ? 'ይህ ምዕራፍ የተፈጥሮንና የባህል ጥበብን በዝርዝር የሚያሳይ ነው።' 
            : 'Explore this cultural stage with high-fidelity instructional overlays and procedural insights.')}
        </p>
      </div>
    </div>
  );
}
