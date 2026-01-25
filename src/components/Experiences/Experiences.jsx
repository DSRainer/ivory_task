import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../../data/siteData';
import './Experiences.css';

gsap.registerPlugin(ScrollTrigger);

const Experiences = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Multi-line Title Underline Animation
      // Animating background-size from 0% 100% to 100% 100% (height is controlled by CSS background-size y-value)
      gsap.fromTo(titleRef.current,
        { backgroundSize: "0% 3px" },
        {
          backgroundSize: "100% 3px",
          duration: 2.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Horizontal Scroll (Desktop Only)
      ScrollTrigger.matchMedia({
        "(min-width: 901px)": function () {
          const track = trackRef.current;
          if (!track) return;

          const getScrollAmount = () => {
            let trackWidth = track.scrollWidth;
            return -(trackWidth - window.innerWidth + 100);
          };

          const tween = gsap.to(track, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${getScrollAmount() * -1 + 500}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1
            }
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="experiences" ref={sectionRef}>
      <div className="experiences__scroll-container">
        <div className="experiences__track" ref={trackRef}>

          {/* Intro Card */}
          <div className="experiences__intro-card">
            <span className="experiences__label">Experiences</span>
            <div className="experiences__title-wrapper">
              <h2 className="experiences__title" ref={titleRef}>What We<br />Curate</h2>
            </div>
            <p className="experiences__intro-desc">
              From intimate dialogues to grand unveilings, every format is designed with intention.
            </p>
          </div>

          {/* Experience Cards */}
          {siteData.experiences.map((experience, index) => (
            <div key={experience.id} className="experience-card">
              <div className="experience-card__image-wrapper">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="experience-card__img"
                  loading="eager"
                />
                <div className="experience-card__overlay"></div>
              </div>
              <div className="experience-card__content">
                <span className="experience-card__num">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="experience-card__title">{experience.title}</h3>
                <p className="experience-card__desc">{experience.description}</p>
                <div className="experience-card__link">Explore</div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Experiences;
