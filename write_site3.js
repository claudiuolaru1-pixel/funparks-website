const fs = require('fs');
const path = require('path');
const site = 'C:/Users/claud/OneDrive/Desktop/funparks-website';
const write = (p, c) => {
  fs.mkdirSync(path.dirname(p), {recursive:true});
  fs.writeFileSync(p, c, 'utf8');
  console.log('wrote:', p.replace(site,''));
};

write(site+'/app/about/page.js', `export const metadata={title:'About — Funparks'};
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
`);

write(site+'/app/parks/page.js', `export const metadata={title:'Parks — Funparks'};
const parks=[
  {name:'Magic Kingdom',location:'Orlando, USA',continent:'Americas',emoji:'🏰'},
  {name:'EPCOT',location:'Orlando, USA',continent:'Americas',emoji:'🌐'},
  {name:'Universal Studios Florida',location:'Orlando, USA',continent:'Americas',emoji:'🎭'},
  {name:'Islands of Adventure',location:'Orlando, USA',continent:'Americas',emoji:'⚓'},
  {name:'Cedar Point',location:'Sandusky, USA',continent:'Americas',emoji:'🎢'},
  {name:'Six Flags Magic Mountain',location:'Valencia, USA',continent:'Americas',emoji:'⚡'},
  {name:"Canada's Wonderland",location:'Vaughan, Canada',continent:'Americas',emoji:'🍁'},
  {name:'La Ronde',location:'Montreal, Canada',continent:'Americas',emoji:'🎡'},
  {name:'Calaway Park',location:'Calgary, Canada',continent:'Americas',emoji:'🏔️'},
  {name:'Parque de la Costa',location:'Tigre, Argentina',continent:'Americas',emoji:'🌊'},
  {name:'Fantasilandia',location:'Santiago, Chile',continent:'Americas',emoji:'🌋'},
  {name:'Beto Carrero World',location:'Brazil',continent:'Americas',emoji:'🦁'},
  {name:'Tokyo Disneyland',location:'Tokyo, Japan',continent:'Asia',emoji:'🏯'},
  {name:'Tokyo DisneySea',location:'Tokyo, Japan',continent:'Asia',emoji:'⛵'},
  {name:'Universal Studios Japan',location:'Osaka, Japan',continent:'Asia',emoji:'🎌'},
  {name:'Shanghai Disneyland',location:'Shanghai, China',continent:'Asia',emoji:'🏮'},
  {name:'Hong Kong Disneyland',location:'Hong Kong',continent:'Asia',emoji:'🐉'},
  {name:'Lotte World',location:'Seoul, South Korea',continent:'Asia',emoji:'🇰🇷'},
  {name:'Alton Towers',location:'Staffordshire, UK',continent:'Europe',emoji:'🏰'},
  {name:'Thorpe Park',location:'Surrey, UK',continent:'Europe',emoji:'🌊'},
  {name:'Chessington World',location:'Surrey, UK',continent:'Europe',emoji:'🦁'},
  {name:'PortAventura',location:'Salou, Spain',continent:'Europe',emoji:'🌞'},
  {name:'Europa-Park',location:'Rust, Germany',continent:'Europe',emoji:'🇩🇪'},
  {name:'Ferrari World',location:'Abu Dhabi, UAE',continent:'Middle East',emoji:'🏎️'},
  {name:'Dreamworld',location:'Gold Coast, Australia',continent:'Oceania',emoji:'🦘'},
  {name:'Gold Reef City',location:'Johannesburg, SA',continent:'Africa',emoji:'⛏️'},
];
export default function ParksPage(){
  return(
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-[#FF6B2B] text-sm font-semibold uppercase tracking-widest mb-4">Parks</p>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-4" style={{fontFamily:'Syne,sans-serif'}}>57 Parks.<br/><span className="gradient-text">6 Continents.</span></h1>
          <p className="text-white/50 text-lg max-w-lg">Every park in the Funparks app — detailed guides, attraction lists, food and hotels.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {parks.map((p,i)=>(
            <div key={i} className="glass-card rounded-2xl p-5 hover:border-[#FF6B2B]/20 transition-all hover:scale-[1.01] cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B2B]/10 to-[#00D4C8]/10 flex items-center justify-center text-xl">{p.emoji}</div>
                <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider bg-white/5 px-2 py-1 rounded-full">{p.continent}</span>
              </div>
              <h3 className="text-white font-bold text-sm mb-1" style={{fontFamily:'Syne,sans-serif'}}>{p.name}</h3>
              <p className="text-white/40 text-xs">{p.location}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <a href="https://play.google.com/store/apps/details?id=com.funparks.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[#FF6B2B] text-white font-semibold hover:bg-[#FF8A4F] transition-all glow-orange">Download to Explore All Parks</a>
        </div>
      </div>
    </div>
  );
}
`);

