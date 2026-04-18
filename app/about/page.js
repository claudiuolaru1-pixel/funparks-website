export const metadata={title:'About — Funparks'};
export default function AboutPage(){
  return(
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-[#FF6B2B] text-sm font-semibold uppercase tracking-widest mb-4">About</p>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight" style={{fontFamily:'Syne,sans-serif'}}>Built by a<br/><span className="gradient-text">park enthusiast</span></h1>
          <div className="w-16 h-1 rounded-full bg-[#FF6B2B]"/>
        </div>
        <div className="space-y-8 text-white/70 text-lg leading-relaxed">
          <p>Funparks started from a simple frustration — every time I visited a new theme park in another country, I had to juggle five different apps, several browser tabs, and printouts to figure out what rides to prioritise, where to eat, and which hotel to book.</p>
          <p>There was no single app that gave you the full picture for parks around the world. The big names covered the US well but had nothing useful for parks in South America, Southeast Asia, the Middle East or Africa.</p>
          <p>So I built Funparks. One app, 57 parks across 6 continents — real-time wait times, curated food guides, hotel recommendations, interactive maps, and an AI assistant that can answer any park question instantly.</p>
          <p>The app is free. It always will be. Theme parks are already expensive enough.</p>
        </div>
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {[{icon:'🌍',title:'Global First',desc:'We cover parks on 6 continents. Not just the US. The whole world.'},{icon:'🆓',title:'Free Forever',desc:'No subscriptions, no paywalls. The full app experience is completely free.'},{icon:'📱',title:'Enthusiast-Built',desc:'Every feature was designed by someone who has queued for Steel Vengeance at 9am.'}].map(v=>(
            <div key={v.title} className="glass-card rounded-2xl p-6 border border-white/5">
              <div className="text-3xl mb-4">{v.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2" style={{fontFamily:'Syne,sans-serif'}}>{v.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-y border-white/5">
          {[{v:'57',l:'Parks'},{v:'1,000+',l:'Attractions'},{v:'10',l:'Languages'},{v:'6',l:'Continents'}].map(s=>(
            <div key={s.l} className="text-center">
              <p className="text-4xl font-black gradient-text mb-1" style={{fontFamily:'Syne,sans-serif'}}>{s.v}</p>
              <p className="text-white/50 text-sm">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
