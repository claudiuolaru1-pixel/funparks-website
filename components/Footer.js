import Link from 'next/link';
export default function Footer(){
  const socials=[
    {icon:'📸',href:'https://www.instagram.com/funparksworld/',label:'Instagram',bg:'linear-gradient(135deg,#f09433,#dc2743,#bc1888)'},
    {icon:'🎵',href:'https://www.tiktok.com/@funparks',label:'TikTok',bg:'linear-gradient(135deg,#010101,#69C9D0)'},
    {icon:'▶️',href:'https://www.youtube.com/@Funparks-u7k',label:'YouTube',bg:'linear-gradient(135deg,#FF0000,#cc0000)'},
    {icon:'👥',href:'https://www.facebook.com/share/17T2h2NwmT/',label:'Facebook',bg:'linear-gradient(135deg,#1877F2,#0d5bba)'},
  ];
  const nav=[{label:'Home',href:'/'},{label:'Parks',href:'/parks'},{label:'Blog',href:'/blog'},{label:'About',href:'/about'},{label:'Contact',href:'/contact'}];
  return (
    <footer style={{background:'linear-gradient(135deg,#1a1a2e,#2d1b69)'}}>
      <div className='max-w-7xl mx-auto px-6 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12'>
          <div className='md:col-span-2'>
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-10 h-10 rounded-xl btn-gradient flex items-center justify-center shadow-lg'>
                <span className='text-white font-black text-lg' style={{fontFamily:'Syne,sans-serif'}}>F</span>
              </div>
              <span className='font-black text-xl text-white' style={{fontFamily:'Syne,sans-serif'}}>fun<span className='gradient-text'>parks</span></span>
            </div>
            <p className='text-white/50 text-sm leading-relaxed max-w-xs mb-6 font-medium'>The world's theme parks in your pocket. 64+ parks across 6 continents — free forever.</p>
            <div className='flex items-center gap-3'>
              {socials.map(s => (
                <a key={s.label} href={s.href} target='_blank' rel='noopener noreferrer' aria-label={s.label}
                  className='w-9 h-9 rounded-xl flex items-center justify-center text-base hover:scale-110 transition-transform shadow-lg'
                  style={{background:s.bg}}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className='text-white font-black text-sm mb-5 uppercase tracking-wider' style={{fontFamily:'Syne,sans-serif'}}>Navigation</h4>
            <ul className='space-y-3'>{nav.map(l => <li key={l.href}><Link href={l.href} className='text-white/50 hover:text-white text-sm font-medium transition-colors'>{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <h4 className='text-white font-black text-sm mb-5 uppercase tracking-wider' style={{fontFamily:'Syne,sans-serif'}}>Get the App</h4>
            <div className='flex flex-col gap-3'>
              <a href='#' target='_blank' rel='noopener noreferrer' className='flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all'>
                <div><div className='text-xs text-white/40 uppercase tracking-wider'>Get it on</div><div className='text-white text-sm font-bold'>Google Play — Soon 🤖</div></div>
              </a>
              <a href='#' className='flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all'>
                <div><div className='text-xs text-white/40 uppercase tracking-wider'>Download on the</div><div className='text-white text-sm font-bold'>App Store — Soon 🍎</div></div>
              </a>
            </div>
          </div>
        </div>
        <div className='mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-white/30 text-xs font-medium'>© 2026 Funparks. All rights reserved.</p>
          <div className='flex items-center gap-6'>
            <Link href='/privacy' className='text-white/30 hover:text-white/60 text-xs font-medium'>Privacy Policy</Link>
            <Link href='/terms' className='text-white/30 hover:text-white/60 text-xs font-medium'>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}