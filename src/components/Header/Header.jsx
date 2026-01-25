import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { siteData } from '../../data/siteData';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo(logoRef.current, 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(navRef.current?.children || [],
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      '-=0.4'
    );
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          opacity: 1,
          visibility: 'visible',
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.fromTo(mobileMenuRef.current.querySelectorAll('.mobile-nav-item'),
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          visibility: 'hidden',
          duration: 0.3,
          ease: 'power2.in'
        });
      }
    }
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header 
        ref={headerRef}
        className={`header ${isScrolled ? 'header--scrolled' : ''} ${isMobileMenuOpen ? 'header--menu-open' : ''}`}
      >
        <div className="header__container">
          {/* Logo */}
          <Link to="/" className="header__logo" ref={logoRef}>
            <span className="header__logo-text">CONCLA</span>
            <span className="header__logo-y">Y</span>
            <span className="header__logo-text">VE</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="header__nav" ref={navRef}>
            {siteData.navigation.primary.map((item) => (
              <NavLink
                key={item.id}
                to={item.url}
                className={({ isActive }) => 
                  `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className={`header__menu-toggle ${isMobileMenuOpen ? 'header__menu-toggle--active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="header__menu-line"></span>
            <span className="header__menu-line"></span>
            <span className="header__menu-line"></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        ref={mobileMenuRef}
        className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu--open' : ''}`}
      >
        <nav className="mobile-menu__nav">
          {siteData.navigation.primary.map((item) => (
            <NavLink
              key={item.id}
              to={item.url}
              className="mobile-nav-item"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mobile-menu__footer">
          <p className="mobile-menu__tagline">{siteData.brand.tagline}</p>
        </div>
      </div>
    </>
  );
};

export default Header;
