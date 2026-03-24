import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { fetchGallery } from '@/lib/api';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  category: string;
  is_active: boolean;
}

function resolveImage(src: string) {
  if (!src) return '';
  if (src.startsWith('http')) return src;
  if (src.startsWith('/uploads')) {
    const base = import.meta.env.DEV ? 'http://localhost:3001' : '';
    return `${base}${src}`;
  }
  return src.startsWith('/') ? `.${src}` : src;
}

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchGallery()
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gallery-title',
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
        '.gallery-item',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [items]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev !== null && prev < items.length - 1 ? prev + 1 : prev));
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, items.length]);

  // If no gallery items, don't render the section
  if (items.length === 0) return null;

  return (
    <>
      <section
        id="gallery"
        ref={sectionRef}
        className="py-16 sm:py-24 lg:py-32 bg-[#0a0a0a] relative overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] bg-pink-500/5 rounded-full blur-[200px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section header */}
          <div className="text-center mb-10 sm:mb-16">
            <span className="gallery-title inline-flex items-center gap-2 text-pink-500 text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4">
              <Camera className="w-4 h-4" />
              Наши работы
            </span>
            <h2 className="gallery-title font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-3 sm:mb-4">
              Галерея <span className="text-gradient">работ</span>
            </h2>
            <p className="gallery-title text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Результаты работы наших мастеров — каждый образ уникален
            </p>
          </div>

          {/* Gallery grid */}
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="gallery-item group relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer break-inside-avoid"
                onClick={() => setLightboxIndex(index)}
              >
                <img
                  src={resolveImage(item.image)}
                  alt={item.title || 'Работа мастера'}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Info on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  {item.title && (
                    <h3 className="font-display text-sm sm:text-base text-white mb-0.5">{item.title}</h3>
                  )}
                  {item.category && (
                    <span className="text-pink-400 text-[10px] sm:text-xs">{item.category}</span>
                  )}
                </div>
                {/* Border on hover */}
                <div className="absolute inset-0 border-2 border-pink-500/0 group-hover:border-pink-500/40 rounded-xl sm:rounded-2xl transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && items[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>

          {/* Previous */}
          {lightboxIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex - 1);
              }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              aria-label="Предыдущее фото"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          )}

          {/* Next */}
          {lightboxIndex < items.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex + 1);
              }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              aria-label="Следующее фото"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          )}

          {/* Image */}
          <div
            className="max-w-[90vw] max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={resolveImage(items[lightboxIndex].image)}
              alt={items[lightboxIndex].title || 'Работа мастера'}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            {/* Caption */}
            {(items[lightboxIndex].title || items[lightboxIndex].category) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 rounded-b-lg">
                {items[lightboxIndex].title && (
                  <h3 className="font-display text-lg sm:text-xl text-white">{items[lightboxIndex].title}</h3>
                )}
                {items[lightboxIndex].category && (
                  <span className="text-pink-400 text-xs sm:text-sm">{items[lightboxIndex].category}</span>
                )}
              </div>
            )}
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-gray-400 text-xs sm:text-sm">
            {lightboxIndex + 1} / {items.length}
          </div>
        </div>
      )}
    </>
  );
}
