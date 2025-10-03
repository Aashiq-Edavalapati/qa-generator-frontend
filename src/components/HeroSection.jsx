import { ArrowRight, ChevronRight, Database, Sparkles, Star, Users } from 'lucide-react';

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#03ef62]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#03ef62]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#f8f7f2]/70 border border-[#d1caca]/80 rounded-full px-4 py-2 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#03ef62]" />
            <span className="text-sm font-medium text-[#5c5c5c]">Powered by Advanced AI</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#333333] tracking-tighter leading-tight">
            Build Production-Ready
            <span className="block text-[#03ef62] mt-2">Q&A Datasets</span>
            <span className="block text-[#333333] mt-2">in Minutes</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#5c5c5c] max-w-3xl mx-auto leading-relaxed">
            Transform any topic into comprehensive, high-quality Q&A datasets.
            <span className="block mt-2">Accelerate your ML training and research workflows.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button className="group bg-[#03ef62] hover:bg-[#02d957] text-[#333333] text-lg px-8 py-4 rounded-xl font-bold transition-all duration-200 shadow-xl shadow-[#03ef62]/20 flex items-center gap-2">
              Start Generating
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button className="border-2 border-[#b0aeab] hover:border-[#a09e9b] hover:bg-[#d1caca]/50 text-[#5c5c5c] text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2">
              Try Demo Below
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-16 text-[#5c5c5c]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#f8f7f2]/70 border border-[#d1caca]/80 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-[#03ef62]" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-[#333333]">10K+</div>
                <div className="text-sm text-[#7a7a7a]">Active Users</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#f8f7f2]/70 border border-[#d1caca]/80 rounded-lg flex items-center justify-center">
                <Database className="h-5 w-5 text-[#03ef62]" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-[#333333]">1M+</div>
                <div className="text-sm text-[#7a7a7a]">Datasets Created</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#f8f7f2]/70 border border-[#d1caca]/80 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5 text-[#03ef62] fill-[#03ef62]" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-[#333333]">4.9/5</div>
                <div className="text-sm text-[#7a7a7a]">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
