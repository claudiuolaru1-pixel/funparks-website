const IG=()=><span dangerouslySetInnerHTML={{__html:'<svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>'}} />;
const TT=()=><span dangerouslySetInnerHTML={{__html:'<svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.67a8.18 8.18 0 004.77 1.52V6.74a4.85 4.85 0 01-1-.05z"/></svg>'}} />;
const YT=()=><span dangerouslySetInnerHTML={{__html:'<svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>'}} />;
const FB=()=><span dangerouslySetInnerHTML={{__html:'<svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>'}} />;
export default function SocialStrip() {
  const s=[
    {icon:<IG/>,name:'Instagram',handle:'@funparksworld',desc:'Park photos & reels',href:'https://www.instagram.com/funparksworld/',color:'#E1306C',bg:'linear-gradient(135deg,#f09433,#dc2743,#bc1888)'},
    {icon:<TT/>,name:'TikTok',handle:'@funparks',desc:'Ride POVs & tips',href:'https://www.tiktok.com/@funparks',color:'#010101',bg:'linear-gradient(135deg,#010101,#69C9D0)'},
    {icon:<YT/>,name:'YouTube',handle:'@Funparks-u7k',desc:'Park guides & reviews',href:'https://www.youtube.com/@Funparks-u7k',color:'#FF0000',bg:'linear-gradient(135deg,#FF0000,#cc0000)'},
    {icon:<FB/>,name:'Facebook',handle:'Funparks',desc:'Community & updates',href:'https://www.facebook.com/share/17T2h2NwmT/',color:'#1877F2',bg:'linear-gradient(135deg,#1877F2,#0d5bba)'},
  ];
  return (
    <section className='py-24 bg-white'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='text-center mb-12'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 text-pink-600 text-sm font-bold mb-4'>❤️ Community</div>
          <h2 className='text-4xl lg:text-5xl font-black text-gray-900' style={{fontFamily:'Syne,sans-serif'}}>Follow the <span className='gradient-text'>adventure</span></h2>
          <p className='text-gray-500 text-base mt-4 max-w-md mx-auto'>Park content, tips, ride POVs and app updates every week.</p>
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          {s.map(x => (
            <a key={x.name} href={x.href} target='_blank' rel='noopener noreferrer'
              className='group rounded-3xl p-6 flex flex-col items-center text-center border-2 border-gray-100 bg-white hover:border-transparent hover:shadow-2xl transition-all duration-300 hover:-translate-y-2'>
              <div className='w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 transition-transform' style={{background:x.bg}}>{x.icon}</div>
              <h3 className='text-gray-900 font-black text-base mb-1' style={{fontFamily:'Syne,sans-serif'}}>{x.name}</h3>
              <p className='text-gray-400 text-xs font-medium mb-3'>{x.handle}</p>
              <span className='text-xs font-bold px-3 py-1.5 rounded-full bg-gray-50 text-gray-600'>{x.desc}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}