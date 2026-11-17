'use client';

import React, { useState } from 'react';
import { quizQuestions, vocabularyList } from '@/data/quiz';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { HelpCircle, BookOpen, CheckCircle, XCircle, Trophy, Volume2, Sparkles, RotateCcw } from 'lucide-react';
import { soundEngine } from '@/lib/audio/soundfx';
import confetti from 'canvas-confetti';

export default function LearnPage() {
  const { t, language } = useLanguage();

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    soundEngine.playTizitaChime && soundEngine.playTizitaChime(1);
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionId) {
        correct++;
      }
    });
    return correct;
  };

  const handleFinishQuiz = () => {
    setShowResults(true);
    const score = calculateScore();
    if (score >= 4) {
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C59334', '#B85C38', '#9E2A2B'],
        });
      } catch {
        // ignore
      }
      soundEngine.playTizitaChime && soundEngine.playTizitaChime(5);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setShowResults(false);
    soundEngine.playTizitaChime && soundEngine.playTizitaChime(0);
  };

  const isAllAnswered = quizQuestions.every((q) => selectedAnswers[q.id]);

  return (
    <div className="min-h-screen bg-ethiopia-obsidian text-ethiopia-linen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ethiopia-earth-900/90 border border-ethiopia-teff-500/30 text-xs text-ethiopia-teff-300 font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-ethiopia-clay-400" />
            <span>{t('learn.title')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold serif-display text-ethiopia-linen">
            {language === 'am' ? 'የትምህርት ማዕከልና የባህል ፈተና' : 'Learning Center & Quiz'}
          </h1>
          <p className="text-xs sm:text-sm text-ethiopia-earth-300 leading-relaxed">
            {t('learn.subtitle')}
          </p>
        </div>

        {/* 1. Interactive Quiz Section */}
        <section className="bg-gradient-to-b from-ethiopia-earth-900/80 to-ethiopia-obsidian rounded-3xl border border-ethiopia-teff-500/30 p-6 sm:p-8 shadow-2xl space-y-8">
          <div className="flex items-center justify-between border-b border-ethiopia-earth-800 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-ethiopia-teff-400" />
              <h2 className="text-xl font-bold text-ethiopia-linen serif-display">
                {t('learn.quizTitle')}
              </h2>
            </div>
            {showResults && (
              <button
                onClick={handleRestart}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ethiopia-earth-800 hover:bg-ethiopia-earth-700 text-xs font-semibold text-ethiopia-teff-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('learn.restartQuiz')}</span>
              </button>
            )}
          </div>

          <div className="space-y-6">
            {quizQuestions.map((q, idx) => {
              const selectedOpt = selectedAnswers[q.id];
              const isCorrect = selectedOpt === q.correctOptionId;

              return (
                <div
                  key={q.id}
                  className="bg-ethiopia-earth-900/90 rounded-2xl border border-ethiopia-earth-700 p-5 sm:p-6 space-y-4 shadow-md"
                >
                  <div className="flex items-center justify-between text-xs text-ethiopia-earth-400">
                    <span className="font-bold text-ethiopia-teff-400">
                      {t('learn.question')} {idx + 1} of {quizQuestions.length}
                    </span>
                    <span className="uppercase font-mono text-[10px] bg-ethiopia-earth-800 px-2 py-0.5 rounded text-ethiopia-earth-300">
                      {q.category}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-ethiopia-linen">
                    {q.question[language]}
                  </h3>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt) => {
                      const isThisSelected = selectedOpt === opt.id;
                      const isThisCorrect = opt.id === q.correctOptionId;

                      let btnStyle = 'bg-ethiopia-earth-800/80 border-ethiopia-earth-700 text-ethiopia-earth-200 hover:border-ethiopia-teff-500/50';

                      if (showResults) {
                        if (isThisCorrect) {
                          btnStyle = 'bg-ethiopia-mesob-green/20 border-ethiopia-mesob-green text-ethiopia-linen font-semibold';
                        } else if (isThisSelected && !isThisCorrect) {
                          btnStyle = 'bg-ethiopia-clay-900/60 border-ethiopia-clay-500 text-ethiopia-clay-200';
                        }
                      } else if (isThisSelected) {
                        btnStyle = 'bg-ethiopia-teff-500/20 border-ethiopia-teff-500 text-ethiopia-teff-300 font-bold';
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(q.id, opt.id)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                        >
                          <span>{opt.text[language]}</span>
                          {showResults && isThisCorrect && (
                            <CheckCircle className="w-4 h-4 text-ethiopia-mesob-green shrink-0" />
                          )}
                          {showResults && isThisSelected && !isThisCorrect && (
                            <XCircle className="w-4 h-4 text-ethiopia-clay-500 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Immediate Explanation on Results */}
                  {showResults && (
                    <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                      isCorrect
                        ? 'bg-ethiopia-mesob-green/10 border-ethiopia-mesob-green/40 text-ethiopia-linen'
                        : 'bg-ethiopia-clay-950/40 border-ethiopia-clay-500/40 text-ethiopia-earth-200'
                    }`}>
                      <span className="font-bold block mb-1">
                        {isCorrect ? t('learn.correct') : t('learn.incorrect')}
                      </span>
                      <p>{q.explanation[language]}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Quiz Action */}
          {!showResults ? (
            <div className="text-center pt-2">
              <button
                onClick={handleFinishQuiz}
                disabled={!isAllAnswered}
                className={`py-3 px-8 rounded-2xl font-bold text-xs sm:text-sm shadow-xl transition-all ${
                  isAllAnswered
                    ? 'bg-gradient-to-r from-ethiopia-clay-500 to-ethiopia-teff-500 text-ethiopia-linen hover:scale-105'
                    : 'bg-ethiopia-earth-800 text-ethiopia-earth-500 cursor-not-allowed'
                }`}
              >
                {isAllAnswered ? 'Submit & Review Answers' : 'Answer all questions to finish'}
              </button>
            </div>
          ) : (
            <div className="bg-ethiopia-earth-900 border border-ethiopia-teff-500/40 rounded-2xl p-6 text-center space-y-2">
              <Trophy className="w-10 h-10 text-ethiopia-teff-400 mx-auto" />
              <h3 className="text-xl font-bold text-ethiopia-linen serif-display">
                {t('learn.scoreLabel')}: {calculateScore()} / {quizQuestions.length}
              </h3>
              <p className="text-xs text-ethiopia-earth-300">
                {calculateScore() >= 4
                  ? 'Outstanding cultural mastery! You have earned the Cultural Scholar recognition.'
                  : 'Great effort! Re-read the cultural articles to deepen your culinary understanding.'}
              </p>
            </div>
          )}
        </section>

        {/* 2. Amharic Culinary Lexicon (ፊደል) */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-ethiopia-teff-400" />
            <h2 className="text-2xl font-bold text-ethiopia-linen serif-display">
              {t('learn.vocabTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {vocabularyList.map((item, i) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-gradient-to-b from-ethiopia-earth-900/90 to-ethiopia-obsidian border border-ethiopia-earth-700/80 space-y-2 shadow-lg hover:border-ethiopia-teff-500/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-ethiopia-teff-400 fidel-font">
                    {item.fidel}
                  </span>
                  <button
                    onClick={() => soundEngine.playTizitaChime && soundEngine.playTizitaChime(i % 5)}
                    className="p-1.5 rounded-full bg-ethiopia-earth-800 hover:bg-ethiopia-earth-700 text-ethiopia-clay-400 transition-colors"
                    title="Audio Chime"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-xs font-mono text-ethiopia-clay-300 font-semibold">
                  {item.transliteration}
                </div>

                <div className="text-sm font-bold text-ethiopia-linen">
                  {item.english}
                </div>

                <p className="text-[11px] text-ethiopia-earth-300 leading-relaxed pt-1 border-t border-ethiopia-earth-800">
                  {item.definition}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
