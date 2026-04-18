const fs = require('fs');
const path = require('path');
const site = 'C:/Users/claud/OneDrive/Desktop/funparks-website';
const write = (p, c) => {
  fs.mkdirSync(path.dirname(p), {recursive:true});
  fs.writeFileSync(p, c, 'utf8');
  console.log('wrote:', p.replace(site,''));
};

write(site+'/app/globals.css', `@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&display=swap');

* { box-sizing: border-box; padding: 0; margin: 0; }
html { scroll-behavior: smooth; }
body { background: #FFF8F0; color: #1A1035; font-family: 'Outfit', sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #FFF8F0; }
::-webkit-scrollbar-thumb { background: linear-gradient(#FF6B2B, #FF3D9A); border-radius: 3px; }
::selection { background: rgba(255,107,43,0.2); color: #1A1035; }

.gradient-text { background: linear-gradient(135deg, #FF6B2B 0%, #FF3D9A 50%, #7B2FFF 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.gradient-text-2 { background: linear-gradient(135deg, #0066FF 0%, #00D4C8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.glass-card { background: rgba(255,255,255,0.75); backdrop-filter: blur(16px); border: 1.5px solid rgba(255,255,255,0.9); box-shadow: 0 8px 32px rgba(0,0,0,0.06); }
.btn-primary { background: linear-gradient(135deg, #FF6B2B, #FF3D9A); color: white; font-weight: 800; border-radius: 16px; padding: 14px 28px; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; box-shadow: 0 4px 20px rgba(255,107,43,0.35); }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(255,107,43,0.5); }
.btn-secondary { background: white; color: #1A1035; font-weight: 800; border-radius: 16px; padding: 14px 28px; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; border: 2px solid rgba(0,0,0,0.08); box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
.btn-secondary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }

@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
@keyframes bounce-slow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
@keyframes glow { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
.animate-float { animation: float 5s ease-in-out infinite; }
.animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
.animate-glow { animation: glow 3s ease-in-out infinite; }
`);

write(site+'/components/Navbar.js', `'use client';
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
  const links = [{label:'Parks',href:'/parks'},{label:'Features',href:'/#features'},{label:'Blog',href:'/blog'},{label:'About',href:'/about'},{label:'Contact',href:'/contact'}];
  return (
    <header className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 \${scrolled?'bg-white/85 backdrop-blur-xl shadow-sm':''}\`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-lg" style={{background:'linear-gradient(135deg,#FF6B2B,#FF3D9A)'}}>F</div>
          <span className="font-black text-xl text-[#1A1035]" style={{fontFamily:'Nunito,sans-serif'}}>fun<span style={{background:'linear-gradient(135deg,#FF6B2B,#FF3D9A)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>parks</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          {links.map(l=><Link key={l.href} href={l.href} className="text-sm font-semibold text-[#1A1035]/60 hover:text-[#FF6B2B] transition-colors">{l.label}</Link>)}
        </nav>
        <Link href="/#download" className="hidden md:flex btn-primary text-sm">Download Free 🎢</Link>
        <button className="md:hidden text-[#1A1035]" onClick={()=>setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={open?"M6 18L18 6M6 6l12 12":"M4 6h16M4 12h16M4 18h16"}/></svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl px-6 py-6 flex flex-col gap-5 border-t border-black/5 shadow-lg">
          {links.map(l=><Link key={l.href} href={l.href} onClick={()=>setOpen(false)} className="text-[#1A1035] font-bold text-base hover:text-[#FF6B2B] transition-colors">{l.label}</Link>)}
          <Link href="/#download" onClick={()=>setOpen(false)} className="btn-primary text-sm justify-center">Download Free 🎢</Link>
        </div>
      )}
    </header>
  );
}
`);

