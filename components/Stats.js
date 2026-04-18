export default function Stats() {
  const s=[
    {v:'57+',l:'Theme Parks',sub:'Across 6 continents',emoji:'🌍',color:'#FF6B2B'},
    {v:'1,000+',l:'Attractions',sub:'With live wait times',emoji:'🎢',color:'#f43f5e'},
    {v:'10',l:'Languages',sub:'Fully translated',emoji:'🌐',color:'#a855f7'},
    {v:'AI',l:'Park Assistant',sub:'Built-in smart guide',emoji:'🤖',color:'#06b6d4'},
  ];
  return (
    <section className='py-16 relative overflow-hidden' style={{background:'linear-gradient(135deg,#fff7f5,#fdf4ff,#f0fdff)'}}>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
          {s.map((x,i) => (
            <div key={i} className='bg-white rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 shadow-sm border-2 border-gray-50'>
              <div className='text-3xl mb-2'>{x.emoji}</div>
              <p className='text-4xl lg:text-5xl font-black mb-1' style={{fontFamily:'Syne,sans-serif',color:x.color}}>{x.v}</p>
              <p className='text-gray-900 font-bold text-sm mb-0.5'>{x.l}</p>
              <p className='text-gray-400 text-xs'>{x.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}