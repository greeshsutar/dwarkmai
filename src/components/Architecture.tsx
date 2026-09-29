import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArchitecturalFrame from './ArchitecturalFrame';
import elevationImg from '../assets/images/image copy.png';
import './Architecture.css';

gsap.registerPlugin(ScrollTrigger);

export default function Architecture() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // ── SECTION ENTRANCE & TEXT WAVE TIMELINE ─────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Section tag & rule
      tl.fromTo(
        '.architecture__label',
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      )
      // Title lines wave reveal
      .fromTo(
        '.architecture__title-line-1',
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '<0.1'
      )
      .fromTo(
        '.architecture__title-line-2',
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '<0.15'
      )
      // Description items sequential entrance
      .fromTo(
        '.architecture__desc-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        },
        '-=0.4'
      );

      // ── ULTRA-SMOOTH & SLOW TOP-TO-BOTTOM IMAGE REVEAL ─────────
      if (imageWrapRef.current) {
        gsap.fromTo(
          imageWrapRef.current,
          {
            clipPath: 'inset(0% 0% 100% 0%)',
            webkitClipPath: 'inset(0% 0% 100% 0%)',
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            webkitClipPath: 'inset(0% 0% 0% 0%)',
            ease: 'power1.inOut',
            scrollTrigger: {
              trigger: imageWrapRef.current,
              start: 'top 85%',
              end: 'bottom 40%',
              scrub: 1.6, // Slow and ultra-smooth scroll-driven progression
            },
          }
        );
      }

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.07 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: imageWrapRef.current,
              start: 'top 85%',
              end: 'bottom 40%',
              scrub: 1.6,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="architecture section--large" id="architecture" ref={sectionRef} aria-label="Section 06 — Architecture">
      <div className="container">
        {/* ── SECTION HEADER ────────────────────────────────────── */}
        <div className="architecture__header">
          <div className="architecture__label">
            <span className="arch-number">06</span>
            <div className="arch-divider architecture__divider" />
            <span className="arch-label">ARCHITECTURE</span>
          </div>

          <h2 className="architecture__title text-display" ref={titleRef}>
            <span className="architecture__title-line architecture__title-line-1">
              DESIGNED WITH
            </span>
            <span className="architecture__title-line architecture__title-line-2">
              INTENTION.
            </span>
          </h2>
        </div>

        {/* ── VISUAL PRESENTATION WITH SMOOTH TOP-TO-BOTTOM REVEAL ── */}
        <div className="architecture__visual">
          <ArchitecturalFrame
            showCoordinates
            coordinateLabel="DWK—06 · FACADE DETAIL · 15°53′N, 73°49′E"
          >
            <div className="architecture__image-area" ref={imageWrapRef}>
              <img
                ref={imageRef}
                src={elevationImg}
                alt="Dwarkamai front elevation — modern facade with spacious balconies, stilt parking, and landscaped surroundings"
                className="architecture__image"
                loading="lazy"
              />
            </div>
          </ArchitecturalFrame>
        </div>

        {/* ── ARCHITECTURAL DESCRIPTION GRID ────────────────────── */}
        <div className="architecture__description">
          <div className="architecture__desc-grid">
            <div className="architecture__desc-item">
              <span className="arch-label">FACADE</span>
              <p className="text-body">
                Clean geometric lines define the facade, with a careful rhythm of windows and
                balconies that reflect the internal layout and bring natural ventilation to every unit.
              </p>
            </div>
            <div className="architecture__desc-item">
              <span className="arch-label">PROPORTION</span>
              <p className="text-body">
                Each building is proportioned to maximize daylight while maintaining a comfortable
                human scale — avoiding the monolithic character common in residential developments.
              </p>
            </div>
            <div className="architecture__desc-item">
              <span className="arch-label">MATERIAL</span>
              <p className="text-body">
                External finishes are selected for longevity and minimal maintenance, with a muted
                palette that allows the architecture to recede into its landscape setting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
