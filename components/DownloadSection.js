'use client';
import { useState } from 'react';
const PLAY='https://play.google.com/store/apps/details?id=com.funparks.app';
const IOS='https://apps.apple.com/app/funparks/id000000000';
function QR({url,label}){
  const src=`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(url)}&bgcolor=13131A&color=FFFFFF&margin=10`;
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="p-3 rounded-2xl bg-[#13131A] border border-white/10">
        <img src={src} alt={`QR ${label}`} width={120} height={120} className="rounded-lg opacity-90" />
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
                  <button key={t} onClick={()=>setTab(t)} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${tab===t?'bg-[#FF6B2B] text-white':'text-white/40 hover:text-white/70'}`}>
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
