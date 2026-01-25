import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../../data/siteData';
import './CTA.css';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const dividerRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = sectionRef.current;
      const start = 'top 75%';

      // Background parallax
      gsap.to('.cta__bg', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // 1. Title: Bouncing appear animation (Ball-like bounce)
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: -150, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.8,
          ease: 'bounce.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start,
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 2. Divider Animation (Width expansion from Difference)
      gsap.fromTo(dividerRef.current,
        { width: "0%", opacity: 0 },
        {
          width: "480px", // A bit wider for CTA
          opacity: 1,
          duration: 2.0,
          delay: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start,
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 3. Description: Creative reveal (blur + y-offset)
      gsap.fromTo(descriptionRef.current,
        {
          opacity: 0,
          y: 20,
          filter: 'blur(10px)'
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.5,
          delay: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start,
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Button animation
      gsap.fromTo('.cta__button',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 1.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: titleRef.current,
            start,
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="cta" ref={sectionRef}>
      {/* Background */}
      <div className="cta__bg">
        <video
          src="/cta_vid.mp4"
          className="cta__bg-video"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        />
      </div>
      <div className="cta__overlay"></div>

      {/* Content */}
      <div className="cta__container">
        <div className="cta__content">
          <h2 className="cta__title" ref={titleRef}>{siteData.cta.title}</h2>
          <div className="cta__divider" ref={dividerRef}></div>
          <p className="cta__description" ref={descriptionRef}>{siteData.cta.description}</p>
          <Link to="/contact" className="cta__button btn btn-primary">
            {siteData.cta.buttonText}
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="cta__decoration cta__decoration--left"></div>
      <div className="cta__decoration cta__decoration--right"></div>
    </section>
  );
};

export default CTA;
