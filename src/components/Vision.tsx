import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedNumber from './AnimatedNumber';
import visionImg from '../assets/images/image1 copy.png';
import './Vision.css';

gsap.registerPlugin(ScrollTrigger);

const VISION_FACTS = [
  { value: '01.13', unit: 'ACRES', desc: 'Total Land Parcel' },
  { value: '04', unit: 'BUILDINGS', desc: 'Thoughtfully Planned' },
  { value: '01 & 02', unit: 'BHK', desc: 'Well Designed Homes' },
  { value: '467 – 823', unit: 'SQ.FT.', desc: 'Carpet Area (Approx.)' },
  { value: 'APR 2027', unit: 'POSSESSION', desc: 'Target Completion' },
  { value: 'RERA', unit: 'P52900016701', desc: 'Registered Project' },
];

const COPY_TEXT = "Designed around contemporary architecture, natural light and everyday living, Dwarkamai brings together considered spaces within the landscape of Sawantwadi.";

export default function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!imageWrapRef.current || !imageRef.current) return;

      // Right-to-Left architectural clip reveal
      gsap.fromTo(
        imageWrapRef.current,
        {
          clipPath: 'inset(0% 0% 0% 100%)',
          webkitClipPath: 'inset(0% 0% 0% 100%)',
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          webkitClipPath: 'inset(0% 0% 0% 0%)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 25%',
            scrub: 0.6,
          },
        }
      );

      // Subtle stability scale: 1.04 -> 1
      gsap.fromTo(
        imageRef.current,
        { scale: 1.04 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 25%',
            scrub: 0.6,
          },
        }
      );

      // Editorial Guide Line vertical reveal
      gsap.fromTo(
        '.vision__editorial-guide',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Top Badge & Accent Marker entrance
      gsap.fromTo(
        '.vision__top-bar',
        { opacity: 0, y: -16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Title Characters Moving Wave Effect
      gsap.fromTo(
        '.vision__char',
        {
          y: '110%',
          opacity: 0,
          rotateZ: 3,
        },
        {
          y: '0%',
          opacity: 1,
          rotateZ: 0,
          duration: 0.75,
          stagger: {
            each: 0.02,
            ease: 'sine.out',
          },
          ease: 'back.out(1.3)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Paragraph Words Moving Wave Effect
      gsap.fromTo(
        '.vision__word',
        {
          y: '100%',
          opacity: 0,
        },
        {
          y: '0%',
          opacity: 1,
          duration: 0.55,
          stagger: {
            each: 0.018,
            ease: 'sine.out',
          },
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // CTA Button entrance
      gsap.fromTo(
        '.vision__cta-wrap',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.35,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Bottom Facts Strip staggered specification items
      gsap.fromTo(
        '.vision__fact-item',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.vision__facts-strip',
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderWaveText = (text: string, isItalic = false) => {
    return text.split('').map((char, index) => (
      <span key={index} className={`vision__char-wrap ${isItalic ? 'vision__title-italic' : ''}`}>
        <span className="vision__char">{char === ' ' ? '\u00A0' : char}</span>
      </span>
    ));
  };

  return (
    <section className="vision" id="vision" ref={sectionRef} aria-label="Section 05 — The Vision">
      <div className="container">
        {/* ── TOP SECTION BADGE & REGISTRATION ──────────────── */}
        <div className="vision__top-bar">
          <div className="vision__badge">
            <span className="vision__badge-num">05</span>
            <span className="vision__badge-slash">/</span>
            <span className="vision__badge-label">THE VISION</span>
          </div>
          <div className="vision__registration-marker" aria-hidden="true">
            <span className="vision__accent-square" />
          </div>
        </div>

        {/* ── MAIN EDITORIAL COMPOSITION ──────────────────────── */}
        <div className="vision__composition">
          {/* Left Editorial Content */}
          <div className="vision__editorial">
            <div className="vision__editorial-guide" aria-hidden="true" />

            <div className="vision__text-block">
              <h2 className="vision__title">
                <span className="vision__title-line">{renderWaveText('ARCHITECTURE')}</span>
                <span className="vision__title-line">
                  {renderWaveText('FOR A ')}
                  {renderWaveText('QUIETER', true)}
                </span>
                <span className="vision__title-line">{renderWaveText('EVERYDAY.')}</span>
              </h2>

              <p className="vision__copy">
                {COPY_TEXT.split(' ').map((word, i) => (
                  <span key={i} className="vision__word-wrap">
                    <span className="vision__word">{word}</span>
                    <span className="vision__word-space">&nbsp;</span>
                  </span>
                ))}
              </p>

              <div className="vision__cta-wrap">
                <a href="#residences" className="vision__cta">
                  <span>EXPLORE THE PROJECT</span>
                  <span className="vision__cta-arrow" aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Large Architectural Visual */}
          <div className="vision__visual-wrap">
            <div className="vision__image-frame" ref={imageWrapRef}>
              <img
                ref={imageRef}
                src={visionImg}
                alt="Dwarkamai — Contemporary architectural facade with timber louvers and open balconies in Sawantwadi"
                className="vision__image"
                loading="lazy"
              />
            </div>
            <div className="vision__visual-footer" aria-hidden="true">
              <span className="arch-label">DWARKAMAI · RESIDENTIAL FACADE</span>
              <span className="arch-label">SAWANTWADI, SINDHUDURG</span>
            </div>
          </div>
        </div>

        {/* ── BOTTOM SPECIFICATION FACTS STRIP ───────────────── */}
        <div className="vision__facts-strip">
          {VISION_FACTS.map((fact, idx) => (
            <div key={idx} className="vision__fact-item">
              <div className="vision__fact-value">
                <AnimatedNumber value={fact.value} />
              </div>
              <div className="vision__fact-unit">{fact.unit}</div>
              <div className="vision__fact-desc">{fact.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
