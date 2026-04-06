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
    <section className="py-24 bg-background-alt overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Column: Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 text-[10px] font-black tracking-widest text-primary bg-primary/5 border border-primary/10 rounded-full uppercase">
                Why RIRS?
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-[1.1]">
                The <span className="text-primary tracking-tighter">Gold Standard</span> in Stone Treatment
              </h2>
              <p className="text-lg text-text-mid font-medium leading-relaxed">
                RIRS — Retrograde Intrarenal Surgery — is the most advanced kidney stone treatment available. A flexible ureteroscope reaches into the kidney through natural pathways. No cuts. No radiation. Discharged within 24 hours.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-all flex items-start gap-4 group">
                  <span className="text-2xl group-hover:scale-125 transition-transform">{item.icon}</span>
                  <div className="space-y-1">
                    <p className="text-xs font-black text-foreground uppercase tracking-wide">{item.title}</p>
                    <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="px-10 py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all hover:scale-105 active:scale-95">
              📅 Book RIRS Consultation →
            </button>
          </div>

          {/* Right Column: Comparison Table */}
          <div className="relative group">
            {/* Table Shadow/glow */}
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full pointer-events-none opacity-50 transition-opacity group-hover:opacity-100" />
            
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-2xl bg-white/80 backdrop-blur-md">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-foreground text-background">
                      <th className="p-5 text-[10px] font-black uppercase tracking-widest border-b border-white/10">Feature</th>
                      <th className="p-5 text-[10px] font-black uppercase tracking-widest border-b border-white/10 text-primary">🏆 RIRS</th>
                      <th className="p-5 text-[10px] font-black uppercase tracking-widest border-b border-white/10">ESWL</th>
                      <th className="p-5 text-[10px] font-black uppercase tracking-widest border-b border-white/10">PCNL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {tableData.map((row, i) => (
                      <tr key={i} className="hover:bg-primary/5 transition-colors group/row">
                        <td className="p-5 text-[11px] font-black text-text-mid uppercase tracking-wide border-r border-border/30 group-hover/row:text-primary">
                          {row.feature}
                        </td>
                        <td className="p-5 text-sm font-black text-accent tracking-tight bg-accent/5 border-r border-border/30">
                          {row.rirs}
                        </td>
                        <td className="p-5 text-sm font-medium text-text-light border-r border-border/30">
                          {row.eswl}
                        </td>
                        <td className="p-5 text-sm font-bold text-text-mid">
                          {row.pcnl}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Ribbon Badge */}
            <div className="absolute -top-6 -right-6 bg-primary text-white text-[10px] font-black px-6 py-2 rounded-full shadow-2xl rotate-12 uppercase tracking-widest z-10 border-2 border-white shadow-primary/30">
               Patient Recommended
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyRIRS;
