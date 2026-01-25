import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../../data/siteData';
import './CTA.css';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to('.cta__bg', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Content animation
      gsap.fromTo('.cta__content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none'
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
          delay: 0.4,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none'
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
        <img 
          src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2" 
          alt="Background"
          className="cta__bg-image"
        />
      </div>
      <div className="cta__overlay"></div>

      {/* Content */}
      <div className="cta__container">
        <div className="cta__content">
          <h2 className="cta__title">{siteData.cta.title}</h2>
          <p className="cta__description">{siteData.cta.description}</p>
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
