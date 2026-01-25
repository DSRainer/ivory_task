import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Hero from '../../components/Hero/Hero';
import Intro from '../../components/Intro/Intro';
import Philosophy from '../../components/Philosophy/Philosophy';
import Experiences from '../../components/Experiences/Experiences';
import SelectedWork from '../../components/SelectedWork/SelectedWork';
import Difference from '../../components/Difference/Difference';
import ClientLogos from '../../components/ClientLogos/ClientLogos';
import CTA from '../../components/CTA/CTA';

import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    // Refresh ScrollTrigger when page loads
    ScrollTrigger.refresh();

    return () => {
      // Kill all ScrollTriggers when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="home-page">
      <Hero />
      <Intro />
      <Philosophy />
      <Experiences />
      <SelectedWork />
      <Difference />
      <ClientLogos />
      <CTA />
    </div>
  );
};

export default Home;
