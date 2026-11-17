'use client';

import React, { useState } from 'react';
import { stages } from '@/data/stages';
import { culturalArticles } from '@/data/cultural_articles';
import { regions } from '@/data/regions';
import { stories } from '@/data/stories';
import { quizQuestions } from '@/data/quiz';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { Settings, Database, CheckCircle, Search, Filter, Layers, BookOpen, MapPin, Sparkles, HelpCircle } from 'lucide-react';

export default function AdminDashboardPage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'stages' | 'articles' | 'regions' | 'stories' | 'quiz'>('stages');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-ethiopia-obsidian text-ethiopia-linen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ethiopia-earth-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-ethiopia-teff-500/20 border border-ethiopia-teff-500/40 text-xs font-mono font-bold text-ethiopia-teff-400">
                SYSTEM CMS
              </span>
              <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full ${
                isSupabaseConfigured
                  ? 'bg-ethiopia-mesob-green/20 text-ethiopia-mesob-green border border-ethiopia-mesob-green/40'
                  : 'bg-ethiopia-clay-500/20 text-ethiopia-clay-300 border border-ethiopia-clay-500/40'
              }`}>
                <CheckCircle className="w-3 h-3" />
                <span>{isSupabaseConfigured ? 'Supabase Connected' : 'Embedded Data Mode'}</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-ethiopia-linen serif-display mt-1">
              Cultural Knowledge Content Management
            </h1>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 bg-ethiopia-earth-900/80 p-1.5 rounded-2xl border border-ethiopia-earth-700/60 backdrop-blur-md">
          {[
            { id: 'stages', label: `Stages (${stages.length})`, icon: Layers },
            { id: 'articles', label: `Articles (${culturalArticles.length})`, icon: BookOpen },
            { id: 'regions', label: `Regions (${regions.length})`, icon: MapPin },
            { id: 'stories', label: `Stories (${stories.length})`, icon: Sparkles },
            { id: 'quiz', label: `Quiz (${quizQuestions.length})`, icon: HelpCircle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'stages' | 'articles' | 'regions' | 'stories' | 'quiz')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-ethiopia-teff-500 text-ethiopia-obsidian shadow-md'
                  : 'text-ethiopia-earth-300 hover:text-ethiopia-linen hover:bg-ethiopia-earth-800'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ethiopia-earth-400" />
          <input
            type="text"
            placeholder="Search records by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-ethiopia-earth-900 border border-ethiopia-earth-700 rounded-xl text-xs text-ethiopia-linen placeholder-ethiopia-earth-500 focus:outline-none focus:border-ethiopia-teff-500"
          />
        </div>

        {/* Content Table / List */}
        <div className="bg-ethiopia-earth-900/60 rounded-3xl border border-ethiopia-earth-700/80 overflow-hidden shadow-2xl">
          {activeTab === 'stages' && (
            <div className="divide-y divide-ethiopia-earth-800">
              {stages
                .filter((s) => s.title.en.toLowerCase().includes(searchQuery.toLowerCase()) || s.title.am.includes(searchQuery))
                .map((stage) => (
                  <div key={stage.id} className="p-5 flex items-center justify-between gap-4 hover:bg-ethiopia-earth-800/40 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-ethiopia-teff-400">
                          STAGE {stage.stageNumber}
                        </span>
                        <span className="text-xs font-bold text-ethiopia-linen">{stage.title[language]}</span>
                        <span className="text-[10px] bg-ethiopia-mesob-green/20 text-ethiopia-mesob-green border border-ethiopia-mesob-green/40 px-2 py-0.5 rounded-full font-mono">
                          PUBLISHED
                        </span>
                      </div>
                      <p className="text-xs text-ethiopia-earth-300 max-w-3xl truncate">
                        {stage.description[language]}
                      </p>
                    </div>
                    <div className="text-xs text-ethiopia-earth-400 font-mono shrink-0">
                      {stage.durationEstimate}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === 'articles' && (
            <div className="divide-y divide-ethiopia-earth-800">
              {culturalArticles
                .filter((a) => a.title.en.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((art) => (
                  <div key={art.id} className="p-5 flex items-center justify-between gap-4 hover:bg-ethiopia-earth-800/40 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase font-mono font-bold text-ethiopia-clay-400 bg-ethiopia-earth-800 px-2 py-0.5 rounded">
                          {art.category}
                        </span>
                        <span className="text-xs font-bold text-ethiopia-linen">{art.title[language]}</span>
                      </div>
                      <p className="text-xs text-ethiopia-earth-300 max-w-3xl truncate">
                        {art.leadParagraph[language]}
                      </p>
                    </div>
                    <div className="text-xs text-ethiopia-earth-400 font-mono shrink-0">
                      {art.readTime} min read
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === 'regions' && (
            <div className="divide-y divide-ethiopia-earth-800">
              {regions
                .filter((r) => r.name.en.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((reg) => (
                  <div key={reg.id} className="p-5 flex items-center justify-between gap-4 hover:bg-ethiopia-earth-800/40 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-ethiopia-linen">{reg.name[language]}</span>
                        <span className="text-xs text-ethiopia-earth-400">({reg.capital})</span>
                      </div>
                      <p className="text-xs text-ethiopia-earth-300 max-w-3xl truncate">
                        {reg.grainSpecialty[language]}
                      </p>
                    </div>
                    <div className="text-xs text-ethiopia-teff-400 font-mono shrink-0">
                      {reg.signatureDishes.length} dishes
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === 'stories' && (
            <div className="divide-y divide-ethiopia-earth-800">
              {stories
                .filter((st) => st.personName.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((story) => (
                  <div key={story.id} className="p-5 flex items-center justify-between gap-4 hover:bg-ethiopia-earth-800/40 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-ethiopia-linen">{story.personName}</span>
                        <span className="text-xs text-ethiopia-clay-400">({story.location})</span>
                      </div>
                      <p className="text-xs text-ethiopia-earth-300 max-w-3xl italic truncate">
                        “{story.quote[language]}”
                      </p>
                    </div>
                    <div className="text-xs text-ethiopia-earth-400 shrink-0">
                      {story.generation}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="divide-y divide-ethiopia-earth-800">
              {quizQuestions
                .filter((q) => q.question.en.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((q, i) => (
                  <div key={q.id} className="p-5 flex items-center justify-between gap-4 hover:bg-ethiopia-earth-800/40 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-ethiopia-teff-400">Q{i + 1}</span>
                        <span className="text-xs font-bold text-ethiopia-linen">{q.question[language]}</span>
                      </div>
                      <p className="text-xs text-ethiopia-earth-300 max-w-3xl truncate">
                        {q.explanation[language]}
                      </p>
                    </div>
                    <div className="text-xs text-ethiopia-earth-400 uppercase font-mono shrink-0">
                      {q.category}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
