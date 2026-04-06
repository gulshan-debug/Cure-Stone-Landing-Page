"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Book Appointment", href: "/book" },
    { name: "AI Symptom Checker", href: "/checker" },
    { name: "Blog", href: "/blog" },
    { name: "Patient Portal", href: "/portal" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_2px_32px_rgba(0,0,0,0.08)] border-b border-slate-100"
            : "bg-transparent border-b border-transparent"
        }`}
        style={{ height: scrolled ? "64px" : "80px", transition: "height 0.4s ease, background 0.4s ease, box-shadow 0.4s ease" }}
      >
        <div className="max-w-7xl mx-auto h-full px-6 md:px-10 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group no-underline shrink-0">
            <div
              className={`relative flex items-center justify-center rounded-2xl transition-all duration-500 overflow-hidden ${
                scrolled ? "w-10 h-10" : "w-12 h-12"
              }`}
            >
              {/* Brand Logo Image */}
              <Image 
                src="/PNG-Black-e1664728676618.png" 
                alt="CureStone Logo" 
                width={48} 
                height={48}
                className={`transition-all duration-500 object-contain ${
                  scrolled ? "" : "invert brightness-200"
                }`}
              />
            </div>

            <div className="leading-none">
              <p className={`font-black tracking-tight transition-all duration-300 ${
                scrolled ? "text-lg text-slate-900" : "text-xl text-white"
              }`}>
                Cure<span className={scrolled ? "text-primary" : "text-white/70"}>Stone</span>
              </p>
              <p className={`text-[9px] font-semibold uppercase tracking-[0.25em] mt-0.5 transition-colors duration-300 ${
                scrolled ? "text-slate-400" : "text-white/50"
              }`}>
                Kidney Care Expert
              </p>
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
                  className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 group ${
                    isActive
                      ? scrolled ? "text-primary bg-primary/8" : "text-white bg-white/15"
                      : scrolled
                        ? "text-slate-600 hover:text-primary hover:bg-primary/5"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-colors ${scrolled ? "bg-primary" : "bg-white"}`} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="tel:+918800263884"
              className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95 ${
                scrolled
                  ? "text-slate-700 bg-slate-50 border-slate-200 hover:border-primary/40 hover:text-primary hover:bg-primary/5"
                  : "text-white bg-white/10 border-white/20 hover:bg-white/20"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
              +91 88002 63884
            </a>

            <Link
              href="/book"
              className={`relative overflow-hidden flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg ${
                scrolled ? "bg-primary shadow-primary/30 hover:bg-primary-dark" : "bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-sm shadow-white/10"
              }`}
            >
              <span className="relative z-10">Book Now</span>
              {/* Shimmer effect */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 hover:translate-x-full transition-transform duration-700 ease-in-out" />
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] z-[60] rounded-xl transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[2px] rounded-full transition-all duration-300 origin-center ${
              isOpen ? "rotate-45 translate-y-[7px]" : ""
            } ${scrolled || isOpen ? "bg-slate-800" : "bg-white"}`} />
            <span className={`block w-5 h-[2px] rounded-full transition-all duration-300 ${
              isOpen ? "opacity-0 scale-x-0" : ""
            } ${scrolled ? "bg-slate-800" : "bg-white"}`} />
            <span className={`block w-5 h-[2px] rounded-full transition-all duration-300 origin-center ${
              isOpen ? "-rotate-45 -translate-y-[7px]" : ""
            } ${scrolled || isOpen ? "bg-slate-800" : "bg-white"}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-[54] bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Slide-in Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] z-[55] bg-white shadow-2xl lg:hidden flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 relative overflow-hidden">
              <Image 
                src="/PNG-Black-e1664728676618.png" 
                alt="CureStone Logo" 
                fill
                className="object-contain"
              />
            </div>
            <span className="font-black text-slate-900 tracking-tight">CureStone</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto py-4 px-4">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl mb-1 font-semibold text-base transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-700 hover:bg-slate-50 hover:text-primary"
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Drawer Footer */}
        <div className="p-5 border-t border-slate-100 flex flex-col gap-3">
          <a
            href="tel:+918800263884"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-700 hover:border-primary/40 hover:text-primary transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            +91 88002 63884
          </a>
          <Link
            href="/book"
            onClick={() => setIsOpen(false)}
            className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-black text-center shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95"
          >
            Book Appointment
          </Link>
        </div>
      </div>


    </>
  );
}