write(site+'/app/blog/page.js', `export const metadata={title:'Blog — Funparks'};
const posts=[
  {title:'How to Beat the Queue at Steel Vengeance',excerpt:"Steel Vengeance regularly hits 2-hour waits by 10am. Here's the strategy to ride it multiple times.",cat:'Park Guide',date:'April 10, 2026',read:'5 min',emoji:'🎢',accent:'#FF6B2B'},
  {title:'Tokyo Disneyland vs DisneySea — Which to Visit?',excerpt:'Two extraordinary parks, one trip to Japan. We break down everything to help you choose.',cat:'Comparison',date:'March 28, 2026',read:'8 min',emoji:'🇯🇵',accent:'#00D4C8'},
  {title:'10 Questions to Ask the Funparks AI Assistant',excerpt:"The in-app AI can do a lot more than you think. Here's how to use it like a pro.",cat:'App Tips',date:'March 14, 2026',read:'4 min',emoji:'🤖',accent:'#FF6B2B'},
  {title:'The Best Theme Parks in South America',excerpt:'From Beto Carrero World in Brazil to Parque de la Costa in Argentina.',cat:'Destination',date:'Feb 25, 2026',read:'7 min',emoji:'🌎',accent:'#00D4C8'},
  {title:'Six Flags Magic Mountain: Complete Visitor Guide',excerpt:'20 roller coasters, one day. The ultimate itinerary for the Thrill Capital of the World.',cat:'Park Guide',date:'Feb 10, 2026',read:'9 min',emoji:'⚡',accent:'#FF6B2B'},
];
export default function BlogPage(){
  return(
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-[#FF6B2B] text-sm font-semibold uppercase tracking-widest mb-4">Blog</p>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-4" style={{fontFamily:'Syne,sans-serif'}}>Park guides,<br/><span className="gradient-text">tips & stories</span></h1>
          <p className="text-white/50 text-lg max-w-lg">Insider guides, ride reviews, park tips and app updates.</p>
        </div>
        <div className="glass-card rounded-3xl p-8 mb-8 hover:border-[#FF6B2B]/20 transition-all cursor-pointer group">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B2B]/20 to-[#00D4C8]/10 flex items-center justify-center text-3xl flex-shrink-0">{posts[0].emoji}</div>
            <div>
              <span className="text-xs font-semibold text-[#FF6B2B] bg-[#FF6B2B]/10 px-3 py-1 rounded-full mb-3 inline-block">{posts[0].cat}</span>
              <h2 className="text-white font-bold text-2xl mb-2 group-hover:text-[#FF6B2B] transition-colors" style={{fontFamily:'Syne,sans-serif'}}>{posts[0].title}</h2>
              <p className="text-white/50 text-sm mb-3 max-w-2xl">{posts[0].excerpt}</p>
              <div className="flex gap-4 text-white/30 text-xs"><span>{posts[0].date}</span><span>·</span><span>{posts[0].read} read</span></div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.slice(1).map((p,i)=>(
            <div key={i} className="glass-card rounded-2xl p-6 hover:border-[#FF6B2B]/20 transition-all hover:scale-[1.01] cursor-pointer group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B2B]/10 to-[#00D4C8]/10 flex items-center justify-center text-2xl mb-4">{p.emoji}</div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block" style={{backgroundColor:p.accent+'15',color:p.accent}}>{p.cat}</span>
              <h2 className="text-white font-bold text-base mb-2 group-hover:text-[#FF6B2B] transition-colors" style={{fontFamily:'Syne,sans-serif'}}>{p.title}</h2>
              <p className="text-white/50 text-xs leading-relaxed mb-4">{p.excerpt}</p>
              <div className="flex gap-3 text-white/30 text-xs"><span>{p.date}</span><span>·</span><span>{p.read} read</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`);

