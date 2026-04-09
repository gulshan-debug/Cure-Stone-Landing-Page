"use client";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

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

const FRAME_COUNT = 120;

export default function ScrollCanvasHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  // Framer Motion for Apple-style Smoothing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Spring physics for that "heavy" fluid feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
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

  const renderFrame = useCallback((prog: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || images.length < FRAME_COUNT) return;

    const frameIndex = Math.floor(prog * (FRAME_COUNT - 1));
    const frame = images[Math.max(0, Math.min(frameIndex, FRAME_COUNT - 1))];
    if (!frame) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;

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

  // Sync Smooth Progress with Canvas Rendering
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      renderFrame(latest);
    });
    return () => unsubscribe();
  }, [smoothProgress, renderFrame]);

  // Active Scene Logic
  const [activeScene, setActiveScene] = useState<Scene | null>(SCENES[0]);
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      let current = null;
      for (const scene of SCENES) {
        if (v >= scene.start - 0.05 && v <= scene.end + 0.05) {
          current = scene;
          break;
        }
      }
      setActiveScene(current);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  const loadingProgress = Math.round((loadedCount / FRAME_COUNT) * 100);

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-slate-50">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Loading Overlay */}
        {loadedCount < FRAME_COUNT && (
          <div className="absolute inset-0 z-[60] bg-slate-50 flex flex-col items-center justify-center text-slate-900 space-y-4">
             <div className="w-64 h-1 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-300" style={{ width: `${loadingProgress}%` }} />
             </div>
             <p className="text-[10px] font-black tracking-widest uppercase opacity-50">Initializing Medical Engine · {loadingProgress}%</p>
          </div>
        )}

        {/* Dynamic Canvas Background */}
        <div className="absolute inset-0 z-0 bg-slate-950">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover opacity-60 transition-opacity duration-1000"
          />
          {/* Dark Ambient Vignette for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80 pointer-events-none" />
        </div>

        {/* Animated Text Scenes */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <AnimatePresence mode="wait">
            {activeScene && (
              <motion.div
                key={activeScene.id}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)", scale: 0.95 }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, y: -30, filter: "blur(10px)", scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Apple-style cubic bezier
                className="max-w-4xl space-y-6"
              >
                {activeScene.badge && (
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black tracking-widest text-primary bg-primary/20 border border-primary/30 rounded-full uppercase"
                  >
                    {activeScene.badge}
                  </motion.span>
                )}
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.1] tracking-tight [text-wrap:balance]">
                  {activeScene.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 font-medium max-w-2xl mx-auto leading-relaxed">
                  {activeScene.subtitle}
                </p>
                
                {activeScene.id === 4 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-8 pointer-events-auto"
                  >
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
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global Progress Indicators (Apple-style) */}
        <motion.div 
          className="absolute top-0 left-0 h-1 bg-primary/60 z-50 transition-all duration-75 origin-left"
          style={{ scaleX: smoothProgress }}
        />

        <div className={`absolute top-1/2 left-12 -translate-y-1/2 vertical-text hidden lg:block transition-all duration-1000`}>
           <p className="text-[10px] font-black text-white opacity-20 uppercase tracking-[1em] whitespace-nowrap">SCROLL TO ANALYZE • FANS-RIRS</p>
        </div>

        {/* Bottom Info Bar */}
        <div className={`absolute bottom-12 left-12 right-12 flex justify-between items-end`}>
           <div className="space-y-1">
              <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Procedural Visualization</p>
              <p className="text-sm font-bold text-white/50 italic">Advanced Laser Precision Engine</p>
           </div>
           
           <div className="flex flex-col items-center gap-4">
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-[10px] font-black text-primary/80 uppercase tracking-widest"
              >
                Scroll ↓
              </motion.div>
              <div className="w-1 h-12 bg-white/10 rounded-full overflow-hidden relative">
                 <motion.div 
                   className="absolute bottom-0 w-full bg-primary transition-all duration-300 origin-bottom"
                   style={{ height: "100%", scaleY: smoothProgress }}
                 />
              </div>
              <p className="text-[10px] font-bold text-white/30 tracking-widest uppercase">Explore ↕</p>
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