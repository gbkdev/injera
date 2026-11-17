import { Stage } from '@/types';

export const stages: Stage[] = [
  {
    id: 'stage-01',
    stageNumber: 1,
    title: {
      en: 'Teff (ጤፍ) — The Ancient Grain',
      am: 'ጤፍ — ጥንታዊው የኢትዮጵያ እህል'
    },
    subtitle: {
      en: 'Eragrostis tef: 3,000 years of indigenous cultivation in the Ethiopian highlands',
      am: 'የ3,000 ዓመታት ታሪክ ያለው የሀበሻ ምድር በረከት'
    },
    durationEstimate: 'Harvest to Milling',
    summary: {
      en: 'Teff is one of the world\'s smallest grains, packed with iron, calcium, and protein. Native to the Ethiopian highlands, it is the sacred foundation of authentic injera.',
      am: 'ጤፍ በዓለም ላይ ካሉ እጅግ ጥቃቅን እህሎች አንዱ ሲሆን በብረት፣ ካልሲየም እና ፕሮቲን የበለጸገ ነው። ከግሉተን ነፃ የሆነ ብቸኛ የኢትዮጵያ ኩራት ነው።'
    },
    description: {
      en: 'Over three millennia ago, Ethiopian highland farmers domesticated Eragrostis tef. The grain comes in several traditional varieties: Nech (white/ivory teff, traditionally prized for celebratory occasions), Tikur (brown/red teff, earthy, iron-dense), and Sergegna (a mixed blend known for balanced aroma and texture).',
      am: 'ከሦስት ሺህ ዓመታት በፊት በኢትዮጵያ ከፍተኛ ቦታዎች የጀመረው የጤፍ እርሻ፤ ነጭ ጤፍ፣ ጥቁር ጤፍ እና ሰርገኛ (የሁለቱ ቅልቅል) በሚባሉ ዝርያዎች ይታወቃል።'
    },
    scientificInsight: {
      en: 'Teff lacks gluten-forming proteins (gliadin and glutenin), meaning elasticity must instead be generated via microbial polysaccharides and a cooked starch gel called absit.',
      am: 'ጤፍ ግሉተን ስለሌለው የእንጀራው ልስላሴና ጥንካሬ የሚገኘው በእርሾ አማካኝነት በሚፈጠሩ የተፈጥሮ ፖሊሳካራይዶች እና አብሲት በሚባል የበሰለ የስታርች ማጣበቂያ ነው።'
    },
    culturalInsight: {
      en: 'In traditional households, grain selection is a deliberate craft. The grain is carefully winnowed and taken to the millstone (wofcho), ground to a fine velvet powder without burning.',
      am: 'በኢትዮጵያ ባህል ጤፍ መርጦ ማዘጋጀት፣ ማበጠርና በወፍጮ በሚገባ እንዲደቅ ማድረግ የእንጀራውን ስኬት የሚወስን የመጀመሪያው ጥበብ ነው።'
    },
    proverbs: {
      amharic: 'ጤፍ በቅንጣት፣ ፍቅር በልብ።',
      transliteration: 'Teff be\'qint\'at, fikir be\'lib.',
      meaning: 'Teff is measured by the tiny grain; love is measured in the depth of the heart.'
    },
    tools: ['sifet', 'dist'],
    ingredients: ['White Teff (ነጭ ጤፍ)', 'Brown Teff (ጥቁር ጤፍ)', 'Pure Mountain Water (ውሃ)'],
    tips: {
      en: [
        'Inspect the grain under sunlight to ensure it is free from husks and gravel.',
        'Milling should produce a silky, micro-fine powder that feels cool to the touch.',
        'Blends like Sergegna offer optimal fermentation activity and resilient crumb structure.'
      ],
      am: [
        'ጤፉን በፀሐይ ብርሃን በሚገባ መርምሮ ከአሸዋና ከገለባ ማፅዳት ያስፈልጋል።',
        'ወፍጮው ሳይሞቅና ዱቄቱ ሳይቃጠል በለሰለሰ ሁኔታ መፈጨት አለበት።',
        'ሰርገኛ ጤፍ ለእርሾ መፍላትና ለዓይኑ ውበት እጅግ ተመራጭ ነው።'
      ]
    },
    variationsNote: {
      en: 'While 100% teff is the gold standard in central and northern highlands, regional practices in drier lowlands historically combine teff with sorghum (mashinga) or barley (gebs).',
      am: 'በደጋው አካባቢ 100% ጤፍ የተለመደ ቢሆንም፤ በቆላማ ቦታዎች ከማሽላ ወይም ከገብስ ጋር በማደባለቅ የሚዘጋጁ ባህላዊ የእንጀራ ዓይነቶች አሉ።'
    },
    colorTheme: '#C59334'
  },
  {
    id: 'stage-02',
    stageNumber: 2,
    title: {
      en: 'Preparation (ዝግጅት) — Sacred Utensils',
      am: 'ዝግጅት — የጓዳ ዕቃዎችና ማዘጋጀት'
    },
    subtitle: {
      en: 'The clay pots, woven sieves, and heirloom tools of the traditional kitchen',
      am: 'የሸክላ፣ የሳርና የእንጨት ባህላዊ የጓዳ ቁሳቁሶች'
    },
    durationEstimate: '30 Minutes',
    summary: {
      en: 'Before water meets flour, every tool must be cleansed and seasoned. The mixing pot (borena or dist) and sieves (sifet) carry the legacy of ancestral kitchens.',
      am: 'ዱቄቱ ከመቦካቱ በፊት የሸክላ ቦረናው፣ ማበጠሪያው ስፌት እና መክደኛው አክምባሎ በንጽሕና ይዘጋጃሉ።'
    },
    description: {
      en: 'Preparing for injera is an intentional ceremony. The sifted flour is placed into a large terracotta earthenware pot (Borena/Dist). Traditional clay vessels provide ideal thermal mass and porous micro-environments for symbiotic fermentation flora to flourish.',
      am: 'የተበጠረው የጤፍ ዱቄት በሸክላ ቦረና ውስጥ ይደረጋል። የሸክላ እቃዎች ለሙቀትና ለእርሾው ረቂቅ ተህዋሲያን መራቢያ እጅግ ተስማሚ ናቸው።'
    },
    scientificInsight: {
      en: 'Unglazed earthenware retains microscopic colonies of previous lactobacilli and yeasts inside its pores, acting as a natural inoculation bioreactor.',
      am: 'ያልተለሰነሰ የሸክላ እቃ ቀዳዳዎች ውስጥ የቀደሙ ጠቃሚ የእርሾ ባክቴሪያዎች ስለሚቀመጡ ተፈጥሯዊ የመፍላት ሂደትን ያፋጥናል።'
    },
    culturalInsight: {
      en: 'A kitchen\'s borena is treated with deep respect, often handed down through generations from mother to daughter as a living symbol of household nourishment.',
      am: 'የሸክላ ቦረና ከእናት ወደ ልጅ የሚተላለፍ፣ የቤተሰብ በረከትና የማዕድ ክብር ማሳያ ተደርጎ ይወሰዳል።'
    },
    proverbs: {
      amharic: 'የእናት ጓዳ፣ ለሁሉ በዳ።',
      transliteration: 'Ye\'inat gwada, lehulu beda.',
      meaning: 'A mother\'s pantry has abundance and warmth for everyone.'
    },
    tools: ['sifet', 'borena', 'dist', 'akambalo'],
    ingredients: ['Sifted Teff Flour (የተነጠረ የጤፍ ዱቄት)', 'Lukewarm Spring Water'],
    tips: {
      en: [
        'Use double-sifted flour to eliminate clumps and aerate the starches.',
        'Ensure the vessel is completely free from soap residues, which harm yeast cultures.'
      ],
      am: [
        'ዱቄቱ እንዳይጓጉል በሚገባ በስፌት መንጠር አለበት።',
        'የቦካበት እቃ እርሾውን ሊጎዳ ከሚችል ሳሙና የፀዳ መሆን አለበት።'
      ]
    },
    colorTheme: '#B85C38'
  },
  {
    id: 'stage-03',
    stageNumber: 3,
    title: {
      en: 'Mixing (ማቡካት) — Kneading the Dough',
      am: 'ማቡካት — የሊጡ የመጀመሪያ ጥበብ'
    },
    subtitle: {
      en: 'Kneading teff flour into a thick, elastic base dough with rhythmic pressure',
      am: 'ዱቄቱን ከውሃ ጋር አዋህዶ በጉልበትና በጥበብ ማሸት'
    },
    durationEstimate: '20–30 Minutes',
    summary: {
      en: 'Unlike wheat doughs that rely on gluten webbing, teff requires methodical hand kneading to hydrate starch granules and evenly disperse wild yeast colonies.',
      am: 'የጤፍ ዱቄት ውሀ እየተጨመረበት በደንብ እስኪዋሃድና እስኪለሰልስ ድረስ በእጅ ይታሻል።'
    },
    description: {
      en: 'Water is added in measured increments. The baker works the dense dough with rhythmic circular strokes, breaking down air pockets and achieving a smooth, taffy-like consistency before the initial starter culture (ersho) is incorporated.',
      am: 'ውሃው በጥንቃቄ እየተጨመረ ሊጡ ወጥ የሆነ ልስላሴ እንዲኖረው በክብ እንቅስቃሴ ይታሻል። የቀደመው እርሾ የሚጨመረው በዚህ ጊዜ ነው።'
    },
    scientificInsight: {
      en: 'High mechanical shear helps break open damaged starch granules, releasing maltodextrins that feed Lactobacillus and Candida yeast strains during early fermentation.',
      am: 'ሊጡ በሚገባ ሲታሽ በውስጡ ያሉት ስታርቾች ለእርሾ ተህዋሲያን ምግብነት አመቺ ይሆናሉ።'
    },
    culturalInsight: {
      en: 'The act of bukat (kneading) is an art of patience. Traditional bakers say the touch of the baker\'s warm hand confers blessing (baraka) upon the family\'s daily bread.',
      am: 'ሊጥ ማቡካት የትዕግሥት ውጤት ነው። የእጅ ሙቀትና ጥበብ ለእንጀራው በረከት እንደሚሰጥ ይታመናል።'
    },
    tools: ['borena', 'guchiye'],
    ingredients: ['Teff Flour (ጤፍ)', 'Water (ውሃ)', 'Starter Ersho Culture (እርሾ)'],
    tips: {
      en: [
        'Knead until the dough leaves the walls of the clay pot cleanly.',
        'Keep water temperature between 28°C and 32°C for optimal microbial revival.'
      ],
      am: [
        'ሊጡ ከሸክላው ግድግዳ እስኪላቀቅ ድረስ በሚገባ ማሸት።',
        'የውሃው ሙቀት ለብ ያለ መሆን አለበት።'
      ]
    },
    colorTheme: '#A37424'
  },
  {
    id: 'stage-04',
    stageNumber: 4,
    title: {
      en: 'Fermentation (ማብላላት) — Microbial Alchemy',
      am: 'ማብላላት — የተፈጥሮ እርሾ ጥበብ'
    },
    subtitle: {
      en: 'A 3 to 4-day symbiotic symphony of lactic acid bacteria and wild yeasts',
      am: 'ለ3 እና 4 ቀናት የሚቆይ ረቂቅ የመፍላትና የመኮምጠጥ ሂደት'
    },
    durationEstimate: '3 to 4 Days',
    summary: {
      en: 'During days of quiet rest, wild Lactobacillus sanfranciscensis and yeasts ferment the sugars, lowering the pH, producing the signature pleasant tang and carbon dioxide gas.',
      am: 'ሊጡ ተከድኖ በሚቆይባቸው ቀናት ውስጥ ጠቃሚ ባክቴሪያዎችና እርሾዎች ሊጡን ያቦኩታል፤ ደስ የሚል መራራ ጣዕምና አየር እንዲይዝ ያደርጉታል።'
    },
    description: {
      en: 'As the days progress, a dramatic transformation unfolds. By Day 2, active bubbling begins. By Day 3, a clear, yellowish-brown liquid called "Ayr" (አየር) rises to the surface, carrying bitter compounds and signifying mature lactic acid development.',
      am: 'በሁለተኛውና በሦስተኛው ቀን አረፋ መፍጠር ይጀምራል፤ በላዩ ላይ "አየር" የሚባል ቢጫ ፈሳሽ ይተኛል። ይህ ፈሳሽ ተቀድቶ ይደፋል።'
    },
    scientificInsight: {
      en: 'pH drops from ~6.2 to ~3.8. Phytic acid (an anti-nutrient in grains) is degraded by phytase enzymes, unlocking bioavailable iron, zinc, and amino acids.',
      am: 'የአሲድ መጠኑ (pH) ወደ 3.8 ዝቅ ሲል በጤፉ ውስጥ ያለው የብረትና የካልሲየም ንጥረ-ነገር በሰውነታችን በቀላሉ እንዲመጠጥ ያደርገዋል።'
    },
    culturalInsight: {
      en: 'Fermentation timing depends on ambient weather—faster in the warm Rift Valley, slower in the misty highlands of Lalibela. Mothers know maturity by smelling the sweet-sour bouquet.',
      am: 'የመፍላቱ ፍጥነት እንደ አየሩ ሁኔታ ይወሰናል። እናቶች የደረሰ መሆኑን የሚያውቁት በደስ የሚለው ሽታው ነው።'
    },
    tools: ['borena', 'akambalo'],
    ingredients: ['Fermenting Teff Dough (የቦካ ሊጥ)', 'Air / Wild Microbiology (ተፈጥሯዊ እርሾ)'],
    tips: {
      en: [
        'Pour off the surface liquid (ayr) carefully before the next step.',
        'Keep the clay pot covered in a warm, draft-free spot wrapped in a clean cotton cloth.'
      ],
      am: [
        'በላዩ ላይ የተኛውን አየር በጥንቃቄ ቀድቶ ማፍሰስ።',
        'እቃውን በንጹሕ ጨርቅ ሸፍኖ ሞቅ ባለ ቦታ ማስቀመጥ።'
      ]
    },
    colorTheme: '#7E551A'
  },
  {
    id: 'stage-05',
    stageNumber: 5,
    title: {
      en: 'Absit (አብሲት) — The Starch Catalyst',
      am: 'አብሲት — የእንጀራው ወሳኝ ማጣበቂያ'
    },
    subtitle: {
      en: 'Cooking a portion of fermented batter into a shiny gel that gives injera its elasticity',
      am: 'ከሊጡ ቀንሶ በማፍላት የሚዘጋጅ ወሳኝ የእንጀራ ጥበብ'
    },
    durationEstimate: '1 Hour (Cooking + Cooling)',
    summary: {
      en: 'Absit is the indispensable scientific secret of Ethiopian baking. A small portion of fermented batter is boiled with water into a thick gelatinized pudding, then cooled and beaten back into the main pot.',
      am: 'አብሲት የእንጀራ የጀርባ አጥንት ነው። የተወሰነ ሊጥ ከውሃ ጋር ተፈልቶና ወፍሮ ከተቀዘቀዘ በኋላ ወደ ዋናው ሊጥ ይጨመራል።'
    },
    description: {
      en: 'Without gluten, teff batter cannot hold carbon dioxide bubbles during baking without collapsing. Absit solves this completely: boiling gelatinizes amylose and amylopectin molecules into a pliable matrix that binds the liquid into a pourable, silk-smooth batter.',
      am: 'አብሲት ካልተጣለ እንጀራው ይሰነጠቃል ወይም ዓይኑ አይወጣም። የበሰለው አብሲት ሊጡን በማጣበቅ በምጣዱ ላይ ሲፈስስ ውብ ሆኖ እንዲሰፋ ያደርገዋል።'
    },
    scientificInsight: {
      en: 'Thermal starch gelatinization occurs between 68°C and 78°C. Upon re-addition to the batter, second-stage fermentation triggers rapid gas expansion within hours.',
      am: 'ስታርቹ በሙቀት ሲበስል የሊጡን ፈሳሽ ወደ አንድ ወጥ ጄል ይቀይረዋል፤ ይህም እንጀራው ሲጋገር እንዳይቀደድ ያደርገዋል።'
    },
    culturalInsight: {
      en: '"Without absit, there is no injera." If an injera turns out brittle or "blind" (without eyes), elders will gently say "Absit ansewatal" (it lacked absit).',
      am: 'እንጀራ ዓይን ካላወጣ ወይም ከደረቀ "አብሲት አንሶታል" ይባላል። አብሲት የጓዳ ባለሙያ መለኪያ ነው።'
    },
    tools: ['dist', 'guchiye'],
    ingredients: ['Fermented Teff Slurry (ሊጥ)', 'Boiling Water (የፈላ ውሃ)'],
    tips: {
      en: [
        'Stir continuously while boiling absit to prevent scorching the bottom.',
        'Let the absit cool to lukewarm before mixing back into the main pot to avoid killing live yeast.'
      ],
      am: [
        'አብሲቱ ሲፈላ እንዳያር ያለማቋረጥ ማማሰል።',
        'እርሾው እንዳይሞት አብሲቱ ለብ እስኪል አቀዝቅዞ መደባለቅ።'
      ]
    },
    colorTheme: '#C77B59'
  },
  {
    id: 'stage-06',
    stageNumber: 6,
    title: {
      en: 'Mitad (ምጣድ) — The Clay Hearth',
      am: 'ምጣድ — የጓዳው ማዕከል'
    },
    subtitle: {
      en: 'Conditioning the circular earthenware griddle to perfect uniform baking heat',
      am: 'ምጣዱን ማሞቅና በጎመንዘር ማለስለስ'
    },
    durationEstimate: '15–20 Minutes',
    summary: {
      en: 'The circular mitad is the altar of the kitchen. Traditional clay plates distribute heat evenly and are seasoned with crushed oilseeds (gomenzer) to create a natural non-stick surface.',
      am: 'ምጣድ የእንጀራ መጋገሪያ ሲሆን ሙቀቱ ወጥ እንዲሆን በጎመንዘር ወይም በኑግ ዘይት ይወለወላል።'
    },
    description: {
      en: 'A proper mitad must be heated gradually. The surface is rubbed with a cloth packet containing crushed rapeseed or flaxseed (Gomenzer/Telba). The natural oils polymerize under heat, preventing the delicate batter from sticking while imparting a clean earthy aroma.',
      am: 'ምጣዱ ሲግል በጨርቅ በተጠቀለለ የጎመንዘር ወይም የተልባ ፍሬ ይወለወላል። ይህ ተፈጥሯዊ ዘይት እንጀራው እንዳይዝ ያደርገዋል።'
    },
    scientificInsight: {
      en: 'Ideal surface temperature is approximately 190°C–210°C. Testing is traditionally performed by flicking water droplets: they should dance and evaporate instantly (the Leidenfrost effect).',
      am: 'የምጣዱ ሙቀት 200 ዲግሪ ሴንቲግሬድ አካባቢ መሆን አለበት። ውሀ ሲረጩበት ወዲያውኑ እንደ ኳስ መፍጠር አለበት።'
    },
    culturalInsight: {
      en: 'From ancestral wood-fired clay plates to the modern electric mitads used by the diaspora in Washington, London, and Melbourne, the mitad remains the cultural anchor of Ethiopian homes.',
      am: 'ከጥንቱ የእንጨት ምጣድ እስከ ዛሬው የኤሌክትሪክ ምጣድ ድረስ፤ ምጣድ በየትኛውም ዓለም ለሚኖሩ ኢትዮጵያውያን የቤታቸው ሙቀት ምልክት ነው።'
    },
    tools: ['mitad', 'akambalo', 'gomenzer_cloth'],
    ingredients: ['Rapeseed or Flaxseed Seasoning (ጎመንዘር/ተልባ)', 'Water droplets'],
    tips: {
      en: [
        'Wipe off excess oil residue before pouring so bubbles can form unobstructed.',
        'Ensure the mitad sits completely level so the batter does not pool to one side.'
      ],
      am: [
        'እንጀራው እንዳይዝ ምጣዱን በሚገባ ማስተካከልና መወልወል።',
        'ምጣዱ ሚዛኑን የጠበቀ መሆን አለበት ሊጡ ወደ አንድ ወገን እንዳያደላ።'
      ]
    },
    colorTheme: '#5C2211'
  },
  {
    id: 'stage-07',
    stageNumber: 7,
    title: {
      en: 'Spiral Pouring (ማፍሰስ) — The Circular Motion',
      am: 'ማፍሰስ — ክብ የፈሳሽ ጥበብ'
    },
    subtitle: {
      en: 'The graceful, unbroken spiral motion from the outer perimeter to the center',
      am: 'ሊጡን ከዳር ወደ መሃል በክብ እንቅስቃሴ የማፍሰስ ጥበብ'
    },
    durationEstimate: '5 to 8 Seconds',
    summary: {
      en: 'Pouring batter onto the hot mitad is the most iconic visual motion in Ethiopian cooking. Starting at the outer rim and spiraling smoothly inward, the batter creates a uniform circular disc.',
      am: 'የተዘጋጀውን ሊጥ በጭልፋ አንስቶ ከምጣዱ ጠርዝ ጀምሮ ወደ ውስጥ በክብ ቅርጽ በተረጋጋ እጅ ማፍሰስ።'
    },
    description: {
      en: 'Holding the pouring horn or bowl (Chilfa/Guchiye), the baker traces a smooth, unbroken concentric spiral. The batter sizzles as it strikes the seasoned surface, expanding evenly toward the center without overlapping into thick ridges.',
      am: 'ሊጡ በምጣዱ ላይ ሲፈስስ ደስ የሚል ድምፅ ያሰማል፤ ሳይወፍርና ሳይቀጥን በሙሉ ምጣዱ ላይ በእኩል መጠን ይዳረሳል።'
    },
    scientificInsight: {
      en: 'Centripetal flow and fluid dynamics ensure even thickness (~4mm), allowing steam to rise uniformly rather than creating uneven wet patches.',
      am: 'የፈሳሹ ተመጣጣኝ ውፍረት እንፋሎቱ በእኩል እንዲወጣና የእንጀራው ዓይን ወጥ ሆኖ እንዲከፈት ያስችለዋል።'
    },
    culturalInsight: {
      en: 'Watching an experienced elder pour injera is like witnessing a meditative dance. A smooth, confident pour is considered the hallmark of a master baker (Ye\'Injera Enat).',
      am: 'ሊጡን በተረጋጋ እጅ ማፍሰስ የእውነተኛ ባለሙያ እናት መገለጫ ነው።'
    },
    tools: ['mitad', 'guchiye'],
    ingredients: ['Aerated Teff Batter (የተብላላ የእንጀራ ሊጥ)'],
    tips: {
      en: [
        'Maintain a steady pouring speed; pausing creates visible seam lines in the finished bread.',
        'Aim for a thin, even sheet so steam can perforate the surface rapidly.'
      ],
      am: [
        'እጅን ሳያቆሙ በአንድ ፍጥነት ማፍሰስ።',
        'እንፋሎቱ በቶሎ እንዲወጣ ሊጡ ከመጠን በላይ እንዳይወፍር መጠንቀቅ።'
      ]
    },
    colorTheme: '#D2A859'
  },
  {
    id: 'stage-08',
    stageNumber: 8,
    title: {
      en: 'Cooking & Ayn (መጋገርና ዓይን) — The Eyes of Injera',
      am: 'መጋገርና ዓይን — የእንጀራው ውበት'
    },
    subtitle: {
      en: 'Thousands of honeycomb steam vents open before the lid traps aromatic steam',
      am: 'የእንጀራው ዓይን ሲከፈትና በአክምባሎ ሲታፈን'
    },
    durationEstimate: '2 to 3 Minutes',
    summary: {
      en: 'As heat rises from below, trapped carbon dioxide and steam burst upward, creating thousands of microscopic honeycomb perforations called "Ayn" (eyes). The conical lid (Akambalo) is placed on top to steam the upper surface.',
      am: 'የምጣዱ ሙቀት እንፋሎቱን ወደ ላይ ሲገፋው በሺህዎች የሚቆጠሩ ውብ ቀዳዳዎች (ዓይኖች) ይከፈታሉ፤ ከዚያም በአክምባሎ ተከድኖ በእንፋሎት ይበስላል።'
    },
    description: {
      en: 'The formation of Ayn (ዓይን / eyes) is the climax of injera making. Once the holes uniformly cover the surface from rim to center, the akambalo lid is placed firmly over the mitad. Trapped steam cooks the top to a tender, springy sponge without browning or drying.',
      am: 'ዓይኑ በሙሉ ምጣዱ ላይ በእኩል ከተከፈተ በኋላ አክምባሎው ይከደናል። የእንፋሎት አፈናው የላይኛውን ክፍል ያለመቃጠል በሚገባ ያበስለዋል።'
    },
    scientificInsight: {
      en: 'Rapid vapor pressure from starch gelatinization forces escaping steam to punch vertical micro-channels. When capped, 100°C steam cooks surface proteins into a soft, tear-resistant crumb.',
      am: 'የእንፋሎት ግፊት ቀዳዳዎቹን ሲከፍት፤ ክዳኑ ደግሞ እንፋሎቱን አፍኖ የእንጀራውን የላይኛውን ገጽታ ያለመድረቅ እንዲበስል ያደርገዋል።'
    },
    culturalInsight: {
      en: 'An injera without eyes is known as "Ayn-alba" (blind) and regarded as a culinary sadness. An injera with countless fine, uniform eyes is praised as a work of living art.',
      am: 'ዓይን የሌለው እንጀራ አይወደድም። ዓይኑ ዙሪያውን በእኩል ሲከፈት የእንጀራው ውበትና ልስላሴ ይደነቃል።'
    },
    tools: ['mitad', 'akambalo'],
    ingredients: ['Trapped Water Vapor / Steam'],
    tips: {
      en: [
        'Do not cover with the lid prematurely; allow the eyes to fully bloom across the entire surface first.',
        'Listen for the gentle change in steam hiss indicating the moisture has converted to cooked sponge.'
      ],
      am: [
        'ዓይኑ ሳይከፈት ቀድሞ መክደን እንጀራውን ያጠቁረዋል ወይም ያበላሸዋል።',
        'የእንፋሎቱን ድምፅ በማዳመጥ መብሰሉን ማወቅ ይቻላል።'
      ]
    },
    colorTheme: '#DEBF83'
  },
  {
    id: 'stage-09',
    stageNumber: 9,
    title: {
      en: 'Removing (ማውጣት) — The Sefed Transition',
      am: 'ማውጣት — በስፌት የማንሳት ጥበብ'
    },
    subtitle: {
      en: 'Lifting the hot, delicate injera effortlessly with the circular woven grass mat',
      am: 'የበሰለውን እንጀራ በሰፌድ ወይም በመዞሪያ ሳያበላሹ ማንሳት'
    },
    durationEstimate: '1 Minute',
    summary: {
      en: 'Using a circular woven grass mat called a Sefed (or Mazoriya), the hot injera is gently loosened along its edge, slid onto the mat, and transferred to cool on a wicker rack.',
      am: 'የበሰለው እንጀራ እንዳይቀደድ በሰፌድ ጠርዙ ተለቆ በጥንቃቄ ይነሳል፤ ከዚያም እንዲቀዘቅዝ ይደረጋል።'
    },
    description: {
      en: 'The baker uses deft finger motions to lift the outer rim of the injera. Sliding the flat woven sefed underneath in one continuous glide, the entire steamy bread lifts cleanly off the clay with zero tearing, revealing a smooth, pale underside and a cloud-soft spongy top.',
      am: 'ባለሙያዋ የጠረፉን ጫፍ በእጇ ካላቀቀች በኋላ ሰፌዱን ከስር በማስገባት በአንድ እንቅስቃሴ እንጀራውን ከምጣዱ ላይ ታነሳዋለች።'
    },
    scientificInsight: {
      en: 'Proper moisture balance and starch retrogradation prevent sticking. As the injera cools on the woven rack, surface moisture evaporates without condensing into sogginess.',
      am: 'እንጀራው በሰፌድ ላይ ሲቀዘቅዝ እርጥበቱ በእኩል ስለሚተን እንዳይቦካና እንዳይበላሽ ይጠብቀዋል።'
    },
    culturalInsight: {
      en: 'The aroma of freshly lifted injera filling the morning compound is one of the most comforting sensory memories for Ethiopians at home and around the world.',
      am: 'የትኩስ እንጀራ ሽታ ጠዋት ላይ በግቢው ሲናኝ ለሁሉም የቤተሰብ አባል ደስታንና ረሀብን ያመጣል።'
    },
    tools: ['sefed', 'mitad'],
    ingredients: ['Freshly Baked Hot Injera'],
    tips: {
      en: [
        'Allow each injera to cool completely before stacking to prevent them from adhering to one another.',
        'Keep the sefed clean and dry between bakes.'
      ],
      am: [
        'እንጀራው እርስ በእርሱ እንዳይጣበቅ አንዱ ከቀዘቀዘ በኋላ ሌላው በላዩ ላይ ይደረጋል።',
        'ሰፌዱ ንጹሕና ደረቅ መሆን አለበት።'
      ]
    },
    colorTheme: '#B85C38'
  },
  {
    id: 'stage-10',
    stageNumber: 10,
    title: {
      en: 'Serving & Culture (ማቅረብና ጉርሻ) — The Communal Feast',
      am: 'ማቅረብና ጉርሻ — የማዕድ አንድነት'
    },
    subtitle: {
      en: 'Lining the sacred Mesob, sharing rich wats, and honoring loved ones through Gursha',
      am: 'በመሶብ ማቅረብ፣ ወጦችን ማስተናገድና የፍቅር ጉርሻ ማጉረስ'
    },
    durationEstimate: 'The Heart of Daily Life',
    summary: {
      en: 'Injera is both the plate, the bread, and the utensil. Spread inside a vibrant woven Mesob and topped with colorful stews, it unites family and guests around a single communal table.',
      am: 'እንጀራ ማዕድም፣ ቁርስም፣ ማንኪያም ነው። በመሶብ ተነጥፎ ከተለያዩ ወጦች ጋር ለቤተሰብና ለእንግዳ በአንድነት ይቀርባል።'
    },
    description: {
      en: 'A large sheet of injera is spread to cover the base of the Mesob. Additional rolled injera are served on the side. Upon this edible canvas are placed aromatic dishes: Doro Wat (slow-simmered spicy chicken), Misir Wat (berbere-spiced red lentils), Gomen (collard greens), Shiro (spiced chickpea stew), and Ayib (fresh mild curd cheese).',
      am: 'በመሶቡ ላይ አንድ ሙሉ እንጀራ ይነጠፋል፤ በላዩ ላይ ዶሮ ወጥ፣ የክትፎ፣ የምስር ወጥ፣ ጎመን፣ ሽሮና አይብ ይደረጋል። የተጠቀለሉ እንጀራዎች በጎን ይቀርባሉ።'
    },
    scientificInsight: {
      en: 'The acidic, porous structure of injera absorbs the aromatic spiced fats (niter kibbeh) and juices of stews without disintegrating, functioning as a bio-functional edible utensil.',
      am: 'የእንጀራው ቀዳዳዎች የወጡን መረቅና ቅመም በሚገባ ወደ ውስጥ በመምጠጥ ልዩ ጣዕም እንዲኖረው ያደርጋሉ።'
    },
    culturalInsight: {
      en: 'Communal dining embodies Ethiopian solidarity. Eating from one plate signifies trust and kinship. The sacred act of "Gursha" (ጉርሻ)—rolling a savory morsel with injera and placing it gently into the mouth of a friend or elder—is the ultimate gesture of love, respect, and hospitality.',
      am: 'ከአንድ ማዕድ መብላት የፍቅርና የአንድነት መገለጫ ነው። "ጉርሻ" ደግሞ ክብርን፣ ፍቅርንና እንግዳ ተቀባይነትን የሚያሳይ ልዩ ኢትዮጵያዊ ባህል ነው።'
    },
    proverbs: {
      amharic: 'አንድ ሰው ብቻውን ከበላ፣ ብቻውን ይሞታል።',
      transliteration: 'And sew bichawin kebela, bichawin yimotal.',
      meaning: 'Whoever eats alone, dies alone. (Food is meant to be shared).'
    },
    tools: ['mesob'],
    ingredients: ['Injera Platter', 'Doro Wat (ዶሮ ወጥ)', 'Misir Wat (ምስር ወጥ)', 'Shiro (ሽሮ)', 'Gomen (ጎመን)', 'Ayib (አይብ)'],
    tips: {
      en: [
        'Always wash hands before gathering around the Mesob (using traditional Chilfa water pour).',
        'Eat using only the right hand, breaking bite-sized pieces from the side closest to you.',
        'Never decline a gursha; accepting it honors the giver\'s affection and hospitality.'
      ],
      am: [
        'ወደ ማዕድ ከመቀመጥ በፊት እጅን በውሃና ሳሙና በሚገባ መታጠብ።',
        'በቀኝ እጅ ብቻ መብላትና ከራስ ፊት ያለውን ብቻ ማውጣት።',
        'ጉርሻ ሲሰጥ አለመመለስ፤ ፍቅርንና ክብርን መቀበል ነው።'
      ]
    },
    colorTheme: '#9E2A2B'
  }
];
