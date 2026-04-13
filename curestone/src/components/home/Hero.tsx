"use client";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useAnimationFrame } from "framer-motion";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Motion progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Apple-style heavy smooth spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 35,
    restDelta: 0.0001
  });

  const lastFrameIndex = useRef<number>(-1);
  const canvasSize = useRef({ width: 0, height: 0 });

  // 1. High-Performance render call
  const renderFrame = useCallback((prog: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length < FRAME_COUNT) return;
    
    // Core optimization: opaque context for better GPU throughput
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const frameIndex = Math.max(0, Math.min(Math.floor(prog * (FRAME_COUNT - 1)), FRAME_COUNT - 1));
    
    // Guard: Prevent redundant main-thread calls
    if (frameIndex === lastFrameIndex.current) return;
    lastFrameIndex.current = frameIndex;

    const frame = images[frameIndex];
    if (!frame) return;

    const { width, height } = canvasSize.current;
    if (width === 0 || height === 0) return;

    // Draw Logic
    const imgRatio = frame.width / frame.height;
    const canvasRatio = width / height;
    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    }

    // High performance draw
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "medium"; // Balanced
    ctx.drawImage(frame, offsetX, offsetY, drawWidth, drawHeight);
  }, [images]);

  // 2. Hardware-Accelerated Animation Loop (Decoupled from Scroll)
  useAnimationFrame(() => {
    if (isLoaded) {
      renderFrame(smoothProgress.get());
    }
  });

  // 3. Adaptive Canvas Resizer (Capped resolution)
  useEffect(() => {
    const updateSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      
      // Performance Cap: Limit pixel density to 1.5x to avoid massive VRAM usage while staying sharp
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvasSize.current = { width: canvas.width, height: canvas.height };
      
      if (isLoaded) renderFrame(smoothProgress.get());
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [renderFrame, smoothProgress, isLoaded]);

  // 4. Advanced GPU Pre-Warming (Image pre-decoding)
  useEffect(() => {
    let active = true;
    const preloadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      let loaded = 0;

      const promises = Array.from({ length: FRAME_COUNT }).map((_, i) => {
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          const framePath = `/ezgif-213ab7655818cce8-jpg/ezgif-frame-${(i + 1).toString().padStart(3, '0')}.jpg`;
          img.src = framePath;
          
          img.onload = async () => {
            // "Apple level" optimization: Force GPU decompression before use
            try {
              if (img.decode) await img.decode();
            } catch (e) {
              console.warn("Decoding failed for frame", i);
            }
            loaded++;
            if (active) setLoadingProgress(Math.round((loaded / FRAME_COUNT) * 100));
            resolve(img);
          };
          loadedImages[i] = img;
        });
      });

      const allImages = await Promise.all(promises);
      if (active) {
        setImages(allImages);
        setIsLoaded(true);
      }
    };

    preloadImages();
    return () => { active = false; };
  }, []);

  // 5. Active Scene Orchestration
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

  return (
    <div ref={containerRef} className="relative h-[800vh] bg-slate-950">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Loading Overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 z-[60] bg-slate-950 flex flex-col items-center justify-center text-white space-y-6">
            <div className="relative w-64 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 15 }}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-[10px] font-black tracking-[0.3em] uppercase text-primary animate-pulse">
                Calibrating Digital OT
              </p>
              <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest leading-none">
                Hardware Decryption · {loadingProgress}%
              </p>
            </div>
          </div>
        )}

        {/* Dynamic Canvas Background */}
        <div className="absolute inset-0 z-0 bg-slate-950">
          <canvas
            ref={canvasRef}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-70' : 'opacity-0'}`}
          />
          {/* Pro Vignette for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 pointer-events-none opacity-80" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-950/60 pointer-events-none" />
        </div>

        {/* Animated Text Scenes */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <AnimatePresence mode="wait">
            {activeScene && (
              <motion.div
                key={activeScene.id}
                initial={{ opacity: 0, y: 40, filter: "blur(20px)", scale: 0.9 }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, y: -40, filter: "blur(20px)", scale: 0.9 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} 
                className="max-w-5xl space-y-8"
              >
                {activeScene.badge && (
                  <motion.span
                    initial={{ opacity: 0, letterSpacing: "0.5em" }}
                    animate={{ opacity: 1, letterSpacing: "0.25em" }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="inline-block px-5 py-2 mb-4 text-[11px] font-black text-primary bg-primary/10 border border-primary/20 rounded-full uppercase"
                  >
                    {activeScene.badge}
                  </motion.span>
                )}
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.95] tracking-tight [text-wrap:balance]">
                  {activeScene.title}
                </h1>
                <p className="text-base sm:text-xl md:text-2xl text-white/50 font-medium max-w-2xl mx-auto leading-relaxed">
                  {activeScene.subtitle}
                </p>

                {activeScene.id === 4 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="pt-10 pointer-events-auto"
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
                      className="group relative px-12 py-6 bg-primary text-white font-black rounded-2xl overflow-hidden shadow-2xl transition-all hover:scale-105 active:scale-95"
                    >
                      <span className="relative z-10">BOOK FREE CONSULTATION →</span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Minimal Scroll Progression */}
        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
          <div className="hidden md:block">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-2">Clinical Protocol</p>
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`h-1 w-8 rounded-full transition-all duration-700 ${activeScene?.id === i + 1 ? 'bg-primary w-12' : 'bg-white/10'}`} />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-[9px] font-black text-white/40 uppercase tracking-[0.5em] mb-2 vertical-text"
            >
              Discover
            </motion.div>
            <div className="w-[2px] h-20 bg-white/5 rounded-full relative overflow-hidden">
              <motion.div
                className="absolute top-0 w-full bg-primary/60 origin-top"
                style={{ height: "100%", scaleY: smoothProgress }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </div>
  );
}