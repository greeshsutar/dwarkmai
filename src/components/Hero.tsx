import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

  // Scroll-controlled GSAP Timeline with smooth scrubbing
  useEffect(() => {
    if (!heroRef.current || !stageRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      renderCanvasFrame(TOTAL_FRAMES - 1);
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Initial UI entrance timeline (Only minimal top micro metadata & scroll indicator)
      const enterTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      enterTl
        .fromTo(
          '.hero__tech-frame',
          { opacity: 0 },
          { opacity: 1, duration: 1.2, delay: 0.1 }
        )
        .fromTo(
          ['.hero__meta-top', '.hero__scroll-indicator'],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
          '-=0.8'
        );

      // 2. Scroll-controlled animation pinning timeline
      // Pinned during progress, releases cleanly at 100%
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=160%',
        pin: true,
        scrub: 0.6, // Smooth responsive scrubbing
        anticipatePin: 1,
        onUpdate: (self) => {
          const rawIndex = self.progress * (TOTAL_FRAMES - 1);
          const targetIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.round(rawIndex))
          );

          if (targetIndex !== currentFrameRef.current) {
            currentFrameRef.current = targetIndex;
            requestAnimationFrame(() => {
              renderCanvasFrame(targetIndex);
            });
          }

          // Subtle opacity shift of scroll indicator as user starts scrolling
          if (self.progress > 0.08) {
            gsap.to('.hero__scroll-indicator', { opacity: 0, duration: 0.25, overwrite: 'auto' });
          } else {
            gsap.to('.hero__scroll-indicator', { opacity: 1, duration: 0.35, overwrite: 'auto' });
          }

          // Reveal completed brand identity ONLY at the final completed frame (progress > 0.88)
          if (self.progress > 0.88) {
            gsap.to('.hero__bottom-brand', { opacity: 1, y: 0, duration: 0.45, overwrite: 'auto' });
          } else {
            gsap.to('.hero__bottom-brand', { opacity: 0, y: 15, duration: 0.3, overwrite: 'auto' });
          }
        },
      });
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
    <section className="hero" id="hero" ref={heroRef} aria-label="Dwarkamai Architectural Presentation">
      {/* ── STAGE VIEWPORT (PINNED FULLSCREEN) ────────────────── */}
      <div className="hero__stage" ref={stageRef}>
        {/* ── ARCHITECTURAL ANIMATION CANVAS ─────────────────── */}
        <canvas
          ref={canvasRef}
          className="hero__canvas"
          aria-label="Dwarkamai architectural drawing to construction illustration scroll reveal"
        />

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
            <span className="arch-label">DWARKAMAI</span>
          </div>
          <div className="hero__meta-item hero__meta-coord">
            <span className="arch-label">15°53′48″ N &nbsp; 73°49′14″ E · FRONT ELEVATION</span>
          </div>
          <div className="hero__meta-item hero__meta-scale">
            <span className="arch-label">RESIDENTIAL · STILT + 6 FLOORS</span>
          </div>
        </div>

        {/* ── BOTTOM-LEFT EDITORIAL BRAND IDENTITY ────────────── */}
        <div className="hero__bottom-brand">
          <h1 className="hero__brand-title font-editorial">DWARKAMAI</h1>
          <div className="hero__brand-sub-wrap">
            <p className="hero__brand-loc arch-label">SAWANTWADI · SINDHUDURG</p>
            <p className="hero__brand-tagline arch-label">A HOME ABOVE THE ORDINARY</p>
          </div>
        </div>

        {/* ── BOTTOM-RIGHT / CENTER SCROLL INDICATOR ─────────── */}
        <div className="hero__scroll-indicator">
          <span className="hero__scroll-text arch-label">SCROLL TO EXPLORE</span>
          <div className="hero__scroll-line-track">
            <span className="hero__scroll-line-bar" />
          </div>
        </div>

        {/* ── MINIMAL ARCHITECTURAL LOADING STATE ────────────── */}
        {!isFirstFrameLoaded && (
          <div className="hero__loading" aria-live="polite">
            <div className="hero__loading-inner">
              <span className="hero__loading-title font-editorial">DWARKAMAI</span>
              <div className="hero__loading-bar-wrap">
                <div
                  className="hero__loading-bar"
                  style={{ width: `${Math.max(15, loadProgress)}%` }}
                />
              </div>
              <span className="hero__loading-label arch-label">01 / ARCHITECTURAL CANVAS</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
