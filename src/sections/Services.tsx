import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { fetchServices } from '@/lib/api';

gsap.registerPlugin(ScrollTrigger);

const fallbackServices = [
  { id: 1, title: 'Макияж', image: './images/service-makeup.jpg' },
  { id: 2, title: 'Наращивание ресниц', image: './images/service-lashes.jpg' },
  { id: 3, title: 'Косметология', image: './images/service-cosmetology.jpg' },
  { id: 4, title: 'Парикмахерские услуги', image: './images/service-hair.jpg' },
  { id: 5, title: 'Маникюр', image: './images/service-nails.jpg' },
];

function resolveImage(src: string) {
  if (!src) return '';
  if (src.startsWith('http')) return src;
  if (src.startsWith('/uploads')) {
    const base = import.meta.env.DEV ? 'http://localhost:3001' : '';
    return `${base}${src}`;
  }
  // For paths like /images/xxx or ./images/xxx — keep as-is for public folder
  return src.startsWith('/') ? `.${src}` : src;
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    fetchServices()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.services-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Build card render function to avoid repetition
  const renderCard = (service: typeof services[0], aspectClass: string, isRowSpan?: boolean) => (
    <div className={`service-card group relative rounded-2xl overflow-hidden cursor-pointer ${isRowSpan ? 'sm:row-span-2' : ''}`}>
      <div className={aspectClass}>
        <img
          src={resolveImage(service.image)}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        <h3 className={`font-display ${isRowSpan ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'} text-white mb-2`}>{service.title}</h3>
        <div className="h-0.5 w-0 bg-pink-500 group-hover:w-16 transition-all duration-500" />
      </div>
      <div className="absolute inset-0 border-2 border-pink-500/0 group-hover:border-pink-500/50 rounded-2xl transition-colors duration-500" />
    </div>
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-32 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-pink-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <h2 className="services-title font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-8 sm:mb-12">
          Наши <span className="text-gradient">услуги</span>
        </h2>

        {/* Services grid - masonry style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* First column — tall card */}
          {services[0] && renderCard(services[0], 'aspect-[3/4] sm:aspect-auto sm:h-full', true)}
          {services[1] && renderCard(services[1], 'aspect-[4/3]')}
          {services[2] && renderCard(services[2], 'aspect-[4/3]')}
          {services[3] && renderCard(services[3], 'aspect-[4/3]')}
          {services[4] && renderCard(services[4], 'aspect-[4/3]')}

          {/* CTA card */}
          <div
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="service-card group relative rounded-2xl overflow-hidden cursor-pointer bg-gradient-pink"
          >
            <div className="aspect-[4/3] flex flex-col items-center justify-center p-6">
              <h3 className="font-display text-xl sm:text-2xl text-white mb-4 text-center">Узнать цены</h3>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <ArrowRight className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
          </div>
        </div>
      </div>
    </section>
  );
}
