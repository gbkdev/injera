'use client';

import React from 'react';
import { Stage } from '@/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { CanvasWrapper } from '../3d/CanvasWrapper';
import { TeffPlantViewer } from '../3d/TeffPlantViewer';
import { PreparationScene } from '../3d/PreparationScene';
import { MixingBowlScene } from '../3d/MixingBowlScene';
import { FermentationVesselScene } from '../3d/FermentationVesselScene';
import { AbsitCookingScene } from '../3d/AbsitCookingScene';
import { MitadViewerScene } from '../3d/MitadViewerScene';
import { PouringSpiralScene } from '../3d/PouringSpiralScene';
import { CookingAynScene } from '../3d/CookingAynScene';
import { InjeraRemovalScene } from '../3d/InjeraRemovalScene';
import { MesobFeastScene } from '../3d/MesobFeastScene';
import { utensils } from '@/data/utensils';
import { Sparkles, FlaskConical, Heart, Utensils, Lightbulb, Clock } from 'lucide-react';

interface StageViewerProps {
  stage: Stage;
}

export function StageViewer({ stage }: StageViewerProps) {
  const { language, t } = useLanguage();

  const render3DScene = () => {
    switch (stage.stageNumber) {
      case 1:
        return <TeffPlantViewer />;
      case 2:
        return <PreparationScene />;
      case 3:
        return <MixingBowlScene />;
      case 4:
        return <FermentationVesselScene />;
      case 5:
        return <AbsitCookingScene />;
      case 6:
        return <MitadViewerScene />;
      case 7:
        return <PouringSpiralScene />;
      case 8:
        return <CookingAynScene />;
      case 9:
        return <InjeraRemovalScene />;
      case 10:
        return <MesobFeastScene />;
      default:
        return <TeffPlantViewer />;
    }
  };

  const stageUtensils = utensils.filter((u) => stage.tools.includes(u.id));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto">
      {/* Left / Top: 3D Interactive Canvas */}
      <div className="lg:col-span-7 flex flex-col gap-3">
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-ethiopia-teff-500/30">
          <CanvasWrapper
            fallbackTitle={stage.title[language]}
            fallbackSubtitle={stage.subtitle[language]}
            stageNumber={stage.stageNumber}
            className="w-full h-full"
          >
            {render3DScene()}
          </CanvasWrapper>

          {/* Interactive Hint Ribbon */}
          <div className="absolute top-3 left-3 bg-ethiopia-obsidian/85 backdrop-blur-md px-3 py-1 rounded-full border border-ethiopia-teff-500/30 text-[10px] text-ethiopia-teff-300 flex items-center gap-1.5 pointer-events-none">
            <Sparkles className="w-3 h-3 text-ethiopia-clay-400" />
            <span>{t('journey.interactiveHint')}</span>
          </div>
        </div>

        {/* Traditional Utensils Strip */}
        {stageUtensils.length > 0 && (
          <div className="bg-ethiopia-earth-900/60 border border-ethiopia-earth-700/50 rounded-2xl p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-ethiopia-teff-400 mb-2">
              <Utensils className="w-3.5 h-3.5 text-ethiopia-clay-400" />
              <span>{t('journey.toolsUsed')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {stageUtensils.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-ethiopia-earth-900 border border-ethiopia-earth-700/80 text-xs"
                >
                  <span className="font-bold text-ethiopia-teff-300">{u.name[language]}</span>
                  <span className="text-[10px] text-ethiopia-earth-400">({u.materials.join(', ')})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right / Bottom: Deep Educational & Cultural Documentation */}
      <div className="lg:col-span-5 flex flex-col gap-5">
        {/* Header Block */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-ethiopia-teff-500/20 border border-ethiopia-teff-500/40 text-xs font-mono font-bold text-ethiopia-teff-400">
              STAGE {stage.stageNumber < 10 ? `0${stage.stageNumber}` : stage.stageNumber}
            </span>
            <span className="flex items-center gap-1 text-xs text-ethiopia-earth-300 bg-ethiopia-earth-900/80 px-2.5 py-1 rounded-full border border-ethiopia-earth-800">
              <Clock className="w-3 h-3 text-ethiopia-clay-400" />
              <span>{stage.durationEstimate}</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-ethiopia-linen serif-display leading-tight">
            {stage.title[language]}
          </h2>
          <p className="text-xs sm:text-sm text-ethiopia-teff-300/90 leading-relaxed font-medium">
            {stage.subtitle[language]}
          </p>
        </div>

        {/* Narrative Description */}
        <div className="text-xs sm:text-sm text-ethiopia-earth-200 leading-relaxed space-y-3 bg-ethiopia-earth-900/40 p-4 rounded-2xl border border-ethiopia-earth-800/80">
          <p>{stage.description[language]}</p>
        </div>

        {/* Scientific & Cultural Insights Dual Cards */}
        <div className="grid grid-cols-1 gap-3">
          {/* Science Insight */}
          <div className="bg-gradient-to-br from-ethiopia-earth-900/90 to-ethiopia-earth-900/50 p-4 rounded-2xl border border-ethiopia-teff-500/30 space-y-1.5 shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold text-ethiopia-teff-400">
              <FlaskConical className="w-4 h-4 text-ethiopia-clay-400" />
              <span>{t('journey.scienceInsight')}</span>
            </div>
            <p className="text-xs text-ethiopia-earth-200 leading-relaxed">
              {stage.scientificInsight[language]}
            </p>
          </div>

          {/* Cultural Insight */}
          <div className="bg-gradient-to-br from-ethiopia-clay-950/60 to-ethiopia-earth-900/60 p-4 rounded-2xl border border-ethiopia-clay-500/30 space-y-1.5 shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold text-ethiopia-clay-300">
              <Heart className="w-4 h-4 text-ethiopia-clay-400" />
              <span>{t('journey.culturalInsight')}</span>
            </div>
            <p className="text-xs text-ethiopia-earth-200 leading-relaxed">
              {stage.culturalInsight[language]}
            </p>
          </div>
        </div>

        {/* Elder's Wisdom Tips */}
        {stage.tips[language] && stage.tips[language].length > 0 && (
          <div className="bg-ethiopia-earth-900/60 p-3.5 rounded-2xl border border-ethiopia-earth-700/60 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-ethiopia-teff-400">
              <Lightbulb className="w-3.5 h-3.5 text-ethiopia-teff-400" />
              <span>{t('journey.tipsTitle')}</span>
            </div>
            <ul className="space-y-1.5">
              {stage.tips[language].map((tip, idx) => (
                <li key={idx} className="text-xs text-ethiopia-earth-300 flex items-start gap-2">
                  <span className="text-ethiopia-clay-400 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Traditional Proverb if present */}
        {stage.proverbs && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-ethiopia-teff-500/10 via-ethiopia-earth-900/80 to-transparent border-l-4 border-ethiopia-teff-500 text-xs space-y-1">
            <p className="font-bold text-ethiopia-teff-300 fidel-font">{stage.proverbs.amharic}</p>
            <p className="text-[11px] text-ethiopia-earth-400 italic font-mono">{stage.proverbs.transliteration}</p>
            <p className="text-xs text-ethiopia-earth-200">“{stage.proverbs.meaning}”</p>
          </div>
        )}
      </div>
    </div>
  );
}