write(site+'/app/contact/page.js', `'use client';
import { useState } from 'react';
export default function ContactPage(){
  const [form,setForm]=useState({name:'',email:'',subject:'',message:''});
  const [sent,setSent]=useState(false);
  const handleSubmit=(e)=>{e.preventDefault();setSent(true);};
  return(
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-[#FF6B2B] text-sm font-semibold uppercase tracking-widest mb-4">Contact</p>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-4" style={{fontFamily:'Syne,sans-serif'}}>Get in <span className="gradient-text">touch</span></h1>
          <p className="text-white/50 text-lg max-w-lg">Have a question, suggestion or want to report a bug? We read every message.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            {[{icon:'📧',label:'Email',value:'hello@funparks.app'},{icon:'📱',label:'Instagram',value:'@funparksapp'},{icon:'🎵',label:'TikTok',value:'@funparksapp'}].map(x=>(
              <div key={x.label} className="flex items-center gap-4 glass-card rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B2B]/10 flex items-center justify-center text-xl">{x.icon}</div>
                <div><p className="text-white/40 text-xs mb-0.5">{x.label}</p><p className="text-white font-semibold text-sm">{x.value}</p></div>
              </div>
            ))}
          </div>
          {sent?(
            <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center">
              <div className="text-4xl mb-4">🎢</div>
              <h3 className="text-white font-bold text-xl mb-2" style={{fontFamily:'Syne,sans-serif'}}>Message sent!</h3>
              <p className="text-white/50 text-sm">We will get back to you shortly.</p>
            </div>
          ):(
            <form onSubmit={handleSubmit} className="space-y-4">
              {[{k:'name',l:'Your name',t:'text'},{k:'email',l:'Email address',t:'email'},{k:'subject',l:'Subject',t:'text'}].map(f=>(
                <div key={f.k}>
                  <label className="text-white/50 text-xs mb-1.5 block">{f.l}</label>
                  <input type={f.t} required value={form[f.k]} onChange={e=>setForm({...form,[f.k]:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6B2B]/50 transition-colors"/>
                </div>
              ))}
              <div>
                <label className="text-white/50 text-xs mb-1.5 block">Message</label>
                <textarea rows={5} required value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6B2B]/50 transition-colors resize-none"/>
              </div>
              <button type="submit" className="w-full py-4 rounded-xl bg-[#FF6B2B] text-white font-semibold hover:bg-[#FF8A4F] transition-all glow-orange">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
`);

write(site+'/app/privacy/page.js', `export const metadata={title:'Privacy Policy — Funparks'};
export default function PrivacyPage(){
  return(
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-black text-white mb-2" style={{fontFamily:'Syne,sans-serif'}}>Privacy Policy</h1>
        <p className="text-white/40 text-sm mb-12">Last updated: April 2026</p>
        <div className="space-y-8 text-white/60 leading-relaxed">
          <section><h2 className="text-white font-bold text-lg mb-3" style={{fontFamily:'Syne,sans-serif'}}>1. Information We Collect</h2><p>Funparks collects minimal data necessary to provide the service. We collect anonymous usage analytics to improve the app. We do not collect personally identifiable information without your explicit consent.</p></section>
          <section><h2 className="text-white font-bold text-lg mb-3" style={{fontFamily:'Syne,sans-serif'}}>2. How We Use Information</h2><p>Any data collected is used solely to improve the Funparks app and website experience. We do not sell, rent or share your data with third parties for marketing purposes.</p></section>
          <section><h2 className="text-white font-bold text-lg mb-3" style={{fontFamily:'Syne,sans-serif'}}>3. Contact</h2><p>For privacy questions, contact us at <a href="mailto:hello@funparks.app" className="text-[#FF6B2B]">hello@funparks.app</a></p></section>
        </div>
      </div>
    </div>
  );
}
`);

write(site+'/app/terms/page.js', `export const metadata={title:'Terms of Service — Funparks'};
export default function TermsPage(){
  return(
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-black text-white mb-2" style={{fontFamily:'Syne,sans-serif'}}>Terms of Service</h1>
        <p className="text-white/40 text-sm mb-12">Last updated: April 2026</p>
        <div className="space-y-8 text-white/60 leading-relaxed">
          <section><h2 className="text-white font-bold text-lg mb-3" style={{fontFamily:'Syne,sans-serif'}}>1. Use of the App</h2><p>Funparks is provided free of charge for personal, non-commercial use. You agree not to misuse the service or attempt to access it by any means other than the interface provided.</p></section>
          <section><h2 className="text-white font-bold text-lg mb-3" style={{fontFamily:'Syne,sans-serif'}}>2. Disclaimer</h2><p>Wait time data and park information is provided for guidance only. Funparks is not affiliated with any theme park operator. Always verify opening times and prices directly with the park.</p></section>
          <section><h2 className="text-white font-bold text-lg mb-3" style={{fontFamily:'Syne,sans-serif'}}>3. Contact</h2><p>Questions? Email us at <a href="mailto:hello@funparks.app" className="text-[#FF6B2B]">hello@funparks.app</a></p></section>
        </div>
      </div>
    </div>
  );
}
`);

console.log('\nAll pages written successfully!');
