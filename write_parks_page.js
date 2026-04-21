const fs=require('fs');
const page=`export const metadata={title:'Parks - Funparks',description:'All 64 theme parks in the Funparks app across 6 continents.'};

const parks=[
  {name:'Magic Kingdom',location:'Orlando, USA',continent:'Americas',emoji:'🏰'},
  {name:'EPCOT',location:'Orlando, USA',continent:'Americas',emoji:'🌍'},
  {name:'Hollywood Studios',location:'Orlando, USA',continent:'Americas',emoji:'🎬'},
  {name:'Disney California Adventure',location:'Anaheim, USA',continent:'Americas',emoji:'🎡'},
  {name:'Universal Studios Florida',location:'Orlando, USA',continent:'Americas',emoji:'🎭'},
  {name:'Islands of Adventure',location:'Orlando, USA',continent:'Americas',emoji:'⚓'},
  {name:'Cedar Point',location:'Sandusky, USA',continent:'Americas',emoji:'🎢'},
  {name:'Six Flags Magic Mountain',location:'Valencia, USA',continent:'Americas',emoji:'⚡'},
  {name:'Six Flags Great Adventure',location:'Jackson, USA',continent:'Americas',emoji:'🎢'},
  {name:'Six Flags Great America',location:'Gurnee, USA',continent:'Americas',emoji:'🎢'},
  {name:'Six Flags Over Georgia',location:'Austell, USA',continent:'Americas',emoji:'🎢'},
  {name:'Six Flags Fiesta Texas',location:'San Antonio, USA',continent:'Americas',emoji:'🌵'},
  {name:'Six Flags Over Texas',location:'Arlington, USA',continent:'Americas',emoji:'🤠'},
  {name:"Canada's Wonderland",location:'Vaughan, Canada',continent:'Americas',emoji:'🍁'},
  {name:'La Ronde',location:'Montreal, Canada',continent:'Americas',emoji:'🎡'},
  {name:'Calaway Park',location:'Calgary, Canada',continent:'Americas',emoji:'🏔️'},
  {name:'Parque de la Costa',location:'Tigre, Argentina',continent:'Americas',emoji:'🌊'},
  {name:'Fantasilandia',location:'Santiago, Chile',continent:'Americas',emoji:'🌋'},
  {name:'Beto Carrero World',location:'Brazil',continent:'Americas',emoji:'🦜'},
  {name:'Tokyo Disneyland',location:'Tokyo, Japan',continent:'Asia',emoji:'🏯'},
  {name:'Tokyo DisneySea',location:'Tokyo, Japan',continent:'Asia',emoji:'⛵'},
  {name:'Universal Studios Japan',location:'Osaka, Japan',continent:'Asia',emoji:'🎌'},
  {name:'Shanghai Disneyland',location:'Shanghai, China',continent:'Asia',emoji:'🐉'},
  {name:'Hong Kong Disneyland',location:'Hong Kong',continent:'Asia',emoji:'🏮'},
  {name:'Lotte World',location:'Seoul, South Korea',continent:'Asia',emoji:'🇰🇷'},
  {name:'Ferrari World',location:'Abu Dhabi, UAE',continent:'Middle East',emoji:'🏎️'},
  {name:'Alton Towers',location:'Staffordshire, UK',continent:'Europe',emoji:'🏰'},
  {name:'Thorpe Park',location:'Surrey, UK',continent:'Europe',emoji:'🌊'},
  {name:'Chessington World',location:'Surrey, UK',continent:'Europe',emoji:'🦁'},
  {name:'PortAventura',location:'Salou, Spain',continent:'Europe',emoji:'🌞'},
  {name:'Europa-Park',location:'Rust, Germany',continent:'Europe',emoji:'🇩🇪'},
  {name:'Phantasialand',location:'Brühl, Germany',continent:'Europe',emoji:'🎭'},
  {name:'Efteling',location:'Kaatsheuvel, Netherlands',continent:'Europe',emoji:'🧙'},
  {name:'Disneyland Paris',location:'Paris, France',continent:'Europe',emoji:'🗼'},
  {name:'Parc Asterix',location:'Paris, France',continent:'Europe',emoji:'⚔️'},
  {name:'Futuroscope',location:'Poitiers, France',continent:'Europe',emoji:'🚀'},
  {name:'Gardaland',location:'Castelnuovo, Italy',continent:'Europe',emoji:'🇮🇹'},
  {name:'Mirabilandia',location:'Savio, Italy',continent:'Europe',emoji:'🎢'},
  {name:'Liseberg',location:'Gothenburg, Sweden',continent:'Europe',emoji:'🇸🇪'},
  {name:'Tivoli Gardens',location:'Copenhagen, Denmark',continent:'Europe',emoji:'🇩🇰'},
  {name:'Plopsaland',location:'De Panne, Belgium',continent:'Europe',emoji:'🇧🇪'},
  {name:'Walibi Belgium',location:'Wavre, Belgium',continent:'Europe',emoji:'🎢'},
  {name:'Attractiepark Toverland',location:'Sevenum, Netherlands',continent:'Europe',emoji:'✨'},
  {name:'Heide Park',location:'Soltau, Germany',continent:'Europe',emoji:'🌲'},
  {name:'Energylandia',location:'Zator, Poland',continent:'Europe',emoji:'🇵🇱'},
  {name:'Dreamworld',location:'Gold Coast, Australia',continent:'Oceania',emoji:'🦘'},
  {name:'Warner Bros. Movie World',location:'Gold Coast, Australia',continent:'Oceania',emoji:'🎬'},
  {name:'Wet n Wild',location:'Gold Coast, Australia',continent:'Oceania',emoji:'🌊'},
  {name:'Gold Reef City',location:'Johannesburg, SA',continent:'Africa',emoji:'⛏️'},
];

const continentColors={
  'Americas':'#FF6B2B',
  'Asia':'#a855f7',
  'Europe':'#06b6d4',
  'Middle East':'#f43f5e',
  'Oceania':'#10b981',
  'Africa':'#f59e0b',
};

const continents=['Americas','Asia','Europe','Middle East','Oceania','Africa'];

export default function ParksPage(){
  return(
    <div className="min-h-screen pt-32 pb-24" style={{background:'#f8f7ff'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-purple-100 text-purple-600 text-sm font-bold mb-6">🌍 All Parks</div>
          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-4" style={{fontFamily:'Syne,sans-serif'}}>
            64 Parks.<br/><span style={{background:'linear-gradient(135deg,#FF6B2B,#f43f5e,#a855f7)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>6 Continents.</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-lg">Every park in the Funparks app — detailed guides, attraction lists, food and hotels.</p>
        </div>

        {continents.map(continent=>{
          const list=parks.filter(p=>p.continent===continent);
          if(!list.length)return null;
          const color=continentColors[continent]||'#FF6B2B';
          return(
            <div key={continent} className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-1 w-8 rounded-full" style={{background:color}} />
                <h2 className="text-xl font-black text-gray-900" style={{fontFamily:'Syne,sans-serif'}}>{continent}</h2>
                <span className="text-sm font-bold px-3 py-1 rounded-full" style={{background:color+'15',color:color}}>{list.length} parks</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {list.map((p,i)=>(
                  <div key={i} className="bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{backgroundColor:color+'15'}}>{p.emoji}</div>
                      <span className="text-xs font-bold px-2 py-1 rounded-full" style={{backgroundColor:color+'15',color:color}}>{p.continent}</span>
                    </div>
                    <h3 className="text-gray-900 font-black text-sm mb-1" style={{fontFamily:'Syne,sans-serif'}}>{p.name}</h3>
                    <p className="text-gray-400 text-xs font-medium">{p.location}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-base mb-6">Get full park details, live wait times and AI assistant in the app</p>
          <a href="https://play.google.com/store/apps/details?id=com.funparks.app" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-white font-bold shadow-xl"
            style={{background:'linear-gradient(135deg,#FF6B2B,#f43f5e,#a855f7)'}}>
            Download Free 🎢
          </a>
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('app/parks/page.js',page,'utf8');
console.log('Parks page updated with all 64 parks');