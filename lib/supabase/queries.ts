import { supabase, isSupabaseConfigured } from './client';
import { stages as localStages } from '@/data/stages';
import { utensils as localUtensils } from '@/data/utensils';
import { culturalArticles as localArticles } from '@/data/cultural_articles';
import { regions as localRegions } from '@/data/regions';
import { stories as localStories } from '@/data/stories';
import { quizQuestions as localQuiz } from '@/data/quiz';
import { Stage, Utensil, CulturalArticle, Region, Story, QuizQuestion } from '@/types';

export async function getStages(): Promise<Stage[]> {
  if (!isSupabaseConfigured || !supabase) {
    return localStages;
  }
  try {
    const { data, error } = await supabase
      .from('stages')
      .select('*')
      .order('stage_number', { ascending: true });
    
    if (error || !data || data.length === 0) {
      return localStages;
    }
    
    return data.map((row) => ({
      id: row.id,
      stageNumber: row.stage_number,
      title: { en: row.title_en, am: row.title_am },
      subtitle: { en: row.subtitle_en, am: row.subtitle_am },
      summary: { en: row.summary_en, am: row.summary_am },
      description: { en: row.description_en, am: row.description_am },
      scientificInsight: { en: row.scientific_insight_en, am: row.scientific_insight_am },
      culturalInsight: { en: row.cultural_insight_en, am: row.cultural_insight_am },
      durationEstimate: row.duration_estimate,
      colorTheme: row.color_theme,
      tools: row.tools || [],
      ingredients: row.ingredients || [],
      tips: { en: [], am: [] },
    }));
  } catch {
    return localStages;
  }
}

export async function getStageByNumber(stageNumber: number): Promise<Stage | undefined> {
  const allStages = await getStages();
  return allStages.find((s) => s.stageNumber === stageNumber);
}

export async function getUtensils(): Promise<Utensil[]> {
  return localUtensils;
}

export async function getCulturalArticles(): Promise<CulturalArticle[]> {
  if (!isSupabaseConfigured || !supabase) {
    return localArticles;
  }
  try {
    const { data, error } = await supabase
      .from('cultural_articles')
      .select('*')
      .eq('status', 'published');
    if (error || !data || data.length === 0) return localArticles;
    return localArticles; // typed structured articles
  } catch {
    return localArticles;
  }
}

export async function getArticleBySlug(slug: string): Promise<CulturalArticle | undefined> {
  const articles = await getCulturalArticles();
  return articles.find((a) => a.slug === slug);
}

export async function getRegions(): Promise<Region[]> {
  return localRegions;
}

export async function getStories(): Promise<Story[]> {
  return localStories;
}

export async function getQuizQuestions(): Promise<QuizQuestion[]> {
  return localQuiz;
}
