import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text animation
      gsap.fromTo(
        '.about-title',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.about-text',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      // Image animation with clip-path
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power3.inOut',
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
      id="about"
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-32 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-pink-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Content */}
          <div>
            <h2 className="about-title font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-6 sm:mb-8">
              О <span className="text-gradient">нас</span>
            </h2>

            <div className="space-y-4 sm:space-y-6">
              <p className="about-text text-gray-400 leading-relaxed text-sm sm:text-base">
                Салон красоты «Кокетка» — это место, где рождается красота. Наши мастера —
                высококвалифицированные специалисты своих областей, которые постоянно совершенствуют
                свои навыки и следят за новейшими трендами в индустрии красоты.
              </p>

              <p className="about-text text-gray-400 leading-relaxed text-sm sm:text-base">
                Мы изменим ваш стиль, вы будете получать множество комплиментов и восхищённых взглядов.
                Мы научим вас подчёркивать свою естественную красоту и повысим вашу самооценку.
                Доверьте свой образ профессионалам!
              </p>

              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="about-text inline-flex items-center gap-2 text-pink-500 hover:text-pink-400 transition-colors group mt-2 sm:mt-4"
              >
                <span className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center group-hover:bg-pink-500/20 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
                Смотреть услуги
              </button>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative">
            <div
              ref={imageRef}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="./images/salon-interior.jpg"
                alt="Интерьер салона красоты Кокетка"
                className="w-full h-[280px] sm:h-[350px] lg:h-[400px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Decorative frame — hidden on small screens to prevent overflow */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-pink-500/20 rounded-2xl -z-10 hidden sm:block" />

            {/* Glow effect */}
            <div className="absolute -bottom-8 right-1/4 w-24 sm:w-32 h-24 sm:h-32 bg-pink-500/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
