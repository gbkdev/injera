'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { CanvasWrapper } from '@/components/3d/CanvasWrapper';
import { stages } from '@/data/stages';
import { culturalArticles } from '@/data/cultural_articles';
import { regions } from '@/data/regions';
import { soundEngine } from '@/lib/audio/soundfx';

const HeroKitchenScene = dynamic(
  () => import('@/components/3d/HeroKitchenScene').then((m) => m.HeroKitchenScene),
  { ssr: false }
);
import {
  Compass,
  Sparkles,
  BookOpen,
  ArrowRight,
  Flame,
  Wheat,
  Clock,
  Heart,
  ChevronDown,
  ShieldCheck
} from 'lucide-react';

export default function HomePage() {
  const { t, language } = useLanguage();

  return (
    <main className="min-h-screen bg-ethiopia-obsidian text-ethiopia-linen overflow-hidden">
      {/* 1. Full-Screen Cinematic 3D Hero */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8">
        {/* Background 3D Canvas */}
        <div className="absolute inset-0 z-0 opacity-85">
          <CanvasWrapper
            fallbackTitle="INJERA — Ethiopian Hearth"
            fallbackSubtitle="The Journey from Teff to Table"
            cameraPosition={[0, 1.8, 4.8]}
            className="w-full h-full"
          >
            <HeroKitchenScene />
          </CanvasWrapper>
        </div>

        {/* Gradient Vignette Overlays for Maximum Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-ethiopia-obsidian via-transparent to-ethiopia-obsidian/60 pointer-events-none z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-ethiopia-obsidian/80 via-transparent to-ethiopia-obsidian/80 pointer-events-none z-10"></div>

        {/* Hero Foreground Content */}
        <div className="relative z-20 max-w-4xl mx-auto text-center space-y-6 pointer-events-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ethiopia-earth-900/90 border border-ethiopia-teff-500/40 text-xs text-ethiopia-teff-300 font-semibold shadow-[0_0_20px_rgba(197,147,52,0.25)] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-ethiopia-clay-400" />
            <span>{language === 'am' ? 'ባለ 3D የኢትዮጵያ ባህልና ሳይንስ ማህደር' : 'Immersive 3D Cultural Museum & Science Archive'}</span>
          </div>

          {/* Titles */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black serif-display tracking-tight text-glow-gold">
              {language === 'am' ? 'እንጀራ' : 'INJERA'}
            </h1>
            <p className="text-xl sm:text-2xl font-light text-ethiopia-teff-300 serif-display italic">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-base text-ethiopia-earth-200/90 max-w-2xl mx-auto leading-relaxed font-normal">
            {t('hero.description')}
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/journey"
              onClick={() => soundEngine.playTizitaChime && soundEngine.playTizitaChime(1)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-ethiopia-clay-500 via-ethiopia-teff-500 to-ethiopia-teff-600 text-ethiopia-obsidian font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(197,147,52,0.4)] hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-ethiopia-obsidian" />
              <span>{t('hero.beginCta')}</span>
            </Link>

            <Link
              href="/make-injera"
              onClick={() => soundEngine.playTizitaChime && soundEngine.playTizitaChime(2)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-ethiopia-earth-900/90 hover:bg-ethiopia-earth-800 border border-ethiopia-teff-500/40 text-ethiopia-linen font-bold text-xs sm:text-sm backdrop-blur-md transition-all flex items-center justify-center gap-2 hover:border-ethiopia-teff-400"
            >
              <Flame className="w-4 h-4 text-ethiopia-clay-400" />
              <span>{t('hero.simulationCta')}</span>
            </Link>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-3xl mx-auto">
            {[
              t('hero.featureStats.stages', '10 Interactive Stages'),
              t('hero.featureStats.history', '3,000+ Years Cultivated'),
              t('hero.featureStats.glutenFree', '100% Naturally Gluten-Free'),
              t('hero.featureStats.communal', 'One Plate, Shared Hands'),
            ].map((stat, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-ethiopia-obsidian/80 border border-ethiopia-earth-800 text-[11px] font-medium text-ethiopia-earth-300 backdrop-blur-sm"
              >
                {stat}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-[10px] text-ethiopia-earth-400 uppercase tracking-widest pointer-events-none animate-bounce">
          <span>{t('hero.scrollPrompt')}</span>
          <ChevronDown className="w-4 h-4 text-ethiopia-teff-400" />
        </div>
      </section>

      {/* 2. The 10-Stage Journey Teaser */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-ethiopia-earth-800 pb-6">
          <div>
            <span className="text-xs font-mono text-ethiopia-clay-400 uppercase tracking-widest">
              STEP-BY-STEP TRANSFORMATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold serif-display text-ethiopia-linen mt-1">
              {language === 'am' ? '10ሩ የእንጀራ አዘገጃጀት ቅዱስ ደረጃዎች' : 'The 10-Stage Sacred Journey'}
            </h2>
          </div>
          <Link
            href="/journey"
            className="inline-flex items-center gap-2 text-xs font-bold text-ethiopia-teff-400 hover:text-ethiopia-teff-200 transition-colors"
          >
            <span>{language === 'am' ? 'ሁሉንም ደረጃዎች በ3D ተመልከት' : 'Experience All 10 in 3D'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Stage Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stages.map((st) => (
            <Link
              key={st.id}
              href={`/journey?stage=${st.stageNumber < 10 ? `0${st.stageNumber}` : st.stageNumber}`}
              onClick={() => soundEngine.playTizitaChime && soundEngine.playTizitaChime(st.stageNumber)}
              className="group p-5 rounded-3xl bg-gradient-to-b from-ethiopia-earth-900/90 to-ethiopia-obsidian border border-ethiopia-earth-700/80 hover:border-ethiopia-teff-500/60 transition-all duration-300 flex flex-col justify-between space-y-4 hover:shadow-[0_0_20px_rgba(197,147,52,0.15)]"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black font-mono text-ethiopia-teff-500/40 group-hover:text-ethiopia-teff-400 transition-colors">
                    {st.stageNumber < 10 ? `0${st.stageNumber}` : st.stageNumber}
                  </span>
                  <span className="text-[10px] text-ethiopia-earth-400 bg-ethiopia-earth-800 px-2 py-0.5 rounded-full font-mono">
                    {st.durationEstimate.split(' ')[0]}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-ethiopia-linen serif-display group-hover:text-ethiopia-teff-300 transition-colors">
                  {st.title[language]}
                </h3>
                <p className="text-[11px] text-ethiopia-earth-300 line-clamp-3 leading-relaxed">
                  {st.summary[language]}
                </p>
              </div>

              <div className="pt-2 border-t border-ethiopia-earth-800/80 flex items-center justify-between text-[10px] font-bold text-ethiopia-teff-400">
                <span>Explore 3D</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. The Teff Supergrain Spotlight */}
      <section className="py-16 bg-gradient-to-r from-ethiopia-earth-950 via-ethiopia-earth-900 to-ethiopia-earth-950 border-y border-ethiopia-teff-500/20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ethiopia-teff-500/20 border border-ethiopia-teff-500/40 text-xs text-ethiopia-teff-300 font-semibold">
              <Wheat className="w-3.5 h-3.5 text-ethiopia-clay-400" />
              <span>Eragrostis tef</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold serif-display text-ethiopia-linen">
              {language === 'am' ? 'ከመርፌ ራስ የማትበልጥ የታሪክ ቅርስ' : 'A Grain Smaller Than a Pinhead'}
            </h2>
            <p className="text-xs sm:text-sm text-ethiopia-earth-200 leading-relaxed">
              {language === 'am'
                ? 'ጤፍ የኢትዮጵያ ከፍተኛ ቦታዎች ስጦታ ሲሆን፤ ከ3,000 ዓመታት በላይ በግብርና ሲለማ ቆይቷል። 150 የጤፍ ቅንጣቶች ከአንዲት የስንዴ ቅንጣት ጋር እኩል ይመዝናሉ፤ ነገር ግን በብረት፣ ካልሲየምና ፕሮቲን የበለጸገ ነው።'
                : 'Cultivated in the volcanic Ethiopian highlands for over three millennia, teff is naturally 100% gluten-free, packed with slow-digesting complex carbohydrates, prebiotic fiber, calcium, and bio-available iron.'}
            </p>
            <div className="pt-2">
              <Link
                href="/culture/ancient-grain-of-the-horn"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ethiopia-earth-800 hover:bg-ethiopia-earth-700 border border-ethiopia-teff-500/30 text-xs font-bold text-ethiopia-teff-300 transition-colors"
              >
                <span>Read Teff Agronomy Paper</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-6 grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-ethiopia-obsidian border border-ethiopia-earth-800 space-y-1">
              <span className="text-3xl font-black text-ethiopia-teff-400 font-mono">150:1</span>
              <h4 className="text-xs font-bold text-ethiopia-linen">Weight to Wheat Ratio</h4>
              <p className="text-[11px] text-ethiopia-earth-400">Diminutive size, immense nutrient density.</p>
            </div>
            <div className="p-5 rounded-2xl bg-ethiopia-obsidian border border-ethiopia-earth-800 space-y-1">
              <span className="text-3xl font-black text-ethiopia-clay-400 font-mono">3,000+</span>
              <h4 className="text-xs font-bold text-ethiopia-linen">Years Cultivated</h4>
              <p className="text-[11px] text-ethiopia-earth-400">Ancestral highland domesticated heritage.</p>
            </div>
            <div className="p-5 rounded-2xl bg-ethiopia-obsidian border border-ethiopia-earth-800 space-y-1">
              <span className="text-3xl font-black text-ethiopia-mesob-green font-mono">100%</span>
              <h4 className="text-xs font-bold text-ethiopia-linen">Gluten-Free</h4>
              <p className="text-[11px] text-ethiopia-earth-400">Bound through natural starch absit cooking.</p>
            </div>
            <div className="p-5 rounded-2xl bg-ethiopia-obsidian border border-ethiopia-earth-800 space-y-1">
              <span className="text-3xl font-black text-ethiopia-teff-300 font-mono">pH 3.8</span>
              <h4 className="text-xs font-bold text-ethiopia-linen">Wild Sourdough Tang</h4>
              <p className="text-[11px] text-ethiopia-earth-400">Lactic acid bacteria & yeast ecology.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Cultural Deep Dives Teaser */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-ethiopia-clay-400 uppercase tracking-widest">
            DIGITAL SCHOLARLY ARCHIVE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold serif-display text-ethiopia-linen">
            {t('culture.title')}
          </h2>
          <p className="text-xs sm:text-sm text-ethiopia-earth-300">
            {t('culture.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {culturalArticles.map((art) => (
            <Link
              key={art.id}
              href={`/culture/${art.slug}`}
              className="p-6 rounded-3xl bg-gradient-to-b from-ethiopia-earth-900 to-ethiopia-obsidian border border-ethiopia-earth-700/80 hover:border-ethiopia-teff-500/60 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-mono bg-ethiopia-earth-800 text-ethiopia-teff-400 px-2.5 py-1 rounded-full">
                  {art.category}
                </span>
                <h3 className="text-lg font-bold text-ethiopia-linen serif-display">
                  {art.title[language]}
                </h3>
                <p className="text-xs text-ethiopia-earth-300 line-clamp-3 leading-relaxed">
                  {art.leadParagraph[language]}
                </p>
              </div>

              <div className="pt-4 border-t border-ethiopia-earth-800 flex items-center justify-between text-xs font-semibold text-ethiopia-teff-400">
                <span>{t('culture.readArticle')}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Communal Invitation & Quote */}
      <section className="py-20 bg-gradient-to-b from-transparent via-ethiopia-earth-950 to-ethiopia-obsidian text-center px-4 sm:px-6 lg:px-8 border-t border-ethiopia-earth-800/80">
        <div className="max-w-3xl mx-auto space-y-6">
          <Heart className="w-10 h-10 text-ethiopia-clay-400 mx-auto animate-pulse" />
          <h2 className="text-3xl sm:text-4xl font-extrabold serif-display text-ethiopia-linen leading-snug">
            “From a tiny grain to a shared table.<br />Injera is the rhythm of family, patience, and love.”
          </h2>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              href="/journey"
              className="px-7 py-3 rounded-2xl bg-gradient-to-r from-ethiopia-clay-500 to-ethiopia-teff-500 text-ethiopia-linen font-bold text-xs shadow-xl hover:scale-105 transition-transform"
            >
              {t('hero.beginCta')}
            </Link>
            <Link
              href="/explore"
              className="px-7 py-3 rounded-2xl bg-ethiopia-earth-900 border border-ethiopia-teff-500/30 text-ethiopia-teff-300 font-bold text-xs hover:bg-ethiopia-earth-800 transition-colors"
            >
              {t('nav.explore')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
