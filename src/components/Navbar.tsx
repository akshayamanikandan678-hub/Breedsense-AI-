import React from "react";
import { 
  Scan, 
  ClipboardList, 
  BookOpen, 
  Cpu, 
  FileText, 
  Smartphone, 
  Wifi, 
  WifiOff, 
  ShieldCheck, 
  Award,
  Sparkles
} from "lucide-react";

interface NavbarProps {
  activeTab: "scanner" | "records" | "catalog" | "architecture" | "impact";
  setActiveTab: (tab: "scanner" | "records" | "catalog" | "architecture" | "impact") => void;
  isMobileView: boolean;
  setIsMobileView: (val: boolean) => void;
  isOfflineMode: boolean;
  setIsOfflineMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isMobileView,
  setIsMobileView,
  isOfflineMode,
  setIsOfflineMode
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0B2319] text-white border-b border-[#1C4334] shadow-md">
      {/* Top SIH 2026 Announcement Bar */}
      <div className="bg-[#071710] px-4 py-1.5 text-xs text-emerald-300 border-b border-[#143326] flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px]">
            <Award className="w-3 h-3 text-amber-400" />
            SMART INDIA HACKATHON 2026
          </span>
          <span className="text-emerald-400 font-medium">PS: Software</span>
          <span className="text-emerald-600">|</span>
          <span className="text-emerald-200">Team Name: <strong className="text-amber-300">TEAM ERROR 404</strong></span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-emerald-400">
          <span className="hidden sm:inline italic">"Making Smart Agriculture Accessible to Every Farmer"</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOfflineMode(!isOfflineMode)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                isOfflineMode 
                  ? "bg-amber-900/60 text-amber-200 border border-amber-600/40" 
                  : "bg-emerald-900/60 text-emerald-200 border border-emerald-600/40"
              }`}
              title="Toggle between Server AI and Offline Edge Heuristic"
            >
              {isOfflineMode ? <WifiOff className="w-3 h-3 text-amber-400" /> : <Wifi className="w-3 h-3 text-emerald-400" />}
              <span>{isOfflineMode ? "Offline Field Mode" : "Cloud AI Online"}</span>
            </button>
            <button
              onClick={() => setIsMobileView(!isMobileView)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                isMobileView 
                  ? "bg-amber-500 text-stone-900 font-bold" 
                  : "bg-emerald-900/60 text-emerald-200 border border-emerald-700/50 hover:bg-emerald-800/60"
              }`}
              title="Simulate Mobile Handheld Field View"
            >
              <Smartphone className="w-3 h-3" />
              <span>{isMobileView ? "Mobile Simulator (Active)" : "Field Mobile View"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tagline */}
          <div 
            onClick={() => setActiveTab("scanner")} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-[#104a36] p-0.5 shadow-lg flex items-center justify-center border border-emerald-400/40">
              <div className="w-full h-full bg-[#0B2319] rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-amber-400 text-lg tracking-wider">BS</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                  BREEDSENSE <span className="text-amber-400">AI</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  YOLOv8 + v12
                </span>
              </div>
              <p className="text-[11px] text-emerald-300/80 -mt-0.5 hidden sm:block">
                Smart Cattle & Buffalo Breed Identification
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              id="nav-scanner-btn"
              onClick={() => setActiveTab("scanner")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "scanner"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/40"
                  : "text-emerald-100/80 hover:text-white hover:bg-emerald-900/50"
              }`}
            >
              <Scan className="w-4 h-4 text-amber-400" />
              <span>Breed Scanner</span>
            </button>

            <button
              id="nav-records-btn"
              onClick={() => setActiveTab("records")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "records"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/40"
                  : "text-emerald-100/80 hover:text-white hover:bg-emerald-900/50"
              }`}
            >
              <ClipboardList className="w-4 h-4 text-amber-400" />
              <span>Farm Records</span>
            </button>

            <button
              id="nav-catalog-btn"
              onClick={() => setActiveTab("catalog")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "catalog"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/40"
                  : "text-emerald-100/80 hover:text-white hover:bg-emerald-900/50"
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">Breed Catalog</span>
              <span className="md:hidden">Catalog</span>
            </button>

            <button
              id="nav-architecture-btn"
              onClick={() => setActiveTab("architecture")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "architecture"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/40"
                  : "text-emerald-100/80 hover:text-white hover:bg-emerald-900/50"
              }`}
            >
              <Cpu className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">Architecture</span>
              <span className="md:hidden">Pipeline</span>
            </button>

            <button
              id="nav-impact-btn"
              onClick={() => setActiveTab("impact")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "impact"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/40"
                  : "text-emerald-100/80 hover:text-white hover:bg-emerald-900/50"
              }`}
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span className="hidden lg:inline">Impact & References</span>
              <span className="lg:hidden">Impact</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
