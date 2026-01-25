import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../../data/siteData';
import './Work.css';

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo('.work-hero__content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3
        }
      );

      // Work cards stagger
      gsap.fromTo('.work-card',
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.work-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Why This Matters section
      gsap.fromTo('.why-matters__content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.why-matters',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="work-page" ref={pageRef}>
      {/* Hero Section */}
      <section className="work-hero">
        <div className="work-hero__container">
          <div className="work-hero__content">
            <span className="work-hero__label">Our Work</span>
            <h1 className="work-hero__title">A Curated Body of Work</h1>
            <p className="work-hero__subtitle">
              From iconic stages to intimate conversations, each experience shapes our approach to creating meaningful gatherings.
            </p>
          </div>
        </div>
      </section>

      {/* Work Grid */}
      <section className="work-section">
        <div className="work-container">
          <div className="work-grid">
            {siteData.selectedWork.map((work, index) => (
              <article key={work.id} className="work-card">
                <div className="work-card__image-wrapper">
                  <img 
                    src={work.image} 
                    alt={work.title}
                    className="work-card__image"
                    loading="lazy"
                  />
                  <div className="work-card__overlay">
                    <span className="work-card__category">{work.category}</span>
                  </div>
                </div>
                <div className="work-card__content">
                  <span className="work-card__number">0{index + 1}</span>
                  <h2 className="work-card__title">{work.title}</h2>
                  <span className="work-card__location">{work.location}</span>
                  <p className="work-card__description">{work.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters Section */}
      <section className="why-matters">
        <div className="why-matters__container">
          <div className="why-matters__content">
            <h2 className="why-matters__title">{siteData.whyThisMatters.title}</h2>
            <p className="why-matters__description">{siteData.whyThisMatters.description}</p>
            <p className="why-matters__conclusion">{siteData.whyThisMatters.conclusion}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
