import React, { useState } from "react";
import { FarmRecord } from "../types";
import { 
  ClipboardList, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Trash2, 
  Award, 
  Milk, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  MapPin,
  Tag
} from "lucide-react";

interface FarmRecordsViewProps {
  records: FarmRecord[];
  onAddRecord: (record: FarmRecord) => void;
  onDeleteRecord: (id: string) => void;
}

export const FarmRecordsView: React.FC<FarmRecordsViewProps> = ({
  records,
  onAddRecord,
  onDeleteRecord
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "cattle" | "buffalo">("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [tagNumber, setTagNumber] = useState(`IN-GJ-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [animalName, setAnimalName] = useState("");
  const [breed, setBreed] = useState("Gir");
  const [type, setType] = useState<"cattle" | "buffalo">("cattle");
  const [gender, setGender] = useState<FarmRecord["gender"]>("Cow");
  const [ageYears, setAgeYears] = useState(3);
  const [purity, setPurity] = useState(98.0);
  const [status, setStatus] = useState<FarmRecord["status"]>("Lactating");
  const [dailyYield, setDailyYield] = useState(15.0);
  const [healthNote, setHealthNote] = useState("Standard field vaccination up to date. Rumen digestion normal.");
  const [ownerName, setOwnerName] = useState("Farm Owner");

  // Filtering
  const filteredRecords = records.filter((rec) => {
    const matchesSearch = 
      rec.tagNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.animalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || rec.type === selectedType;
    const matchesStatus = selectedStatus === "all" || rec.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Aggregated Stats
  const totalAnimals = records.length;
  const cattleCount = records.filter((r) => r.type === "cattle").length;
  const buffaloCount = records.filter((r) => r.type === "buffalo").length;
  const avgPurity = totalAnimals > 0 ? (records.reduce((acc, r) => acc + r.purity, 0) / totalAnimals).toFixed(1) : "0";
  const totalDailyYield = records.reduce((acc, r) => acc + r.dailyYieldLiters, 0).toFixed(1);

  const handleExportCSV = () => {
    const headers = ["Tag Number", "Animal Name", "Breed", "Species", "Gender", "Age", "Purity (%)", "Status", "Daily Yield (L)", "Date Identified", "Health Notes"];
    const rows = records.map((r) => [
      r.tagNumber,
      `"${r.animalName}"`,
      `"${r.breed}"`,
      r.type,
      r.gender,
      r.ageYears,
      r.purity,
      r.status,
      r.dailyYieldLiters,
      r.dateIdentified,
      `"${r.healthNote}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `breedsense_farm_records_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: FarmRecord = {
      id: "rec-" + Date.now(),
      tagNumber: tagNumber.trim() || `IN-2026-${Date.now()}`,
      animalName: animalName.trim() || `${breed} #${Math.floor(100 + Math.random() * 900)}`,
      breed,
      type,
      gender,
      ageYears: Number(ageYears) || 3,
      purity: Number(purity) || 96.0,
      dateIdentified: new Date().toISOString().split("T")[0],
      status,
      dailyYieldLiters: Number(dailyYield) || 12.0,
      healthNote,
      ownerName
    };
    onAddRecord(newRecord);
    setShowAddModal(false);
    // Reset defaults
    setTagNumber(`IN-GJ-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    setAnimalName("");
  };

  return (
    <div className="space-y-6">
      {/* Header Context Banner */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              SOLVING PROBLEM 03: POOR RECORDS
            </span>
            <span className="text-xs text-stone-500">Digital Cattle & Buffalo Registry</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-stone-900">
            Digital Farm Records & Herd Management
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl">
            Accurate breed records prevent inbreeding, optimize lactation nutrition, and ensure authentic purebred pedigree documentation for dairy cooperatives.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            id="export-csv-btn"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold border border-stone-300 transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-700" />
            <span>Export CSV</span>
          </button>
          <button
            id="add-animal-btn"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Register Animal</span>
          </button>
        </div>
      </div>

      {/* Herd Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold uppercase">Total Registered</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-stone-900">{totalAnimals}</span>
            <span className="text-xs text-stone-500 font-medium">Head of Cattle/Buffalo</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold uppercase">Species Split</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-emerald-800">{cattleCount}</span>
            <span className="text-xs text-stone-500">Cattle /</span>
            <span className="text-2xl font-black text-teal-700">{buffaloCount}</span>
            <span className="text-xs text-stone-500">Buffalo</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold uppercase">Avg Breed Purity</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-amber-600">{avgPurity}%</span>
            <span className="text-xs text-stone-500 font-medium">Verified by YOLO</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold uppercase">Daily Milk Output</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-stone-900">{totalDailyYield}</span>
            <span className="text-xs text-stone-500 font-medium">Liters / day</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Ear Tag ID, Breed, or Animal Name..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as any)}
            className="text-xs py-2 px-3 border border-stone-300 rounded-lg bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Species</option>
            <option value="cattle">Cattle Only (Bos indicus / taurus)</option>
            <option value="buffalo">Water Buffalo Only</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs py-2 px-3 border border-stone-300 rounded-lg bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Statuses</option>
            <option value="Lactating">Lactating</option>
            <option value="Pregnant">Pregnant</option>
            <option value="Dry">Dry</option>
            <option value="Calving">Calving</option>
          </select>
        </div>
      </div>

      {/* Records Table / Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecords.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 hover:border-emerald-500/60 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header: Tag and Purity */}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="font-mono text-xs font-bold text-stone-900">
                      {record.tagNumber}
                    </span>
                  </div>
                  <h3 className="font-bold text-stone-900 text-sm mt-0.5">{record.animalName}</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                  {record.purity}% Purity
                </span>
              </div>

              {/* Thumbnail & Basic Specs */}
              <div className="flex gap-3 my-3">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                  {record.imageUrl ? (
                    <img
                      src={record.imageUrl}
                      alt={record.animalName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                      No Photo
                    </div>
                  )}
                </div>

                <div className="text-xs space-y-1 text-stone-600">
                  <div>
                    <span className="text-stone-400 text-[10px] uppercase block">Breed:</span>
                    <strong className="text-stone-900">{record.breed}</strong> ({record.type})
                  </div>
                  <div>
                    <span className="text-stone-400 text-[10px] uppercase block">Age / Gender:</span>
                    <span>{record.ageYears} yrs · {record.gender}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                      record.status === "Lactating"
                        ? "bg-emerald-100 text-emerald-800"
                        : record.status === "Pregnant"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-stone-100 text-stone-700"
                    }`}>
                      {record.status}
                    </span>
                    <span className="font-bold text-stone-800">{record.dailyYieldLiters} L/day</span>
                  </div>
                </div>
              </div>

              {/* Health Notes */}
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-100 text-[11px] text-stone-600 mb-3">
                <p className="line-clamp-2">{record.healthNote}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
              <span>Date: {record.dateIdentified}</span>
              <button
                onClick={() => onDeleteRecord(record.id)}
                className="p-1 rounded text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Delete Record"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <div className="bg-white rounded-2xl p-8 border border-stone-200 text-center text-stone-500">
          <ClipboardList className="w-10 h-10 text-stone-300 mx-auto mb-2" />
          <p className="font-semibold text-stone-700">No Records Found</p>
          <p className="text-xs mt-1">Try changing your search terms or click "Register Animal" above.</p>
        </div>
      )}

      {/* Add New Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 border border-stone-300 my-8">
            <h2 className="text-xl font-bold text-stone-900 mb-1">
              Register Cattle / Buffalo Record
            </h2>
            <p className="text-xs text-stone-500 mb-4">
              Enter individual tag and physical attributes to sync with the farm herd management system.
            </p>

            <form onSubmit={handleCreateRecord} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Ear Tag ID *</label>
                  <input
                    type="text"
                    required
                    value={tagNumber}
                    onChange={(e) => setTagNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Animal Name / Mark</label>
                  <input
                    type="text"
                    value={animalName}
                    onChange={(e) => setAnimalName(e.target.value)}
                    placeholder="e.g. Kamadhenu #102"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Species *</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="cattle">Cattle (Cow/Bull)</option>
                    <option value="buffalo">Water Buffalo</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Breed *</label>
                  <select
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="Gir">Gir (Gujarat)</option>
                    <option value="Murrah">Murrah (Haryana/Punjab)</option>
                    <option value="Sahiwal">Sahiwal (Punjab)</option>
                    <option value="Holstein Friesian (HF)">Holstein Friesian (HF)</option>
                    <option value="Jaffarabadi">Jaffarabadi (Gir Forest)</option>
                    <option value="Ongole">Ongole (Andhra Pradesh)</option>
                    <option value="Surti">Surti (Gujarat)</option>
                    <option value="Red Sindhi">Red Sindhi</option>
                    <option value="Tharparkar">Tharparkar (Rajasthan)</option>
                    <option value="Mehsana">Mehsana (Gujarat)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="Cow">Cow</option>
                    <option value="Bull">Bull</option>
                    <option value="Heifer">Heifer</option>
                    <option value="Buffalo Cow">Buffalo Cow</option>
                    <option value="Buffalo Bull">Buffalo Bull</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Age (Years)</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={ageYears}
                    onChange={(e) => setAgeYears(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Purity (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="50"
                    max="100"
                    value={purity}
                    onChange={(e) => setPurity(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Lactation Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="Lactating">Lactating</option>
                    <option value="Pregnant">Pregnant</option>
                    <option value="Dry">Dry</option>
                    <option value="Calving">Calving</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Daily Yield (Liters)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={dailyYield}
                    onChange={(e) => setDailyYield(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Health & Veterinary Notes</label>
                <textarea
                  rows={2}
                  value={healthNote}
                  onChange={(e) => setHealthNote(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
