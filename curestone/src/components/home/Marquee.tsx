"use client";
import React from 'react';

const Marquee = () => {
  const items = [
    "98% Stone-Free Success Rate",
    "30,000+ Happy Patients",
    "No Cuts · No Scars · No Radiation",
    "India's Best Kidney Stone Treatment",
    "Expertise of 15+ Years",
    "Senior Consultant Dr. Deepanshu Gupta",
  ];

  return (
    <div className="w-full bg-blue-900 overflow-hidden py-4 border-y border-white/10">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Double the items for seamless looping */}
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center mx-10">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-4"></span>
            <span className="text-sm font-black text-white/90 uppercase tracking-widest">{item}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Marquee;
