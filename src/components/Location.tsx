import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECT } from '../data/project';
import locationPhoto from '../assets/images/image.png';
import './Location.css';

gsap.registerPlugin(ScrollTrigger);

const CONNECTIVITY_ITEMS = [
  {
    number: '01',
    category: 'Sawantwadi City Centre',
    label: 'Local Connectivity',
  },
  {
    number: '02',
    category: 'Schools',
    label: 'Educational Access',
  },
  {
    number: '03',
    category: 'Hospitals',
    label: 'Healthcare Access',
  },
  {
    number: '04',
    category: 'Markets',
    label: 'Everyday Convenience',
  },
  {
    number: '05',
    category: 'Transportation',
    label: 'Regional Connectivity',
  },
];

export default function Location() {
  const sectionRef = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const mapSvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // 0.00: Section Tag & Top Rule
      tl.fromTo(
        '.location__section-tag',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
      .fromTo(
        '.location__vertical-guide',
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 0.7, ease: 'power3.out' },
        '<0.1'
      )

      // 0.10 - 0.26: Line-by-Line Editorial Heading Reveal (Wave feeling)
      .fromTo(
        '.location__heading-line-1',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
        '<0.1'
      )
      .fromTo(
        '.location__heading-line-2',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
        '<0.12'
      )
      .fromTo(
        '.location__heading-line-3',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
        '<0.12'
      )

      // 0.40: Paragraph & Coordinates
      .fromTo(
        '.location__description',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        '.location__cta-wrap',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.35'
      )
      .fromTo(
        '.location__coordinates-strip',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        '-=0.3'
      );

      // 0.65: Architectural Map Geometry & Progressive Line Drawing
      if (mapSvgRef.current) {
        tl.fromTo(
          mapSvgRef.current.querySelectorAll('.location__map-road, .location__map-contour'),
          { opacity: 0, strokeDashoffset: 180 },
          { opacity: 1, strokeDashoffset: 0, duration: 1.1, stagger: 0.04, ease: 'power2.out' },
          '-=0.5'
        )
        // 0.85: Radius Geometry Expanding Outward
        .fromTo(
          mapSvgRef.current.querySelectorAll('.location__map-radius'),
          { opacity: 0, scale: 0.8, transformOrigin: '350px 390px' },
          { opacity: 1, scale: 1, duration: 0.85, stagger: 0.1, ease: 'back.out(1.4)' },
          '-=0.7'
        )
        // 1.00: Location Marker & Badge
        .fromTo(
          mapSvgRef.current.querySelector('.location__map-pin-dot'),
          { scale: 0, opacity: 0, transformOrigin: '350px 390px' },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.5)' },
          '-=0.4'
        )
        .fromTo(
          mapSvgRef.current.querySelector('.location__map-pin-pulse'),
          { scale: 0.4, opacity: 0, transformOrigin: '350px 390px' },
          { scale: 1, opacity: 0.7, duration: 0.6, ease: 'power2.out' },
          '<'
        )
        .fromTo(
          mapSvgRef.current.querySelector('.location__map-badge'),
          { opacity: 0, y: 8, scale: 0.95, transformOrigin: '410px 340px' },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.2'
        )
        .fromTo(
          mapSvgRef.current.querySelectorAll('.location__map-annotation'),
          { opacity: 0 },
          { opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out' },
          '-=0.4'
        );
      }

      // 1.15: Connectivity Rows Reveal One by One
      tl.fromTo(
        '.location__conn-row',
        { opacity: 0, x: 20, y: 10 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.9'
      );

      // 1.25: Landscape Image Smooth Mask Reveal (Right → Left)
      if (imageWrapRef.current) {
        gsap.fromTo(
          imageWrapRef.current,
          {
            clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
            webkitClipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
          },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            webkitClipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 1.3,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'top 15%',
              scrub: 0.6,
            },
          }
        );
      }

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.08 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'top 15%',
              scrub: 0.6,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="location section--large" id="location" ref={sectionRef} aria-label="Section 08 — Location">
      <div className="container location__container">
        {/* Continuous Panoramic Architectural Location Board */}
        <div className="location__board" ref={boardRef}>
          {/* Subtle Decorative Left Vertical Guideline */}
          <div className="location__vertical-guide" aria-hidden="true" />

          {/* ══════════════════════════════════════════════════════════
              LEFT: EDITORIAL STATEMENT & DETAILS
              ══════════════════════════════════════════════════════════ */}
          <div className="location__editorial-pane">
            <div className="location__section-tag">
              <span className="arch-number">08</span>
              <div className="arch-divider location__tag-divider" />
              <span className="arch-label">LOCATION</span>
            </div>

            <div className="location__heading-wrap">
              <h2 className="location__heading" ref={titleRef}>
                <span className="location__heading-line location__heading-line-1">
                  Well Connected
                </span>
                <span className="location__heading-line location__heading-line-2">
                  Naturally <span className="location__heading-italic">Peaceful.</span>
                </span>
              </h2>

              <p className="location__description text-body">
                Located in Sawantwadi, Dwarkamai offers a considered setting close to essential conveniences, while remaining connected to the natural character of the region.
              </p>

              <div className="location__cta-wrap">
                <a
                  href={`https://maps.google.com/?q=${PROJECT.location.coordinates.lat},${PROJECT.location.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location__cta-btn"
                  aria-label="View Dwarkamai on Google Maps"
                >
                  <span>View on Map</span>
                  <span className="location__cta-arrow">→</span>
                </a>
              </div>
            </div>

            {/* Bottom Technical Coordinates Strip */}
            <div className="location__coordinates-strip">
              <div className="location__coord-col">
                <span className="location__coord-label">LATITUDE / LONGITUDE</span>
                <span className="location__coord-value font-editorial">15°53′48.1″ N · 73°49′13.9″ E</span>
              </div>
              <div className="location__coord-col">
                <span className="location__coord-label">DECIMAL COORDINATES</span>
                <span className="location__coord-value font-editorial">{PROJECT.location.coordinates.lat}, {PROJECT.location.coordinates.lng}</span>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              CENTER: REFINED ARCHITECTURAL MAP STUDY
              ══════════════════════════════════════════════════════════ */}
          <div className="location__map-pane">
            <svg
              ref={mapSvgRef}
              viewBox="0 0 700 700"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="location__map-svg"
              aria-label="Dwarkamai Architectural Site Map"
            >
              <defs>
                <radialGradient id="mapVignette" cx="50%" cy="50%" r="50%">
                  <stop offset="60%" stopColor="#F3EFE7" stopOpacity="0" />
                  <stop offset="100%" stopColor="#F3EFE7" stopOpacity="0.85" />
                </radialGradient>
                <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#171613" floodOpacity="0.08" />
                </filter>
              </defs>

              {/* ── Background Coordinate & Contour Grid ── */}
              <g className="location__map-grid" opacity="0.4">
                <line x1="80" y1="120" x2="620" y2="120" stroke="#171613" strokeWidth="0.5" strokeDasharray="3 4" />
                <line x1="80" y1="280" x2="620" y2="280" stroke="#171613" strokeWidth="0.5" strokeDasharray="3 4" />
                <line x1="80" y1="440" x2="620" y2="440" stroke="#171613" strokeWidth="0.5" strokeDasharray="3 4" />
                <line x1="80" y1="600" x2="620" y2="600" stroke="#171613" strokeWidth="0.5" strokeDasharray="3 4" />
                <line x1="140" y1="60" x2="140" y2="640" stroke="#171613" strokeWidth="0.5" strokeDasharray="3 4" />
                <line x1="300" y1="60" x2="300" y2="640" stroke="#171613" strokeWidth="0.5" strokeDasharray="3 4" />
                <line x1="460" y1="60" x2="460" y2="640" stroke="#171613" strokeWidth="0.5" strokeDasharray="3 4" />
                <line x1="620" y1="60" x2="620" y2="640" stroke="#171613" strokeWidth="0.5" strokeDasharray="3 4" />
              </g>

              {/* ── Faint Topographic Contour Curves ── */}
              <path className="location__map-contour" d="M 60 160 Q 240 120 400 170 T 640 130" stroke="#171613" strokeWidth="0.75" strokeOpacity="0.18" strokeDasharray="4 4" />
              <path className="location__map-contour" d="M 60 260 Q 200 310 440 250 T 640 290" stroke="#171613" strokeWidth="0.75" strokeOpacity="0.16" strokeDasharray="4 4" />
              <path className="location__map-contour" d="M 60 480 Q 280 420 480 500 T 640 450" stroke="#171613" strokeWidth="0.75" strokeOpacity="0.18" strokeDasharray="4 4" />
              <path className="location__map-contour" d="M 60 610 Q 310 660 500 590 T 640 630" stroke="#171613" strokeWidth="0.75" strokeOpacity="0.16" strokeDasharray="4 4" />

              {/* ── Moti Talao Lake Water Polygon ── */}
              <path
                d="M 220 440 Q 250 410 290 420 Q 330 430 340 470 Q 330 520 280 510 Q 230 500 220 440 Z"
                stroke="#171613"
                strokeWidth="0.8"
                strokeOpacity="0.3"
                fill="#171613"
                fillOpacity="0.04"
              />
              <text x="280" y="468" textAnchor="middle" className="location__map-annotation" fill="#77736C" fontSize="8.5" fontFamily="Manrope" fontWeight="600" letterSpacing="0.14em">
                MOTI TALAO
              </text>

              {/* ── Delicate Architectural Road Network ── */}
              <path className="location__map-road" d="M 500 50 Q 490 250 470 430 T 450 650" stroke="#171613" strokeWidth="1.4" strokeOpacity="0.45" />
              <path d="M 500 50 Q 490 250 470 430 T 450 650" stroke="#F3EFE7" strokeWidth="0.7" strokeDasharray="3 3" />
              <text x="515" y="140" className="location__map-annotation" fill="#77736C" fontSize="8.5" fontFamily="Manrope" fontWeight="700" letterSpacing="0.12em">
                NH-66 HIGHWAY
              </text>

              <path className="location__map-road" d="M 80 370 L 620 370" stroke="#171613" strokeWidth="1.1" strokeOpacity="0.4" />
              <path className="location__map-road" d="M 350 100 L 350 620" stroke="#171613" strokeWidth="1.1" strokeOpacity="0.4" />
              <path className="location__map-road" d="M 160 200 L 460 520" stroke="#171613" strokeWidth="0.8" strokeOpacity="0.3" />
              <path className="location__map-road" d="M 200 580 L 480 260" stroke="#171613" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="4 3" />

              {/* ── Railway Corridor ── */}
              <path className="location__map-road" d="M 110 640 Q 140 460 160 280 T 190 70" stroke="#171613" strokeWidth="1.2" strokeOpacity="0.35" strokeDasharray="5 4" />
              <circle cx="150" cy="310" r="3" fill="#171613" />
              <text x="140" y="306" textAnchor="end" className="location__map-annotation" fill="#24231F" fontSize="8" fontFamily="Manrope" fontWeight="600" letterSpacing="0.08em">
                SAWANTWADI STATION
              </text>

              {/* ── Concentric Range Radii Around Dwarkamai Site (Center: 350, 370) ── */}
              <circle cx="350" cy="370" r="55" stroke="#FF4A00" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="3 3" className="location__map-radius" />
              <circle cx="350" cy="370" r="120" stroke="#171613" strokeWidth="0.6" strokeOpacity="0.22" strokeDasharray="4 4" className="location__map-radius" />
              <circle cx="350" cy="370" r="195" stroke="#171613" strokeWidth="0.5" strokeOpacity="0.16" strokeDasharray="5 5" className="location__map-radius" />
              <circle cx="350" cy="370" r="270" stroke="#171613" strokeWidth="0.45" strokeOpacity="0.1" strokeDasharray="6 6" className="location__map-radius" />

              {/* ── Dwarkamai Pin Point & Floating Badge ── */}
              <circle cx="350" cy="370" r="16" stroke="#FF4A00" strokeWidth="1" strokeOpacity="0.4" fill="#FF4A00" fillOpacity="0.12" className="location__map-pin-pulse" />
              <circle cx="350" cy="370" r="4.5" fill="#FF4A00" className="location__map-pin-dot" />
              <circle cx="350" cy="370" r="1.5" fill="#F3EFE7" />

              {/* Connecting leader line */}
              <line x1="350" y1="355" x2="350" y2="310" stroke="#171613" strokeWidth="0.8" strokeOpacity="0.4" />
              <line x1="350" y1="310" x2="385" y2="310" stroke="#171613" strokeWidth="0.8" strokeOpacity="0.4" />

              {/* Architectural Floating Badge */}
              <g className="location__map-badge" filter="url(#badgeShadow)">
                <rect x="390" y="290" width="130" height="42" rx="3" fill="#FFFFFF" stroke="#171613" strokeWidth="0.5" strokeOpacity="0.15" />
                <text x="402" y="308" fill="#171613" fontSize="11" fontFamily="Manrope" fontWeight="700" letterSpacing="0.04em">
                  Dwarkamai
                </text>
                <text x="402" y="322" fill="#77736C" fontSize="9" fontFamily="Manrope" fontWeight="500" letterSpacing="0.06em">
                  Sawantwadi
                </text>
                <circle cx="504" cy="311" r="3" fill="#FF4A00" />
              </g>

              {/* Vignette Overlay for Seamless Canvas Edge Integration */}
              <rect x="0" y="0" width="700" height="700" fill="url(#mapVignette)" pointerEvents="none" />
            </svg>
          </div>

          {/* ══════════════════════════════════════════════════════════
              RIGHT: CONNECTIVITY LIST & SAWANTWADI LANDSCAPE PHOTO
              ══════════════════════════════════════════════════════════ */}
          <div className="location__right-pane">
            {/* Compact Connectivity List */}
            <div className="location__connectivity-section">
              <div className="location__conn-heading-row">
                <span className="arch-label">CONNECTIVITY &amp; ACCESS</span>
                <span className="location__accent-mini" aria-hidden="true" />
              </div>

              <div className="location__conn-list">
                {CONNECTIVITY_ITEMS.map((item) => (
                  <div key={item.number} className="location__conn-row">
                    <div className="location__conn-icon-wrap">
                      <svg viewBox="0 0 20 20" fill="none" className="location__conn-target-icon">
                        <circle cx="10" cy="10" r="7" stroke="#171613" strokeWidth="0.8" strokeOpacity="0.4" />
                        <circle cx="10" cy="10" r="2.5" fill="#FF4A00" />
                      </svg>
                    </div>

                    <div className="location__conn-info">
                      <span className="location__conn-name">{item.category}</span>
                      <span className="location__conn-sub">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sawantwadi Regional Landscape Photograph */}
            <div className="location__photo-section">
              <div className="location__photo-frame" ref={imageWrapRef}>
                <img
                  ref={imageRef}
                  src={locationPhoto}
                  alt="Sawantwadi Landscape and Lake Setting Surrounding Dwarkamai"
                  className="location__photo-img"
                  loading="lazy"
                />

                {/* Inset Vignette & Technical Coordinates Overlay */}
                <div className="location__photo-overlay">
                  <div className="location__photo-stamp">
                    <span className="location__stamp-city">SAWANTWADI</span>
                    <span className="location__stamp-region">Sindhudurg · Maharashtra</span>
                    <span className="location__stamp-coord font-editorial">15.896685, 73.820534</span>
                  </div>

                  {/* Architectural Pin/Compass Tag */}
                  <div className="location__photo-pin-tag" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" className="location__photo-pin-svg">
                      <circle cx="12" cy="12" r="9" stroke="#171613" strokeWidth="1" strokeOpacity="0.5" fill="#F3EFE7" />
                      <polygon points="12,6 14.5,14 12,12.5 9.5,14" fill="#FF4A00" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
