import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../../data/siteData';
import './Difference.css';

gsap.registerPlugin(ScrollTrigger);

const Difference = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const dividerRef = useRef(null);

  // Typewriter state
  const [displayedLine1, setDisplayedLine1] = useState('');
  const [displayedLine2, setDisplayedLine2] = useState('');

  const line1 = siteData.difference.tagline[0] || '';
  const line2 = siteData.difference.tagline[1] || '';

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Divider Animation (Width expansion)
      gsap.fromTo(dividerRef.current,
        { width: "0%", opacity: 0 },
        {
          width: "100%",
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.difference__title',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 2. Enhanced Staggered Smoke Animation for Points
      // Making it "more obvious" by increasing blur, vertical lift, and initial scale
      gsap.fromTo('.difference__point',
        {
          opacity: 0,
          filter: 'blur(30px)', // Increased from 15px
          y: 50,                // Increased from 30px
          scale: 1.2            // Increased from 1.1
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          scale: 1,
          duration: 1.5,
          stagger: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.difference__points',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 3. Faster Typewriter Animation for Tagline
      const typingTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.difference__tagline',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      const obj1 = { length: 0 };
      const obj2 = { length: 0 };

      typingTimeline.to(obj1, {
        length: line1.length,
        duration: 0.8,
        ease: 'none',
        onUpdate: () => setDisplayedLine1(line1.slice(0, Math.round(obj1.length)))
      })
        .to(obj2, {
          length: line2.length,
          duration: 0.8,
          ease: 'none',
          onUpdate: () => setDisplayedLine2(line2.slice(0, Math.round(obj2.length)))
        }, '+=0.2');

      // Floating cursor blink
      gsap.to('.difference__cursor', {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [line1, line2]);

  return (
    <section className="difference" ref={sectionRef}>
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="difference__video-bg"
        preload="auto"
      >
        <source src="/vid.mp4" type="video/mp4" />
      </video>

      <div className="difference__overlay" />

      <div className="difference__container">
        <div className="difference__content">
          <h2 className="difference__title">{siteData.difference.title}</h2>
          {/* New Divider Element */}
          <div className="difference__divider" ref={dividerRef}></div>

          <ul className="difference__points">
            {siteData.difference.points.map((point, index) => (
              <li key={index} className="difference__point">
                {point}
              </li>
            ))}
          </ul>

          <div className="difference__tagline">
            <p className="difference__line">
              {displayedLine1}
              {displayedLine1.length < line1.length && <span className="difference__cursor">|</span>}
            </p>
            <p className="difference__line">
              {displayedLine2}
              {displayedLine2.length > 0 && displayedLine2.length < line2.length && <span className="difference__cursor">|</span>}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Difference;
