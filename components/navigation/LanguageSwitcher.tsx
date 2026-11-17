'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Globe } from 'lucide-react';
import { soundEngine } from '@/lib/audio/soundfx';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const handleSwitch = (lang: 'en' | 'am') => {
    setLanguage(lang);
    if (soundEngine.playTizitaChime) {
      soundEngine.playTizitaChime(lang === 'am' ? 2 : 1);
    }
  };

  return (
    <div className="inline-flex items-center rounded-full bg-ethiopia-earth-900/90 border border-ethiopia-teff-500/30 p-0.5 text-xs">
      <div className="flex items-center px-1.5 text-ethiopia-teff-400">
        <Globe className="w-3.5 h-3.5" />
      </div>
      <button
        onClick={() => handleSwitch('en')}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 font-medium ${
          language === 'en'
            ? 'bg-ethiopia-teff-500 text-ethiopia-obsidian font-semibold shadow-sm'
            : 'text-ethiopia-earth-300 hover:text-ethiopia-teff-300'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => handleSwitch('am')}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 font-medium ${
          language === 'am'
            ? 'bg-ethiopia-teff-500 text-ethiopia-obsidian font-semibold shadow-sm fidel-font'
            : 'text-ethiopia-earth-300 hover:text-ethiopia-teff-300 fidel-font'
        }`}
        aria-label="Switch to Amharic"
      >
        አማርኛ
      </button>
    </div>
  );
}
