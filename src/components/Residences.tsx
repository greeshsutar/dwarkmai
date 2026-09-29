import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedNumber from './AnimatedNumber';
import bhk1Img from '../assets/images/1bhk.png';
import bhk2Img from '../assets/images/2bhk.png';
import './Residences.css';

gsap.registerPlugin(ScrollTrigger);

export default function Residences() {
  const sectionRef = useRef<HTMLElement>(null);
  const study1PinRef = useRef<HTMLDivElement>(null);
  const study2PinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // ═════════════════════════════════════════════════════════════
      // 1 BHK PROGRESSIVE SCROLL-PINNED SEQUENCE WITH CLEAR GAPS
      // ═════════════════════════════════════════════════════════════
      if (study1PinRef.current) {
        const board = study1PinRef.current;
        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: board,
            start: 'top top',
            end: '+=160%',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        // Step 0: Plan emerges clean & subtle
        tl1.fromTo(
          board.querySelector('.residences__plan-wrapper'),
          { opacity: 0.5, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
        )
        // GAP
        .to({}, { duration: 0.6 })

        // Step 1: ENTRY arrow
        .fromTo(
          board.querySelector('.anno-group--entry'),
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
        )
        // GAP
        .to({}, { duration: 0.7 })

        // Step 2: LIVING & DINING (Draw line, pop dot, reveal text)
        .fromTo(
          board.querySelector('.anno-group--living .anno-dot'),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
        )
        .fromTo(
          board.querySelector('.anno-group--living .anno-line'),
          { strokeDashoffset: 200 },
          { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out' },
          '<'
        )
        .fromTo(
          board.querySelector('.anno-group--living .anno-text-group'),
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' },
          '<0.2'
        )
        // GAP
        .to({}, { duration: 0.7 })

        // Step 3: KITCHEN
        .fromTo(
          board.querySelector('.anno-group--kitchen .anno-dot'),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
        )
        .fromTo(
          board.querySelector('.anno-group--kitchen .anno-line'),
          { strokeDashoffset: 200 },
          { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out' },
          '<'
        )
        .fromTo(
          board.querySelector('.anno-group--kitchen .anno-text-group'),
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' },
          '<0.2'
        )
        // GAP
        .to({}, { duration: 0.7 })

        // Step 4: BEDROOM
        .fromTo(
          board.querySelector('.anno-group--bed .anno-dot'),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
        )
        .fromTo(
          board.querySelector('.anno-group--bed .anno-line'),
          { strokeDashoffset: 200 },
          { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out' },
          '<'
        )
        .fromTo(
          board.querySelector('.anno-group--bed .anno-text-group'),
          { opacity: 0, x: 12 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' },
          '<0.2'
        )
        // GAP
        .to({}, { duration: 0.7 })

        // Step 5: BATH
        .fromTo(
          board.querySelector('.anno-group--bath .anno-dot'),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
        )
        .fromTo(
          board.querySelector('.anno-group--bath .anno-line'),
          { strokeDashoffset: 200 },
          { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out' },
          '<'
        )
        .fromTo(
          board.querySelector('.anno-group--bath .anno-text-group'),
          { opacity: 0, x: 12 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' },
          '<0.2'
        )
        // GAP
        .to({}, { duration: 0.7 })

        // Step 6: BALCONY DECK
        .fromTo(
          board.querySelector('.anno-group--balcony .anno-dot'),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
        )
        .fromTo(
          board.querySelector('.anno-group--balcony .anno-line'),
          { strokeDashoffset: 200 },
          { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out' },
          '<'
        )
        .fromTo(
          board.querySelector('.anno-group--balcony .anno-text-group'),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '<0.2'
        )
        // GAP
        .to({}, { duration: 0.7 })

        // Step 7: Schematic diagrams at bottom
        .fromTo(
          board.querySelector('.residences__schematic-footer-meta'),
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        )
        // Holding pause at completion before unpinning
        .to({}, { duration: 0.8 });
      }

      // ═════════════════════════════════════════════════════════════
      // 2 BHK PROGRESSIVE SCROLL-PINNED SEQUENCE WITH CLEAR GAPS
      // ═════════════════════════════════════════════════════════════
      if (study2PinRef.current) {
        const board = study2PinRef.current;
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: board,
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        // Step 0: Plan emerges clean & subtle
        tl2.fromTo(
          board.querySelector('.residences__plan-wrapper'),
          { opacity: 0.5, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
        )
        // GAP
        .to({}, { duration: 0.6 })

        // Step 1: ENTRY arrow
        .fromTo(
          board.querySelector('.anno-group--entry'),
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
        )
        // GAP
        .to({}, { duration: 0.7 })

        // Step 2: LIVING & DINING
        .fromTo(
          board.querySelector('.anno-group--living .anno-dot'),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
        )
        .fromTo(
          board.querySelector('.anno-group--living .anno-line'),
          { strokeDashoffset: 200 },
          { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out' },
          '<'
        )
        .fromTo(
          board.querySelector('.anno-group--living .anno-text-group'),
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' },
          '<0.2'
        )
        // GAP
        .to({}, { duration: 0.7 })

        // Step 3: KITCHEN
        .fromTo(
          board.querySelector('.anno-group--kitchen .anno-dot'),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
        )
        .fromTo(
          board.querySelector('.anno-group--kitchen .anno-line'),
          { strokeDashoffset: 200 },
          { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out' },
          '<'
        )
        .fromTo(
          board.querySelector('.anno-group--kitchen .anno-text-group'),
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' },
          '<0.2'
        )
        // GAP
        .to({}, { duration: 0.7 })

        // Step 4: MASTER BED (from top)
        .fromTo(
          board.querySelector('.anno-group--master .anno-dot'),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
        )
        .fromTo(
          board.querySelector('.anno-group--master .anno-line'),
          { strokeDashoffset: 200 },
          { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out' },
          '<'
        )
        .fromTo(
          board.querySelector('.anno-group--master .anno-text-group'),
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '<0.2'
        )
        // GAP
        .to({}, { duration: 0.7 })

        // Step 5: BEDROOM 02 (from right)
        .fromTo(
          board.querySelector('.anno-group--bed2 .anno-dot'),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
        )
        .fromTo(
          board.querySelector('.anno-group--bed2 .anno-line'),
          { strokeDashoffset: 200 },
          { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out' },
          '<'
        )
        .fromTo(
          board.querySelector('.anno-group--bed2 .anno-text-group'),
          { opacity: 0, x: 12 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' },
          '<0.2'
        )
        // GAP
        .to({}, { duration: 0.7 })

        // Step 6: EN-SUITE BATH (from right)
        .fromTo(
          board.querySelector('.anno-group--ensuite .anno-dot'),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
        )
        .fromTo(
          board.querySelector('.anno-group--ensuite .anno-line'),
          { strokeDashoffset: 200 },
          { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out' },
          '<'
        )
        .fromTo(
          board.querySelector('.anno-group--ensuite .anno-text-group'),
          { opacity: 0, x: 12 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' },
          '<0.2'
        )
        // GAP
        .to({}, { duration: 0.7 })

        // Step 7: BALCONY DECK (from bottom)
        .fromTo(
          board.querySelector('.anno-group--balcony .anno-dot'),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
        )
        .fromTo(
          board.querySelector('.anno-group--balcony .anno-line'),
          { strokeDashoffset: 200 },
          { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out' },
          '<'
        )
        .fromTo(
          board.querySelector('.anno-group--balcony .anno-text-group'),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '<0.2'
        )
        // GAP
        .to({}, { duration: 0.7 })

        // Step 8: Schematic diagrams at bottom
        .fromTo(
          board.querySelector('.residences__schematic-footer-meta'),
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        )
        // Holding pause before unpinning
        .to({}, { duration: 0.8 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="residences" id="residences" ref={sectionRef} aria-label="Section 07 — Residences">
      {/* ── SECTION INTRO HEADER ───────────────────────────────── */}
      <div className="residences__intro-wrap">
        <div className="container">
          <div className="residences__header">
            <div className="residences__header-label">
              <span className="arch-number">07</span>
              <div className="arch-divider residences__header-divider" />
              <span className="arch-label">RESIDENCES</span>
            </div>

            <div className="residences__header-text">
              <h2 className="residences__title text-display">
                ROOM TO<br />LIVE WELL.
              </h2>
              <p className="residences__tagline text-body">
                Thoughtfully planned residences designed around everyday living, natural light and comfortable proportions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          01 BHK ARCHITECTURAL PRESENTATION BOARD (PINNED SCROLL)
          ═════════════════════════════════════════════════════════════ */}
      <div className="residences__board-section" ref={study1PinRef}>
        <div className="container residences__board-container">
          <div className="residences__board">
            {/* Top Identity & Dimension Header */}
            <div className="residences__board-top">
              <div className="residences__board-id-row">
                <div className="residences__board-tag">
                  <span className="residences__tag-num">01</span>
                  <span className="residences__tag-name">ONE BEDROOM</span>
                </div>
                <div className="residences__board-subtag">
                  <span>STUDY DWK—R1</span>
                  <span className="residences__dot-sep">·</span>
                  <span>15°53′N · LEVEL 01–06</span>
                </div>
                <span className="residences__accent-dot" aria-hidden="true" />
              </div>

              <div className="residences__board-main-row">
                <div className="residences__unit-title-wrap">
                  <span className="residences__unit-num">01</span>
                  <span className="residences__unit-bhk">BHK</span>
                </div>
                <div className="residences__area-block">
                  <div className="residences__area-num-wrap">
                    <span className="residences__area-val">
                      <AnimatedNumber value="467" />
                    </span>
                    <span className="residences__area-unit">SQ.FT.</span>
                  </div>
                  <span className="residences__area-sub">ONWARDS · CARPET AREA</span>
                </div>
              </div>
            </div>

            {/* Architectural Drawing Canvas */}
            <div className="residences__canvas-stage">
              <div className="residences__plan-wrapper">
                {/* Background grid lines */}
                <div className="residences__grid-frame" aria-hidden="true">
                  <div className="residences__guide-h top" />
                  <div className="residences__guide-h btm" />
                  <div className="residences__guide-v lft" />
                  <div className="residences__guide-v rgt" />
                </div>

                {/* Exact 1 BHK Floor Plan Render */}
                <img
                  src={bhk1Img}
                  alt="Dwarkamai 1 BHK Architectural Floor Plan"
                  className="residences__floorplan-img"
                  loading="lazy"
                />

                {/* Precision Vector Annotations Overlay */}
                <svg className="residences__svg-overlay" viewBox="0 0 1200 800" fill="none" aria-hidden="true">
                  {/* ── 01. ENTRY ── */}
                  <g className="anno-group anno-group--entry">
                    <path d="M 210 380 L 290 380" stroke="#FF4A00" strokeWidth="1.5" />
                    <polygon points="290,375 302,380 290,385" fill="#FF4A00" />
                    <text x="195" y="385" textAnchor="end" className="anno-entry-label">ENTRY</text>
                  </g>

                  {/* ── 02. LIVING & DINING ── */}
                  <g className="anno-group anno-group--living">
                    <line className="anno-line" x1="200" y1="260" x2="380" y2="260" stroke="#171613" strokeWidth="0.9" strokeOpacity="0.45" strokeDasharray="200" strokeDashoffset="0" />
                    <circle className="anno-dot" cx="380" cy="260" r="4" fill="#FF4A00" />
                    <g className="anno-text-group">
                      <text x="185" y="250" textAnchor="end" className="anno-label">LIVING &amp; DINING</text>
                      <text x="185" y="274" textAnchor="end" className="anno-dim">10'6" × 10'0"</text>
                    </g>
                  </g>

                  {/* ── 03. KITCHEN ── */}
                  <g className="anno-group anno-group--kitchen">
                    <line className="anno-line" x1="200" y1="520" x2="350" y2="520" stroke="#171613" strokeWidth="0.9" strokeOpacity="0.45" strokeDasharray="200" strokeDashoffset="0" />
                    <circle className="anno-dot" cx="350" cy="520" r="4" fill="#FF4A00" />
                    <g className="anno-text-group">
                      <text x="185" y="510" textAnchor="end" className="anno-label">KITCHEN</text>
                      <text x="185" y="534" textAnchor="end" className="anno-dim">9'0" × 7'0"</text>
                    </g>
                  </g>

                  {/* ── 04. BEDROOM ── */}
                  <g className="anno-group anno-group--bed">
                    <line className="anno-line" x1="1000" y1="280" x2="800" y2="280" stroke="#171613" strokeWidth="0.9" strokeOpacity="0.45" strokeDasharray="200" strokeDashoffset="0" />
                    <circle className="anno-dot" cx="800" cy="280" r="4" fill="#FF4A00" />
                    <g className="anno-text-group">
                      <text x="1015" y="270" textAnchor="start" className="anno-label">BEDROOM</text>
                      <text x="1015" y="294" textAnchor="start" className="anno-dim">11'0" × 10'0"</text>
                    </g>
                  </g>

                  {/* ── 05. BATH ── */}
                  <g className="anno-group anno-group--bath">
                    <line className="anno-line" x1="1000" y1="510" x2="710" y2="510" stroke="#171613" strokeWidth="0.9" strokeOpacity="0.45" strokeDasharray="200" strokeDashoffset="0" />
                    <circle className="anno-dot" cx="710" cy="510" r="4" fill="#FF4A00" />
                    <g className="anno-text-group">
                      <text x="1015" y="500" textAnchor="start" className="anno-label">BATH</text>
                      <text x="1015" y="524" textAnchor="start" className="anno-dim">7'0" × 4'6"</text>
                    </g>
                  </g>

                  {/* ── 06. BALCONY DECK ── */}
                  <g className="anno-group anno-group--balcony">
                    <line className="anno-line" x1="680" y1="730" x2="680" y2="650" stroke="#171613" strokeWidth="0.9" strokeOpacity="0.45" strokeDasharray="200" strokeDashoffset="0" />
                    <circle className="anno-dot" cx="680" cy="650" r="4" fill="#FF4A00" />
                    <g className="anno-text-group">
                      <text x="680" y="754" textAnchor="middle" className="anno-label">BALCONY DECK</text>
                      <text x="680" y="776" textAnchor="middle" className="anno-dim">11'6" × 4'0"</text>
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            {/* Bottom Schematic Metadata Bar */}
            <div className="residences__schematic-footer-meta">
              <div className="residences__iso-block">
                <svg viewBox="0 0 120 100" fill="none" className="residences__iso-svg">
                  <polygon points="20,70 60,90 100,70 60,50" stroke="#171613" strokeWidth="0.6" strokeOpacity="0.3" fill="none" />
                  <path d="M 20 70 L 20 25 L 60 45 L 60 90 Z" stroke="#171613" strokeWidth="0.6" strokeOpacity="0.3" fill="none" />
                  <path d="M 60 45 L 100 25 L 100 70 L 60 90 Z" stroke="#171613" strokeWidth="0.6" strokeOpacity="0.3" fill="none" />
                  <path d="M 60 52 L 100 32 L 100 48 L 60 68 Z" fill="#FF4A00" fillOpacity="0.8" />
                  <line x1="20" y1="60" x2="60" y2="80" stroke="#171613" strokeWidth="0.4" strokeOpacity="0.2" />
                  <line x1="20" y1="50" x2="60" y2="70" stroke="#171613" strokeWidth="0.4" strokeOpacity="0.2" />
                  <line x1="20" y1="40" x2="60" y2="60" stroke="#171613" strokeWidth="0.4" strokeOpacity="0.2" />
                  <line x1="60" y1="80" x2="100" y2="60" stroke="#171613" strokeWidth="0.4" strokeOpacity="0.2" />
                  <line x1="60" y1="70" x2="100" y2="50" stroke="#171613" strokeWidth="0.4" strokeOpacity="0.2" />
                  <line x1="60" y1="60" x2="100" y2="40" stroke="#171613" strokeWidth="0.4" strokeOpacity="0.2" />
                </svg>
                <div className="residences__location-text">
                  <span className="arch-label">TYPICAL LOCATION</span>
                  <span className="residences__location-val">LEVEL 01 – 06</span>
                  <div className="residences__compass">
                    <span className="residences__compass-arrow">↑</span>
                    <span className="residences__compass-n">N</span>
                  </div>
                </div>
              </div>

              <div className="residences__keyplan-block">
                <span className="arch-label">KEY PLAN</span>
                <svg viewBox="0 0 140 60" fill="none" className="residences__keyplan-svg">
                  <rect x="5" y="10" width="130" height="40" stroke="#171613" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />
                  <line x1="32" y1="10" x2="32" y2="50" stroke="#171613" strokeWidth="0.6" strokeOpacity="0.3" />
                  <line x1="58" y1="10" x2="58" y2="50" stroke="#171613" strokeWidth="0.6" strokeOpacity="0.3" />
                  <line x1="84" y1="10" x2="84" y2="50" stroke="#171613" strokeWidth="0.6" strokeOpacity="0.3" />
                  <line x1="110" y1="10" x2="110" y2="50" stroke="#171613" strokeWidth="0.6" strokeOpacity="0.3" />
                  <line x1="5" y1="30" x2="135" y2="30" stroke="#171613" strokeWidth="0.6" strokeOpacity="0.3" />
                  <rect x="5" y="30" width="27" height="20" fill="#FF4A00" fillOpacity="0.8" stroke="#FF4A00" strokeWidth="1" />
                </svg>
              </div>

              <div className="residences__disclaimer-tag">
                <span className="arch-label">SCHEMATIC · NOT TO SCALE · ACTUAL PLANS TBD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          02 BHK ARCHITECTURAL PRESENTATION BOARD (PINNED SCROLL)
          ═════════════════════════════════════════════════════════════ */}
      <div className="residences__board-section" ref={study2PinRef}>
        <div className="container residences__board-container">
          <div className="residences__board">
            {/* Top Identity & Dimension Header */}
            <div className="residences__board-top">
              <div className="residences__board-id-row">
                <div className="residences__board-tag">
                  <span className="residences__tag-num">02</span>
                  <span className="residences__tag-name">TWO BEDROOM</span>
                </div>
                <div className="residences__board-subtag">
                  <span>STUDY DWK—R2</span>
                  <span className="residences__dot-sep">·</span>
                  <span>15°53′N · LEVEL 01–06</span>
                </div>
                <span className="residences__accent-dot" aria-hidden="true" />
              </div>

              <div className="residences__board-main-row">
                <div className="residences__unit-title-wrap">
                  <span className="residences__unit-num">02</span>
                  <span className="residences__unit-bhk">BHK</span>
                </div>
                <div className="residences__area-block">
                  <div className="residences__area-num-wrap">
                    <span className="residences__area-val">
                      <AnimatedNumber value="823" />
                    </span>
                    <span className="residences__area-unit">SQ.FT.</span>
                  </div>
                  <span className="residences__area-sub">ONWARDS · CARPET AREA</span>
                </div>
              </div>
            </div>

            {/* Architectural Drawing Canvas */}
            <div className="residences__canvas-stage">
              <div className="residences__plan-wrapper">
                {/* Background grid lines */}
                <div className="residences__grid-frame" aria-hidden="true">
                  <div className="residences__guide-h top" />
                  <div className="residences__guide-h btm" />
                  <div className="residences__guide-v lft" />
                  <div className="residences__guide-v rgt" />
                </div>

                {/* Exact 2 BHK Floor Plan Render */}
                <img
                  src={bhk2Img}
                  alt="Dwarkamai 2 BHK Architectural Floor Plan"
                  className="residences__floorplan-img"
                  loading="lazy"
                />

                {/* Precision Vector Annotations Overlay */}
                <svg className="residences__svg-overlay" viewBox="0 0 1200 800" fill="none" aria-hidden="true">
                  {/* ── 01. ENTRY ── */}
                  <g className="anno-group anno-group--entry">
                    <path d="M 210 380 L 290 380" stroke="#FF4A00" strokeWidth="1.5" />
                    <polygon points="290,375 302,380 290,385" fill="#FF4A00" />
                    <text x="195" y="385" textAnchor="end" className="anno-entry-label">ENTRY</text>
                  </g>

                  {/* ── 02. LIVING & DINING ── */}
                  <g className="anno-group anno-group--living">
                    <line className="anno-line" x1="200" y1="260" x2="380" y2="260" stroke="#171613" strokeWidth="0.9" strokeOpacity="0.45" strokeDasharray="200" strokeDashoffset="0" />
                    <circle className="anno-dot" cx="380" cy="260" r="4" fill="#FF4A00" />
                    <g className="anno-text-group">
                      <text x="185" y="250" textAnchor="end" className="anno-label">LIVING &amp; DINING</text>
                      <text x="185" y="274" textAnchor="end" className="anno-dim">11'0" × 15'0"</text>
                    </g>
                  </g>

                  {/* ── 03. KITCHEN ── */}
                  <g className="anno-group anno-group--kitchen">
                    <line className="anno-line" x1="200" y1="540" x2="350" y2="540" stroke="#171613" strokeWidth="0.9" strokeOpacity="0.45" strokeDasharray="200" strokeDashoffset="0" />
                    <circle className="anno-dot" cx="350" cy="540" r="4" fill="#FF4A00" />
                    <g className="anno-text-group">
                      <text x="185" y="530" textAnchor="end" className="anno-label">KITCHEN</text>
                      <text x="185" y="554" textAnchor="end" className="anno-dim">9'0" × 8'0"</text>
                    </g>
                  </g>

                  {/* ── 04. MASTER BED (TOP) ── */}
                  <g className="anno-group anno-group--master">
                    <line className="anno-line" x1="600" y1="75" x2="600" y2="220" stroke="#171613" strokeWidth="0.9" strokeOpacity="0.45" strokeDasharray="200" strokeDashoffset="0" />
                    <circle className="anno-dot" cx="600" cy="220" r="4" fill="#FF4A00" />
                    <g className="anno-text-group">
                      <text x="600" y="48" textAnchor="middle" className="anno-label">MASTER BED</text>
                      <text x="600" y="70" textAnchor="middle" className="anno-dim">11'0" × 12'0"</text>
                    </g>
                  </g>

                  {/* ── 05. BEDROOM 02 ── */}
                  <g className="anno-group anno-group--bed2">
                    <line className="anno-line" x1="1000" y1="280" x2="840" y2="280" stroke="#171613" strokeWidth="0.9" strokeOpacity="0.45" strokeDasharray="200" strokeDashoffset="0" />
                    <circle className="anno-dot" cx="840" cy="280" r="4" fill="#FF4A00" />
                    <g className="anno-text-group">
                      <text x="1015" y="270" textAnchor="start" className="anno-label">BEDROOM 02</text>
                      <text x="1015" y="294" textAnchor="start" className="anno-dim">10'0" × 11'0"</text>
                    </g>
                  </g>

                  {/* ── 06. EN-SUITE BATH ── */}
                  <g className="anno-group anno-group--ensuite">
                    <line className="anno-line" x1="1000" y1="530" x2="820" y2="530" stroke="#171613" strokeWidth="0.9" strokeOpacity="0.45" strokeDasharray="200" strokeDashoffset="0" />
                    <circle className="anno-dot" cx="820" cy="530" r="4" fill="#FF4A00" />
                    <g className="anno-text-group">
                      <text x="1015" y="520" textAnchor="start" className="anno-label">EN-SUITE BATH</text>
                      <text x="1015" y="544" textAnchor="start" className="anno-dim">8'0" × 5'0"</text>
                    </g>
                  </g>

                  {/* ── 07. BALCONY DECK ── */}
                  <g className="anno-group anno-group--balcony">
                    <line className="anno-line" x1="600" y1="730" x2="600" y2="650" stroke="#171613" strokeWidth="0.9" strokeOpacity="0.45" strokeDasharray="200" strokeDashoffset="0" />
                    <circle className="anno-dot" cx="600" cy="650" r="4" fill="#FF4A00" />
                    <g className="anno-text-group">
                      <text x="600" y="754" textAnchor="middle" className="anno-label">BALCONY DECK</text>
                      <text x="600" y="776" textAnchor="middle" className="anno-dim">11'0" × 5'0"</text>
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            {/* Bottom Schematic Metadata Bar */}
            <div className="residences__schematic-footer-meta">
              <div className="residences__iso-block">
                <svg viewBox="0 0 120 100" fill="none" className="residences__iso-svg">
                  <polygon points="20,70 60,90 100,70 60,50" stroke="#171613" strokeWidth="0.6" strokeOpacity="0.3" fill="none" />
                  <path d="M 20 70 L 20 25 L 60 45 L 60 90 Z" stroke="#171613" strokeWidth="0.6" strokeOpacity="0.3" fill="none" />
                  <path d="M 60 45 L 100 25 L 100 70 L 60 90 Z" stroke="#171613" strokeWidth="0.6" strokeOpacity="0.3" fill="none" />
                  <path d="M 60 52 L 100 32 L 100 48 L 60 68 Z" fill="#FF4A00" fillOpacity="0.8" />
                  <line x1="20" y1="60" x2="60" y2="80" stroke="#171613" strokeWidth="0.4" strokeOpacity="0.2" />
                  <line x1="20" y1="50" x2="60" y2="70" stroke="#171613" strokeWidth="0.4" strokeOpacity="0.2" />
                  <line x1="20" y1="40" x2="60" y2="60" stroke="#171613" strokeWidth="0.4" strokeOpacity="0.2" />
                  <line x1="60" y1="80" x2="100" y2="60" stroke="#171613" strokeWidth="0.4" strokeOpacity="0.2" />
                  <line x1="60" y1="70" x2="100" y2="50" stroke="#171613" strokeWidth="0.4" strokeOpacity="0.2" />
                  <line x1="60" y1="60" x2="100" y2="40" stroke="#171613" strokeWidth="0.4" strokeOpacity="0.2" />
                </svg>
                <div className="residences__location-text">
                  <span className="arch-label">TYPICAL LOCATION</span>
                  <span className="residences__location-val">LEVEL 01 – 06</span>
                  <div className="residences__compass">
                    <span className="residences__compass-arrow">↑</span>
                    <span className="residences__compass-n">N</span>
                  </div>
                </div>
              </div>

              <div className="residences__keyplan-block">
                <span className="arch-label">KEY PLAN</span>
                <svg viewBox="0 0 140 60" fill="none" className="residences__keyplan-svg">
                  <rect x="5" y="10" width="130" height="40" stroke="#171613" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />
                  <line x1="32" y1="10" x2="32" y2="50" stroke="#171613" strokeWidth="0.6" strokeOpacity="0.3" />
                  <line x1="58" y1="10" x2="58" y2="50" stroke="#171613" strokeWidth="0.6" strokeOpacity="0.3" />
                  <line x1="84" y1="10" x2="84" y2="50" stroke="#171613" strokeWidth="0.6" strokeOpacity="0.3" />
                  <line x1="110" y1="10" x2="110" y2="50" stroke="#171613" strokeWidth="0.6" strokeOpacity="0.3" />
                  <line x1="5" y1="30" x2="135" y2="30" stroke="#171613" strokeWidth="0.6" strokeOpacity="0.3" />
                  <rect x="58" y="10" width="26" height="40" fill="#FF4A00" fillOpacity="0.8" stroke="#FF4A00" strokeWidth="1" />
                </svg>
              </div>

              <div className="residences__disclaimer-tag">
                <span className="arch-label">SCHEMATIC · NOT TO SCALE · ACTUAL PLANS TBD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
