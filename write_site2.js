const fs = require('fs');
const path = require('path');
const site = 'C:/Users/claud/OneDrive/Desktop/funparks-website';
const write = (p, c) => {
  fs.mkdirSync(path.dirname(p), {recursive:true});
  fs.writeFileSync(p, c, 'utf8');
  console.log('wrote:', p.replace(site,''));
};

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
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
  const links = [
    {label:'Parks',href:'/parks'},{label:'Features',href:'/#features'},
    {label:'Blog',href:'/blog'},{label:'About',href:'/about'},{label:'Contact',href:'/contact'},
  ];
  return (
    <header className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${scrolled?'bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/5 py-3':'bg-transparent py-5'}\`}>
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
`);

// ─── FOOTER ───────────────────────────────────────────────────────────────────
write(site+'/components/Footer.js', `import Link from 'next/link';
const IG=()=><svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
const TT=()=><svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.67a8.18 8.18 0 004.77 1.52V6.74a4.85 4.85 0 01-1-.05z"/></svg>;
const YT=()=><svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
const FB=()=><svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
export default function Footer() {
  const socials=[{icon:<IG/>,href:'https://instagram.com/funparksapp',label:'Instagram'},{icon:<TT/>,href:'https://tiktok.com/@funparksapp',label:'TikTok'},{icon:<YT/>,href:'https://youtube.com/@funparksapp',label:'YouTube'},{icon:<FB/>,href:'https://facebook.com/funparksapp',label:'Facebook'}];
  const nav=[{label:'Home',href:'/'},{label:'Parks',href:'/parks'},{label:'Blog',href:'/blog'},{label:'About',href:'/about'},{label:'Contact',href:'/contact'}];
  return (
    <footer className="border-t border-white/5 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B2B] to-[#FF9A5C] flex items-center justify-center"><span className="text-white font-black" style={{fontFamily:'Syne,sans-serif'}}>F</span></div>
              <span className="font-bold text-xl text-white" style={{fontFamily:'Syne,sans-serif'}}>fun<span className="text-[#FF6B2B]">parks</span></span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">The world's theme parks in your pocket. 57+ parks across 6 continents.</p>
            <div className="flex items-center gap-3">
              {socials.map(s=><a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#FF6B2B] flex items-center justify-center text-white/50 hover:text-white transition-all">{s.icon}</a>)}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider" style={{fontFamily:'Syne,sans-serif'}}>Navigation</h4>
            <ul className="space-y-3">{nav.map(l=><li key={l.href}><Link href={l.href} className="text-white/50 hover:text-white text-sm transition-colors">{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider" style={{fontFamily:'Syne,sans-serif'}}>Get the App</h4>
            <div className="flex flex-col gap-3">
              <a href="https://play.google.com/store/apps/details?id=com.funparks.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                <div><div className="text-[10px] text-white/40 uppercase tracking-wider">Get it on</div><div className="text-white text-sm font-semibold">Google Play</div></div>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                <div><div className="text-[10px] text-white/40 uppercase tracking-wider">Download on the</div><div className="text-white text-sm font-semibold">App Store</div></div>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">© {new Date().getFullYear()} Funparks. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/30 hover:text-white/60 text-xs">Privacy Policy</Link>
            <Link href="/terms" className="text-white/30 hover:text-white/60 text-xs">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
`);

