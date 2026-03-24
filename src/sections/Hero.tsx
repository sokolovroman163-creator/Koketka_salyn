import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { Award, Zap, DollarSign, Clock, Star, Users } from 'lucide-react';
import { useParallax } from '@/hooks/useParallax';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Parallax on background blobs
  useParallax(heroRef, '.hero-blob-1', 0.4, 'y');
  useParallax(heroRef, '.hero-blob-2', 0.25, 'y');
  useParallax(heroRef, '.hero-image', 0.15, 'y');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content
      gsap.fromTo(
        '.hero-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 }
      );
      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
      );
      gsap.fromTo(
        '.hero-features',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 }
      );
      gsap.fromTo(
        '.hero-stats',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1 }
      );

      // Animate images with stagger
      gsap.fromTo(
        '.hero-image',
        { opacity: 0, scale: 0.8, rotateY: -15 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          delay: 0.3,
        }
      );

      // Floating animation for images
      gsap.to('.hero-image', {
        y: -10,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.3,
          from: 'random',
        },
      });

      // Particles animation
      const particles = particlesRef.current?.querySelectorAll('.particle');
      particles?.forEach((particle) => {
        gsap.to(particle, {
          y: -100 - Math.random() * 200,
          x: (Math.random() - 0.5) * 100,
          opacity: 0,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          delay: Math.random() * 3,
          ease: 'none',
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    { icon: Award, text: 'Квалифицированные мастера' },
    { icon: Zap, text: 'Быстрая работа' },
    { icon: DollarSign, text: 'Доступные цены' },
  ];

  const stats = [
    { value: '10+', label: 'Лет опыта', icon: Clock },
    { value: '5000+', label: 'Довольных клиентов', icon: Users },
    { value: '4.9', label: 'Рейтинг', icon: Star },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center bg-[#0a0a0a] overflow-hidden pt-20"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
      >
        <source src="./hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#0a0a0a]/70 z-0 pointer-events-none" />

      {/* Animated particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`particle absolute w-1 h-1 bg-pink-500/40 rounded-full particle-pos-${i}`}
          />
        ))}
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-blob-1 absolute top-1/4 right-1/4 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] bg-pink-500/10 rounded-full blur-[200px]" />
        <div className="hero-blob-2 absolute bottom-1/4 left-1/4 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] bg-purple-500/[0.08] rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-grid-pattern" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className="hero-title mb-6">
              <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs sm:text-sm">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                Топовый салон красоты в Тольятти
              </span>
            </div>

            {/* Logo text */}
            <div className="hero-title mb-4">
              <span className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-9xl text-white/5 font-medium select-none">
                Кокетка
              </span>
            </div>

            <h1 className="hero-title font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-6">
              Изменяй стиль с нашим
              <br />
              салоном красоты{' '}
              <span className="text-gradient">Кокетка</span>
            </h1>

            <p className="hero-subtitle text-gray-400 text-base sm:text-lg mb-8 max-w-lg">
              Стань лучше, преобрази себя, а наши профессиональные мастера помогут тебе в этом.
              Мы создаём образы, которые восхищают.
            </p>

            <div className="hero-cta flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
              <Button
                size="lg"
                onClick={scrollToBooking}
                className="bg-gradient-pink hover:opacity-90 text-white px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base rounded-full shadow-pink transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]"
              >
                Записаться онлайн
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-white/20 text-white hover:bg-white/10 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base rounded-full transition-all duration-300"
              >
                Наши услуги
              </Button>
            </div>

            {/* Features */}
            <div className="hero-features flex flex-wrap gap-2 sm:gap-4 mb-8 sm:mb-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10"
                >
                  <feature.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-gray-300 whitespace-nowrap">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="hero-stats flex gap-6 sm:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1">
                    <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500" />
                    <span className="font-display text-xl sm:text-2xl font-bold text-white">{stat.value}</span>
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-500">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image collage */}
          <div className="order-1 lg:order-2 relative h-[350px] sm:h-[450px] lg:h-[600px]">
            {/* Glow behind images */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[350px] lg:w-[400px] h-[250px] sm:h-[350px] lg:h-[400px] bg-pink-500/20 rounded-full blur-[100px]" />

            {/* Main large image */}
            <div className="hero-image absolute top-0 right-0 sm:right-[5%] w-[55%] sm:w-[52%] lg:w-[300px] h-[55%] sm:h-[60%] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 border border-white/10">
              <img
                src="./images/hero-1.jpg"
                alt="Красота — макияж"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-pink-500 text-white text-[10px] sm:text-xs font-medium">
                Макияж
              </div>
            </div>

            {/* Second image */}
            <div className="hero-image absolute top-[15%] sm:top-[10%] left-0 sm:left-[3%] w-[45%] sm:w-[42%] lg:w-[240px] h-[48%] sm:h-[55%] lg:h-[320px] rounded-2xl overflow-hidden shadow-2xl transform -rotate-6 hover:rotate-0 transition-all duration-500 border border-white/10">
              <img
                src="./images/hero-2.jpg"
                alt="Красота — укладка"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-pink-500 text-white text-[10px] sm:text-xs font-medium">
                Укладка
              </div>
            </div>

            {/* Third image */}
            <div className="hero-image absolute bottom-0 right-[10%] sm:right-[15%] w-[42%] sm:w-[40%] lg:w-[220px] h-[42%] sm:h-[48%] lg:h-[280px] rounded-2xl overflow-hidden shadow-2xl transform rotate-6 hover:rotate-0 transition-all duration-500 border border-white/10">
              <img
                src="./images/hero-3.jpg"
                alt="Красота — стиль"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-pink-500 text-white text-[10px] sm:text-xs font-medium">
                Стиль
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 w-20 sm:w-32 h-20 sm:h-32 border-2 border-pink-500/30 rounded-full animate-pulse hidden sm:block" />
            <div className="absolute top-1/3 -right-4 sm:-right-8 w-16 sm:w-20 h-16 sm:h-20 bg-pink-500/20 rounded-full blur-xl" />
            <div className="absolute top-0 left-1/3 w-3 sm:w-4 h-3 sm:h-4 bg-pink-500 rounded-full animate-ping" />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}
