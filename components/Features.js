export default function Features() {
  const f=[
    {icon:'⚡',title:'Live Wait Times',desc:'See real-time queue times for every attraction before you leave the hotel.',gradient:'from-orange-400 to-red-400'},
    {icon:'🤖',title:'AI Park Assistant',desc:'Ask anything — Plan my day at Cedar Point or Best ride for my 8-year-old.',gradient:'from-purple-400 to-blue-400'},
    {icon:'🗺️',title:'Interactive Maps',desc:'Explore every park on an interactive map. Find attractions, food and your group.',gradient:'from-teal-400 to-cyan-400'},
    {icon:'🍔',title:'Food & Dining Guides',desc:'Curated restaurant reviews for every park with menus, prices and recommendations.',gradient:'from-pink-400 to-rose-400'},
    {icon:'🏨',title:'On-Site Hotels',desc:'The best hotels near every park with reviews, prices and direct booking links.',gradient:'from-violet-400 to-purple-400'},
    {icon:'🌍',title:'Global Coverage',desc:'From Walt Disney World to Tokyo DisneySea to Parque de la Costa — 57 parks, 6 continents.',gradient:'from-emerald-400 to-teal-400'},
  ];
  return (
    <section id='features' className='py-24 bg-white'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='text-center mb-16'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-bold mb-4'>✨ Features</div>
          <h2 className='text-4xl lg:text-5xl font-black text-gray-900 mb-4' style={{fontFamily:'Syne,sans-serif'}}>Everything for<br /><span className='gradient-text'>the perfect park day</span></h2>
          <p className='text-gray-500 text-lg max-w-xl mx-auto'>Every feature a theme park enthusiast could dream of.</p>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {f.map((x,i) => (
            <div key={i} className={'group rounded-3xl p-6 border-2 border-gray-100 bg-white hover:border-purple-200 hover:shadow-xl hover:shadow-purple-50 transition-all duration-300 hover:-translate-y-1'}>
              <div className={'w-14 h-14 rounded-2xl bg-gradient-to-br ' + x.gradient + ' flex items-center justify-center text-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform'}>{x.icon}</div>
              <h3 className='text-gray-900 font-black text-lg mb-2' style={{fontFamily:'Syne,sans-serif'}}>{x.title}</h3>
              <p className='text-gray-500 text-sm leading-relaxed'>{x.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}