write(site+'/components/Hero.js', `'use client';
import Link from 'next/link';
export default function Hero() {
  const emojis = [{e:'🎢',t:'top-32',l:'left-16',d:'0s'},{e:'🎡',t:'top-48',l:'right-24',d:'0.5s'},{e:'🎠',t:'bottom-32',l:'left-24',d:'1s'},{e:'🎪',t:'bottom-48',l:'right-16',d:'1.5s'},{e:'⚡',t:'top-64',l:'left-1/3',d:'0.8s'},{e:'🏰',t:'top-36',l:'right-1/3',d:'1.2s'}];
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl" style={{background:'radial-gradient(circle,#FF6B2B,transparent)'}}/>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl" style={{background:'radial-gradient(circle,#7B2FFF,transparent)'}}/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl" style={{background:'radial-gradient(circle,#FF3D9A,transparent)'}}/>
        {emojis.map((x,i)=><div key={i} className={`absolute text-3xl lg:text-4xl animate-bounce-slow hidden lg:block top-[${x.t}] left-[${x.l}]`} style={{animationDelay:x.d,top:x.t.includes('top')?undefined:undefined}}>{x.e}</div>)}
      </div>
      <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-8" style={{background:'linear-gradient(135deg,#FF6B2B20,#FF3D9A20)',border:'1.5px solid #FF6B2B40',color:'#FF6B2B'}}>
            🌍 57 parks across 6 continents
          </div>
          <h1 className="text-5xl lg:text-7xl font-black leading-[0.95] mb-6 tracking-tight text-[#1A1035]" style={{fontFamily:'Nunito,sans-serif'}}>
            Every<br/><span className="gradient-text">Theme Park.</span><br/>One App.
          </h1>
          <p className="text-[#1A1035]/60 text-lg leading-relaxed max-w-md mb-10">
            Real-time wait times, AI park assistant, food and hotel guides — everything for the perfect theme park day, anywhere in the world. 🎉
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link href="/#download" className="btn-primary text-base">Download Free 🚀</Link>
            <Link href="/parks" className="btn-secondary text-base">Explore Parks 🗺️</Link>
          </div>
          <p className="text-[#1A1035]/40 text-sm font-medium">✅ Free forever &nbsp;·&nbsp; ✅ No subscription &nbsp;·&nbsp; ✅ Android & iOS</p>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="absolute w-80 h-80 rounded-full blur-3xl opacity-30 animate-glow" style={{background:'linear-gradient(135deg,#FF6B2B,#FF3D9A)'}}/>
          <div className="relative animate-float w-64 lg:w-72 aspect-[9/19] rounded-[3rem] border-[3px] border-white shadow-2xl overflow-hidden flex flex-col" style={{background:'linear-gradient(160deg,#ffffff,#FFF5EE)'}}>
            <div className="px-5 pt-8 pb-3">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[#1A1035]/40 text-[10px] uppercase tracking-widest font-bold">Discover</p>
                  <p className="text-[#1A1035] font-black text-xl" style={{fontFamily:'Nunito,sans-serif'}}>Parks 🎢</p>
                </div>
                <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-lg" style={{background:'linear-gradient(135deg,#FF6B2B,#FF3D9A)'}}>🌍</div>
              </div>
              <div className="h-9 rounded-2xl flex items-center px-3 gap-2 mb-3" style={{background:'rgba(0,0,0,0.04)',border:'1.5px solid rgba(0,0,0,0.06)'}}>
                <span className="text-xs">🔍</span><div className="h-2 w-24 rounded-full bg-black/10"/>
              </div>
            </div>
            <div className="mx-5 mb-3 h-24 rounded-2xl overflow-hidden relative border border-black/5" style={{background:'linear-gradient(135deg,#E8F4FD,#E8FDF4)'}}>
              <div className="absolute inset-0 opacity-30" style={{backgroundImage:'linear-gradient(rgba(0,102,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(0,102,255,0.15) 1px,transparent 1px)',backgroundSize:'16px 16px'}}/>
              {[{t:'25%',l:'20%',c:'#FF6B2B'},{t:'55%',l:'55%',c:'#7B2FFF'},{t:'70%',l:'30%',c:'#FF3D9A'},{t:'20%',l:'72%',c:'#00D4C8'}].map((d,i)=>(
                <div key={i} className="absolute w-4 h-4 rounded-full border-2 border-white shadow-md" style={{top:d.t,left:d.l,backgroundColor:d.c}}/>
              ))}
            </div>
            <div className="px-5 flex-1 space-y-2 overflow-hidden">
              {[{n:'Magic Kingdom',f:'🇺🇸',w:'45m',c:'#FF6B2B'},{n:'Tokyo DisneySea',f:'🇯🇵',w:'68m',c:'#7B2FFF'},{n:'Cedar Point',f:'🇺🇸',w:'32m',c:'#FF3D9A'}].map(p=>(
                <div key={p.n} className="flex items-center gap-2.5 p-2.5 rounded-2xl" style={{background:'white',border:'1.5px solid rgba(0,0,0,0.05)'}}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0" style={{background:p.c+'15'}}>{p.f}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#1A1035] text-[10px] font-black truncate">{p.n}</p>
                    <p className="text-[#1A1035]/40 text-[9px]">⏱ {p.w} avg wait</p>
                  </div>
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor:p.c}}/>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-around px-5 py-3 mt-3 border-t border-black/5">
              {['🏠','🗺️','⭐','👤'].map((icon,i)=><span key={i} className={\`text-base \${i===0?'opacity-100':'opacity-30'}\`}>{icon}</span>)}
            </div>
          </div>
          <div className="absolute -right-2 lg:-right-6 top-1/4 rounded-2xl px-3 py-2 shadow-xl border-2 border-white bg-white">
            <p className="text-[10px] text-[#1A1035]/50 font-semibold">Wait time</p>
            <p className="font-black text-sm" style={{color:'#00D4C8'}}>12 min ✨</p>
          </div>
          <div className="absolute -left-2 lg:-left-8 bottom-1/3 rounded-2xl px-3 py-2 shadow-xl border-2 border-white bg-white">
            <p className="text-[10px] text-[#1A1035]/50 font-semibold">Parks nearby</p>
            <p className="font-black text-sm" style={{color:'#FF6B2B'}}>3 parks 🎡</p>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

write(site+'/components/Stats.js', `export default function Stats() {
  const s=[{v:'57+',l:'Theme Parks',sub:'6 continents',e:'🌍',c:'#FF6B2B'},{v:'1,000+',l:'Attractions',sub:'Live wait times',e:'🎢',c:'#7B2FFF'},{v:'10',l:'Languages',sub:'Fully translated',e:'💬',c:'#FF3D9A'},{v:'AI',l:'Park Assistant',sub:'Smart guide',e:'🤖',c:'#00D4C8'}];
  return (
    <section className="py-16" style={{background:'linear-gradient(135deg,#FF6B2B08,#7B2FFF06,#FF3D9A06)'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {s.map((x,i)=>(
            <div key={i} className="glass-card rounded-3xl p-6 text-center hover:scale-[1.03] transition-transform duration-200">
              <div className="text-3xl mb-2">{x.e}</div>
              <p className="text-4xl lg:text-5xl font-black mb-1" style={{fontFamily:'Nunito,sans-serif',color:x.c}}>{x.v}</p>
              <p className="text-[#1A1035] font-bold text-sm mb-0.5">{x.l}</p>
              <p className="text-[#1A1035]/40 text-xs">{x.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

write(site+'/components/Features.js', `export default function Features() {
  const f=[
    {e:'⚡',t:'Live Wait Times',d:'Real-time queue times for every attraction before you leave the hotel. Plan like a pro.',c:'#FF6B2B',bg:'#FF6B2B12'},
    {e:'🤖',t:'AI Park Assistant',d:'Ask anything — "Plan my day at Cedar Point" or "Best ride for my 8-year-old?" Instant answers.',c:'#7B2FFF',bg:'#7B2FFF12'},
    {e:'🗺️',t:'Interactive Maps',d:'Explore every park on an interactive map. Find attractions, food, restrooms and your group.',c:'#0066FF',bg:'#0066FF12'},
    {e:'🍔',t:'Food & Dining',d:'Curated restaurant reviews with menus, prices and honest recommendations for every park.',c:'#FF3D9A',bg:'#FF3D9A12'},
    {e:'🏨',t:'Hotels Guide',d:'Best hotels near every park with reviews, prices and direct booking links. Never overpay.',c:'#00D4C8',bg:'#00D4C812'},
    {e:'🌍',t:'Global Coverage',d:'From Walt Disney World to Tokyo DisneySea — 57 parks on 6 continents and growing.',c:'#FF6B2B',bg:'#FF6B2B12'},
  ];
  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4" style={{background:'#7B2FFF15',color:'#7B2FFF'}}>✨ Features</div>
          <h2 className="text-4xl lg:text-5xl font-black text-[#1A1035] mb-4" style={{fontFamily:'Nunito,sans-serif'}}>Everything for<br/><span className="gradient-text">the perfect park day</span></h2>
          <p className="text-[#1A1035]/50 text-lg max-w-xl mx-auto">Every feature a theme park enthusiast could dream of — and then some. 🎉</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {f.map((x,i)=>(
            <div key={i} className="glass-card rounded-3xl p-7 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5" style={{background:x.bg}}>{x.e}</div>
              <h3 className="text-[#1A1035] font-black text-lg mb-2" style={{fontFamily:'Nunito,sans-serif'}}>{x.t}</h3>
              <p className="text-[#1A1035]/55 text-sm leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

write(site+'/components/ParksShowcase.js', `import Link from 'next/link';
const parks=[
  {n:'Magic Kingdom',l:'Orlando, USA',e:'🏰',t:'Disney',c:'#FF6B2B'},
  {n:'Tokyo DisneySea',l:'Tokyo, Japan',e:'⛵',t:'Disney',c:'#7B2FFF'},
  {n:'Cedar Point',l:'Sandusky, USA',e:'🎢',t:'Thrill',c:'#FF3D9A'},
  {n:'Alton Towers',l:'UK',e:'🏯',t:'Merlin',c:'#0066FF'},
  {n:'Universal FL',l:'Orlando, USA',e:'🎬',t:'Universal',c:'#FF6B2B'},
  {n:'Six Flags Mag. Mtn.',l:'California, USA',e:'⚡',t:'Six Flags',c:'#7B2FFF'},
  {n:'Ferrari World',l:'Abu Dhabi, UAE',e:'🏎️',t:'Unique',c:'#FF3D9A'},
  {n:'Parque de la Costa',l:'Argentina',e:'🌊',t:'S. America',c:'#00D4C8'},
];
export default function ParksShowcase() {
  return (
    <section className="py-24" style={{background:'linear-gradient(160deg,#FFF8F0,#F8F0FF,#F0F8FF)'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4" style={{background:'#0066FF15',color:'#0066FF'}}>🌍 Parks</div>
            <h2 className="text-4xl lg:text-5xl font-black text-[#1A1035]" style={{fontFamily:'Nunito,sans-serif'}}>57 parks,<br/><span className="gradient-text-2">6 continents</span></h2>
          </div>
          <Link href="/parks" className="btn-secondary text-sm">View all parks →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {parks.map((p,i)=>(
            <Link key={i} href="/parks" className="glass-card rounded-3xl p-5 group hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{background:p.c+'15'}}>{p.e}</div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{background:p.c+'15',color:p.c}}>{p.t}</span>
              </div>
              <h3 className="text-[#1A1035] font-black text-sm mb-1 group-hover:text-[#FF6B2B] transition-colors" style={{fontFamily:'Nunito,sans-serif'}}>{p.n}</h3>
              <p className="text-[#1A1035]/40 text-xs font-medium">📍 {p.l}</p>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          {['🌎 Americas','🌍 Europe','🌏 Asia','🌙 Middle East','🦘 Oceania','🦁 Africa'].map(c=>(
            <span key={c} className="px-4 py-2 rounded-full text-sm font-semibold glass-card text-[#1A1035]/60">{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

write(site+'/components/SocialStrip.js', `const IG=()=><svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
const TT=()=><svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.67a8.18 8.18 0 004.77 1.52V6.74a4.85 4.85 0 01-1-.05z"/></svg>;
const YT=()=><svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
const FB=()=><svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
export default function SocialStrip() {
  const s=[
    {icon:<IG/>,name:'Instagram',handle:'@funparksworld',desc:'Park photos & reels 📸',href:'https://www.instagram.com/funparksworld/',g:'linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)'},
    {icon:<TT/>,name:'TikTok',handle:'@funparks',desc:'Ride POVs & tips 🎥',href:'https://www.tiktok.com/@funparks',g:'linear-gradient(135deg,#010101,#69C9D0)'},
    {icon:<YT/>,name:'YouTube',handle:'@Funparks',desc:'Park guides & reviews 🎬',href:'https://www.youtube.com/@Funparks-u7k',g:'linear-gradient(135deg,#FF0000,#FF6B6B)'},
    {icon:<FB/>,name:'Facebook',handle:'Funparks',desc:'Community & updates 👥',href:'https://www.facebook.com/share/17T2h2NwmT/',g:'linear-gradient(135deg,#1877F2,#42A5F5)'},
  ];
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4" style={{background:'#FF3D9A15',color:'#FF3D9A'}}>❤️ Community</div>
          <h2 className="text-4xl lg:text-5xl font-black text-[#1A1035]" style={{fontFamily:'Nunito,sans-serif'}}>Follow the <span className="gradient-text">adventure</span></h2>
          <p className="text-[#1A1035]/50 text-base mt-4 max-w-md mx-auto">Park content, ride POVs, tips and app updates every week. Join the Funparks family! 🎉</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {s.map(x=>(
            <a key={x.name} href={x.href} target="_blank" rel="noopener noreferrer" className="glass-card rounded-3xl p-7 flex flex-col items-center text-center group hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 transition-transform" style={{background:x.g}}>{x.icon}</div>
              <h3 className="text-[#1A1035] font-black text-base mb-1" style={{fontFamily:'Nunito,sans-serif'}}>{x.name}</h3>
              <p className="text-[#1A1035]/40 text-xs mb-3 font-semibold">{x.handle}</p>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white" style={{background:x.g}}>{x.desc}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

write(site+'/components/DownloadSection.js', `'use client';
import { useState } from 'react';
const PLAY='https://play.google.com/store/apps/details?id=com.funparks.app';
const IOS='https://apps.apple.com/app/funparks/id000000000';
function QR({url,label}){
  const src=\`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=\${encodeURIComponent(url)}&bgcolor=ffffff&color=1A1035&margin=10\`;
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="p-4 rounded-3xl shadow-xl bg-white border-2 border-white">
        <img src={src} alt={\`QR \${label}\`} width={140} height={140} className="rounded-xl"/>
      </div>
      <p className="text-[#1A1035]/50 text-xs text-center font-semibold">Scan to download<br/>{label}</p>
    </div>
  );
}
export default function DownloadSection(){
  const [tab,setTab]=useState('android');
  return (
    <section id="download" className="py-24 relative overflow-hidden" style={{background:'linear-gradient(135deg,#FFF0E8,#F8F0FF,#E8F8FF)'}}>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none" style={{background:'radial-gradient(circle,#FF6B2B,transparent)'}}/>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none" style={{background:'radial-gradient(circle,#7B2FFF,transparent)'}}/>
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-5" style={{background:'#FF6B2B15',color:'#FF6B2B'}}>📲 Download</div>
            <h2 className="text-4xl lg:text-5xl font-black text-[#1A1035] mb-5 leading-tight" style={{fontFamily:'Nunito,sans-serif'}}>
              Get Funparks.<br/><span className="gradient-text">It's free! 🎉</span>
            </h2>
            <p className="text-[#1A1035]/55 text-lg leading-relaxed mb-10 max-w-md">57 theme parks worldwide. Free forever — no subscription, no paywalls. Just pure theme park joy. 🎢</p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href={PLAY} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-white hover:scale-[1.02] transition-all shadow-lg" style={{background:'linear-gradient(135deg,#34A853,#4CAF50)'}}>
                <div><div className="text-[10px] opacity-70 uppercase tracking-wider leading-none mb-0.5">Get it on</div><div className="font-black text-sm leading-none">Google Play 🤖</div></div>
              </a>
              <a href={IOS} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-white hover:scale-[1.02] transition-all shadow-lg" style={{background:'linear-gradient(135deg,#1A1035,#434365)'}}>
                <div><div className="text-[10px] opacity-70 uppercase tracking-wider leading-none mb-0.5">Download on the</div><div className="font-black text-sm leading-none">App Store 🍎</div></div>
              </a>
            </div>
            <ul className="space-y-3">
              {['🆓 Free forever — no hidden fees','🌍 57 parks worldwide and growing','🤖 AI assistant included','📱 Works on Android & iOS'].map(x=>(
                <li key={x} className="text-[#1A1035]/60 text-sm font-semibold">{x}</li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <div className="rounded-3xl p-8 w-full max-w-sm shadow-2xl bg-white border-2 border-white">
              <h3 className="text-[#1A1035] font-black text-xl text-center mb-2" style={{fontFamily:'Nunito,sans-serif'}}>📸 Scan to Download</h3>
              <p className="text-[#1A1035]/40 text-sm text-center mb-6">Point your camera at the QR code to download instantly</p>
              <div className="flex rounded-2xl p-1 mb-6" style={{background:'#F5F5F5'}}>
                {['android','ios'].map(t=>(
                  <button key={t} onClick={()=>setTab(t)} className={\`flex-1 py-2.5 rounded-xl text-sm font-black transition-all \${tab===t?'text-white shadow-md':'text-[#1A1035]/40'}\`} style={tab===t?{background:'linear-gradient(135deg,#FF6B2B,#FF3D9A)'}:{}}>
                    {t==='android'?'Android 🤖':'iOS 🍎'}
                  </button>
                ))}
              </div>
              <div className="flex justify-center">
                {tab==='android'?<QR url={PLAY} label="Google Play"/>:<QR url={IOS} label="App Store"/>}
              </div>
              <p className="text-[#1A1035]/30 text-xs text-center mt-5">Android 6.0+ · iOS 14+</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

write(site+'/components/Footer.js', `import Link from 'next/link';
const IG=()=><svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
const TT=()=><svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.67a8.18 8.18 0 004.77 1.52V6.74a4.85 4.85 0 01-1-.05z"/></svg>;
const YT=()=><svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
const FB=()=><svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
export default function Footer() {
  const socials=[{icon:<IG/>,href:'https://www.instagram.com/funparksworld/',label:'Instagram'},{icon:<TT/>,href:'https://www.tiktok.com/@funparks',label:'TikTok'},{icon:<YT/>,href:'https://www.youtube.com/@Funparks-u7k',label:'YouTube'},{icon:<FB/>,href:'https://www.facebook.com/share/17T2h2NwmT/',label:'Facebook'}];
  const nav=[{label:'Home',href:'/'},{label:'Parks',href:'/parks'},{label:'Blog',href:'/blog'},{label:'About',href:'/about'},{label:'Contact',href:'/contact'}];
  return (
    <footer style={{background:'linear-gradient(160deg,#1A1035,#2D1B69)'}}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-lg" style={{background:'linear-gradient(135deg,#FF6B2B,#FF3D9A)'}}>F</div>
              <span className="font-black text-xl text-white" style={{fontFamily:'Nunito,sans-serif'}}>fun<span style={{background:'linear-gradient(135deg,#FF6B2B,#FF3D9A)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>parks</span></span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">The world's theme parks in your pocket. 57+ parks across 6 continents. Free forever! 🎢</p>
            <div className="flex items-center gap-2">
              {socials.map(s=>(
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-9 h-9 rounded-xl flex items-center justify-center text-white hover:scale-110 hover:-translate-y-0.5 transition-all" style={{background:'rgba(255,255,255,0.1)'}}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-black text-sm mb-5 uppercase tracking-wider" style={{fontFamily:'Nunito,sans-serif'}}>Navigation</h4>
            <ul className="space-y-3">{nav.map(l=><li key={l.href}><Link href={l.href} className="text-white/50 hover:text-white text-sm font-semibold transition-colors">{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <h4 className="text-white font-black text-sm mb-5 uppercase tracking-wider" style={{fontFamily:'Nunito,sans-serif'}}>Get the App</h4>
            <div className="flex flex-col gap-3">
              <a href="https://play.google.com/store/apps/details?id=com.funparks.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-white hover:scale-[1.02] transition-all" style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.12)'}}>
                <div><div className="text-[10px] text-white/40 uppercase tracking-wider">Get it on</div><div className="text-white text-sm font-black">Google Play 🤖</div></div>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-white hover:scale-[1.02] transition-all" style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.12)'}}>
                <div><div className="text-[10px] text-white/40 uppercase tracking-wider">Download on the</div><div className="text-white text-sm font-black">App Store 🍎</div></div>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">© {new Date().getFullYear()} Funparks. Made with ❤️ for park lovers worldwide.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/30 hover:text-white/60 text-xs transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/30 hover:text-white/60 text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
`);

console.log('\n✅ Full vibrant redesign complete!');
