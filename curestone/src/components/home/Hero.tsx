"use client";
import { useEffect, useRef, useState, useCallback } from "react";

interface Scene {
  id: number;
  start: number;
  end: number;
  title: string;
  subtitle: string;
  badge?: string;
}

const SCENES: Scene[] = [
  {
    id: 1,
    start: 0,
    end: 0.15,
    title: "Welcome to Cure Stone",
    subtitle: "",
    badge: "Dr. Deepanshu Gupta"
  },
  {
    id: 2,
    start: 0.25,
    end: 0.45,
    title: "India's Best Kidney Stone Treatment",
    subtitle: "1st Ever to start Fans-RIRS in North India — By Dr. Deepanshu Gupta.",
    badge: "Precision Care"
  },
  {
    id: 3,
    start: 0.55,
    end: 0.75,
    title: "Unmatched Success Rate",
    subtitle: "Maintaining a 98% stone-free success rate over 30,000+ patient lives.",
    badge: "98% Success"
  },
  {
    id: 4,
    start: 0.85,
    end: 1,
    title: "Take Control of Your Health",
    subtitle: "Consult India's leading kidney specialist today at Cure Stone.",
    badge: "Book Free Consultation "
  }
];

const FRAME_COUNT = 120; // Total frames (ezgif-frame-001.jpg to ezgif-frame-120.jpg)

export default function ScrollCanvasHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [activeScene, setActiveScene] = useState<Scene | null>(SCENES[0]);
  const [opacity, setOpacity] = useState(0);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      // Using new directory and naming format
      const framePath = `/ezgif-213ab7655818cce8-jpg/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
      img.src = framePath;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === FRAME_COUNT) {
          setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || images.length < FRAME_COUNT) return;

    const frame = images[index];
    if (!frame) return;

    // Responsive Canvas Resizing
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;

    // Object-fit 'cover' emulation for canvas
    const imgRatio = frame.width / frame.height;
    const canvasRatio = canvas.width / canvas.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(frame, offsetX, offsetY, drawWidth, drawHeight);
  }, [images]);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollY = -rect.top;
      const maxScroll = containerRef.current.scrollHeight - window.innerHeight;
      targetProgress.current = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      // Lerp for smooth transition
      const lerpFactor = 0.04;
      currentProgress.current += (targetProgress.current - currentProgress.current) * lerpFactor;

      // Update frame index (0 to FRAME_COUNT - 1)
      const frameIndex = Math.floor(currentProgress.current * (FRAME_COUNT - 1));
      renderFrame(Math.max(0, Math.min(frameIndex, FRAME_COUNT - 1)));

      // Update scenes and opacity
      const prog = currentProgress.current;
      let currentScene = null;
      let currentOpacity = 0;

      for (const scene of SCENES) {
        if (prog >= scene.start && prog <= scene.end) {
          currentScene = scene;
          const range = scene.end - scene.start;
          const sceneProg = (prog - scene.start) / range;
          currentOpacity = Math.sin(sceneProg * Math.PI);
          break;
        }
      }

      setActiveScene(currentScene);
      setOpacity(currentOpacity);

      requestAnimationFrame(update);
    };

    const handleResize = () => {
      const frameIndex = Math.floor(currentProgress.current * (FRAME_COUNT - 1));
      renderFrame(Math.max(0, Math.min(frameIndex, FRAME_COUNT - 1)));
    };

    const rafId = requestAnimationFrame(update);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [renderFrame]);

  const loadingProgress = Math.round((loadedCount / FRAME_COUNT) * 100);

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Loading Overlay */}
        {loadedCount < FRAME_COUNT && (
          <div className="absolute inset-0 z-[60] bg-black flex flex-col items-center justify-center text-white space-y-4">
             <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-300" style={{ width: `${loadingProgress}%` }} />
             </div>
             <p className="text-[10px] font-black tracking-widest uppercase opacity-50">Initializing Medical Engine · {loadingProgress}%</p>
          </div>
        )}

        {/* Progress Bar (Visual aid) */}
        <div className="absolute top-0 left-0 h-1 bg-primary/40 z-50 transition-all duration-75" style={{ width: `${targetProgress.current * 100}%` }} />

        {/* Canvas Layer */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover opacity-70"
        />

        {/* Overlay Darkening */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />

        {/* Text Scenes Overlay */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-all duration-150 pointer-events-none"
          style={{ 
            opacity: opacity,
            transform: `translateY(${(1 - opacity) * 40}px)`
          }}
        >
          {activeScene && (
            <div className="max-w-4xl space-y-6">
              {activeScene.badge && (
                <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full uppercase">
                  {activeScene.badge}
                </span>
              )}
              <h1 className="text-4xl md:text-8xl font-black text-white leading-[1.1] tracking-tight">
                {activeScene.title}
              </h1>
              <p className="text-lg md:text-2xl text-white/70 font-medium max-w-2xl mx-auto leading-relaxed">
                {activeScene.subtitle}
              </p>
              
              {activeScene.id === 4 && (
                <div className="pt-8 pointer-events-auto">
                   <button 
                    onClick={() => {
                      const element = document.getElementById('appointment-section');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.location.href = '/book';
                      }
                    }}
                    className="px-10 py-5 bg-primary text-white font-black rounded-2xl shadow-2xl shadow-primary/40 hover:bg-primary-dark transition-all hover:scale-105 active:scale-95"
                   >
                      📅 BOOK FREE CONSULTATION
                   </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Fixed Side Label */}
        <div className={`absolute top-1/2 left-12 -translate-y-1/2 vertical-text hidden lg:block transition-opacity duration-1000 ${targetProgress.current > 0.05 ? 'opacity-20' : 'opacity-0'}`}>
           <p className="text-[10px] font-black text-white uppercase tracking-[1em] whitespace-nowrap">SCROLL TO ANALYZE • FANS-RIRS</p>
        </div>

        {/* Footer Info */}
        <div className={`absolute bottom-12 left-12 right-12 flex justify-between items-end transition-all duration-1000 ${targetProgress.current > 0.1 ? 'opacity-20 translate-y-4' : 'opacity-100 translate-y-0'}`}>
           <div className="space-y-1">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Procedural Visualization</p>
              <p className="text-sm font-bold text-white/80 italic">Advanced Laser Precision Engine</p>
           </div>
           <div className="flex flex-col items-end gap-2">
              <div className="w-1 h-12 bg-white/10 rounded-full overflow-hidden">
                 <div className="w-full bg-primary transition-all duration-300" style={{ height: `${targetProgress.current * 100}%` }} />
              </div>
              <p className="text-[10px] font-bold text-white/50 tracking-widest uppercase">Explore ↕</p>
           </div>
        </div>
      </div>
      
      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          transform: translateY(-50%) rotate(180deg);
        }
      `}</style>
    </div>
  );
}