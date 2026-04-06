import React from 'react';
import Image from 'next/image';

const DoctorProfile = () => {
  const stats = [
    { label: "Patients Treated", value: "30K+", color: "text-primary" },
    { label: "Publications", value: "200+", color: "text-primary" },
    { label: "Awards", value: "22+", color: "text-primary" },
    { label: "Years Experience", value: "15+", color: "text-primary" },
  ];

  const expertises = [
    "Fans-RIRS Laser Surgery",
    "PCNL",
    "URSL",
    "ESWL",
    "Gallstone Surgery",
    "Urology & Andrology",
    "Renal Transplant",
  ];

  const achievements = [
    { icon: "🏆", text: "1st Rank Holder in MCh Urology — RML Hospital, New Delhi" },
    { icon: "🥇", text: "Pioneer of Fans-RIRS (Fluoroscopy-free) in North India" },
    { icon: "🎓", text: "MS General Surgery from PGIMS Rohtak — Haryana's premier institute" },
    { icon: "⭐", text: "4.9★ Google Rating — 1,000+ verified patient reviews" },
  ];

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, var(--color-primary) 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black tracking-widest text-primary bg-primary/5 border border-primary/10 rounded-full uppercase">
            Meet Your Doctor
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            The Doctor Behind <span className="text-primary">30,000 Stone-Free Lives</span>
          </h2>
          <p className="mt-4 text-text-light font-medium max-w-2xl mx-auto">
            Trusted by patients across India and abroad — for over 15 years of precision care.
          </p>
        </div>

        <div className="grid lg:grid-cols-[450px_1fr] gap-16 items-center">
          {/* LEFT: Photo Area */}
          <div className="relative group">
            <div className="relative aspect-[4/5] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
              <Image 
                src="/assets/doctor.png"
                alt="Dr. Deepanshu Gupta"
                fill
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
              />
              
              {/* Rating Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent p-8 text-center text-white">
                <p className="text-xl font-black leading-tight">Dr. Deepanshu Gupta</p>
                <p className="text-xs text-blue-200 mt-1">Senior Urologist & Kidney Stone Specialist</p>
                <div className="mt-4 inline-flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl">
                  <span className="text-yellow-400 text-sm tracking-widest">★★★★★</span>
                  <span className="text-[10px] font-bold text-white/90 uppercase tracking-tighter">4.9 · 1,000+ Reviews</span>
                </div>
              </div>
            </div>

            {/* Availability Chip */}
            <div className="mt-6 bg-white border border-border/50 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse shadow-[0_0_10px_var(--color-accent)]"></div>
              <p className="text-xs font-bold text-text-mid uppercase tracking-wide">
                Available for Consultation · Gurugram & Delhi NCR
              </p>
            </div>
          </div>

          {/* RIGHT: Content Area */}
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <h3 className="text-4xl font-black text-foreground leading-none">Dr. Deepanshu Gupta</h3>
              <p className="text-sm font-semibold text-text-light leading-relaxed">
                MBBS · MS (General Surgery), PGIMS Rohtak <br />
                MCh Urology, RML Hospital, New Delhi
              </p>
              
              <div className="inline-flex items-center gap-3 bg-warning-light border border-warning/30 px-4 py-2 rounded-xl text-xs font-black text-warning">
                🏆 MCh Urology — 1st Rank Holder, RML Hospital
              </div>
            </div>

            <div className="w-full h-px bg-border/50"></div>

            <p className="text-base text-text-mid leading-relaxed italic border-l-4 border-primary pl-6">
              Dr. Deepanshu Gupta is one of North India's most trusted urologists — known for his calm approach, precision surgeries, and genuine care for every patient. He <strong className="text-primary font-black uppercase">pioneered Fluoroscopy-free Fans-RIRS in North India</strong> — treating kidney stones without a single cut, scar, or radiation.
            </p>

            <div className="w-full h-px bg-border/50"></div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white border border-border/50 p-6 rounded-2xl text-center shadow-sm hover:border-primary/30 transition-all group">
                  <p className={`text-2xl font-black ${stat.color} tracking-tighter group-hover:scale-110 transition-transform`}>{stat.value}</p>
                  <p className="text-[10px] font-bold text-text-light uppercase tracking-widest mt-2">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="space-y-6">
              <p className="text-[10px] font-black text-foreground uppercase tracking-[0.2em] mb-4">Key Achievements</p>
              <div className="grid gap-4">
                {achievements.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-sm">
                      {item.icon}
                    </div>
                    <p className="text-sm text-text-mid font-medium leading-relaxed leading-6">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Expertise */}
            <div className="space-y-4">
              <p className="text-[10px] font-black text-foreground uppercase tracking-[0.2em]">Expertise</p>
              <div className="flex flex-wrap gap-2">
                {expertises.map((exp, i) => (
                  <span key={i} className="px-4 py-1.5 bg-white border border-border/70 rounded-full text-[11px] font-bold text-text-mid hover:border-primary/40 hover:text-primary transition-all cursor-default">
                    <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mr-2 opacity-50"></span>
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all hover:-translate-y-1 active:scale-95">
                📅 Book Appointment
              </button>
              <a 
                href="https://wa.me/918800263884" 
                target="_blank"
                className="px-8 py-4 bg-white border-2 border-border/50 text-text-mid font-black rounded-2xl hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all text-center no-underline"
              >
                💬 WhatsApp Your Report
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorProfile;
