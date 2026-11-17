'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { culturalArticles } from '@/data/cultural_articles';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import Link from 'next/link';
import { ArrowLeft, Clock, BookOpen, Quote, ShieldCheck } from 'lucide-react';
import { soundEngine } from '@/lib/audio/soundfx';

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const slug = params?.slug as string;

  const article = culturalArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-ethiopia-obsidian text-ethiopia-linen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
        <Link
          href="/culture"
          className="px-4 py-2 rounded-xl bg-ethiopia-teff-500 text-ethiopia-obsidian font-bold text-xs"
        >
          Return to Culture Archive
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-ethiopia-obsidian text-ethiopia-linen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <button
          onClick={() => {
            router.push('/culture');
            soundEngine.playTizitaChime && soundEngine.playTizitaChime(0);
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-ethiopia-earth-300 hover:text-ethiopia-teff-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cultural Encyclopedia</span>
        </button>

        {/* Article Header */}
        <header className="space-y-4 border-b border-ethiopia-earth-800 pb-8">
          <div className="flex items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-ethiopia-teff-500/20 border border-ethiopia-teff-500/40 text-ethiopia-teff-300 font-mono uppercase text-[11px]">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-ethiopia-earth-400">
              <Clock className="w-3.5 h-3.5 text-ethiopia-clay-400" />
              <span>{article.readTime} min read</span>
            </span>
            <span className="text-ethiopia-earth-500">•</span>
            <span className="text-ethiopia-earth-400">{article.author}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold serif-display text-ethiopia-linen leading-tight">
            {article.title[language]}
          </h1>

          <p className="text-sm sm:text-base text-ethiopia-teff-200/90 leading-relaxed font-serif italic bg-ethiopia-earth-900/60 p-5 rounded-2xl border-l-4 border-ethiopia-clay-500">
            {article.leadParagraph[language]}
          </p>
        </header>

        {/* Article Sections */}
        <div className="space-y-8 text-sm sm:text-base text-ethiopia-earth-200 leading-relaxed">
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-ethiopia-linen serif-display">
                {section.heading[language]}
              </h2>
              <p className="text-ethiopia-earth-200/90 leading-relaxed">{section.content[language]}</p>

              {section.quote && (
                <blockquote className="my-6 p-5 rounded-2xl bg-gradient-to-r from-ethiopia-earth-900 to-transparent border border-ethiopia-teff-500/30 text-xs sm:text-sm space-y-2">
                  <div className="flex items-center gap-2 text-ethiopia-teff-400 font-bold">
                    <Quote className="w-4 h-4 text-ethiopia-clay-400" />
                    <span>Historical Testimony</span>
                  </div>
                  <p className="italic text-ethiopia-linen">“{section.quote.text}”</p>
                  <p className="text-[11px] text-ethiopia-earth-400">— {section.quote.source}</p>
                </blockquote>
              )}
            </section>
          ))}
        </div>

        {/* Sourced Literature & Citations */}
        {article.sources && article.sources.length > 0 && (
          <footer className="mt-12 pt-8 border-t border-ethiopia-earth-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-ethiopia-teff-400">
              <ShieldCheck className="w-4 h-4 text-ethiopia-clay-400" />
              <span>Referenced Research Literature</span>
            </div>
            <ul className="space-y-2 text-xs text-ethiopia-earth-300">
              {article.sources.map((src, i) => (
                <li key={i} className="flex items-start gap-2 bg-ethiopia-earth-900/60 p-3 rounded-xl border border-ethiopia-earth-800">
                  <BookOpen className="w-4 h-4 text-ethiopia-clay-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-ethiopia-linen">{src.title}</span>
                    <span className="text-ethiopia-earth-400"> — {src.authorOrInstitution} {src.year ? `(${src.year})` : ''}</span>
                  </div>
                </li>
              ))}
            </ul>
          </footer>
        )}
      </div>
    </article>
  );
}
