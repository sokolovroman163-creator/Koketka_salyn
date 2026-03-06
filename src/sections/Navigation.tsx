import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'О нас', href: '#about' },
  { label: 'Услуги', href: '#services' },
  { label: 'Цены', href: '#pricing' },
  { label: 'Отзывы', href: '#testimonials' },
  { label: 'Контакты', href: '#booking' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-[#121212]/95 backdrop-blur-lg py-3'
            : 'bg-transparent py-4 sm:py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center"
              aria-label="На главную"
            >
              <span className="font-display text-xl sm:text-2xl font-medium text-white">
                Ко<span className="text-pink-500">кет</span>ка
              </span>
            </button>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-gray-300 hover:text-pink-400 transition-colors duration-300"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="hidden lg:flex items-center gap-6">
              <a
                href="tel:+79920674610"
                className="flex items-center gap-2 text-sm text-pink-400 hover:text-pink-300 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +7 (992) 067-46-10
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
              aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-[#1a1a1a] transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="p-6 pt-24">
            <div className="space-y-2">
              {navLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="w-full text-left px-4 py-3 rounded-xl text-gray-300 hover:bg-pink-500/10 hover:text-pink-400 transition-colors font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <a
                href="tel:+79920674610"
                className="flex items-center gap-3 px-4 py-3 text-pink-400"
              >
                <Phone className="w-5 h-5" />
                +7 (992) 067-46-10
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
