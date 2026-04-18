import Link from 'next/link';
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
