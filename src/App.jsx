import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import DemoSection from './components/DemoSection';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';

// Main App Component
function App() {
  return (
    <div className="min-h-screen w-screen bg-[#edead7] text-[#5c5c5c]">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d1caca_1px,transparent_1px),linear-gradient(to_bottom,#d1caca_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"></div>
      </div>

      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
