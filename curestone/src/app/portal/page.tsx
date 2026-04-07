"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const stats = [
  { label: "Upcoming Appointment", value: "Apr 14, 2025", sub: "10:30 AM · In-clinic", icon: "📅" },
  { label: "Last Visit", value: "Mar 3, 2025", sub: "Post-op follow-up", icon: "🏥" },
  { label: "Reports Available", value: "4 Documents", sub: "CT KUB, Blood, USG", icon: "📋" },
  { label: "Treatment Status", value: "Post-RIRS", sub: "Recovery — Week 3", icon: "✅" },
];

const reports = [
  { name: "CT KUB Report", date: "February 28, 2025", type: "Radiology", size: "2.4 MB", icon: "🫁" },
  { name: "Urine Culture Report", date: "March 1, 2025", type: "Pathology", size: "340 KB", icon: "🧪" },
  { name: "Blood Panel Report", date: "March 1, 2025", type: "Pathology", size: "280 KB", icon: "🩸" },
  { name: "RIRS Surgery Note", date: "March 3, 2025", type: "Clinical", size: "180 KB", icon: "📝" },
];

const timeline = [
  { date: "Mar 3, 2025", title: "RIRS Surgery Completed", desc: "Successful stone clearance. Stone-free rate confirmed via fluoroscopy.", status: "done" },
  { date: "Mar 10, 2025", title: "1-Week Post-Op Review", desc: "Stent in place. Mild haematuria reported — expected. No complications.", status: "done" },
  { date: "Mar 24, 2025", title: "DJ Stent Removed", desc: "Ureteric stent successfully removed. Full clearance confirmed on USG.", status: "done" },
  { date: "Apr 14, 2025", title: "1-Month Follow-up", desc: "Scheduled in-clinic review at Max Hospital, Pitampura.", status: "upcoming" },
  { date: "Jun 14, 2025", title: "6-Month Imaging Checkup", desc: "Preventive CT KUB to confirm no recurrence.", status: "planned" },
];

