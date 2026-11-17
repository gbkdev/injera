'use client';

import React from 'react';
import { InjeraSimGame } from '@/components/simulation/InjeraSimGame';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Flame, Sparkles } from 'lucide-react';

export default function MakeInjeraPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-ethiopia-obsidian text-ethiopia-linen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ethiopia-earth-900/90 border border-ethiopia-teff-500/30 text-xs text-ethiopia-teff-300 font-semibold">
            <Flame className="w-3.5 h-3.5 text-ethiopia-clay-400" />
            <span>{t('simulation.title')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold serif-display text-ethiopia-linen">
            {language === 'am' ? 'የእራስዎን እንጀራ በገዛ እጅዎ ይጋግሩ' : 'The Virtual Kitchen Hearth'}
          </h1>
          <p className="text-xs sm:text-sm text-ethiopia-earth-300 leading-relaxed">
            {t('simulation.subtitle')}
          </p>
        </div>

        {/* Simulation Game Engine */}
        <InjeraSimGame />
      </div>
    </div>
  );
}
