'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = [
    {label:'Parks',href:'/parks'},{label:'Features',href:'/#features'},
    {label:'Blog',href:'/blog'},{label:'About',href:'/about'},{label:'Contact',href:'/contact'},
  ];
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled?'bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/5 py-3':'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6B2B] to-[#FF9A5C] flex items-center justify-center">
            <span className="text-white font-black text-sm" style={{fontFamily:'Syne,sans-serif'}}>F</span>
          </div>
          <span className="font-bold text-lg text-white" style={{fontFamily:'Syne,sans-serif'}}>fun<span className="text-[#FF6B2B]">parks</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l=><Link key={l.href} href={l.href} className="text-sm text-white/60 hover:text-white transition-colors font-medium">{l.label}</Link>)}
        </nav>
        <Link href="/#download" className="hidden md:flex px-5 py-2.5 rounded-xl bg-[#FF6B2B] text-white text-sm font-semibold hover:bg-[#FF8A4F] transition-all glow-orange">Download App</Link>
        <button className="md:hidden text-white/70 hover:text-white" onClick={()=>setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open?"M6 18L18 6M6 6l12 12":"M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#0A0A0F]/95 backdrop-blur-xl border-t border-white/5 px-6 py-6 flex flex-col gap-5">
          {links.map(l=><Link key={l.href} href={l.href} onClick={()=>setOpen(false)} className="text-white/70 hover:text-white text-base font-medium">{l.label}</Link>)}
          <Link href="/#download" onClick={()=>setOpen(false)} className="mt-2 px-5 py-3 rounded-xl bg-[#FF6B2B] text-white text-sm font-semibold text-center">Download App</Link>
        </div>
      )}
    </header>
  );
}
