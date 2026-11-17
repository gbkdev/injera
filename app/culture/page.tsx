'use client';

import React from 'react';
import Link from 'next/link';
import { culturalArticles } from '@/data/cultural_articles';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { BookOpen, Clock, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { soundEngine } from '@/lib/audio/soundfx';

export default function CulturePage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-ethiopia-obsidian text-ethiopia-linen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ethiopia-earth-900/90 border border-ethiopia-teff-500/30 text-xs text-ethiopia-teff-300 font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-ethiopia-clay-400" />
            <span>{t('culture.title')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold serif-display text-ethiopia-linen">
            {language === 'am' ? 'የእንጀራ ታሪክ፣ ሳይንስና የባህል ማህደር' : 'The Cultural Soul of Injera'}
          </h1>
          <p className="text-xs sm:text-sm text-ethiopia-earth-300 leading-relaxed">
            {t('culture.subtitle')}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {culturalArticles.map((art) => (
            <Link
              key={art.id}
              href={`/culture/${art.slug}`}
              onClick={() => soundEngine.playTizitaChime && soundEngine.playTizitaChime(1)}
              className="group flex flex-col justify-between rounded-3xl bg-gradient-to-b from-ethiopia-earth-900/80 to-ethiopia-obsidian border border-ethiopia-earth-700 hover:border-ethiopia-teff-500/60 p-6 sm:p-7 shadow-xl hover:shadow-[0_0_25px_rgba(197,147,52,0.15)] transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-ethiopia-earth-800 border border-ethiopia-earth-700 text-ethiopia-teff-300 font-mono uppercase text-[10px]">
                    {art.category}
                  </span>
                  <span className="flex items-center gap-1 text-ethiopia-earth-400">
                    <Clock className="w-3 h-3 text-ethiopia-clay-400" />
                    <span>{art.readTime} {t('culture.readTime')}</span>
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-ethiopia-linen serif-display group-hover:text-ethiopia-teff-300 transition-colors leading-snug">
                  {art.title[language]}
                </h3>

                <p className="text-xs text-ethiopia-earth-300 leading-relaxed line-clamp-4">
                  {art.leadParagraph[language]}
                </p>
              </div>

              <div className="pt-6 border-t border-ethiopia-earth-800/80 flex items-center justify-between text-xs font-semibold text-ethiopia-teff-400 group-hover:text-ethiopia-teff-200 transition-colors">
                <span>{t('culture.readArticle')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Scholarly Sources & Verification Box */}
        <div className="rounded-3xl bg-ethiopia-earth-900/50 border border-ethiopia-earth-700/60 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-ethiopia-teff-400">
              <ShieldCheck className="w-4 h-4 text-ethiopia-clay-400" />
              <span>{t('about.authenticityTitle')}</span>
            </div>
            <p className="text-xs text-ethiopia-earth-300 max-w-2xl leading-relaxed">
              {language === 'am'
                ? 'በዚህ ማህደር ውስጥ የተካተቱት መረጃዎች በታሪክ ተመራማሪዎች፣ በምግብ ሳይንስ ጥናቶችና በኢትዮጵያ ባህል አጥኚዎች የተረጋገጡ ናቸው።'
                : 'All historical, botanical, and fermentation insights are cross-referenced with accredited Ethiopian food science literature and ethnobotanical studies.'}
            </p>
          </div>
          <Link
            href="/about"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-ethiopia-earth-800 hover:bg-ethiopia-earth-700 border border-ethiopia-earth-600 text-xs font-bold text-ethiopia-linen transition-colors"
          >
            {t('culture.sourcesTitle')}
          </Link>
        </div>
      </div>
    </div>
  );
}
