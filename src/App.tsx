import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { ScannerView } from "./components/ScannerView";
import { FarmRecordsView } from "./components/FarmRecordsView";
import { BreedCatalogView } from "./components/BreedCatalogView";
import { ArchitectureView } from "./components/ArchitectureView";
import { ImpactResearchView } from "./components/ImpactResearchView";
import { INITIAL_FARM_RECORDS } from "./data/breedsData";
import { FarmRecord } from "./types";
import { Smartphone, Sparkles, Award } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"scanner" | "records" | "catalog" | "architecture" | "impact">("scanner");
  const [records, setRecords] = useState<FarmRecord[]>(INITIAL_FARM_RECORDS);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);

  const handleSaveToRecords = (newRecord: FarmRecord) => {
    setRecords((prev) => [newRecord, ...prev]);
  };

  const handleDeleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F7F8F5] text-stone-900 flex flex-col font-sans selection:bg-emerald-200">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileView={isMobileView}
        setIsMobileView={setIsMobileView}
        isOfflineMode={isOfflineMode}
        setIsOfflineMode={setIsOfflineMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {isMobileView ? (
          /* Mobile Handheld Field Simulator Frame (Roadmap 02) */
          <div className="flex flex-col items-center justify-center my-4">
            <div className="text-center mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                <Smartphone className="w-3.5 h-3.5 text-amber-700" />
                Handheld Rural Farm Device Simulator (Roadmap 02)
              </span>
              <p className="text-xs text-stone-500 mt-1">
                Testing responsive touch ergonomics for rugged pasture conditions
              </p>
            </div>

            <div className="w-full max-w-[430px] bg-stone-900 p-3 rounded-[40px] shadow-2xl border-4 border-stone-800 relative">
              {/* Phone Speaker Notch */}
              <div className="w-28 h-4 bg-stone-950 rounded-full mx-auto mb-2" />
              {/* Phone Screen Container */}
              <div className="bg-[#F7F8F5] rounded-[28px] overflow-y-auto max-h-[800px] p-3 text-stone-900">
                {activeTab === "scanner" && (
                  <ScannerView
                    onSaveToRecords={handleSaveToRecords}
                    isOfflineMode={isOfflineMode}
                  />
                )}
                {activeTab === "records" && (
                  <FarmRecordsView
                    records={records}
                    onAddRecord={handleSaveToRecords}
                    onDeleteRecord={handleDeleteRecord}
                  />
                )}
                {activeTab === "catalog" && <BreedCatalogView />}
                {activeTab === "architecture" && <ArchitectureView />}
                {activeTab === "impact" && <ImpactResearchView />}
              </div>
            </div>
          </div>
        ) : (
          /* Desktop / Tablet Fluid Responsive View */
          <div>
            {activeTab === "scanner" && (
              <ScannerView
                onSaveToRecords={handleSaveToRecords}
                isOfflineMode={isOfflineMode}
              />
            )}
            {activeTab === "records" && (
              <FarmRecordsView
                records={records}
                onAddRecord={handleSaveToRecords}
                onDeleteRecord={handleDeleteRecord}
              />
            )}
            {activeTab === "catalog" && <BreedCatalogView />}
            {activeTab === "architecture" && <ArchitectureView />}
            {activeTab === "impact" && <ImpactResearchView />}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#0B2319] text-stone-300 border-t border-[#1C4C38] py-8 px-4 sm:px-6 lg:px-8 text-xs mt-12 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-amber-400 flex items-center justify-center font-extrabold text-sm border border-emerald-400/40">
              BS
            </div>
            <div>
              <span className="font-bold text-white tracking-wide">BREEDSENSE AI</span>
              <p className="text-[11px] text-emerald-400/90">
                Smart India Hackathon 2026 · Software Category · Team Error 404
              </p>
            </div>
          </div>

          <div className="text-center sm:text-right text-[11px] text-stone-400">
            <p>Phavithran S · Anbu Selvam S · Vishnu K · Saimugunth S · Akshaya M · Trissha K L</p>
            <p className="text-emerald-400/80 mt-0.5">
              Aligned with National Dairy Development Board (NDDB) and DAHD Standards
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
