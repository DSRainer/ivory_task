import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../../data/siteData';
import CTA from '../../components/CTA/CTA';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const pageRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (!videoLoaded) return;

    const ctx = gsap.context(() => {
      // 1. Hero Title: Character-by-character reveal
      const titleSpans = gsap.utils.toArray('.about-hero__title span');
      titleSpans.forEach((span, index) => {
        const text = span.textContent;
        // Efficient way to split text into chars
        span.innerHTML = '';
        text.split('').forEach(char => {
          const charSpan = document.createElement('span');
          charSpan.className = 'hero-char';
          charSpan.innerHTML = char === ' ' ? '&nbsp;' : char;
          charSpan.style.display = 'inline-block';
          charSpan.style.whiteSpace = 'pre';
          span.appendChild(charSpan);
        });

        const chars = span.querySelectorAll('.hero-char');
        gsap.from(chars, {
          y: 70,
          opacity: 0,
          rotateX: -90,
          stagger: 0.03,
          duration: 1.2,
          delay: 0.1 + (index * 0.4),
          ease: 'expo.out',
        });
      });

      // 2. Founders Note: Ghost Scroll Reveal
      const paragraphs = gsap.utils.toArray('.founders-note__paragraph');
      paragraphs.forEach((p) => {
        const text = p.textContent;
        p.innerHTML = text.split(' ').map(word =>
          `<span class="ghost-word">${word}</span>`
        ).join(' ');

        const words = p.querySelectorAll('.ghost-word');
        gsap.from(words, {
          opacity: 0.1,
          duration: 0.1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: p,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: true,
          }
        });
      });

      // 3. Image Border Animation (reuse the calculated logic)
      const animateBorders = (selector) => {
        gsap.utils.toArray(selector).forEach((wrap) => {
          const svgBorder = wrap.querySelector('.border-svg');
          if (svgBorder) {
            const calculatePerimeter = () => {
              const rect = wrap.getBoundingClientRect();
              const width = rect.width;
              const height = rect.height;
              const perimeter = Math.round((width + height) * 2);

              gsap.set(wrap, {
                '--border-perimeter': `${perimeter}`,
                '--border-draw': perimeter,
              });

              gsap.to(svgBorder, {
                opacity: 1,
                duration: 0.5,
                scrollTrigger: {
                  trigger: wrap,
                  start: 'top 80%',
                }
              });

              gsap.to(wrap, {
                '--border-draw': 0,
                duration: 2.5,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: wrap,
                  start: 'top 80%',
                  toggleActions: 'play none none none',
                },
              });
            };
            calculatePerimeter();
            setTimeout(calculatePerimeter, 100);
          }
        });
      };

      animateBorders('.has-border');

      // 4. Value Items: premium slide and fade
      gsap.from('.value-item', {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.values-grid',
          start: 'top 85%',
        }
      });

    }, pageRef);

    return () => ctx.revert();
  }, [videoLoaded]);

  return (
    <div className="about-page" ref={pageRef}>
      {/* Hero Section with Video */}
      <section className="about-hero">
        <div className="about-hero__bg">
          <video
            src="/about_vid.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="about-hero__video"
            onCanPlayThrough={() => setVideoLoaded(true)}
            onLoadedData={() => setVideoLoaded(true)}
          />
          <div className="about-hero__overlay"></div>
        </div>
        <div className="about-hero__container">
          <div className="about-hero__content">
            <span className="about-hero__label">About Us</span>
            <h1 className="about-hero__title">
              <span>Ideas Breathe.</span>
            </h1>
            <p className="about-hero__subtitle">{siteData.about.description}</p>
          </div>
        </div>
      </section>

      {/* Founder's Note Section (The core of the page) */}
      <section className="founders-note">
        <div className="founders-note__container">
          <div className="founders-note__header">
            <span className="founders-note__label">{siteData.foundersNote.title}</span>
            <div className="founders-note__divider"></div>
          </div>
          <div className="founders-note__paragraphs">
            {siteData.foundersNote.paragraphs.map((paragraph, index) => (
              <p key={index} className="founders-note__paragraph">{paragraph}</p>
            ))}
          </div>
          <p className="founders-note__signature">{siteData.foundersNote.signature}</p>
        </div>
      </section>

      {/* Global CTA Section */}
      <CTA />
    </div>
  );
};

export default About;
