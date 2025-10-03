import { CheckCircle2, Sparkles } from 'lucide-react';

// Pricing Section Component
const PricingSection = () => {
  const plans = [
    { 
      name: "Starter", 
      price: "$29", 
      period: "/month", 
      description: "Perfect for individual researchers and small projects.", 
      features: ["100 datasets/month", "Up to 1,000 Q&A pairs", "5 languages", "CSV & JSON export", "Email support"], 
      buttonText: "Start Free Trial", 
      highlighted: false 
    },
    { 
      name: "Professional", 
      price: "$99", 
      period: "/month", 
      description: "Ideal for teams and growing businesses.", 
      features: ["500 datasets/month", "Up to 5,000 Q&A pairs", "15 languages", "All export formats", "API access", "Priority support"], 
      buttonText: "Start Free Trial", 
      highlighted: true 
    },
    { 
      name: "Enterprise", 
      price: "Custom", 
      period: "", 
      description: "For large organizations with specific needs.", 
      features: ["Unlimited datasets", "Unlimited Q&A pairs", "25+ languages", "Custom integrations", "Dedicated support"], 
      buttonText: "Contact Sales", 
      highlighted: false 
    }
  ];

  return (
    <section id="pricing" className="py-32 bg-[#edead7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[#f8f7f2]/70 border border-[#d1caca]/80 rounded-full px-4 py-2 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-[#03ef62]" />
            <span className="text-sm font-medium text-[#5c5c5c]">Pricing</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-[#333333] mb-6 tracking-tight">Simple, Transparent Pricing</h2>
          <p className="text-xl text-[#5c5c5c] max-w-2xl mx-auto">
            Choose a plan that fits your needs. Start free and scale as you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative bg-[#f8f7f2]/70 rounded-3xl p-8 transition-all duration-300 ${
                plan.highlighted 
                  ? 'border-2 border-[#03ef62] shadow-2xl shadow-[#03ef62]/10 scale-105' 
                  : 'border border-[#d1caca]/80'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#03ef62] text-[#333333] px-4 py-1.5 text-sm font-bold rounded-full shadow-lg shadow-[#03ef62]/30">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#333333] mb-3">{plan.name}</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-bold text-[#333333]">{plan.price}</span>
                  <span className="text-[#7a7a7a] ml-2 text-lg">{plan.period}</span>
                </div>
                <p className="text-[#5c5c5c] leading-relaxed">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#03ef62] flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-[#5c5c5c]">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full h-12 text-base font-bold rounded-xl transition-all duration-200 ${
                  plan.highlighted 
                    ? 'bg-[#03ef62] hover:bg-[#02d957] text-[#333333] shadow-lg shadow-[#03ef62]/20' 
                    : 'bg-[#d1caca] hover:bg-[#b0aeab] text-[#333333] border border-[#d1caca]'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
