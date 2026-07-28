"use client";
import Link from "next/link";

const APP_STORE = "https://apps.apple.com/app/funparks-theme-park-guide/id6763944775";
const PLAY_STORE = "https://play.google.com/store/apps/details?id=com.funparks.app";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{background:"#050a14",paddingTop:"5rem"}}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute animate-blob1" style={{top:"-10%",left:"-10%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle, rgba(255,107,43,0.25), rgba(244,63,94,0.15), transparent)",filter:"blur(80px)"}} />
        <div className="absolute animate-blob2" style={{bottom:"-10%",right:"-10%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle, rgba(168,85,247,0.2), rgba(6,182,212,0.15), transparent)",filter:"blur(70px)"}} />
        <div className="absolute animate-blob1" style={{top:"40%",left:"40%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle, rgba(168,85,247,0.12), transparent)",filter:"blur(60px)",animationDelay:"-5s"}} />
      </div>
      <div className="absolute inset-0" style={{backgroundImage:"radial-gradient(rgba(168,85,247,0.4) 1px, transparent 1px)",backgroundSize:"40px 40px",opacity:0.12}} />

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8" style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.8)"}}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Live · 64+ Parks Worldwide
          </div>
          <h1 className="text-5xl lg:text-7xl font-black leading-none mb-6 tracking-tight" style={{fontFamily:"Syne,sans-serif",color:"#f0f4ff"}}>
            Every<br />
            <span className="gradient-text">Theme Park.</span><br />
            One App.
          </h1>
          <p className="text-lg leading-relaxed max-w-md mb-10" style={{color:"rgba(255,255,255,0.5)"}}>
            Real-time wait times, AI park assistant, curated food and hotel guides. Everything for the perfect theme park day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a href={APP_STORE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl hover:scale-105 transition-transform" style={{background:"#000",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",textDecoration:"none"}}>
              <span style={{fontSize:28}}>🍎</span>
              <div>
                <div style={{fontSize:10,opacity:0.6,letterSpacing:0.5,textTransform:"uppercase"}}>Download on the</div>
                <div style={{fontSize:16,fontWeight:800,fontFamily:"Syne,sans-serif"}}>App Store</div>
              </div>
            </a>
            <a href={PLAY_STORE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl hover:scale-105 transition-transform" style={{background:"#000",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",textDecoration:"none"}}>
              <span style={{fontSize:28}}>▶️</span>
              <div>
                <div style={{fontSize:10,opacity:0.6,letterSpacing:0.5,textTransform:"uppercase"}}>Get it on</div>
                <div style={{fontSize:16,fontWeight:800,fontFamily:"Syne,sans-serif"}}>Google Play</div>
              </div>
            </a>
          </div>
          <p className="text-sm font-medium" style={{color:"rgba(255,255,255,0.25)"}}>Free forever · Android and iOS · No subscription</p>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute rounded-full animate-blob2" style={{width:350,height:350,background:"radial-gradient(circle,rgba(168,85,247,0.3),rgba(6,182,212,0.1),transparent)",filter:"blur(50px)"}} />
          <div className="relative animate-float" style={{width:240,height:480,background:"#0d1929",borderRadius:40,border:"2px solid rgba(255,255,255,0.1)",padding:8,boxShadow:"0 0 0 1px rgba(168,85,247,0.2), 0 0 60px rgba(168,85,247,0.3), 0 0 120px rgba(168,85,247,0.1), 0 40px 80px rgba(0,0,0,0.6)"}}>
            <div style={{position:"absolute",top:12,left:"50%",transform:"translateX(-50%)",width:60,height:8,background:"#000",borderRadius:4,zIndex:10}} />
            <div style={{borderRadius:34,overflow:"hidden",height:"100%"}}>
              <img src="/screenshots/start_page.jpg" alt="Funparks app" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}} />
            </div>
          </div>
          <div className="absolute rounded-2xl px-4 py-3" style={{right:"-1rem",top:"25%",background:"rgba(13,25,41,0.96)",border:"1px solid rgba(255,107,43,0.35)",boxShadow:"0 0 25px rgba(255,107,43,0.25)"}}>
            <p className="text-xs font-medium mb-0.5" style={{color:"rgba(255,255,255,0.4)"}}>Wait time</p>
            <p className="font-black text-sm" style={{color:"#FF6B2B"}}>12 min ⚡</p>
          </div>
          <div className="absolute rounded-2xl px-4 py-3" style={{left:"-2rem",bottom:"30%",background:"rgba(13,25,41,0.96)",border:"1px solid rgba(168,85,247,0.35)",boxShadow:"0 0 25px rgba(168,85,247,0.25)"}}>
            <p className="text-xs font-medium mb-0.5" style={{color:"rgba(255,255,255,0.4)"}}>Parks near you</p>
            <p className="font-black text-sm" style={{color:"#a855f7"}}>3 parks 🎢</p>
          </div>
        </div>
      </div>
    </section>
  );
}