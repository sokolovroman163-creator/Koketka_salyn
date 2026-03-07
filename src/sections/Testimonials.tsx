import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Марина С.',
    text: 'Обожаю скорость работы! За пару часов сделала и маникюр, и реснички. Качество — супер! Идеально для тех, кто ценит свое время.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Екатерина М.',
    text: 'В студии очень уютно, огромное разнообразие цветов и оттенков. Мастер постоянно пополняет ассортимент новинками. Все стерильно, это для меня главное.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Александра К.',
    text: 'Удобство «Всё в одном»! Сделала маникюр, педикюр, реснички и брови в одном месте. Приятная атмосфера, легкое общение и любимые сериалы во время процедур.',
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-title',
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
        '.testimonial-card',
        { opacity: 0, y: 50 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-32 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute bottom-0 left-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-pink-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="testimonials-title font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-4">
            Отзывы наших <span className="text-gradient">клиентов</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">Более 1000 довольных клиентов в Тольятти</p>
        </div>

        {/* Testimonials carousel */}
        <div className="relative max-w-4xl mx-auto px-6 sm:px-12">
          <div className="overflow-hidden">
            <div
              className={`flex transition-transform duration-500 ease-out translate-slide-${currentIndex}`}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-0 sm:px-4"
                >
                  <div className="testimonial-card bg-[#151515] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/5 relative">
                    {/* Quote icon */}
                    <div className="absolute -top-5 sm:-top-6 left-6 sm:left-8 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-pink flex items-center justify-center shadow-pink">
                      <Quote className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4 sm:mb-6 mt-3 sm:mt-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 fill-pink-500 text-pink-500" />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 italic">
                      "{testimonial.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-pink flex items-center justify-center text-white font-medium text-sm sm:text-base">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-medium text-white text-sm sm:text-base">{testimonial.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-500">Постоянный клиент</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-9 sm:w-12 h-9 sm:h-12 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center hover:bg-pink-500/20 hover:border-pink-500/50 transition-all z-10"
            aria-label="Предыдущий отзыв"
          >
            <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-9 sm:w-12 h-9 sm:h-12 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center hover:bg-pink-500/20 hover:border-pink-500/50 transition-all z-10"
            aria-label="Следующий отзыв"
          >
            <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Отзыв ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                  ? 'w-8 bg-gradient-pink'
                  : 'w-2.5 bg-white/20 hover:bg-white/40'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
