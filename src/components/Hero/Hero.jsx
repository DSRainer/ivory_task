import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { siteData } from '../../data/siteData';
import './Hero.css';

const HERO_VIDEO_SRC = '/hero_vid.mp4';

const Hero = () => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const cursorRef = useRef(null);
  const exploreBtnRef = useRef(null);
  const enquireBtnRef = useRef(null);

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoInView, setVideoInView] = useState(false);
  const [displayedLine1, setDisplayedLine1] = useState('');
  const [displayedLine2, setDisplayedLine2] = useState('');

  const [line1] = useState(siteData.brand.heroLines[0] || '');
  const [line2] = useState(siteData.brand.heroLines[1] || '');

  // Lazy load video when hero enters viewport
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVideoInView(true);
      },
      { rootMargin: '50px', threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Set video src when in view (lazy load) and handle load
  useEffect(() => {
    if (!videoInView || !videoRef.current) return;

    const video = videoRef.current;
    const src = video.getAttribute('data-src');
    if (src) {
      video.src = src;
      video.load();
    }
  }, [videoInView]);

  // GSAP typewriter + content animations
  useEffect(() => {
    const obj1 = { length: 0 };
    const obj2 = { length: 0 };

    const ctx = gsap.context(() => {
      // Blinking cursor (runs from start; killed when we hide cursor)
      const cursorBlink = gsap.to('.hero__cursor', {
        opacity: 0,
        duration: 0.55,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      const tl = gsap.timeline({ delay: 0.5 });

      // Typewriter line 1 then line 2
      tl.to(obj1, {
        length: line1.length,
        duration: 1.1,
        ease: 'power2.inOut',
        onUpdate: () => setDisplayedLine1(line1.slice(0, Math.round(obj1.length)))
      })
      .to(obj2, {
        length: line2.length,
        duration: 1.1,
        ease: 'power2.inOut',
        onUpdate: () => setDisplayedLine2(line2.slice(0, Math.round(obj2.length)))
      }, '-=0.12')
      .to('.hero__cursor', { opacity: 0, duration: 0.25 }, '+=0.15')
      .add(() => cursorBlink.kill(), '<');

      // Fade in subtitle and CTAs after typewriter
      tl.fromTo('.hero__subtitle',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.25'
      )
      .fromTo('.hero__cta',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.35'
      )
      .fromTo('.hero__scroll',
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: 'power2.out' },
        '-=0.2'
      );

      // Floating scroll icon
      gsap.to('.hero__scroll-icon', {
        y: 8,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }, heroRef);

    return () => ctx.revert();
  }, [line1, line2]);

  // GSAP hover animations for Explore and Enquire buttons
  useEffect(() => {
    const explore = exploreBtnRef.current;
    const enquire = enquireBtnRef.current;

    const hoverIn = (el) => {
      if (!el) return;
      gsap.to(el, {
        scale: 1.05,
        y: -3,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: true
      });
    };
    const hoverOut = (el) => {
      if (!el) return;
      gsap.to(el, {
        scale: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: true
      });
    };

    const onExploreEnter = () => hoverIn(explore);
    const onExploreLeave = () => hoverOut(explore);
    const onEnquireEnter = () => hoverIn(enquire);
    const onEnquireLeave = () => hoverOut(enquire);

    if (explore) {
      explore.addEventListener('mouseenter', onExploreEnter);
      explore.addEventListener('mouseleave', onExploreLeave);
    }
    if (enquire) {
      enquire.addEventListener('mouseenter', onEnquireEnter);
      enquire.addEventListener('mouseleave', onEnquireLeave);
    }

    return () => {
      if (explore) {
        explore.removeEventListener('mouseenter', onExploreEnter);
        explore.removeEventListener('mouseleave', onExploreLeave);
      }
      if (enquire) {
        enquire.removeEventListener('mouseenter', onEnquireEnter);
        enquire.removeEventListener('mouseleave', onEnquireLeave);
      }
    };
  }, []);

  const handleVideoLoaded = () => setVideoLoaded(true);
  const handleVideoError = () => setVideoLoaded(false);

  return (
    <section className="hero" ref={heroRef}>
      {/* Video Background - lazy loaded */}
      <div className="hero__video-wrapper">
        <video
          ref={videoRef}
          className={`hero__video-el ${videoLoaded ? 'hero__video-el--loaded' : ''}`}
          data-src={HERO_VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          onLoadedData={handleVideoLoaded}
          onCanPlay={handleVideoLoaded}
          onError={handleVideoError}
          aria-hidden
        />
        <div className="hero__overlay" />
      </div>

      {/* Hero Content */}
      <div className="hero__content" ref={contentRef}>
        <div className="hero__container">
          <div className="hero__headlines">
            <h1 className="hero__line hero__line--1">
              {displayedLine1}
              <span ref={cursorRef} className="hero__cursor" aria-hidden>|</span>
            </h1>
            <h1 className="hero__line hero__line--2 hero__line--accent">
              {displayedLine2}
            </h1>
          </div>

          <p className="hero__subtitle">
            {siteData.brand.heroSubtitle}
          </p>

          <div className="hero__cta">
            <Link
              ref={exploreBtnRef}
              to="/work"
              className="hero__btn btn btn-primary"
            >
              {siteData.brand.cta.primary}
            </Link>
            <Link
              ref={enquireBtnRef}
              to="/contact"
              className="hero__btn btn btn-outline-white"
            >
              {siteData.brand.cta.secondary}
            </Link>
          </div>
        </div>

        <div className="hero__scroll" aria-label="Scroll to continue">
          <span className="hero__scroll-text">Scroll</span>
          <div className="hero__scroll-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
