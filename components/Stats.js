export default function Stats() {
  const s=[{v:'57+',l:'Theme Parks',sub:'Across 6 continents'},{v:'1,000+',l:'Attractions',sub:'With live wait times'},{v:'10',l:'Languages',sub:'Fully translated'},{v:'AI',l:'Park Assistant',sub:'Built-in smart guide'}];
  return (
    <section className="py-16 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {s.map((x,i)=>(
            <div key={i} className="text-center">
              <p className="text-4xl lg:text-5xl font-black gradient-text mb-1" style={{fontFamily:'Syne,sans-serif'}}>{x.v}</p>
              <p className="text-white font-semibold text-sm mb-0.5">{x.l}</p>
              <p className="text-white/40 text-xs">{x.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
