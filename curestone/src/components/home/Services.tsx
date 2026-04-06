import React from 'react';

const Services = () => {
  const services = [
    {
      icon: "🔬",
      name: "Kidney Stone Treatment",
      desc: "RIRS, ESWL, URSL, PCNL — tailored to stone size & location. India's first Fans-RIRS pioneer.",
      link: "/book",
    },
    {
      icon: "⚕️",
      name: "Urology & Andrology",
      desc: "Expert diagnosis for prostate issues, UTIs, male sexual health and urological disorders.",
      link: "/book",
    },
    {
      icon: "🫚",
      name: "Gallbladder Stone Treatment",
      desc: "Laparoscopic cholecystectomy for gallbladder stones — minimally invasive, fast recovery.",
      link: "/book",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black tracking-widest text-primary bg-primary/5 border border-primary/10 rounded-full uppercase">
            Our Specialties
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Center of Excellence for <span className="text-primary">Kidney Stone</span> Treatment
          </h2>
          <p className="mt-4 text-text-light font-medium max-w-2xl mx-auto">
            Specialised care across kidney stones, urology & gallbladder — all under one expert roof in Delhi NCR.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className="group p-10 bg-white border border-border/50 rounded-3xl shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-primary transition-all duration-500 group-hover:text-white">
                {service.icon}
              </div>
              <h3 className="text-xl font-black text-foreground mb-4">{service.name}</h3>
              <p className="text-text-mid font-medium leading-relaxed mb-8 flex-grow">
                {service.desc}
              </p>
              <button className="text-primary font-black text-sm uppercase tracking-widest hover:tracking-[0.2em] transition-all flex items-center gap-2">
                Explore Treatment <span className="group-hover:translate-x-2 transition-transform">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
