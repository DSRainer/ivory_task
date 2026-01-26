import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../../data/siteData';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const heroVideoRef = useRef(null);
  const showcaseRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Background Parallax
      gsap.to(heroVideoRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Hero Title Animation
      const heroTitle = heroRef.current.querySelector('.hero-title-massive');
      gsap.fromTo(heroTitle,
        { scale: 1.5, opacity: 0, y: 100 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "expo.out"
        }
      );

      // Hero Subtext Infinite Loop
      const tickerLines = heroRef.current.querySelectorAll('.ticker-line');
      const tickerTl = gsap.timeline({ repeat: -1 });

      tickerLines.forEach((line) => {
        tickerTl
          .fromTo(line,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
          )
          .to(line,
            { y: -20, opacity: 0, duration: 0.8, ease: "power2.in", delay: 1.5 }
          );
      });

      // Showcase Items Animation
      const showcaseItems = showcaseRef.current.querySelectorAll('.showcase-item');
      showcaseItems.forEach((item, index) => {
        const image = item.querySelector('.showcase-image');
        const content = item.querySelector('.showcase-content');
        const number = item.querySelector('.showcase-number');

        // Image Parallax
        gsap.to(image, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

        // Content Reveal
        gsap.fromTo(content,
          { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Number Reveal
        gsap.fromTo(number,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 0.1,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: item,
              start: "top 60%",
            }
          }
        );
      });

      // Footer CTA Animation
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.cta-section',
          start: "top 60%",
        }
      });

      ctaTl.from('.cta-highlight-box', {
        scaleX: 0,
        duration: 1,
        ease: "expo.inOut",
        stagger: 0.3,
        transformOrigin: "left"
      })
        .from('.cta-highlight-text', {
          opacity: 0,
          duration: 0.5,
          stagger: 0.3
        }, "-=0.2");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="services-redesign" ref={containerRef}>
      {/* Hero Section */}
      <section className="services-hero-section" ref={heroRef}>
        <div className="hero-video-container">
          <video
            ref={heroVideoRef}
            src="/services_vid.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="hero-video"
          />
          <div className="hero-overlay" />
        </div>

        <div className="hero-content-wrapper">
          <h1 className="hero-title-massive">EXPERIENCES</h1>

          <div className="scroll-indicator">
            <span className="mouse">
              <span className="wheel" />
            </span>
            <span className="scroll-text">Explore Our World</span>

            <div className="hero-ticker-container">
              <div className="ticker-line">Curated Environments</div>
              <div className="ticker-line">Intentional Gatherings</div>
              <div className="ticker-line">Lasting Impact</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase Section */}
      <section className="services-showcase-section" ref={showcaseRef}>
        <div className="section-header">
          <h2 className="section-title-loud">OUR OFFERINGS</h2>
        </div>

        <div className="showcase-container">
          {siteData.experiences.map((exp, index) => (
            <div key={exp.id} className={`showcase-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="showcase-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="showcase-media">
                <div className="image-reveal-wrapper">
                  <img src={exp.image} alt={exp.title} className="showcase-image" />
                </div>
              </div>
              <div className="showcase-content">
                <span className="content-category">Experience Type {index + 1}</span>
                <h3 className="content-title">{exp.title}</h3>
                <p className="content-description">{exp.description}</p>
                <button className="content-link">
                  <span>Discover More</span>
                  <div className="link-underline" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy/CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-heading-loud">
            <span className="cta-line-1">
              LET'S <span className="cta-highlight-wrap">
                <span className="cta-highlight-box" />
                <span className="cta-highlight-text">BUILD</span>
              </span> THE
            </span>
            <span className="cta-line-2">
              <span className="cta-highlight-box" />
              <span className="cta-highlight-text">EXTRAORDINARY.</span>
            </span>
          </h2>
          <p className="cta-text">
            Conclayve is for those who seek to move beyond the expected.
            For those who understand that the most powerful tool is a
            well-curated room.
          </p>
          <button className="massive-cta-btn">
            START THE CONVERSATION
          </button>
        </div>
        <div className="cta-background-text">CONCLAYVE</div>
      </section>
    </div>
  );
};

export default Services;