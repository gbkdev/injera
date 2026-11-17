'use client';

import React, { useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '@/lib/audio/soundfx';

interface StageNavigationProps {
  currentStageNumber: number;
  totalStages: number;
  onPrev: () => void;
  onNext: () => void;
  onFinish?: () => void;
}

export function StageNavigation({
  currentStageNumber,
  totalStages,
  onPrev,
  onNext,
  onFinish,
}: StageNavigationProps) {
  const { t } = useLanguage();

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentStageNumber > 1) {
        onPrev();
        soundEngine.playTizitaChime && soundEngine.playTizitaChime(currentStageNumber - 1);
      } else if (e.key === 'ArrowRight' && currentStageNumber < totalStages) {
        onNext();
        soundEngine.playTizitaChime && soundEngine.playTizitaChime(currentStageNumber + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStageNumber, totalStages, onPrev, onNext]);

  return (
    <div className="flex items-center justify-between gap-4 py-4 px-2">
      <button
        onClick={() => {
          onPrev();
          soundEngine.playTizitaChime && soundEngine.playTizitaChime(currentStageNumber - 1);
        }}
        disabled={currentStageNumber <= 1}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
          currentStageNumber <= 1
            ? 'opacity-40 cursor-not-allowed bg-ethiopia-earth-900 border-ethiopia-earth-800 text-ethiopia-earth-500'
            : 'bg-ethiopia-earth-900/90 border-ethiopia-earth-700 text-ethiopia-earth-200 hover:border-ethiopia-teff-500/50 hover:text-ethiopia-teff-300'
        }`}
        aria-label="Previous Stage"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t('journey.prev')}</span>
      </button>

      <span className="text-xs font-mono text-ethiopia-earth-400">
        {currentStageNumber} / {totalStages}
      </span>

      {currentStageNumber < totalStages ? (
        <button
          onClick={() => {
            onNext();
            soundEngine.playTizitaChime && soundEngine.playTizitaChime(currentStageNumber + 1);
          }}
          className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all bg-gradient-to-r from-ethiopia-clay-500 to-ethiopia-teff-500 text-ethiopia-linen shadow-lg hover:scale-105"
          aria-label="Next Stage"
        >
          <span>{t('journey.next')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      ) : (
        <button
          onClick={() => {
            if (onFinish) onFinish();
            soundEngine.playTizitaChime && soundEngine.playTizitaChime(5);
          }}
          className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all bg-ethiopia-mesob-green text-ethiopia-linen shadow-lg hover:scale-105"
          aria-label="Finish Journey"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{t('journey.finish')}</span>
        </button>
      )}
    </div>
  );
}
