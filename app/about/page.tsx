'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { ShieldCheck, BookOpen, Cpu, Heart, ExternalLink, Globe } from 'lucide-react';

export default function AboutPage() {
  const { t, language } = useLanguage();

  const literatureSources = [
    {
      title: 'Feast and Fasts: A History of Food in Ethiopia',
      author: 'James C. McCann',
      institution: 'Ohio University Press (2010)',
      description: 'Comprehensive historical investigation into agricultural origins, fermentation, and royal dining rituals.',
    },
    {
      title: 'Microbial Dynamics During Traditional Teff Injera Fermentation',
      author: 'Mogessie Ashenafi',
      institution: 'Journal of Food Science and Technology (1994)',
      description: 'Foundational scientific paper documenting lactic acid bacteria and yeast species succession in Ersho starters.',
    },
    {
      title: 'Teff: Chemistry and Technology',
      author: 'G. Bultosa & J.R.N. Taylor',
      institution: 'AACC International (2004)',
      description: 'Definitive chemical analysis of Eragrostis tef starches, gelatinization kinetics, and absit gel mechanics.',
    },
    {
      title: 'Lost Crops of Africa: Volume I: Grains',
      author: 'Board on Science and Technology for International Development',
      institution: 'National Academy Press, Washington D.C. (1996)',
      description: 'Documenting the nutritional and ecological resilience of indigenous African cereals.',
    },
  ];

  return (
    <div className="min-h-screen bg-ethiopia-obsidian text-ethiopia-linen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ethiopia-earth-900/90 border border-ethiopia-teff-500/30 text-xs text-ethiopia-teff-300 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-ethiopia-clay-400" />
            <span>{t('about.title')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold serif-display text-ethiopia-linen">
            {language === 'am' ? 'የባህል ትክክለኛነትና የታሪክ ምንጮች' : 'Methodology & Cultural Sources'}
          </h1>
          <p className="text-xs sm:text-sm text-ethiopia-earth-300 leading-relaxed">
            {t('about.statement')}
          </p>
        </div>

        {/* 1. Commitment to Authenticity */}
        <section className="bg-gradient-to-b from-ethiopia-earth-900/90 to-ethiopia-obsidian rounded-3xl border border-ethiopia-teff-500/30 p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-base sm:text-lg font-bold text-ethiopia-teff-400">
            <Heart className="w-5 h-5 text-ethiopia-clay-400" />
            <h2>{t('about.authenticityTitle')}</h2>
          </div>
          <div className="text-xs sm:text-sm text-ethiopia-earth-200 leading-relaxed space-y-3">
            <p>
              Injera is not merely a bread; it is a sacred culinary institution cultivated across three millennia of Ethiopian highland civilization.
            </p>
            <p>
              This digital museum honors this heritage by strictly adhering to ethnobotanical facts, verified scientific microbiology, and respected oral culinary traditions. We explicitly recognize that while principles of teff cultivation, ersho starter fermentation, absit preparation, and mitad baking remain foundational, household and regional nuances enrich the culture without rigid dogma.
            </p>
          </div>
        </section>

        {/* 2. Referenced Research Bibliography */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-bold text-ethiopia-linen serif-display">
            <BookOpen className="w-5 h-5 text-ethiopia-teff-400" />
            <h2>{t('about.sourcesListTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {literatureSources.map((src, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-ethiopia-earth-900/80 border border-ethiopia-earth-700/80 space-y-1.5 shadow-md"
              >
                <h3 className="text-sm font-bold text-ethiopia-teff-300">{src.title}</h3>
                <div className="text-xs text-ethiopia-earth-400 font-medium">
                  {src.author} — <span className="text-ethiopia-clay-400">{src.institution}</span>
                </div>
                <p className="text-xs text-ethiopia-earth-300 leading-relaxed pt-1">
                  {src.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Tech Stack Architecture */}
        <section className="bg-ethiopia-earth-900/60 rounded-3xl border border-ethiopia-earth-800 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-base font-bold text-ethiopia-teff-400">
            <Cpu className="w-5 h-5 text-ethiopia-clay-400" />
            <h2>{t('about.techStackTitle')}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-ethiopia-obsidian border border-ethiopia-earth-800">
              <span className="font-bold text-ethiopia-linen block mb-0.5">Next.js 15+</span>
              <span className="text-[11px] text-ethiopia-earth-400">App Router & Server Comp.</span>
            </div>
            <div className="p-3 rounded-xl bg-ethiopia-obsidian border border-ethiopia-earth-800">
              <span className="font-bold text-ethiopia-linen block mb-0.5">Three.js / R3F</span>
              <span className="text-[11px] text-ethiopia-earth-400">WebGL 3D Engine & Shaders</span>
            </div>
            <div className="p-3 rounded-xl bg-ethiopia-obsidian border border-ethiopia-earth-800">
              <span className="font-bold text-ethiopia-linen block mb-0.5">Web Audio API</span>
              <span className="text-[11px] text-ethiopia-earth-400">Harmonic Synthesis</span>
            </div>
            <div className="p-3 rounded-xl bg-ethiopia-obsidian border border-ethiopia-earth-800">
              <span className="font-bold text-ethiopia-linen block mb-0.5">Supabase PG</span>
              <span className="text-[11px] text-ethiopia-earth-400">Offline-Fallback Layer</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
