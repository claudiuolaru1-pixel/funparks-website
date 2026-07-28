"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const APP_STORE = "https://apps.apple.com/app/funparks-theme-park-guide/id6763944775";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [{label:"Parks",href:"/parks"},{label:"Features",href:"/#features"},{label:"Blog",href:"/blog"},{label:"About",href:"/about"},{label:"Contact",href:"/contact"}];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{
      background: scrolled ? "rgba(5,10,20,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      padding: scrolled ? "12px 0" : "20px 0",
    }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl btn-gradient flex items-center justify-center glow-orange">
            <span className="text-white font-black text-base" style={{fontFamily:"Syne,sans-serif"}}>F</span>
          </div>
          <span className="font-black text-xl" style={{fontFamily:"Syne,sans-serif",color:"#f0f4ff"}}>fun<span className="gradient-text">parks</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-sm font-semibold transition-colors hover:text-white" style={{color:"rgba(255,255,255,0.55)"}}>
              {l.label}
            </Link>
          ))}
        </nav>
        <a href={APP_STORE} target="_blank" rel="noopener noreferrer" className="hidden md:flex px-5 py-2.5 rounded-xl btn-gradient text-white text-sm font-bold shadow-lg hover:scale-105 transition-transform">
          Download Free
        </a>
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{color:"rgba(255,255,255,0.8)"}}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 py-6 flex flex-col gap-5" style={{background:"rgba(5,10,20,0.98)",borderTop:"1px solid rgba(255,255,255,0.08)"}}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-base font-semibold hover:text-white transition-colors" style={{color:"rgba(255,255,255,0.6)"}}>
              {l.label}
            </Link>
          ))}
          <a href={APP_STORE} target="_blank" rel="noopener noreferrer" className="mt-2 px-5 py-3 rounded-xl btn-gradient text-white text-sm font-bold text-center">
            Download Free
          </a>
        </div>
      )}
    </header>
  );
}