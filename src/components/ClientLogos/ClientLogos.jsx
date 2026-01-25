import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../../data/siteData';
import './ClientLogos.css';

gsap.registerPlugin(ScrollTrigger);

const ClientLogos = () => {
  const sectionRef = useRef(null);
  const trackRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Color reveal on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => {
          gsap.to('.client-logo', {
            className: 'client-logo client-logo--active',
            duration: 1,
            stagger: 0.05
          });
        },
        toggleActions: "play none none reverse"
      });

      // 2. Infinite Scrolling Tracks with Scrub
      trackRefs.current.forEach((track, index) => {
        if (!track) return;

        // Duplicate content for seamless loop
        const logos = Array.from(track.children);
        logos.forEach(logo => {
          const clone = logo.cloneNode(true);
          track.appendChild(clone);
        });

        // Ensure images are loaded before starting animation to get correct width
        const images = track.querySelectorAll('img');
        let loadedCount = 0;
        let isInitialized = false;
        const totalImages = images.length;

        const initAnimation = () => {
          if (isInitialized) return;
          isInitialized = true;

          const scrollWidth = track.scrollWidth / 2;
          const direction = index % 2 === 0 ? -1 : 1; // -1: Left, 1: Right

          // For seamless right-to-left: from 0 to -scrollWidth
          // For seamless left-to-right: from -scrollWidth to 0

          if (direction === -1) {
            gsap.set(track, { x: 0 });
            const marquee = gsap.to(track, {
              x: -scrollWidth,
              duration: 50 + (index * 10),
              ease: "none",
              repeat: -1
            });

            ScrollTrigger.create({
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              onUpdate: (self) => {
                const scrollVelocity = self.getVelocity() / 100;
                gsap.to(marquee, {
                  timeScale: 1 + Math.abs(scrollVelocity),
                  overwrite: true,
                  duration: 0.5
                });
              }
            });
          } else {
            // Direction 1: Left to Right
            // Start at -scrollWidth and move to 0
            gsap.set(track, { x: -scrollWidth });
            const marquee = gsap.to(track, {
              x: 0,
              duration: 50 + (index * 10),
              ease: "none",
              repeat: -1
            });

            ScrollTrigger.create({
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              onUpdate: (self) => {
                const scrollVelocity = self.getVelocity() / 100;
                gsap.to(marquee, {
                  timeScale: 1 + Math.abs(scrollVelocity),
                  overwrite: true,
                  duration: 0.5
                });
              }
            });
          }
        };

        const checkDone = () => {
          loadedCount++;
          if (loadedCount >= totalImages) {
            initAnimation();
          }
        };

        // Fallback: Start animation anyway after 3 seconds if loading is slow
        setTimeout(() => {
          if (!isInitialized) {
            console.warn("Animation started via timeout safety.");
            initAnimation();
          }
        }, 3000);

        if (totalImages === 0) {
          initAnimation();
        } else {
          images.forEach(img => {
            if (img.complete) {
              checkDone();
            } else {
              img.addEventListener('load', checkDone);
              img.addEventListener('error', (e) => {
                console.error(`Failed to load logo: ${img.src}`, e);
                checkDone();
              });
            }
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const logoRows = [
    siteData.clientLogos.column1,
    siteData.clientLogos.column2,
    siteData.clientLogos.column3
  ];

  return (
    <section className="client-logos" ref={sectionRef}>
      <div className="client-logos__container">
        {/* Header */}
        <div className="client-logos__header">
          <span className="client-logos__label">Trusted By</span>
          <h2 className="client-logos__title">The Company We Keep</h2>
        </div>

        {/* Logo Tracks */}
        <div className="client-logos__tracks">
          {logoRows.map((row, rowIndex) => (
            <div key={rowIndex} className="client-logos__track-wrapper">
              <div
                className="client-logos__track"
                ref={el => trackRefs.current[rowIndex] = el}
              >
                {row.map((logo, logoIndex) => (
                  <div key={logoIndex} className="client-logo">
                    <img
                      src={logo.image}
                      alt={logo.name}
                      className="client-logo__image"
                      loading="eager"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
