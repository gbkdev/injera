export type Language = 'en' | 'am';

export interface Stage {
  id: string;
  stageNumber: number;
  title: {
    en: string;
    am: string;
  };
  subtitle: {
    en: string;
    am: string;
  };
  durationEstimate: string;
  summary: {
    en: string;
    am: string;
  };
  description: {
    en: string;
    am: string;
  };
  scientificInsight: {
    en: string;
    am: string;
  };
  culturalInsight: {
    en: string;
    am: string;
  };
  proverbs?: {
    amharic: string;
    transliteration: string;
    meaning: string;
  };
  tools: string[]; // references to Utensil IDs
  ingredients: string[];
  tips: {
    en: string[];
    am: string[];
  };
  variationsNote?: {
    en: string;
    am: string;
  };
  colorTheme: string;
}

export interface Utensil {
  id: string;
  name: {
    en: string;
    am: string;
  };
  transliteration: string;
  category: 'cooking' | 'serving' | 'preparation' | 'storage';
  materials: string[];
  description: {
    en: string;
    am: string;
  };
  culturalSignificance: {
    en: string;
    am: string;
  };
  traditionalCraftingNotes?: {
    en: string;
    am: string;
  };
  imagePath?: string;
}

export interface CulturalArticle {
  id: string;
  slug: string;
  title: {
    en: string;
    am: string;
  };
  category: 'history' | 'agriculture' | 'science' | 'hospitality' | 'craftsmanship';
  author: string;
  readTime: string;
  publishedDate: string;
  leadParagraph: {
    en: string;
    am: string;
  };
  sections: {
    heading: {
      en: string;
      am: string;
    };
    content: {
      en: string;
      am: string;
    };
    quote?: {
      text: string;
      source: string;
    };
  }[];
  sources: {
    title: string;
    authorOrInstitution: string;
    year?: string;
    url?: string;
  }[];
}

export interface Region {
  id: string;
  name: {
    en: string;
    am: string;
  };
  capital: string;
  geography: string;
  grainSpecialty: {
    en: string;
    am: string;
  };
  injeraCharacteristics: {
    en: string;
    am: string;
  };
  signatureDishes: {
    name: string;
    amharic: string;
    description: string;
  }[];
  traditionHighlight: {
    en: string;
    am: string;
  };
  coordinates: {
    x: number; // percentage on SVG map
    y: number;
  };
}

export interface Story {
  id: string;
  slug: string;
  personName: string;
  role: {
    en: string;
    am: string;
  };
  location: string;
  generation: string;
  quote: {
    en: string;
    am: string;
  };
  body: {
    en: string[];
    am: string[];
  };
  culturalContext: {
    en: string;
    am: string;
  };
  isDemoData?: boolean;
}

export interface QuizQuestion {
  id: string;
  category: 'teff' | 'fermentation' | 'tools' | 'cooking' | 'culture' | 'dining';
  difficulty: 'easy' | 'medium' | 'hard';
  question: {
    en: string;
    am: string;
  };
  options: {
    id: string;
    text: {
      en: string;
      am: string;
    };
  }[];
  correctOptionId: string;
  explanation: {
    en: string;
    am: string;
  };
}

export interface UserProgress {
  completedStages: number[];
  currentStage: number;
  simulationScore: number;
  quizScore: number;
  quizCompleted: boolean;
  unlockedBadges: string[];
  lastVisited: string;
}

export interface VocabWord {
  id: string;
  amharic: string;
  fidel: string;
  transliteration: string;
  english: string;
  definition: string;
  audioCategory?: 'tool' | 'food' | 'concept' | 'action';
}
