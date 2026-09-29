import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DarpanLogo from './DarpanLogo';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

// Eagerly import all 240 architectural sequence frames via Vite glob
const frameMap = import.meta.glob<string>(
  '../assets/hero-frames/*.webp',
  { eager: true, import: 'default' }
);

// Strictly numerical sorting (ezgif-frame-001.webp -> ezgif-frame-240.webp)
const frameUrls: string[] = Object.keys(frameMap)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((key) => frameMap[key]);

const TOTAL_FRAMES = frameUrls.length; // 240

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const brandIntroRef = useRef<HTMLDivElement>(null);
  const loadedImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef<number>(0);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Helper to find closest loaded frame if scrubbing ahead of network buffer
  const getClosestLoadedImage = useCallback((targetIdx: number): HTMLImageElement | null => {
    const images = loadedImagesRef.current;
    if (images[targetIdx]?.complete && images[targetIdx]?.naturalWidth) {
      return images[targetIdx];
    }
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = targetIdx - offset;
      if (prev >= 0 && images[prev]?.complete && images[prev]?.naturalWidth) {
        return images[prev];
      }
      const next = targetIdx + offset;
      if (next < TOTAL_FRAMES && images[next]?.complete && images[next]?.naturalWidth) {
        return images[next];
      }
    }
    return null;
  }, []);

  // High-DPI canvas render function with perfect background seamless blend
  const renderCanvasFrame = useCallback(
    (frameIdx: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const targetWidth = Math.round(rect.width * dpr);
      const targetHeight = Math.round(rect.height * dpr);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      // Fill canvas background with website warm ivory #F3EFE7
      ctx.fillStyle = '#F3EFE7';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const img = getClosestLoadedImage(frameIdx);
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const imgAspect = img.naturalWidth / img.naturalHeight; // 1920 / 1080 = 1.7778
      const canvasAspect = canvas.width / canvas.height;

      let renderW: number;
      let renderH: number;
      let offsetX: number;
      let offsetY: number;

      // Aspect ratio preservation (contain composition to never crop or distort architecture)
      if (canvasAspect > imgAspect) {
        renderH = canvas.height;
        renderW = renderH * imgAspect;
        offsetX = (canvas.width - renderW) / 2;
        offsetY = 0;
      } else {
        renderW = canvas.width;
        renderH = renderW / imgAspect;
        offsetX = 0;
        offsetY = (canvas.height - renderH) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    },
    [getClosestLoadedImage]
  );

  // Progressive preloading of all 240 WebP frames
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    loadedImagesRef.current = new Array(TOTAL_FRAMES).fill(null);

    // 1. Immediately prioritize and display Frame 0 (or Frame 239 for reduced motion)
    const initialIndex = prefersReducedMotion ? TOTAL_FRAMES - 1 : 0;
    const initialImg = new Image();
    initialImg.src = frameUrls[initialIndex];
    initialImg.onload = () => {
      loadedImagesRef.current[initialIndex] = initialImg;
      setIsFirstFrameLoaded(true);
      renderCanvasFrame(initialIndex);
    };

    // 2. Preload remaining frames progressively
    let loadedCount = 1;
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (i === initialIndex) continue;
      const img = new Image();
      img.src = frameUrls[i];
      img.onload = () => {
        loadedImagesRef.current[i] = img;
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (currentFrameRef.current === i) {
          renderCanvasFrame(i);
        }
      };
    }
  }, [renderCanvasFrame]);

  // Orchestrated Timeline: Automatic Brand Signature on Load + Scroll-driven Building Reveal
  useEffect(() => {
    if (!heroRef.current || !stageRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      renderCanvasFrame(TOTAL_FRAMES - 1);
      return;
    }

    const ctx = gsap.context(() => {
      // ══════════════════════════════════════════════════════════════
      // 1. AUTOMATIC TIME-BASED ENTRANCE ANIMATION (0.0s – 2.4s)
      // Architectural Datum draws → Darpan Logo emerges → Text reveals → EVERYTHING STAYS VISIBLE
      // ══════════════════════════════════════════════════════════════
      const entranceTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      if (brandIntroRef.current) {
        gsap.set(brandIntroRef.current, { opacity: 1, pointerEvents: 'none' });
      }

      gsap.set('.hero__brand-datum', { scaleX: 0, opacity: 0 });
      gsap.set('.hero__brand-datum .hero__datum-point', { scale: 0, opacity: 0 });
      gsap.set('.hero__brand-mark-wrap', { opacity: 0, y: 12 });
      gsap.set('.hero__brand-title', { opacity: 0, y: 10 });
      gsap.set('.hero__brand-quote', { opacity: 0, y: 10 });
      gsap.set('.hero__brand-geo', { opacity: 0, y: 8 });
      gsap.set('.hero__scroll-indicator', { opacity: 0, y: 8 });

      entranceTl
        // 0.0s – 0.6s: Technical frame and top coordinate bar materialize
        .fromTo(
          '.hero__tech-frame',
          { opacity: 0 },
          { opacity: 1, duration: 0.8, delay: 0.1 },
          0
        )
        .fromTo(
          '.hero__meta-top',
          { opacity: 0, y: -6 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.2
        )
        // 0.5s – 1.0s: Thin architectural datum line draws through the center
        .to(
          '.hero__brand-datum',
          { opacity: 1, scaleX: 1, duration: 0.55, ease: 'power2.inOut' },
          0.5
        )
        // 0.8s – 1.2s: Tiny orange registration point appears
        .to(
          '.hero__brand-datum .hero__datum-point',
          { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' },
          0.8
        )
        // 0.9s – 1.6s: Actual Darpan architectural logo reveals
        .to(
          '.hero__brand-mark-wrap',
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          0.9
        )
        // 1.4s – 2.0s: "DARPAN CONSTRUCTIONS" appears
        .to(
          '.hero__brand-title',
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          1.4
        )
        // 1.8s – 2.4s: Editorial quote "BUILDING WITH INTENTION.", location, & scroll indicator reveal
        .to(
          '.hero__brand-quote',
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          1.8
        )
        .to(
          '.hero__brand-geo',
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          2.0
        )
        .to(
          '.hero__scroll-indicator',
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          2.2
        );
        // NOTE: No exit animation! Everything stays permanently visible until user scrolls.

      // ══════════════════════════════════════════════════════════════
      // 2. SCROLL-DRIVEN TRANSITION: DARPAN → BUILDING CONSTRUCTION
      // ══════════════════════════════════════════════════════════════
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 1025px)',
          isTablet: '(min-width: 769px) and (max-width: 1024px)',
          isMobile: '(max-width: 768px)',
        },
        (context) => {
          const { isMobile, isTablet } = context.conditions as {
            isDesktop: boolean;
            isTablet: boolean;
            isMobile: boolean;
          };

          const scrollDistance = isMobile ? '+=180%' : isTablet ? '+=230%' : '+=290%';
          const scrubSpeed = isMobile ? 0.8 : 1.1;
          const frameState = { frame: 0 };

          const masterTl = gsap.timeline({
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: scrollDistance,
              pin: true,
              scrub: scrubSpeed,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // 0.00 → 0.15: Darpan composition lifts upward and exits as ONE cohesive group
          if (brandIntroRef.current) {
            masterTl.to(
              brandIntroRef.current,
              {
                y: -90,
                opacity: 0,
                duration: 0.15,
                ease: 'power2.inOut',
              },
              0.00
            );
          }

          // 0.00 → 1.00: Direct architectural building construction reveal scrubs smoothly
          masterTl.to(
            frameState,
            {
              frame: TOTAL_FRAMES - 1,
              ease: 'none',
              duration: 1.0,
              onUpdate: () => {
                const targetIndex = Math.min(
                  TOTAL_FRAMES - 1,
                  Math.max(0, Math.round(frameState.frame))
                );

                if (targetIndex !== currentFrameRef.current) {
                  currentFrameRef.current = targetIndex;
                  requestAnimationFrame(() => {
                    renderCanvasFrame(targetIndex);
                  });
                }
              },
            },
            0.00
          );
        }
      );
    }, heroRef);

    const handleResize = () => {
      renderCanvasFrame(currentFrameRef.current);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [renderCanvasFrame]);

  return (
    <section className="hero" id="hero" ref={heroRef} aria-label="Darpan Constructions — Dwarkamai Presentation">
      {/* ── STAGE VIEWPORT (PINNED FULLSCREEN) ────────────────── */}
      <div className="hero__stage" ref={stageRef}>
        {/* ── ARCHITECTURAL ANIMATION CANVAS ─────────────────── */}
        <canvas
          ref={canvasRef}
          className="hero__canvas"
          aria-label="Dwarkamai architectural drawing to construction illustration scroll reveal"
        />

        {/* ── 1. PERMANENT CENTRAL IDENTITY: DARPAN CONSTRUCTIONS ── */}
        <div className="hero__brand-intro" ref={brandIntroRef} aria-label="Darpan Constructions">
          <div className="hero__brand-inner">
            {/* Thin architectural datum line */}
            <div className="hero__brand-datum" aria-hidden="true">
              <span className="hero__datum-line left" />
              <span className="hero__datum-point" />
              <span className="hero__datum-line right" />
            </div>

            {/* Actual Darpan Architectural Logo Mark */}
            <div className="hero__brand-mark-wrap">
              <DarpanLogo variant="mark" color="#171613" className="hero__brand-mark" />
            </div>

            {/* Brand Title */}
            <h1 className="hero__brand-title">DARPAN CONSTRUCTIONS</h1>

            {/* Editorial Quote */}
            <p className="hero__brand-quote font-editorial">BUILDING WITH INTENTION.</p>

            {/* Location Tag */}
            <p className="hero__brand-geo arch-label">SAWANTWADI &nbsp;·&nbsp; SINDHUDURG</p>

            {/* Integrated Central Scroll Indicator */}
            <div className="hero__scroll-indicator" aria-label="Scroll to explore">
              <span className="hero__scroll-text arch-label">SCROLL TO EXPLORE</span>
              <div className="hero__scroll-arrow-wrap" aria-hidden="true">
                <span className="hero__scroll-stem" />
                <span className="hero__scroll-arrow">↓</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── TECHNICAL ARCHITECTURAL FRAME OVERLAY ───────────── */}
        <div className="hero__tech-frame" aria-hidden="true">
          {/* Subtle Grid Lines */}
          <div className="hero__frame-border top" />
          <div className="hero__frame-border bottom" />
          <div className="hero__frame-border left" />
          <div className="hero__frame-border right" />

          {/* Precision Corner Registration Marks */}
          <span className="hero__corner top-left" />
          <span className="hero__corner top-right" />
          <span className="hero__corner bottom-left" />
          <span className="hero__corner bottom-right" />

          {/* Central Orange Registration Point (#FF4A00) */}
          <div className="hero__datum-mark">
            <span className="hero__datum-dot" />
            <span className="hero__datum-cross" />
          </div>
        </div>

        {/* ── TOP EDITORIAL METADATA BAR ─────────────────────── */}
        <div className="hero__meta-top">
          <div className="hero__meta-item">
            <span className="hero__meta-num">01</span>
            <span className="hero__meta-sep">/</span>
            <span className="arch-label">DARPAN CONSTRUCTIONS</span>
          </div>
          <div className="hero__meta-item hero__meta-coord">
            <span className="arch-label">15°53′48″ N &nbsp; 73°49′14″ E · FRONT ELEVATION</span>
          </div>
          <div className="hero__meta-item hero__meta-scale">
            <span className="arch-label">RESIDENTIAL · STILT + 6 FLOORS</span>
          </div>
        </div>

        {/* ── MINIMAL ARCHITECTURAL LOADING STATE ────────────── */}
        {!isFirstFrameLoaded && (
          <div className="hero__loading" aria-live="polite">
            <div className="hero__loading-inner">
              <span className="hero__loading-title font-editorial">DARPAN</span>
              <div className="hero__loading-bar-wrap">
                <div
                  className="hero__loading-bar"
                  style={{ width: `${Math.max(15, loadProgress)}%` }}
                />
              </div>
              <span className="hero__loading-label arch-label">DARPAN CONSTRUCTIONS // DWARKAMAI</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
