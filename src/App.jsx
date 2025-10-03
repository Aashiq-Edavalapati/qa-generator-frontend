import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import DemoSection from './components/DemoSection';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen w-screen bg-slate-950 text-slate-100">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      {/* Radial gradient for a nice top glow */}
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <Toaster 
        richColors 
        position="top-center"
        theme="dark"
        toastOptions={{
          style: {
            background: 'rgba(17, 24, 39, 0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(120, 119, 198, 0.2)',
            color: '#ffffff',
          }
        }}
      />
      
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