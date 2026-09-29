import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECT } from '../data/project';
import './DwarkamaiReveal.css';

gsap.registerPlugin(ScrollTrigger);

// Eagerly import all 240 processed transparent frames via Vite glob
const frameMap = import.meta.glob<string>(
  '../assets/frames-processed/*.webp',
  { eager: true, import: 'default' }
);

// Sort frames strictly numerically (ezgif-frame-001.webp -> ezgif-frame-240.webp)
const frameUrls: string[] = Object.keys(frameMap)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((key) => frameMap[key]);

const TOTAL_FRAMES = frameUrls.length; // 240

export default function DwarkamaiReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loadedImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef<number>(0);
  const isReducedMotion = useRef<boolean>(false);

  // Helper to find closest loaded frame if target frame is buffering
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

  // High-DPI canvas render function — large, seamless, bottom-anchored artwork on #F3EFE7
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

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const img = getClosestLoadedImage(frameIdx);
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const imgAspect = img.naturalWidth / img.naturalHeight; // 1080 / 1920
      const canvasAspect = canvas.width / canvas.height;

      let renderW: number;
      let renderH: number;
      let offsetX: number;
      let offsetY: number;

      // Scale building so it stands taller and larger in the viewport
      const scaleFactor = 1.15;
      if (canvasAspect > imgAspect) {
        renderH = canvas.height * scaleFactor;
        renderW = renderH * imgAspect;
        offsetX = (canvas.width - renderW) / 2;
        offsetY = canvas.height - renderH;
      } else {
        renderW = canvas.width * scaleFactor;
        renderH = renderW / imgAspect;
        offsetX = (canvas.width - renderW) / 2;
        offsetY = canvas.height - renderH;
      }

      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    },
    [getClosestLoadedImage]
  );

  // Progressive frame preloading
  useEffect(() => {
    isReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    loadedImagesRef.current = new Array(TOTAL_FRAMES).fill(null);

    // 1. Prioritize Frame 0
    const firstImg = new Image();
    firstImg.src = frameUrls[0];
    firstImg.onload = () => {
      loadedImagesRef.current[0] = firstImg;
      renderCanvasFrame(0);
    };

    // 2. Preload remaining frames
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameUrls[i];
      img.onload = () => {
        loadedImagesRef.current[i] = img;
        if (currentFrameRef.current === i) {
          renderCanvasFrame(i);
        }
      };
    }
  }, [renderCanvasFrame]);

  // GSAP ScrollTrigger setup with responsive matchMedia and pinned scroll scrubbing
  useEffect(() => {
    if (!sectionRef.current) return;

    if (isReducedMotion.current) {
      renderCanvasFrame(TOTAL_FRAMES - 1);
      return;
    }

    const ctx = gsap.context(() => {
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

          const scrollDistance = isMobile ? '+=120%' : isTablet ? '+=150%' : '+=180%';
          const scrubSpeed = isMobile ? 0.3 : 0.5;

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: scrollDistance,
            pin: true,
            scrub: scrubSpeed,
            anticipatePin: 1,
            invalidateOnRefresh: true,
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
            },
          });
        }
      );
    }, sectionRef);

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
    <section
      className="reveal-canvas-section"
      ref={sectionRef}
      id="reveal"
      aria-label="Dwarkamai Architectural Editorial Presentation"
    >
      <div className="reveal-canvas-inner">
        <div className="reveal-canvas-grid">
          {/* ── LEFT 50%: MASSIVE ARCHITECTURAL ARTWORK (NO CARD, NO BOX, SEAMLESS CANVAS) ── */}
          <div className="reveal-canvas-left">
            <canvas
              ref={canvasRef}
              className="reveal-building-canvas"
              aria-label="Dwarkamai architectural color and material scroll reveal"
            />
          </div>

          {/* ── VERTICAL ARCHITECTURAL DIVIDER ── */}
          <div className="reveal-canvas-divider" aria-hidden="true" />

          {/* ── RIGHT 50%: STABLE EDITORIAL COMPOSITION ── */}
          <div className="reveal-canvas-right">
            <div className="reveal-editorial-inner">
              {/* Header Section Marker */}
              <div className="reveal-editorial-header">
                <span className="arch-number">01</span>
                <div className="arch-divider reveal-header-line" />
                <span className="arch-label">ARCHITECTURE</span>
              </div>

              {/* Main Typography */}
              <div className="reveal-editorial-main">
                <h2 className="reveal-editorial-title text-hero">
                  {PROJECT.name}
                </h2>
                <p className="reveal-editorial-tagline">
                  A HOME ABOVE THE ORDINARY.
                </p>
                <p className="reveal-editorial-body text-body">
                  An architectural expression shaped by proportion, light and everyday living.
                  As the structure unfolds, materials and textures harmonize with
                  Sawantwadi&apos;s natural landscape.
                </p>
              </div>

              {/* Architectural CTA Button */}
              <div className="reveal-editorial-cta-wrap">
                <a href="#residences" className="reveal-editorial-cta">
                  <span>EXPLORE RESIDENCES</span>
                  <span className="reveal-cta-arrow">→</span>
                </a>
              </div>
            </div>

            {/* Bottom Metadata Grid Bar */}
            <div className="reveal-bottom-grid">
              <div className="reveal-grid-cell">
                <span className="reveal-cell-label">LOCATION</span>
                <span className="reveal-cell-val">{PROJECT.location.area}, {PROJECT.location.district}</span>
              </div>
              <div className="reveal-grid-cell">
                <span className="reveal-cell-label">TYPOLOGY</span>
                <span className="reveal-cell-val">01 &amp; 02 BHK RESIDENCES</span>
              </div>
              <div className="reveal-grid-cell">
                <span className="reveal-cell-label">SCALE</span>
                <span className="reveal-cell-val">01.13 ACRES · STILT+6</span>
              </div>
              <div className="reveal-grid-cell">
                <span className="reveal-cell-label">RERA</span>
                <span className="reveal-cell-val">{PROJECT.contact.rera}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
