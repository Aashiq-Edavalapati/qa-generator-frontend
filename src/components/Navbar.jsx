import { useState, useEffect } from 'react';
import { Database, Menu, X } from 'lucide-react';

// Navbar Component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Demo', href: '#demo' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#edead7]/90 backdrop-blur-xl border-b border-[#d1caca]/50' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-[#03ef62] rounded-xl flex items-center justify-center shadow-lg shadow-[#03ef62]/20">
              <Database className="w-6 h-6 text-[#333333]" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-[#333333] tracking-tight">DatasetPro</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-[#5c5c5c] hover:text-[#333333] hover:bg-[#d1caca]/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <button className="text-[#5c5c5c] hover:text-[#333333] hover:bg-[#d1caca]/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              Sign In
            </button>
            <button className="bg-[#03ef62] hover:bg-[#02d957] text-[#333333] px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg shadow-[#03ef62]/20">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#5c5c5c] hover:text-[#333333] p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-1 bg-[#f8f7f2]/95 backdrop-blur-xl border border-[#d1caca]/50 rounded-2xl p-2 mt-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-[#5c5c5c] hover:text-[#333333] hover:bg-[#d1caca]/50 block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="border-t border-[#d1caca]/50 pt-2 mt-2 space-y-2">
                <button className="w-full text-[#5c5c5c] hover:text-[#333333] hover:bg-[#d1caca]/50 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200">
                  Sign In
                </button>
                <button className="w-full bg-[#03ef62] hover:bg-[#02d957] text-[#333333] px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
