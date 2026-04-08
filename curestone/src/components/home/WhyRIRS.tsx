import React from 'react';

const WhyRIRS = () => {
  const highlights = [
    { icon: "✂️", title: "Zero Incisions", desc: "No cuts or stitches required" },
    { icon: "☢️", title: "Radiation-Free", desc: "Fluoroscopy-free RIRS surgery" },
    { icon: "🏃", title: "Discharge in 24 Hrs", desc: "Fast recovery & return to work" },
    { icon: "🎯", title: "98% Success Rate", desc: "Proven clinical outcomes" },
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
    <section className="py-16 md:py-24 bg-background-alt">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center overflow-visible">
          {/* Left Column: Content */}
          <div className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left w-full max-w-full overflow-visible">
            <div className="space-y-4 w-full">
              <span className="inline-block px-4 py-1.5 text-[10px] font-black tracking-widest text-primary bg-primary/5 border border-primary/10 rounded-full uppercase">
                Why RIRS?
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-foreground leading-[1.2] md:leading-[1.1] break-words">
                The <span className="text-primary tracking-tighter">Gold Standard</span> in Stone Treatment
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-text-mid font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                RIRS — Retrograde Intrarenal Surgery — is the most advanced kidney stone treatment available. A flexible ureteroscope reaches into the kidney through natural pathways. No cuts. No radiation. Discharged within 24 hours.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {highlights.map((item, i) => (
                <div key={i} className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-all flex items-start gap-4 group text-left">
                  <span className="text-2xl group-hover:scale-125 transition-transform shrink-0">{item.icon}</span>
                  <div className="space-y-1">
                    <p className="text-[11px] font-black text-foreground uppercase tracking-wide leading-tight">{item.title}</p>
                    <p className="text-[9px] font-bold text-text-light uppercase tracking-widest leading-tight">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full sm:w-auto px-10 py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all hover:scale-105 active:scale-95 whitespace-normal">
              📅 Book RIRS Consultation →
            </button>
          </div>

          {/* Right Column: Comparison Table */}
          <div className="relative group mt-12 lg:mt-0 w-full overflow-visible">
            {/* Table Shadow/glow */}
            <div className="absolute inset-x-0 inset-y-0 bg-primary/10 blur-[60px] md:blur-[100px] rounded-full pointer-events-none opacity-50 transition-opacity group-hover:opacity-100" />
            
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-border shadow-2xl bg-white/80 backdrop-blur-md">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px] md:min-w-0">
                  <thead>
                    <tr className="bg-foreground text-background">
                      <th className="p-4 md:p-5 text-[9px] md:text-[10px] font-black uppercase tracking-widest border-b border-white/10">Feature</th>
                      <th className="p-4 md:p-5 text-[9px] md:text-[10px] font-black uppercase tracking-widest border-b border-white/10 text-primary">🏆 RIRS</th>
                      <th className="p-4 md:p-5 text-[9px] md:text-[10px] font-black uppercase tracking-widest border-b border-white/10">ESWL</th>
                      <th className="p-4 md:p-5 text-[9px] md:text-[10px] font-black uppercase tracking-widest border-b border-white/10">PCNL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {tableData.map((row, i) => (
                      <tr key={i} className="hover:bg-primary/5 transition-colors group/row">
                        <td className="p-4 md:p-5 text-[10px] md:text-[11px] font-black text-text-mid uppercase tracking-wide border-r border-border/30 group-hover/row:text-primary">
                          {row.feature}
                        </td>
                        <td className="p-4 md:p-5 text-xs md:text-sm font-black text-accent tracking-tight bg-accent/5 border-r border-border/30">
                          {row.rirs}
                        </td>
                        <td className="p-4 md:p-5 text-xs md:text-sm font-medium text-text-light border-r border-border/30">
                          {row.eswl}
                        </td>
                        <td className="p-4 md:p-5 text-xs md:text-sm font-bold text-text-mid">
                          {row.pcnl}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Ribbon Badge */}
            <div className="absolute -top-4 md:-top-6 right-2 sm:right-4 md:-right-6 bg-primary text-white text-[9px] md:text-[10px] font-black px-4 md:px-6 py-1.5 md:py-2 rounded-full shadow-2xl rotate-3 md:rotate-12 uppercase tracking-widest z-10 border-2 border-white shadow-primary/30">
               Patient Recommended
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyRIRS;
