import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../../data/siteData';
import './Philosophy.css';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
  const sectionRef = useRef(null);
  const dividerRef = useRef(null);
  const titleRef = useRef(null);
  const titleLineRef = useRef(null);
  const descriptionRef = useRef(null);
  const yTitleRef = useRef(null);
  const ySubtitleRef = useRef(null);
  const conclusionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = sectionRef.current;

      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger,
            start: 'top 80%',
            toggleActions: 'play none none none',
            scrub: 0.5
          }
        }
      );

      // Title Line animation
      gsap.fromTo(titleLineRef.current,
        { width: 0, opacity: 0 },
        {
          width: '660px',
          opacity: 1,
          duration: 3.0,
          delay: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Description animation
      gsap.fromTo(descriptionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger,
            start: 'top 80%',
            toggleActions: 'play none none none',
            scrub: 0.5
          }
        }
      );

      // Divider animation - enhanced with glow effect
      gsap.fromTo(dividerRef.current,
        {
          width: '0%',
          opacity: 0,
          boxShadow: '0 0 0 rgba(201, 169, 98, 0)'
        },
        {
          width: '100%',
          opacity: 1,
          duration: 2.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger,
            start: 'top 70%',
            toggleActions: 'play none none none',
            scrub: 0.3
          },
          onComplete: () => {
            // Add glow effect after expansion
            gsap.to(dividerRef.current, {
              boxShadow: '0 0 20px rgba(201, 169, 98, 0.6)',
              duration: 1.5,
              ease: 'power2.inOut',
              repeat: -1,
              yoyo: true
            });
          }
        }
      );

      // The Y section animations
      gsap.fromTo(yTitleRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger,
            start: 'top 70%',
            toggleActions: 'play none none none',
            scrub: 0.5
          }
        }
      );

      gsap.fromTo(ySubtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger,
            start: 'top 70%',
            toggleActions: 'play none none none',
            scrub: 0.5
          }
        }
      );

      // Points stagger animation - enhanced with sequential appearance
      gsap.fromTo('.philosophy__point',
        {
          opacity: 0,
          x: -30,
          scale: 0.95
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.philosophy__y-content',
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Conclusion animation
      gsap.fromTo(conclusionRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger,
            start: 'top 60%',
            toggleActions: 'play none none none',
            scrub: 0.5
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="philosophy" ref={sectionRef}>
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="philosophy__video-bg"
        preload="auto"
        onError={(e) => console.error('Video loading error:', e)}
      >
        <source src="/philosphy_vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="philosophy__container">
        {/* Main Philosophy */}
        <div className="philosophy__main">
          <h2 className="philosophy__title" ref={titleRef}>{siteData.philosophy.title}</h2>
          <div className="philosophy__title-line" ref={titleLineRef}></div>
          <p className="philosophy__description" ref={descriptionRef}>{siteData.philosophy.description}</p>
        </div>

        {/* Divider */}
        <div className="philosophy__divider" ref={dividerRef}></div>

        {/* The Y Section */}
        <div className="philosophy__y">
          <div className="philosophy__y-header">
          </div>
          <div className="philosophy__y-content">
            <h3 className="philosophy__y-subtitle" ref={ySubtitleRef}>{siteData.philosophy.theY.title}</h3>
            <ul className="philosophy__points">
              {siteData.philosophy.theY.points.map((point, index) => (
                <li key={index} className="philosophy__point">
                  <span className="philosophy__point-text">{point}</span>
                </li>
              ))}
            </ul>
            <p className="philosophy__conclusion" ref={conclusionRef}>
              <em>{siteData.philosophy.theY.conclusion}</em>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
