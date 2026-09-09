import { DetectionResult, SampleImage, FarmRecord } from "../types";

export const SAMPLE_CATTLE_IMAGES: SampleImage[] = [
  {
    id: "sample-gir",
    title: "Gir Cow (Gujarat)",
    breedKey: "gir",
    type: "cattle",
    description: "Distinct convex dome forehead, long pendulous folded ears, and red speckled coat.",
    thumbnailUrl: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sample-murrah",
    title: "Murrah Buffalo (Haryana)",
    breedKey: "murrah",
    type: "buffalo",
    description: "Jet-black body, tight spiral horns (jalebi shape), premier dairy water buffalo.",
    thumbnailUrl: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sample-hf",
    title: "Holstein Friesian (HF)",
    breedKey: "holstein_friesian",
    type: "cattle",
    description: "Iconic black & white piebald markings, straight backline, top dairy yield.",
    thumbnailUrl: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sample-sahiwal",
    title: "Sahiwal (Punjab)",
    breedKey: "sahiwal",
    type: "cattle",
    description: "Reddish-brown dun color, loose voluminous dewlap, stumpy short horns.",
    thumbnailUrl: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sample-jaffarabadi",
    title: "Jaffarabadi Buffalo (Gir Forest)",
    breedKey: "jaffarabadi",
    type: "buffalo",
    description: "Massive frame, drooping wide horns hanging along neck, high butterfat content.",
    thumbnailUrl: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sample-ongole",
    title: "Ongole Zebu (Andhra Pradesh)",
    breedKey: "ongole",
    type: "cattle",
    description: "Glossy white coat, massive prominent hump, dark muzzle and hooves.",
    thumbnailUrl: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sample-surti",
    title: "Surti Buffalo (Gujarat)",
    breedKey: "surti",
    type: "buffalo",
    description: "Sickle-shaped flat horns, two white collars around throat and brisket.",
    thumbnailUrl: "https://images.unsplash.com/photo-1563281577-a7be47e20db9?auto=format&fit=crop&w=800&q=80"
  }
];

