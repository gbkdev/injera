'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { stages } from '@/data/stages';
import { JourneyTimeline } from '@/components/journey/JourneyTimeline';
import { StageNavigation } from '@/components/journey/StageNavigation';
import { loadUserProgress, markStageCompleted } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy } from 'lucide-react';

const StageViewer = dynamic(
  () => import('@/components/journey/StageViewer').then((m) => m.StageViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[450px] rounded-3xl bg-ethiopia-earth-900/60 border border-ethiopia-earth-800 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-ethiopia-teff-400">
          <div className="w-8 h-8 border-2 border-ethiopia-teff-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs uppercase font-mono tracking-widest text-ethiopia-earth-300">
            Preparing 3D Stage...
          </span>
        </div>
      </div>
    ),
  }
);

function JourneyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t, language } = useLanguage();

  const [currentStageNumber, setCurrentStageNumber] = useState<number>(1);
  const [completedStages, setCompletedStages] = useState<number[]>([1]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  useEffect(() => {
    const progress = loadUserProgress();
    setCompletedStages(progress.completedStages);

    const stageParam = searchParams.get('stage');
    if (stageParam) {
      const num = parseInt(stageParam, 10);
      if (!isNaN(num) && num >= 1 && num <= stages.length) {
        setCurrentStageNumber(num);
        return;
      }
    }
    setCurrentStageNumber(progress.currentStage || 1);
  }, [searchParams]);

  const handleSelectStage = (num: number) => {
    setCurrentStageNumber(num);
    const updated = markStageCompleted(num);
    setCompletedStages(updated.completedStages);
    router.replace(`/journey?stage=${num < 10 ? `0${num}` : num}`, { scroll: false });
  };

  const handleNext = () => {
    if (currentStageNumber < stages.length) {
      handleSelectStage(currentStageNumber + 1);
    }
  };

  const handlePrev = () => {
    if (currentStageNumber > 1) {
      handleSelectStage(currentStageNumber - 1);
    }
  };

  const handleFinish = () => {
    markStageCompleted(10);
    setShowCompletionModal(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C59334', '#B85C38', '#9E2A2B', '#2D5A27'],
      });
    } catch {
      // ignore
    }
  };

  const currentStage = stages.find((s) => s.stageNumber === currentStageNumber) || stages[0];

  return (
    <div className="min-h-screen bg-ethiopia-obsidian text-ethiopia-linen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ethiopia-earth-900/90 border border-ethiopia-teff-500/30 text-xs text-ethiopia-teff-300 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-ethiopia-clay-400" />
            <span>{t('journey.title')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold serif-display text-ethiopia-linen">
            {language === 'am' ? 'ከጤፍ እሸት እስከ መሶብ ማዕድ' : 'From Teff to the Communal Table'}
          </h1>
        </div>

        {/* Timeline Bar */}
        <div className="bg-ethiopia-earth-900/80 border border-ethiopia-teff-500/20 rounded-2xl p-2 backdrop-blur-md shadow-xl">
          <JourneyTimeline
            currentStageNumber={currentStageNumber}
            onSelectStage={handleSelectStage}
            completedStages={completedStages}
          />
        </div>

        {/* Main Stage Interactive 3D & Content View */}
        <StageViewer stage={currentStage} />

        {/* Bottom Nav Controller */}
        <div className="border-t border-ethiopia-earth-800/80 pt-4">
          <StageNavigation
            currentStageNumber={currentStageNumber}
            totalStages={stages.length}
            onPrev={handlePrev}
            onNext={handleNext}
            onFinish={handleFinish}
          />
        </div>
      </div>

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ethiopia-obsidian/85 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-ethiopia-earth-900 border border-ethiopia-teff-500/50 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-ethiopia-clay-500 to-ethiopia-teff-500 flex items-center justify-center shadow-[0_0_25px_rgba(197,147,52,0.5)]">
              <Trophy className="w-8 h-8 text-ethiopia-linen" />
            </div>
            <h3 className="text-2xl font-bold text-ethiopia-linen serif-display">
              {language === 'am' ? 'እንኳን ደስ አለዎ! ጉዞውን አጠናቀዋል' : 'Journey Completed!'}
            </h3>
            <p className="text-xs sm:text-sm text-ethiopia-earth-200 leading-relaxed">
              {language === 'am'
                ? 'የጤፍን 3,000 ዓመታት ታሪክ፣ የእርሾ ሳይንስና የምጣድ ጥበብን በሚገባ ተምረዋል። የማስተርስ ባጅ ተሰጥቶዎታል።'
                : 'You have explored all 10 sacred stages of Ethiopian injera making, from microscopic grain to communal fellowship.'}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => router.push('/make-injera')}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-ethiopia-clay-500 to-ethiopia-teff-500 text-ethiopia-linen font-bold text-xs shadow-lg hover:scale-105 transition-transform"
              >
                {t('hero.simulationCta')}
              </button>
              <button
                onClick={() => setShowCompletionModal(false)}
                className="py-2.5 px-4 rounded-xl bg-ethiopia-earth-800 text-ethiopia-earth-200 font-semibold text-xs hover:bg-ethiopia-earth-700 transition-colors"
              >
                {t('nav.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function JourneyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-ethiopia-obsidian text-ethiopia-teff-400">
          <div className="w-10 h-10 border-2 border-ethiopia-teff-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <JourneyContent />
    </Suspense>
  );
}
