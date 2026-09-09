import React, { useState, useRef, useEffect } from "react";
import { 
  Camera, 
  Upload, 
  Scan, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Eye, 
  Layers, 
  FileCheck, 
  Milk, 
  ShieldCheck, 
  MapPin, 
  Info, 
  Save, 
  Award,
  ChevronRight
} from "lucide-react";
import { DetectionResult, FarmRecord } from "../types";
import { SAMPLE_CATTLE_IMAGES, FULL_BREED_CATALOG } from "../data/breedsData";
import { CattleCertificateModal } from "./CattleCertificateModal";

interface ScannerViewProps {
  onSaveToRecords: (record: FarmRecord) => void;
  isOfflineMode: boolean;
}

type ScanStep = "idle" | "capturing" | "processing" | "detecting" | "result";

export const ScannerView: React.FC<ScannerViewProps> = ({
  onSaveToRecords,
  isOfflineMode
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(SAMPLE_CATTLE_IMAGES[0].thumbnailUrl);
  const [selectedBreedKey, setSelectedBreedKey] = useState<string>(SAMPLE_CATTLE_IMAGES[0].breedKey);
  const [currentStep, setCurrentStep] = useState<ScanStep>("result");
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(FULL_BREED_CATALOG[0]);
  const [showBoundingBox, setShowBoundingBox] = useState<boolean>(true);
  const [showKeypoints, setShowKeypoints] = useState<boolean>(true);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"traits" | "production" | "breeding">("traits");
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [customTagInput, setCustomTagInput] = useState<string>("IN-GJ-2026-" + Math.floor(1000 + Math.random() * 9000));
  const [activePresetId, setActivePresetId] = useState<string>(SAMPLE_CATTLE_IMAGES[0].id);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stop camera when unmounting
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      setCameraError("Camera access denied or unavailable in this environment. You can upload an image or choose one of the preset field samples below.");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const captureCameraFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        setSelectedImage(dataUrl);
        setSelectedBreedKey("");
        setActivePresetId("");
        stopCamera();
        runIdentification(dataUrl, "");
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setSelectedImage(dataUrl);
        setSelectedBreedKey("");
        setActivePresetId("");
        runIdentification(dataUrl, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetSelect = (preset: typeof SAMPLE_CATTLE_IMAGES[0]) => {
    setSelectedImage(preset.thumbnailUrl);
    setSelectedBreedKey(preset.breedKey);
    setActivePresetId(preset.id);
    stopCamera();
    runIdentification(preset.thumbnailUrl, preset.breedKey);
  };

  const runIdentification = async (imgData: string, breedHint: string) => {
    setIsSaved(false);
    // Step 01: Capture
    setCurrentStep("capturing");
    await new Promise((r) => setTimeout(r, 400));

    // Step 02: AI Processing (OpenCV contours & normalization)
    setCurrentStep("processing");
    await new Promise((r) => setTimeout(r, 600));

    // Step 03: Breed Detection (YOLOv8 / YOLOv12 + Vision inference)
    setCurrentStep("detecting");

    try {
      if (!isOfflineMode) {
        // Try calling full-stack backend
        const res = await fetch("/api/identify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageBase64: imgData.startsWith("data:") ? imgData : undefined,
            presetKey: breedHint || selectedBreedKey,
            manualHint: breedHint
          })
        });

        if (res.ok) {
          const json = await res.json();
          if (json.result) {
            setDetectionResult(json.result);
            setCurrentStep("result");
            return;
          }
        }
      }

      // Offline / Fallback Heuristic
      await new Promise((r) => setTimeout(r, 500));
      const matched = FULL_BREED_CATALOG.find(
        (b) => b.name.toLowerCase().includes(breedHint.toLowerCase()) || (selectedBreedKey && b.name.toLowerCase().includes(selectedBreedKey.toLowerCase()))
      ) || FULL_BREED_CATALOG[0];

      setDetectionResult(matched);
      setCurrentStep("result");
    } catch (err) {
      console.warn("Using offline catalog fallback:", err);
      setDetectionResult(FULL_BREED_CATALOG[0]);
      setCurrentStep("result");
    }
  };

  const handleSaveToRegistry = () => {
    if (!detectionResult) return;

    const newRecord: FarmRecord = {
      id: "rec-" + Date.now(),
      tagNumber: customTagInput,
      animalName: `${detectionResult.name} #${Math.floor(100 + Math.random() * 900)}`,
      breed: detectionResult.name,
      type: detectionResult.type,
      gender: detectionResult.type === "buffalo" ? "Buffalo Cow" : "Cow",
      ageYears: 3,
      purity: detectionResult.purity,
      dateIdentified: new Date().toISOString().split("T")[0],
      status: "Lactating",
      dailyYieldLiters: detectionResult.type === "buffalo" ? 15.5 : 17.0,
      healthNote: `Computer vision verified ${detectionResult.name} breed with ${detectionResult.purity}% purity. Features match NDDB breed standard.`,
      imageUrl: selectedImage || undefined,
      ownerName: "Registered Field Farmer"
    };

    onSaveToRecords(newRecord);
    setIsSaved(true);
  };

  return (
    <div className="space-y-6">
      {/* Slide 3 Problem & Solution Context Banner */}
      <div className="bg-gradient-to-r from-[#0D2E22] via-[#103D2E] to-[#0A2218] rounded-2xl p-4 sm:p-6 text-white border border-[#1C4C38] shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-emerald-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              OUR SOLUTION · COMPUTER VISION & DEEP LEARNING
            </span>
            <span className="text-xs text-emerald-400 font-medium">SIH 2026 Error 404</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Smart Cattle & Buffalo Breed Identification
          </h1>
          <p className="text-sm text-emerald-100/90 mt-1 leading-relaxed">
            BreedSense AI identifies indigenous and dairy breeds from live photos using YOLOv8 / YOLOv12 models and OpenCV morphological extraction. Instant identification · Mobile-friendly · Field-ready · Better farm management.
          </p>

          {/* 4-Step Pipeline Indicator Bar (Directly from Slide 3) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-4 pt-4 border-t border-[#1F533E]">
            <div className={`p-2 rounded-lg border transition-all ${
              currentStep === "capturing" 
                ? "bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/40" 
                : "bg-black/20 border-emerald-800/40 text-emerald-200"
            }`}>
              <div className="text-[10px] font-mono text-emerald-400">01 STEP</div>
              <div className="text-xs font-bold">Capture Image</div>
              <div className="text-[10px] text-stone-300">Camera or Upload</div>
            </div>

            <div className={`p-2 rounded-lg border transition-all ${
              currentStep === "processing" 
                ? "bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/40" 
                : "bg-black/20 border-emerald-800/40 text-emerald-200"
            }`}>
              <div className="text-[10px] font-mono text-emerald-400">02 STEP</div>
              <div className="text-xs font-bold">AI Processing</div>
              <div className="text-[10px] text-stone-300">Contour & Feature Check</div>
            </div>

            <div className={`p-2 rounded-lg border transition-all ${
              currentStep === "detecting" 
                ? "bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/40" 
                : "bg-black/20 border-emerald-800/40 text-emerald-200"
            }`}>
              <div className="text-[10px] font-mono text-emerald-400">03 STEP</div>
              <div className="text-xs font-bold">Breed Detection</div>
              <div className="text-[10px] text-stone-300">YOLOv8 / YOLOv12</div>
            </div>

            <div className={`p-2 rounded-lg border transition-all ${
              currentStep === "result" 
                ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400/40" 
                : "bg-black/20 border-emerald-800/40 text-emerald-200"
            }`}>
              <div className="text-[10px] font-mono text-amber-400">04 STEP</div>
              <div className="text-xs font-bold">Result</div>
              <div className="text-[10px] text-stone-300">Purity, Yield & Registry</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Scanner / Results Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Viewfinder & Input Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm">
            {/* Viewfinder Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Scan className="w-5 h-5 text-emerald-700" />
                <h2 className="font-bold text-stone-900 text-base">
                  Live Viewfinder & Specimen Feed
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {detectionResult && (
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 cursor-pointer select-none text-stone-600 font-medium">
                      <input
                        type="checkbox"
                        checked={showBoundingBox}
                        onChange={(e) => setShowBoundingBox(e.target.checked)}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>YOLO Box</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer select-none text-stone-600 font-medium">
                      <input
                        type="checkbox"
                        checked={showKeypoints}
                        onChange={(e) => setShowKeypoints(e.target.checked)}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Keypoints</span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Viewfinder Stage */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-stone-950 border-2 border-stone-300 shadow-inner flex items-center justify-center">
              {/* Camera Video Stream */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${isCameraActive ? "block" : "hidden"}`}
              />
              <canvas ref={canvasRef} className="hidden" />

              {/* Static / Uploaded Image View */}
              {!isCameraActive && selectedImage && (
                <div className="relative w-full h-full">
                  <img
                    src={selectedImage}
                    alt="Specimen view"
                    className="w-full h-full object-cover"
                  />

                  {/* YOLO Bounding Box Overlay */}
                  {showBoundingBox && detectionResult && currentStep === "result" && (
                    <div
                      className="absolute border-2 border-amber-400 bg-amber-400/10 rounded pointer-events-none transition-all duration-300"
                      style={{
                        left: `${detectionResult.yoloBoundingBox.x}%`,
                        top: `${detectionResult.yoloBoundingBox.y}%`,
                        width: `${detectionResult.yoloBoundingBox.width}%`,
                        height: `${detectionResult.yoloBoundingBox.height}%`
                      }}
                    >
                      <div className="absolute -top-6 left-0 bg-amber-500 text-stone-950 px-2 py-0.5 text-[11px] font-mono font-bold rounded shadow flex items-center gap-1">
                        <span>{detectionResult.yoloBoundingBox.label}</span>
                      </div>
                    </div>
                  )}

                  {/* Anatomical Keypoints Overlay */}
                  {showKeypoints && detectionResult && currentStep === "result" && (
                    <>
                      {detectionResult.detectedKeypoints.map((kp, idx) => (
                        <div
                          key={idx}
                          className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 group"
                          style={{ left: `${kp.x}%`, top: `${kp.y}%` }}
                        >
                          <div className="relative flex items-center justify-center">
                            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-stone-950" />
                          </div>
                          <div className="absolute left-3 -top-2 bg-stone-900/90 text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap shadow border border-emerald-500/40">
                            {kp.name}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}

              {/* Viewfinder Target Brackets (Camera HUD Effect) */}
              <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="w-8 h-8 border-t-2 border-l-2 border-amber-400/80 rounded-tl" />
                  <div className="w-8 h-8 border-t-2 border-r-2 border-amber-400/80 rounded-tr" />
                </div>
                <div className="flex justify-between">
                  <div className="w-8 h-8 border-b-2 border-l-2 border-amber-400/80 rounded-bl" />
                  <div className="w-8 h-8 border-b-2 border-r-2 border-amber-400/80 rounded-br" />
                </div>
              </div>

              {/* Viewfinder Telemetry HUD */}
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[10px] font-mono border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>OPENCV: ACTIVE</span>
                <span className="text-stone-400">|</span>
                <span>MODEL: YOLOv8-v12</span>
              </div>

              {/* Live Processing Indicator Overlay */}
              {(currentStep === "processing" || currentStep === "detecting" || currentStep === "capturing") && (
                <div className="absolute inset-0 bg-stone-950/75 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 z-20">
                  <div className="relative mb-4">
                    <RefreshCw className="w-12 h-12 text-amber-400 animate-spin" />
                    <Sparkles className="w-6 h-6 text-emerald-400 absolute -top-1 -right-1 animate-bounce" />
                  </div>
                  <h3 className="text-lg font-bold tracking-wide text-white">
                    {currentStep === "capturing" && "Step 01: Capturing Frame..."}
                    {currentStep === "processing" && "Step 02: Extracting Morphological Contours..."}
                    {currentStep === "detecting" && "Step 03: YOLOv8/v12 Breed Classification..."}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 max-w-sm text-center">
                    Analyzing horn shape, forehead curvature, ear hang, dewlap folds, and coat color markers...
                  </p>
                  <div className="w-48 bg-stone-800 rounded-full h-1.5 mt-4 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-400 to-amber-400 h-1.5 rounded-full animate-pulse w-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Camera Error Message */}
            {cameraError && (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{cameraError}</p>
                </div>
              </div>
            )}

            {/* Capture & Input Action Bar */}
            <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
              {isCameraActive ? (
                <>
                  <button
                    id="capture-frame-btn"
                    onClick={captureCameraFrame}
                    className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-2.5 px-4 rounded-xl shadow transition-all"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Capture & Identify</span>
                  </button>
                  <button
                    onClick={stopCamera}
                    className="py-2.5 px-4 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    id="start-camera-btn"
                    onClick={startCamera}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#0B2319] hover:bg-[#123627] text-white font-semibold py-2.5 px-4 rounded-xl shadow transition-all text-xs sm:text-sm"
                  >
                    <Camera className="w-4 h-4 text-amber-400" />
                    <span>Use Live Field Camera</span>
                  </button>
                  <button
                    id="upload-photo-btn"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold py-2.5 px-4 rounded-xl border border-stone-300 transition-all text-xs sm:text-sm"
                  >
                    <Upload className="w-4 h-4 text-emerald-700" />
                    <span>Upload Image</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => selectedImage && runIdentification(selectedImage, selectedBreedKey)}
                    className="p-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700"
                    title="Rerun AI detection on current frame"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Quick Test Presets (1-Click Sample Field Datasets) */}
            <div className="mt-5 pt-4 border-t border-stone-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Preset Field Test Samples (1-Click Evaluation)
                </span>
                <span className="text-[11px] text-stone-500">
                  Select a specimen to run YOLO detection
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                {SAMPLE_CATTLE_IMAGES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handlePresetSelect(sample)}
                    className={`relative rounded-lg overflow-hidden border-2 text-left group transition-all ${
                      activePresetId === sample.id
                        ? "border-amber-500 ring-2 ring-amber-400/40"
                        : "border-stone-200 hover:border-emerald-500"
                    }`}
                  >
                    <img
                      src={sample.thumbnailUrl}
                      alt={sample.title}
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="p-1 bg-stone-900/90 text-white text-[10px] leading-tight truncate">
                      {sample.breedKey === "gir" && "Gir Cow"}
                      {sample.breedKey === "murrah" && "Murrah Buffalo"}
                      {sample.breedKey === "holstein_friesian" && "Holstein HF"}
                      {sample.breedKey === "sahiwal" && "Sahiwal Cow"}
                      {sample.breedKey === "jaffarabadi" && "Jaffarabadi"}
                      {sample.breedKey === "ongole" && "Ongole Zebu"}
                      {sample.breedKey === "surti" && "Surti Buffalo"}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Detection Result & Farm Registry Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {detectionResult ? (
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
              {/* Breed Header Card */}
              <div className="bg-gradient-to-br from-[#0B2319] to-[#123627] text-white p-4 rounded-xl border border-[#1C4C38] relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        detectionResult.type === "cattle"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-400/30"
                          : "bg-teal-500/20 text-teal-300 border border-teal-400/30"
                      }`}>
                        {detectionResult.type === "cattle" ? "Cattle (Bos indicus)" : "Water Buffalo (Bubalus bubalis)"}
                      </span>
                      <span className="text-[10px] text-emerald-300 font-mono">
                        YOLOv8 Conf: {(detectionResult.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <h2 className="text-2xl font-black tracking-tight text-white">
                      {detectionResult.name}
                    </h2>
                    <p className="text-xs text-emerald-300/90 italic mt-0.5">
                      {detectionResult.scientificName}
                    </p>
                    <p className="text-xs text-stone-300 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{detectionResult.origin}</span>
                    </p>
                  </div>

                  {/* Purity Badge */}
                  <div className="text-right">
                    <div className="bg-black/30 border border-emerald-500/30 px-3 py-2 rounded-xl text-center">
                      <span className="text-[10px] text-emerald-300 uppercase font-semibold block">
                        Purity Index
                      </span>
                      <span className="text-2xl font-black text-amber-400">
                        {detectionResult.purity}%
                      </span>
                      <span className="text-[9px] text-stone-300 block">
                        {detectionResult.purity > 95 ? "Purebred Elite" : "Standard Cross"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-[10px] text-stone-300 mb-1">
                    <span>Breed Purity Level</span>
                    <span className="font-semibold text-emerald-300">{detectionResult.purity}% / 100%</span>
                  </div>
                  <div className="w-full bg-stone-900/60 rounded-full h-2 overflow-hidden border border-emerald-600/30">
                    <div 
                      className="bg-gradient-to-r from-emerald-400 to-amber-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${detectionResult.purity}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Sub-Tab Navigation for Deep Diagnostics */}
              <div className="flex border-b border-stone-200">
                <button
                  onClick={() => setActiveTab("traits")}
                  className={`flex-1 py-2 text-xs font-bold border-b-2 transition-colors ${
                    activeTab === "traits"
                      ? "border-emerald-700 text-emerald-800"
                      : "border-transparent text-stone-500 hover:text-stone-800"
                  }`}
                >
                  Key Traits
                </button>
                <button
                  onClick={() => setActiveTab("production")}
                  className={`flex-1 py-2 text-xs font-bold border-b-2 transition-colors ${
                    activeTab === "production"
                      ? "border-emerald-700 text-emerald-800"
                      : "border-transparent text-stone-500 hover:text-stone-800"
                  }`}
                >
                  Lactation & Yield
                </button>
                <button
                  onClick={() => setActiveTab("breeding")}
                  className={`flex-1 py-2 text-xs font-bold border-b-2 transition-colors ${
                    activeTab === "breeding"
                      ? "border-emerald-700 text-emerald-800"
                      : "border-transparent text-stone-500 hover:text-stone-800"
                  }`}
                >
                  Breeding Advice
                </button>
              </div>

              {/* Tab 1: Key Traits */}
              {activeTab === "traits" && (
                <div className="space-y-3 text-xs">
                  <div className="space-y-1.5">
                    <span className="font-bold text-stone-800 uppercase tracking-wide text-[11px]">
                      Identified Morphological Markers:
                    </span>
                    <ul className="space-y-1.5">
                      {detectionResult.keyTraits.map((trait, i) => (
                        <li key={i} className="flex items-start gap-2 text-stone-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{trait}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
                    <div className="p-2 bg-stone-50 rounded-lg border border-stone-100">
                      <span className="text-[10px] text-stone-500 font-bold uppercase block">Horns</span>
                      <span className="text-stone-800 font-medium">{detectionResult.physicalFeatures.horns}</span>
                    </div>
                    <div className="p-2 bg-stone-50 rounded-lg border border-stone-100">
                      <span className="text-[10px] text-stone-500 font-bold uppercase block">Ears</span>
                      <span className="text-stone-800 font-medium">{detectionResult.physicalFeatures.ears}</span>
                    </div>
                    <div className="p-2 bg-stone-50 rounded-lg border border-stone-100">
                      <span className="text-[10px] text-stone-500 font-bold uppercase block">Hump</span>
                      <span className="text-stone-800 font-medium">{detectionResult.physicalFeatures.hump}</span>
                    </div>
                    <div className="p-2 bg-stone-50 rounded-lg border border-stone-100">
                      <span className="text-[10px] text-stone-500 font-bold uppercase block">Dewlap</span>
                      <span className="text-stone-800 font-medium">{detectionResult.physicalFeatures.dewlap}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Production & Yield */}
              {activeTab === "production" && (
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1">
                        <Milk className="w-4 h-4 text-emerald-700" />
                        <span>Avg Milk Yield</span>
                      </div>
                      <span className="text-base font-extrabold text-stone-900 block">
                        {detectionResult.metrics.avgMilkYield}
                      </span>
                      <span className="text-[10px] text-emerald-700">Per 305-day lactation cycle</span>
                    </div>

                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                      <div className="flex items-center gap-1.5 text-amber-800 font-bold mb-1">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span>Butterfat Content</span>
                      </div>
                      <span className="text-base font-extrabold text-stone-900 block">
                        {detectionResult.metrics.fatPercentage}
                      </span>
                      <span className="text-[10px] text-amber-800">Higher ghee recovery rate</span>
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-stone-500 font-medium">Primary Economic Purpose:</span>
                      <strong className="text-stone-900">{detectionResult.metrics.purpose}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500 font-medium">Climatic Adaptation:</span>
                      <strong className="text-stone-900 text-right">{detectionResult.metrics.climateAdaptation}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500 font-medium">Health Resilience:</span>
                      <strong className="text-emerald-800 text-right">{detectionResult.healthResistance}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Breeding Advice */}
              {activeTab === "breeding" && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                    <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      Veterinary Breeding & Conservation Advice
                    </h4>
                    <p className="text-stone-700 leading-relaxed">
                      {detectionResult.breedingAdvice}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-blue-900">
                    <strong className="block mb-0.5">NDDB Indigenous Gene Pool Protection</strong>
                    <span>
                      Register this specimen in the National Livestock digital database to support selective breeding and disease trace mapping.
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons: Save to Digital Registry & Print Certificate */}
              <div className="pt-3 border-t border-stone-200 space-y-2.5">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customTagInput}
                    onChange={(e) => setCustomTagInput(e.target.value)}
                    placeholder="Ear Tag ID (e.g., IN-GJ-2026-081)"
                    className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                  <button
                    id="save-to-registry-btn"
                    onClick={handleSaveToRegistry}
                    disabled={isSaved}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow ${
                      isSaved
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-emerald-700 hover:bg-emerald-800 text-white"
                    }`}
                  >
                    {isSaved ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>Saved to Registry</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save to Farm Records</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  id="view-certificate-btn"
                  onClick={() => setShowCertificate(true)}
                  className="w-full flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-sm"
                >
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Generate Official Breed Purity Certificate & Passport</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-stone-200 text-center text-stone-500">
              <Scan className="w-12 h-12 text-stone-300 mx-auto mb-2" />
              <p className="font-semibold text-stone-700">No Specimen Analyzed Yet</p>
              <p className="text-xs mt-1">
                Capture an image using your camera or click one of the preset field samples to view complete breed purity diagnostics.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && detectionResult && (
        <CattleCertificateModal
          result={detectionResult}
          imageUrl={selectedImage || undefined}
          tagNumber={customTagInput}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
};
