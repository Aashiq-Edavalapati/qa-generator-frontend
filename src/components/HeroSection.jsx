import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Users, Database, Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden pt-20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter">
            Build Production-Ready
            {/* ✨ STYLE: Applied the aurora gradient to the main headline */}
            <span className="block aurora-text">AI Datasets in Minutes</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Transform any topic into comprehensive, high-quality Q&A datasets.
            Accelerate your machine learning, chatbot training, and research workflows.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              // ✨ STYLE: Added a vibrant gradient and hover effect to the primary CTA
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-lg px-8 py-4 h-auto font-semibold shadow-lg shadow-blue-600/20 transition-transform duration-200 hover:scale-105"
            >
              Start Generating
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-slate-700 text-slate-300 bg-slate-900/50 hover:bg-slate-800 hover:text-white text-lg px-8 py-4 h-auto"
            >
              Try Demo Below
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 pt-12 text-slate-400">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>10,000+ Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>1M+ Datasets Generated</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;