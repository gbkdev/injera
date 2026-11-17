import { QuizQuestion, VocabWord } from '@/types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'teff',
    difficulty: 'easy',
    question: {
      en: 'What is Teff (ጤፍ)?',
      am: 'ጤፍ ምንድን ነው?'
    },
    options: [
      { id: 'opt-a', text: { en: 'A native ancient grain cultivated in the Ethiopian highlands', am: 'በኢትዮጵያ ከፍተኛ ቦታዎች የሚመረት ጥንታዊ እህል' } },
      { id: 'opt-b', text: { en: 'A type of clay used to build mitad baking griddles', am: 'ምጣድ የሚሰራበት የሸክላ አፈር ዓይነት' } },
      { id: 'opt-c', text: { en: 'A spice blend made from dried peppers and herbs', am: 'ከበርበሬና ከቅመም የሚዘጋጅ የቅመም ውህደት' } },
      { id: 'opt-d', text: { en: 'A woven palm basket for storing bread', am: 'እንጀራ የሚቀመጥበት የሳር መሶብ' } }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      en: 'Teff (Eragrostis tef) is a nutrient-dense, naturally gluten-free cereal grain indigenous to Ethiopia, cultivated for over 3,000 years.',
      am: 'ጤፍ ከ3,000 ዓመታት በላይ በኢትዮጵያ ሲመረት የቆየ፣ ከግሉተን ነፃ የሆነ ብቸኛ የሀገር በቀል እህል ነው።'
    }
  },
  {
    id: 'q2',
    category: 'fermentation',
    difficulty: 'medium',
    question: {
      en: 'What is the crucial scientific role of "Absit" (አብሲት)?',
      am: 'የአብሲት ዋነኛ ሳይንሳዊ ጥቅም ምንድን ነው?'
    },
    options: [
      { id: 'opt-a', text: { en: 'It cools the hot mitad before pouring batter', am: 'ሊጡ ከመፍሰሱ በፊት ምጣዱን ያቀዘቅዛል' } },
      { id: 'opt-b', text: { en: 'It gelatinizes starches to bind gluten-free batter and trap steam bubbles', am: 'ስታርቹን በማጣበቅ አየር እንዲይዝና ዓይን እንዲያወጣ ይረዳል' } },
      { id: 'opt-c', text: { en: 'It dyes the dough to a deep red color', am: 'ሊጡ ቀይ ቀለም እንዲይዝ ያደርጋል' } },
      { id: 'opt-d', text: { en: 'It acts as an oil to clean the mitad surface', am: 'ምጣዱን ለመወልወል የሚያገለግል ዘይት ነው' } }
    ],
    correctOptionId: 'opt-b',
    explanation: {
      en: 'Because teff lacks gluten, cooking a small portion into absit gelatinizes starches, providing the viscous matrix needed to trap gas and form the honeycomb "Ayn" eyes.',
      am: 'ጤፍ ግሉተን ስለሌለው የተወሰነውን ሊጥ በማፍላት አብሲት ማዘጋጀት ሊጡ ተጣብቆ አየር እንዲይዝና ዓይኑ እንዲከፈት ያደርጋል።'
    }
  },
  {
    id: 'q3',
    category: 'tools',
    difficulty: 'easy',
    question: {
      en: 'Which woven utensil is used to lift hot cooked injera off the mitad?',
      am: 'የበሰለውን ትኩስ እንጀራ ከምጣድ ላይ ለማንሳት የሚያገለግለው የሳር እቃ የቱ ነው?'
    },
    options: [
      { id: 'opt-a', text: { en: 'Sefed / Mazoriya (ሰፌድ)', am: 'ሰፌድ / መዞሪያ' } },
      { id: 'opt-b', text: { en: 'Mesob (መሶብ)', am: 'መሶብ' } },
      { id: 'opt-c', text: { en: 'Akambalo (አክምባሎ)', am: 'አክምባሎ' } },
      { id: 'opt-d', text: { en: 'Jebena (ጀበና)', am: 'ጀበና' } }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      en: 'A Sefed (or Mazoriya) is a circular flat woven grass mat slid gently underneath the cooked injera to lift it cleanly without tearing.',
      am: 'ሰፌድ ጠፍጣፋና ክብ የሳር እቃ ሲሆን እንጀራው ሳይቀደድ ከምጣድ ላይ በጥንቃቄ ለማንሳት ያገለግላል።'
    }
  },
  {
    id: 'q4',
    category: 'cooking',
    difficulty: 'medium',
    question: {
      en: 'What are the iconic honeycomb holes on the surface of injera called in Amharic?',
      am: 'በእንጀራው የላይኛው ገጽታ ላይ የሚከፈቱት ውብ ቀዳዳዎች በባህል ምን ይባላሉ?'
    },
    options: [
      { id: 'opt-a', text: { en: 'Ayn (ዓይን — Eyes)', am: 'ዓይን' } },
      { id: 'opt-b', text: { en: 'Desta (ደስታ — Joy)', am: 'ደስታ' } },
      { id: 'opt-c', text: { en: 'Kibbeh (ቅቤ — Butter)', am: 'ቅቤ' } },
      { id: 'opt-d', text: { en: 'Berbere (በርበሬ — Pepper)', am: 'በርበሬ' } }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      en: 'The fine steam vents are called "Ayn" (ዓይን), meaning "eyes". An injera with uniform, dense eyes is praised as a culinary masterpiece.',
      am: 'የእንጀራው ቀዳዳዎች "ዓይን" ተብለው ይጠራሉ፤ በደንብ ሲከፈቱም የእንጀራውን ውበትና ጥራት ያመለክታሉ።'
    }
  },
  {
    id: 'q5',
    category: 'dining',
    difficulty: 'easy',
    question: {
      en: 'What is "Gursha" (ጉርሻ) in Ethiopian dining culture?',
      am: 'በኢትዮጵያ የማዕድ ባህል "ጉርሻ" ምንድን ነው?'
    },
    options: [
      { id: 'opt-a', text: { en: 'The act of feeding a friend or elder a morsel of food by hand as a sign of love and honor', am: 'ለወዳጅ ወይም ለታላቅ ሰው በፍቅርና በክብር በእጅ ማጉረስ' } },
      { id: 'opt-b', text: { en: 'The tip given to the restaurant waiter', am: 'ለአስተናጋጅ የሚሰጥ ጉርሻ' } },
      { id: 'opt-c', text: { en: 'The wooden spoon used to serve wat stew', am: 'ወጥ የሚቀዳበት የእንጨት ማንኪያ' } },
      { id: 'opt-d', text: { en: 'The washing of hands before eating', am: 'ከምግብ በፊት እጅ መታጠብ' } }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      en: 'Gursha is the cherished tradition of wrapping a savory bite in injera and placing it gently into the mouth of a companion to show deep affection, respect, and hospitality.',
      am: 'ጉርሻ እንጀራን ከወጥ ጋር ጠቅልሎ ለሌላው ሰው ማጉረስ ሲሆን፤ የፍቅር፣ የክብርና የመተሳሰብ ምልክት ነው።'
    }
  }
];

