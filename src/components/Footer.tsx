import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECT } from '../data/project';
import DarpanLogo from './DarpanLogo';
import footerSketchImg from '../assets/images/image copy.png';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: 'PROJECT', href: '#project' },
  { label: 'ARCHITECTURE', href: '#architecture' },
  { label: 'RESIDENCES', href: '#residences' },
  { label: 'LOCATION', href: '#location' },
  { label: 'ENQUIRE', href: '#enquiry' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. Background architectural sketch reveals subtly
      tl.fromTo(
        '.footer__bg-sketch',
        { opacity: 0, scale: 1.04 },
        { opacity: 0.07, scale: 1, duration: 1.5, ease: 'power2.out' }
      )
      // 2. Top architectural frame & registration markers
      .fromTo(
        '.footer__top-frame',
        { opacity: 0, scaleX: 0.96 },
        { opacity: 1, scaleX: 1, duration: 0.8, ease: 'power3.out' },
        '<0.1'
      )
      // 3. Logo enters
      .fromTo(
        '.footer__logo-wrap',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '<0.15'
      )
      // 4. Project identity enters
      .fromTo(
        '.footer__brand-block',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
        '-=0.5'
      )
      // 5. Navigation, Contact, RERA columns enter
      .fromTo(
        '.footer__info-col',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        '-=0.5'
      )
      // 6. Left editorial divider
      .fromTo(
        '.footer__left-divider',
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, transformOrigin: 'left', duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      // 7. Main Editorial Statement line-by-line wave entrance
      .fromTo(
        ['.footer__statement-line-1', '.footer__statement-line-2', '.footer__statement-sub'],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out' },
        '-=0.4'
      )
      // 8. Bottom legal bar enters very subtly
      .fromTo(
        '.footer__bottom-bar',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.3'
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" id="footer" ref={footerRef} aria-label="Site Footer — Dwarkamai">
      {/* ── FAINT BACKGROUND ARCHITECTURAL MASKED DRAWING ────────────── */}
      <div className="footer__bg-sketch-wrap" aria-hidden="true">
        <img
          src={footerSketchImg}
          alt=""
          className="footer__bg-sketch"
          loading="lazy"
        />
        <div className="footer__bg-vignette" />
      </div>

      <div className="container footer__container">
        {/* ── TOP ARCHITECTURAL DRAWING FRAME ───────────────────── */}
        <div className="footer__top-frame" aria-hidden="true">
          <div className="footer__top-datum" />
          <div className="footer__frame-marks">
            <span className="footer__mark-tick left" />
            <span className="footer__mark-dot center" />
            <span className="footer__mark-tick right" />
          </div>
        </div>

        {/* ── MAIN EDITORIAL FOOTER PLATE (52% / 48% GRID) ───────── */}
        <div className="footer__layout">
          {/* LEFT EDITORIAL COLUMN (~52%) */}
          <div className="footer__left-col">
            {/* Brand identity: Logo & Project */}
            <div className="footer__brand-wrap">
              <div className="footer__logo-wrap">
                <DarpanLogo
                  color="#FFFFFF"
                  className="footer__white-logo"
                  style={{ width: '100%', maxWidth: '175px', height: 'auto' }}
                />
              </div>

              <div className="footer__brand-block">
                <h3 className="footer__project-title font-editorial">DWARKAMAI</h3>
                <p className="footer__project-loc arch-label">SAWANTWADI · SINDHUDURG</p>
              </div>
            </div>

            {/* Architectural Divider across left column */}
            <div className="footer__left-divider" aria-hidden="true" />

            {/* Main Statement (Left Column Only) */}
            <div className="footer__statement-wrap">
              <h2 className="footer__statement-title text-hero">
                <span className="footer__statement-line footer__statement-line-1">
                  COME HOME
                </span>
                <span className="footer__statement-line footer__statement-line-2">
                  TO DWARKAMAI.
                </span>
              </h2>
              <p className="footer__statement-sub arch-label">
                A HOME ABOVE THE ORDINARY.
              </p>
            </div>
          </div>

          {/* RIGHT INFORMATION AREA (~48%) */}
          <div className="footer__right-col">
            <div className="footer__info-grid">
              {/* Column 1: Navigation */}
              <div className="footer__info-col footer__col--nav">
                <span className="arch-label footer__col-heading">NAVIGATION</span>
                <nav className="footer__nav-list" aria-label="Footer Navigation">
                  {NAV_LINKS.map((link) => (
                    <a key={link.label} href={link.href} className="footer__nav-item">
                      <span className="footer__nav-dot" aria-hidden="true" />
                      <span className="footer__nav-label">{link.label}</span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Column 2: Contact */}
              <div className="footer__info-col footer__col--contact">
                <span className="arch-label footer__col-heading">CONTACT</span>
                <div className="footer__contact-info">
                  {PROJECT.contact.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone}`} className="footer__phone-link">
                      <span className="font-editorial footer__phone-num">{phone}</span>
                    </a>
                  ))}
                  <a href="#enquiry" className="footer__enquire-cta">
                    <span>ENQUIRE</span>
                    <span className="footer__cta-arrow">→</span>
                  </a>
                </div>
              </div>

              {/* Column 3: RERA */}
              <div className="footer__info-col footer__col--rera">
                <span className="arch-label footer__col-heading">RERA</span>
                <div className="footer__rera-info">
                  <span className="footer__rera-num font-editorial">{PROJECT.contact.rera}</span>
                  <p className="footer__rera-sub arch-label">
                    DWARKAMAI<br />
                    SAWANTWADI · SINDHUDURG
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM ARCHITECTURAL LEGAL BAR ────────────────────── */}
        <div className="footer__bottom-bar">
          <div className="footer__bottom-left">
            <span className="footer__legal-text">
              © {currentYear} DARPAN CONSTRUCTIONS
            </span>
            <span className="footer__legal-sep">·</span>
            <span className="footer__legal-text">
              DWARKAMAI · SAWANTWADI · SINDHUDURG
            </span>
            <span className="footer__legal-sep">·</span>
            <span className="footer__legal-text">
              RERA {PROJECT.contact.rera}
            </span>
          </div>

          <div className="footer__bottom-right">
            <span className="footer__legal-link">PRIVACY</span>
            <span className="footer__legal-sep">·</span>
            <span className="footer__legal-link">TERMS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
