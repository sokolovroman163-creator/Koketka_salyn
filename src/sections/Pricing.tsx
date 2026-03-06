import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Scissors, Sparkles, Hand, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 'hair', label: 'Волосы', icon: Scissors },
  { id: 'nails', label: 'Ногти', icon: Hand },
  { id: 'face', label: 'Лицо', icon: Sparkles },
  { id: 'body', label: 'Тело', icon: Heart },
];

const services = {
  hair: [
    { name: 'Женская стрижка', price: 'от 800 ₽', time: '60 мин' },
    { name: 'Мужская стрижка', price: 'от 600 ₽', time: '45 мин' },
    { name: 'Укладка', price: 'от 700 ₽', time: '40 мин' },
    { name: 'Окрашивание', price: 'от 2500 ₽', time: '120 мин' },
    { name: 'Мелирование', price: 'от 3000 ₽', time: '150 мин' },
    { name: 'Ботокс для волос', price: 'от 2000 ₽', time: '90 мин' },
  ],
  nails: [
    { name: 'Маникюр классический', price: 'от 700 ₽', time: '60 мин' },
    { name: 'Маникюр с покрытием', price: 'от 1200 ₽', time: '90 мин' },
    { name: 'Наращивание ногтей', price: 'от 2000 ₽', time: '120 мин' },
    { name: 'Коррекция ногтей', price: 'от 1500 ₽', time: '90 мин' },
    { name: 'Педикюр', price: 'от 1500 ₽', time: '90 мин' },
    { name: 'Дизайн ногтей', price: 'от 100 ₽', time: '15 мин' },
  ],
  face: [
    { name: 'Макияж дневной', price: 'от 1500 ₽', time: '60 мин' },
    { name: 'Макияж вечерний', price: 'от 2500 ₽', time: '90 мин' },
    { name: 'Наращивание ресниц', price: 'от 1800 ₽', time: '120 мин' },
    { name: 'Коррекция бровей', price: 'от 500 ₽', time: '30 мин' },
    { name: 'Окрашивание бровей', price: 'от 400 ₽', time: '20 мин' },
    { name: 'Чистка лица', price: 'от 2000 ₽', time: '90 мин' },
  ],
  body: [
    { name: 'Массаж спины', price: 'от 1200 ₽', time: '45 мин' },
    { name: 'Массаж всего тела', price: 'от 2500 ₽', time: '90 мин' },
    { name: 'Обёртывание', price: 'от 1800 ₽', time: '60 мин' },
    { name: 'Скрабирование', price: 'от 1500 ₽', time: '45 мин' },
    { name: 'SPA-уход', price: 'от 3500 ₽', time: '120 мин' },
    { name: 'Антицеллюлитный массаж', price: 'от 2000 ₽', time: '60 мин' },
  ],
};

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('hair');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pricing-title',
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
        '.pricing-content',
        { opacity: 0, y: 50 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-32 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-pink-500/5 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="pricing-title inline-block text-pink-500 text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4">
            Прайс-лист
          </span>
          <h2 className="pricing-title font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-3 sm:mb-4">
            Цены на <span className="text-gradient">услуги</span>
          </h2>
          <p className="pricing-title text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Прозрачное ценообразование без скрытых платежей
          </p>
        </div>

        {/* Category tabs */}
        <div className="pricing-content flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${activeCategory === category.id
                  ? 'bg-gradient-pink text-white shadow-pink'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
            >
              <category.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {category.label}
            </button>
          ))}
        </div>

        {/* Services list */}
        <div className="pricing-content bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10">
          <div className="space-y-2 sm:space-y-4">
            {services[activeCategory as keyof typeof services].map((service, index) => (
              <div
                key={index}
                className="group flex items-center justify-between p-3 sm:p-4 rounded-xl hover:bg-white/5 transition-colors duration-300 gap-3"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-pink-500/10 flex items-center justify-center group-hover:bg-pink-500/20 transition-colors flex-shrink-0">
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-white font-medium text-sm sm:text-base truncate">{service.name}</h4>
                    <span className="text-gray-500 text-xs sm:text-sm">{service.time}</span>
                  </div>
                </div>
                <span className="text-pink-400 font-display text-base sm:text-xl font-semibold whitespace-nowrap flex-shrink-0">
                  {service.price}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
              Хотите узнать точную стоимость? Свяжитесь с нами!
            </p>
            <Button
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-pink hover:opacity-90 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-full transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            >
              Записаться
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
