import { Region } from '@/types';

export const regions: Region[] = [
  {
    id: 'amhara',
    name: {
      en: 'Amhara (Gojjam & Gondar)',
      am: 'አማራ (ጎጃምና ጎንደር)'
    },
    capital: 'Bahir Dar',
    geography: 'Highland plateau, fertile volcanic valleys, Lake Tana',
    grainSpecialty: {
      en: 'Magna Teff (Pure White/Ivory Teff from Gojjam, renowned for exceptional sweetness and silky texture)',
      am: 'የጎጃም ማኛ ነጭ ጤፍ፤ በጣዕሙና በልስላሴው የታወቀ'
    },
    injeraCharacteristics: {
      en: 'Feathery soft, snow-white or pale amber, high eye density, subtle wine-like tang from 4-day fermentation.',
      am: 'እጅግ የለሰለሰ፣ ነጭ ወይም ወርቃማ፣ ዓይኑ የበዛና ደስ የሚል መኮምጠጥ ያለው።'
    },
    signatureDishes: [
      {
        name: 'Doro Wat',
        amharic: 'ዶሮ ወጥ',
        description: 'Rich, slow-simmered chicken stew with berbere and hard-boiled eggs.'
      },
      {
        name: 'Shiro Mitten',
        amharic: 'ሽሮ ምጥን',
        description: 'Velvety spiced chickpea and pea stew simmered in clay pots.'
      }
    ],
    traditionHighlight: {
      en: 'Gojjam is celebrated as the "Breadbasket of Ethiopia", where ancestral seed varieties of Magna teff have been curated for centuries.',
      am: 'ጎጃም "የኢትዮጵያ ጎተራ" ተብሎ የሚጠራ ሲሆን፤ ለዘመናት ምርጥ የጤፍ ዝርያዎች የሚመረቱበት ነው።'
    },
    coordinates: { x: 42, y: 32 }
  },
  {
    id: 'oromia',
    name: {
      en: 'Oromia (Shewa & Arsi)',
      am: 'ኦሮሚያ (ሸዋና አርሲ)'
    },
    capital: 'Sheger / Addis Ababa',
    geography: 'Vast rolling highlands, Rift Valley lakes, Mount Chilalo',
    grainSpecialty: {
      en: 'Ada\'a & Debre Zeit White Teff, Sergegna, and highland barley blends',
      am: 'የአዳእ ነጭ ጤፍ፣ ሰርገኛና የደጋ ገብስ'
    },
    injeraCharacteristics: {
      en: 'Known locally in Afaan Oromoo as "Bideena". Plump, resilient sponge, highly absorbent of rich butter-infused wats.',
      am: 'በአፋን ኦሮሞ "ቢዴና" በመባል የሚታወቅ ሲሆን፤ በቅቤ የተዘጋጁ ወጦችን በሚገባ የሚመጥ ነው።'
    },
    signatureDishes: [
      {
        name: 'Chuko / Qiqe',
        amharic: 'ጩኮ',
        description: 'Roasted barley and teff paste infused with spiced clarified butter.'
      },
      {
        name: 'Oromo Tibs & Koche',
        amharic: 'ጥብስ',
        description: 'Sizzling beef seasoned with rosemary, garlic, and mitmita.'
      }
    ],
    traditionHighlight: {
      en: 'The Ada\'a woreda surrounding Bishoftu produces world-acclaimed high-altitude teff with uniform grain size and rich minerals.',
      am: 'የአዳእ ወረዳ በዓለም አቀፍ ደረጃ ጥራት ባለው ከፍተኛ የማዕድን ይዘት ባለው ጤፉ ይታወቃል።'
    },
    coordinates: { x: 48, y: 48 }
  },
  {
    id: 'tigray',
    name: {
      en: 'Tigray (Highland Amba Terraces)',
      am: 'ትግራይ (የዓምባ እርከኖች)'
    },
    capital: 'Mekelle',
    geography: 'Rocky dramatic massifs, sandstone pinnacles, ancient terraces',
    grainSpecialty: {
      en: 'Tikur (Brown/Red) Teff, White Teff, and drought-tolerant Finger Millet',
      am: 'ጥቁር ጤፍ፣ ነጭ ጤፍና የዳጉሳ እህል'
    },
    injeraCharacteristics: {
      en: 'Known as "Taita" (ጣይታ). Earthy aroma, robust texture, often fermented with heirloom starters for 3 days.',
      am: '"ጣይታ" ተብሎ የሚጠራ፤ ጥሩ መዓዛ ያለውና ጠንካራ የመለጠጥ ባህሪ ያለው።'
    },
    signatureDishes: [
      {
        name: 'Tihlo',
        amharic: 'ጥሕሎ',
        description: 'Roasted roasted barley balls dipped in spicy berbere meat stew.'
      },
      {
        name: 'Alicha Beg Wat',
        amharic: 'አልጫ የበግ ወጥ',
        description: 'Turmeric and ginger lamb stew simmered with garlic.'
      }
    ],
    traditionHighlight: {
      en: 'Terraced mountain farming practices dating back to the Aksumite kingdom maximize rainwater retention for grain cultivation.',
      am: 'ከአክሱም ዘመነ መንግሥት ጀምሮ የነበረው የተራራ ላይ እርከን ግብርና የዝናብ ውሀን ለጤፍ ማልሚያ ያቆያል።'
    },
    coordinates: { x: 46, y: 18 }
  },
  {
    id: 'sidama_snnpr',
    name: {
      en: 'Sidama & Southern Highlands',
      am: 'ሲዳማና ደቡብ አካባቢዎች'
    },
    capital: 'Hawassa',
    geography: 'Lush green agroforestry, coffee forests, fertile volcanic rift',
    grainSpecialty: {
      en: 'Teff intercropped with Enset (False Banana) and highland legumes',
      am: 'ጤፍ ከእንሰትና ከጥራጥሬ ጋር ተቀናጅቶ የሚመረትበት'
    },
    injeraCharacteristics: {
      en: 'Complementary traditions where soft teff injera is served alongside steam-baked Kocho flatbreads.',
      am: 'ለስላሳ የጤፍ እንጀራ ከእንሰት (ቆጮ) ጋር ተጣምሮ የሚቀርብበት ባህል።'
    },
    signatureDishes: [
      {
        name: 'Bulla & Kitfo',
        amharic: 'ክትፎ',
        description: 'Minced prime beef gently warmed in niter kibbeh, mitmita, and ayib.'
      },
      {
        name: 'Qinch\'e',
        amharic: 'ቂንጬ',
        description: 'Cracked wheat or teff porridge seasoned with herbal butter.'
      }
    ],
    traditionHighlight: {
      en: 'Agroforestry traditions create a rich microclimate where wild birds, coffee trees, and teff fields coexist in balance.',
      am: 'የደንና የግብርና ውህደት ለጤፍና ለቡና ተክል ተፈጥሯዊ ጥበቃን ይሰጣል።'
    },
    coordinates: { x: 44, y: 64 }
  },
  {
    id: 'harari',
    name: {
      en: 'Harari & Eastern Terraces',
      am: 'ሐረሪና ምስራቅ አካባቢዎች'
    },
    capital: 'Harar Jugol',
    geography: 'Ancient walled fortress city, eastern hills, spice gardens',
    grainSpecialty: {
      en: 'Highland Teff blended with sorghum (Mashinga) and aromatic spices',
      am: 'የደጋ ጤፍ ከማሽላና ከቅመማ ቅመሞች ጋር'
    },
    injeraCharacteristics: {
      en: 'Slightly golden, infused with hints of black cumin (Tikur Azmud), paired with rich spiced stews.',
      am: 'በጥቁር አዝሙድ የሚጣፍጥ፣ ወርቃማ መልክ ያለውና ከጣፋጭ ወጦች ጋር የሚቀርብ።'
    },
    signatureDishes: [
      {
        name: 'Harari Hulbat Marakh',
        amharic: 'ሁልበት መረቅ',
        description: 'Spiced fenugreek, mutton, and vegetable broth.'
      },
      {
        name: 'Geber Tibs',
        amharic: 'ጥብስ',
        description: 'Crisp seared meat with cardamom, coriander, and chili.'
      }
    ],
    traditionHighlight: {
      en: 'The historic UNESCO walled city of Harar is famed for its distinctive spice blends that perfume both dough and stews.',
      am: 'የጥንቷ የሐረር ጁጎል ከተማ በቅመማ ቅመሞቿና በልዩ የምግብ ባህሏ ትታወቃለች።'
    },
    coordinates: { x: 68, y: 44 }
  }
];