export const FULL_BREED_CATALOG: DetectionResult[] = [
  {
    name: "Gir",
    scientificName: "Bos indicus (Zebu)",
    type: "cattle",
    origin: "Gir Hills & Kathiawar, Gujarat, India",
    confidence: 0.97,
    purity: 98.2,
    keyTraits: [
      "Convex dome-like forehead acting as a protective cooling shield",
      "Long pendulous ears hanging like folded leaves",
      "Prominently developed hump over the withers",
      "Mottled red to speckled white-red coat"
    ],
    physicalFeatures: {
      horns: "Curved backward and downward, turning upward at tips",
      ears: "Drooping, pendulous, curled inwards like folded leaves",
      hump: "Very large, muscular, positioned over front shoulders",
      dewlap: "Large, thin, hanging in graceful loose folds",
      coatColor: "Deep red to white with reddish speckles",
      bodyStructure: "Heavy medium frame, barrel shaped, sloping rump"
    },
    metrics: {
      avgMilkYield: "2,000 - 2,600 kg / lactation",
      fatPercentage: "4.5% - 5.0%",
      climateAdaptation: "Extreme heat tolerance up to 48°C; high solar radiation resistance",
      purpose: "Dairy"
    },
    breedingAdvice: "Conserve pure indigenous lines. Excellent sire breed for upgrading non-descript zebu.",
    healthResistance: "High tick immunity, low mastitis rates, resistant to tropical diseases.",
    yoloBoundingBox: { x: 12, y: 16, width: 74, height: 68, label: "gir_cattle: 0.97" },
    detectedKeypoints: [
      { name: "Forehead Dome", x: 30, y: 30 },
      { name: "Pendulous Ear", x: 25, y: 42 },
      { name: "Cervical Hump", x: 48, y: 24 },
      { name: "Dewlap Fold", x: 32, y: 56 },
      { name: "Capacious Udder", x: 67, y: 64 }
    ]
  },
  {
    name: "Murrah",
    scientificName: "Bubalus bubalis (River Buffalo)",
    type: "buffalo",
    origin: "Rohtak, Hisar, Jind (Haryana) & Nabha (Punjab), India",
    confidence: 0.985,
    purity: 99.2,
    keyTraits: [
      "Jet black coat with shiny sheen and sparse hair",
      "Tightly curled spiral horns ('Jalebi' horns)",
      "Wedge-shaped deep body with broad pelvic region",
      "Highest average milk fat among primary dairy breeds (7-8.5%)"
    ],
    physicalFeatures: {
      horns: "Short, turning backward, upward and tightly spiraling inward",
      ears: "Alert, thin, horizontally carried",
      hump: "Absent",
      dewlap: "Absent / tight throat skin",
      coatColor: "Deep jet black, white switch on tail allowed",
      bodyStructure: "Deep wedged dairy conformation, strong backline"
    },
    metrics: {
      avgMilkYield: "2,600 - 3,600 kg / lactation",
      fatPercentage: "7.0% - 8.5%",
      climateAdaptation: "Adapted to subtropical riverine regions; requires daily wallowing or misting",
      purpose: "Dairy"
    },
    breedingAdvice: "Maintain pedigree selection; utilize frozen semen from progeny-tested bulls.",
    healthResistance: "Rugged disease resilience against contagious bovine pleuropneumonia.",
    yoloBoundingBox: { x: 10, y: 15, width: 78, height: 70, label: "murrah_buffalo: 0.99" },
    detectedKeypoints: [
      { name: "Spiral Horns", x: 26, y: 25 },
      { name: "Facial Plane", x: 28, y: 35 },
      { name: "Girth Width", x: 50, y: 44 },
      { name: "Broad Rump", x: 73, y: 43 },
      { name: "Teat Placement", x: 65, y: 68 }
    ]
  },
  {
    name: "Sahiwal",
    scientificName: "Bos indicus (Zebu)",
    type: "cattle",
    origin: "Punjab & Haryana plains",
    confidence: 0.955,
    purity: 96.5,
    keyTraits: [
      "Reddish dun to pale mahogany coat",
      "Voluminous loose skin and heavy pendulous dewlap",
      "Short stumpy horns, calm gentle temperament",
      "Heavy lactation endurance in arid tropical zones"
    ],
    physicalFeatures: {
      horns: "Short and stumpy, curving outward and forward",
      ears: "Medium length, slightly drooping",
      hump: "Medium to large, rounded dome",
      dewlap: "Heavily folded and hanging down to brisket ('Lola')",
      coatColor: "Reddish brown, brownish red, or pale dun",
      bodyStructure: "Cylindrical body, deep chest, straight legs"
    },
    metrics: {
      avgMilkYield: "2,200 - 3,200 kg / lactation",
      fatPercentage: "4.5% - 5.2%",
      climateAdaptation: "Outstanding tolerance to intense heat and drought stress",
      purpose: "Dairy"
    },
    breedingAdvice: "Highly recommended for dairy development in tropical drylands.",
    healthResistance: "High natural tick and tick-borne disease immunity.",
    yoloBoundingBox: { x: 14, y: 18, width: 72, height: 66, label: "sahiwal_cattle: 0.96" },
    detectedKeypoints: [
      { name: "Stumpy Horn", x: 31, y: 29 },
      { name: "Loose Dewlap", x: 33, y: 52 },
      { name: "Rounded Hump", x: 49, y: 27 },
      { name: "Navel Flap", x: 54, y: 62 },
      { name: "Udder Symmetry", x: 66, y: 62 }
    ]
  },
  {
    name: "Holstein Friesian (HF)",
    scientificName: "Bos taurus",
    type: "cattle",
    origin: "Netherlands / Western Europe",
    confidence: 0.99,
    purity: 98.9,
    keyTraits: [
      "High-contrast piebald black and white patchy pattern",
      "Absence of cervical hump, straight flat topline",
      "Tall, open angular dairy wedge confirmation",
      "World standard for volumetric milk yield"
    ],
    physicalFeatures: {
      horns: "Short, forward-directed or polled",
      ears: "Medium, alert, horizontal",
      hump: "Absent (flat withers)",
      dewlap: "Clean and tight under throat",
      coatColor: "Sharply demarcated black and white patches",
      bodyStructure: "Tall, deep rib, capacious abdominal capacity"
    },
    metrics: {
      avgMilkYield: "6,000 - 8,500 kg / lactation",
      fatPercentage: "3.5% - 3.8%",
      climateAdaptation: "Temperate native; requires active summer misting/cooling in India",
      purpose: "Dairy"
    },
    breedingAdvice: "Ideal for crossbreeding with indigenous breeds (Gir/Sahiwal) for 50-62.5% hybrid vigor.",
    healthResistance: "Requires intensive vaccination and shelter management in tropics.",
    yoloBoundingBox: { x: 10, y: 14, width: 80, height: 72, label: "holstein_friesian: 0.99" },
    detectedKeypoints: [
      { name: "Head Profile", x: 24, y: 32 },
      { name: "Withers Line", x: 48, y: 25 },
      { name: "Coat Patch Boundary", x: 40, y: 44 },
      { name: "Barrel Depth", x: 56, y: 50 },
      { name: "High Rear Udder", x: 70, y: 65 }
    ]
  },
  {
    name: "Jaffarabadi",
    scientificName: "Bubalus bubalis",
    type: "buffalo",
    origin: "Gir Forest and Saurashtra, Gujarat",
    confidence: 0.96,
    purity: 97.4,
    keyTraits: [
      "Heavy drooping flat horns hanging beside neck",
      "Prominent bulging forehead ridge",
      "Heaviest breed of river buffalo in Asia",
      "Milk fat reaches up to 8.5% - 9.5%"
    ],
    physicalFeatures: {
      horns: "Broad flat base, dropping down along cheeks, then turning slightly upward",
      ears: "Medium-long, drooping",
      hump: "Absent",
      dewlap: "Loose brisket skin",
      coatColor: "Deep black, thick hide",
      bodyStructure: "Massive, powerful, barrel-shaped body"
    },
    metrics: {
      avgMilkYield: "2,200 - 3,000 kg / lactation",
      fatPercentage: "7.8% - 9.2%",
      climateAdaptation: "Thrives in semi-arid and coastal forest terrains",
      purpose: "Dairy"
    },
    breedingAdvice: "Conserve genetic stock in Kathiawar; protect pure mating tracts.",
    healthResistance: "High stamina and resilience to endemic local parasites.",
    yoloBoundingBox: { x: 12, y: 16, width: 75, height: 70, label: "jaffarabadi_buffalo: 0.96" },
    detectedKeypoints: [
      { name: "Drooping Horn", x: 26, y: 31 },
      { name: "Bulging Forehead", x: 30, y: 27 },
      { name: "Brisket Width", x: 39, y: 53 },
      { name: "Pin Bones", x: 74, y: 43 },
      { name: "Teat Symmetry", x: 62, y: 66 }
    ]
  },
  {
    name: "Ongole",
    scientificName: "Bos indicus (Zebu)",
    type: "cattle",
    origin: "Prakasam & Guntur, Andhra Pradesh, India",
    confidence: 0.945,
    purity: 96.0,
    keyTraits: [
      "Majestic white or pearl-grey coat with dark hooves and muzzle",
      "Massive upright shoulder hump in bulls",
      "Short stumpy horns, large dignified eyes",
      "Celebrated dual-purpose draught and milk breed"
    ],
    physicalFeatures: {
      horns: "Short and stumpy, dark horn tips",
      ears: "Elliptical, alert, moderately long",
      hump: "Massive, erect, well-filled over shoulders",
      dewlap: "Large, thin, hanging in pendulous folds",
      coatColor: "Glossy white or steel grey with dark points",
      bodyStructure: "Tall, heavy muscular frame, powerful shoulder"
    },
    metrics: {
      avgMilkYield: "1,500 - 2,200 kg / lactation",
      fatPercentage: "4.2% - 4.8%",
      climateAdaptation: "Extraordinary heat resilience; ancestor of American Brahman cattle",
      purpose: "Dual-purpose"
    },
    breedingAdvice: "Maintain pure nucleus herds in coastal Andhra; excellent draught sire.",
    healthResistance: "Natural immunity to tick-borne fever, foot rot, and babesiosis.",
    yoloBoundingBox: { x: 14, y: 17, width: 72, height: 68, label: "ongole_cattle: 0.95" },
    detectedKeypoints: [
      { name: "Black Muzzle", x: 23, y: 43 },
      { name: "Stumpy Horn", x: 30, y: 27 },
      { name: "Majestic Hump", x: 47, y: 22 },
      { name: "Pendulous Dewlap", x: 35, y: 56 },
      { name: "Muscular Flank", x: 66, y: 48 }
    ]
  },
  {
    name: "Surti",
    scientificName: "Bubalus bubalis",
    type: "buffalo",
    origin: "Kaira & Vadodara districts, Gujarat",
    confidence: 0.94,
    purity: 95.0,
    keyTraits: [
      "Characteristic sickle-shaped flat horns curving backward",
      "Two distinct white collars on brisket and jaw ('chevron marks')",
      "Medium compact frame with high feed conversion efficiency",
      "Steady, reliable dairy production"
    ],
    physicalFeatures: {
      horns: "Sickle-shaped, flat, directed backward and downward then curving up",
      ears: "Medium, alert, pinkish on inside",
      hump: "Absent",
      dewlap: "Absent",
      coatColor: "Black or rusty brown with white chevron markings",
      bodyStructure: "Compact, wedge-shaped, straight backline"
    },
    metrics: {
      avgMilkYield: "1,600 - 2,100 kg / lactation",
      fatPercentage: "7.0% - 8.2%",
      climateAdaptation: "Handles low-quality dry roughage efficiently; very hardy",
      purpose: "Dairy"
    },
    breedingAdvice: "Recommended for marginal and landless dairy farmers.",
    healthResistance: "High survivability, low calving difficulties.",
    yoloBoundingBox: { x: 15, y: 19, width: 70, height: 66, label: "surti_buffalo: 0.94" },
    detectedKeypoints: [
      { name: "Sickle Horn", x: 29, y: 28 },
      { name: "White Chevron", x: 34, y: 49 },
      { name: "Level Backline", x: 52, y: 31 },
      { name: "Compact Rump", x: 69, y: 42 },
      { name: "Balanced Udder", x: 63, y: 64 }
    ]
  },
  {
    name: "Red Sindhi",
    scientificName: "Bos indicus (Zebu)",
    type: "cattle",
    origin: "Sindh & Western Border regions",
    confidence: 0.95,
    purity: 96.2,
    keyTraits: [
      "Deep dark red coat color, varying from dun to deep brown",
      "Compact medium frame with neat dairy proportions",
      "Distinct prominent hump and well-folded dewlap",
      "High milk yields under high ambient temperatures"
    ],
    physicalFeatures: {
      horns: "Short, thick at base, curving outward and upward",
      ears: "Medium sized, droop slightly",
      hump: "Well-developed and firm",
      dewlap: "Thin, neat folds",
      coatColor: "Deep dark red to light dun",
      bodyStructure: "Compact, well-knit, deep chest"
    },
    metrics: {
      avgMilkYield: "1,800 - 2,400 kg / lactation",
      fatPercentage: "4.5% - 5.0%",
      climateAdaptation: "Exceptional heat and humidity tolerance",
      purpose: "Dairy"
    },
    breedingAdvice: "Valuable for crossbreeding in hot coastal belts.",
    healthResistance: "Highly resistant to tropical parasites and bloat.",
    yoloBoundingBox: { x: 14, y: 18, width: 72, height: 66, label: "red_sindhi: 0.95" },
    detectedKeypoints: [
      { name: "Horn Base", x: 30, y: 30 },
      { name: "Red Coat Tone", x: 42, y: 40 },
      { name: "Firm Hump", x: 48, y: 26 },
      { name: "Dewlap Line", x: 33, y: 53 },
      { name: "Udder Vessel", x: 65, y: 63 }
    ]
  },
  {
    name: "Tharparkar",
    scientificName: "Bos indicus (Zebu)",
    type: "cattle",
    origin: "Thar Desert, Rajasthan / Border regions",
    confidence: 0.94,
    purity: 95.8,
    keyTraits: [
      "White or light grey coat reflecting desert sunlight",
      "Lyre-shaped horns curving elegantly upward",
      "Superior drought survival on sparse scrub vegetation",
      "Dual-purpose: good milker and sturdy bullock draught"
    ],
    physicalFeatures: {
      horns: "Medium length, curving upwards and outwards (lyre shape)",
      ears: "Long, broad and semi-pendulous",
      hump: "Moderately developed, firm",
      dewlap: "Gracefully folded, moderately heavy",
      coatColor: "White to light grey, darker along spine in winter",
      bodyStructure: "Strong, medium-sized, muscular limbs"
    },
    metrics: {
      avgMilkYield: "1,800 - 2,600 kg / lactation",
      fatPercentage: "4.4% - 4.9%",
      climateAdaptation: "Desert adapted; can withstand extreme solar radiation and water scarcity",
      purpose: "Dual-purpose"
    },
    breedingAdvice: "Critical for arid and semi-arid desert zone sustainable dairy.",
    healthResistance: "Immune to endemic desert pathogens and sand fly diseases.",
    yoloBoundingBox: { x: 13, y: 17, width: 73, height: 67, label: "tharparkar: 0.94" },
    detectedKeypoints: [
      { name: "Lyre Horn", x: 30, y: 26 },
      { name: "White Forehead", x: 29, y: 34 },
      { name: "Desert Hump", x: 47, y: 25 },
      { name: "Reflective Coat", x: 55, y: 42 },
      { name: "Sturdy Hooves", x: 42, y: 78 }
    ]
  },
  {
    name: "Mehsana",
    scientificName: "Bubalus bubalis",
    type: "buffalo",
    origin: "Mehsana & Banaskantha, Gujarat",
    confidence: 0.95,
    purity: 96.0,
    keyTraits: [
      "Derived from Murrah x Surti crossbreeding",
      "Horns less tightly curled than Murrah but more curved than Surti",
      "Regular calver with long lactation persistence",
      "High milk fat and docile temperament"
    ],
    physicalFeatures: {
      horns: "Irregularly curved, sickle shape to loose coil",
      ears: "Medium and alert",
      hump: "Absent",
      dewlap: "Absent",
      coatColor: "Black to grey-black",
      bodyStructure: "Long body, deep barrel, broad hips"
    },
    metrics: {
      avgMilkYield: "2,000 - 2,800 kg / lactation",
      fatPercentage: "7.0% - 7.8%",
      climateAdaptation: "High adaptation to intense dry northern Gujarat summers",
      purpose: "Dairy"
    },
    breedingAdvice: "Highly favored by cooperative dairy plants like Dudhsagar Dairy.",
    healthResistance: "Low calving interval and minimal reproductive problems.",
    yoloBoundingBox: { x: 14, y: 17, width: 72, height: 68, label: "mehsana_buffalo: 0.95" },
    detectedKeypoints: [
      { name: "Curved Horn", x: 28, y: 28 },
      { name: "Deep Girth", x: 51, y: 45 },
      { name: "Long Spine", x: 54, y: 30 },
      { name: "Capacious Rear", x: 72, y: 44 },
      { name: "Lactation Vein", x: 60, y: 64 }
    ]
  }
];

