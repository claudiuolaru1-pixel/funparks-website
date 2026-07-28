import Link from "next/link";

const APP_STORE = "https://apps.apple.com/app/funparks-theme-park-guide/id6763944775";
const PLAY_STORE = "https://play.google.com/store/apps/details?id=com.funparks.app";

export default function Footer(){
  const socials=[
    {icon:"📸",href:"https://www.instagram.com/funparksworld/",label:"Instagram",bg:"linear-gradient(135deg,#f09433,#dc2743,#bc1888)"},
    {icon:"🎵",href:"https://www.tiktok.com/@funparks",label:"TikTok",bg:"linear-gradient(135deg,#010101,#69C9D0)"},
    {icon:"▶️",href:"https://www.youtube.com/@Funparks-u7k",label:"YouTube",bg:"linear-gradient(135deg,#FF0000,#cc0000)"},
    {icon:"👥",href:"https://www.facebook.com/share/17T2h2NwmT/",label:"Facebook",bg:"linear-gradient(135deg,#1877F2,#0d5bba)"},
  ];
  const nav=[{label:"Home",href:"/"},{label:"Parks",href:"/parks"},{label:"Blog",href:"/blog"},{label:"About",href:"/about"},{label:"Contact",href:"/contact"}];
  return (
    <footer style={{background:"linear-gradient(135deg,#050a14,#0d1929,#050a14)"}}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl btn-gradient flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-lg" style={{fontFamily:"Syne,sans-serif"}}>F</span>
              </div>
              <span className="font-black text-xl text-white" style={{fontFamily:"Syne,sans-serif"}}>fun<span className="gradient-text">parks</span></span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-6 font-medium" style={{color:"rgba(255,255,255,0.4)"}}>The world's theme parks in your pocket. 64+ parks across 6 continents — free forever.</p>
            <div className="flex items-center gap-3">
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-9 h-9 rounded-xl flex items-center justify-center text-base hover:scale-110 transition-transform shadow-lg" style={{background:s.bg}}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-black text-sm mb-5 uppercase tracking-wider" style={{fontFamily:"Syne,sans-serif"}}>Navigation</h4>
            <ul className="space-y-3">
              {nav.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm font-medium hover:text-white transition-colors" style={{color:"rgba(255,255,255,0.4)"}}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black text-sm mb-5 uppercase tracking-wider" style={{fontFamily:"Syne,sans-serif"}}>Get the App</h4>
            <div className="flex flex-col gap-3">
              <a href={APP_STORE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-4 py-3 rounded-xl hover:scale-105 transition-transform" style={{background:"#000",border:"1px solid rgba(255,255,255,0.15)",color:"#fff",textDecoration:"none"}}>
                <span style={{fontSize:22}}>🍎</span>
                <div>
                  <div style={{fontSize:9,opacity:0.5,letterSpacing:0.5,textTransform:"uppercase"}}>Download on the</div>
                  <div style={{fontSize:14,fontWeight:800,fontFamily:"Syne,sans-serif"}}>App Store</div>
                </div>
              </a>
              <a href={PLAY_STORE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-4 py-3 rounded-xl hover:scale-105 transition-transform" style={{background:"#000",border:"1px solid rgba(255,255,255,0.15)",color:"#fff",textDecoration:"none"}}>
                <span style={{fontSize:22}}>▶️</span>
                <div>
                  <div style={{fontSize:9,opacity:0.5,letterSpacing:0.5,textTransform:"uppercase"}}>Get it on</div>
                  <div style={{fontSize:14,fontWeight:800,fontFamily:"Syne,sans-serif"}}>Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{borderTop:"1px solid rgba(255,255,255,0.08)"}}>
          <p className="text-xs font-medium" style={{color:"rgba(255,255,255,0.25)"}}>© 2026 Funparks. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs font-medium hover:text-white transition-colors" style={{color:"rgba(255,255,255,0.25)"}}>Privacy Policy</Link>
            <Link href="/terms" className="text-xs font-medium hover:text-white transition-colors" style={{color:"rgba(255,255,255,0.25)"}}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}