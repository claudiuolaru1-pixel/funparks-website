export default function Stats() {
  const s=[
    {v:"64+",l:"Theme Parks",sub:"Across 6 continents",emoji:"🌏",color:"#FF6B2B"},
    {v:"1,000+",l:"Attractions",sub:"With live wait times",emoji:"🎢",color:"#f43f5e"},
    {v:"10",l:"Languages",sub:"Fully translated",emoji:"🌐",color:"#a855f7"},
    {v:"AI",l:"Park Assistant",sub:"Built-in smart guide",emoji:"🤖",color:"#06b6d4"},
  ];
  return (
    <section className="py-16 relative overflow-hidden" style={{background:"#080f1e"}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {s.map((x,i) => (
            <div key={i} className="rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300" style={{background:"rgba(255,255,255,0.04)",border:`1px solid ${x.color}35`,boxShadow:`0 0 30px ${x.color}10`}}>
              <div className="text-3xl mb-2">{x.emoji}</div>
              <p className="text-4xl lg:text-5xl font-black mb-1" style={{fontFamily:"Syne,sans-serif",color:x.color,textShadow:`0 0 20px ${x.color}70`}}>{x.v}</p>
              <p className="font-bold text-sm mb-0.5" style={{color:"rgba(255,255,255,0.85)"}}>{x.l}</p>
              <p className="text-xs" style={{color:"rgba(255,255,255,0.4)"}}>{x.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}