import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../../data/siteData';
import './SelectedWork.css';

gsap.registerPlugin(ScrollTrigger);

const SelectedWork = () => {
  const sectionRef = useRef(null);
  const titleBorderRef = useRef(null);
  const imageRefs = useRef([]);
  const contentRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Circular (Rounded Rect) Border Animation
      const border = titleBorderRef.current;
      if (border) {
        // Get the path length for the drawing effect
        const length = border.getTotalLength();

        gsap.fromTo(border,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: '.selected-work__title-container',
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // 2. Work Items Slide-in from outside
      siteData.selectedWork.forEach((_, index) => {
        const imageWrapper = imageRefs.current[index];
        const content = contentRefs.current[index];

        if (imageWrapper && content) {
          // Slide Image from Left (-100vw)
          gsap.fromTo(imageWrapper,
            { x: '-100vw', opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: imageWrapper,
                start: 'top 85%',
                toggleActions: 'play none none none'
              }
            }
          );

          // Slide Content from Right (100vw)
          gsap.fromTo(content,
            { x: '100vw', opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: content,
                start: 'top 85%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="selected-work" ref={sectionRef}>
      <div className="selected-work__container">
        {/* Section Header */}
        <div className="selected-work__header">
          <span className="selected-work__label">Selected Work</span>
          <div className="selected-work__title-container">
            <h2 className="selected-work__title">A Curated Body of Work</h2>
            <svg
              className="selected-work__title-border"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <rect
                ref={titleBorderRef}
                x="2"
                y="2"
                width="96"
                height="96"
                rx="48"
                ry="48"
              />
            </svg>
          </div>
        </div>

        {/* Work List */}
        <div className="selected-work__list">
          {siteData.selectedWork.map((work, index) => (
            <article key={work.id} className="work-item">
              <div
                className="work-item__image-wrapper"
                ref={el => imageRefs.current[index] = el}
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="work-item__image"
                  loading="eager"
                />
                <div className="work-item__overlay">
                  <span className="work-item__category">{work.category}</span>
                </div>
              </div>
              <div
                className="work-item__content"
                ref={el => contentRefs.current[index] = el}
              >
                <span className="work-item__number">0{index + 1}</span>
                <div className="work-item__info">
                  <h3 className="work-item__title">{work.title}</h3>
                  <span className="work-item__location">{work.location}</span>
                  <p className="work-item__description">{work.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className="selected-work__footer">
          <p className="selected-work__note">
            Each experience informs the way Conclayve now curates intimate, design-led gatherings.
          </p>
          <Link to="/work" className="btn btn-secondary">
            View All Work
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
