import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const PricingSection = () => {
  const plans = [
    { name: "Starter", price: "$29", period: "/month", description: "Perfect for individual researchers and small projects.", features: ["100 datasets per month", "Up to 1,000 Q&A pairs each", "5 languages supported", "CSV & JSON export", "Email support"], buttonText: "Start Free Trial", highlighted: false },
    { name: "Professional", price: "$99", period: "/month", description: "Ideal for teams and growing businesses.", features: ["500 datasets per month", "Up to 5,000 Q&A pairs each", "15 languages supported", "All export formats", "API access", "Priority support"], buttonText: "Start Free Trial", highlighted: true },
    { name: "Enterprise", price: "Custom", period: "", description: "For large organizations with specific needs.", features: ["Unlimited datasets", "Unlimited Q&A pairs", "25+ languages", "Advanced API integrations", "Dedicated support & SLA"], buttonText: "Contact Sales", highlighted: false }
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Flexible Pricing for Any Scale</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Choose a plan that fits your needs. Start for free and upgrade as you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative bg-slate-950 border ${
                plan.highlighted 
                  // ✨ STYLE: Added a glowing shadow to the highlighted plan
                  ? 'border-blue-500 shadow-2xl shadow-blue-600/20' 
                  : 'border-slate-800'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 text-sm font-semibold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-slate-400 h-10">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full h-12 text-lg font-semibold ${
                    plan.highlighted 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;