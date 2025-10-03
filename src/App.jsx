import { useState, useEffect } from 'react';
import { CheckCircle2, Database, Menu, X, Zap, Shield, Globe, Cpu, BookOpen, Target, ArrowRight, ChevronRight, Users, Star, Download, FileText, Loader2, BrainCircuit, FileJson, Sparkles, Code2, TrendingUp } from 'lucide-react';

// Utility Functions
const statusToProgress = (status) => {
  if (!status) return 0;
  if (status.includes('Initializing')) return 10;
  if (status.includes('Collecting')) return 30;
  if (status.includes('Scraping')) return 60;
  if (status.includes('Generating')) return 85;
  if (status.includes('Complete')) return 100;
  return 0;
};

const statusToStep = (status) => {
  if (!status) return 0;
  if (status.includes('Initializing')) return 1;
  if (status.includes('Collecting')) return 2;
  if (status.includes('Scraping')) return 3;
  if (status.includes('Generating')) return 4;
  if (status.includes('Complete')) return 5;
  return 0;
};

// API Configuration
const API_BASE_URL = 'http://localhost:8000';

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

// Demo Section Component
const DemoSection = () => {
  const [topic, setTopic] = useState('');
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!task || !task.id || ['SUCCESS', 'FAILURE'].includes(task.state)) {
      return;
    }

    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/status/${task.id}`);
        if (!response.ok) {
          if(response.status === 404) {
             setIsLoading(false);
             setTask(null);
          }
          return;
        }
        const data = await response.json();
        
        setTask(prevTask => ({ ...prevTask, ...data }));
        const newProgress = statusToProgress(data.info?.status);
        const newStep = statusToStep(data.info?.status);
        setProgress(newProgress);
        setCurrentStep(newStep);

        if (data.state === 'SUCCESS') {
          setIsLoading(false);
          setCurrentStep(5);
        }
        if (data.state === 'FAILURE') {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching status:", error);
        setIsLoading(false);
      }
    }, 2500);

    return () => clearInterval(intervalId);
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic) return;

    setIsLoading(true);
    setTask(null);
    setProgress(0);
    setCurrentStep(0);

    try {
      const response = await fetch(`${API_BASE_URL}/generate-qa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `topic=${encodeURIComponent(topic)}`,
      });

      if (!response.ok) throw new Error(`Server responded with ${response.status}`);

      const data = await response.json();
      setTask({ id: data.task_id, state: 'PENDING' });
      setCurrentStep(1);
    } catch (error) {
      console.error("Error starting task:", error);
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const qaData = task?.result?.qa_pairs;
    if (qaData) {
      const blob = new Blob([JSON.stringify(qaData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const fileName = `${task.result.topic.replace(/\s+/g, '_')}_dataset.json`;
      link.download = fileName;
      document.body.appendChild(link);
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const ProgressTracker = () => {
    const steps = [
      { step: 1, label: "Initialize", icon: <Zap className="w-4 h-4" /> },
      { step: 2, label: "Collect Data", icon: <Database className="w-4 h-4" /> },
      { step: 3, label: "Web Scraping", icon: <Globe className="w-4 h-4" /> },
      { step: 4, label: "Generate Q&A", icon: <BrainCircuit className="w-4 h-4" /> },
      { step: 5, label: "Complete", icon: <CheckCircle2 className="w-4 h-4" /> }
    ];

    return (
      <div className="relative">
        {/* Progress Bar Background */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#d1caca]">
          <div 
            className="h-full bg-[#03ef62] transition-all duration-500 ease-out"
            style={{ width: `${(currentStep > 1 ? ((currentStep - 1) / (steps.length - 1)) * 100 : 0)}%` }}
          ></div>
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((item) => (
            <div key={item.step} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${
                currentStep >= item.step 
                  ? 'bg-[#03ef62] border-[#03ef62] text-[#333333]' 
                  : 'bg-[#f8f7f2] border-[#d1caca] text-[#a09e9b]'
              }`}>
                {currentStep > item.step ? <CheckCircle2 className="w-5 h-5" /> : item.icon}
              </div>
              <p className={`mt-3 text-xs font-semibold text-center transition-colors duration-500 ${
                currentStep >= item.step ? 'text-[#333333]' : 'text-[#a09e9b]'
              }`}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="demo" className="py-32 bg-[#edead7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#f8f7f2]/70 border border-[#d1caca]/80 rounded-full px-4 py-2 backdrop-blur-sm mb-6">
            <TrendingUp className="w-4 h-4 text-[#03ef62]" />
            <span className="text-sm font-medium text-[#5c5c5c]">Interactive Demo</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-[#333333] mb-6 tracking-tight">See It In Action</h2>
          <p className="text-xl text-[#5c5c5c] max-w-2xl mx-auto">
            Enter any topic and watch our AI pipeline construct a high-quality Q&A dataset in real-time.
          </p>
        </div>

        <div className="bg-[#f8f7f2] border border-[#d1caca]/80 rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Input Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="demo-topic" className="block text-lg font-semibold text-[#333333] mb-3">
                What topic would you like to explore?
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  id="demo-topic"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Quantum Computing, Climate Change, Space Exploration..."
                  disabled={isLoading}
                  className="flex-1 text-lg h-14 bg-white border border-[#b0aeab] focus:border-[#03ef62] focus:ring-2 focus:ring-[#03ef62]/20 rounded-xl px-5 text-[#333333] placeholder-[#7a7a7a] outline-none transition-all duration-200 disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !topic.trim()} 
                  className="w-full sm:w-auto h-14 px-8 text-lg font-bold bg-[#03ef62] hover:bg-[#02d957] disabled:opacity-50 disabled:cursor-not-allowed text-[#333333] rounded-xl transition-all duration-200 shadow-lg shadow-[#03ef62]/20 flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Zap className="w-5 h-5" />
                  )}
                  <span>Generate</span>
                </button>
              </div>
            </div>
          </form>

          {/* Progress Section */}
          {task && (
            <div className="space-y-8 pt-12 border-t border-[#d1caca]/80 mt-12">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#333333] mb-3">Generation Pipeline</h3>
                <p className="font-mono text-sm text-[#7a7a7a] bg-white inline-block px-4 py-2 rounded-lg border border-[#d1caca]/80">
                  {task.info?.status || `Status: ${task.state}`}
                </p>
              </div>
              <ProgressTracker />
            </div>
          )}

          {/* Results Section */}
          {task?.state === 'SUCCESS' && task.result && (
            <div className="pt-12 border-t border-[#d1caca]/80 mt-12 space-y-6">
              <div className="bg-[#f8f7f2]/70 border border-[#d1caca]/80 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#03ef62] rounded-xl flex items-center justify-center shadow-lg shadow-[#03ef62]/20">
                      <CheckCircle2 className="w-7 h-7 text-[#333333]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#333333]">Dataset Ready!</h3>
                      <p className="text-[#02a847] font-medium">Your Q&A dataset has been generated successfully.</p>
                    </div>
                  </div>
                  <button onClick={handleDownload} className="bg-[#03ef62] hover:bg-[#02d957] text-[#333333] px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all duration-200 shadow-lg shadow-[#03ef62]/20">
                    <Download className="w-4 h-4" />
                    Download JSON
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-5 border border-[#d1caca]/80">
                    <div className="text-sm text-[#7a7a7a] mb-1 font-medium">Topic</div>
                    <div className="font-semibold text-[#333333] text-lg truncate">{task.result.topic}</div>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-[#d1caca]/80">
                    <div className="text-sm text-[#7a7a7a] mb-1 font-medium">Q&A Pairs Generated</div>
                    <div className="font-semibold text-[#333333] text-lg">{task.result.qa_pairs?.length || '0'}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-[#333333] mb-3 flex items-center gap-2 text-lg">
                    <FileJson className="w-5 h-5 text-[#03ef62]" />
                    Dataset Preview
                  </h4>
                  <pre className="text-xs text-[#5c5c5c] overflow-auto max-h-64 p-4 bg-white rounded-xl border border-[#d1caca]/80 font-mono leading-relaxed">
                    {JSON.stringify(task.result.qa_pairs?.slice(0, 2), null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

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

// Footer Component
const Footer = () => {
  const footerSections = [
    { title: "Product", links: ["Features", "Pricing", "API Docs", "Integrations"] },
    { title: "Company",  links: ["About Us", "Blog", "Careers", "Contact"] },
    { title: "Resources", links: ["Documentation", "Help Center", "Status", "Terms"] },
  ];

  return (
    <footer className="bg-[#f8f7f2] border-t border-[#d1caca]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#03ef62] rounded-xl flex items-center justify-center shadow-lg shadow-[#03ef62]/20">
                <Database className="w-5 h-5 text-[#333333]" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-[#333333]">DatasetPro</span>
            </div>
            <p className="text-[#5c5c5c] text-sm leading-relaxed">
              Building the future of AI training data, one dataset at a time.
            </p>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-[#333333] font-bold mb-4 text-sm uppercase tracking-wider">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-[#5c5c5c] hover:text-[#03ef62] transition-colors duration-200 text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#d1caca]/80 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#7a7a7a] text-sm">
              © {new Date().getFullYear()} DatasetPro. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-[#5c5c5c] hover:text-[#03ef62] text-sm transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-[#5c5c5c] hover:text-[#03ef62] text-sm transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

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