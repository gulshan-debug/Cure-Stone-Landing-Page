"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Handle Hydration and Scroll
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = isOpen ? "hidden" : "";
    }
    return () => {
      if (typeof document !== "undefined") document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Book Free Consultation ", href: "/book" },
    { name: "AI Symptom Checker", href: "/checker" },
    { name: "Blog", href: "/blog" },
    { name: "Patient Portal", href: "/portal" },
  ];

  if (!mounted) return <nav className="fixed top-0 w-full h-20 z-50 bg-transparent" />;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ease-in-out bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-100 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 md:px-10 flex items-center justify-between">
          
{/* Logo Section */}
<Link href="/" className="flex items-center gap-3 group no-underline shrink-0 z-[70]">
  <div className="relative flex items-center shrink-0">
  <div className={`relative transition-all duration-300 ${
      scrolled ? "w-28 h-10" : "w-32 h-12"
    }`}>
    <Image 
      src="https://theCurestone.com/wp-content/uploads/2021/05/PNG-Black-e1664728676618.png" 
      alt="Cure Stone Logo" 
      fill
      // Using object-left ensures it stays aligned with the start of the nav
      className="object-contain object-left" 
      priority
      unoptimized
    />
  </div>
</div>
</Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-slate-600 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="tel:+918800263884"
              className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-full border text-slate-700 bg-slate-50 border-slate-200 hover:border-primary/40 hover:text-primary transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
              +91 88002 63884
            </a>

            <Link
              href="/book"
              className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-primary hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
            >
              Book Now
            </Link>
          </div>

          {/* Hamburger Menu */}
          <button
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] z-[70]"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={`block w-5 h-[2px] rounded-full transition-all bg-slate-800 ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-5 h-[2px] rounded-full transition-all bg-slate-800 ${isOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[2px] rounded-full transition-all bg-slate-800 ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[54] bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] z-[65] bg-white shadow-2xl lg:hidden flex flex-col transition-transform duration-400 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
           {/* Mobile Sidebar - Text Logo also removed here */}
           <button onClick={() => setIsOpen(false)} className="text-slate-400 p-2">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
           </button>
        </div>

        <div className="flex-grow py-6 px-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${
                pathname === link.href ? "bg-primary/10 text-primary" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="p-6 border-t border-slate-100 space-y-3">
          <a href="tel:+918800263884" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-50 text-slate-700 font-bold text-sm">
            Call +91 88002 63884
          </a>
          <Link href="/book" onClick={() => setIsOpen(false)} className="block w-full py-3 bg-primary text-white text-center rounded-xl font-bold text-sm shadow-lg shadow-primary/20">
            Book Free Consultation 
          </Link>
        </div>
      </div>
    </>
  );
}