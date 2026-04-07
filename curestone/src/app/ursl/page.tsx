import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "URSL Treatment | CureStone — Ureteric Stone Laser Surgery Delhi",
  description: "URSL (Ureteroscopic Lithotripsy) uses a rigid/semi-rigid scope to treat ureteric stones with laser. Fast, effective, stone-free results.",
};

export default function URSLPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="relative pt-48 pb-32 bg-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,163,74,0.2),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-widest text-green-400 bg-green-500/10 border border-green-500/20 rounded-full uppercase">Ureteric Stone Specialist</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.05] mb-6">
              URSL <span className="text-green-400 italic">Treatment</span>
            </h1>
            <p className="text-xl text-white/60 font-medium leading-relaxed mb-10">
              Ureteroscopic Lithotripsy (URSL) — a rigid or semi-rigid ureteroscope is passed to directly visualise and laser-destroy stones stuck in the ureter. Highly effective for stuck ureteric stones causing obstruction.
            </p>
            <Link href="/book" className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-black rounded-2xl shadow-xl shadow-green-500/30 hover:bg-green-600 hover:scale-105 transition-all">
              Consult for URSL →
            </Link>
          </div>
        </div>
      </section>

      <main className="flex-grow bg-background py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <div>
              <h2 className="text-4xl font-black text-foreground mb-6">What Is <span className="text-primary">URSL?</span></h2>
              <p className="text-lg text-text-mid font-medium leading-relaxed mb-5">
                URSL is specifically designed for stones in the ureter — the tube connecting the kidney to the bladder. Unlike RIRS which uses a flexible scope for kidney stones, URSL uses a rigid or semi-rigid ureteroscope for stones in the mid and lower ureter.
              </p>
              <p className="text-lg text-text-mid font-medium leading-relaxed mb-8">
                A Holmium laser fibre is passed through the scope to break the stone. Fragments are removed with a stone basket or allowed to pass naturally. A DJ stent is usually placed temporarily.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[["✅", "95%+", "Stone-Free Rate"], ["🏥", "24 Hrs", "Typical Stay"], ["✂️", "0", "Incisions"], ["⚡", "30–60", "Minutes"]].map(([icon, val, lab], i) => (
                  <div key={i} className="bg-white border border-border/30 rounded-2xl p-5 text-center shadow-sm">
                    <span className="text-xl">{icon}</span>
                    <p className="text-2xl font-black text-primary mt-2">{val}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{lab}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-white border border-border/50 rounded-3xl p-8 shadow-sm">
                <h3 className="font-black text-slate-900 text-lg mb-4">URSL Is Recommended For</h3>
                <ul className="space-y-3">
                  {["Stones in the ureter (upper, mid, or lower)","Impacted ureteric stones causing obstruction","Obstructive uropathy with renal impairment","Stones not responding to ESWL","Emergency stone relief (urosepsis risk)"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <svg className="w-4 h-4 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8">
                <h3 className="font-black text-primary text-lg mb-4">Recovery Timeline</h3>
                <div className="space-y-4">
                  {[
                    ["Day 0", "Surgery & recovery room · Discharge evening"],
                    ["Day 1–7", "Mild burning / blood in urine — normal with stent"],
                    ["Day 7–14", "DJ stent removal (outpatient procedure)"],
                    ["Week 3–4", "Follow-up imaging to confirm stone-free status"],
                  ].map(([day, desc], i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="px-2 py-1 bg-primary text-white text-[10px] font-black uppercase rounded-lg shrink-0">{day}</span>
                      <p className="text-sm font-medium text-slate-700">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-500 rounded-[2rem] p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ureteric Stone Causing Pain?</h2>
            <p className="text-white/80 font-medium mb-8">Impacted ureteric stones are a medical urgency. Call us now or book a priority slot with Dr. Kalla.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+918800263884" className="px-8 py-4 bg-white text-green-600 font-black rounded-2xl shadow-xl hover:scale-105 transition-all">📞 Call Now</a>
              <Link href="/book" className="px-8 py-4 bg-green-700 text-white font-black rounded-2xl hover:bg-green-800 transition-all">Book Priority Slot →</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
