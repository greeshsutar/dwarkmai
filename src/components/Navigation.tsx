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
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <>
      <nav className={`nav ${isScrolled ? 'nav--scrolled' : ''}`} id="navigation">
        <div className="nav__inner">
          <a href="#" className="nav__brand" aria-label="Darpan Constructions">
            <DarpanLogo className="nav__logo" style={{ height: '44px', width: 'auto' }} />
          </a>

          <div className="nav__links">
            {PROJECT.nav.map((item) => (
              <a key={item.number} href={item.href} className="nav__link">
                <span className="nav__link-label">{item.label}</span>
              </a>
            ))}
          </div>

          <a href="#enquiry" className="nav__cta">
            ENQUIRE <span className="arrow">&rarr;</span>
          </a>

          <button
            className={`nav__burger ${isMobileOpen ? 'nav__burger--active' : ''}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMobileOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__content">
          <div className="mobile-menu__header">
            <DarpanLogo style={{ height: '48px', width: 'auto' }} />
          </div>

          <div className="mobile-menu__links">
            {PROJECT.nav.map((item) => (
              <a
                key={item.number}
                href={item.href}
                className="mobile-menu__link"
                onClick={() => setIsMobileOpen(false)}
              >
                <span className="mobile-menu__link-label">{item.label}</span>
              </a>
            ))}
          </div>

          <div className="mobile-menu__footer">
            <a
              href="#enquiry"
              className="btn-primary"
              onClick={() => setIsMobileOpen(false)}
            >
              ENQUIRE NOW <span className="arrow">&rarr;</span>
            </a>

            <div className="mobile-menu__contact">
              {PROJECT.contact.phones.map((phone) => (
                <a key={phone} href={`tel:${phone}`} className="mobile-menu__phone">
                  {phone}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
