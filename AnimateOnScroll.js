'use client';
import { useEffect, useRef } from 'react';

export default function AnimateOnScroll({ children, animation='fadeUp', delay=0, className='' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = delay + 'ms';
          el.classList.add('aos-animate');
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`aos-init aos-${animation} ${className}`}>
      {children}
    </div>
  );
}
