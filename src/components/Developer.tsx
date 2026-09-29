import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DarpanLogo from './DarpanLogo';
import archSketchImg from '../assets/images/image copy.png';
import './Developer.css';

gsap.registerPlugin(ScrollTrigger);

const BRAND_VALUES = [
  'Trust',
  'Quality',
  'Timely Delivery',
  'Thoughtful Design',
  'Long-Term Value',
];

export default function Developer() {
  const sectionRef = useRef<HTMLElement>(null);
  const sketchWrapRef = useRef<HTMLDivElement>(null);
  const sketchImgRef = useRef<HTMLImageElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // ── MASTER TIMELINE FOR SECTION 09 ───────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // 0.00: Section Tag & Left Vertical Guide
      tl.fromTo(
        '.developer__tag',
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
      .fromTo(
        '.developer__left-guide',
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 0.8, ease: 'power3.out' },
        '<0.1'
      )

      // 0.10 - 0.30: Masked Heading Wave Reveal (Rising from overflow-hidden)
      .fromTo(
        '.developer__title-line-1 .developer__title-inner',
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.85, ease: 'power3.out' },
        '<0.1'
      )
      .fromTo(
        '.developer__title-line-2 .developer__title-inner',
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.85, ease: 'power3.out' },
        '<0.12'
      )
      .fromTo(
        '.developer__title-line-3 .developer__title-inner',
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.85, ease: 'power3.out' },
        '<0.12'
      )

      // 0.40: Paragraph and Button Entrance
      .fromTo(
        '.developer__copy',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.45'
      )
      .fromTo(
        '.developer__btn-wrap',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.35'
      )

      // 0.50: Center Architectural Sketch Mask Expansion & Fade-in
      .fromTo(
        sketchWrapRef.current,
        { opacity: 0.1, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
        '-=0.8'
      )

      // 0.70: White Darpan Logo Emerge from Architecture
      .fromTo(
        logoWrapRef.current,
        { opacity: 0, scale: 0.93, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.95, ease: 'power3.out' },
        '-=0.6'
      )

      // 0.85: Right-side Values Reveal One by One
      .fromTo(
        '.developer__value-item',
        { opacity: 0, x: 25 },
        {
          opacity: 1,
          x: 0,
          duration: 0.55,
          stagger: 0.09,
          ease: 'power2.out',
        },
        '-=0.65'
      )
      .fromTo(
        '.developer__values-timeline',
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.8'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="developer" id="developer" ref={sectionRef} aria-label="Section 09 — Darpan Construction">
      <div className="developer__banner">
        {/* Decorative Vertical Left Guideline */}
        <div className="developer__left-guide" aria-hidden="true" />

        {/* ══════════════════════════════════════════════════════════
            LEFT: EDITORIAL BRAND STATEMENT & STORY CTA
            ══════════════════════════════════════════════════════════ */}
        <div className="developer__editorial-pane">
          <div className="developer__tag">
            <span className="arch-number developer__tag-num">09</span>
            <div className="arch-divider developer__tag-divider" />
            <span className="arch-label developer__tag-label">DARPAN CONSTRUCTION</span>
          </div>

          <div className="developer__heading-wrap">
            <h2 className="developer__title">
              <span className="developer__title-line developer__title-line-1">
                <span className="developer__title-inner">Building</span>
              </span>
              <span className="developer__title-line developer__title-line-2">
                <span className="developer__title-inner">Better</span>
              </span>
              <span className="developer__title-line developer__title-line-3">
                <span className="developer__title-inner developer__title-italic">Tomorrow.</span>
              </span>
            </h2>

            <p className="developer__copy">
              At Darpan Construction, we believe in creating spaces that reflect thoughtful quality and long-term value — with a commitment to creating homes that are considered, functional and enduring.
            </p>

            <div className="developer__btn-wrap">
              <a href="#architecture" className="developer__story-btn">
                <span>Our Story</span>
                <span className="developer__btn-arrow">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            CENTER: DARK ARCHITECTURAL MASKED ARTWORK + DARPAN LOGO
            ══════════════════════════════════════════════════════════ */}
        <div className="developer__center-stage">
          {/* Faded Architectural Building Sketch Artwork */}
          <div className="developer__sketch-wrap" ref={sketchWrapRef}>
            <img
              ref={sketchImgRef}
              src={archSketchImg}
              alt="Darpan Architectural Building Perspective Artwork"
              className="developer__sketch-img"
              loading="lazy"
            />
            {/* Darkroom Radial & Edge Blend Gradients */}
            <div className="developer__sketch-vignette" aria-hidden="true" />
          </div>

          {/* Centered White Darpan Logo */}
          <div className="developer__logo-container" ref={logoWrapRef}>
            <div className="developer__logo-glow" aria-hidden="true" />
            <DarpanLogo
              color="#FFFFFF"
              className="developer__white-logo"
              style={{ width: '100%', maxWidth: '320px', height: 'auto' }}
            />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            RIGHT: BRAND VALUES ARCHITECTURAL LIST
            ══════════════════════════════════════════════════════════ */}
        <div className="developer__values-pane">
          <div className="developer__values-wrapper">
            <div className="developer__values-timeline" aria-hidden="true" />

            <div className="developer__values-list">
              {BRAND_VALUES.map((val, idx) => (
                <div key={idx} className="developer__value-item">
                  <div className="developer__value-node" aria-hidden="true">
                    <span className="developer__value-dot" />
                  </div>
                  <span className="developer__value-text">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
