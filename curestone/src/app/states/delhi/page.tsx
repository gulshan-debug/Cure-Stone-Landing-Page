import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import DoctorProfile from "@/components/home/DoctorProfile";
import GlobalReach from "@/components/home/GlobalReach";

export const metadata: Metadata = {
  title: "Kidney Stone Surgery Cost in Delhi | CureStone",
  description: "Advanced laser treatment starting from ₹55,000. Experience USFDA approved technology with Delhi's top-tier urologists.",
};

export default function DelhiSurgeryPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{
        __html: `
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }
        .editorial-gradient { background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%); }
        .ambient-shadow { box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.1); }
      `}} />

      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-10 py-20 lg:py-32">
          {/* Background Video */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-[1.0]"
              src="/Edit.mp4"
            />
            {/* Gradient overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-50/90 via-slate-50/70 to-transparent"></div>
          </div>
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-6">
                <span className="material-symbols-outlined text-sm">location_on</span> Delhi Clinical Excellence
              </div>
              <h1 className="font-sans text-5xl lg:text-7xl font-extrabold text-blue-900 leading-tight tracking-tighter mb-8">
                Kidney Stone Surgery <br />Cost in <span className="text-amber-600">Delhi</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mb-12">
                Advanced laser treatment starting from <span className="text-blue-900 font-bold text-3xl block lg:inline mt-2 lg:mt-0">₹55,000</span>. Experience USFDA approved technology with Delhi&apos;s top-tier urologists.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-blue-900 font-bold text-2xl">5000+</span>
                  <span className="text-sm text-slate-600 font-medium">Successful Surgeries</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-blue-900 font-bold text-2xl">4.9/5</span>
                  <span className="text-sm text-slate-600 font-medium">Patient Satisfaction</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-blue-900 font-bold text-2xl">Cashless</span>
                  <span className="text-sm text-slate-600 font-medium">Insurance Support</span>
                </div>
              </div>
            </div>

            {/* Lead Gen Card */}
            <div className="lg:col-span-5">
              <div className="bg-white p-8 lg:p-10 rounded-[2rem] ambient-shadow border border-slate-200">
                <h3 className="font-sans text-2xl font-bold text-blue-900 mb-2">Get Free Estimate</h3>
                <p className="text-slate-600 text-sm mb-8">Personalized cost breakdown for Delhi NCR residents</p>
                <form className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                    <input className="w-full bg-slate-50 border-transparent focus:border-blue-900 focus:ring-0 rounded-xl py-4 px-5 text-slate-900" placeholder="Enter your name" type="text" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
                    <div className="flex">
                      <span className="bg-slate-50 border-r border-slate-200 py-4 px-4 rounded-l-xl text-slate-600 font-medium">+91</span>
                      <input className="w-full bg-slate-50 border-transparent focus:border-blue-900 focus:ring-0 rounded-r-xl py-4 px-5 text-slate-900" placeholder="Phone number" type="tel" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Treatment Required</label>
                    <select className="w-full bg-slate-50 border-transparent focus:border-blue-900 focus:ring-0 rounded-xl py-4 px-5 text-slate-900">
                      <option>Laser Stone Removal (RIRS)</option>
                      <option>PCNL (Large Stone)</option>
                      <option>Shockwave Lithotripsy (ESWL)</option>
                      <option>Ureteroscopy (URS)</option>
                    </select>
                  </div>
                  <button className="w-full editorial-gradient text-white font-sans font-bold py-5 rounded-full mt-4 hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    Get Estimate Now <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section - Why Choose CureStone */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="font-sans text-4xl lg:text-5xl font-bold text-blue-900 tracking-tight mb-6">Why Choose <span className="text-amber-600">CureStone</span> in Delhi?</h2>
                <p className="text-lg text-slate-600">We redefine kidney stone care by combining clinical precision with a sanctuary-like patient experience.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-50 p-10 rounded-[2.5rem] flex flex-col gap-6 group hover:bg-slate-100 transition-colors duration-500">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-amber-600 text-3xl">medical_services</span>
                </div>
                <h4 className="font-sans text-2xl font-bold text-blue-900">Advanced Laser Tech</h4>
                <p className="text-slate-600 leading-relaxed">Painless, stitchless, and bloodless procedures using state-of-the-art Holmium Laser technology for 100% stone clearance.</p>
              </div>
              <div className="bg-slate-50 p-10 rounded-[2.5rem] flex flex-col gap-6 group hover:bg-slate-100 transition-colors duration-500">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-amber-600 text-3xl">schedule</span>
                </div>
                <h4 className="font-sans text-2xl font-bold text-blue-900">24-Hour Recovery</h4>
                <p className="text-slate-600 leading-relaxed">Our daycare procedures allow most patients to return home within 24 hours of surgery, minimizing hospital stay.</p>
              </div>
              <div className="bg-slate-50 p-10 rounded-[2.5rem] flex flex-col gap-6 group hover:bg-slate-100 transition-colors duration-500">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-amber-600 text-3xl">shield_with_heart</span>
                </div>
                <h4 className="font-sans text-2xl font-bold text-blue-900">Insurance Managed</h4>
                <p className="text-slate-600 leading-relaxed">Our dedicated team handles all insurance documentation and approvals, offering a seamless cashless experience.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Doctors Section */}
        <DoctorProfile />

        {/* Global Reach Component */}
        <GlobalReach />

        {/* CTA Section */}
        <section className="py-20 max-w-7xl mx-auto px-8">
          <div className="editorial-gradient rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-sans text-4xl lg:text-6xl font-extrabold text-white mb-8 tracking-tighter">Ready to be Stone-Free?</h2>
              <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-12 opacity-90">Join 5000+ happy patients in Delhi. Book your first clinical consultation with our experts today.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="bg-amber-500 text-white px-12 py-5 rounded-full font-sans font-bold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300">
                  Book Free Appointment
                </button>
                <a className="text-white flex items-center gap-2 font-sans font-bold text-lg" href="tel:+919876543210">
                  <span className="material-symbols-outlined">call</span> Call +91 98765 43210
                </a>
              </div>
            </div>
            {/* Abstract Design Elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/5 rounded-full blur-3xl"></div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
