'use client';

import React, { useState, useRef } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { soundEngine } from '@/lib/audio/soundfx';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, RotateCcw, ArrowRight, CheckCircle, Info, Flame } from 'lucide-react';

export function InjeraSimGame() {
  const { t, language } = useLanguage();

  const [step, setStep] = useState(1);
  const [score, setScore] = useState(100);
  const [selectedGrain, setSelectedGrain] = useState<'nech' | 'tikur' | 'sergegna'>('sergegna');
  const [hydration, setHydration] = useState(65);
  const [fermentDays, setFermentDays] = useState(3);
  const [absitTemp, setAbsitTemp] = useState(74);
  const [mitadTemp, setMitadTemp] = useState(200);
  const [isSeasoned, setIsSeasoned] = useState(false);
  const [pourAccuracy, setPourAccuracy] = useState(0);
  const [isPouring, setIsPouring] = useState(false);
  const [isCovered, setIsCovered] = useState(false);
  const [isLifted, setIsLifted] = useState(false);
  const [selectedDishes, setSelectedDishes] = useState<string[]>(['doro', 'shiro']);
  const [completed, setCompleted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Spiral Pour Gesture Tracker
  const handleMouseDown = () => {
    setIsPouring(true);
    soundEngine.playSizzle && soundEngine.playSizzle();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPouring || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#D4A359';
      ctx.beginPath();
      ctx.arc(x, y, 14, 0, Math.PI * 2);
      ctx.fill();
    }
    setPourAccuracy((prev) => Math.min(100, prev + 2.5));
  };

  const handleMouseUp = () => {
    setIsPouring(false);
  };

  const handleReset = () => {
    setStep(1);
    setScore(100);
    setPourAccuracy(0);
    setIsSeasoned(false);
    setIsCovered(false);
    setIsLifted(false);
    setCompleted(false);
    setSelectedDishes(['doro', 'shiro']);
    soundEngine.playTizitaChime && soundEngine.playTizitaChime(0);
  };

  const nextStep = () => {
    if (step === 9) {
      setCompleted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#C59334', '#B85C38', '#9E2A2B', '#2D5A27'],
        });
      } catch {
        // ignore
      }
      soundEngine.playTizitaChime && soundEngine.playTizitaChime(5);
    } else {
      setStep((prev) => prev + 1);
      soundEngine.playTizitaChime && soundEngine.playTizitaChime(step);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-b from-ethiopia-earth-900 via-ethiopia-obsidian to-ethiopia-earth-950 rounded-3xl border border-ethiopia-teff-500/30 p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ethiopia-earth-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-ethiopia-clay-500/20 border border-ethiopia-clay-500/40 text-xs font-bold text-ethiopia-clay-300">
              {t('simulation.step')} {step} {t('simulation.of')} 9
            </span>
            <span className="text-xs font-semibold text-ethiopia-teff-400">
              {t('simulation.score')}: {score}%
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-ethiopia-linen serif-display mt-1">
            {step === 1 && (language === 'am' ? 'ደረጃ 1፡ ጤፍ መምረጥና መንጠር' : 'Step 1: Select & Sift Teff Grain')}
            {step === 2 && (language === 'am' ? 'ደረጃ 2፡ ሊጡን ማቡካትና ማሸት' : 'Step 2: Hydrate & Knead the Dough')}
            {step === 3 && (language === 'am' ? 'ደረጃ 3፡ እርሾ ጨምሮ ማብላላት' : 'Step 3: Inoculate & Ferment')}
            {step === 4 && (language === 'am' ? 'ደረጃ 4፡ አብሲት ማዘጋጀት' : 'Step 4: Prepare the Absit Starch Gel')}
            {step === 5 && (language === 'am' ? 'ደረጃ 5፡ ምጣዱን ማሞቅና መወልወል' : 'Step 5: Season & Heat the Mitad')}
            {step === 6 && (language === 'am' ? 'ደረጃ 6፡ ሊጡን በክብ ማፍሰስ' : 'Step 6: Trace the Spiral Pour Gesture')}
            {step === 7 && (language === 'am' ? 'ደረጃ 7፡ ዓይኑ ሲከፈት መክደን' : 'Step 7: Watch Ayn Bloom & Cover with Lid')}
            {step === 8 && (language === 'am' ? 'ደረጃ 8፡ በሰፌድ ማንሳት' : 'Step 8: Lift with the Woven Sefed')}
            {step === 9 && (language === 'am' ? 'ደረጃ 9፡ በመሶብ አሰናድቶ ማቅረብ' : 'Step 9: Assemble the Communal Feast')}
          </h2>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ethiopia-earth-800 hover:bg-ethiopia-earth-700 text-ethiopia-earth-300 hover:text-ethiopia-teff-300 text-xs font-semibold transition-colors"
          title="Restart Simulation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{language === 'am' ? 'እንደገና ጀምር' : 'Restart'}</span>
        </button>
      </div>

      {/* Main Interactive Stage Container */}
      {!completed ? (
        <div className="min-h-[320px] flex flex-col justify-between space-y-6">
          {/* Step 1: Grain Choice */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-ethiopia-earth-200">
                {language === 'am'
                  ? 'የሚጋግሩትን የእንጀራ ዓይነት ይምረጡ። እያንዳንዱ የጤፍ ዝርያ የራሱ የሆነ መልክና ጣዕም አለው።'
                  : 'Choose your teff variety. Each brings its own distinctive flavor profile, mineral density, and aesthetic.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'nech', label: 'Magna Nech (White)', am: 'ነጭ ማኛ', color: '#EFE2BA', text: 'Delicate, sweet, ivory celebratory grain.' },
                  { id: 'tikur', label: 'Tikur (Brown/Red)', am: 'ጥቁር ጤፍ', color: '#663B23', text: 'Earthy, robust, extremely iron-rich.' },
                  { id: 'sergegna', label: 'Sergegna (Blend)', am: 'ሰርገኛ', color: '#A67B48', text: 'The golden traditional blend of white & brown.' },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      setSelectedGrain(g.id as 'nech' | 'tikur' | 'sergegna');
                      soundEngine.playTizitaChime && soundEngine.playTizitaChime(1);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedGrain === g.id
                        ? 'border-ethiopia-teff-500 bg-ethiopia-earth-800/90 ring-2 ring-ethiopia-teff-500/30'
                        : 'border-ethiopia-earth-700 bg-ethiopia-earth-900/60 hover:border-ethiopia-earth-600'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full mb-2 border border-ethiopia-obsidian" style={{ backgroundColor: g.color }} />
                    <h4 className="text-sm font-bold text-ethiopia-linen">{g.label}</h4>
                    <p className="text-xs text-ethiopia-teff-400 fidel-font mb-1">{g.am}</p>
                    <p className="text-[11px] text-ethiopia-earth-300 leading-tight">{g.text}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Hydration Slider */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-ethiopia-earth-200">
                {language === 'am'
                  ? 'ውሃ እየጨመሩ ሊጡን በሚገባ እሹት። ትክክለኛውን የውሃ መጠን ይቆጣጠሩ።'
                  : 'Add lukewarm spring water and knead to develop starch hydration.'}
              </p>
              <div className="bg-ethiopia-earth-900/80 p-5 rounded-2xl border border-ethiopia-earth-700 space-y-3">
                <div className="flex justify-between text-xs font-bold text-ethiopia-teff-300">
                  <span>Hydration Ratio</span>
                  <span className="font-mono">{hydration}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="90"
                  value={hydration}
                  onChange={(e) => {
                    setHydration(Number(e.target.value));
                    soundEngine.playPour && soundEngine.playPour();
                  }}
                  className="w-full accent-ethiopia-clay-500 h-2 bg-ethiopia-earth-800 rounded-lg cursor-pointer"
                />
                <div className="text-[11px] text-ethiopia-earth-300">
                  {hydration >= 60 && hydration <= 75 ? (
                    <span className="text-ethiopia-teff-300 font-bold">
                      ✨ Perfect Consistency! Taffy-smooth and pliable.
                    </span>
                  ) : (
                    <span className="text-ethiopia-clay-400">
                      ⚠️ Adjust between 60% and 75% for ideal crumb elasticity.
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Fermentation Days */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-ethiopia-earth-200">
                {language === 'am'
                  ? 'የእርሾውን የመፍላት ጊዜ ይወስኑ። 3 ቀናት ምርጥ መዓዛና አየር ይሰጠዋል።'
                  : 'Allow the wild lactic bacteria and yeasts to ferment the batter.'}
              </p>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setFermentDays(d);
                      soundEngine.playBubble && soundEngine.playBubble();
                    }}
                    className={`py-4 px-2 rounded-2xl border font-bold text-center transition-all ${
                      fermentDays === d
                        ? 'bg-ethiopia-teff-500 text-ethiopia-obsidian border-ethiopia-teff-400 shadow-lg scale-105'
                        : 'bg-ethiopia-earth-900 border-ethiopia-earth-700 text-ethiopia-earth-300'
                    }`}
                  >
                    <div className="text-lg">Day {d}</div>
                    <div className="text-[10px] opacity-80 mt-1">
                      {d === 1 && 'Awakening'}
                      {d === 2 && 'Bubbling'}
                      {d === 3 && 'Ayr Layer'}
                      {d === 4 && 'Full Tang'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Absit Starch Gel */}
          {step === 4 && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-ethiopia-earth-200">
                {language === 'am'
                  ? 'አብሲቱን በማፍላት ስታርቹን አጣብቁት። የሙቀት መጠኑ ከ70°C በላይ መድረስ አለበት።'
                  : 'Boil a small cup of batter to gelatinize starches, then cool and blend back.'}
              </p>
              <div className="bg-ethiopia-earth-900/80 p-5 rounded-2xl border border-ethiopia-earth-700 space-y-3">
                <div className="flex justify-between text-xs font-bold text-ethiopia-teff-300">
                  <span>Absit Gel Temperature</span>
                  <span className="font-mono">{absitTemp}°C</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={absitTemp}
                  onChange={(e) => {
                    setAbsitTemp(Number(e.target.value));
                    if (Number(e.target.value) >= 72) soundEngine.playSizzle && soundEngine.playSizzle();
                  }}
                  className="w-full accent-ethiopia-clay-500 h-2 bg-ethiopia-earth-800 rounded-lg cursor-pointer"
                />
                <div className="text-[11px]">
                  {absitTemp >= 70 && absitTemp <= 85 ? (
                    <span className="text-ethiopia-teff-300 font-bold">
                      🌟 Excellent gelatinization! Starches bound into glossy binder.
                    </span>
                  ) : (
                    <span className="text-ethiopia-clay-400">
                      Heat between 70°C and 85°C to fully activate starch binding.
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Mitad Temperature & Seasoning */}
          {step === 5 && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-ethiopia-earth-200">
                {language === 'am'
                  ? 'ምጣዱን እስከ 200°C ያሞቁ፤ ከዚያም በጎመንዘር ጨርቅ ይወልውሉት።'
                  : 'Heat the clay griddle to ~200°C and season with rapeseed cloth.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 bg-ethiopia-earth-900/80 p-4 rounded-2xl border border-ethiopia-earth-700 space-y-2">
                  <div className="flex justify-between text-xs font-bold text-ethiopia-teff-300">
                    <span>Mitad Heat</span>
                    <span className="font-mono">{mitadTemp}°C</span>
                  </div>
                  <input
                    type="range"
                    min="140"
                    max="240"
                    value={mitadTemp}
                    onChange={(e) => setMitadTemp(Number(e.target.value))}
                    className="w-full accent-ethiopia-clay-500 h-2 bg-ethiopia-earth-800 rounded-lg cursor-pointer"
                  />
                </div>

                <button
                  onClick={() => {
                    setIsSeasoned(true);
                    soundEngine.playSizzle && soundEngine.playSizzle();
                  }}
                  className={`px-5 py-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
                    isSeasoned
                      ? 'bg-ethiopia-teff-500 text-ethiopia-obsidian border-ethiopia-teff-400 shadow-md'
                      : 'bg-ethiopia-earth-900 border-ethiopia-earth-700 text-ethiopia-earth-200 hover:border-ethiopia-teff-500'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isSeasoned ? '✓ Seasoned with Gomenzer' : 'Rub with Gomenzer Cloth'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 6: Spiral Pouring Gesture Canvas */}
          {step === 6 && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-ethiopia-earth-200">
                {language === 'am'
                  ? 'ማውዝዎን ወይም ጣትዎን በክብ ቅርጽ ከዳር ወደ መሃል በማንቀሳቀስ ሊጡን አፍስሱ!'
                  : 'Click/drag your mouse in concentric circles from the outer edge inward!'}
              </p>
              <div className="relative w-full max-w-sm mx-auto aspect-square rounded-full border-4 border-ethiopia-earth-700 bg-ethiopia-obsidian overflow-hidden shadow-2xl flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={340}
                  height={340}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  className="w-full h-full cursor-crosshair touch-none"
                />
                {pourAccuracy < 20 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pointer-events-none bg-ethiopia-obsidian/40 backdrop-blur-[2px]">
                    <Sparkles className="w-8 h-8 text-ethiopia-teff-400 mb-2 animate-bounce" />
                    <span className="text-xs font-bold text-ethiopia-linen">
                      Drag here in a circular spiral!
                    </span>
                  </div>
                )}
              </div>
              <div className="text-center font-mono text-xs text-ethiopia-teff-300">
                Spiral Coverage: {Math.round(pourAccuracy)}%
              </div>
            </div>
          )}

          {/* Step 7: Ayn & Lid Cover */}
          {step === 7 && (
            <div className="space-y-4 text-center">
              <p className="text-xs sm:text-sm text-ethiopia-earth-200">
                {language === 'am'
                  ? 'የእንጀራው ዓይን ሲከፈት ተመልክተው በአክምባሎ ክዳን ይሸፍኑት።'
                  : 'Observe the thousands of honeycomb steam vents blooming, then seal the Akambalo lid!'}
              </p>
              <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-tr from-ethiopia-clay-500/40 via-ethiopia-teff-500/20 to-transparent border-2 border-ethiopia-teff-500/40 flex items-center justify-center">
                <Flame className="w-16 h-16 text-ethiopia-clay-400 animate-pulse" />
              </div>
              <button
                onClick={() => {
                  setIsCovered(!isCovered);
                  soundEngine.playSizzle && soundEngine.playSizzle();
                }}
                className={`py-3 px-6 rounded-2xl font-bold text-xs shadow-lg transition-all ${
                  isCovered
                    ? 'bg-ethiopia-clay-500 text-ethiopia-linen'
                    : 'bg-ethiopia-teff-500 text-ethiopia-obsidian animate-bounce'
                }`}
              >
                {isCovered ? '✓ Akambalo Sealed & Steaming' : 'Cover with Akambalo Lid'}
              </button>
            </div>
          )}

          {/* Step 8: Sefed Removal */}
          {step === 8 && (
            <div className="space-y-4 text-center">
              <p className="text-xs sm:text-sm text-ethiopia-earth-200">
                {language === 'am'
                  ? 'የበሰለውን እንጀራ በሰፌድ አንስተው እንዲቀዘቅዝ ያድርጉ።'
                  : 'Slide the circular straw Sefed mat underneath to lift cleanly without tearing.'}
              </p>
              <button
                onClick={() => {
                  setIsLifted(true);
                  soundEngine.playTizitaChime && soundEngine.playTizitaChime(3);
                }}
                className={`py-4 px-8 rounded-2xl font-bold text-sm shadow-xl transition-all ${
                  isLifted
                    ? 'bg-ethiopia-mesob-green text-ethiopia-linen'
                    : 'bg-ethiopia-teff-500 text-ethiopia-obsidian hover:scale-105'
                }`}
              >
                {isLifted ? '✓ Lifted Cleanly onto Sefed!' : 'Slide Sefed & Lift Bread'}
              </button>
            </div>
          )}

          {/* Step 9: Assemble Feast */}
          {step === 9 && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-ethiopia-earth-200">
                {language === 'am'
                  ? 'በመሶቡ ላይ የሚቀርቡትን ባህላዊ ወጦች ይምረጡ።'
                  : 'Select the traditional savory stews to arrange upon the injera inside the Mesob.'}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'doro', name: 'Doro Wat (ዶሮ ወጥ)', desc: 'Slow-simmered spicy chicken & egg' },
                  { id: 'shiro', name: 'Shiro Mitten (ሽሮ)', desc: 'Velvety spiced chickpea stew' },
                  { id: 'misir', name: 'Misir Wat (ምስር)', desc: 'Aromatic berbere split lentils' },
                  { id: 'gomen', name: 'Gomen (ጎመን)', desc: 'Garlic sauteed collard greens' },
                  { id: 'tibs', name: 'Tibs (ጥብስ)', desc: 'Rosemary seared beef' },
                  { id: 'ayib', name: 'Ayib (አይብ)', desc: 'Cool fresh curd cheese' },
                ].map((dish) => {
                  const isChecked = selectedDishes.includes(dish.id);
                  return (
                    <button
                      key={dish.id}
                      onClick={() => {
                        if (isChecked) {
                          setSelectedDishes(selectedDishes.filter((d) => d !== dish.id));
                        } else {
                          setSelectedDishes([...selectedDishes, dish.id]);
                        }
                        soundEngine.playTizitaChime && soundEngine.playTizitaChime(1);
                      }}
                      className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                        isChecked
                          ? 'border-ethiopia-teff-500 bg-ethiopia-earth-800/90 text-ethiopia-linen'
                          : 'border-ethiopia-earth-700 bg-ethiopia-earth-900/60 text-ethiopia-earth-300'
                      }`}
                    >
                      <div className="font-bold text-ethiopia-teff-300 mb-0.5">{dish.name}</div>
                      <div className="text-[10px] opacity-80">{dish.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Action / Next Button */}
          <div className="flex items-center justify-between pt-4 border-t border-ethiopia-earth-800">
            <span className="text-xs text-ethiopia-earth-400 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-ethiopia-clay-400" />
              <span>{t('simulation.disclaimer')}</span>
            </span>

            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-ethiopia-clay-500 to-ethiopia-teff-500 text-ethiopia-linen font-bold text-xs sm:text-sm shadow-lg hover:scale-105 transition-all"
            >
              <span>{step === 9 ? t('simulation.finish') : t('simulation.nextStep')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Completion Screen */
        <div className="text-center py-8 space-y-5 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-ethiopia-clay-500 via-ethiopia-teff-500 to-ethiopia-mesob-green flex items-center justify-center shadow-[0_0_30px_rgba(197,147,52,0.6)]">
            <Trophy className="w-10 h-10 text-ethiopia-linen" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono text-ethiopia-teff-400 uppercase tracking-widest">
              {t('simulation.completionBadge')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-ethiopia-linen serif-display">
              {t('simulation.completionTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-ethiopia-earth-200 max-w-lg mx-auto leading-relaxed pt-1">
              {language === 'am'
                ? 'ከጤፍ እሸት ጀምሮ ሊጡን አቦክተው፣ አብሲቱን አፍልተው፣ በምጣዱ ላይ በክብ አፍስሰው ውብ ዓይን ያለው እንጀራ ለመሶብ አቅርበዋል!'
                : 'You have guided every stage from raw grain to dough, fermentation, absit binding, spiral pouring, and the final communal Mesob feast!'}
            </p>
          </div>

          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-ethiopia-earth-900 border border-ethiopia-teff-500/40 text-xs font-bold text-ethiopia-teff-300">
            <CheckCircle className="w-4 h-4 text-ethiopia-mesob-green" />
            <span>Mastery Score: {score}% • Badge Awarded</span>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={handleReset}
              className="py-2.5 px-5 rounded-xl bg-ethiopia-earth-800 hover:bg-ethiopia-earth-700 text-ethiopia-linen text-xs font-semibold"
            >
              {language === 'am' ? 'እንደገና ጋግር' : 'Bake Another'}
            </button>
            <a
              href="/culture"
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-ethiopia-clay-500 to-ethiopia-teff-500 text-ethiopia-linen text-xs font-bold shadow-lg hover:scale-105 transition-transform"
            >
              {t('simulation.shareCta')}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
