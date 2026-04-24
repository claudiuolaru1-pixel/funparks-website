'use client';
import { useState } from 'react';
const PLAY='https://play.google.com/store/apps/details?id=com.funparks.app';
const IOS='https://apps.apple.com/app/funparks/id000000000';
function QR({url,label}){
  const src='https://api.qrserver.com/v1/create-qr-code/?size=160x160&data='+encodeURIComponent(url)+'&bgcolor=ffffff&color=1a1a2e&margin=10';
  return (
    <div className='flex flex-col items-center gap-3'>
      <div className='p-3 rounded-2xl bg-white border-2 border-purple-100 shadow-lg'>
        <img src={src} alt={'QR '+label} width={120} height={120} className='rounded-lg' />
      </div>
      <p className='text-white/40 text-xs text-center font-medium'>Scan to download<br/>{label}</p>
    </div>
  );
}
export default function DownloadSection(){
  const [tab,setTab]=useState('android');
  return (
    <section id='download' className='py-24 relative overflow-hidden' style={{background:'linear-gradient(135deg,#1a1a2e,#2d1b69,#1a1a2e)'}}>
      <div className='absolute top-0 left-0 w-96 h-96 rounded-full opacity-20 blur-3xl' style={{background:'radial-gradient(#FF6B2B,transparent)'}} />
      <div className='absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-20 blur-3xl' style={{background:'radial-gradient(#a855f7,transparent)'}} />
      <div className='max-w-7xl mx-auto px-6 relative'>
        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          <div>
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/70 text-sm font-bold mb-6'>📱 Download</div>
            <h2 className='text-4xl lg:text-5xl font-black text-white mb-5 leading-tight' style={{fontFamily:'Syne,sans-serif'}}>Get Funparks.<br/><span className='gradient-text'>It is free.</span></h2>
            <p className='text-white/60 text-lg leading-relaxed mb-10 max-w-md'>64 theme parks worldwide. Free forever — no subscription, no paywalls.</p>
            <div className='flex flex-col sm:flex-row gap-4 mb-8'>
              <a href='#' onClick={(e)=>e.preventDefault()} target='_blank' rel='noopener noreferrer' className='flex items-center gap-4 px-6 py-4 rounded-2xl bg-white text-gray-900 font-bold hover:bg-gray-50 transition-all shadow-xl'>
                <div><div className='text-xs text-gray-400 uppercase tracking-wider mb-0.5'>Coming soon on</div><div className='font-black text-sm'>Google Play — Soon 🤖</div></div>
              </a>
              <a href='#' onClick={(e)=>e.preventDefault()} target='_blank' rel='noopener noreferrer' className='flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all'>
                <div><div className='text-xs text-white/40 uppercase tracking-wider mb-0.5'>Coming soon on</div><div className='font-black text-sm'>App Store — Soon 🍎</div></div>
              </a>
            </div>
            <ul className='space-y-2'>
              {['Free forever','64 parks worldwide and growing','AI assistant included','Works on Android and iOS'].map(x => (
                <li key={x} className='flex items-center gap-3 text-white/60 text-sm font-medium'>
                  <div className='w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center flex-shrink-0 text-white text-xs font-black'>✓</div>{x}
                </li>
              ))}
            </ul>
          </div>
          <div className='flex flex-col items-center'>
            <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 w-full max-w-sm shadow-2xl'>
              <h3 className='text-white font-black text-lg text-center mb-2' style={{fontFamily:'Syne,sans-serif'}}>Scan to Download</h3>
              <p className='text-white/40 text-sm text-center mb-6 font-medium'>Point your camera at the QR code</p>
              <div className='flex rounded-xl bg-white/10 p-1 mb-6'>
                {['android','ios'].map(t => (
                  <button key={t} onClick={() => setTab(t)} className={'flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ' + (tab===t ? 'btn-gradient text-white shadow-lg' : 'text-white/50 hover:text-white/80')}>
                    {t==='android' ? '🤖 Android' : '🍎 iOS'}
                  </button>
                ))}
              </div>
              <div className='flex justify-center'>
                {tab==='android' ? <QR url={PLAY} label='Google Play — Soon'/> : <QR url={IOS} label='App Store — Soon'/>}
              </div>
              <p className='text-white/20 text-xs text-center mt-5 font-medium'>Available on Android 6.0+ and iOS 14+</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}