export const INITIAL_FARM_RECORDS: FarmRecord[] = [
  {
    id: "rec-001",
    tagNumber: "IN-GJ-2026-0814",
    animalName: "Kasturi",
    breed: "Gir",
    type: "cattle",
    gender: "Cow",
    ageYears: 4,
    purity: 98.2,
    dateIdentified: "2026-09-02",
    status: "Lactating",
    dailyYieldLiters: 14.5,
    healthNote: "Vaccinated for FMD; healthy rumen activity; purebred convex forehead registered.",
    imageUrl: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=400&q=80",
    ownerName: "Devraj Patel (Saurashtra Dairy Farm)"
  },
  {
    id: "rec-002",
    tagNumber: "IN-HR-2026-1192",
    animalName: "Gauri",
    breed: "Murrah",
    type: "buffalo",
    gender: "Buffalo Cow",
    ageYears: 5,
    purity: 99.1,
    dateIdentified: "2026-08-28",
    status: "Lactating",
    dailyYieldLiters: 18.2,
    healthNote: "Elite genetic line; tight jalebi horns; milk fat tested at 7.9%.",
    imageUrl: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=400&q=80",
    ownerName: "Harpal Singh (Karnal Organic Dairy)"
  },
  {
    id: "rec-003",
    tagNumber: "IN-PB-2026-0435",
    animalName: "Laxmi",
    breed: "Sahiwal",
    type: "cattle",
    gender: "Cow",
    ageYears: 3,
    purity: 96.5,
    dateIdentified: "2026-09-05",
    status: "Pregnant",
    dailyYieldLiters: 11.0,
    healthNote: "Confirmed 3 months pregnant with progeny-tested Sahiwal sire semen; high tick immunity.",
    imageUrl: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=400&q=80",
    ownerName: "Gurmeet Sandhu (Ludhiana Livestock)"
  },
  {
    id: "rec-004",
    tagNumber: "IN-KA-2026-7821",
    animalName: "Daisy",
    breed: "Holstein Friesian (HF)",
    type: "cattle",
    gender: "Cow",
    ageYears: 4,
    purity: 98.8,
    dateIdentified: "2026-09-07",
    status: "Lactating",
    dailyYieldLiters: 26.5,
    healthNote: "Top volumetric producer; installed ceiling misting fan to prevent summer heat stress.",
    imageUrl: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=400&q=80",
    ownerName: "Vinay Gowda (Mysuru Green Farms)"
  }
];
