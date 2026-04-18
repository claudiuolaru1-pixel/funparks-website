'use client';
import Link from 'next/link';
export default function Hero() {
  const parks = [
    {name:'Magic Kingdom',flag:'🇺🇸',wait:'45 min',color:'#FF6B2B'},
    {name:'Tokyo DisneySea',flag:'🇯🇵',wait:'68 min',color:'#a855f7'},
    {name:'Cedar Point',flag:'🇺🇸',wait:'32 min',color:'#06b6d4'},
  ];
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden pt-20'>
      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        <div className='absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-30 animate-blob1' style={{background:'radial-gradient(circle, #FF6B2B, #f43f5e, transparent)'}} />
        <div className='absolute -bottom-40 -right-40 w-80 h-80 rounded-full opacity-25 animate-blob2' style={{background:'radial-gradient(circle, #a855f7, #06b6d4, transparent)'}} />
      </div>
      <div className='absolute inset-0 opacity-5' style={{backgroundImage:'radial-gradient(#a855f7 1px, transparent 1px)',backgroundSize:'32px 32px'}} />
      <div className='relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center'>
        <div>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md border border-purple-100 text-sm font-semibold text-purple-600 mb-8'>
            <span className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
            57 parks across 6 continents
          </div>
          <h1 className='text-5xl lg:text-7xl font-black leading-none mb-6 tracking-tight text-gray-900' style={{fontFamily:'Syne,sans-serif'}}>
            Every<br /><span className='gradient-text'>Theme Park.</span><br />One App.
          </h1>
          <p className='text-gray-500 text-lg leading-relaxed max-w-md mb-10'>
            Real-time wait times, AI park assistant, curated food and hotel guides. Everything for the perfect theme park day.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 mb-10'>
            <Link href='/#download' className='inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl btn-gradient text-white font-bold text-base shadow-xl'>
              Download Free 🎢
            </Link>
            <Link href='/parks' className='inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white border-2 border-purple-200 text-gray-700 font-bold text-base hover:border-purple-400 transition-all shadow-md'>
              Explore Parks 🗺️
            </Link>
          </div>
          <p className='text-gray-400 text-sm font-medium'>Free forever · Android and iOS · No subscription</p>
        </div>
        <div className='relative flex items-center justify-center'>
          <div className='absolute w-72 h-72 rounded-full opacity-20 animate-blob2' style={{background:'radial-gradient(circle,#a855f7,#06b6d4,transparent)'}} />
          <div className='relative animate-float w-64 lg:w-72 rounded-3xl overflow-hidden flex flex-col shadow-2xl border-4 border-white' style={{aspectRatio:'9/19',background:'white',boxShadow:'0 40px 80px rgba(168,85,247,0.25)'}}>
            <div className='h-8 flex items-center justify-between px-5' style={{background:'linear-gradient(135deg,#FF6B2B,#f43f5e,#a855f7)'}}>
              <span className='text-white text-xs font-bold'>9:41</span>
              <div className='w-14 h-3 rounded-full bg-black/30' />
              <span className='text-white text-xs'>●●●</span>
            </div>
            <div className='px-5 pt-4 pb-2 bg-white'>
              <p className='text-gray-400 text-xs uppercase tracking-widest font-bold'>Discover</p>
              <p className='text-gray-900 font-black text-lg' style={{fontFamily:'Syne,sans-serif'}}>Parks 🎡</p>
              <div className='mt-2 h-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center px-3 gap-2'>
                <div className='w-3 h-3 rounded-full border-2 border-purple-300' />
                <div className='h-2 w-24 rounded-full bg-purple-100' />
              </div>
            </div>
            <div className='mx-4 mb-3 h-24 rounded-2xl overflow-hidden relative border-2 border-purple-50' style={{background:'linear-gradient(135deg,#fdf4ff,#eff6ff)'}}>
              <div className='absolute inset-0 opacity-30' style={{backgroundImage:'linear-gradient(rgba(168,85,247,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,0.2) 1px,transparent 1px)',backgroundSize:'16px 16px'}} />
              {[{t:'30%',l:'25%',c:'#FF6B2B'},{t:'50%',l:'55%',c:'#a855f7'},{t:'65%',l:'35%',c:'#f43f5e'},{t:'20%',l:'70%',c:'#06b6d4'}].map((d,i) => (
                <div key={i} className='absolute w-4 h-4 rounded-full border-2 border-white shadow-md' style={{top:d.t,left:d.l,backgroundColor:d.c}} />
              ))}
            </div>
            <div className='px-4 flex-1 space-y-2 overflow-hidden'>
              {parks.map(p => (
                <div key={p.name} className='flex items-center gap-3 p-2 rounded-xl bg-gray-50 border border-gray-100'>
                  <div className='w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0' style={{backgroundColor:p.color+'15'}}>{p.flag}</div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-gray-900 text-xs font-bold truncate'>{p.name}</p>
                    <p className='text-gray-400 text-xs'>Avg wait: {p.wait}</p>
                  </div>
                  <div className='w-2 h-2 rounded-full flex-shrink-0' style={{backgroundColor:p.color}} />
                </div>
              ))}
            </div>
            <div className='flex items-center justify-around px-5 py-3 mt-2 border-t border-gray-100 bg-white'>
              <span className='text-sm' style={{filter:'drop-shadow(0 0 4px #FF6B2B)'}}>⊞</span>
              <span className='text-sm opacity-30'>🗺</span>
              <span className='text-sm opacity-30'>★</span>
              <span className='text-sm opacity-30'>👤</span>
            </div>
          </div>
          <div className='absolute -right-4 top-1/4 bg-white rounded-2xl px-3 py-2 shadow-xl border border-purple-100'>
            <p className='text-xs text-gray-400 font-medium'>Wait time</p>
            <p className='font-black text-sm' style={{color:'#06b6d4'}}>12 min ⚡</p>
          </div>
          <div className='absolute -left-8 bottom-1/3 bg-white rounded-2xl px-3 py-2 shadow-xl border border-orange-100'>
            <p className='text-xs text-gray-400 font-medium'>Parks nearby</p>
            <p className='font-black text-sm' style={{color:'#FF6B2B'}}>3 parks 🎢</p>
          </div>
        </div>
      </div>
    </section>
  );
}