import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: 'Макияж',
    image: './images/service-makeup.jpg',
    size: 'large',
  },
  {
    id: 2,
    title: 'Наращивание ресниц',
    image: './images/service-lashes.jpg',
    size: 'medium',
  },
  {
    id: 3,
    title: 'Косметология',
    image: './images/service-cosmetology.jpg',
    size: 'medium',
  },
  {
    id: 4,
    title: 'Парикмахерские услуги',
    image: './images/service-hair.jpg',
    size: 'large',
  },
  {
    id: 5,
    title: 'Маникюр',
    image: './images/service-nails.jpg',
    size: 'medium',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
          <div className="service-card group relative rounded-2xl overflow-hidden cursor-pointer sm:row-span-2">
            <div className="aspect-[3/4] sm:aspect-auto sm:h-full">
              <img
                src={services[0].image}
                alt={services[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <h3 className="font-display text-xl sm:text-2xl text-white mb-2">{services[0].title}</h3>
              <div className="h-0.5 w-0 bg-pink-500 group-hover:w-16 transition-all duration-500" />
            </div>
            <div className="absolute inset-0 border-2 border-pink-500/0 group-hover:border-pink-500/50 rounded-2xl transition-colors duration-500" />
          </div>

          <div className="service-card group relative rounded-2xl overflow-hidden cursor-pointer">
            <div className="aspect-[4/3]">
              <img
                src={services[1].image}
                alt={services[1].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <h3 className="font-display text-lg sm:text-xl text-white mb-2">{services[1].title}</h3>
              <div className="h-0.5 w-0 bg-pink-500 group-hover:w-16 transition-all duration-500" />
            </div>
            <div className="absolute inset-0 border-2 border-pink-500/0 group-hover:border-pink-500/50 rounded-2xl transition-colors duration-500" />
          </div>

          <div className="service-card group relative rounded-2xl overflow-hidden cursor-pointer">
            <div className="aspect-[4/3]">
              <img
                src={services[2].image}
                alt={services[2].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <h3 className="font-display text-lg sm:text-xl text-white mb-2">{services[2].title}</h3>
              <div className="h-0.5 w-0 bg-pink-500 group-hover:w-16 transition-all duration-500" />
            </div>
            <div className="absolute inset-0 border-2 border-pink-500/0 group-hover:border-pink-500/50 rounded-2xl transition-colors duration-500" />
          </div>

          {/* Second row */}
          <div className="service-card group relative rounded-2xl overflow-hidden cursor-pointer">
            <div className="aspect-[4/3]">
              <img
                src={services[3].image}
                alt={services[3].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <h3 className="font-display text-lg sm:text-xl text-white mb-2">{services[3].title}</h3>
              <div className="h-0.5 w-0 bg-pink-500 group-hover:w-16 transition-all duration-500" />
            </div>
            <div className="absolute inset-0 border-2 border-pink-500/0 group-hover:border-pink-500/50 rounded-2xl transition-colors duration-500" />
          </div>

          <div className="service-card group relative rounded-2xl overflow-hidden cursor-pointer">
            <div className="aspect-[4/3]">
              <img
                src={services[4].image}
                alt={services[4].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <h3 className="font-display text-lg sm:text-xl text-white mb-2">{services[4].title}</h3>
              <div className="h-0.5 w-0 bg-pink-500 group-hover:w-16 transition-all duration-500" />
            </div>
            <div className="absolute inset-0 border-2 border-pink-500/0 group-hover:border-pink-500/50 rounded-2xl transition-colors duration-500" />
          </div>

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
