import { Utensil } from '@/types';

export const utensils: Utensil[] = [
  {
    id: 'mitad',
    name: {
      en: 'Mitad',
      am: 'ምጣድ'
    },
    transliteration: 'Mit\'ad',
    category: 'cooking',
    materials: ['Fired Red Clay', 'Iron Coils (Electric)', 'Earthenware Slag'],
    description: {
      en: 'The circular flat baking griddle on which injera is cooked. Traditional versions are heavy earthenware heated over wood fires; modern versions incorporate electric heating elements while preserving the clay baking slab.',
      am: 'እንጀራ የሚጋገርበት ክብ የሸክላ ሳህን። በጥንቱ ጊዜ በእንጨት እሳት ይጋገር የነበረ ሲሆን፤ አሁን ላይ በኤሌክትሪክ የሚሰሩ ዘመናዊ ምጣዶች አሉ።'
    },
    culturalSignificance: {
      en: 'The mitad is considered the beating heart of the Ethiopian household. In traditional folklore, a well-seasoned, smooth mitad represents domestic tranquility and abundance.',
      am: 'ምጣድ የቤቱ ዋነኛ በረከት ተደርጎ ይቆጠራል። የተስተካከለና የማይዝ ምጣድ የሰላምና የብልጽግና ምልክት ነው።'
    },
    traditionalCraftingNotes: {
      en: 'Clay mitads are molded from mineral-rich volcanic red clay, polished with river stones, and baked in pit kilns.',
      am: 'ከቀይ አፈርና ሸክላ በጥበብ ተቦክቶ፣ በድንጋይ ተለስኖ በእሳት ተተኩሶ የሚዘጋጅ ነው።'
    }
  },
  {
    id: 'akambalo',
    name: {
      en: 'Akambalo (Lid)',
      am: 'አክምባሎ'
    },
    transliteration: 'Akambalo',
    category: 'cooking',
    materials: ['Hand-Woven Straw', 'Enamelled Metal', 'Clay'],
    description: {
      en: 'The large conical lid placed over the mitad while injera cooks. Its high dome captures escaping steam, allowing the upper surface of the injera to cook through without touching the dough.',
      am: 'በምጣድ ላይ የሚደፋ ኮረብታ መሳይ መክደኛ። እንፋሎትን አፍኖ የእንጀራውን የላይኛውን ገጽታ በእኩል ያበስለዋል።'
    },
    culturalSignificance: {
      en: 'Traditional straw-woven akambalos feature concentric geometric patterns and are prized for absorbing excess condensation so water droplets do not drip back and mar the injera surface.',
      am: 'ከሳር የተሰሩ አክምባሎዎች እንፋሎቱ ጠብታ ሆኖ እንጀራው ላይ እንዳይወርድና ውበቱን እንዳያበላሸው ውሀውን የመምጠጥ ተፈጥሯዊ ባሕርይ አላቸው።'
    }
  },
  {
    id: 'sefed',
    name: {
      en: 'Sefed (Woven Mat)',
      am: 'ሰፌድ'
    },
    transliteration: 'Sefed / Mazoriya',
    category: 'preparation',
    materials: ['Sun-Dried Grass (Sindedo)', 'Palm Fiber', 'Natural Dyes'],
    description: {
      en: 'A wide, circular flat woven tray made of durable highland grass. Used for winnowing grains and expertly lifting cooked injera off the hot mitad.',
      am: 'ከስንደዶ ሳር የተሸረበ ሰፊና ጠፍጣፋ ባህላዊ እቃ። እህል ለማበጠርና የበሰለውን እንጀራ ከምጣድ ላይ ለማንሳት ያገለግላል።'
    },
    culturalSignificance: {
      en: 'Every Ethiopian home keeps several sefeds. Their intricate coil weaving exhibits ancestral patterns passed down through maternal lineages.',
      am: 'በየቤቱ የሚገኝ ሲሆን፤ የእናቶች የሽመናና የእደ-ጥበብ ውበት ማሳያ ነው።'
    }
  },
  {
    id: 'mesob',
    name: {
      en: 'Mesob (Dining Table)',
      am: 'መሶብ'
    },
    transliteration: 'Mesob',
    category: 'serving',
    materials: ['Dyed Highland Grass', 'Reed Strips', 'Leather trim'],
    description: {
      en: 'The iconic hourglass-shaped woven dining table with a conical lid. It serves as both a warm storage vessel and the communal centerpiece around which family and guests sit to eat.',
      am: 'የኢትዮጵያዊያን መለያ የሆነ ውብ ቅርፅ ያለው የሳር መመገቢያ ጠረጴዛ። እንጀራን ለማሞቅና ለጋራ ማዕድ ያገለግላል።'
    },
    culturalSignificance: {
      en: 'The Mesob is the ultimate symbol of Ethiopian unity, hospitality, and communal love. Uncovering the Mesob is a ceremony of blessing and welcoming.',
      am: 'መሶብ የአንድነት፣ የፍቅርና የእንግዳ ተቀባይነት ታላቅ ምልክት ነው። መሶብ ሲከፈት በረከት ይወርዳል።'
    }
  },
  {
    id: 'borena',
    name: {
      en: 'Borena / Dist',
      am: 'ቦረና / ድስት'
    },
    transliteration: 'Borena',
    category: 'storage',
    materials: ['Unglazed Terracotta Clay'],
    description: {
      en: 'A deep, round earthenware pot used for kneading, fermenting, and storing the sourdough teff batter.',
      am: 'ሊጥ የሚቦካበትና የሚብላላበት ጥልቅ የሸክላ እቃ።'
    },
    culturalSignificance: {
      en: 'Retains steady ambient temperature during chilly highland nights, protecting the delicate sourdough ecosystem.',
      am: 'ቀዝቃዛ በሆነው የደጋ አየር ወቅት እንኳን የሊጡ ሙቀት ሳይቀንስ እርሾው እንዲራባ ያደርጋል።'
    }
  },
  {
    id: 'sifet',
    name: {
      en: 'Sifet (Flour Sifter)',
      am: 'ስፌት'
    },
    transliteration: 'Sifet',
    category: 'preparation',
    materials: ['Woven Horsehair / Fine Mesh / Bamboo'],
    description: {
      en: 'A delicate fine-mesh sieve used to separate bran and impurities from freshly ground teff flour, ensuring a cloud-soft batter.',
      am: 'የተፈጨውን የጤፍ ዱቄት ከገለባና ከአሸዋ ለመለየት የሚያገለግል ስስ ማበጠሪያ።'
    },
    culturalSignificance: {
      en: 'Sifting requires focused mindfulness, ensuring only the purest grain enters the dough.',
      am: 'ዱቄቱን በጥንቃቄ በማበጠር ጥራት ያለው እንጀራ ለማዘጋጀት ወሳኝ ነው።'
    }
  },
  {
    id: 'guchiye',
    name: {
      en: 'Guchiye / Chilfa (Ladle)',
      am: 'ጉቺዬ / ጭልፋ'
    },
    transliteration: 'Guchiye / Chilfa',
    category: 'cooking',
    materials: ['Hollow Dried Calabash Gourd', 'Carved Wood', 'Horn'],
    description: {
      en: 'A wide-lipped gourd ladle used to scoop, aerate, and pour the batter onto the mitad in a smooth, unbroken circular stream.',
      am: 'ከቅል ወይም ከእንጨት የሚሰራ፣ ሊጥ ለማንሳትና ምጣድ ላይ በክብ ለማፍሰስ የሚያገለግል ጭልፋ።'
    },
    culturalSignificance: {
      en: 'Crafted from natural dried gourds, its curved lip allows total control over liquid velocity during the spiral pour.',
      am: 'ከተፈጥሮ ቅል የተዘጋጀ ሲሆን፤ ሊጡ በምጣድ ላይ ሲፈስስ መጠኑንና ፍጥነቱን ለመቆጣጠር አመቺ ነው።'
    }
  }
];
