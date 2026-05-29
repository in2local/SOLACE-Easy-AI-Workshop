import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Sparkles, ShieldCheck, ShieldAlert, RefreshCw, Play, Info, Lock, User, Bot } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

interface PresetPrompt {
  id: string;
  category: string;
  title: string;
  prompt: string;
  safetyType: 'safe' | 'unsafe' | 'caution';
  safetyRating: string;
  safetyDescription: string;
  badgeColor: string;
}

export default function AIChatSandbox() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Moien! I am your SOLACE Digital AI Mentor. 🚀\n\nThis is a live, secure playground powered by **Gemini 3.5 Flash** on our server. Try clicking any of the safety-categorized scenarios above to see how a state-of-the-art AI model processes it, or type your own question below!\n\n*(Remember: In line with Luxembourg policy and GDPR rules, never input your actual credentials, passwords, or personal social IDs into public chatbots!)*",
      timestamp: new Date()
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'explorers' | 'citizens' | 'professionals' | 'seniors'>('all');
  const [selectedPreset, setSelectedPreset] = useState<PresetPrompt | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const presets: PresetPrompt[] = [
    {
      id: 'p1',
      category: 'explorers',
      title: '🇱🇺 Luxembourgish Language Tutor',
      prompt: 'Act as a professional language teacher. Give me a beginner-friendly 3-question quiz with multiple choice answers on basic Luxembourgish greetings like "Moien" and "Äddi". Explain the meaning of each word.',
      safetyType: 'safe',
      safetyRating: '✅ Highly Recommended (Safe Study)',
      safetyDescription: 'Using AI as a personalized study tutor, translator, or brainstorming guide is highly safe and doesn\'t compromise or leak sensitive information.',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    },
    {
      id: 'p2',
      category: 'seniors',
      title: '📞 Spoofing & Vocal Clones',
      prompt: 'What are 3 practical questions I can ask on the spot to verify if a telephone caller who claims to be my grandchild or a bank official is actually a clone or a scammer?',
      safetyType: 'safe',
      safetyRating: '✅ Safe & Recommended (Threat Awareness)',
      safetyDescription: 'Asking AI for prevention checklists, awareness templates, and defensive workflows is a brilliant way to build digital confidence.',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    },
    {
      id: 'p3',
      category: 'citizens',
      title: '📝 Safe GDPR Translation',
      prompt: 'Translate this dummy official letter from French to English, first ensuring there are NO specific names, social security numbers, or addresses pasted: "Monsieur [CENSORED_NAME], nous vous informons que votre dossier de bourse d\'études numéro 12948-X a été approuvé."',
      safetyType: 'safe',
      safetyRating: '✅ Safe (Anonymized Data)',
      safetyDescription: 'Pasting letters or documents with credentials, ID numbers, or names removed (censored) first is the golden rule of secure AI translation.',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    },
    {
      id: 'p4',
      category: 'citizens',
      title: '🌐 Unsecured Translation Letter',
      prompt: 'Translate this official letter containing active personal details directly to English: "Monsieur Jean Dupont, né le 12/03/1985 à Luxembourg, matricule de sécurité sociale 1985 03 12 999 99, résidant au 15 Avenue de la Gare, 1611 Luxembourg. Votre allocation de €400 est expirée."',
      safetyType: 'unsafe',
      safetyRating: '⚠️ Severe Data Leak (Unsanitized Identity)',
      safetyDescription: 'This leaks your name, birthdate, address, and national Matrikkel (social security number) to public AI servers. Scammers harvest leaks!',
      badgeColor: 'bg-red-100 text-red-800 border-red-300'
    },
    {
      id: 'p5',
      category: 'explorers',
      title: '🚫 Complete Plagiarism Attempt',
      prompt: 'Write my entire 500-word middle school biology homework essay on the water cycle, with perfect grammar, and format it so a plagiarism checker tool will not detect that it was written by AI.',
      safetyType: 'caution',
      safetyRating: '⛔ Caution (Academic Integrity Risk)',
      safetyDescription: 'Using AI to entirely ghostwrite and hide plagiarism bypasses learning, violates school guidelines, and can result in strict penalties.',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
    },
    {
      id: 'p6',
      category: 'professionals',
      title: '💼 Corporate Customer Audit',
      prompt: 'Summarize the customer complaints in this real-world corporate list, but carefully mask and censor any genuine proprietary names: "1. Client XYZ (Enterprise) complains of delivery delay on router. 2. Client ABC (Startup) complains about billing." What is the overall issue?',
      safetyType: 'safe',
      safetyRating: '✅ Safe Corporate Workflow',
      safetyDescription: 'Great administrative practice! Use generic names (e.g., Client XYZ) rather than importing real company clients into free public AI.',
      badgeColor: 'bg-[#188C7C]/10 text-[#188C7C] border-[#188C7C]/20'
    }
  ];

  const filteredPresets = activeCategory === 'all' 
    ? presets 
    : presets.filter(p => p.category === activeCategory);

  const handleSelectPreset = (preset: PresetPrompt) => {
    setSelectedPreset(preset);
    setInputPrompt(preset.prompt);
  };

  const executePrompt = async (promptText: string) => {
    if (!promptText.trim() || isLoading) return;

    // Add user message
    const userMsgId = 'msg-' + Date.now();
    const newUserMessage: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: promptText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      // API call to custom Express backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: promptText,
          systemInstruction: "You are SOLACE's Digital Mentor, a friendly AI specialized in teaching digital security, GDPR hygiene, and cyber-safety in Luxembourg. Be extremely concise, structured, and informative. Highlight when users ask about local topics (like Guichet.lu, Post.lu, Cactus, or Luxembourgish phrases) with helpful details. Frame explanations clearly."
        })
      });

      let data: any = null;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (jsonErr) {
          console.error('Failed to parse response as JSON:', jsonErr);
        }
      }

      if (!response.ok) {
        const errorMsg = data?.error || data?.message || await response.text() || `HTTP error! Status: ${response.status}`;
        throw new Error(errorMsg);
      }

      if (!data) {
        throw new Error('Received empty response from the server.');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, {
        id: 'reply-' + Date.now(),
        sender: 'assistant',
        text: data.text || "I processed that request successfully, but didn't return any text.",
        timestamp: new Date()
      }]);
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: 'error-' + Date.now(),
        sender: 'assistant',
        text: `⚠️ **AI Connection Error**: ${error.message || 'Could not connect to the secure backend.'}\n\n*Note to student facilitator: Ensure you have added your valid \`GEMINI_API_KEY\` in your Settings secrets panel!*`,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executePrompt(inputPrompt);
  };

  // Auto-scroll when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div id="ai-chat-sandbox-root" className="w-full bg-[#FAF7EE] border-2 border-[#E8E1D5] rounded-3xl p-4 sm:p-6 shadow-sm overflow-hidden mt-12 mb-6">
      
      {/* Header and explanation */}
      <div className="border-b border-[#E8E1D5] pb-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-[#129CD5] to-[#188C7C] rounded-2xl text-white shadow-md">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#188C7C] bg-[#188C7C]/10 px-2.5 py-1 rounded-full">
                🔒 LIVE SECURE EXPERIMENT
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#4A4036] tracking-tight mt-1">
                SOLACE Digital AI Chat-Sandbox
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-1.5 self-start sm:self-center text-xs text-[#887868] bg-white border border-[#E8E1D5] px-3.5 py-2 rounded-xl">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Secure Server Proxy. Matrikkel Censors Enabled.</span>
          </div>
        </div>
        <p className="text-[#887868] text-xs sm:text-sm mt-3 leading-relaxed">
          How do real AI systems process your study helpers or translation work? Why do clean prompts protect you, while leaking identifiers is dangerous? Try the safety-graded prompt examples below or formulate your own to see how **Gemini AI** responds live!
        </p>
      </div>

      {/* Preset categorizer and Selector Grid */}
      <div className="mb-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black uppercase tracking-wider text-[#4A4036]">
              Step 1: Test Scenario Presets
            </label>
            <span className="text-[10px] text-gray-500 font-mono">Select to analyze safety</span>
          </div>

          {/* Age-Group Pill Filters */}
          <div className="flex flex-wrap gap-1.5 border-b border-[#E8E1D5]/60 pb-3">
            {[
              { id: 'all', label: 'All Cases' },
              { id: 'explorers', label: 'Youth Explorers' },
              { id: 'citizens', label: 'Digital Citizens' },
              { id: 'professionals', label: 'Professionals' },
              { id: 'seniors', label: 'Senior Guardians' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id as any);
                  setSelectedPreset(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === tab.id 
                    ? 'bg-[#4A4036] text-white shadow-xs' 
                    : 'bg-white text-[#887868] hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Preset Buttons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {filteredPresets.map(preset => {
              const isSelected = selectedPreset?.id === preset.id;
              let indicatorColor = 'bg-gray-300';
              if (preset.safetyType === 'safe') indicatorColor = 'bg-emerald-500';
              if (preset.safetyType === 'unsafe') indicatorColor = 'bg-red-500';
              if (preset.safetyType === 'caution') indicatorColor = 'bg-amber-500';

              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-3 rounded-xl border-2 text-left transition-all flex flex-col justify-between cursor-pointer hover:shadow-xs ${
                    isSelected 
                      ? 'border-[#129CD5] bg-white ring-2 ring-[#129CD5]/15' 
                      : 'border-gray-200 bg-white hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start gap-2 justify-between w-full mb-1">
                    <span className="text-xs font-bold text-[#4A4036] leading-tight">
                      {preset.title}
                    </span>
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${indicatorColor}`} title={preset.safetyRating}></span>
                  </div>
                  <p className="text-[10px] text-gray-500 line-clamp-2 hover:line-clamp-none transition-all leading-normal">
                    {preset.prompt}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Preset Safety Diagnostics panel */}
      {selectedPreset && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl border-2 mb-6 ${
            selectedPreset.safetyType === 'safe' 
              ? 'bg-emerald-500/5 border-emerald-500/20 text-[#106659]' 
              : selectedPreset.safetyType === 'unsafe' 
                ? 'bg-red-500/5 border-red-500/20 text-red-900' 
                : 'bg-amber-500/5 border-amber-500/20 text-amber-900'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              {selectedPreset.safetyType === 'safe' ? (
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                <h4 className="font-extrabold text-xs uppercase tracking-wider">
                  SOLACE Prompt Evaluation:
                </h4>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border self-start ${selectedPreset.badgeColor}`}>
                  {selectedPreset.safetyRating}
                </span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed mt-1.5">
                {selectedPreset.safetyDescription}
              </p>
              <div className="mt-3">
                <button
                  onClick={() => executePrompt(selectedPreset.prompt)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#4A4036] hover:bg-[#584D42] text-white text-[10px] font-extrabold uppercase tracking-widest rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Run This Prompt Live!</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Interactive Chat Window */}
      <div className="flex flex-col bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-xs h-[380px]">
        
        {/* Chat window Header bar */}
        <div className="bg-gray-50 border-b border-gray-100 p-3 flex items-center justify-between text-xs font-bold text-gray-600">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-[#188C7C]" />
            <span>SOLACE AI Sandbox Engine</span>
          </div>
          <button
            onClick={() => {
              setMessages([
                {
                  id: 'welcome',
                  sender: 'assistant',
                  text: "Moien! I am your SOLACE Digital AI Mentor. Let's practice prompting live! Select an example prompt or type any query in Luxembourg security context.",
                  timestamp: new Date()
                }
              ]);
              setSelectedPreset(null);
            }}
            className="text-gray-400 hover:text-gray-700 transition-colors flex items-center gap-1 cursor-pointer font-mono text-[9px] font-bold uppercase"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Tutor</span>
          </button>
        </div>

        {/* Scrollable Message List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF7EE]/20">
          {messages.map((msg) => {
            const isAI = msg.sender === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[85%] ${
                  isAI ? 'mr-auto items-start' : 'ml-auto flex-row-reverse items-start'
                }`}
              >
                {/* Sender icon */}
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  isAI ? 'bg-[#188C7C]/10 text-[#188C7C]' : 'bg-[#129CD5]/10 text-[#129CD5]'
                }`}>
                  {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`p-3 rounded-xl shadow-xs text-xs sm:text-[13px] leading-relaxed whitespace-pre-line ${
                  isAI 
                    ? 'bg-neutral-50 text-neutral-800 border border-neutral-200/60' 
                    : 'bg-[#129CD5] text-white'
                }`}>
                  {msg.text}
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-2.5 items-start mr-auto max-w-[70%]">
              <div className="w-7 h-7 rounded-lg bg-[#188C7C]/10 text-[#188C7C] flex items-center justify-center shrink-0">
                <SpinnerIcon />
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/60 text-xs text-gray-500 font-medium italic flex items-center gap-2">
                <span>Analyzing prompt with Gemini 3.5-Flash on server...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Prompt Input Form */}
        <form onSubmit={handleFormSubmit} className="bg-white border-t border-gray-100 p-2.5 flex items-center gap-2">
          <textarea
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                executePrompt(inputPrompt);
              }
            }}
            placeholder="Type your own custom research prompt or security question..."
            rows={1}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#129CD5]/30 resize-none min-h-[38px] max-h-[80px]"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className={`p-2.5 rounded-xl transition-all cursor-pointer shrink-0 ${
              inputPrompt.trim() && !isLoading
                ? 'bg-[#129CD5] text-white hover:bg-[#129CD5]/90 hover:scale-105'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="mt-3 flex items-start gap-1 text-[10px] text-gray-500 italic max-w-full">
        <Info className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
        <span>Try asking about Luxembourg\'s safety frameworks (like e-banking phishing, Post.lu or LuxTrust smishing, or Luxembourgish tutor questions). Responses are powered live and privately.</span>
      </div>
    </div>
  );
}

// Small loading spinner
function SpinnerIcon() {
  return (
    <svg className="animate-spin h-4 w-4 text-[#188C7C]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
}
