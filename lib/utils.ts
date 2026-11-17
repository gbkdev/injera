import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { UserProgress } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const STORAGE_KEY = 'injera_journey_progress_v2';

export const defaultUserProgress: UserProgress = {
  completedStages: [1],
  currentStage: 1,
  simulationScore: 0,
  quizScore: 0,
  quizCompleted: false,
  unlockedBadges: ['CURIOUS_OBSERVER'],
  lastVisited: new Date().toISOString(),
};

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') return defaultUserProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultUserProgress;
    return { ...defaultUserProgress, ...JSON.parse(raw) };
  } catch (e) {
    console.warn('Failed to load user progress from localStorage', e);
    return defaultUserProgress;
  }
}

export function saveUserProgress(progress: Partial<UserProgress>): UserProgress {
  if (typeof window === 'undefined') return defaultUserProgress;
  try {
    const current = loadUserProgress();
    const updated: UserProgress = {
      ...current,
      ...progress,
      lastVisited: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('Failed to save user progress to localStorage', e);
    return defaultUserProgress;
  }
}

export function markStageCompleted(stageNum: number): UserProgress {
  const current = loadUserProgress();
  const completed = Array.from(new Set([...current.completedStages, stageNum])).sort((a, b) => a - b);
  const nextStage = Math.min(10, Math.max(current.currentStage, stageNum + 1));
  
  const badges = [...current.unlockedBadges];
  if (completed.length >= 5 && !badges.includes('FERMENTATION_SCHOLAR')) {
    badges.push('FERMENTATION_SCHOLAR');
  }
  if (completed.length >= 10 && !badges.includes('YE_INJERA_ENAT')) {
    badges.push('YE_INJERA_ENAT');
  }

  return saveUserProgress({
    completedStages: completed,
    currentStage: nextStage,
    unlockedBadges: badges,
  });
}
