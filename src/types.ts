export interface BoundingBox {
  x: number; // percentage 0-100
  y: number;
  width: number;
  height: number;
  label: string;
}

export interface Keypoint {
  name: string;
  x: number;
  y: number;
}

export interface BreedFeatures {
  horns: string;
  ears: string;
  hump: string;
  dewlap: string;
  coatColor: string;
  bodyStructure: string;
}

export interface ProductionMetrics {
  avgMilkYield: string;
  fatPercentage: string;
  climateAdaptation: string;
  purpose: "Dairy" | "Draught" | "Dual-purpose";
}

export interface DetectionResult {
  name: string;
  scientificName: string;
  type: "cattle" | "buffalo";
  origin: string;
  confidence: number;
  purity: number;
  keyTraits: string[];
  physicalFeatures: BreedFeatures;
  metrics: ProductionMetrics;
  breedingAdvice: string;
  healthResistance: string;
  yoloBoundingBox: BoundingBox;
  detectedKeypoints: Keypoint[];
}

export interface FarmRecord {
  id: string;
  tagNumber: string;
  animalName: string;
  breed: string;
  type: "cattle" | "buffalo";
  gender: "Cow" | "Bull" | "Heifer" | "Calf" | "Buffalo Cow" | "Buffalo Bull";
  ageYears: number;
  purity: number;
  dateIdentified: string;
  status: "Lactating" | "Dry" | "Pregnant" | "Calving" | "Active";
  dailyYieldLiters: number;
  healthNote: string;
  imageUrl?: string;
  ownerName: string;
}

export interface SampleImage {
  id: string;
  title: string;
  breedKey: string;
  type: "cattle" | "buffalo";
  description: string;
  thumbnailUrl: string;
}
