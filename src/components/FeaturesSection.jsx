import { Zap, BrainCircuit, Target, Globe, Code2, Shield, Sparkles } from 'lucide-react';

// Features Section Component
const FeaturesSection = () => {
  const features = [
    { icon: <Zap className="h-6 w-6" />, title: "Lightning Fast", description: "Generate comprehensive datasets in under 5 minutes with our optimized pipeline.", color: "text-[#03ef62]" },
    { icon: <BrainCircuit className="h-6 w-6" />, title: "AI-Powered", description: "Advanced neural networks ensure contextually relevant Q&A pairs.", color: "text-[#03ef62]" },
    { icon: <Target className="h-6 w-6" />, title: "High Accuracy", description: "Advanced validation ensures 99.2% accuracy rate across all datasets.", color: "text-[#03ef62]" },
    { icon: <Globe className="h-6 w-6" />, title: "Multi-Source", description: "Aggregates data from Wikipedia, news, and web for comprehensive coverage.", color: "text-[#03ef62]" },
    { icon: <Code2 className="h-6 w-6" />, title: "Multiple Formats", description: "Export to JSON, CSV, or integrate via our robust developer API.", color: "text-[#03ef62]" },
    { icon: <Shield className="h-6 w-6" />, title: "Enterprise Ready", description: "Bank-grade security with SOC 2 compliance and data encryption.", color: "text-[#03ef62]" },
  ];

  return (
    <section id="features" className="py-32 bg-[#edead7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[#f8f7f2]/70 border border-[#d1caca]/80 rounded-full px-4 py-2 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-[#03ef62]" />
            <span className="text-sm font-medium text-[#5c5c5c]">Features</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-[#333333] mb-6 tracking-tight">Everything You Need</h2>
          <p className="text-xl text-[#5c5c5c] max-w-2xl mx-auto">
            Powerful features designed for researchers, developers, and organizations building next-gen AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="group bg-[#f8f7f2]/70 border border-[#d1caca]/80 hover:border-[#b0aeab]/80 rounded-2xl p-8 transition-all duration-300 hover:bg-[#f8f7f2]">
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-14 h-14 bg-[#f8f7f2] border border-[#d1caca]/80 rounded-xl flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#333333] mb-2">{feature.title}</h3>
                  <p className="text-[#5c5c5c] leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
