import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Users, Award, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: Calendar,
    value: 10,
    suffix: '+',
    label: 'Лет на рынке',
    description: 'Опыт работы с 2014 года',
  },
  {
    icon: Users,
    value: 5000,
    suffix: '+',
    label: 'Довольных клиентов',
    description: 'Каждый клиент — наш друг',
  },
  {
    icon: Award,
    value: 15,
    suffix: '+',
    label: 'Профессионалов',
    description: 'Сертифицированные мастера',
  },
  {
    icon: Sparkles,
    value: 50,
    suffix: '+',
    label: 'Услуг',
    description: 'Полный спектр услуг',
  },
];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Counter animation
      countersRef.current.forEach((counter, index) => {
        if (counter) {
          const targetValue = stats[index].value;
          gsap.to(counter, {
            innerHTML: targetValue,
            duration: 2,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-20 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[300px] sm:h-[400px] bg-pink-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-pink-500/30 transition-all duration-500 hover:transform hover:-translate-y-2"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-pink-500/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-pink-500/20 transition-colors">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
                </div>

                <div className="flex items-baseline gap-1 mb-1.5 sm:mb-2">
                  <span
                    ref={(el) => { countersRef.current[index] = el; }}
                    className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
                  >
                    0
                  </span>
                  <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-pink-500">
                    {stat.suffix}
                  </span>
                </div>

                <h3 className="text-white font-medium mb-0.5 sm:mb-1 text-sm sm:text-base">{stat.label}</h3>
                <p className="text-gray-500 text-xs sm:text-sm hidden sm:block">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
