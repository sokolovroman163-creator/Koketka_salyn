import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import About from './sections/About';
import Services from './sections/Services';
import Pricing from './sections/Pricing';
import Team from './sections/Team';
import Testimonials from './sections/Testimonials';
import Gallery from './sections/Gallery';
import Booking from './sections/Booking';
import Footer from './sections/Footer';
import AdminPanel from './admin/AdminPanel';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';
import './App.css';

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navigation />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Pricing />
        <Team />
        <Gallery />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

function App() {
  // Show preloader only once per session
  const [showPreloader, setShowPreloader] = useState(
    () => !sessionStorage.getItem('preloader_shown')
  );

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('preloader_shown', '1');
    setShowPreloader(false);
  };

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
