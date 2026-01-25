import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const pageRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Content Reveal
      const tl = gsap.timeline();

      tl.fromTo('.contact-hero__content > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power4.out',
          delay: 0.5
        }
      );

      // 2. Sections Reveal
      gsap.fromTo('.contact-form-wrapper',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo('.contact-info__card',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      message: ''
    });

    setTimeout(() => {
      setSubmitStatus(null);
    }, 5000);
  };

  return (
    <div className="contact-page" ref={pageRef}>
      {/* Redesigned Hero Section with Clear Video */}
      <section className="contact-hero">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="contact-hero__video-bg"
        >
          <source src="/contact.mp4" type="video/mp4" />
        </video>
        <div className="contact-hero__overlay" />

        <div className="contact-hero__container">
          <div className="contact-hero__content">
            <span className="contact-hero__label">Connect</span>
            <h1 className="contact-hero__title">Start a<br />Conversation</h1>
            <p className="contact-hero__subtitle">
              For brands, platforms, and individuals seeking something considered, refined, and distinct.
            </p>
          </div>
        </div>
      </section>

      {/* Redesigned Contact Section */}
      <section className="contact-section">
        <div className="contact-section__container">
          <div className="contact-grid">
            {/* Glassmorphism Contact Form */}
            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2 className="contact-form__title">Send a Message</h2>
                <p className="contact-form__subtitle">
                  Tell us about your project or event.
                </p>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input form-select"
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="event-inquiry">Event Inquiry</option>
                    <option value="brand-partnership">Brand Partnership</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input form-textarea"
                    required
                    placeholder="How can we help?"
                    rows="6"
                  />
                </div>

                <button
                  type="submit"
                  className={`btn btn-primary contact-form__submit ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus === 'success' && (
                  <div className="form-success">
                    <p>Thank you! We'll be in touch shortly.</p>
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info">
              <div className="contact-info__card">
                <h3 className="contact-info__title">Get in Touch</h3>

                <div className="contact-info__items">
                  <div className="contact-info__item">
                    <div className="contact-info__label">Email</div>
                    <a href="mailto:hello@conclayve.com" className="contact-info__value">
                      hello@conclayve.com
                    </a>
                  </div>

                  <div className="contact-info__item">
                    <div className="contact-info__label">Location</div>
                    <span className="contact-info__value">New York, USA</span>
                  </div>

                  <div className="contact-info__item">
                    <div className="contact-info__label">Follow Us</div>
                    <div className="contact-info__social">
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
