export const metadata={title:'Blog — Funparks'};
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
