import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Layout Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home/Home';
import Work from './pages/Work/Work';
import Services from './pages/Services/Services';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import StardustAwards from './pages/WorkDetail/StardustAwards';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const location = useLocation();

  // Aggressive Scroll to top and Refresh ScrollTrigger on route change
  useLayoutEffect(() => {
    // Disable browser's default scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Immediate scroll reset
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Delayed refresh to allow layout to settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();

      // Ensure app is visible (fixes transition blank page)
      gsap.to('.app', {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/work/stardust-awards" element={<StardustAwards />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
