export const metadata={title:'Parks — Funparks'};
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
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-4" style={{fontFamily:'Syne,sans-serif'}}>64 Parks.<br/><span className="gradient-text">6 Continents.</span></h1>
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
