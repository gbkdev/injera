'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundEngine } from '@/lib/audio/soundfx';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function SoundController() {
  const [isMuted, setIsMuted] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    if (typeof window !== 'undefined' && soundEngine.getIsMuted) {
      setIsMuted(soundEngine.getIsMuted());
    }
  }, []);

  const handleToggle = () => {
    if (soundEngine.toggleMute) {
      const nextMuted = soundEngine.toggleMute();
      setIsMuted(nextMuted);
      if (!nextMuted) {
        soundEngine.playTizitaChime(0);
      }
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border ${
        isMuted
          ? 'bg-ethiopia-earth-900/80 text-ethiopia-earth-300 border-ethiopia-earth-700/50 hover:border-ethiopia-teff-500/50'
          : 'bg-ethiopia-clay-500/20 text-ethiopia-teff-300 border-ethiopia-teff-500/60 shadow-[0_0_15px_rgba(197,147,52,0.3)] animate-pulse'
      }`}
      title={isMuted ? t('nav.soundOff') : t('nav.soundOn')}
      aria-label={isMuted ? t('nav.soundOff') : t('nav.soundOn')}
    >
      {isMuted ? (
        <VolumeX className="w-3.5 h-3.5 text-ethiopia-earth-400" />
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-ethiopia-teff-400" />
          <Sparkles className="w-2.5 h-2.5 text-ethiopia-clay-400 animate-spin" />
        </>
      )}
      <span className="hidden sm:inline">
        {isMuted ? t('nav.soundOff') : t('nav.soundOn')}
      </span>
    </button>
  );
}