export default function PortalPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) setOtpSent(true);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length >= 4) setLoggedIn(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {!loggedIn ? (
        /* Login Screen */
        <main className="flex-grow bg-background flex items-center justify-center py-20 pt-40">
          <div className="max-w-md w-full mx-auto px-6">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              </div>
              <h1 className="text-3xl font-black text-slate-900 mb-2">Patient Portal</h1>
              <p className="text-slate-500 font-medium">Access your reports, appointments and treatment history securely.</p>
            </div>

            <div className="bg-white/70 backdrop-blur-2xl p-8 rounded-[2rem] border border-white shadow-2xl shadow-primary/5">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Registered Mobile Number</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">+91</span>
                      <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" maxLength={10} required placeholder="XXXXX XXXXX" className="w-full pl-14 pr-5 py-3.5 bg-white border border-slate-100 rounded-xl outline-none focus:border-primary transition-all text-slate-900 font-medium"/>
                    </div>
                  </div>
                  <button type="submit" className="w-full py-4 bg-primary text-white font-black rounded-xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all uppercase tracking-wide text-sm">
                    Send OTP →
                  </button>
                  <p className="text-center text-xs text-slate-400 font-medium">Use the mobile number you registered with during your consultation.</p>
                </form>
              ) : (
                <form onSubmit={handleVerify} className="space-y-5">
                  <div className="text-center mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2 2 4-4"/></svg>
                    </div>
                    <p className="text-sm font-bold text-slate-700">OTP sent to +91 {phone}</p>
                    <button type="button" onClick={() => setOtpSent(false)} className="text-xs text-primary font-bold mt-1 hover:underline">Change number</button>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Enter 4-Digit OTP</label>
                    <input value={otp} onChange={e => setOtp(e.target.value)} type="text" maxLength={4} required placeholder="• • • •" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-xl outline-none focus:border-primary transition-all text-slate-900 font-black text-xl tracking-[1rem] text-center"/>
                  </div>
                  <button type="submit" className="w-full py-4 bg-primary text-white font-black rounded-xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all uppercase tracking-wide text-sm">
                    Verify &amp; Login
                  </button>
                  <p className="text-center text-xs text-slate-400">Demo: enter any 4 digits</p>
                </form>
              )}
            </div>

            <p className="text-center mt-6 text-sm text-slate-500 font-medium">
              Not registered? <Link href="/book" className="text-primary font-bold hover:underline">Book a consultation first →</Link>
            </p>
          </div>
        </main>
      ) : (
        /* Dashboard */
        <main className="flex-grow bg-background pt-24">
          {/* Dashboard Header */}
          <div className="bg-foreground text-white py-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Patient Portal</p>
                <h1 className="text-2xl font-black text-white">Welcome back, <span className="text-primary">Rahul Sharma</span></h1>
                <p className="text-sm text-white/50 font-medium mt-1">Patient ID: CS-2025-1847 · Post-RIRS · 3 weeks since surgery</p>
              </div>
              <button onClick={() => setLoggedIn(false)} className="px-5 py-2.5 border border-white/20 rounded-xl text-sm font-bold text-white/70 hover:bg-white/10 transition-colors">
                Sign Out
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
            {/* Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {stats.map((s, i) => (
                <div key={i} className="bg-white border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-2xl mb-3 block">{s.icon}</span>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
                  <p className="font-black text-slate-900 text-lg leading-tight">{s.value}</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 border-b border-border/50 pb-0">
              {["overview", "reports", "timeline", "messages"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-bold rounded-t-xl capitalize transition-all -mb-px border-b-2 ${activeTab === tab ? "text-primary border-primary bg-primary/5" : "text-slate-500 border-transparent hover:text-slate-700"}`}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-5">
                  <div className="bg-white border border-border/50 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-black text-slate-900 mb-4 text-lg">Next Appointment</h3>
                    <div className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/10 rounded-xl">
                      <div className="w-12 h-12 bg-primary text-white rounded-xl flex flex-col items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold uppercase">Apr</span>
                        <span className="text-xl font-black leading-none">14</span>
                      </div>
                      <div>
                        <p className="font-black text-slate-900">1-Month Post-Op Review</p>
                        <p className="text-sm text-slate-500 font-medium">10:30 AM · Max Hospital, Pitampura · Dr. Deepanshu Gupta</p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:border-primary hover:text-primary transition-colors">Reschedule</button>
                      <Link href="/book" className="flex-1 py-2.5 bg-primary text-white font-black rounded-xl text-sm text-center hover:bg-primary-dark transition-colors">Book New Slot</Link>
                    </div>
                  </div>

                  <div className="bg-white border border-border/50 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-black text-slate-900 mb-4 text-lg">Recovery Progress</h3>
                    <div className="space-y-4">
                      {[
                        { label: "Stone Clearance", pct: 100, color: "bg-green-500" },
                        { label: "Pain Score (lower is better)", pct: 15, color: "bg-primary" },
                        { label: "Hydration Goal (3L/day)", pct: 80, color: "bg-blue-400" },
                        { label: "Activity Level", pct: 60, color: "bg-amber-400" },
                      ].map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                            <span>{item.label}</span><span>{item.pct}%</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="bg-white border border-border/50 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-black text-slate-900 mb-4 text-base">Recent Reports</h3>
                    <div className="space-y-3">
                      {reports.slice(0, 3).map((r, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-primary/5 transition-colors cursor-pointer group">
                          <span className="text-xl">{r.icon}</span>
                          <div className="flex-grow min-w-0">
                            <p className="font-bold text-xs text-slate-900 truncate">{r.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{r.date}</p>
                          </div>
                          <svg className="w-4 h-4 text-slate-300 group-hover:text-primary shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setActiveTab("reports")} className="w-full mt-4 py-2.5 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:border-primary hover:text-primary transition-colors">View All Reports</button>
                  </div>

                  <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
                    <h3 className="font-black text-slate-900 mb-1 text-base">💡 Doctor&apos;s Advice</h3>
                    <p className="text-xs text-slate-500 font-medium mb-4">Last updated: March 24, 2025</p>
                    <ul className="space-y-2">
                      {["Drink at least 3 litres of water daily","Avoid spinach, nuts and cola drinks","No heavy lifting for 2 more weeks","Resume light walking from tomorrow"].map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm font-medium text-slate-700">
                          <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === "reports" && (
              <div className="bg-white border border-border/50 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border/30 flex items-center justify-between">
                  <h3 className="font-black text-slate-900 text-lg">Your Medical Reports</h3>
                  <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{reports.length} files</span>
                </div>
                <div className="divide-y divide-border/30">
                  {reports.map((r, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors group">
                      <span className="text-3xl">{r.icon}</span>
                      <div className="flex-grow">
                        <p className="font-bold text-slate-900">{r.name}</p>
                        <p className="text-xs text-slate-400 font-medium">{r.type} · {r.date} · {r.size}</p>
                      </div>
                      <button className="px-4 py-2 bg-primary/10 text-primary font-bold text-xs rounded-xl hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline Tab */}
            {activeTab === "timeline" && (
              <div className="relative pl-6 border-l-2 border-border/50 space-y-8 max-w-2xl">
                {timeline.map((item, i) => (
                  <div key={i} className="relative">
                    <div className={`absolute -left-[2.35rem] w-5 h-5 rounded-full border-2 flex items-center justify-center ${item.status === "done" ? "bg-green-500 border-green-500" : item.status === "upcoming" ? "bg-primary border-primary" : "bg-white border-slate-300"}`}>
                      {item.status === "done" && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                      {item.status === "upcoming" && <span className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <div className="bg-white border border-border/30 rounded-2xl p-5 shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.date}</p>
                      <p className="font-black text-slate-900 mb-1">{item.title}</p>
                      <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                      {item.status === "upcoming" && (
                        <span className="inline-block mt-3 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">Upcoming</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === "messages" && (
              <div className="bg-white border border-border/50 rounded-2xl shadow-sm p-12 text-center">
                <span className="text-5xl mb-4 block">💬</span>
                <h3 className="text-xl font-black text-slate-900 mb-2">Secure Messaging</h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto mb-6">Direct messaging with Dr. Kalla&apos;s team is available for post-operative patients. Contact our coordinator to enable this feature.</p>
                <a href="https://wa.me/918800263884" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-black rounded-xl transition-colors text-sm">
                  WhatsApp Dr. Kalla&apos;s Team
                </a>
              </div>
            )}
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
}
