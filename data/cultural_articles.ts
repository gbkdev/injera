import { CulturalArticle } from '@/types';

export const culturalArticles: CulturalArticle[] = [
  {
    id: 'art-01',
    slug: 'ancient-grain-of-the-horn',
    title: {
      en: 'Teff: The 3,000-Year Agronomic Miracle of the Ethiopian Highlands',
      am: 'ጤፍ፡ የ3,000 ዓመታት የኢትዮጵያ ከፍተኛ ቦታዎች የግብርና ተዓምር'
    },
    category: 'agriculture',
    author: 'Ethnobotany & Heritage Research Team',
    readTime: '6',
    publishedDate: '2026-08',
    leadParagraph: {
      en: 'Eragrostis tef is one of humanity’s most astonishing indigenous domesticates. Originating in the misty, volcanic plateau of Ethiopia between 4000 and 1000 BCE, this microscopic grain sustained civilizations while resisting crop diseases and harsh climatic shifts.',
      am: 'ጤፍ ከ4,000 እስከ 1,000 ዓመተ ዓለም ጀምሮ በኢትዮጵያ ከፍተኛ ስፍራዎች የለማ፣ የሰው ልጅ እጅግ ጥንታዊና ድንቅ የእህል ሀብት ነው። በድርቅና በተለያዩ የአየር ንብረቶች ውስጥ በጽናት በማደግ ታሪክን ተሻግሯል።'
    },
    sections: [
      {
        heading: {
          en: 'A Grain Smaller Than a Pinhead',
          am: 'ከመርፌ ራስ የማትበልጥ ቅንጣት'
        },
        content: {
          en: 'The name "teff" stems from the Ethio-Semitic root "Teffa," meaning "lost"—because if a single grain is dropped on the soil, its microscopic size makes it virtually impossible to find. Over 150 grains of teff weigh as much as a single kernel of wheat. Despite this diminutive stature, its nutrient density is extraordinary: rich in prebiotic dietary fiber, slow-release resistant starch, iron, calcium, magnesium, and complete essential amino acids.',
          am: 'ጤፍ የሚለው ቃል "ጠፋ" ከሚለው ቃል ጋር የተያያዘ ነው ተብሎ ይታመናል፤ ምክንያቱም አንዲት የጤፍ ቅንጣት መሬት ላይ ከወደቀች በዓይን ለማግኘት እጅግ አስቸጋሪ ስለሆነች ነው።'
        }
      },
      {
        heading: {
          en: 'Agronomic Resilience in Highland Soil',
          am: 'በከፍተኛ ቦታዎች አፈር ላይ ያለው የመቋቋም አቅም'
        },
        content: {
          en: 'Teff thrives in diverse agro-ecological zones, from waterlogged vertisols (black soils) to drought-prone highland terraces between 1,800 and 2,800 meters altitude. Ethiopian smallholder farmers developed sophisticated rotating crop systems, pairing teff with legumes (like chickpea and faba bean) to naturally replenish nitrogen in the soil without synthetic chemicals.',
          am: 'ጤፍ ከ1,800 እስከ 2,800 ሜትር ከፍታ ባላቸው ቦታዎች፤ በጥቁር አፈርም ሆነ በደረቃማ መሬቶች ላይ በጥንካሬ ይበቅላል። አርሶ አደሮች አፈሩ ለምነቱን እንዳያጣ ከሽምብራና ባቄላ ጋር እያፈራረቁ ያመርቱታል።'
        },
        quote: {
          text: 'Teff is not merely a cereal; it is an ecological covenant between the Ethiopian farmer, the volcanic soil, and the highland rains.',
          source: 'Ethiopian Biodiversity & Agricultural Research Institute'
        }
      }
    ],
    sources: [
      {
        title: 'Teff: Chemistry and Technology',
        authorOrInstitution: 'Bultosa, G. & Taylor, J.R.N. (AACC International)',
        year: '2004'
      },
      {
        title: 'Lost Crops of Africa: Volume I: Grains',
        authorOrInstitution: 'National Research Council (National Academies Press)',
        year: '1996'
      },
      {
        title: 'Domestication and Diversity of Teff (Eragrostis tef)',
        authorOrInstitution: 'Vavilov Institute of Plant Industry',
        year: '1951'
      }
    ]
  },
  {
    id: 'art-02',
    slug: 'microbiology-of-ersho',
    title: {
      en: 'The Living Alchemy: Microbiology & Chemistry of Ersho Fermentation',
      am: 'የእርሾ ረቂቅ ሳይንስ፡ ባዮሎጂያዊና ኬሚካላዊ የመፍላት ሂደት'
    },
    category: 'science',
    author: 'Food Science & Fermentation Working Group',
    readTime: '7',
    publishedDate: '2026-08',
    leadParagraph: {
      en: 'Authentic injera fermentation is a complex spontaneous multi-stage wild microbial succession. Over 72 to 96 hours, billions of lactic acid bacteria and yeasts transform raw starch into an acidic, aromatic, bio-functional sourdough sponge.',
      am: 'የእንጀራ ሊጥ መፍላት በተፈጥሯዊ የባክቴሪያዎችና የእርሾዎች ቅንጅት የሚከናወን ነው። በ72 ሰዓታት ውስጥ ሊጡ ደስ የሚል ቃና እና አየር ይይዛል።'
    },
    sections: [
      {
        heading: {
          en: 'Microbial Succession: Bacteria to Wild Yeasts',
          am: 'የረቂቅ ተህዋሲያን ተከታታይ ሂደት'
        },
        content: {
          en: 'In the first 24 hours, heterofermentative lactic acid bacteria (predominantly Weissella confusa, Lactobacillus plantarum, and Leuconostoc mesenteroides) dominate the mash, fermenting glucose and maltose into lactic and acetic acid. This drops the pH from 6.2 to below 4.0, inhibiting harmful pathogens while creating the perfect acidic habitat for acid-tolerant wild yeasts (such as Candida krusei, Pichia anomala, and Saccharomyces cerevisiae) to thrive in days 2 and 3.',
          am: 'በመጀመሪያዎቹ 24 ሰዓታት ውስጥ ጠቃሚ የላክቲክ አሲድ ባክቴሪያዎች የሊጡን ፒኤች (pH) ዝቅ በማድረግ ጀርሞች እንዳይራቡ ያደርጋሉ፤ ይህም ለዱር እርሾዎች መራቢያ አመቺ ይሆናል።'
        }
      },
      {
        heading: {
          en: 'The Science of Absit: Why Starch Gelatinization Matters',
          am: 'የአብሲት ሳይንስ፡ የስታርች ማጣበቅ አስፈላጊነት'
        },
        content: {
          en: 'Because teff is completely gluten-free, it lacks the viscoelastic gluten matrix that wheat dough uses to trap gas. Ethiopian culinary science solved this through Absit: by boiling a small aliquot of batter, amylose starches gelatinize into a continuous viscous network. When re-incorporated, this gel traps expanding CO2 micro-bubbles during baking, generating the iconic "Ayn" (honeycomb sponge structure) without requiring any artificial gums or additives.',
          am: 'ጤፍ ግሉተን ስለሌለው አየር የመያዝ አቅም የለውም። አብሲት ሲፈላ ግን የስታርች ሞለኪውሎቹ ተጣብቀው አየሩን ይይዛሉ፤ ይህም በምጣዱ ላይ ሲጋገሩ የእንጀራው ዓይን እንዲፈጠር ያደርጋል።'
        }
      }
    ],
    sources: [
      {
        title: 'Microbial dynamics during traditional teff injera fermentation',
        authorOrInstitution: 'Ashenafi, M. (Journal of Food Science & Technology)',
        year: '1994'
      },
      {
        title: 'Nutritional enhancement and phytate degradation in fermented Eragrostis tef',
        authorOrInstitution: 'Food Chemistry Journal',
        year: '2012'
      }
    ]
  },
  {
    id: 'art-03',
    slug: 'mesob-gursha-communal-dining',
    title: {
      en: 'The Mesob & Gursha: Sacred Hospitality and Communal Kinship',
      am: 'መሶብና ጉርሻ፡ የተቀደሰ መስተንግዶ እና የፍቅር አንድነት'
    },
    category: 'hospitality',
    author: 'Ethiopian Cultural Studies Archive',
    readTime: '5',
    publishedDate: '2026-08',
    leadParagraph: {
      en: 'In Ethiopian civilization, sharing a meal is an act of covenant, peace, and mutual vulnerability. At the physical and spiritual center of the gathering stands the Mesob—the hand-woven architectural table that turns dining into communion.',
      am: 'በኢትዮጵያ ባህል ማዕድ መጋራት የሰላም፣ የፍቅርና የአንድነት መገለጫ ነው። መሶብ ደግሞ የዚህ የጋራ ማዕድ ዋነኛ ምልክት ነው።'
    },
    sections: [
      {
        heading: {
          en: 'The Architecture of the Mesob',
          am: 'የመሶብ ጥበብና አሰራር'
        },
        content: {
          en: 'A traditional Mesob is hand-coiled from highland grasses (Sindedo and Ketema) harvested after the rainy season. Master weavers dye the grass with natural plant extracts to create intricate diamond, spiral, and chevron motifs. The high conical lid keeps the injera warm and steamy until guests are gathered and blessings are spoken.',
          am: 'መሶብ ከስንደዶና ቀጤማ ሳሮች በእጅ የሚሸረብ ውብ የኪነ-ጥበብ ስራ ነው። የተለያየ ቀለም ያላቸው የተፈጥሮ ቀለሞች ለውበቱ ያገለግላሉ።'
        }
      },
      {
        heading: {
          en: 'Gursha: Feeding with Love and Honor',
          am: 'ጉርሻ፡ በፍቅርና በክብር ማጉረስ'
        },
        content: {
          en: 'Gursha (ጉርሻ) is the gesture of wrapping a savory mouthful of wat and vegetables in a piece of injera and gently placing it into the mouth of a dining companion. It is offered to parents, elders, dear friends, and honored guests. To offer a gursha is to say: "Your well-being is my joy." To receive it with a warm bow of the head is to honor that bond. Customarily, gursha is performed two or three times, symbolizing steadfast loyalty.',
          am: 'ጉርሻ እንጀራን ከወጥ ጋር ጠቅልሎ ለወዳጅ፣ ለወላጅ ወይም ለእንግዳ በአክብሮት ማጉረስ ነው። ጉርሻ ፍቅርን፣ ክብርንና መተሳሰብን ያሳያል።'
        }
      }
    ],
    sources: [
      {
        title: 'Feast and Fasts: A History of Food in Ethiopia',
        authorOrInstitution: 'McCann, James C. (Ohio University Press)',
        year: '2010'
      },
      {
        title: 'Ethiopian Traditional Foodways and Commensality',
        authorOrInstitution: 'Addis Ababa University Institute of Ethiopian Studies',
        year: '2008'
      }
    ]
  }
];
