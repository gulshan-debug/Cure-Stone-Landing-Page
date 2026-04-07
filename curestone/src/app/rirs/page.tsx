import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RIRS Kidney Stone Surgery | Cure Stone — Laser Treatment Delhi",
  description: "RIRS (Retrograde Intrarenal Surgery) is India's most advanced kidney stone treatment. No cuts, no radiation, 98% success rate. Book with Dr. Deepanshu Gupta.",
};

const steps = [
  { num: "01", title: "Anaesthesia", desc: "Spinal or general anaesthesia is administered. The patient is comfortable throughout." },
  { num: "02", title: "Scope Insertion", desc: "A thin, flexible ureteroscope is guided through the urethra — no incisions required." },
  { num: "03", title: "Stone Visualisation", desc: "The surgeon directly visualises the stone inside the kidney in real-time." },
  { num: "04", title: "Laser Fragmentation", desc: "A Holmium or Thulium laser breaks the stone into fine dust particles." },
  { num: "05", title: "Clearance", desc: "Dust particles pass naturally or are removed. A temporary stent may be placed." },
  { num: "06", title: "Discharge", desc: "Most patients go home the same day or within 24 hours." },
];

const tableData = [
  { feature: "Incisions", rirs: "None", eswl: "None", pcnl: "Small keyhole" },
  { feature: "Radiation", rirs: "None (FANS-RIRS)", eswl: "Yes", pcnl: "Minimal" },
  { feature: "Stone-Free Rate", rirs: "98%", eswl: "60–70%", pcnl: "90–95%" },
  { feature: "Recovery", rirs: "1–2 days", eswl: "2–3 days", pcnl: "3–5 days" },
  { feature: "Anaesthesia", rirs: "Spinal", eswl: "None", pcnl: "General / Spinal" },
  { feature: "Stone Size", rirs: "Up to 20mm", eswl: "Up to 10mm", pcnl: "20mm+" },
  { feature: "Scarring", rirs: "None", eswl: "None", pcnl: "Minimal scar" },
];

export default function RIRSPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-48 pb-32 bg-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(43,92,230,0.4),transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full uppercase">Gold Standard Treatment</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.05] mb-6">
              RIRS <span className="text-primary italic">Laser Surgery</span>
            </h1>
            <p className="text-xl text-white/60 font-medium leading-relaxed max-w-2xl mb-10">
              Retrograde Intrarenal Surgery — the world&apos;s most advanced kidney stone treatment. A flexible laser scope passes through natural pathways. <strong className="text-white">Zero cuts. Zero radiation. 98% stone-free.</strong>
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/book" className="px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary-dark hover:scale-105 active:scale-95 transition-all">
                Book RIRS Consultation →
              </Link>
              <Link href="/checker" className="px-8 py-4 bg-white/10 border border-white/20 text-white font-black rounded-2xl hover:bg-white/20 transition-all backdrop-blur-sm">
                Check My Symptoms
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-primary py-6 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[["98%", "Stone-Free Rate"], ["24 Hrs", "Average Discharge"], ["0", "Incisions / Cuts"], ["15,000+", "Procedures Done"]].map(([val, lab], i) => (
            <div key={i}>
              <p className="text-3xl font-black">{val}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-white/70 mt-1">{lab}</p>
            </div>
          ))}
        </div>
      </div>

      <main className="flex-grow bg-background">
        {/* What Is RIRS */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black tracking-widest text-primary bg-primary/5 border border-primary/10 rounded-full uppercase">What Is RIRS?</span>
                <h2 className="text-4xl md:text-5xl font-black text-foreground leading-[1.1] mb-6">Surgery Through <span className="text-primary">Natural Pathways</span></h2>
                <p className="text-lg text-text-mid font-medium leading-relaxed mb-6">
                  RIRS stands for <strong>Retrograde Intrarenal Surgery</strong>. A thin, flexible ureteroscope (3mm diameter) is passed through the urethra, bladder and ureter to reach stones inside the kidney — without any incisions.
                </p>
                <p className="text-lg text-text-mid font-medium leading-relaxed mb-8">
                  A Holmium or Thulium Fiber laser then pulverises the stone into fine dust, which passes out naturally in urine. Cure Stone uses FANS-RIRS — <strong>Fluoroscopy-free RIRS</strong> — meaning zero X-ray radiation during surgery.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {["Zero X-Ray Radiation","Flexible Scope Technology","Real-time Visualisation","Same-Day Discharge Available"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      <span className="text-sm font-bold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8">
                <h3 className="text-xl font-black text-foreground mb-6">RIRS is ideal when…</h3>
                <div className="space-y-4">
                  {[
                    ["🎯", "Stone 5–20mm", "RIRS is the first-line treatment for stones in this common range."],
                    ["🫁", "Stone inside the kidney", "Particularly stones in the renal pelvis or lower pole."],
                    ["🚫", "Failed ESWL", "When shock-wave therapy has not cleared the stone."],
                    ["👧", "Children & elderly", "The non-invasive approach is safer for high-risk patients."],
                    ["🌐", "Bilateral stones", "Both kidneys can be treated in a single session."],
                  ].map(([icon, title, desc], i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-border/30 shadow-sm">
                      <span className="text-2xl">{icon}</span>
                      <div>
                        <p className="font-black text-sm text-slate-900">{title}</p>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Procedure Steps */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black tracking-widest text-primary bg-primary/5 border border-primary/10 rounded-full uppercase">The Procedure</span>
              <h2 className="text-4xl md:text-5xl font-black text-foreground">Step-by-Step: What Happens <span className="text-primary">During RIRS</span></h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((step, i) => (
                <div key={i} className="bg-white border border-border/30 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group">
                  <span className="text-5xl font-black text-primary/20 group-hover:text-primary/40 transition-colors">{step.num}</span>
                  <h3 className="text-xl font-black text-slate-900 mt-4 mb-2">{step.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-foreground">RIRS vs <span className="text-primary">Alternatives</span></h2>
              <p className="text-text-light font-medium mt-4 max-w-xl mx-auto">See how RIRS compares to other kidney stone treatments on every important parameter.</p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-border shadow-2xl bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-foreground text-white">
                      <th className="p-5 text-[10px] font-black uppercase tracking-widest">Feature</th>
                      <th className="p-5 text-[10px] font-black uppercase tracking-widest text-primary">🏆 RIRS</th>
                      <th className="p-5 text-[10px] font-black uppercase tracking-widest">ESWL</th>
                      <th className="p-5 text-[10px] font-black uppercase tracking-widest">PCNL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {tableData.map((row, i) => (
                      <tr key={i} className="hover:bg-primary/5 transition-colors">
                        <td className="p-5 text-[11px] font-black text-text-mid uppercase tracking-wide">{row.feature}</td>
                        <td className="p-5 text-sm font-black text-accent bg-accent/5">{row.rirs}</td>
                        <td className="p-5 text-sm font-medium text-text-light">{row.eswl}</td>
                        <td className="p-5 text-sm font-bold text-text-mid">{row.pcnl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-primary">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Ready to Be Stone-Free?</h2>
            <p className="text-white/70 font-medium mb-10 text-lg">Book a free consultation with Dr. Deepanshu Gupta. Most patients are treated and discharged within 24 hours.</p>
            <Link href="/book" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-primary font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-lg">
              Book Free RIRS Consultation →
            </Link>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-6">+91 88002 63884 · Available 9 AM – 8 PM</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