// ─── HERO ─────────────────────────────────────────────────────────────────────
write(site+'/components/Hero.js', `'use client';
import Link from 'next/link';
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF6B2B]/10 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#00D4C8]/8 rounded-full blur-3xl animate-glow-pulse" style={{animationDelay:'1.5s'}} />
      </div>
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)',backgroundSize:'60px 60px'}} />
      <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00D4C8] animate-pulse" />
            57 parks across 6 continents
          </div>
          <h1 className="text-5xl lg:text-7xl font-black leading-[0.95] mb-6 tracking-tight" style={{fontFamily:'Syne,sans-serif'}}>
            Every<br /><span className="gradient-text">Theme Park.</span><br />One App.
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-md mb-10">
            Real-time wait times, AI park assistant, curated food and hotel guides — everything for the perfect theme park day, anywhere in the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link href="/#download" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-[#FF6B2B] text-white font-semibold text-base hover:bg-[#FF8A4F] transition-all glow-orange">Download Free →</Link>
            <Link href="/parks" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold text-base hover:bg-white/10 transition-all">Explore Parks</Link>
          </div>
          <p className="text-white/40 text-sm">Free forever · Android & iOS · No subscription</p>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="absolute w-72 h-72 bg-[#FF6B2B]/20 rounded-full blur-3xl" />
          <div className="relative animate-float w-64 lg:w-72 aspect-[9/19] rounded-[3rem] border-2 border-white/10 bg-[#13131A] shadow-2xl overflow-hidden flex flex-col">
            <div className="px-5 pt-8 pb-3">
              <p className="text-white font-bold text-lg mb-2" style={{fontFamily:'Syne,sans-serif'}}>Parks</p>
              <div className="h-8 rounded-xl bg-white/5 border border-white/10 flex items-center px-3 gap-2 mb-3">
                <div className="w-3 h-3 rounded-full border border-white/20" />
                <div className="h-2 w-20 rounded-full bg-white/10" />
              </div>
            </div>
            <div className="mx-5 mb-3 h-28 rounded-2xl bg-[#1A2B1A] overflow-hidden relative border border-white/5">
              <div className="absolute inset-0 opacity-40" style={{backgroundImage:'linear-gradient(rgba(0,212,200,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,200,0.1) 1px,transparent 1px)',backgroundSize:'16px 16px'}} />
              {[{t:'30%',l:'25%',c:'#FF6B2B'},{t:'50%',l:'55%',c:'#00D4C8'},{t:'65%',l:'35%',c:'#FF6B2B'},{t:'20%',l:'70%',c:'#00D4C8'}].map((d,i)=>(
                <div key={i} className="absolute w-3 h-3 rounded-full border-2 border-[#0A0A0F]" style={{top:d.t,left:d.l,backgroundColor:d.c}} />
              ))}
            </div>
            <div className="px-5 flex-1 space-y-2 overflow-hidden">
              {[{name:'Magic Kingdom',flag:'🇺🇸',wait:'45 min'},{name:'Tokyo DisneySea',flag:'🇯🇵',wait:'68 min'},{name:'Cedar Point',flag:'🇺🇸',wait:'32 min'}].map(p=>(
                <div key={p.name} className="flex items-center gap-3 p-2 rounded-xl border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6B2B]/30 to-[#00D4C8]/30 flex items-center justify-center text-base flex-shrink-0">{p.flag}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-[10px] font-semibold truncate">{p.name}</p>
                    <p className="text-white/30 text-[9px]">Avg wait: {p.wait}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#00D4C8] flex-shrink-0" />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-around px-5 py-3 mt-3 border-t border-white/5">
              {['⊞','🗺','★','👤'].map((icon,i)=><span key={i} className={\`text-sm \${i===0?'text-[#FF6B2B]':'text-white/30'}\`}>{icon}</span>)}
            </div>
          </div>
          <div className="absolute -right-4 top-1/4 glass-card rounded-2xl px-3 py-2 border border-white/10">
            <p className="text-[10px] text-white/50">Wait time</p>
            <p className="text-[#00D4C8] font-bold text-sm">12 min</p>
          </div>
          <div className="absolute -left-8 bottom-1/3 glass-card rounded-2xl px-3 py-2 border border-white/10">
            <p className="text-[10px] text-white/50">Parks nearby</p>
            <p className="text-[#FF6B2B] font-bold text-sm">3 parks</p>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// ─── STATS ────────────────────────────────────────────────────────────────────
write(site+'/components/Stats.js', `export default function Stats() {
  const s=[{v:'57+',l:'Theme Parks',sub:'Across 6 continents'},{v:'1,000+',l:'Attractions',sub:'With live wait times'},{v:'10',l:'Languages',sub:'Fully translated'},{v:'AI',l:'Park Assistant',sub:'Built-in smart guide'}];
  return (
    <section className="py-16 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {s.map((x,i)=>(
            <div key={i} className="text-center">
              <p className="text-4xl lg:text-5xl font-black gradient-text mb-1" style={{fontFamily:'Syne,sans-serif'}}>{x.v}</p>
              <p className="text-white font-semibold text-sm mb-0.5">{x.l}</p>
              <p className="text-white/40 text-xs">{x.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// ─── FEATURES ─────────────────────────────────────────────────────────────────
write(site+'/components/Features.js', `export default function Features() {
  const f=[
    {icon:'⚡',title:'Live Wait Times',desc:'See real-time queue times for every attraction before you leave the hotel. Plan your day like a pro.',accent:'#FF6B2B'},
    {icon:'🤖',title:'AI Park Assistant',desc:'Ask anything — "Plan my day at Cedar Point" or "Best ride for my 8-year-old?" Instant answers.',accent:'#00D4C8'},
    {icon:'🗺️',title:'Interactive Maps',desc:'Explore every park on an interactive map. Find attractions, food, restrooms and your group.',accent:'#FF6B2B'},
    {icon:'🍔',title:'Food & Dining Guides',desc:'Curated restaurant reviews for every park with menus, prices and honest recommendations.',accent:'#00D4C8'},
    {icon:'🏨',title:'On-Site Hotels',desc:'The best hotels near every park with reviews, prices and direct booking links.',accent:'#FF6B2B'},
    {icon:'🌍',title:'Global Coverage',desc:'From Walt Disney World to Tokyo DisneySea to Parque de la Costa — 57 parks on 6 continents.',accent:'#00D4C8'},
  ];
  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#FF6B2B] text-sm font-semibold uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4" style={{fontFamily:'Syne,sans-serif'}}>Everything for<br /><span className="gradient-text">the perfect park day</span></h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">Every feature a theme park enthusiast could dream of — and then some.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {f.map((x,i)=>(
            <div key={i} className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4" style={{backgroundColor:x.accent+'15'}}>{x.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2" style={{fontFamily:'Syne,sans-serif'}}>{x.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{x.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// ─── PARKS SHOWCASE ───────────────────────────────────────────────────────────
write(site+'/components/ParksShowcase.js', `import Link from 'next/link';
const parks=[
  {name:'Magic Kingdom',location:'Orlando, USA',emoji:'🏰',tag:'Disney'},
  {name:'Tokyo DisneySea',location:'Tokyo, Japan',emoji:'⛵',tag:'Disney'},
  {name:'Cedar Point',location:'Sandusky, USA',emoji:'🎢',tag:'Thrill'},
  {name:'Alton Towers',location:'Staffordshire, UK',emoji:'🏰',tag:'Merlin'},
  {name:'Universal Studios FL',location:'Orlando, USA',emoji:'🎬',tag:'Universal'},
  {name:'Six Flags Magic Mtn.',location:'Valencia, USA',emoji:'⚡',tag:'Six Flags'},
  {name:'Ferrari World',location:'Abu Dhabi, UAE',emoji:'🏎️',tag:'Unique'},
  {name:'Parque de la Costa',location:'Tigre, Argentina',emoji:'🌊',tag:'South America'},
];
export default function ParksShowcase() {
  return (
    <section className="py-24 bg-[#0D0D14]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[#00D4C8] text-sm font-semibold uppercase tracking-widest mb-3">Parks</p>
            <h2 className="text-4xl lg:text-5xl font-black text-white" style={{fontFamily:'Syne,sans-serif'}}>57 parks,<br /><span className="gradient-text">6 continents</span></h2>
          </div>
          <Link href="/parks" className="text-white/60 hover:text-white transition-colors text-sm font-medium">View all parks →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {parks.map((p,i)=>(
            <Link key={i} href="/parks" className="glass-card rounded-2xl p-5 group hover:border-[#FF6B2B]/20 transition-all duration-300 cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B2B]/10 to-[#00D4C8]/10 flex items-center justify-center text-2xl">{p.emoji}</div>
                <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider bg-white/5 px-2 py-1 rounded-full">{p.tag}</span>
              </div>
              <h3 className="text-white font-bold text-sm mb-1 group-hover:text-[#FF6B2B] transition-colors" style={{fontFamily:'Syne,sans-serif'}}>{p.name}</h3>
              <p className="text-white/40 text-xs">{p.location}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// ─── SOCIAL STRIP ─────────────────────────────────────────────────────────────
write(site+'/components/SocialStrip.js', `const IG=()=><svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
const TT=()=><svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.67a8.18 8.18 0 004.77 1.52V6.74a4.85 4.85 0 01-1-.05z"/></svg>;
const YT=()=><svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
const FB=()=><svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
export default function SocialStrip() {
  const s=[
    {icon:<IG/>,name:'Instagram',handle:'@funparksapp',desc:'Park photos & reels',href:'https://instagram.com/funparksapp',color:'#E1306C'},
    {icon:<TT/>,name:'TikTok',handle:'@funparksapp',desc:'Ride POVs & tips',href:'https://tiktok.com/@funparksapp',color:'#69C9D0'},
    {icon:<YT/>,name:'YouTube',handle:'@funparksapp',desc:'Park guides & reviews',href:'https://youtube.com/@funparksapp',color:'#FF0000'},
    {icon:<FB/>,name:'Facebook',handle:'Funparks App',desc:'Community & updates',href:'https://facebook.com/funparksapp',color:'#1877F2'},
  ];
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[#FF6B2B] text-sm font-semibold uppercase tracking-widest mb-3">Community</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white" style={{fontFamily:'Syne,sans-serif'}}>Follow the <span className="gradient-text">adventure</span></h2>
          <p className="text-white/50 text-base mt-4 max-w-md mx-auto">Park content, tips, ride POVs and app updates every week.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {s.map(x=>(
            <a key={x.name} href={x.href} target="_blank" rel="noopener noreferrer" className="glass-card rounded-2xl p-6 flex flex-col items-center text-center group hover:scale-[1.02] transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{backgroundColor:x.color+'20',color:x.color}}>{x.icon}</div>
              <h3 className="text-white font-bold text-base mb-1" style={{fontFamily:'Syne,sans-serif'}}>{x.name}</h3>
              <p className="text-white/40 text-xs mb-3">{x.handle}</p>
              <span className="text-xs font-medium px-3 py-1.5 rounded-full" style={{backgroundColor:x.color+'15',color:x.color}}>{x.desc}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// ─── DOWNLOAD SECTION ─────────────────────────────────────────────────────────
write(site+'/components/DownloadSection.js', `'use client';
import { useState } from 'react';
const PLAY='https://play.google.com/store/apps/details?id=com.funparks.app';
const IOS='https://apps.apple.com/app/funparks/id000000000';
function QR({url,label}){
  const src=\`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=\${encodeURIComponent(url)}&bgcolor=13131A&color=FFFFFF&margin=10\`;
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="p-3 rounded-2xl bg-[#13131A] border border-white/10">
        <img src={src} alt={\`QR \${label}\`} width={120} height={120} className="rounded-lg opacity-90" />
      </div>
      <p className="text-white/40 text-xs text-center">Scan to download<br/>{label}</p>
    </div>
  );
}
export default function DownloadSection(){
  const [tab,setTab]=useState('android');
  return (
    <section id="download" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B2B]/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#FF6B2B] text-sm font-semibold uppercase tracking-widest mb-3">Download</p>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-5 leading-tight" style={{fontFamily:'Syne,sans-serif'}}>Get Funparks.<br/><span className="gradient-text">It's free.</span></h2>
            <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-md">57 theme parks worldwide. Free forever — no subscription, no paywalls.</p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href={PLAY} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white text-[#0A0A0F] font-semibold hover:bg-white/90 transition-all">
                <div><div className="text-[10px] text-[#0A0A0F]/50 uppercase tracking-wider leading-none mb-0.5">Get it on</div><div className="font-bold text-sm leading-none">Google Play</div></div>
              </a>
              <a href={IOS} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
                <div><div className="text-[10px] text-white/40 uppercase tracking-wider leading-none mb-0.5">Download on the</div><div className="font-bold text-sm leading-none">App Store</div></div>
              </a>
            </div>
            <ul className="space-y-2">
              {['Free forever','57 parks worldwide and growing','AI assistant included','Works on Android & iOS'].map(x=>(
                <li key={x} className="flex items-center gap-3 text-white/60 text-sm">
                  <div className="w-4 h-4 rounded-full bg-[#00D4C8]/20 flex items-center justify-center flex-shrink-0"><div className="w-1.5 h-1.5 rounded-full bg-[#00D4C8]"/></div>{x}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <div className="glass-card rounded-3xl p-8 border border-white/10 w-full max-w-sm">
              <h3 className="text-white font-bold text-lg text-center mb-2" style={{fontFamily:'Syne,sans-serif'}}>Scan to Download</h3>
              <p className="text-white/40 text-sm text-center mb-8">Point your camera at the QR code to download instantly</p>
              <div className="flex rounded-xl bg-white/5 p-1 mb-8">
                {['android','ios'].map(t=>(
                  <button key={t} onClick={()=>setTab(t)} className={\`flex-1 py-2 rounded-lg text-sm font-semibold transition-all \${tab===t?'bg-[#FF6B2B] text-white':'text-white/40 hover:text-white/70'}\`}>
                    {t==='android'?'Android':'iOS'}
                  </button>
                ))}
              </div>
              <div className="flex justify-center">
                {tab==='android'?<QR url={PLAY} label="Google Play"/>:<QR url={IOS} label="App Store"/>}
              </div>
              <p className="text-white/20 text-xs text-center mt-6">Available on Android 6.0+ and iOS 14+</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

console.log('\nAll components written successfully!');
