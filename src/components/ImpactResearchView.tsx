import React from "react";
import { 
  AlertTriangle, 
  Clock, 
  FileSpreadsheet, 
  TrendingUp, 
  CheckCircle2, 
  ExternalLink, 
  Users, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  Compass, 
  Target,
  Sparkles
} from "lucide-react";

export const ImpactResearchView: React.FC = () => {
  const teamMembers = [
    { name: "Phavithran S", role: "AI & Model Architecture Lead" },
    { name: "Anbu Selvam S", role: "Computer Vision & Pipeline" },
    { name: "Vishnu K", role: "Backend & Systems Integration" },
    { name: "Saimugunth S", role: "Frontend & Mobile Interface" },
    { name: "Akshaya M", role: "Data Annotation & Testing" },
    { name: "Trissha K L", role: "Agricultural Research & Documentation" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Context Banner */}
      <div className="bg-gradient-to-r from-[#0B2319] via-[#0F3526] to-[#071911] rounded-2xl p-6 sm:p-8 text-white border border-[#1C4C38] shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            SMART INDIA HACKATHON 2026 · SOFTWARE CATEGORY
          </span>
          <span className="text-xs text-emerald-400 font-medium">TEAM ERROR 404</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Problem, Impact & Research Grounding
        </h1>
        <p className="text-sm text-emerald-100/90 mt-2 max-w-3xl leading-relaxed italic">
          “Making Smart Agriculture Accessible to Every Farmer.”
        </p>
      </div>

      {/* Section 1: The Problem (Direct from Slide 2) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Slide 02 Review</span>
            <h2 className="text-xl font-black text-stone-900">
              The Problem: Manual Bottleneck on the Farm
            </h2>
          </div>
          <span className="text-xs font-mono bg-red-100 text-red-800 px-2.5 py-1 rounded-full font-bold">
            Current Industry Challenge
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Problem 01 */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-black text-base mb-4">
              01
            </div>
            <h3 className="text-lg font-black text-stone-900">Time Consuming</h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Manual breed identification requires significant time, veterinary expertise, and visual examination of multiple morphological angles that field farmers often cannot execute quickly.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs text-red-700 font-medium">
              <Clock className="w-4 h-4" />
              <span>Avg: 20-30 mins per animal</span>
            </div>
          </div>

          {/* Problem 02 */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-base mb-4">
              02
            </div>
            <h3 className="text-lg font-black text-stone-900">Error Prone</h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Human visual identification can lead to frequent mistakes and inconsistent results, particularly between similar zebu strains or subtle buffalo crossbreeds.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs text-amber-700 font-medium">
              <AlertTriangle className="w-4 h-4" />
              <span>High misclassification rate in crossbreds</span>
            </div>
          </div>

          {/* Problem 03 */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-base mb-4">
              03
            </div>
            <h3 className="text-lg font-black text-stone-900">Poor Records</h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Incorrect breed records directly compromise breeding decisions, reduce milk yield projections, compromise disease quarantine, and disrupt cooperative farm management.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs text-blue-700 font-medium">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Loss of pedigreed value</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Impact & Future Scope (Direct from Slide 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Current Impact (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Slide 04 Review</span>
            <h3 className="text-lg font-black text-stone-900">Current Impact Delivered</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-emerald-50/70 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 text-xs block">Faster Breed Identification</strong>
                <p className="text-[11px] text-stone-600">Reduced from 30 minutes to &lt; 2 seconds via YOLO deep vision.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-emerald-50/70 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 text-xs block">Reduced Manual Effort</strong>
                <p className="text-[11px] text-stone-600">Eliminated complex caliper measurements and manual catalog lookups.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-emerald-50/70 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 text-xs block">Digital Farm Records</strong>
                <p className="text-[11px] text-stone-600">Instant ear-tag cataloging, lactation tracking, and exportable CSVs.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-emerald-50/70 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 text-xs block">Better Breeding Decisions</strong>
                <p className="text-[11px] text-stone-600">Purebred preservation prevents inbreeding depression in dairy stock.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-emerald-50/70 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 text-xs block">Improved Farm Management</strong>
                <p className="text-[11px] text-stone-600">Empowers smallholder farmers to command higher value for pure milk.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Future Roadmap (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Slide 04 Roadmap</span>
            <h3 className="text-lg font-black text-stone-900">Future Product Roadmap</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:border-emerald-500 transition-colors">
              <span className="w-6 h-6 rounded bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center mb-2">
                01
              </span>
              <h4 className="font-bold text-stone-900 text-xs">Add More Cattle & Buffalo Breeds</h4>
              <p className="text-[11px] text-stone-600 mt-1">
                Expanding corpus to all 53 registered Indian indigenous cattle breeds and 19 buffalo breeds documented by NBAGR.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:border-emerald-500 transition-colors">
              <span className="w-6 h-6 rounded bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center mb-2">
                02
              </span>
              <h4 className="font-bold text-stone-900 text-xs">Deploy a Mobile Application</h4>
              <p className="text-[11px] text-stone-600 mt-1">
                Android Kotlin / React Native field app with hardware NPU camera pipeline for extreme durability in barnyards.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:border-emerald-500 transition-colors">
              <span className="w-6 h-6 rounded bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center mb-2">
                03
              </span>
              <h4 className="font-bold text-stone-900 text-xs">Add Offline Functionality</h4>
              <p className="text-[11px] text-stone-600 mt-1">
                Embedded edge model quantization (INT8) running completely without cell network in remote pastures.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:border-emerald-500 transition-colors">
              <span className="w-6 h-6 rounded bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center mb-2">
                04
              </span>
              <h4 className="font-bold text-stone-900 text-xs">Integrate with Farm Management</h4>
              <p className="text-[11px] text-stone-600 mt-1">
                Direct API link with NDDB INAPH (Information Network for Animal Productivity and Health) national database.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Research & Reference (Direct from Slide 6) */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Slide 06 References</span>
          <h2 className="text-xl font-black text-stone-900">
            Datasets, Government Resources & Scientific Literature
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Grounding BreedSense AI in verified agricultural repositories and computer vision object detection publications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Datasets */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              Cattle & Agricultural Datasets
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li className="p-2.5 bg-stone-50 rounded-lg border border-stone-100">
                <strong className="block text-stone-800">AGROTECH Cattle Database</strong>
                <a href="https://github.com/agrotech/cattle-dataset" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline flex items-center gap-1 mt-0.5 text-[11px]">
                  github.com/agrotech/cattle-dataset <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="p-2.5 bg-stone-50 rounded-lg border border-stone-100">
                <strong className="block text-stone-800">ImageNet (Animal Categories)</strong>
                <a href="https://www.image-net.org/" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline flex items-center gap-1 mt-0.5 text-[11px]">
                  image-net.org <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="p-2.5 bg-stone-50 rounded-lg border border-stone-100">
                <strong className="block text-stone-800">Kaggle Cattle Breed Dataset</strong>
                <a href="https://www.kaggle.com/datasets/search?q=cattle+breed" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline flex items-center gap-1 mt-0.5 text-[11px]">
                  kaggle.com/datasets <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="p-2.5 bg-stone-50 rounded-lg border border-stone-100">
                <strong className="block text-stone-800">COCO & Open Images Dataset</strong>
                <a href="https://cocodataset.org/" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline flex items-center gap-1 mt-0.5 text-[11px]">
                  cocodataset.org <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Indian Agricultural Resources */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Indian Agricultural Resources
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li className="p-2.5 bg-stone-50 rounded-lg border border-stone-100">
                <strong className="block text-stone-800">National Dairy Development Board (NDDB)</strong>
                <a href="https://www.nddb.coop/" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline flex items-center gap-1 mt-0.5 text-[11px]">
                  nddb.coop <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="p-2.5 bg-stone-50 rounded-lg border border-stone-100">
                <strong className="block text-stone-800">Dept. of Animal Husbandry & Dairying (DAHD)</strong>
                <a href="https://dahd.gov.in/" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline flex items-center gap-1 mt-0.5 text-[11px]">
                  dahd.gov.in <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="p-2.5 bg-stone-50 rounded-lg border border-stone-100">
                <strong className="block text-stone-800">Indian Veterinary Research Institute (IVRI)</strong>
                <a href="https://ivri.gov.in/" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline flex items-center gap-1 mt-0.5 text-[11px]">
                  ivri.gov.in <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Research Papers */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
              <Award className="w-4 h-4 text-emerald-700" />
              Research Papers & Articles
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li className="p-2.5 bg-stone-50 rounded-lg border border-stone-100">
                <strong className="block text-stone-800">"You Only Look Once" Paper</strong>
                <a href="https://arxiv.org/abs/1506.02640" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline flex items-center gap-1 mt-0.5 text-[11px]">
                  arXiv:1506.02640 <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="p-2.5 bg-stone-50 rounded-lg border border-stone-100">
                <strong className="block text-stone-800">YOLOv8 Research & Ultralytics</strong>
                <a href="https://arxiv.org/abs/2310.09197" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline flex items-center gap-1 mt-0.5 text-[11px]">
                  arXiv:2310.09197 <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="p-2.5 bg-stone-50 rounded-lg border border-stone-100">
                <strong className="block text-stone-800">IEEE Agricultural Technology AI Review</strong>
                <a href="https://ieeexplore.ieee.org/" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline flex items-center gap-1 mt-0.5 text-[11px]">
                  ieeexplore.ieee.org <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Team Error 404 Credits Card (From Slide 1) */}
      <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-emerald-700" />
          <h3 className="font-bold text-stone-900 text-base">
            Smart India Hackathon 2026 · Team Error 404 Members
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {teamMembers.map((member, i) => (
            <div key={i} className="bg-white p-3 rounded-xl border border-stone-200 shadow-sm text-center">
              <div className="w-8 h-8 rounded-full bg-[#0B2319] text-amber-400 font-bold text-xs flex items-center justify-center mx-auto mb-2">
                {member.name.split(" ")[0][0]}
              </div>
              <strong className="block text-xs text-stone-900 leading-snug">{member.name}</strong>
              <span className="text-[10px] text-stone-500 block mt-1">{member.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
