import Link from 'next/link';
const parks=[
  {name:'Magic Kingdom',location:'Orlando, USA',emoji:'🏰',tag:'Disney',color:'#FF6B2B'},
  {name:'Tokyo DisneySea',location:'Tokyo, Japan',emoji:'⛵',tag:'Disney',color:'#f43f5e'},
  {name:'Cedar Point',location:'Sandusky, USA',emoji:'🎢',tag:'Thrill',color:'#a855f7'},
  {name:'Alton Towers',location:'Staffordshire, UK',emoji:'🏰',tag:'Merlin',color:'#06b6d4'},
  {name:'Universal Studios FL',location:'Orlando, USA',emoji:'🎬',tag:'Universal',color:'#FF6B2B'},
  {name:'Six Flags Magic Mtn.',location:'Valencia, USA',emoji:'⚡',tag:'Six Flags',color:'#f43f5e'},
  {name:'Ferrari World',location:'Abu Dhabi, UAE',emoji:'🏎️',tag:'Unique',color:'#a855f7'},
  {name:'Parque de la Costa',location:'Tigre, Argentina',emoji:'🌊',tag:'South America',color:'#06b6d4'},
];
export default function ParksShowcase() {
  return (
    <section className='py-24 relative overflow-hidden' style={{background:'linear-gradient(135deg,#fdf4ff,#f0fdff,#fff7f5)'}}>
      <div className='max-w-7xl mx-auto px-6 relative'>
        <div className='flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12'>
          <div>
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-purple-100 text-purple-600 text-sm font-bold mb-4'>🌍 Parks</div>
            <h2 className='text-4xl lg:text-5xl font-black text-gray-900' style={{fontFamily:'Syne,sans-serif'}}>64 parks,<br /><span className='gradient-text-2'>6 continents</span></h2>
          </div>
          <Link href='/parks' className='inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white shadow-md border border-purple-100 text-gray-700 font-bold hover:shadow-lg transition-all'>View all parks →</Link>
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {parks.map((p,i) => (
            <Link key={i} href='/parks' className='group bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-50 transition-all duration-300 hover:-translate-y-1 cursor-pointer'>
              <div className='flex items-start justify-between mb-4'>
                <div className='w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm' style={{backgroundColor:p.color+'15'}}>{p.emoji}</div>
                <span className='text-xs font-bold px-2 py-1 rounded-full' style={{backgroundColor:p.color+'15',color:p.color}}>{p.tag}</span>
              </div>
              <h3 className='text-gray-900 font-black text-sm mb-1 group-hover:text-purple-600 transition-colors' style={{fontFamily:'Syne,sans-serif'}}>{p.name}</h3>
              <p className='text-gray-400 text-xs font-medium'>{p.location}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}