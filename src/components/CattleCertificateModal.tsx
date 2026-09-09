import React from "react";
import { DetectionResult } from "../types";
import { Award, CheckCircle2, Printer, X, Shield, QrCode, Calendar, MapPin, Milk, Sparkles } from "lucide-react";

interface CattleCertificateModalProps {
  result: DetectionResult;
  imageUrl?: string;
  tagNumber?: string;
  onClose: () => void;
}

export const CattleCertificateModal: React.FC<CattleCertificateModalProps> = ({
  result,
  imageUrl,
  tagNumber = "IN-GJ-2026-0924",
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  const issueDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-300 my-8">
        {/* Top Control Bar */}
        <div className="bg-[#0B2319] text-white px-6 py-3 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm tracking-wide">
              Official Breed Identification & Purity Certificate
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold text-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Body (Clean High-Contrast Standard for Printing) */}
        <div className="p-8 sm:p-10 bg-gradient-to-b from-[#FAFBF8] to-[#F3F5EF] text-stone-900 border-8 border-double border-[#104A36]">
          {/* Header */}
          <div className="text-center pb-6 border-b-2 border-stone-200 relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-[#0B2319] text-amber-400 flex items-center justify-center font-black text-xl border-2 border-amber-500">
                SIH
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0B2319] uppercase font-serif">
                  BreedSense AI Certificate of Breed Purity
                </h1>
                <p className="text-xs text-stone-600 font-medium">
                  SMART INDIA HACKATHON 2026 · DEPARTMENT OF ANIMAL HUSBANDRY STANDARDS
                </p>
              </div>
            </div>
            <div className="inline-block px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 mt-1">
              VERIFIED COMPUTER VISION SPECIMEN RECORD
            </div>
          </div>

          {/* Certificate Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-stone-200 text-xs">
            <div>
              <span className="text-stone-500 block uppercase font-semibold text-[10px]">Ear Tag Identifier</span>
              <strong className="text-stone-900 font-mono text-sm">{tagNumber}</strong>
            </div>
            <div>
              <span className="text-stone-500 block uppercase font-semibold text-[10px]">Date of Evaluation</span>
              <strong className="text-stone-900">{issueDate}</strong>
            </div>
            <div>
              <span className="text-stone-500 block uppercase font-semibold text-[10px]">Inspection Engine</span>
              <strong className="text-emerald-800">YOLOv8 / YOLOv12 + Vision AI</strong>
            </div>
            <div>
              <span className="text-stone-500 block uppercase font-semibold text-[10px]">Diagnostic Status</span>
              <strong className="text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Certified Purebred
              </strong>
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            {/* Specimen Photo */}
            <div className="flex flex-col items-center">
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border-2 border-stone-300 bg-stone-100 shadow-inner relative">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={result.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                    Specimen Photo Captured
                  </div>
                )}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-amber-300 text-[10px] font-mono">
                  {result.yoloBoundingBox.label}
                </div>
              </div>
              <div className="mt-3 text-center">
                <span className="text-[11px] text-stone-500 block">Species Classification</span>
                <span className="font-bold text-stone-800 uppercase text-xs">
                  {result.type === "cattle" ? "Bos indicus / Cattle" : "Bubalus bubalis / River Buffalo"}
                </span>
              </div>
            </div>

            {/* Breed Identification & Core Scores */}
            <div className="md:col-span-2 space-y-4">
              <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Identified Breed</span>
                    <h2 className="text-2xl font-black text-stone-900">{result.name}</h2>
                    <p className="text-xs italic text-stone-600">{result.scientificName}</p>
                    <p className="text-xs text-stone-500 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400" /> Origin: {result.origin}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex flex-col items-end">
                      <span className="text-[10px] text-stone-500 font-semibold uppercase">Purity Rating</span>
                      <span className="text-2xl font-black text-emerald-700">{result.purity}%</span>
                      <span className="text-[10px] text-stone-400">Confidence: {(result.confidence * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-stone-100 rounded-full h-2 mt-3 overflow-hidden border border-stone-200">
                  <div 
                    className="bg-gradient-to-r from-emerald-600 to-teal-500 h-2 rounded-full" 
                    style={{ width: `${result.purity}%` }}
                  />
                </div>
              </div>

              {/* Verified Morphological Markers */}
              <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm text-xs">
                <h3 className="font-bold text-stone-800 mb-2 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-700" />
                  Verified Morphological Criteria
                </h3>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 bg-stone-50 rounded border border-stone-100">
                    <strong className="text-stone-700 block text-[10px] uppercase">Horns & Forehead:</strong>
                    <span>{result.physicalFeatures.horns}</span>
                  </div>
                  <div className="p-2 bg-stone-50 rounded border border-stone-100">
                    <strong className="text-stone-700 block text-[10px] uppercase">Ears & Dewlap:</strong>
                    <span>{result.physicalFeatures.ears}</span>
                  </div>
                  <div className="p-2 bg-stone-50 rounded border border-stone-100">
                    <strong className="text-stone-700 block text-[10px] uppercase">Hump / Dorsal:</strong>
                    <span>{result.physicalFeatures.hump}</span>
                  </div>
                  <div className="p-2 bg-stone-50 rounded border border-stone-100">
                    <strong className="text-stone-700 block text-[10px] uppercase">Coat & Color:</strong>
                    <span>{result.physicalFeatures.coatColor}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Production & Milking Characteristics */}
          <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl mb-6 text-xs text-stone-800">
            <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-1.5">
              <Milk className="w-4 h-4 text-emerald-700" />
              Lactation & Productivity Expectations
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <span className="text-emerald-700 font-semibold block text-[10px] uppercase">Avg Milk Yield:</span>
                <span className="font-bold text-stone-900">{result.metrics.avgMilkYield}</span>
              </div>
              <div>
                <span className="text-emerald-700 font-semibold block text-[10px] uppercase">Butterfat Percentage:</span>
                <span className="font-bold text-stone-900">{result.metrics.fatPercentage}</span>
              </div>
              <div>
                <span className="text-emerald-700 font-semibold block text-[10px] uppercase">Economic Purpose:</span>
                <span className="font-bold text-stone-900">{result.metrics.purpose}</span>
              </div>
            </div>
          </div>

          {/* Footer Seals & Verification */}
          <div className="pt-4 border-t-2 border-stone-200 flex items-end justify-between text-xs text-stone-500">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-stone-100 border border-stone-300 rounded flex items-center justify-center text-stone-400">
                <QrCode className="w-10 h-10 text-stone-700" />
              </div>
              <div className="text-[10px]">
                <p className="font-semibold text-stone-700">Digital Authentication Stamp</p>
                <p>Hash: SIH-2026-BS-404-{(result.name).toUpperCase()}</p>
                <p>Smart India Hackathon 2026 · Team Error 404</p>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-block border-b border-stone-400 pb-1 mb-1 font-serif italic text-stone-700 text-sm">
                BreedSense Computer Vision Engine
              </div>
              <p className="text-[10px] uppercase font-bold text-stone-500">
                Authorized AI Verification System
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
