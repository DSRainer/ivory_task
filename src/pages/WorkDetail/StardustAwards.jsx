import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StardustAwards.css';

// Using the images from assets
const images = [
    '/assets/stardust_1.PNG',
    '/assets/stardust_3.PNG'
];

const STARDUST_VIDEO = '/stardust_video.mp4';

gsap.registerPlugin(ScrollTrigger);

const StardustAwards = () => {
    const containerRef = useRef(null);
    const textRefs = useRef([]);

    // Forces scroll to top on mount
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Title Animation
            gsap.from('.stardust-hero__title span', {
                y: 100,
                opacity: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: 'power4.out'
            });

            // Ghost Text Reveal Animation for Subtitle
            const subtitle = document.querySelector('.stardust-hero__subtitle');
            if (subtitle) {
                const text = subtitle.textContent;
                subtitle.innerHTML = text.split('').map(char =>
                    `<span class="ghost-char">${char === ' ' ? '&nbsp;' : char}</span>`
                ).join('');

                gsap.from('.ghost-char', {
                    opacity: 0,
                    filter: 'blur(10px)',
                    y: 20,
                    stagger: 0.03,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: subtitle,
                        start: 'top 90%',
                    }
                });
            }

            // Text Reveal Animation for other elements
            textRefs.current.forEach((el) => {
                if (el && !el.classList.contains('stardust-hero__subtitle')) {
                    gsap.from(el, {
                        opacity: 0,
                        y: 50,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    });
                }
            });

            // Image Parallax/Reveal
            gsap.utils.toArray('.stardust-image-wrapper:not(.has-border)').forEach((img) => {
                gsap.from(img, {
                    scale: 1.1,
                    opacity: 0,
                    duration: 1.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: img,
                        start: 'top 80%',
                    }
                });
            });

            // Gold Border Animation (Offset)
            gsap.utils.toArray('.stardust-image-wrapper.has-border').forEach((wrap) => {
                const svgBorder = wrap.querySelector('.border-svg');
                if (svgBorder) {
                    const calculatePerimeter = () => {
                        const rect = wrap.getBoundingClientRect();
                        const computedStyle = window.getComputedStyle(wrap);
                        const width = parseFloat(computedStyle.width) || rect.width;
                        const height = parseFloat(computedStyle.height) || rect.height;
                        const perimeter = Math.round((width + height) * 2);

                        gsap.set(wrap, {
                            '--border-perimeter': `${perimeter}`,
                            '--border-draw': perimeter,
                        });

                        gsap.to(svgBorder, {
                            opacity: 1,
                            duration: 0.1,
                            scrollTrigger: {
                                trigger: wrap,
                                start: 'top 80%',
                            }
                        });

                        gsap.to(wrap, {
                            '--border-draw': 0,
                            duration: 2,
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
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el) => {
        if (el && !textRefs.current.includes(el)) {
            textRefs.current.push(el);
        }
    };

    return (
        <div className="stardust-awards" ref={containerRef}>
            {/* Hero Section */}
            <section className="stardust-hero">
                <div className="stardust-hero__bg">
                    <video
                        src={STARDUST_VIDEO}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="stardust-hero__video"
                    />
                    <div className="overlay"></div>
                </div>
                <div className="stardust-hero__content">
                    <h1 className="stardust-hero__title">
                        <span>Stardust</span>
                        <span>Icon Awards</span>
                        <span>2017</span>
                    </h1>
                    <p className="stardust-hero__subtitle" ref={addToRefs}>
                        Celebrate Global Indian Excellence at New York’s Plaza Hotel
                    </p>
                </div>
            </section>

            {/* Content Section 1 */}
            <section className="stardust-content">
                <div className="container">
                    <div className="stardust-grid">
                        <div className="stardust-text-block">
                            <h2 className="loud-text" ref={addToRefs}>New York, 2017:</h2>
                            <p ref={addToRefs}>
                                The iconic Plaza Hotel in New York City played host to the prestigious Stardust Icon Awards 2017, an evening that celebrated outstanding individuals of Indian origin who have made a significant global impact across diverse fields. Organized by Stardust, one of India’s most respected entertainment and lifestyle brands, the event brought together leaders from entertainment, business, wellness, and social influence under one roof.
                            </p>
                            <p ref={addToRefs}>
                                The awards were conceived to honor Indians who have transcended geographical boundaries and created meaningful change on the world stage. In keeping with this vision, Stardust recognized achievers from varied backgrounds, reinforcing the idea that excellence is not confined to a single industry.
                            </p>
                        </div>
                        <div className="stardust-image-wrapper has-border">
                            <svg className="border-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <rect x="5" y="5" width="90" height="90" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeDasharray="0" strokeDashoffset="0" />
                            </svg>
                            <img src={images[0]} alt="Award Trophy" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Section - Deepak Chopra */}
            <section className="stardust-feature dark">
                <div className="container">
                    <div className="stardust-grid reverse">
                        <div className="stardust-text-block">
                            <h2 className="loud-text" ref={addToRefs}>Bridging Wisdom & Science</h2>
                            <p ref={addToRefs}>
                                Among the most prominent honorees was <strong>Dr. Deepak Chopra</strong>, globally renowned author, speaker, and pioneer in integrative medicine and wellness. Recognized as a Global Indian Icon, Chopra’s work in bridging ancient wisdom with modern science has influenced millions worldwide, positioning him as one of the most influential voices in holistic well-being.
                            </p>
                        </div>
                        <div className="stardust-image-wrapper has-border">
                            <svg className="border-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <rect x="5" y="5" width="90" height="90" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeDasharray="0" strokeDashoffset="0" />
                            </svg>
                            <img src={images[1]} alt="Red Carpet" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Other Honorees */}
            <section className="stardust-content">
                <div className="container">
                    <div className="stardust-columns">
                        <div className="column">
                            <h3 className="loud-text" ref={addToRefs}>Sonu Sood</h3>
                            <p ref={addToRefs}>
                                Acclaimed actor and philanthropist Sonu Sood was also honored during the evening. Known for his impactful roles in Indian cinema and his growing engagement with social causes, Sood’s recognition reflected Stardust’s commitment to celebrating public figures who combine creative success with social responsibility.
                            </p>
                        </div>
                        <div className="column">
                            <h3 className="loud-text" ref={addToRefs}>Bhushan Kumar</h3>
                            <p ref={addToRefs}>
                                The event also acknowledged Bhushan Kumar, Chairman and Managing Director of T-Series, for his contribution to the global entertainment and music industry. Under his leadership, T-Series has evolved into one of the world’s largest music and film production companies, redefining the reach of Indian content internationally.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlight Section - Indra Nooyi */}
            <section className="stardust-highlight">
                <div className="container">
                    <h2 className="loud-text center" ref={addToRefs}>Global Leadership</h2>
                    <p className="center x-large" ref={addToRefs}>
                        A highlight of the evening was the recognition of <strong>Indra Nooyi</strong>, former Chairman and CEO of PepsiCo, whose remarkable corporate journey has made her one of the most respected business leaders globally. Honoring Nooyi underscored Stardust’s intent to spotlight Indian excellence beyond entertainment — particularly in global corporate leadership and innovation.
                    </p>
                </div>
            </section>

            {/* Closing Section */}
            <section className="stardust-closing">
                <div className="container">
                    <p ref={addToRefs}>
                        Beyond the awards, the evening featured cultural performances, fashion showcases, and a strong emphasis on social awareness, reinforcing Stardust’s broader commitment to positive change. The ceremony attracted an influential audience comprising global Indian leaders, entrepreneurs, artists, and dignitaries, making it a significant cultural moment for the Indian diaspora in the United States.
                    </p>
                    <div className="stardust-final-quote" ref={addToRefs}>
                        <p>
                            The Stardust Icon Awards 2017 stood as a testament to the power of Indian talent on the global stage — celebrating achievement, inspiring future generations, and reinforcing the idea that Indian excellence continues to shape industries and communities worldwide.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StardustAwards;
