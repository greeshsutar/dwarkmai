import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import morningImg from '../assets/images/image1 copy.png';
import dayImg from '../assets/images/image2copy.png';
import eveningImg from '../assets/images/image3copy.png';
import nightImg from '../assets/images/image4copy.png';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    num: '01',
    category: 'MORNING',
    title: ['A QUIET', 'BEGINNING.'],
    desc: 'Soft light, open balconies and the slower rhythm of a new day.',
    tag: 'MORNING LIGHT',
    coord: 'DAILY LIVING',
    image: morningImg,
    alt: 'Dwarkamai — Morning soft light and open balconies in Sawantwadi',
  },
  {
    num: '02',
    category: 'DAY',
    title: ['ROOM TO', 'LIVE.'],
    desc: 'Spaces shaped around the everyday moments that make a home feel lived in.',
    tag: 'DAYLIGHT SPACES',
    coord: 'SPATIAL FLOW',
    image: dayImg,
    alt: 'Dwarkamai — Daytime residential living spaces and natural ventilation',
  },
  {
    num: '03',
    category: 'EVENING',
    title: ['WHEN THE', 'DAY SLOWS.'],
    desc: 'Warm light, open views and time that feels a little less hurried.',
    tag: 'WARM LIGHT',
    coord: 'EVENING ATMOSPHERE',
    image: eveningImg,
    alt: 'Dwarkamai — Warm evening light and open balcony views',
  },
  {
    num: '04',
    category: 'NIGHT',
    title: ['A QUIET PLACE', 'TO RETURN.'],
    desc: 'Come back to a home designed around comfort, calm and everyday living.',
    tag: 'DUSK STILLNESS',
    coord: 'QUIET RETURN',
    image: nightImg,
    alt: 'Dwarkamai — Nighttime calm and peaceful residential environment',
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 861px)', () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

        gsap.to(track, {
          x: getScrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 0.1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="experience" id="experience" ref={sectionRef} aria-label="Dwarkamai Lifestyle Experience">
      {/* ── SECTION HEADER ────────────────────────────────────── */}
      <div className="container">
        <div className="experience__header">
          <div className="experience__header-label">
            <span className="arch-number">04</span>
            <div className="arch-divider experience__header-divider" />
            <span className="arch-label">EXPERIENCE</span>
          </div>

          <div className="experience__header-text">
            <h2 className="experience__title text-display">
              LIFE, FROM<br />MORNING TO NIGHT.
            </h2>
            <p className="experience__tagline text-body">
              A visual sequence tracing the natural rhythm of everyday living at Dwarkamai.
            </p>
          </div>
        </div>
      </div>

      {/* ── HORIZONTAL MOVING CARDS VIEWPORT & TRACK ──────────── */}
      <div className="experience__viewport">
        <div className="experience__track" ref={trackRef}>
          {CARDS.map((card) => (
            <article
              key={card.num}
              className="experience__card"
            >
              {/* Card Top Technical Bar */}
              <div className="experience__card-top">
                <div className="experience__card-meta">
                  <span className="experience__card-num">{card.num}</span>
                  <span className="experience__card-category">{card.category}</span>
                </div>
                <span className="experience__accent-marker" aria-hidden="true" />
              </div>

              {/* Card Typography */}
              <div className="experience__card-heading-wrap">
                <h3 className="experience__card-title">
                  {card.title[0]}<br />{card.title[1]}
                </h3>
                <p className="experience__card-desc text-body">
                  {card.desc}
                </p>
              </div>

              {/* Card Photographic Image (3:4 Aspect Ratio) */}
              <div className="experience__visual-area">
                <div className="experience__visual-header" aria-hidden="true">
                  <span className="arch-label">{card.tag}</span>
                  <span className="arch-label">{card.coord}</span>
                </div>

                <div className="experience__image-box">
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="experience__image"
                    loading="lazy"
                  />
                </div>

                <div className="experience__visual-footer" aria-hidden="true">
                  <span className="arch-label">DWARKAMAI · SAWANTWADI</span>
                  <span className="arch-label">{card.num}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


