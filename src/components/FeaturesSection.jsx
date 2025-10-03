import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Globe, Cpu, BookOpen, Target } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    { icon: <Zap className="h-6 w-6" />, title: "Lightning Fast Generation", description: "Our optimized AI pipeline generates comprehensive datasets in under 5 minutes." },
    { icon: <Cpu className="h-6 w-6" />, title: "AI-Powered Processing", description: "Advanced neural networks ensure contextually relevant and diverse Q&A pairs." },
    { icon: <Target className="h-6 w-6" />, title: "High Accuracy", description: "Advanced fact-checking and content validation ensures a 99.2% accuracy rate." },
    { icon: <Globe className="h-6 w-6" />, title: "Multi-Source Scraping", description: "Gathers data from Wikipedia, news articles, and web search for comprehensive coverage." },
    { icon: <BookOpen className="h-6 w-6" />, title: "Multiple Formats", description: "Export to JSON, CSV, or integrate directly via our robust developer API." },
    { icon: <Shield className="h-6 w-6" />, title: "Enterprise Security", description: "Your data is protected with enterprise-grade security and privacy compliance." },
  ];

  return (
    <section id="features" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">The Ultimate Toolkit for AI Data</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Powerful features designed for researchers, developers, and organizations building the next generation of AI applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            // ✨ STYLE: Added a subtle glowing border effect on hover
            <Card key={index} className="bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-colors duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-900 ring-1 ring-slate-700 rounded-lg flex items-center justify-center text-blue-500">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-400">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;