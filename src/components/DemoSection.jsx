import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from 'sonner';
import { Download, FileText, Clock, CheckCircle2, Loader2, Zap, BrainCircuit, FileJson, Database } from 'lucide-react';
import { statusToProgress, statusToStep } from '@/lib/utils';


// 🎯 CHANGED: The front-end now calls your local script.
const API_BASE_URL = 'http://localhost:8000';

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
          // Stop polling if the task is no longer found (e.g., server restarted)
          if(response.status === 404) {
             toast.error('Task not found. Please start a new one.');
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
          toast.success('Q&A Dataset generation complete!');
          setIsLoading(false);
          setCurrentStep(5);
        }
        if (data.state === 'FAILURE') {
          toast.error(data.info?.status || 'Task failed spectacularly!');
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
    if (!topic) {
      toast.warning('A topic is required to begin.');
      return;
    }

    setIsLoading(true);
    setTask(null);
    setProgress(0);
    setCurrentStep(0);
    toast.info('Initiating generation pipeline...');

    try {
      // 🎯 CHANGED: The POST request now goes to the new local endpoint.
      const response = await fetch(`${API_BASE_URL}/generate-qa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `topic=${encodeURIComponent(topic)}`,
      });

      if (!response.ok) throw new Error(`Server responded with ${response.status}`);

      const data = await response.json();
      setTask({ id: data.task_id, state: 'PENDING' });
      setCurrentStep(1); // Move to the first step visually
    } catch (error) {
      console.error("Error starting task:", error);
      toast.error('Could not connect to the local generation script. Is it running?');
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    // 🎯 CHANGED: This now downloads the final QA pairs as a JSON file.
    const qaData = task?.result?.qa_pairs;
    if (qaData) {
      const blob = new Blob([JSON.stringify(qaData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const fileName = `${task.result.topic.replace(/\s+/g, '_')}_dataset.json`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('JSON dataset downloaded!');
    }
  };
  
  // ✨ NEW: A more visually appealing progress tracker component.
  const ProgressTracker = () => {
    const steps = [
      { step: 1, label: "Initializing", icon: <Zap className="w-4 h-4" /> },
      { step: 2, label: "Data Collection", icon: <Database className="w-4 h-4" /> },
      { step: 3, label: "Web Scraping", icon: <FileText className="w-4 h-4" /> },
      { step: 4, label: "Q&A Generation", icon: <BrainCircuit className="w-4 h-4" /> },
      { step: 5, label: "Complete", icon: <CheckCircle2 className="w-4 h-4" /> }
    ];

    return (
      <div className="flex justify-between items-center w-full">
        {steps.map((item, index) => (
          <>
            <div key={item.step} className="flex flex-col items-center z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                currentStep >= item.step ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'
              }`}>
                {currentStep > item.step ? <CheckCircle2 className="w-5 h-5" /> : item.icon}
              </div>
              <p className={`mt-2 text-xs text-center font-semibold transition-colors duration-500 ${
                 currentStep >= item.step ? 'text-white' : 'text-slate-500'
              }`}>
                {item.label}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 bg-slate-700 -mx-4">
                 <div className="h-1 bg-blue-600 transition-all duration-500" style={{ width: currentStep > index + 1 ? '100%' : (currentStep === index + 1 ? `${(progress % 20) * 5}%` : '0%') }} />
              </div>
            )}
          </>
        ))}
      </div>
    );
  };

  return (
    <section id="demo" className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Live Demo</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Enter any topic and watch our AI pipeline construct a high-quality Q&A dataset in real-time.
          </p>
        </div>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardContent className="p-8 space-y-8">
            {/* Input Section */}
            <div>
              <Label htmlFor="demo-topic" className="text-lg font-semibold text-white mb-2">
                Topic
              </Label>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  id="demo-topic"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., The Future of Renewable Energy"
                  disabled={isLoading}
                  className="text-lg h-14 bg-slate-900 border-slate-700 focus:border-blue-500 ring-offset-slate-950 text-white placeholder-slate-500"
                />
                <Button 
                  onClick={handleSubmit}
                  disabled={isLoading || !topic.trim()} 
                  className="w-full sm:w-auto h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-8"
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <Zap className="w-6 h-6" />
                  )}
                  <span className="ml-3">Generate</span>
                </Button>
              </div>
            </div>

            {/* Progress Section */}
            {task && (
              <div className="space-y-6 pt-4 animate-in fade-in duration-500">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-4">Generation Pipeline</h3>
                  <p className="font-mono text-sm text-slate-400 bg-slate-800/50 inline-block px-3 py-1 rounded-md">
                    {task.info?.status || `Status: ${task.state}`}
                  </p>
                </div>
                <ProgressTracker />
              </div>
            )}

            {/* Results Section */}
            {task?.state === 'SUCCESS' && task.result && (
              <div className="animate-in fade-in duration-700 pt-4">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">Dataset Ready!</h3>
                          <p className="text-emerald-400 font-medium">Your Q&A dataset has been generated.</p>
                        </div>
                      </div>
                      <Button onClick={handleDownload} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        <Download className="w-4 h-4 mr-2" />
                        Download .json
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="bg-slate-900/70 rounded-lg p-4">
                        <div className="text-sm text-slate-400 mb-1">Topic</div>
                        <div className="font-semibold text-white truncate">{task.result.topic}</div>
                      </div>
                      <div className="bg-slate-900/70 rounded-lg p-4">
                        <div className="text-sm text-slate-400 mb-1">Q&A Pairs Generated</div>
                        <div className="font-semibold text-white">{task.result.qa_pairs?.length || '0'}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <FileJson className="w-4 h-4" />
                        Preview
                      </h4>
                      <pre className="text-xs text-slate-300 overflow-auto max-h-40 p-3 bg-slate-900 rounded border border-slate-700 font-mono whitespace-pre-wrap">
                        {JSON.stringify(task.result.qa_pairs?.slice(0, 2), null, 2)}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DemoSection;