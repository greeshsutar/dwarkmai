import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FinalStatement.css';

gsap.registerPlugin(ScrollTrigger);

export default function FinalStatement() {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 1025px)',
          isTablet: '(min-width: 769px) and (max-width: 1024px)',
          isMobile: '(max-width: 768px)',
        },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };
          const yDist = isMobile ? 40 : 75;
          const endDist = isMobile ? '+=380%' : '+=540%';

          // Ensure all statements start completely hidden
          gsap.set('.stmt', { autoAlpha: 0 });

          // ── MASTER TIMELINE: STRICTLY SEQUENTIAL (NO OVERLAP) ───
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              end: endDist,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          // Buffer before first statement starts
          tl.to({}, { duration: 0.4 })

          // STATEMENT 01
          .set('.stmt--1', { autoAlpha: 1 })
          .fromTo(
            '.stmt--1 .stmt__line',
            { y: yDist, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.0, stagger: 0.12, ease: 'power3.out' }
          )
          .to({}, { duration: 1.2 })
          .to(
            '.stmt--1 .stmt__line',
            { y: -yDist, opacity: 0, duration: 0.8, stagger: 0.06, ease: 'power3.in' }
          )
          .set('.stmt--1', { autoAlpha: 0 })
          .to({}, { duration: 0.6 })

          // STATEMENT 02
          .set('.stmt--2', { autoAlpha: 1 })
          .fromTo(
            '.stmt--2 .stmt__line',
            { y: yDist, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.0, stagger: 0.12, ease: 'power3.out' }
          )
          .to({}, { duration: 1.2 })
          .to(
            '.stmt--2 .stmt__line',
            { y: -yDist, opacity: 0, duration: 0.8, stagger: 0.06, ease: 'power3.in' }
          )
          .set('.stmt--2', { autoAlpha: 0 })
          .to({}, { duration: 0.6 })

          // STATEMENT 03
          .set('.stmt--3', { autoAlpha: 1 })
          .fromTo(
            '.stmt--3 .stmt__line',
            { y: yDist, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.0, stagger: 0.15, ease: 'power3.out' }
          )
          .to({}, { duration: 1.2 })
          .to(
            '.stmt--3 .stmt__line',
            { y: -yDist, opacity: 0, duration: 0.8, stagger: 0.06, ease: 'power3.in' }
          )
          .set('.stmt--3', { autoAlpha: 0 })
          .to({}, { duration: 0.6 })

          // STATEMENT 04
          .set('.stmt--4', { autoAlpha: 1 })
          .fromTo(
            '.stmt--4 .stmt__line',
            { y: yDist, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.0, stagger: 0.12, ease: 'power3.out' }
          )
          .to({}, { duration: 1.2 })
          .to(
            '.stmt--4 .stmt__line',
            { y: -yDist, opacity: 0, duration: 0.8, stagger: 0.06, ease: 'power3.in' }
          )
          .set('.stmt--4', { autoAlpha: 0 })
          .to({}, { duration: 0.6 })

          // STATEMENT 05
          .set('.stmt--5', { autoAlpha: 1 })
          .fromTo(
            '.stmt--5 .stmt__line',
            { y: yDist, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.0, stagger: 0.12, ease: 'power3.out' }
          )
          .to({}, { duration: 1.2 })
          .to(
            '.stmt--5 .stmt__line',
            { y: -yDist, opacity: 0, duration: 0.8, stagger: 0.06, ease: 'power3.in' }
          )
          .set('.stmt--5', { autoAlpha: 0 })
          .to({}, { duration: 0.6 })

          // STATEMENT 06 (FINAL)
          .set('.stmt--6', { autoAlpha: 1 })
          .fromTo(
            ['.stmt--6 .stmt__main-title', '.stmt--6 .stmt__subtitle'],
            { y: yDist, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.1, stagger: 0.18, ease: 'power3.out' }
          )
          .to({}, { duration: 1.8 });

          // Subtle traveling architectural datum dot across whole scroll
          tl.fromTo(
            '.cinematic__travel-dot',
            { x: -120, y: 80, opacity: 0 },
            { x: 120, y: -80, opacity: 0.7, duration: tl.duration(), ease: 'none' },
            0
          );
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="cinematic-interlude"
      id="cinematic-transition"
      ref={containerRef}
      aria-label="Cinematic Architectural Statement Transition"
    >
      <div className="cinematic__viewport" ref={stageRef}>
        {/* ── ARCHITECTURAL CORNER REGISTRATION MARKS & BORDERS ── */}
        <div className="cinematic__frame" aria-hidden="true">
          <div className="cinematic__corner top-left" />
          <div className="cinematic__corner top-right" />
          <div className="cinematic__corner btm-left" />
          <div className="cinematic__corner btm-right" />

          <div className="cinematic__datum-line top" />
          <div className="cinematic__datum-line bottom" />
          <div className="cinematic__datum-line left" />
          <div className="cinematic__datum-line right" />
        </div>

        {/* ── TOP-LEFT MICRO LABEL ──────────────────────────────── */}
        <div className="cinematic__header-bar">
          <div className="cinematic__micro-label">
            <span className="arch-number cinematic__num">10</span>
            <span className="cinematic__sep">/</span>
            <span className="arch-label cinematic__tag">DWARKAMAI</span>
          </div>

          <div className="cinematic__meta-tag">
            <span className="arch-label">ARCHITECTURAL STATEMENT</span>
          </div>
        </div>

        {/* ── TRAVELING ARCHITECTURAL DATUM & ORANGE POINT ──────── */}
        <div className="cinematic__motion-layer" aria-hidden="true">
          <svg className="cinematic__travel-svg" viewBox="0 0 1000 600" fill="none">
            <line x1="100" y1="500" x2="900" y2="100" stroke="#171613" strokeWidth="0.5" strokeOpacity="0.08" strokeDasharray="4 6" />
            <circle cx="500" cy="300" r="3.5" fill="#FF4A00" className="cinematic__travel-dot" />
          </svg>
        </div>

        {/* ── CENTERED STATEMENTS STAGE (1 AT A TIME) ───────────── */}
        <div className="cinematic__stage">
          {/* STATEMENT 01 */}
          <div className="stmt stmt--1">
            <h2 className="stmt__text text-hero">
              <span className="stmt__line">A HOME</span>
              <span className="stmt__line">ABOVE THE</span>
              <span className="stmt__line">ORDINARY.</span>
            </h2>
          </div>

          {/* STATEMENT 02 */}
          <div className="stmt stmt--2">
            <h2 className="stmt__text text-hero">
              <span className="stmt__line">DESIGNED</span>
              <span className="stmt__line">FOR EVERYDAY</span>
              <span className="stmt__line">LIVING.</span>
            </h2>
          </div>

          {/* STATEMENT 03 */}
          <div className="stmt stmt--3">
            <h2 className="stmt__text text-hero">
              <span className="stmt__line">LIGHT.</span>
              <span className="stmt__line">SPACE.</span>
              <span className="stmt__line">COMFORT.</span>
            </h2>
          </div>

          {/* STATEMENT 04 */}
          <div className="stmt stmt--4">
            <h2 className="stmt__text text-hero">
              <span className="stmt__line">ROOTED IN</span>
              <span className="stmt__line">SAWANTWADI.</span>
            </h2>
          </div>

          {/* STATEMENT 05 */}
          <div className="stmt stmt--5">
            <h2 className="stmt__text text-hero">
              <span className="stmt__line">CRAFTED WITH</span>
              <span className="stmt__line">INTENTION.</span>
            </h2>
          </div>

          {/* STATEMENT 06 (FINAL) */}
          <div className="stmt stmt--6">
            <div className="stmt__final-wrap">
              <h2 className="stmt__main-title text-hero">DWARKAMAI.</h2>
              <p className="stmt__subtitle arch-label">SAWANTWADI · SINDHUDURG</p>
            </div>
          </div>
        </div>

        {/* ── BOTTOM COORDINATE WATERMARK ───────────────────────── */}
        <div className="cinematic__footer-bar">
          <span className="arch-label cinematic__coord">15°53′48″ N · 73°49′14″ E</span>
          <div className="cinematic__progress-indicator">
            <span className="cinematic__progress-dot" />
          </div>
          <span className="arch-label cinematic__coord">MAHARASHTRA, INDIA</span>
        </div>
      </div>
    </section>
  );
}
