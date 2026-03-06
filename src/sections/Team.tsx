import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: 'Анна',
    role: 'Стилист-парикмахер',
    experience: '8 лет опыта',
    image: './images/master-1.jpg',
    specialty: 'Окрашивание, стрижки',
  },
  {
    name: 'Мария',
    role: 'Визажист',
    experience: '6 лет опыта',
    image: './images/master-2.jpg',
    specialty: 'Макияж, брови',
  },
  {
    name: 'Елена',
    role: 'Косметолог',
    experience: '10 лет опыта',
    image: './images/master-3.jpg',
    specialty: 'Уход за кожей',
  },
  {
    name: 'Ольга',
    role: 'Мастер маникюра',
    experience: '7 лет опыта',
    image: './images/master-4.jpg',
    specialty: 'Маникюр, педикюр',
  },
];

export default function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.team-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.team-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-32 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-pink-500/5 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-16">
          <span className="team-title inline-block text-pink-500 text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4">
            Наша команда
          </span>
          <h2 className="team-title font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-3 sm:mb-4">
            Профессиональные <span className="text-gradient">мастера</span>
          </h2>
          <p className="team-title text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Наши специалисты — настоящие профессионалы своего дела с многолетним опытом
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="team-card group relative"
            >
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-pink-500/30 transition-all duration-500">
                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={member.image}
                    alt={`${member.name} — ${member.role}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 text-pink-500 flex-shrink-0" />
                    <span className="text-pink-400 text-[10px] sm:text-xs">{member.experience}</span>
                  </div>
                  <h3 className="font-display text-base sm:text-xl text-white mb-0.5 sm:mb-1">{member.name}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">{member.role}</p>
                  <p className="text-gray-500 text-[10px] sm:text-xs hidden sm:block">{member.specialty}</p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Social link */}
                <a
                  href="#"
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-pink-500"
                  aria-label={`Instagram ${member.name}`}
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