export const vocabularyList: VocabWord[] = [
  {
    id: 'v1',
    amharic: 'ጤፍ',
    fidel: 'ጤፍ',
    transliteration: 'T\'eff',
    english: 'Teff',
    definition: 'The microscopic, gluten-free ancient cereal grain endemic to Ethiopia, forming the foundation of authentic sourdough injera.',
    audioCategory: 'food'
  },
  {
    id: 'v2',
    amharic: 'እንጀራ',
    fidel: 'እንጀራ',
    transliteration: 'Injara / Injera',
    english: 'Injera',
    definition: 'The spongy, sour, crepe-like sourdough flatbread central to Ethiopian dining.',
    audioCategory: 'food'
  },
  {
    id: 'v3',
    amharic: 'እርሾ',
    fidel: 'እርሾ',
    transliteration: 'Ersho',
    english: 'Starter Culture',
    definition: 'The wild lactic acid bacteria and yeast starter preserved from previous dough batches.',
    audioCategory: 'concept'
  },
  {
    id: 'v4',
    amharic: 'አብሲት',
    fidel: 'አብሲት',
    transliteration: 'Absit',
    english: 'Cooked Starch Catalyst',
    definition: 'Boiled batter helper added to fermented teff dough to gelatinize starches and bind the mixture.',
    audioCategory: 'action'
  },
  {
    id: 'v5',
    amharic: 'ምጣድ',
    fidel: 'ምጣድ',
    transliteration: 'Mit\'ad',
    english: 'Baking Griddle',
    definition: 'The circular earthenware or electric clay slab on which injera is baked.',
    audioCategory: 'tool'
  },
  {
    id: 'v6',
    amharic: 'መሶብ',
    fidel: 'መሶብ',
    transliteration: 'Mesob',
    english: 'Communal Table Basket',
    definition: 'The conical-lidded, intricately hand-woven grass dining table for shared meals.',
    audioCategory: 'tool'
  },
  {
    id: 'v7',
    amharic: 'ዓይን',
    fidel: 'ዓይን',
    transliteration: 'Ayn',
    english: 'Eyes / Honeycomb Holes',
    definition: 'The thousands of uniform steam pores that perforate the upper surface of a well-baked injera.',
    audioCategory: 'concept'
  },
  {
    id: 'v8',
    amharic: 'ጉርሻ',
    fidel: 'ጉርሻ',
    transliteration: 'Gursha',
    english: 'Affectionate Hand-Fed Morsel',
    definition: 'The sacred act of offering a wrapped mouthful of food directly into the mouth of a companion.',
    audioCategory: 'action'
  }
];
