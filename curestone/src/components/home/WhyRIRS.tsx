import React from 'react';
import { ArrowRight } from 'lucide-react';

const WhyRIRS = () => {
  const highlights = [
    { icon: "✂️", title: "Zero Incisions", desc: "No cuts or stitches" },
    { icon: "☢️", title: "Radiation-Free", desc: "Laser-based safety" },
    { icon: "🏃", title: "24 Hr Discharge", desc: "Fast recovery" },
    { icon: "🎯", title: "98% Success", desc: "Proven outcomes" },
  ];

  const tableData = [
    { feature: "Incisions", rirs: "None", eswl: "None", pcnl: "Small (key-hole)" },
    { feature: "Radiation", rirs: "None", eswl: "Yes", pcnl: "Minimal" },
    { feature: "Stone-Free Rate", rirs: "98%", eswl: "60–70%", pcnl: "90–95%" },
    { feature: "Recovery", rirs: "1–2 days", eswl: "2–3 days", pcnl: "3–5 days" },
    { feature: "Anaesthesia", rirs: "Spinal", eswl: "None", pcnl: "General / Spinal" },
    { feature: "Stone Size", rirs: "Up to 20mm", eswl: "Up to 10mm", pcnl: "20mm+" },
    { feature: "Scarring", rirs: "None", eswl: "None", pcnl: "Minimal scar" },
    { feature: "Hospitalisation", rirs: "Day care", eswl: "Outpatient", pcnl: "2–4 days" },
  ];

  return (
    <>
      <section className="py-12 md:py-24 bg-slate-50 overflow-visible">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">

            {/* 1. Header with fixed line-height */}
            <div className="space-y-4 w-full">
              <span className="inline-block px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-primary bg-primary/10 border border-primary/20 rounded-full uppercase">
                Why Choose RIRS?
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1] pb-2">
                The <span className="text-primary italic">Gold Standard</span> <br className="hidden sm:block" />
                in Stone Care
              </h2>
              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
                Retrograde Intrarenal Surgery (RIRS) is a scarless procedure where a flexible scope reaches the kidney through natural pathways.
              </p>
            </div>

            {/* 2. Grid with uniform height cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {highlights.map((item, i) => (
                <div key={i} className="bg-white p-5 sm:p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center justify-center gap-2 transition-transform hover:scale-[1.02]">
                  <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">{item.icon}</span>
                  <p className="text-[10px] sm:text-[11px] font-black text-slate-900 uppercase tracking-widest leading-tight">
                    {item.title}
                  </p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* 3. Button with better padding */}
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-primary text-white font-black rounded-2xl shadow-2xl shadow-primary/30 hover:bg-primary-dark transition-all hover:-translate-y-1">
              Book RIRS Consultation <ArrowRight className="w-5 h-5" />
            </button>

          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-foreground">RIRS vs <span className="text-primary">Alternatives</span></h2>
            <p className="text-sm md:text-base text-text-light font-medium mt-4 max-w-xl mx-auto">See how RIRS compares to other kidney stone treatments on every important parameter.</p>
          </div>
          <div className="relative rounded-[2rem] md:rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl overflow-hidden">
            <div className="overflow-x-auto scrollbar-none sm:scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              <table className="w-full text-left border-collapse min-w-[700px] lg:min-w-0">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="sticky left-0 z-20 bg-slate-900 p-4 md:p-6 text-[9px] md:text-[10px] font-black uppercase tracking-widest border-b border-white/10 shadow-[2px_0_10px_rgba(0,0,0,0.3)] lg:shadow-none">Feature</th>
                    <th className="p-4 md:p-6 text-[9px] md:text-[10px] font-black uppercase tracking-widest border-b border-white/10 text-primary">🏆 RIRS</th>
                    <th className="p-4 md:p-6 text-[9px] md:text-[10px] font-black uppercase tracking-widest border-b border-white/10">ESWL</th>
                    <th className="p-4 md:p-6 text-[9px] md:text-[10px] font-black uppercase tracking-widest border-b border-white/10">PCNL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tableData.map((row, i) => (
                    <tr key={i} className="hover:bg-primary/5 transition-colors group/row">
                      <td className="sticky left-0 z-10 bg-white group-hover:bg-slate-50 p-4 md:p-6 text-[10px] md:text-[11px] font-black text-slate-500 uppercase tracking-wide border-r border-slate-100 shadow-[2px_0_10px_rgba(0,0,0,0.05)] lg:shadow-none">
                        {row.feature}
                      </td>
                      <td className="p-4 md:p-6 text-xs md:text-sm font-black text-primary bg-primary/5 border-r border-slate-100">
                        {row.rirs}
                      </td>
                      <td className="p-4 md:p-6 text-xs md:text-sm font-medium text-slate-600 border-r border-slate-100">
                        {row.eswl}
                      </td>
                      <td className="p-4 md:p-6 text-xs md:text-sm font-bold text-slate-800">
                        {row.pcnl}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyRIRS;