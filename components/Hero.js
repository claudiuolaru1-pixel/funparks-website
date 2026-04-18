'use client';
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
              {['⊞','🗺','★','👤'].map((icon,i)=><span key={i} className={`text-sm ${i===0?'text-[#FF6B2B]':'text-white/30'}`}>{icon}</span>)}
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
