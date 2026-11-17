'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Heart, Sparkles, Compass, BookOpen, ShieldCheck, MapPin } from 'lucide-react';

export function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="relative bg-ethiopia-obsidian border-t border-ethiopia-teff-500/20 text-ethiopia-earth-300 pt-16 pb-12 overflow-hidden">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-ethiopia-clay-500 via-ethiopia-teff-500 to-ethiopia-mesob-green opacity-80"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand & Cultural Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-ethiopia-clay-500 to-ethiopia-teff-500 flex items-center justify-center">
                <span className="text-ethiopia-obsidian font-bold text-xs">ጤ</span>
              </div>
              <span className="text-xl font-bold tracking-wider text-ethiopia-linen serif-display">
                {language === 'am' ? 'እንጀራ — የሕይወት ቅርስ' : 'INJERA — Teff to Table'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-ethiopia-earth-300 leading-relaxed max-w-lg">
              {t('footer.culturalQuote')}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ethiopia-earth-900/60 border border-ethiopia-teff-500/30 text-[11px] text-ethiopia-teff-300">
              <Sparkles className="w-3 h-3 text-ethiopia-clay-400" />
              <span>{language === 'am' ? 'ባህላዊ የምግብ ጥበብ ዲጂታል ማህደር' : 'Digital Cultural Heritage Experience'}</span>
            </div>
          </div>

          {/* Experience Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ethiopia-teff-400">
              {language === 'am' ? 'የልምምድ ክፍሎች' : 'Experiences'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/journey" className="hover:text-ethiopia-teff-300 transition-colors flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-ethiopia-clay-400" />
                  <span>{t('nav.journey')}</span>
                </Link>
              </li>
              <li>
                <Link href="/make-injera" className="hover:text-ethiopia-teff-300 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-ethiopia-clay-400" />
                  <span>{t('nav.makeInjera')}</span>
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-ethiopia-teff-300 transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-ethiopia-clay-400" />
                  <span>{t('nav.explore')}</span>
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-ethiopia-teff-300 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-ethiopia-clay-400" />
                  <span>{t('nav.learn')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Cultural Documentation & Sources */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ethiopia-teff-400">
              {language === 'am' ? 'ባህልና ታሪክ' : 'Knowledge & Sources'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/culture" className="hover:text-ethiopia-teff-300 transition-colors">
                  {language === 'am' ? 'የጤፍና የእርሾ ጥናት' : 'Teff Agronomy & Fermentation'}
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-ethiopia-teff-300 transition-colors">
                  {language === 'am' ? 'የአርሶ አደሮች ታሪክ' : 'Oral Kitchen Histories'}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-ethiopia-teff-300 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-ethiopia-clay-400" />
                  <span>{t('nav.about')}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Attribution & Respectful Statement */}
        <div className="border-t border-ethiopia-earth-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ethiopia-earth-400">
          <p className="flex items-center gap-1.5 text-center sm:text-left">
            <span>{t('footer.rights')}</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-ethiopia-clay-300">
              Crafted with <Heart className="w-3 h-3 text-ethiopia-clay-500 fill-ethiopia-clay-500" /> for Ethiopian Heritage
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
