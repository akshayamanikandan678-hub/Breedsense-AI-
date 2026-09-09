import React, { useState } from "react";
import { FULL_BREED_CATALOG, SAMPLE_CATTLE_IMAGES } from "../data/breedsData";
import { DetectionResult } from "../types";
import { 
  BookOpen, 
  Search, 
  MapPin, 
  Milk, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  Award
} from "lucide-react";

export const BreedCatalogView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "cattle" | "buffalo">("all");
  const [selectedBreed, setSelectedBreed] = useState<DetectionResult>(FULL_BREED_CATALOG[0]);

  const filteredBreeds = FULL_BREED_CATALOG.filter((breed) => {
    const matchesSearch = 
      breed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      breed.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      breed.keyTraits.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "all" || breed.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getBreedThumbnail = (breedName: string) => {
    const matched = SAMPLE_CATTLE_IMAGES.find((s) => 
      breedName.toLowerCase().includes(s.breedKey.toLowerCase()) || s.title.toLowerCase().includes(breedName.toLowerCase())
    );
    return matched ? matched.thumbnailUrl : "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=600&q=80";
  };

  return (
    <div className="space-y-6">
      {/* Header Context Banner */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
            FUTURE ROADMAP 01 · COMPREHENSIVE INDIGENOUS REPOSITORY
          </span>
          <span className="text-xs text-stone-500">NDDB & ICAR Breed Verification Standards</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-stone-900">
          Indian & Global Bovine Breed Encyclopedia
        </h1>
        <p className="text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
          Explore morphological markers, lactation capacities, and genetic conservation protocols for registered Indian indigenous zebu cattle, riverine buffaloes, and exotic crossbreds.
        </p>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 pt-4 border-t border-stone-200">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by breed name, origin state, or physical characteristics..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setSelectedType("all")}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                selectedType === "all"
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              All Breeds ({FULL_BREED_CATALOG.length})
            </button>
            <button
              onClick={() => setSelectedType("cattle")}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                selectedType === "cattle"
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              Cattle ({FULL_BREED_CATALOG.filter(b => b.type === "cattle").length})
            </button>
            <button
              onClick={() => setSelectedType("buffalo")}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                selectedType === "buffalo"
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              Buffaloes ({FULL_BREED_CATALOG.filter(b => b.type === "buffalo").length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Breed List, Right Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
            Select Breed ({filteredBreeds.length} Breeds Available)
          </span>

          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {filteredBreeds.map((b) => (
              <div
                key={b.name}
                onClick={() => setSelectedBreed(b)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedBreed.name === b.name
                    ? "bg-emerald-50 border-emerald-600 shadow-sm ring-1 ring-emerald-500"
                    : "bg-white border-stone-200 hover:border-emerald-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                    <img
                      src={getBreedThumbnail(b.name)}
                      alt={b.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-stone-900 text-sm">{b.name}</h3>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                        b.type === "cattle" ? "bg-amber-100 text-amber-900" : "bg-teal-100 text-teal-900"
                      }`}>
                        {b.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 line-clamp-1">{b.origin}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px] text-emerald-800 font-semibold">
                      <span>{b.metrics.avgMilkYield.split("/")[0]}</span>
                      <span>·</span>
                      <span>{b.metrics.fatPercentage} Fat</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-stone-600 block">
                    {(b.confidence * 100).toFixed(0)}% mAP
                  </span>
                  <span className="text-[10px] text-stone-400 uppercase">
                    {b.metrics.purpose}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Detail Pane (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-5 sticky top-24">
            {/* Header banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shadow-inner">
                  <img
                    src={getBreedThumbnail(selectedBreed.name)}
                    alt={selectedBreed.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {selectedBreed.type === "cattle" ? "Bos indicus / Taurus" : "Bubalus bubalis"}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">NDDB Standard Code</span>
                  </div>
                  <h2 className="text-2xl font-black text-stone-900">{selectedBreed.name}</h2>
                  <p className="text-xs text-stone-600 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>Native Tract: {selectedBreed.origin}</span>
                  </p>
                </div>
              </div>

              <div className="text-right bg-stone-50 p-3 rounded-xl border border-stone-200">
                <span className="text-[10px] text-stone-500 font-semibold uppercase block">Economic Purpose</span>
                <span className="text-sm font-black text-emerald-800">{selectedBreed.metrics.purpose}</span>
              </div>
            </div>

            {/* Production metrics callouts */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-[10px] text-emerald-700 font-bold uppercase block">Lactation Yield</span>
                <span className="text-sm font-extrabold text-stone-900 mt-0.5 block">
                  {selectedBreed.metrics.avgMilkYield}
                </span>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <span className="text-[10px] text-amber-800 font-bold uppercase block">Milk Fat Percentage</span>
                <span className="text-sm font-extrabold text-stone-900 mt-0.5 block">
                  {selectedBreed.metrics.fatPercentage}
                </span>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-blue-800 font-bold uppercase block">Thermal Resilience</span>
                <span className="text-xs font-semibold text-stone-900 mt-0.5 block line-clamp-2">
                  {selectedBreed.metrics.climateAdaptation}
                </span>
              </div>
            </div>

            {/* Key Morphological Traits */}
            <div>
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Diagnostic Morphological Markers
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {selectedBreed.keyTraits.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 bg-stone-50 p-2 rounded-lg border border-stone-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Detailed Anatomical Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-100">
                <strong className="text-[10px] text-stone-500 uppercase block">Horns</strong>
                <p className="text-stone-800 font-medium">{selectedBreed.physicalFeatures.horns}</p>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-100">
                <strong className="text-[10px] text-stone-500 uppercase block">Ears</strong>
                <p className="text-stone-800 font-medium">{selectedBreed.physicalFeatures.ears}</p>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-100">
                <strong className="text-[10px] text-stone-500 uppercase block">Hump / Dorsal</strong>
                <p className="text-stone-800 font-medium">{selectedBreed.physicalFeatures.hump}</p>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-100">
                <strong className="text-[10px] text-stone-500 uppercase block">Dewlap Fold</strong>
                <p className="text-stone-800 font-medium">{selectedBreed.physicalFeatures.dewlap}</p>
              </div>
            </div>

            {/* Veterinary Conservation & Breeding */}
            <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 text-xs text-stone-800 space-y-1">
              <span className="font-bold text-emerald-900 block uppercase text-[10px] tracking-wide">
                Breeding & Genetics Advisory:
              </span>
              <p className="text-stone-700 leading-relaxed">{selectedBreed.breedingAdvice}</p>
              <p className="text-[11px] text-emerald-800 font-medium pt-1">
                <strong>Natural Disease Resistance:</strong> {selectedBreed.healthResistance}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
