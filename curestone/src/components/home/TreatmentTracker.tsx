"use client";
import React, { useState, useMemo } from 'react';

const TreatmentTracker = () => {
  const [size, setSize] = useState(8);
  const [pain, setPain] = useState(3);
  const [water, setWater] = useState(1.5);
  const [isRecovery, setIsRecovery] = useState(false);

  const insight = useMemo(() => {
    const goal = 3.5;
    const hydrationPct = Math.min(Math.round((water / goal) * 100), 100);
    
    let risk = "MODERATE RISK";
    let riskClass = "bg-warning/10 text-warning border-warning/20";
    let title = "Fans-RIRS Laser Standard";
    let tag = "Clinical Recommendation";
    let tagClass = "bg-primary/5 text-primary border-primary/20";
    let text = `Stones between 5–10mm have low chance of spontaneous passage. Fans-RIRS provides 98% clearance safely and without radiation.`;

    if (isRecovery) {
      risk = "RECOVERY";
      riskClass = "bg-accent/10 text-accent border-accent/20";
      title = "Post-Surgery Recovery";
      tag = "Recovery Mode";
      tagClass = "bg-accent/5 text-accent border-accent/20";
      text = "Focus on hydration (3.5L/day), avoid strenuous activity for 2 weeks, and take prescribed antibiotics. Schedule follow-up ultrasound in 4–6 weeks.";
    } else if (size <= 4 && pain <= 3) {
      risk = "LOW RISK";
      riskClass = "bg-accent/10 text-accent border-accent/20";
      title = "Conservative Management";
      text = "Stones ≤4mm have a 70–80% chance of passing on their own. Drink 3.5L water daily, take pain relief as needed, and monitor for 2–4 weeks.";
    } else if (size <= 10) {
      // Default case already set
    } else if (size <= 20) {
      risk = "HIGH RISK";
      riskClass = "bg-error/10 text-error border-error/20";
      tag = "Urgent Consultation";
      title = "RIRS or PCNL Required";
      text = `Stones ${size}mm require surgical intervention. RIRS (up to 20mm) or PCNL for larger complex stones. Consult Dr. Deepanshu Gupta immediately.`;
    } else {
      risk = "URGENT CARE";
      riskClass = "bg-error/10 text-error border-error/20";
      tag = "URGENT";
      title = "PCNL or Staged Procedure";
      text = `Stones >20mm require PCNL or RIRS Staged Procedure. Call +91 88002 63884 immediately or visit Cure Stone Gurugram.`;
    }

    if (pain >= 8 && !isRecovery) {
      risk = "SEE DOCTOR NOW";
      riskClass = "bg-error/10 text-error border-error/20";
    }

    let hydrationStatus = "GREAT: Excellent hydration!";
    let hydrationColor = "bg-accent";
    if (hydrationPct < 57) {
      hydrationStatus = "CRITICAL: Dehydration risks stone growth.";
      hydrationColor = "bg-error";
    } else if (hydrationPct < 86) {
      hydrationStatus = "LOW: Drink more water.";
      hydrationColor = "bg-warning";
    }

    return { risk, riskClass, title, tag, tagClass, text, hydrationPct, hydrationStatus, hydrationColor };
  }, [size, pain, water, isRecovery]);

  const reset = () => {
    setSize(8);
    setPain(3);
    setWater(1.5);
    setIsRecovery(false);
  };

  return (
    <section className="py-24 bg-white" id="treatment-tracker">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Track Your <span className="text-primary tracking-tighter">Treatment</span>
          </h2>
          <p className="mt-4 text-text-light font-medium max-w-2xl mx-auto italic">
            Compared to traditional shockwave therapy (ESWL) and PCNL, Fans-RIRS offers unmatched precision and safety.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Tracker Card */}
          <div className="bg-background-alt p-10 rounded-[2.5rem] border border-border/50 shadow-sm flex flex-col space-y-10">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">Treatment Tracker</h3>
              <p className="text-[10px] font-black text-text-light uppercase tracking-[0.2em]">Digital Self-Assessment</p>
            </div>

            {/* Stone Size Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-black text-text-mid uppercase tracking-widest">Estimated Stone Size</span>
                <span className="text-sm font-black text-primary bg-primary/10 px-3 py-1 rounded-lg">{size} mm</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="30" 
                value={size} 
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Pain Level Buttons */}
            <div className="space-y-4">
              <span className="text-[11px] font-black text-text-mid uppercase tracking-widest">Current Pain Level</span>
              <div className="flex gap-2 flex-wrap">
                {[1, 3, 5, 8, 10].map((level) => (
                  <button 
                    key={level}
                    onClick={() => setPain(level)}
                    className={`flex-1 min-w-[70px] py-4 rounded-2xl border-2 transition-all font-black text-sm ${
                      pain === level 
                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105" 
                        : "bg-white border-border/50 text-text-mid hover:border-primary/30"
                    }`}
                  >
                    {level}
                    <span className="block text-[8px] opacity-70 mt-1 uppercase tracking-tighter">
                      {level === 1 ? 'Mild' : level === 3 ? 'Uncomfortable' : level === 5 ? 'Severe' : level === 8 ? 'Extreme' : 'Unbearable'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Water Intake Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-black text-text-mid uppercase tracking-widest">Daily Water Intake</span>
                <span className="text-sm font-black text-warning bg-warning/10 px-3 py-1 rounded-lg">{water} Liters</span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="5" 
                step="0.1"
                value={water} 
                onChange={(e) => setWater(parseFloat(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-warning"
              />
            </div>

            {/* Recovery Mode Toggle */}
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-border/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
               <span className="text-xs font-bold text-text-mid italic">I already had surgery (Recovery Mode)</span>
               <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={isRecovery} onChange={(e) => setIsRecovery(e.target.checked)} />
                <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>

          {/* Insight Card */}
          <div className="bg-white border-2 border-border/50 p-10 rounded-[2.5rem] shadow-xl flex flex-col space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full -mr-16 -mt-16" />
            
            <div className="flex justify-between items-start">
               <div className="space-y-1">
                  <p className="text-[10px] font-black text-text-light uppercase tracking-[0.2em]">Health Insight</p>
                  <p className="text-xs font-bold text-foreground">Recommendations based on clinical models</p>
               </div>
               <div className={`px-4 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-widest ${insight.riskClass}`}>
                  {insight.risk}
               </div>
            </div>

            <div className="space-y-4 p-8 rounded-3xl bg-primary/5 border border-primary/10 relative">
               <div className="flex items-center justify-between gap-4 mb-2">
                  <p className="text-xl font-black text-foreground tracking-tight">{insight.title}</p>
                  <span className={`px-3 py-1 rounded-lg text-[8px] font-black border uppercase tracking-widest whitespace-nowrap ${insight.tagClass}`}>
                    {insight.tag}
                  </span>
               </div>
               <p className="text-sm text-text-mid font-medium leading-relaxed">
                  {insight.text}
               </p>
            </div>

            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-black text-foreground tracking-tighter leading-none">{insight.hydrationPct}%</span>
                    <span className="text-[10px] font-black text-text-light mb-1 uppercase tracking-widest">Hydration Status</span>
                  </div>
                  <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] bg-primary/5 px-3 py-1 rounded-lg border border-primary/10">3.5L Goal</span>
               </div>
               <div className="w-full h-3 bg-border rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-700 ${insight.hydrationColor}`} 
                    style={{ width: `${insight.hydrationPct}%` }}
                  />
               </div>
               <p className={`text-xs font-black uppercase tracking-wide italic flex items-center gap-2`}>
                  <span className={`w-2 h-2 rounded-full ${insight.hydrationColor} animate-pulse`} />
                  {insight.hydrationStatus}
               </p>
            </div>

            <p className="mt-auto pt-6 text-[10px] text-text-light italic leading-relaxed border-t border-border/50">
              Note: This tracker provides general guidance based on clinical standards. Always consult a urologist like Dr. Deepanshu Gupta for a formal diagnosis via ultrasound or CT scan.
            </p>

            <div className="flex gap-4">
               <button className="flex-1 px-8 py-4 bg-foreground text-white font-black rounded-2xl shadow-xl hover:bg-black transition-all hover:-translate-y-1 active:scale-95">
                  Confirm with Specialist
               </button>
               <button onClick={reset} className="px-6 py-4 border-2 border-border text-[10px] font-black rounded-2xl hover:bg-background-alt transition-all">
                  RESET
               </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentTracker;
