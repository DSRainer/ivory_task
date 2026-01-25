import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../../data/siteData';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo('.services-hero__content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3
        }
      );

      // Capabilities cards
      gsap.fromTo('.capability-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.capabilities__grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Experiences grid
      gsap.fromTo('.experience-item',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.experiences-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Signature platform
      gsap.fromTo('.signature-platform__content',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.signature-platform',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="services-page" ref={pageRef}>
      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero__container">
          <div className="services-hero__content">
            <span className="services-hero__label">What We Do</span>
            <h1 className="services-hero__title">Experiential strategy, executed with intent.</h1>
            <p className="services-hero__subtitle">
              We work with brands, institutions, and communities to design experiences that are thoughtful, purposeful, and culturally relevant.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="capabilities">
        <div className="capabilities__container">
          <div className="capabilities__header">
            <span className="capabilities__label">Capabilities</span>
            <h2 className="capabilities__title">What We Offer</h2>
          </div>
          <div className="capabilities__grid">
            {siteData.capabilities.map((capability, index) => (
              <article key={capability.id} className="capability-card">
                <span className="capability-card__number">0{index + 1}</span>
                <h3 className="capability-card__title">{capability.title}</h3>
                <p className="capability-card__description">{capability.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="experiences-section">
        <div className="experiences-section__container">
          <div className="experiences-section__header">
            <span className="experiences-section__label">Experiences</span>
            <h2 className="experiences-section__title">What We Curate</h2>
          </div>
          <div className="experiences-grid">
            {siteData.experiences.map((experience) => (
              <article key={experience.id} className="experience-item">
                <div className="experience-item__image-wrapper">
                  <img 
                    src={experience.image} 
                    alt={experience.title}
                    className="experience-item__image"
                    loading="lazy"
                  />
                  <div className="experience-item__overlay"></div>
                </div>
                <div className="experience-item__content">
                  <h3 className="experience-item__title">{experience.title}</h3>
                  <p className="experience-item__description">{experience.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Platform Section */}
      <section className="signature-platform">
        <div className="signature-platform__container">
          <div className="signature-platform__content">
            <span className="signature-platform__label">Signature Platforms</span>
            <h2 className="signature-platform__title">{siteData.signaturePlatforms.title}</h2>
            <p className="signature-platform__subtitle">{siteData.signaturePlatforms.subtitle}</p>
            <div className="signature-platform__featured">
              <h3 className="signature-platform__name">{siteData.signaturePlatforms.platform.name}</h3>
              <p className="signature-platform__description">{siteData.signaturePlatforms.platform.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="services-cta__container">
          <div className="services-cta__content">
            <h2 className="services-cta__title">Ready to create something meaningful?</h2>
            <Link to="/contact" className="btn btn-primary">Start a Conversation</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
