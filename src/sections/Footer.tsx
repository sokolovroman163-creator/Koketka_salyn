import { Instagram, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Макияж', href: '#services' },
    { label: 'Наращивание ресниц', href: '#services' },
    { label: 'Косметология', href: '#services' },
    { label: 'Парикмахерские услуги', href: '#services' },
    { label: 'Маникюр', href: '#services' },
  ],
  company: [
    { label: 'О нас', href: '#about' },
    { label: 'Цены', href: '#pricing' },
    { label: 'Отзывы', href: '#testimonials' },
    { label: 'Запись', href: '#booking' },
  ],
};

export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-pink-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main footer content */}
        <div className="py-10 sm:py-16 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <div className="mb-4 sm:mb-6">
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-white">
                Ко<span className="text-pink-500">кет</span>ка
              </h3>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              Салон красоты в Тольятти. Мы помогаем вам раскрыть естественную красоту
              и чувствовать себя уверенно каждый день.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-white/5 hover:bg-pink-500/20 flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
                rel="noopener noreferrer"
              >
                <Instagram className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 hover:text-pink-500" />
              </a>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4 className="font-display text-base sm:text-lg font-medium text-white mb-4 sm:mb-6">Услуги</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-500 hover:text-pink-500 text-xs sm:text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="font-display text-base sm:text-lg font-medium text-white mb-4 sm:mb-6">О салоне</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-500 hover:text-pink-500 text-xs sm:text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-display text-base sm:text-lg font-medium text-white mb-4 sm:mb-6">Контакты</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-500 text-xs sm:text-sm">
                  ул. Ленина, 125<br />
                  Тольятти, 1 этаж
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-pink-500 flex-shrink-0" />
                <div>
                  <a
                    href="tel:+79920674610"
                    className="text-gray-500 hover:text-pink-500 text-xs sm:text-sm transition-colors block"
                  >
                    +7 (992) 067-46-10
                  </a>
                  <a
                    href="tel:+79674929762"
                    className="text-gray-500 hover:text-pink-500 text-xs sm:text-sm transition-colors block"
                  >
                    +7 (967) 492-97-62
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-4 sm:py-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">
            © {currentYear} Салон красоты «Кокетка». Все права защищены.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-pink-500 text-xs sm:text-sm transition-colors">
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
