import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const sections = [
    {
      title: "Services",
      links: [
        { label: "Kidney Stone Treatment", href: "/book" },
        { label: "Urology & Andrology", href: "/book" },
        { label: "IVF Treatment", href: "/book" },
        { label: "Renal Transplant", href: "/book" },
        { label: "General Surgery", href: "/book" },
      ],
    },
    {
      title: "Treatments",
      links: [
        { label: "RIRS Laser Surgery", href: "/rirs" },
        { label: "ESWL Lithotripsy", href: "/eswl" },
        { label: "URSL Treatment", href: "/ursl" },
        { label: "PCNL Surgery", href: "/pcnl" },
        { label: "TURP / HoLEP", href: "/turp" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "AI Symptom Checker", href: "/checker" },
        { label: "Book Free Consultation ", href: "/book" },
        { label: "Patient Portal", href: "/portal" },
        { label: "Health Blog", href: "/blog" },
        { label: "Admin Login", href: "/admin" },
      ],
    },
  ];

  return (
    <footer className="relative bg-foreground pt-24 pb-12 overflow-hidden text-white">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -mr-32 -mt-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -ml-32 -mb-32 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-[2fr_1fr_1fr_1fr] gap-16 mb-20">
          
          {/* Brand Col */}
          <div className="space-y-8">
            <Link href="/" className="inline-block group no-underline">
              <div className="relative w-40 h-14">
                <Image 
                  src="https://theCurestone.com/wp-content/uploads/2021/05/PNG-Black-e1664728676618.png" 
                  alt="Cure Stone Logo" 
                  fill
                  // Added brightness-0 invert to make the black logo pure white for the dark footer
                  className="object-contain object-left brightness-0 invert" 
                  unoptimized
                />
              </div>
            </Link>

            <p className="text-white/60 font-medium leading-relaxed max-w-sm">
              Pioneering excellence in urology and kidney stone care across Delhi NCR. Advanced treatment, compassionate service, and transparent pricing.
            </p>
            
            <div className="flex gap-4">
              {['f', 'in', '𝕏', '💬'].map((social, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-white/20 rounded-xl flex items-center justify-center text-white/80 hover:bg-primary transition-all hover:border-primary hover:text-white group">
                  <span className="text-sm font-bold group-hover:scale-110 transition-transform">{social}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Nav Maps */}
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-8">
              <h4 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">
                {section.title}
              </h4>
              <ul className="space-y-4 list-none p-0">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link href={link.href} className="text-sm font-medium text-white/70 hover:text-primary transition-colors no-underline flex items-center gap-2 group">
                      <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs font-bold text-white/30 uppercase tracking-widest text-center md:text-left">
            © 2025 Cure Stone. All rights reserved. <br className="md:hidden" />
            <span className="text-white/50 ml-1">Designed with ♥ by Gulshan Chawla.</span>
          </p>
          <div className="flex items-center gap-8">
             <Link href="/terms" className="text-[10px] font-black text-white/30 hover:text-white uppercase tracking-widest no-underline">Terms</Link>
             <Link href="/privacy" className="text-[10px] font-black text-white/30 hover:text-white uppercase tracking-widest no-underline">Privacy</Link>
             <Link href="/sitemap" className="text-[10px] font-black text-white/30 hover:text-white uppercase tracking-widest no-underline">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;