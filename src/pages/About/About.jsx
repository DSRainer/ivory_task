import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../../data/siteData';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo('.about-hero__content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3
        }
      );

      // About content
      gsap.fromTo('.about-main__content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-main',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Founder's note paragraphs
      gsap.fromTo('.founders-note__paragraph',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.founders-note__paragraphs',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Values animation
      gsap.fromTo('.value-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.values-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-page" ref={pageRef}>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero__container">
          <div className="about-hero__content">
            <span className="about-hero__label">About Us</span>
            <h1 className="about-hero__title">{siteData.about.headline}</h1>
            <p className="about-hero__subtitle">{siteData.about.description}</p>
          </div>
        </div>
      </section>

      {/* Main About Section */}
      <section className="about-main">
        <div className="about-main__container">
          <div className="about-main__content">
            <div className="about-main__text">
              <p className="about-main__mission">{siteData.about.mission}</p>
              <p className="about-main__belief">{siteData.about.belief}</p>
            </div>
            <div className="about-main__image">
              <img 
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Team collaboration"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Note Section */}
      <section className="founders-note">
        <div className="founders-note__container">
          <div className="founders-note__header">
            <span className="founders-note__label">{siteData.foundersNote.title}</span>
            <div className="founders-note__divider"></div>
          </div>
          <div className="founders-note__paragraphs">
            {siteData.foundersNote.paragraphs.map((paragraph, index) => (
              <p key={index} className="founders-note__paragraph">{paragraph}</p>
            ))}
          </div>
          <p className="founders-note__signature">{siteData.foundersNote.signature}</p>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="values-section__container">
          <div className="values-section__header">
            <span className="values-section__label">Our Values</span>
            <h2 className="values-section__title">The Conclayve Difference</h2>
          </div>
          <div className="values-grid">
            {siteData.difference.points.map((point, index) => (
              <div key={index} className="value-item">
                <span className="value-item__number">0{index + 1}</span>
                <span className="value-item__text">{point}</span>
              </div>
            ))}
          </div>
          <div className="values-tagline">
            {siteData.difference.tagline.map((line, index) => (
              <span key={index}>{line}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="about-cta__container">
          <div className="about-cta__content">
            <h2 className="about-cta__title">Let's Create Together</h2>
            <p className="about-cta__description">For brands, platforms, and individuals seeking something considered, refined, and distinct.</p>
            <Link to="/contact" className="btn btn-primary">Start a Conversation</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
