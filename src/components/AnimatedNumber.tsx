import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedNumberProps {
  value: string;
  className?: string;
}

export default function AnimatedNumber({ value, className = '' }: AnimatedNumberProps) {
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Find all numbers in the value string
    const match = value.match(/(\d+(\.\d+)?)/g);
    if (!match || match.length === 0) return;

    const num1 = parseFloat(match[0]);
    const num2 = match[1] ? parseFloat(match[1]) : null;

    const isDecimal1 = match[0].includes('.');
    const decimals1 = isDecimal1 ? match[0].split('.')[1].length : 0;
    const pad1 = match[0].startsWith('0') && !isDecimal1 ? match[0].length : 0;
    const padDec1 = match[0].startsWith('0') && isDecimal1;

    const isDecimal2 = num2 !== null && match[1].includes('.');
    const decimals2 = isDecimal2 ? match[1].split('.')[1].length : 0;
    const pad2 = num2 !== null && match[1].startsWith('0') && !isDecimal2 ? match[1].length : 0;

    const obj = {
      val1: num1 > 1900 ? num1 - 20 : 0, // for years like 2027, start from 2007
      val2: 0,
    };

    const formatNum = (v: number, dec: number, pad: number, isPadDec: boolean) => {
      let s = v.toFixed(dec);
      if (isPadDec && v < 10) {
        s = '0' + s;
      } else if (pad > 0) {
        s = Math.round(v).toString().padStart(pad, '0');
      }
      return s;
    };

    const updateText = () => {
      let res = value;
      const s1 = formatNum(obj.val1, decimals1, pad1, padDec1);
      if (num2 !== null) {
        const s2 = formatNum(obj.val2, decimals2, pad2, false);
        // Replace in order
        res = res.replace(match[0], s1);
        res = res.replace(match[1], s2);
      } else {
        res = res.replace(match[0], s1);
      }
      if (el) el.textContent = res;
    };

    updateText();

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      toggleActions: 'play none none reverse',
      onEnter: () => {
        gsap.to(obj, {
          val1: num1,
          val2: num2 || 0,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: updateText,
        });
      },
      onLeaveBack: () => {
        obj.val1 = num1 > 1900 ? num1 - 20 : 0;
        obj.val2 = 0;
        updateText();
      },
    });

    return () => {
      st.kill();
    };
  }, [value]);

  return (
    <span ref={elRef} className={`animated-number ${className}`}>
      {value}
    </span>
  );
}
