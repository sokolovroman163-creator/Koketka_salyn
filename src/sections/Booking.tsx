import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Booking() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.booking-card',
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.booking-element',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="py-20 sm:py-32 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
      >
        <source src="./booking-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#0a0a0a]/80 z-0 pointer-events-none" />

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-pink-500/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.02] bg-grid-pattern" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="booking-card bg-gradient-to-b from-[#151515] to-[#0a0a0a] border border-white/10 rounded-3xl sm:rounded-[40px] p-8 sm:p-16 lg:p-20 relative overflow-hidden shadow-2xl">
          {/* Decorative glowing orbits */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] border border-pink-500/20 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] border border-purple-500/20 rounded-full -translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10 flex flex-col items-center">
            <span className="booking-element inline-block text-pink-500 text-xs sm:text-sm font-medium tracking-wider uppercase mb-4">
              Ждем вас
            </span>

            <h2 className="booking-element font-display text-4xl sm:text-5xl lg:text-7xl font-medium text-white mb-6 leading-tight">
              Готовы к <br className="hidden sm:block" />
              <span className="text-gradient">преображению?</span>
            </h2>

            <p className="booking-element text-gray-400 text-base sm:text-lg mb-12 max-w-xl mx-auto">
              Нажмите кнопку ниже, чтобы выбрать удобное время и любимого мастера онлайн. Быстро и без звонков.
            </p>

            <div className="booking-element mb-16 relative group inline-block">
              {/* Button glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500"></div>

              <a
                href="https://mst.link/minina"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block"
              >
                <Button
                  size="lg"
                  className="bg-gradient-pink hover:opacity-90 text-white px-8 sm:px-12 py-6 sm:py-8 text-lg sm:text-xl rounded-full shadow-lg transition-transform duration-300 hover:scale-105 min-w-[280px] sm:min-w-[320px] flex items-center justify-center gap-3"
                >
                  Записаться онлайн
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                </Button>
              </a>
            </div>

            {/* Contact Info Grid */}
            <div className="booking-element grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/5 flex items-start text-left gap-4 hover:bg-white/10 transition-colors">
                <div className="bg-pink-500/10 p-3 rounded-full flex-shrink-0">
                  <MapPin className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Наш адрес</p>
                  <p className="text-gray-400 text-sm">
                    ул. Ленина, 125<br />
                    Тольятти, 1 этаж
                  </p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/5 flex items-start text-left gap-4 hover:bg-white/10 transition-colors">
                <div className="bg-pink-500/10 p-3 rounded-full flex-shrink-0">
                  <Phone className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Свяжитесь с нами</p>
                  <a href="tel:+79920674610" className="text-gray-400 text-sm hover:text-pink-400 transition-colors block mb-1">
                    +7 (992) 067-46-10
                  </a>
                  <a href="tel:+79674929762" className="text-gray-400 text-sm hover:text-pink-400 transition-colors block">
                    +7 (967) 492-97-62
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
