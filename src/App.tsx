import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import DwarkamaiReveal from './components/DwarkamaiReveal';
import Experience from './components/Experience';
import Vision from './components/Vision';
import Architecture from './components/Architecture';
import Residences from './components/Residences';
import Location from './components/Location';
import Developer from './components/Developer';
import FinalStatement from './components/FinalStatement';
import Enquiry from './components/Enquiry';
import Footer from './components/Footer';
import 'lenis/dist/lenis.css';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app">
      <Navigation />
      <main>
        <Hero />
        <DwarkamaiReveal />
        <Experience />
        <Vision />
        <Architecture />
        <Residences />
        <Location />
        <Developer />
        <FinalStatement />
        <Enquiry />
      </main>
      <Footer />
    </div>
  );
}

export default App;

