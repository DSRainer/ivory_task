import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../../data/siteData';
import './Intro.css';

gsap.registerPlugin(ScrollTrigger);

const INTRO_IMAGE =
  'https://images.pexels.com/photos/5970897/pexels-photo-5970897.jpeg?auto=compress&cs=tinysrgb&w=1200&dpr=2';

const Intro = () => {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const dividerRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = sectionRef.current;
      const start = 'top 80%'; // Trigger a bit earlier

      // Image: fade in
      gsap.fromTo(
        imageWrapRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: { trigger, start, toggleActions: 'play none none none' },
        }
      );

      // Gold Border Animation
      // Gold Border Animation
      const svgBorder = imageWrapRef.current.querySelector('.border-svg');
      if (svgBorder) {
        // Calculate the perimeter after the element is rendered
        const calculatePerimeter = () => {
          // Get the dimensions of the container
          const rect = imageWrapRef.current.getBoundingClientRect();
          const computedStyle = window.getComputedStyle(imageWrapRef.current);
          
          // Calculate width and height including padding/borders
          const width = parseFloat(computedStyle.width) || rect.width;
          const height = parseFloat(computedStyle.height) || rect.height;
          
          // Calculate the perimeter of the rectangle (2 * width + 2 * height)
          const perimeter = Math.round((width + height) * 2);
          
          // Set the perimeter as a CSS variable
          gsap.set(imageWrapRef.current, {
            '--border-perimeter': `${perimeter}`,
            '--border-draw': perimeter, // Start with full offset (invisible)
          });
          
          // Show the SVG border and animate it
          gsap.to(svgBorder, {
            opacity: 1,
            duration: 0.1,
          });
          
          gsap.to(imageWrapRef.current, {
            '--border-draw': 0, // Animate to 0 to draw the border
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger,
              start,
              toggleActions: 'play none none none',
            },
          });
        };
        
        // Try to calculate immediately
        calculatePerimeter();
        
        // Also try after a small delay to ensure layout is complete
        setTimeout(calculatePerimeter, 50);
      }

      // Headline
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: { trigger, start, toggleActions: 'play none none none' },
        }
      );

      // Subheadline
      gsap.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.5,
          ease: 'power3.out',
          scrollTrigger: { trigger, start, toggleActions: 'play none none none' },
        }
      );

      // Divider: Progress bar animation
      // Ensure it starts from scaleX: 0
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 4.5,
          delay: 0.2,
          ease: 'power3.inOut', // Smooth start and end
          scrollTrigger: { trigger, start, toggleActions: 'play none none none' },
        }
      );

      // Description
      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.9,
          ease: 'power3.out',
          scrollTrigger: { 
            trigger, 
            start, 
            toggleActions: 'play none none none',
            scrub: true // Enable scrubbing for smooth animation
          },
        }
      );
      
      // Highlighting animation for the description
      gsap.set(descriptionRef.current, {
        '--highlight-start': '-20%',
        '--highlight-width': '40%',
      });
      
      gsap.to(descriptionRef.current, {
        '--highlight-start': '120%',
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: { 
          trigger, 
          start, 
          toggleActions: 'play none none none',
          scrub: 0.5 // Enable scrubbing for the highlight effect
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="intro" ref={sectionRef}>
      <div className="intro__container">
        <div className="intro__layout">
          <div className="intro__image-wrap" ref={imageWrapRef}>
            <img
              src={INTRO_IMAGE}
              alt="Intimate gathering"
              className="intro__image"
            />
            <svg className="border-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect x="5" y="5" width="90" height="90" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeDasharray="0" strokeDashoffset="0" />
            </svg>
          </div>
          <div className="intro__content">
            <h2 className="intro__headline" ref={headlineRef}>
              {siteData.intro.headline}
            </h2>
            <p className="intro__subheadline" ref={subheadlineRef}>
              {siteData.intro.subheadline}
            </p>
            <div className="intro__divider" ref={dividerRef} />
            <p className="intro__description" ref={descriptionRef}>
              {siteData.intro.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
