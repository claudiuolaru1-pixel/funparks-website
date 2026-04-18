'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = [{label:'Parks',href:'/parks'},{label:'Features',href:'/#features'},{label:'Blog',href:'/blog'},{label:'About',href:'/about'},{label:'Contact',href:'/contact'}];
  const scrolledClass = 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-purple-100 py-3';
  const normalClass = 'bg-transparent py-5';
  return (
    <header className={'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ' + (scrolled ? scrolledClass : normalClass)}>
      <div className='max-w-7xl mx-auto px-6 flex items-center justify-between'>
        <Link href='/' className='flex items-center gap-2'>
          <div className='w-9 h-9 rounded-xl btn-gradient flex items-center justify-center glow-orange'>
            <span className='text-white font-black text-base' style={{fontFamily:'Syne,sans-serif'}}>F</span>
          </div>
          <span className='font-black text-xl text-gray-900' style={{fontFamily:'Syne,sans-serif'}}>fun<span className='gradient-text'>parks</span></span>
        </Link>
        <nav className='hidden md:flex items-center gap-8'>
          {links.map(l => <Link key={l.href} href={l.href} className='text-sm text-gray-500 hover:text-gray-900 transition-colors font-semibold'>{l.label}</Link>)}
        </nav>
        <Link href='/#download' className='hidden md:flex px-5 py-2.5 rounded-xl btn-gradient text-white text-sm font-bold shadow-lg hover:shadow-xl transition-all'>Download Free</Link>
        <button className='md:hidden text-gray-600 hover:text-gray-900' onClick={() => setOpen(!open)}>
          <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>
      {open && (
        <div className='md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 px-6 py-6 flex flex-col gap-5'>
          {links.map(l => <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className='text-gray-700 hover:text-gray-900 text-base font-semibold'>{l.label}</Link>)}
          <Link href='/#download' onClick={() => setOpen(false)} className='mt-2 px-5 py-3 rounded-xl btn-gradient text-white text-sm font-bold text-center'>Download Free</Link>
        </div>
      )}
    </header>
  );
}