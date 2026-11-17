'use client';

import React, { useState } from 'react';
import { regions } from '@/data/regions';
import { Region } from '@/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { MapPin, Sparkles, Utensils, Wheat, Compass } from 'lucide-react';
import { soundEngine } from '@/lib/audio/soundfx';

export default function ExploreMapPage() {
  const { t, language } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState<Region>(regions[0]);

  const handleSelectRegion = (r: Region) => {
    setSelectedRegion(r);
    soundEngine.playTizitaChime && soundEngine.playTizitaChime(2);
  };

  return (
    <div className="min-h-screen bg-ethiopia-obsidian text-ethiopia-linen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ethiopia-earth-900/90 border border-ethiopia-teff-500/30 text-xs text-ethiopia-teff-300 font-semibold">
            <Compass className="w-3.5 h-3.5 text-ethiopia-clay-400" />
            <span>{t('explore.title')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold serif-display text-ethiopia-linen">
            {language === 'am' ? 'የኢትዮጵያ የምግብና የእህል ባህል ካርታ' : 'Culinary Geography of Ethiopia'}
          </h1>
          <p className="text-xs sm:text-sm text-ethiopia-earth-300 leading-relaxed">
            {t('explore.subtitle')}
          </p>
        </div>

        {/* Map & Detail Dual Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive SVG Map of Ethiopia */}
          <div className="lg:col-span-7 bg-gradient-to-b from-ethiopia-earth-900/80 to-ethiopia-obsidian rounded-3xl border border-ethiopia-teff-500/30 p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-ethiopia-teff-300 font-medium mb-4">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-ethiopia-clay-400" />
                <span>{t('explore.selectPrompt')}</span>
              </span>
              <span className="font-mono text-[10px] text-ethiopia-earth-400">HORN OF AFRICA</span>
            </div>

            {/* SVG Map Canvas */}
            <div className="relative w-full aspect-[4/3] bg-ethiopia-obsidian/70 rounded-2xl border border-ethiopia-earth-800 flex items-center justify-center p-4">
              {/* Stylized Horn of Africa / Ethiopia Outline Path */}
              <svg viewBox="0 0 800 600" className="w-full h-full drop-shadow-2xl">
                <defs>
                  <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2E1D16" />
                    <stop offset="50%" stopColor="#3F271D" />
                    <stop offset="100%" stopColor="#1E140F" />
                  </linearGradient>
                </defs>

                {/* Ethiopia Boundary Contour */}
                <path
                  d="M 280,100 L 420,80 L 480,110 L 520,180 L 650,220 L 710,320 L 670,420 L 540,490 L 450,530 L 360,540 L 260,490 L 200,410 L 170,300 L 210,210 Z"
                  fill="url(#mapGradient)"
                  stroke="#C59334"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                  className="transition-all duration-300"
                />

                {/* Highland Topography Ridges */}
                <path
                  d="M 330,160 Q 400,240 370,340 Q 340,420 400,460"
                  fill="none"
                  stroke="#B85C38"
                  strokeWidth="3"
                  opacity="0.4"
                />

                {/* Regional Pins */}
                {regions.map((r) => {
                  const isSelected = selectedRegion.id === r.id;
                  const svgX = (r.coordinates.x / 100) * 800;
                  const svgY = (r.coordinates.y / 100) * 600;

                  return (
                    <g
                      key={r.id}
                      transform={`translate(${svgX}, ${svgY})`}
                      onClick={() => handleSelectRegion(r)}
                      className="cursor-pointer group"
                    >
                      {/* Pulsing ring for selected pin */}
                      {isSelected && (
                        <circle
                          r="22"
                          fill="none"
                          stroke="#C59334"
                          strokeWidth="2"
                          className="animate-ping origin-center opacity-75"
                        />
                      )}
                      <circle
                        r={isSelected ? "14" : "10"}
                        fill={isSelected ? "#B85C38" : "#231E1B"}
                        stroke={isSelected ? "#EFE2BA" : "#C59334"}
                        strokeWidth="2.5"
                        className="group-hover:scale-125 transition-transform"
                      />
                      <text
                        y="-18"
                        textAnchor="middle"
                        fill={isSelected ? "#FAF6EE" : "#C2B099"}
                        fontSize={isSelected ? "14" : "12"}
                        fontWeight={isSelected ? "bold" : "normal"}
                        fontFamily="sans-serif"
                        className="select-none pointer-events-none drop-shadow"
                      >
                        {r.name[language].split('(')[0].trim()}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Quick Regional Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {regions.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleSelectRegion(r)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedRegion.id === r.id
                      ? 'bg-ethiopia-teff-500 text-ethiopia-obsidian shadow-md'
                      : 'bg-ethiopia-earth-800 text-ethiopia-earth-300 hover:bg-ethiopia-earth-700'
                  }`}
                >
                  {r.name[language]}
                </button>
              ))}
            </div>
          </div>

          {/* Region Details Panel */}
          <div className="lg:col-span-5 bg-gradient-to-b from-ethiopia-earth-900 to-ethiopia-obsidian rounded-3xl border border-ethiopia-teff-500/30 p-6 sm:p-7 shadow-2xl space-y-6">
            <div className="space-y-1 border-b border-ethiopia-earth-800 pb-4">
              <span className="text-xs font-mono text-ethiopia-clay-400 uppercase tracking-wider">
                {selectedRegion.capital} • {selectedRegion.geography}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-ethiopia-linen serif-display">
                {selectedRegion.name[language]}
              </h3>
            </div>

            {/* Grain Specialty */}
            <div className="space-y-1.5 bg-ethiopia-earth-900/90 p-4 rounded-2xl border border-ethiopia-teff-500/20">
              <div className="flex items-center gap-2 text-xs font-bold text-ethiopia-teff-400">
                <Wheat className="w-4 h-4 text-ethiopia-clay-400" />
                <span>{t('explore.grainSpecialty')}</span>
              </div>
              <p className="text-xs text-ethiopia-earth-200 leading-relaxed">
                {selectedRegion.grainSpecialty[language]}
              </p>
            </div>

            {/* Injera Characteristics */}
            <div className="space-y-1.5 bg-ethiopia-earth-900/90 p-4 rounded-2xl border border-ethiopia-earth-700">
              <div className="flex items-center gap-2 text-xs font-bold text-ethiopia-teff-300">
                <Sparkles className="w-4 h-4 text-ethiopia-teff-400" />
                <span>{t('explore.injeraStyle')}</span>
              </div>
              <p className="text-xs text-ethiopia-earth-200 leading-relaxed">
                {selectedRegion.injeraCharacteristics[language]}
              </p>
            </div>

            {/* Paired Signature Dishes */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-ethiopia-teff-400">
                <Utensils className="w-4 h-4 text-ethiopia-clay-400" />
                <span>{t('explore.signatureDishes')}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedRegion.signatureDishes.map((dish, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-ethiopia-earth-900/60 border border-ethiopia-earth-800 text-xs space-y-0.5"
                  >
                    <div className="flex items-center justify-between font-bold text-ethiopia-linen">
                      <span>{dish.name}</span>
                      <span className="text-[10px] text-ethiopia-teff-400 fidel-font">{dish.amharic}</span>
                    </div>
                    <p className="text-[11px] text-ethiopia-earth-300 leading-tight">
                      {dish.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Heritage Spotlight */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-ethiopia-clay-950/60 to-transparent border-l-4 border-ethiopia-clay-500 text-xs text-ethiopia-earth-200 space-y-1">
              <span className="font-bold text-ethiopia-clay-300 block">{t('explore.tradition')}</span>
              <p className="leading-relaxed">{selectedRegion.traditionHighlight[language]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
