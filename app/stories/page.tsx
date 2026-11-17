'use client';

import React from 'react';
import { stories } from '@/data/stories';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Sparkles, MapPin, Volume2, Quote, Info } from 'lucide-react';
import { soundEngine } from '@/lib/audio/soundfx';

export default function StoriesPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-ethiopia-obsidian text-ethiopia-linen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ethiopia-earth-900/90 border border-ethiopia-teff-500/30 text-xs text-ethiopia-teff-300 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-ethiopia-clay-400" />
            <span>{t('stories.title')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold serif-display text-ethiopia-linen">
            {language === 'am' ? 'የጓዳ፣ የእርሻና የትውልድ ታሪኮች' : 'Stories From the Kitchen & Field'}
          </h1>
          <p className="text-xs sm:text-sm text-ethiopia-earth-300 leading-relaxed">
            {t('stories.subtitle')}
          </p>
        </div>

        {/* Stories List */}
        <div className="space-y-8">
          {stories.map((story) => (
            <article
              key={story.id}
              className="rounded-3xl bg-gradient-to-b from-ethiopia-earth-900/90 via-ethiopia-obsidian to-ethiopia-earth-950 border border-ethiopia-earth-700/80 p-6 sm:p-8 shadow-2xl space-y-6"
            >
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ethiopia-earth-800 pb-4">
                <div>
                  <h3 className="text-2xl font-bold text-ethiopia-linen serif-display">
                    {story.personName}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-ethiopia-teff-400 mt-1">
                    <span className="font-semibold">{story.role[language]}</span>
                    <span className="text-ethiopia-earth-500">•</span>
                    <span className="flex items-center gap-1 text-ethiopia-earth-300">
                      <MapPin className="w-3.5 h-3.5 text-ethiopia-clay-400" />
                      <span>{story.location}</span>
                    </span>
                    <span className="text-ethiopia-earth-500">•</span>
                    <span className="text-ethiopia-earth-400">{story.generation}</span>
                  </div>
                </div>

                <button
                  onClick={() => soundEngine.playTizitaChime && soundEngine.playTizitaChime(1)}
                  className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ethiopia-earth-800 hover:bg-ethiopia-earth-700 border border-ethiopia-earth-600 text-xs font-semibold text-ethiopia-teff-300 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5 text-ethiopia-clay-400" />
                  <span>{t('stories.listenAudio')}</span>
                </button>
              </div>

              {/* Quote Block */}
              <blockquote className="p-5 rounded-2xl bg-gradient-to-r from-ethiopia-clay-950/40 via-ethiopia-earth-900/60 to-transparent border-l-4 border-ethiopia-clay-500 text-sm sm:text-base italic text-ethiopia-linen font-serif space-y-1">
                <Quote className="w-5 h-5 text-ethiopia-clay-400 opacity-60 mb-1" />
                <p>“{story.quote[language]}”</p>
              </blockquote>

              {/* Narrative Body */}
              <div className="space-y-3 text-xs sm:text-sm text-ethiopia-earth-200 leading-relaxed">
                {story.body[language].map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Cultural Context Note */}
              <div className="p-4 rounded-2xl bg-ethiopia-earth-900/60 border border-ethiopia-earth-700/60 text-xs flex items-start gap-2.5">
                <Info className="w-4 h-4 text-ethiopia-clay-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-ethiopia-teff-400 block mb-0.5">
                    {t('stories.culturalContext')}
                  </span>
                  <p className="text-ethiopia-earth-300 leading-relaxed">
                    {story.culturalContext[language]}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
