"use client";

import { SERVICES } from "@/constants/services";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SpecialtyPage() {
  const { slug } = useParams() as { slug: string };
  const service = SERVICES.find((s) => s.slug === slug);

  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!service) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navbar />

      <main className="flex-grow bg-white">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-40 md:pb-24 bg-slate-50 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(43,92,230,0.1),transparent_60%)]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="max-w-2xl lg:max-w-none">
                <span className="inline-block px-3 py-1 mb-6 text-[10px] font-black tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full uppercase">
                  Gold Standard Treatment
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1] mb-6">
                  {service.name.split(' ').map((word, i) => (
                    <span key={i} className={`${i === 0 ? "text-primary italic" : "text-slate-900"} inline-block mr-2`}>
                      {word}
                    </span>
                  ))}
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-slate-600 font-medium leading-relaxed mb-10">
                  {service.fullDesc}{" "}
                  <span className="text-slate-900 font-bold">
                    {service.stats[0].value} {service.stats[0].label}. {service.stats[1].value} {service.stats[1].label}.
                  </span>
                </p>
                <div className="flex flex-col xs:flex-row gap-4">
                  <Link
                    href="/book"
                    className="flex-1 sm:flex-none px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary-dark hover:scale-105 active:scale-95 transition-all text-center no-underline text-sm md:text-base"
                  >
                    Book Consultation →
                  </Link>
                  <Link
                    href="/checker"
                    className="flex-1 sm:flex-none px-8 py-4 bg-white border border-slate-200 text-slate-900 font-black rounded-2xl hover:bg-slate-50 transition-all shadow-sm text-center no-underline text-sm md:text-base"
                  >
                    Check My Symptoms
                  </Link>
                </div>
              </div>

              {/* Responsive Video Wrapper */}
              <div className="relative w-full aspect-video rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white bg-white group">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${service.videoGallery[0].ytId}`}
                  title={`${service.name} Procedure Video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Symptoms & Treatment Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div className="space-y-10 md:space-y-16">
                <div>
                  <span className="inline-block px-4 py-1 mb-4 text-[10px] font-black tracking-widest text-primary bg-primary/5 rounded-full uppercase">Identification</span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6">Common <span className="text-primary italic">Symptoms</span></h2>
                  <div className="grid gap-4 sm:grid-cols-1">
                    {service.symptoms.map((symptom, i) => (
                      <div key={i} className="flex gap-4 items-start group">
                        <div className="shrink-0 w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary mt-1">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                        </div>
                        <p className="text-slate-600 font-semibold text-sm md:text-base">{symptom}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 md:p-8 bg-red-50 border border-red-100 rounded-2xl md:rounded-[2rem]">
                  <h4 className="flex items-center gap-2 text-red-600 font-black uppercase text-[10px] tracking-widest mb-4">
                    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    Emergency Warning Signs
                  </h4>
                  <ul className="space-y-3">
                    {service.emergencySigns.map((sign, i) => (
                      <li key={i} className="text-red-900/80 font-bold text-sm flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 shrink-0" />
                        {sign}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar/Sticky Section */}
              <div className="lg:sticky lg:top-32 space-y-6 md:space-y-8">
                <div className="bg-slate-900 rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 text-white">
                  <h3 className="text-xl md:text-2xl font-black mb-6 md:mb-8">Available Treatments</h3>
                  <div className="grid gap-3">
                    {service.treatments.map((treatment, i) => (
                      <div key={i} className="flex justify-between items-center p-4 md:p-5 bg-white/5 border border-white/10 rounded-xl hover:bg-primary/20 transition-all cursor-pointer group">
                        <span className="font-bold text-sm md:text-base">{treatment}</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Gallery - Fluid Grid */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900">Expert <span className="text-primary italic">Video Guides</span></h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {service.videoGallery.map((video, idx) => (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-slate-200">
                  <div className="relative aspect-video">
                    {playingVideoId === video.ytId ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${video.ytId}?autoplay=1`}
                        className="w-full h-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    ) : (
                      <div className="absolute inset-0 cursor-pointer" onClick={() => setPlayingVideoId(video.ytId)}>
                        <img src={`https://img.youtube.com/vi/${video.ytId}/mqdefault.jpg`} className="w-full h-full object-cover" alt={video.title} />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20"><div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary">▶</div></div>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h4 className="font-black text-slate-900 text-sm md:text-base">{video.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Simplified Footer CTA */}
        <section className="py-16 md:py-24 bg-primary text-center px-4">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Experience Award-Winning Care</h2>
          <Link
            href="/book"
            className="inline-block px-8 py-4 bg-white text-primary font-black rounded-xl text-lg hover:scale-105 transition-all"
          >
            Book Free Consultation
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}