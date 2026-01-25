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
        const logos = track.children;
        const totalLogos = logos.length;

        // Loop through and append clones to make it truly seamless
        for (let i = 0; i < totalLogos; i++) {
          const clone = logos[i].cloneNode(true);
          track.appendChild(clone);
        }

        // Horizontal movement
        const direction = index % 2 === 0 ? -1 : 1; // Alternate directions
        const scrollWidth = track.scrollWidth / 2;

        // Base animation
        const marquee = gsap.to(track, {
          x: direction * scrollWidth,
          duration: 30 + (index * 5), // Varying speeds
          ease: "none",
          repeat: -1
        });

        // Link animation speed/progression to scroll (Scrub)
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            // Adjust timeScale based on scroll speed/direction
            // This makes it feel reactive to scrolling
            const scrollVelocity = self.getVelocity() / 100;
            gsap.to(marquee, {
              timeScale: 1 + Math.abs(scrollVelocity),
              overwrite: true,
              duration: 0.5
            });
          }
        });
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
