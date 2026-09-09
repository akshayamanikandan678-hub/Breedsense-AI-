import React, { useState } from "react";
import { 
  Cpu, 
  ArrowRight, 
  Layers, 
  Code2, 
  Terminal, 
  ShieldCheck, 
  Zap, 
  GitBranch, 
  Database, 
  Smartphone, 
  Server,
  Activity,
  CheckCircle2
} from "lucide-react";

export const ArchitectureView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"flow" | "pipeline" | "code">("flow");

  return (
    <div className="space-y-6">
      {/* Header Context Banner (Slide 5: Technical Architecture) */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
            SLIDE 05 · SYSTEM DESIGN & DEEP LEARNING STACK
          </span>
          <span className="text-xs text-stone-500">Team Error 404 (SIH 2026)</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-stone-900">
          BreedSense AI Technical Architecture
        </h1>
        <p className="text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
          The end-to-end inference and training architecture powering instant cattle and buffalo breed classification from field imagery using OpenCV morphological segmentation and YOLO deep neural nets.
        </p>

        {/* View Switcher */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-stone-200">
          <button
            onClick={() => setActiveTab("flow")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === "flow"
                ? "bg-emerald-700 text-white shadow-sm"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            System Inference Flow
          </button>
          <button
            onClick={() => setActiveTab("pipeline")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === "pipeline"
                ? "bg-emerald-700 text-white shadow-sm"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            AI Data Pipeline
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === "code"
                ? "bg-emerald-700 text-white shadow-sm"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            Model Specs & Benchmark
          </button>
        </div>
      </div>

      {/* Interactive System Flow (Direct from Slide 5) */}
      {activeTab === "flow" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#0B2319] via-[#0E2C20] to-[#071911] text-white p-6 rounded-2xl border border-[#1C4C38] shadow-lg">
            <h2 className="text-lg font-bold text-amber-400 mb-6 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-emerald-400" />
              Runtime Data Flow (User → Prediction Result)
            </h2>

            {/* Step-by-Step Flowchart */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3 relative">
              {/* Step 1: User */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs mb-2">
                    01
                  </div>
                  <h3 className="font-bold text-sm text-white">User / Field Farmer</h3>
                  <p className="text-[11px] text-stone-300 mt-1">
                    Captures cattle image via smartphone or web camera.
                  </p>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono mt-3">Raw RGB Image</span>
              </div>

              {/* Step 2: Frontend */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs mb-2">
                    02
                  </div>
                  <h3 className="font-bold text-sm text-white">Frontend UI</h3>
                  <p className="text-[11px] text-stone-300 mt-1">
                    React / Vite / Mobile Viewport client interface.
                  </p>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono mt-3">Base64 / Canvas Stream</span>
              </div>

              {/* Step 3: Backend */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs mb-2">
                    03
                  </div>
                  <h3 className="font-bold text-sm text-white">FastAPI / Express</h3>
                  <p className="text-[11px] text-stone-300 mt-1">
                    REST API gateway routing inference & caching requests.
                  </p>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono mt-3">POST /api/identify</span>
              </div>

              {/* Step 4: OpenCV Preprocessing */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs mb-2">
                    04
                  </div>
                  <h3 className="font-bold text-sm text-white">OpenCV Preprocessing</h3>
                  <p className="text-[11px] text-stone-300 mt-1">
                    Resize (640x640), CLAHE contrast, morphological contouring.
                  </p>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono mt-3">Normalized Tensor</span>
              </div>

              {/* Step 5: YOLOv8 / YOLOv12 Model */}
              <div className="bg-amber-500/20 backdrop-blur-md p-4 rounded-xl border border-amber-400/40 flex flex-col justify-between ring-1 ring-amber-400/50">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-amber-400 text-stone-950 flex items-center justify-center font-bold text-xs mb-2">
                    05
                  </div>
                  <h3 className="font-bold text-sm text-amber-300">YOLO Model v8 / v12</h3>
                  <p className="text-[11px] text-stone-200 mt-1">
                    Darknet backbone + Feature Pyramid Network + Detection Heads.
                  </p>
                </div>
                <span className="text-[10px] text-amber-300 font-mono mt-3">Confidence & Keypoints</span>
              </div>

              {/* Step 6: Prediction Result */}
              <div className="bg-emerald-500/20 backdrop-blur-md p-4 rounded-xl border border-emerald-400/40 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-400 text-stone-950 flex items-center justify-center font-bold text-xs mb-2">
                    06
                  </div>
                  <h3 className="font-bold text-sm text-emerald-300">Prediction Result</h3>
                  <p className="text-[11px] text-stone-200 mt-1">
                    Breed name, Purity %, Milk Yield projection, Digital Record.
                  </p>
                </div>
                <span className="text-[10px] text-emerald-300 font-mono mt-3">JSON Diagnosis</span>
              </div>
            </div>
          </div>

          {/* Technology Stack Cards (Slide 5: Technology Stack) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[11px] text-stone-500 font-bold uppercase block">Deep Learning Model</span>
              <h3 className="text-lg font-black text-stone-900 mt-0.5">YOLOv8 / YOLOv12</h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Trained on annotated Indian cattle datasets for object detection, multi-label breed classification, and morphological keypoint estimation.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-[11px] text-stone-500 font-bold uppercase block">Computer Vision</span>
              <h3 className="text-lg font-black text-stone-900 mt-0.5">OpenCV (Python/C++)</h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Adaptive thresholding, background blur, contour detection, and lighting normalization for harsh outdoor rural farm environments.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                <Server className="w-5 h-5" />
              </div>
              <span className="text-[11px] text-stone-500 font-bold uppercase block">Backend Engine</span>
              <h3 className="text-lg font-black text-stone-900 mt-0.5">Java + FastAPI / Express</h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                High-throughput asynchronous microservices handling model inference, farm record indexing, and edge syncing.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="text-[11px] text-stone-500 font-bold uppercase block">Frontend Architecture</span>
              <h3 className="text-lg font-black text-stone-900 mt-0.5">React / Tailwind / PWA</h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Mobile-optimized responsive user experience with offline caching, camera viewfinder HUD, and interactive registry management.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* AI Data Pipeline (Direct from Slide 5) */}
      {activeTab === "pipeline" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
            <h2 className="text-lg font-bold text-stone-900 mb-2">
              AI Data Pipeline Lifecycle
            </h2>
            <p className="text-xs text-stone-500 mb-6">
              The continuous cycle used by Team Error 404 to curate datasets, train YOLO detection weights, and validate breed purity benchmarks.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] font-mono text-emerald-700 font-bold block mb-1">STAGE 01</span>
                <h4 className="font-bold text-stone-900 text-sm">Data Collection</h4>
                <p className="text-xs text-stone-600 mt-2">
                  Acquired high-res imagery from NDDB, AGROTECH, ICAR-IVRI, and Kaggle open agriculture repositories across varied lighting.
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] font-mono text-emerald-700 font-bold block mb-1">STAGE 02</span>
                <h4 className="font-bold text-stone-900 text-sm">Image Annotation</h4>
                <p className="text-xs text-stone-600 mt-2">
                  Bounding boxes for full bovine body, plus keypoint annotations on forehead, horns, withers, hump, dewlap, and udder.
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] font-mono text-emerald-700 font-bold block mb-1">STAGE 03</span>
                <h4 className="font-bold text-stone-900 text-sm">Model Training</h4>
                <p className="text-xs text-stone-600 mt-2">
                  Fine-tuned YOLOv8/v12 with Mosaic data augmentation, focal loss for class imbalance, and transfer learning on pre-trained weights.
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] font-mono text-emerald-700 font-bold block mb-1">STAGE 04</span>
                <h4 className="font-bold text-stone-900 text-sm">Validation & Testing</h4>
                <p className="text-xs text-stone-600 mt-2">
                  Cross-validation on unseen field cattle herds, achieving 96.8% precision and 94.2% recall on top 10 indigenous breeds.
                </p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-300">
                <span className="text-[10px] font-mono text-emerald-800 font-bold block mb-1">STAGE 05</span>
                <h4 className="font-bold text-emerald-950 text-sm">Deployment</h4>
                <p className="text-xs text-emerald-900 mt-2">
                  Quantized ONNX and TFLite models exported for sub-second edge inference on mobile farm devices and cloud APIs.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Model Specs & Benchmark Tab */}
      {activeTab === "code" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Inference & Hardware Benchmark
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 font-semibold block uppercase text-[10px]">Cloud GPU Latency</span>
                <span className="text-xl font-black text-stone-900 mt-1 block">42 ms</span>
                <span className="text-[10px] text-stone-400">NVIDIA T4 / Cloud Run</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 font-semibold block uppercase text-[10px]">Mobile Edge Latency</span>
                <span className="text-xl font-black text-stone-900 mt-1 block">180 ms</span>
                <span className="text-[10px] text-stone-400">Snapdragon 7-series (NPU)</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 font-semibold block uppercase text-[10px]">mAP@0.5 Accuracy</span>
                <span className="text-xl font-black text-emerald-800 mt-1 block">96.4%</span>
                <span className="text-[10px] text-emerald-700">Validated on 10+ breeds</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 font-semibold block uppercase text-[10px]">Quantized Model Size</span>
                <span className="text-xl font-black text-stone-900 mt-1 block">14.8 MB</span>
                <span className="text-[10px] text-stone-400">FP16 / INT8 ONNX</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-stone-600 space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero cellular network dependence in edge mode</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Automatic illumination correction for direct sunlight and shed shadows</span>
              </div>
            </div>
          </div>

          {/* Code Architecture Preview */}
          <div className="bg-stone-950 text-emerald-400 p-5 rounded-2xl font-mono text-xs overflow-x-auto shadow-lg border border-stone-800">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800 text-stone-400">
              <span>pipeline_inference.py</span>
              <span className="text-[10px] bg-stone-800 px-2 py-0.5 rounded text-amber-300">YOLOv8 + OpenCV</span>
            </div>
            <pre className="text-[11px] leading-relaxed text-stone-300">
{`import cv2
from ultralytics import YOLO

# Load fine-tuned BreedSense YOLO model
model = YOLO("weights/breedsense_yolov8x.pt")

def identify_bovine_breed(image_path):
    # 01 Image Preprocessing with OpenCV
    img = cv2.imread(image_path)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # 02 Contrast Limited Adaptive Histogram Equalization
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
    
    # 03 Model Forward Pass
    results = model.predict(img_rgb, conf=0.65, imgsz=640)
    
    for r in results:
        boxes = r.boxes
        breed_id = int(boxes.cls[0])
        confidence = float(boxes.conf[0])
        purity_score = compute_morphological_purity(r.keypoints)
        
    return {
        "breed": model.names[breed_id],
        "confidence": confidence,
        "purity_pct": purity_score
    }`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
