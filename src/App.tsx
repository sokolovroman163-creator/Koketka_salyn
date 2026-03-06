import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import About from './sections/About';
import Services from './sections/Services';
import Pricing from './sections/Pricing';
import Team from './sections/Team';
import Testimonials from './sections/Testimonials';
import Booking from './sections/Booking';
import Footer from './sections/Footer';
import './App.css';

function App() {
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
        <Testimonials />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}

export default App;
