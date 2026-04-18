export default function Features() {
  const f=[
    {icon:'⚡',title:'Live Wait Times',desc:'See real-time queue times for every attraction before you leave the hotel. Plan your day like a pro.',accent:'#FF6B2B'},
    {icon:'🤖',title:'AI Park Assistant',desc:'Ask anything — "Plan my day at Cedar Point" or "Best ride for my 8-year-old?" Instant answers.',accent:'#00D4C8'},
    {icon:'🗺️',title:'Interactive Maps',desc:'Explore every park on an interactive map. Find attractions, food, restrooms and your group.',accent:'#FF6B2B'},
    {icon:'🍔',title:'Food & Dining Guides',desc:'Curated restaurant reviews for every park with menus, prices and honest recommendations.',accent:'#00D4C8'},
    {icon:'🏨',title:'On-Site Hotels',desc:'The best hotels near every park with reviews, prices and direct booking links.',accent:'#FF6B2B'},
    {icon:'🌍',title:'Global Coverage',desc:'From Walt Disney World to Tokyo DisneySea to Parque de la Costa — 57 parks on 6 continents.',accent:'#00D4C8'},
  ];
  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#FF6B2B] text-sm font-semibold uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4" style={{fontFamily:'Syne,sans-serif'}}>Everything for<br /><span className="gradient-text">the perfect park day</span></h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">Every feature a theme park enthusiast could dream of — and then some.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {f.map((x,i)=>(
            <div key={i} className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4" style={{backgroundColor:x.accent+'15'}}>{x.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2" style={{fontFamily:'Syne,sans-serif'}}>{x.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{x.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
