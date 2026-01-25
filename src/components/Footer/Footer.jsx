import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { siteData } from '../../data/siteData';
import './Footer.css';

const Footer = () => {
  const footerRef = useRef(null);

  // Removed GSAP ScrollTrigger to ensure footer is ALWAYS visible 
  // as it was failing to trigger for some users.

  const socialLinks = siteData.footer?.socialMedia || [];

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer__content">
        <div className="footer__container">
          {/* Brand Section */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-text">CONCLA</span>
              <span className="footer__logo-y">Y</span>
              <span className="footer__logo-text">VE</span>
            </Link>
            <p className="footer__tagline">{siteData.footer.tagline}</p>
            <p className="footer__location">{siteData.footer.location}</p>
          </div>

          {/* Navigation Columns */}
          <div className="footer__nav-grid">
            {/* Company Links */}
            <div className="footer__nav-column">
              <h4 className="footer__nav-title">Company</h4>
              <ul className="footer__nav-list">
                {siteData.navigation.footer.company.map((item, index) => (
                  <li key={index}>
                    <Link to={item.url} className="footer__nav-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Links */}
            <div className="footer__nav-column">
              <h4 className="footer__nav-title">Connect</h4>
              <ul className="footer__nav-list">
                {siteData.navigation.footer.connect.map((item, index) => (
                  <li key={index}>
                    {item.external ? (
                      <a
                        href={item.url}
                        className="footer__nav-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link to={item.url} className="footer__nav-link">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="footer__nav-column">
              <h4 className="footer__nav-title">Legal</h4>
              <ul className="footer__nav-list">
                {siteData.navigation.footer.legal.map((item, index) => (
                  <li key={index}>
                    <Link to={item.url} className="footer__nav-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media Row */}
        {socialLinks.length > 0 && (
          <div className="footer__socials-row">
            <div className="footer__container footer__container--flex">
              <div className="footer__socials">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="footer__social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                  >
                    <i className={social.icon}></i>
                    <span className="footer__social-name">{social.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Copyright Bar */}
        <div className="footer__bottom">
          <div className="footer__container">
            <p className="footer__copyright">{siteData.footer.copyright}</p>
            <p className="footer__credit">
              <span className="accent-text">Curated experiences. Global perspective.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
