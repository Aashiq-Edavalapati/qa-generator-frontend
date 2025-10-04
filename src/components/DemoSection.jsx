import { useState, useEffect } from 'react';
import { CheckCircle2, Database, Globe, Zap, Download, Loader2, BrainCircuit, FileJson, TrendingUp, FileText, RefreshCw, Send } from 'lucide-react';
import { statusToStep } from '../lib/utils';

// API Configuration
const SCRAPER_API_BASE_URL = 'https://qa-scraper-api.onrender.com';
const QA_API_BASE_URL = 'http://localhost:8000'; // Placeholder for local Q&A generation

const DemoSection = () => {
  const [topic, setTopic] = useState('');
  const [processStage, setProcessStage] = useState('idle'); // 'idle', 'scraping', 'scraping_complete', 'generating_qa', 'qa_complete'
  const [task, setTask] = useState(null);
  const [rawTextResult, setRawTextResult] = useState('');
  const [qaResult, setQAResult] = useState(null);
  const [currentStatusMessage, setCurrentStatusMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  // This effect handles polling for both scraping and Q&A generation tasks
  useEffect(() => {
    let intervalId = null;

    if (task?.id && ['scraping', 'generating_qa'].includes(processStage)) {
      intervalId = setInterval(async () => {
        const isScraping = processStage === 'scraping';
        const baseUrl = isScraping ? SCRAPER_API_BASE_URL : QA_API_BASE_URL;

        try {
          const response = await fetch(`${baseUrl}/status/${task.id}`);
          if (!response.ok) {
            if (response.status === 404) {
               console.error("Task not found. Resetting.");
               handleReset();
            }
            clearInterval(intervalId);
            return;
          }

          const data = await response.json();
          setTask(prevTask => ({ ...prevTask, ...data }));
          
          const status = data.state;
          setCurrentStatusMessage(status);
          
          const newStep = statusToStep(status);
          // Always update step to reflect progress, even within same stage
          if (newStep > 0) {
              setCurrentStep(newStep);
          }

          if (data.state === 'SUCCESS') {
            clearInterval(intervalId);
            if (isScraping) {
              setRawTextResult(data.result.content);
              setProcessStage('scraping_complete');
              setCurrentStep(3); // Mark scraping as fully complete
            } else {
              setQAResult(data.result);
              setProcessStage('qa_complete');
              setCurrentStep(5);
            }
          } else if (data.state === 'FAILURE') {
            console.error("Task failed:", data.error);
            alert(`The task failed: ${data.error}. Please try again.`);
            clearInterval(intervalId);
            handleReset();
          }
        } catch (error) {
          console.error("Error fetching status:", error);
          clearInterval(intervalId);
        }
      }, 2500);
    }

    return () => {
        if(intervalId) {
            clearInterval(intervalId);
        }
    };
  }, [task, processStage, currentStep]);


  const handleScrapeSubmit = async (e) => {
    e.preventDefault();
    if (!topic) return;

    handleReset(); // Reset component state for a new task
    setProcessStage('scraping');
    setCurrentStep(1);
    setCurrentStatusMessage('Initializing scraping task...');

    try {
      const response = await fetch(`${SCRAPER_API_BASE_URL}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `topic=${encodeURIComponent(topic)}`,
      });

      if (!response.ok) throw new Error(`Server responded with ${response.status}`);

      const data = await response.json();
      setTask({ id: data.task_id, state: 'PENDING' });
    } catch (error) {
      console.error("Error starting scrape task:", error);
      alert("Failed to start the scraping task. Please check the console for details.");
      handleReset();
    }
  };

  const handleGenerateQASubmit = async () => {
      setProcessStage('generating_qa');
      setCurrentStatusMessage('Initializing Q&A generation...');
      setCurrentStep(4); // Set current step to 4 for Q&A generation

      // --- MOCK API CALL FOR LOCAL QA GENERATION ---
      console.log("Sending raw text to local QA API (placeholder)...");
      const mockTaskId = `mock-qa-task-${Date.now()}`;
      setTask({ id: mockTaskId, state: 'PENDING' });

      setTimeout(() => {
          const mockResult = { topic: topic, qa_pairs: [{question: `What is the significance of ${topic}?`, answer: `Details about ${topic} would be generated here.`}, {question: `When was ${topic} first discovered?`, answer: "This is a placeholder answer."}] };
          setTask(prev => ({ ...prev, state: 'SUCCESS', info: { status: 'Generation Complete' }, result: mockResult }));
          setCurrentStatusMessage('Generation Complete');
          setQAResult(mockResult);
          setProcessStage('qa_complete');
          setCurrentStep(5);
      }, 3000);
      // --- END MOCK API CALL ---
  };

  const handleDownload = (content, filename, contentType) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  const handleReset = () => {
    setTopic('');
    setProcessStage('idle');
    setTask(null);
    setRawTextResult('');
    setQAResult(null);
    setCurrentStatusMessage('');
    setCurrentStep(0);
  };

  const isLoading = processStage === 'scraping' || processStage === 'generating_qa';

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
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#d1caca]">
          <div 
            className="h-full bg-[#03ef62] transition-all duration-500 ease-out"
            style={{ width: `${currentStep > 1 ? ((currentStep - 1) / (steps.length - 1)) * 100 : 0}%` }}
          ></div>
        </div>
        <div className="relative flex justify-between">
          {steps.map((item) => {
            // FIX: Simplified and more robust logic for determining step state
            const isComplete = currentStep > item.step ||
                               (processStage === 'scraping_complete' && item.step <= 3) ||
                               processStage === 'qa_complete';
            const isInProgress = isLoading && currentStep === item.step;

            return (
              <div key={item.step} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${
                  isComplete
                    ? 'bg-[#03ef62] border-[#03ef62] text-[#333333]'
                    : isInProgress
                    ? 'bg-amber-400 border-amber-400 text-[#333333] animate-pulse'
                    : 'bg-[#f8f7f2] border-[#d1caca] text-[#a09e9b]'
                }`}>
                  {isComplete ? <CheckCircle2 className="w-5 h-5" /> : item.icon}
                </div>
                <p className={`mt-3 text-xs font-semibold text-center transition-colors duration-500 ${
                  currentStep >= item.step ? 'text-[#333333]' : 'text-[#a09e9b]'
                }`}>
                  {item.label}
                </p>
              </div>
            );
          })}
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
            A two-step process: First, scrape raw text from the web, then generate a structured Q&A dataset.
          </p>
        </div>

        <div className="bg-[#f8f7f2] border border-[#d1caca]/80 rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* ====== Step 1: Input Form ====== */}
          {processStage === 'idle' && (
            <form onSubmit={handleScrapeSubmit} className="space-y-6">
              <div>
                <label htmlFor="demo-topic" className="block text-lg font-semibold text-[#333333] mb-3">
                  What topic would you like to scrape?
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    id="demo-topic" type="text" value={topic} onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Quantum Computing, Climate Change..."
                    className="flex-1 text-lg h-14 bg-white border border-[#b0aeab] focus:border-[#03ef62] focus:ring-2 focus:ring-[#03ef62]/20 rounded-xl px-5 text-[#333333] placeholder-[#7a7a7a] outline-none transition-all"
                  />
                  <button type="submit" disabled={!topic.trim()} className="w-full sm:w-auto h-14 px-8 text-lg font-bold bg-[#03ef62] hover:bg-[#02d957] disabled:opacity-50 disabled:cursor-not-allowed text-[#333333] rounded-xl transition-all shadow-lg shadow-[#03ef62]/20 flex items-center justify-center gap-3">
                    <Zap className="w-5 h-5" />
                    <span>Scrape Text</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* ====== Progress & Results Sections ====== */}
          {processStage !== 'idle' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-center text-[#333333] mb-3">Generation Pipeline</h3>
                <p className="font-mono text-sm text-center text-[#7a7a7a] bg-white inline-block px-4 py-2 rounded-lg border border-[#d1caca]/80 w-full truncate">
                    {currentStatusMessage}
                </p>
              </div>
              <ProgressTracker />

              {/* ====== Stage 2: Scraped Text Preview ====== */}
              {processStage === 'scraping_complete' && (
                <div className="pt-8 border-t border-[#d1caca]/80 mt-8 space-y-6 animate-fade-in">
                    <div className="flex justify-between items-center">
                        <h4 className="font-bold text-[#333333] flex items-center gap-2 text-lg">
                            <FileText className="w-5 h-5 text-[#03ef62]" />
                            Scraped Text Preview
                        </h4>
                        <div className="flex gap-2">
                             <button onClick={() => handleDownload(rawTextResult, `${topic.replace(/\s+/g, '_')}_raw.txt`, 'text/plain')} className="bg-[#d1caca] hover:bg-[#b0aeab] text-[#333333] px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all">
                                <Download className="w-4 h-4" /> Download .txt
                            </button>
                             <button onClick={handleGenerateQASubmit} className="bg-[#03ef62] hover:bg-[#02d957] text-[#333333] px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#03ef62]/20">
                                <Send className="w-4 h-4" /> Generate Q&A
                            </button>
                        </div>
                    </div>
                  <pre className="text-xs text-[#5c5c5c] overflow-auto max-h-48 p-4 bg-white rounded-xl border border-[#d1caca]/80 font-mono leading-relaxed">
                    {rawTextResult ? rawTextResult.substring(0, 1000) + '...' : 'No text was scraped.'}
                  </pre>
                </div>
              )}
              
              {/* ====== Stage 3: QA Result Preview ====== */}
              {processStage === 'qa_complete' && qaResult && (
                 <div className="pt-8 border-t border-[#d1caca]/80 mt-8 space-y-6 animate-fade-in">
                    <div className="flex justify-between items-center">
                        <h4 className="font-bold text-[#333333] flex items-center gap-2 text-lg">
                            <FileJson className="w-5 h-5 text-[#03ef62]" />
                            Q&A Dataset Preview
                        </h4>
                        <button onClick={() => handleDownload(JSON.stringify(qaResult.qa_pairs, null, 2), `${qaResult.topic.replace(/\s+/g, '_')}_dataset.json`, 'application/json')} className="bg-[#03ef62] hover:bg-[#02d957] text-[#333333] px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#03ef62]/20">
                            <Download className="w-4 h-4" /> Download JSON
                        </button>
                    </div>
                    <pre className="text-xs text-[#5c5c5c] overflow-auto max-h-64 p-4 bg-white rounded-xl border border-[#d1caca]/80 font-mono leading-relaxed">
                        {JSON.stringify(qaResult.qa_pairs.slice(0, 3), null, 2)}
                    </pre>
                </div>
              )}

             {/* ====== Reset Button ====== */}
             {(processStage === 'scraping_complete' || processStage === 'qa_complete') && (
                <div className="text-center pt-4">
                    <button onClick={handleReset} className="text-[#5c5c5c] hover:text-[#333333] font-semibold flex items-center gap-2 mx-auto">
                        <RefreshCw className="w-4 h-4" /> Start Over
                    </button>
                </div>
             )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DemoSection;

