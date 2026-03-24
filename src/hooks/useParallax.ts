import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Adds a smooth parallax scroll effect to the given selector within a section ref.
 * @param sectionRef - ref of the section container
 * @param selector - CSS selector of elements to apply parallax to
 * @param speed - parallax speed factor (e.g. 0.3 = moves 30% relative to scroll)
 * @param direction - 'y' (default) or 'x'
 */
export function useParallax(
  sectionRef: React.RefObject<HTMLElement | null>,
  selector: string,
  speed = 0.3,
  direction: 'y' | 'x' = 'y'
) {
  useEffect(() => {
    if (!sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll(selector);
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        const distance = 120 * speed;
        gsap.fromTo(
          el,
          { [direction]: -distance / 2 },
          {
            [direction]: distance / 2,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef, selector, speed, direction]);
}
