import { useState, useEffect } from 'react';
import { PROJECT } from '../data/project';
import DarpanLogo from './DarpanLogo';
import './Navigation.css';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // Keyboard accessibility: Close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen]);

  return (
    <>
      <nav
        className={`nav ${isScrolled ? 'nav--scrolled' : ''} ${isMobileOpen ? 'nav--menu-open' : ''}`}
        id="navigation"
        aria-label="Main Navigation"
      >
        <div className="nav__inner">
          <a href="#" className="nav__brand" aria-label="Darpan Constructions — Dwarkamai Home">
            <DarpanLogo className="nav__logo" style={{ height: '40px', width: 'auto' }} />
            <div className="nav__brand-text">
              <span className="nav__brand-title font-editorial">DWARKAMAI</span>
              <span className="nav__brand-sub">DARPAN</span>
            </div>
          </a>

          <div className="nav__links">
            {PROJECT.nav.map((item) => (
              <a key={item.number} href={item.href} className="nav__link">
                <span className="nav__link-label">{item.label}</span>
              </a>
            ))}
          </div>

          <div className="nav__actions">
            <a href="#enquiry" className="nav__cta">
              ENQUIRE <span className="arrow">&rarr;</span>
            </a>

            <button
              className={`nav__burger ${isMobileOpen ? 'nav__burger--active' : ''}`}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu-overlay"
            >
              <span className="nav__burger-line"></span>
              <span className="nav__burger-line"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu-overlay"
        className={`mobile-menu ${isMobileOpen ? 'mobile-menu--open' : ''}`}
        aria-hidden={!isMobileOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div className="mobile-menu__content">
          <div className="mobile-menu__header">
            <DarpanLogo style={{ height: '42px', width: 'auto' }} />
            <div className="mobile-menu__brand-meta">
              <span className="mobile-menu__project-name font-editorial">DWARKAMAI</span>
              <span className="mobile-menu__project-loc arch-label">SAWANTWADI · SINDHUDURG</span>
            </div>
          </div>

          <nav className="mobile-menu__links" aria-label="Mobile links">
            {PROJECT.nav.map((item) => (
              <a
                key={item.number}
                href={item.href}
                className="mobile-menu__link"
                onClick={() => setIsMobileOpen(false)}
              >
                <span className="mobile-menu__link-num">{item.number}</span>
                <span className="mobile-menu__link-label">{item.label}</span>
                <span className="mobile-menu__link-arrow" aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </nav>

          <div className="mobile-menu__footer">
            <a
              href="#enquiry"
              className="btn-primary mobile-menu__cta-btn"
              onClick={() => setIsMobileOpen(false)}
            >
              ENQUIRE NOW <span className="arrow">&rarr;</span>
            </a>

            <div className="mobile-menu__contact">
              <span className="arch-label mobile-menu__contact-title">DIRECT INQUIRIES</span>
              <div className="mobile-menu__phones">
                {PROJECT.contact.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone}`} className="mobile-menu__phone font-editorial">
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
