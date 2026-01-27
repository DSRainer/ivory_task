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

          const isMobile = window.innerWidth < 768;

          if (!isMobile) {
            const scrollWidth = track.scrollWidth / 2;
            const direction = index % 2 === 0 ? -1 : 1; // -1: Left, 1: Right

            if (direction === -1) {
              gsap.set(track, { x: 0 });
              const marquee = gsap.to(track, {
                x: -scrollWidth,
                duration: 80 + (index * 20),
                ease: "none",
                repeat: -1
              });

              ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                onUpdate: (self) => {
                  const scrollVelocity = self.getVelocity() / 200;
                  const newScale = 1 + Math.abs(scrollVelocity);
                  gsap.to(marquee, {
                    timeScale: Math.min(newScale, 3),
                    overwrite: true,
                    duration: 0.5
                  });
                }
              });
            } else {
              gsap.set(track, { x: -scrollWidth });
              const marquee = gsap.to(track, {
                x: 0,
                duration: 80 + (index * 20),
                ease: "none",
                repeat: -1
              });

              ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                onUpdate: (self) => {
                  const scrollVelocity = self.getVelocity() / 200;
                  const newScale = 1 + Math.abs(scrollVelocity);
                  gsap.to(marquee, {
                    timeScale: Math.min(newScale, 3),
                    overwrite: true,
                    duration: 0.5
                  });
                }
              });
            }
          } else {
            // Mobile: Vertical Scroll
            // Use a slight delay to ensure the browser has calculated the new layout dimensions
            setTimeout(() => {
              const scrollHeight = track.scrollHeight / 2;

              // If scrollHeight is still 0, we use a fallback based on children count
              const itemHeight = 75; // 60px height + 15px gap
              const calculatedHeight = scrollHeight > 0 ? scrollHeight : (logos.length * itemHeight);

              const direction = index % 2 === 0 ? -1 : 1; // -1: Up, 1: Down

              if (direction === -1) {
                gsap.set(track, { y: 0, opacity: 1 });
                gsap.to(track, {
                  y: -calculatedHeight,
                  duration: 30 + (index * 10),
                  ease: "none",
                  repeat: -1
                });
              } else {
                gsap.set(track, { y: -calculatedHeight, opacity: 1 });
                gsap.to(track, {
                  y: 0,
                  duration: 30 + (index * 10),
                  ease: "none",
                  repeat: -1
                });
              }
            }, 100);
          }
        };

        const checkDone = () => {
          loadedCount++;
          if (loadedCount >= totalImages) {
            initAnimation();
          }
        };

        // Fallback: Start animation anyway after 5 seconds if loading is slow
        setTimeout(() => {
          if (!isInitialized) {
            console.warn("Animation started via timeout safety.");
            initAnimation();
          }
        }, 5000);

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
