import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Logo fade in
      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      );

      // Progress bar fill
      tl.to(
        lineRef.current,
        {
          width: '100%',
          duration: 1.4,
          ease: 'power2.inOut',
          onUpdate() {
            const pct = Math.round(this.progress() * 100);
            setProgress(pct);
          },
        },
        '-=0.3'
      );

      // Exit animation
      tl.to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
          delay: 0.2,
          onComplete,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0a0a0a]"
    >
      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Logo */}
      <div ref={logoRef} className="relative z-10 text-center opacity-0">
        {/* Decorative ring */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 rounded-full border border-pink-500/20 scale-[1.6] animate-pulse" />
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
            <span className="font-display text-3xl text-white">К</span>
          </div>
        </div>

        {/* Name */}
        <h1 className="font-display text-4xl sm:text-5xl font-medium text-white tracking-wide mb-2">
          Ко<span className="text-gradient">кет</span>ка
        </h1>
        <p className="text-gray-500 text-sm tracking-widest uppercase mb-12">
          Салон красоты
        </p>

        {/* Progress bar container */}
        <div className="w-48 sm:w-64 mx-auto">
          <div className="h-[1px] bg-white/5 rounded-full overflow-hidden">
            <div
              ref={lineRef}
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
              style={{ width: '0%' }}
            />
          </div>
          <p className="text-gray-600 text-xs mt-3 tabular-nums">{progress}%</p>
        </div>
      </div>
    </div>
  );
}
