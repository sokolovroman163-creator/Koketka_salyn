import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Send, MapPin, Phone } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const services = [
  'Макияж',
  'Наращивание ресниц',
  'Косметология',
  'Парикмахерские услуги',
  'Маникюр',
  'Другое',
];

export default function Booking() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.booking-content',
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
        '.booking-image',
        { opacity: 0, x: 50 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      message: '',
    });
  };

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-32 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-pink-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-stretch">
          {/* Left - Form */}
          <div className="booking-content">
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-28 sm:w-40 h-28 sm:h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl text-white mb-3 sm:mb-4">
                  Запишитесь сейчас и получите скидку 20% на первое посещение
                </h3>
                <p className="text-white/70 text-xs sm:text-sm mb-6 sm:mb-8">
                  Оставьте свои данные и мы перезвоним вам
                </p>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <Input
                      placeholder="Имя"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-11 sm:h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl focus:border-white/40 focus:ring-0 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <Input
                      type="tel"
                      placeholder="Телефон"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="h-11 sm:h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl focus:border-white/40 focus:ring-0 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <Input
                      type="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-11 sm:h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl focus:border-white/40 focus:ring-0 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => setFormData({ ...formData, service: value })}
                    >
                      <SelectTrigger className="h-11 sm:h-12 bg-white/10 border-white/20 text-white rounded-xl focus:border-white/40 focus:ring-0 [&>span]:text-white/50 text-sm sm:text-base">
                        <SelectValue placeholder="Услуга" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-white/10">
                        {services.map((service) => (
                          <SelectItem
                            key={service}
                            value={service}
                            className="text-white hover:bg-pink-500/20 focus:bg-pink-500/20"
                          >
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <textarea
                      placeholder="Дата и время"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full h-20 sm:h-24 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-xl focus:border-white/40 focus:outline-none resize-none text-sm sm:text-base"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 sm:h-12 bg-white text-pink-600 hover:bg-white/90 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] text-sm sm:text-base"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Отправить
                  </Button>

                  <p className="text-white/50 text-[10px] sm:text-xs text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              </div>
            </div>

            {/* Contact info */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-[#151515] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium mb-1 text-sm sm:text-base">Адрес</p>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      ул. Ленина, 125<br />
                      Тольятти, 1 этаж
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#151515] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/5">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium mb-1 text-sm sm:text-base">Телефоны</p>
                    <a href="tel:+79920674610" className="text-gray-400 text-xs sm:text-sm hover:text-pink-400 transition-colors block">
                      +7 (992) 067-46-10
                    </a>
                    <a href="tel:+79674929762" className="text-gray-400 text-xs sm:text-sm hover:text-pink-400 transition-colors block">
                      +7 (967) 492-97-62
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Image */}
          <div className="booking-image relative rounded-2xl sm:rounded-3xl overflow-hidden">
            <img
              src="./images/booking-brushes.jpg"
              alt="Кисточки для макияжа"
              className="w-full h-full object-cover min-h-[300px] sm:min-h-[400px] lg:min-h-0"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Decorative elements */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <div className="bg-black/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                <p className="text-white font-display text-lg sm:text-xl">Салон красоты «Кокетка»</p>
                <p className="text-white/60 text-xs sm:text-sm">Профессиональный уход за вашей красотой</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-[90vw] sm:max-w-md p-6 sm:p-8 text-center bg-[#1a1a1a] border-white/10">
          <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-pink-500/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <CheckCircle className="w-7 sm:w-8 h-7 sm:h-8 text-pink-500" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-medium text-white mb-2">
            Заявка отправлена!
          </h3>
          <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
            Спасибо за запись! Мы свяжемся с вами в ближайшее время.
          </p>
          <Button
            onClick={() => setShowSuccess(false)}
            className="bg-gradient-pink hover:opacity-90 text-white rounded-full px-6 sm:px-8"
          >
            Отлично
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
