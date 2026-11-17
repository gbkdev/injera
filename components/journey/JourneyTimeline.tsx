'use client';

import React from 'react';
import { stages } from '@/data/stages';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Check } from 'lucide-react';
import { soundEngine } from '@/lib/audio/soundfx';

interface JourneyTimelineProps {
  currentStageNumber: number;
  onSelectStage: (stageNumber: number) => void;
  completedStages: number[];
}

export function JourneyTimeline({
  currentStageNumber,
  onSelectStage,
  completedStages,
}: JourneyTimelineProps) {
  const { language } = useLanguage();

  return (
    <div className="w-full py-3 px-2">
      {/* Desktop Horizontal Scroller */}
      <div className="hidden md:flex items-center justify-between relative max-w-5xl mx-auto">
        {/* Connecting Progress Track Line */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-ethiopia-earth-800 -z-0">
          <div
            className="h-full bg-gradient-to-r from-ethiopia-clay-500 via-ethiopia-teff-500 to-ethiopia-mesob-green transition-all duration-500"
            style={{
              width: `${((currentStageNumber - 1) / (stages.length - 1)) * 100}%`,
            }}
          />
        </div>

        {stages.map((stage) => {
          const isCurrent = stage.stageNumber === currentStageNumber;
          const isCompleted = completedStages.includes(stage.stageNumber);

          return (
            <button
              key={stage.id}
              onClick={() => {
                onSelectStage(stage.stageNumber);
                soundEngine.playTizitaChime && soundEngine.playTizitaChime(stage.stageNumber);
              }}
              className="relative z-10 flex flex-col items-center group focus:outline-none"
              title={stage.title[language]}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  isCurrent
                    ? 'bg-ethiopia-teff-500 text-ethiopia-obsidian scale-125 ring-4 ring-ethiopia-teff-500/30 shadow-[0_0_15px_rgba(197,147,52,0.6)] font-mono'
                    : isCompleted
                    ? 'bg-ethiopia-clay-600 text-ethiopia-linen hover:scale-110'
                    : 'bg-ethiopia-earth-900 border border-ethiopia-earth-700 text-ethiopia-earth-300 hover:border-ethiopia-teff-500/50'
                }`}
              >
                {isCompleted && !isCurrent ? (
                  <Check className="w-4 h-4 text-ethiopia-teff-300" />
                ) : (
                  <span>{stage.stageNumber < 10 ? `0${stage.stageNumber}` : stage.stageNumber}</span>
                )}
              </div>

              <span
                className={`mt-2 text-[10px] font-medium transition-colors max-w-[70px] truncate text-center ${
                  isCurrent
                    ? 'text-ethiopia-teff-300 font-bold'
                    : 'text-ethiopia-earth-400 group-hover:text-ethiopia-earth-200'
                }`}
              >
                {stage.title[language].split('—')[0].trim()}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile Horizontal Snap Carousel */}
      <div className="flex md:hidden items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x px-2">
        {stages.map((stage) => {
          const isCurrent = stage.stageNumber === currentStageNumber;
          const isCompleted = completedStages.includes(stage.stageNumber);

          return (
            <button
              key={stage.id}
              onClick={() => {
                onSelectStage(stage.stageNumber);
                soundEngine.playTizitaChime && soundEngine.playTizitaChime(stage.stageNumber);
              }}
              className={`snap-center shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all ${
                isCurrent
                  ? 'bg-ethiopia-teff-500 text-ethiopia-obsidian font-bold shadow-md'
                  : isCompleted
                  ? 'bg-ethiopia-clay-900/60 border border-ethiopia-clay-600 text-ethiopia-linen'
                  : 'bg-ethiopia-earth-900/80 border border-ethiopia-earth-800 text-ethiopia-earth-300'
              }`}
            >
              <span>{stage.stageNumber < 10 ? `0${stage.stageNumber}` : stage.stageNumber}</span>
              <span>{stage.title[language].split('—')[0].trim()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
