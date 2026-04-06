"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  title: string;
  name: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  isTall?: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  { 
    id: 1, 
    title: "15mm Kidney Stone RIRS", 
    name: "Rahul Agarwal", 
    category: "RIRS Surgery",
    thumbnail: "/kGwihRRAyFg-HD.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1", 
    isTall: true 
  },
  { 
    id: 2, 
    title: "Bilateral Stone Removal", 
    name: "Baby Bhavika", 
    category: "Pediatric Care",
    thumbnail: "/6Tj_fWRvCpo-HD.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
  },
  { 
    id: 3, 
    title: "Zero Pain Recovery", 
    name: "Ms Sakshi", 
    category: "Stone-Free",
    thumbnail: "/6Tj_fWRvCpo-HD.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
  },
  { 
    id: 4, 
    title: "Advanced Prostate Care", 
    name: "Mr. Devender Singh", 
    category: "Laser Surgery",
    thumbnail: "/6Tj_fWRvCpo-HD.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
  },
  { 
    id: 5, 
    title: "Full Family Recovery", 
    name: "Madhav Choudhary", 
    category: "Urology",
    thumbnail: "/6Tj_fWRvCpo-HD.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1", 
    isTall: true 
  },
  { 
    id: 6, 
    title: "Successful RIRS", 
    name: "Dr. Abhilasha Agarwal", 
    category: "Post-Op",
    thumbnail: "/6Tj_fWRvCpo-HD.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
  },
  { 
    id: 7, 
    title: "Complex ESWL Case", 
    name: "Vikram Sharma", 
    category: "Laser Treatment",
    thumbnail: "/6Tj_fWRvCpo-HD.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
  },
  { 
    id: 8, 
    title: "100% Stone-Free", 
    name: "Sunita Choudhary", 
    category: "Patient Story",
    thumbnail: "/6Tj_fWRvCpo-HD.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
  }
];

export default function PatientMosaic() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = activeVideo ? 'hidden' : 'unset';
  }, [activeVideo]);

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-[1440px] mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[0.95]">
              Real Patients. <span className="text-blue-600 italic">Real Voices.</span>
            </h2>
          </div>
          <p className="text-slate-500 text-lg font-medium max-w-sm border-l-2 border-slate-200 pl-6">
             Watch authentic recovery journeys from the world's most advanced kidney stone center.
          </p>
        </div>

        {/* Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-[220px]">
          {/* Item 1 (Tall) */}
          <div className="md:col-span-1 md:row-span-2">
            <TestimonialCard item={TESTIMONIALS[0]} onClick={() => setActiveVideo(TESTIMONIALS[0].videoUrl)} />
          </div>
          
          <div className="md:row-span-1"><TestimonialCard item={TESTIMONIALS[1]} onClick={() => setActiveVideo(TESTIMONIALS[1].videoUrl)} /></div>
          <div className="md:row-span-1"><TestimonialCard item={TESTIMONIALS[2]} onClick={() => setActiveVideo(TESTIMONIALS[2].videoUrl)} /></div>
          <div className="md:row-span-1"><TestimonialCard item={TESTIMONIALS[3]} onClick={() => setActiveVideo(TESTIMONIALS[3].videoUrl)} /></div>
          
          {/* Item 5 (Tall) */}
          <div className="md:col-span-1 md:row-span-2">
            <TestimonialCard item={TESTIMONIALS[4]} onClick={() => setActiveVideo(TESTIMONIALS[4].videoUrl)} />
          </div>

          <div className="md:row-span-1"><TestimonialCard item={TESTIMONIALS[5]} onClick={() => setActiveVideo(TESTIMONIALS[5].videoUrl)} /></div>
          <div className="md:row-span-1"><TestimonialCard item={TESTIMONIALS[6]} onClick={() => setActiveVideo(TESTIMONIALS[6].videoUrl)} /></div>
          <div className="md:row-span-1"><TestimonialCard item={TESTIMONIALS[7]} onClick={() => setActiveVideo(TESTIMONIALS[7].videoUrl)} /></div>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-2xl transition-opacity animate-in fade-in duration-500" onClick={() => setActiveVideo(null)} />
          <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl animate-in zoom-in-95 duration-500">
             <iframe src={activeVideo} className="w-full h-full" allowFullScreen allow="autoplay" />
          </div>
        </div>
      )}
    </section>
  );
}

function TestimonialCard({ item, onClick }: { item: Testimonial, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="group relative h-full w-full rounded-[1.5rem] overflow-hidden bg-slate-200 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/10 border border-slate-100"
    >
      {/* Thumbnail Image */}
      <Image 
        src={item.thumbnail} 
        alt={item.title} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-110" 
      />

      {/* Smart Overlays */}
      {/* 1. Darken for readability */}
      <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors duration-500" />
      
      {/* 2. Gradient for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
        <div className="flex justify-between items-start">
          <span className="px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-bold text-white uppercase tracking-widest">
            {item.category}
          </span>
          
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>

        <div className="space-y-1">
          <h4 className="text-white font-bold text-lg leading-tight line-clamp-2">
            {item.title}
          </h4>
          <p className="text-white/70 text-xs font-medium">
            {item.name}
          </p>
        </div>
      </div>

      {/* Hover Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
    </div>
  );
}