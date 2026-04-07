"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

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
    isTall: true,
  },
  {
    id: 2,
    title: "Bilateral Stone Removal",
    name: "Baby Bhavika",
    category: "Pediatric Care",
    thumbnail: "/6Tj_fWRvCpo-HD.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
  {
    id: 3,
    title: "Zero Pain Recovery",
    name: "Ms Sakshi",
    category: "Stone-Free",
    thumbnail: "/6Tj_fWRvCpo-HD.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
  {
    id: 4,
    title: "Advanced Prostate Care",
    name: "Mr. Devender Singh",
    category: "Laser Surgery",
    thumbnail: "/6Tj_fWRvCpo-HD.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
  {
    id: 5,
    title: "Full Family Recovery",
    name: "Madhav Choudhary",
    category: "Urology",
    thumbnail: "/6Tj_fWRvCpo-HD.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    isTall: true,
  },
  {
    id: 6,
    title: "Successful RIRS",
    name: "Dr. Abhilasha Agarwal",
    category: "Post-Op",
    thumbnail: "/6Tj_fWRvCpo-HD.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
  {
    id: 7,
    title: "Complex ESWL Case",
    name: "Vikram Sharma",
    category: "Laser Treatment",
    thumbnail: "/6Tj_fWRvCpo-HD.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
  {
    id: 8,
    title: "100% Stone-Free",
    name: "Sunita Choudhary",
    category: "Patient Story",
    thumbnail: "/6Tj_fWRvCpo-HD.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
];

export default function PatientMosaic() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = activeVideo ? "hidden" : "unset";
  }, [activeVideo]);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 lg:mb-12 gap-6 lg:gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1]">
              Real Patients.{" "}
              <span className="text-blue-600 italic">Real Voices.</span>
            </h2>
          </div>

          <p className="text-slate-500 text-sm sm:text-base lg:text-lg font-medium max-w-sm border-l-2 border-slate-200 pl-4 sm:pl-6">
            Watch authentic recovery journeys from the world's most advanced
            kidney stone center.
          </p>
        </div>

        {/* Responsive Grid */}
        <div
          className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-4 
          xl:grid-cols-5 
          gap-4 
          auto-rows-[180px] 
          sm:auto-rows-[200px] 
          lg:auto-rows-[220px]
        "
        >
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className={`
                ${item.isTall ? "sm:row-span-2" : "row-span-1"}
              `}
            >
              <TestimonialCard
                item={item}
                onClick={() => setActiveVideo(item.videoUrl)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl"
            onClick={() => setActiveVideo(null)}
          />
          <div className="relative w-full max-w-5xl aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-2xl animate-in zoom-in-95 duration-300">
            <iframe
              src={activeVideo}
              className="w-full h-full"
              allowFullScreen
              allow="autoplay"
            />
          </div>
        </div>
      )}
    </section>
  );
}

function TestimonialCard({
  item,
  onClick,
}: {
  item: Testimonial;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group relative h-full w-full rounded-2xl sm:rounded-[1.5rem] overflow-hidden bg-slate-200 cursor-pointer transition-all duration-500 active:scale-95 hover:shadow-2xl hover:shadow-blue-900/10 border border-slate-100"
    >
      <Image
        src={item.thumbnail}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

      {/* Content */}
      <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between z-10">
        <div className="flex justify-between items-start">
          <span className="px-2 py-1 sm:px-2.5 sm:py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[8px] sm:text-[10px] font-bold text-white uppercase tracking-widest">
            {item.category}
          </span>

          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
            ▶
          </div>
        </div>

        <div className="space-y-1">
          <h4 className="text-white font-bold text-sm sm:text-base lg:text-lg leading-tight line-clamp-2">
            {item.title}
          </h4>
          <p className="text-white/70 text-[10px] sm:text-xs font-medium">
            {item.name}
          </p>
        </div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
    </div>
  );
}