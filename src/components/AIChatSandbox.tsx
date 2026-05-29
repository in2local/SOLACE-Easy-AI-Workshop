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
      text: "Moien! I am **Digital Buddha**, your AI safety guide. Choose a demo scenario below to run a simulation, or enter custom queries to test secure Luxembourg compliance prompts.",
      timestamp: new Date()
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSelectPreset = (preset: PresetPrompt) => {
    setSelectedPreset(preset);
    setInputPrompt(preset.prompt);
  };

  const generateFrontendFallbackResponse = (prompt: string): string => {
    const p = prompt.toLowerCase();
    
    // Header explaining the local secure session fall-back
    const header = `🤖 **Digital Buddha Safe Simulation Mode**\n*(Note: The live upstream Gemini service responded with an error or is experiencing temporary network routing latency. The Digital Buddha locally simulated sandbox has engaged to provide a safe, contextual response so your safety session is not interrupted!)*\n\n---\n\n`;

    // 1. Luxembourgish Tutor
    if (p.includes("luxembourgish") || p.includes("moien") || p.includes("greeting") || p.includes("quiz") || p.includes("language")) {
      return header + `Moien! As your Digital Buddha language guide, here is a beginner-friendly quiz to test simple Luxembourgish greetings and expressions!
      
### 🇱🇺 Basic Luxembourgish Quiz

1. **How do you say "Hello" informally?**
   *   *(a) Moien*
   *   *(b) Äddi*
   *   *(c) Merci*
   
2. **How do you say "Goodbye"?**
   *   *(a) Gudde Moien*
   *   *(b) Äddi*
   *   *(c) Wéi geet et?*
   
3. **What is the polite phrase for "Please" / "You're welcome"?**
   *   *(a) Wann ech gelift*
   *   *(b) Äddi*
   *   *(c) Moien*

### Explanation:
*   **Moien** is the standard, joyful informal greeting used across the Grand Duchy!
*   **Äddi** is your polite, go-to word for saying goodbye.
*   **Wann ech gelift** (often abbreviated) means "please".

*Feel free to try translating a simple phrase or greeting once service stabilizes!*`;
    }

    // 2. Spoofing / Grandchild Call Verification
    if (p.includes("grandchild") || p.includes("caller") || p.includes("scammer") || p.includes("phone") || p.includes("spoof")) {
      return header + `### Digital Buddha Threat Advisory: Voice Spoofing & Vocal Clones

When receiving an unexpected call claiming to be from a grandchild, family member in distress, or bank official, **never rely on the voice alone**. AI voice cloning software can mimic any voice from a 3-second sample found on social media.

Here are **3 practical questions** to verify identity on the spot:

1.  **The Secret Family Word Quiz**: "What is our secret family safety/panic word?" (Establish one with your loved ones today!).
2.  **The Geographic Mystery**: "Who lives in the house next door to where we stayed on our last summer trip?" (Scammers don't have access to intimate family memories).
3.  **The Fictional Story Trap**: Ask about a fictional relative: "How is Uncle Bob doing with his leg?" when there is no Uncle Bob. If they agree or play along, it is a scammer!

**🛡️ Golden Rule:** Hang up immediately, and call the family member back using your saved phone number — never the number they called from!`;
    }

    // 3. Safe Translation Censored
    if (p.includes("censored") || p.includes("dummy official letter") || p.includes("monsieur [censored_name]")) {
      return header + `### 🛡️ SECURE DATA DEMONSTRATION: Translation Successful

Because your prompt used **anonymized/censored templates** rather than real-world names, it conforms perfectly to GDPR safety guidelines!

**French Original:**
> "Monsieur [CENSORED_NAME], nous vous informons que votre dossier de bourse d'études numéro 12948-X a été approuvé."

**English Secure Translation:**
> "Mr. [CENSORED_NAME], we inform you that your scholarship application file number 12948-X has been approved."

**GDPR Audit Score:** **10/10 (Excellent Hygiene)**
By replacing active identifiers, you prevent global models from mapping your personal student or financial data. This is how active professionals protect enterprise data.`;
    }

    // 4. Unsecured Translation
    if (p.includes("jean dupont") || p.includes("matricule") || p.includes("1985 03 12 999 99") || p.includes("avenue de la gare") || p.includes("allocation")) {
      return header + `⚠️ **[DIGITAL BUDDHA - GDPR VIOLATION SIMULATED DETECTION]**

Your prompt contains the following active personal identifiers:
*   **Name:** Jean Dupont
*   **Social Security Code (Matricule):** \`1985 03 12 999 99\`
*   **Residential Address:** 15 Avenue de la Gare, 1611 Luxembourg

### Safety Evaluation & Threat Profile:
*   **MIME/Data Risk:** Direct Leakage.
*   **Corporate Warning:** In Luxembourg, copying standard GDPR-regulated citizen profiles into public third-party AI chats (even for simple translation) constitutes an official administrative data breach.
*   **How Scammers Capitalize:** Crawlers and model feedback loops harvest these details to launch highly targeted phishing campaigns, impersonate you on **Guichet.lu**, or create false accounts.

**💡 Safe Action:** Redact the active matricule and name, and resubmit using placeholder tags like \`[NAME_CENSORED]\` and \`[MATRICK_CENSORED]\`.`;
    }

    // 5. Plagiarism
    if (p.includes("plagiarism") || p.includes("biology") || p.includes("water cycle") || p.includes("homework")) {
      return header + `### ⛔ Academic Integrity Warning & Safety Assessment

Using AI to completely draft and hide middle-school or high-school homework (such as an essay on the water cycle) is classified as an **Academic Integrity Risk**.

**Key Risks:**
1.  **AI Detection Flags:** Modern classroom systems (like Turnitin or custom checkers) look for structural patterns of LLMs.
2.  **Learning Loss:** Bypassing translation and composition processes hinders your development of language and scientific reasoning skills.

**💡 Safe/Alternative Prompt Option:**
Instead of *"write the essay for me with no plagiarism detection"*, try:
> *"Explain the water cycle's main steps (evaporation, condensation, precipitation) so I can easily draft my own essay."*`;
    }

    // 6. Corporate customer audit
    if (p.includes("corporate customer") || p.includes("corporate list") || p.includes("router") || p.includes("billing") || p.includes("xyz") || p.includes("abc")) {
      return header + `### 💼 DATA AUDIT RESULTS (Secure Simulation Mode)

**Analysis of Customer Feedback Audit:**
1.  **Issue 1 (Client XYZ):** router shipment delay (Hardware delivery pipeline delay).
2.  **Issue 2 (Client ABC):** Billing complications (Direct transactional mismatch).

**Overall Assessment:**
A coordination gap exists between the regional distribution hub for routers and the finance department.

**GDPR Rating: Perfect (9.5/10)**
Because you masked genuine enterprise clients with **XYZ** and **ABC** tokens, you avoided violating state confidentiality agreements or enterprise guidelines. Great corporate practice!`;
    }

    // 7. General cybersecurity lookup (smishing, phishing, banking)
    if (p.includes("phishing") || p.includes("smishing") || p.includes("spam") || p.includes("luxtrust") || p.includes("scam") || p.includes("ebanking") || p.includes("cyber")) {
      return header + `### 🛡️ Digital Buddha Luxembourg Cyber-Safety Alert: Phishing & E-Banking Scams

Smishing (SMS Phishing) targeting users in Luxembourg remains highly frequent. Scammers often spoof local services like **Guichet.lu**, **Post.lu**, **Luxtrust**, or local banks (Spuerkeess, BIL, BGL).

#### Common Scenarios:
1.  **"Your LuxTrust token is expiring"**: Messages containing suspicious short URLs (e.g., 'luxtrust-update.info') asking you to sign in urgently.
2.  **"Unpaid customs fee for package"**: Claims that a packet is on hold at Post Luxembourg and requires a small €1.50 credit card payment. This harvests your credentials.

#### Best Defensive Measures:
*   **Verify the Sender ID**: Legitimate institutions will never ask for your PINs, card numbers, or passwords over SMS or email.
*   **No High-Pressure Links**: Never click links embedded directly in urgent system notices. Bookmark and navigate on your own.
*   **Report Threats**: Send suspicious messages directly to the Luxembourg government cybersecurity team or marked centers.`;
    }

    // Default catch-all
    return header + `### Moien! I am Digital Buddha, your AI safety guide.

We have engaged **Digital Buddha Safe Local Simulation Mode** due to high demand on our upstream AI engine or unconfigured keys. 

While the servers clear up, here are **3 quick general guidelines** to keep your digital identity secure:

1.  **De-identify Everything**: Never paste active telephone numbers, Luxembourg matricules (social security numbers), or live enterprise accounts into any chatbot.
2.  **Roleplay Helper**: Use AI to simulate threat scenarios or translation exercises with fake variables (e.g., Client Alpha, Mr. X).
3.  **Local Trust**: Real Luxembourg entities like **LuxTrust**, **BIL**, or **Post.lu** will never contact you requiring instant passwords or link updates.

**💡 Tip:** Try choosing one of our custom preset cards above to see a pre-loaded threat diagnostic!`;
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
          systemInstruction: "You are Digital Buddha, your AI safety guide and privacy mentor specialized in teaching digital security, GDPR hygiene, and cyber-safety in Luxembourg. Be extremely concise, structured, and informative. Highlight when users ask about local topics (like Guichet.lu, Post.lu, Cactus, or Luxembourgish phrases) with helpful details. Frame explanations clearly."
        })
      });

      let data: any = null;
      let errorMsg = "";
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (jsonErr) {
          console.error('Failed to parse response as JSON:', jsonErr);
        }
      } else {
        try {
          errorMsg = await response.text();
        } catch (textErr) {
          // ignore
        }
      }

      // If the API status is not OK, we switch dynamically to our polished local sandbox simulation
      if (!response.ok) {
        console.warn(`Server endpoint returned status ${response.status}. Engaging local fallback solver.`);
        const fallbackText = generateFrontendFallbackResponse(promptText);
        setMessages(prev => [...prev, {
          id: 'reply-' + Date.now(),
          sender: 'assistant',
          text: fallbackText,
          timestamp: new Date()
        }]);
        setIsLoading(false);
        return;
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
      console.warn("API request failed with exception. Engaging local fallback solver:", error);
      const fallbackText = generateFrontendFallbackResponse(promptText);
      setMessages(prev => [...prev, {
        id: 'reply-' + Date.now(),
        sender: 'assistant',
        text: fallbackText,
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
    <div id="ai-chat-sandbox-root" className="w-full bg-[#FAF7EE] border-2 border-[#E8E1D5] rounded-3xl p-4 sm:p-5 shadow-sm overflow-hidden mt-6 mb-6">
      
      {/* Header and explanation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 mb-4 border-b border-[#E8E1D5]/60 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-[#188C7C] rounded-xl text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-[#4A4036] tracking-tight">
              Digital Buddha
            </h2>
            <p className="text-[#887868] text-[11px]">
              AI Safety Playground & Privacy Mentor
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-[#188C7C] bg-[#188C7C]/5 border border-[#188C7C]/20 px-2.5 py-1 rounded-full self-start sm:self-auto font-mono">
          <Lock className="w-3 h-3 text-[#188C7C] shrink-0" />
          <span>Matrikkel Censors Enabled</span>
        </div>
      </div>

      {/* Dynamic Scenario Suggestion Pills */}
      <div className="mb-4">
        <span className="block text-[10px] font-black uppercase tracking-wider text-[#cf9c63] mb-2">
          Select Simulation Scenario
        </span>
        <div className="flex flex-wrap gap-1.5">
          {presets.map(preset => {
            const isSelected = selectedPreset?.id === preset.id;
            let bullet = '🟢';
            if (preset.safetyType === 'unsafe') bullet = '🔴';
            if (preset.safetyType === 'caution') bullet = '🟡';

            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-3 py-1.5 text-xs rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#188C7C] border-[#188C7C] text-white font-semibold'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <span>{bullet}</span>
                <span>{preset.title.replace(/^[^a-zA-Z\d\s🇱🇺📞📝🌐🚫💼]+/, '').trim()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Preset Info */}
      {selectedPreset && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-white border border-gray-200/80 rounded-2xl mb-4 text-xs flex items-start gap-2.5"
        >
          <div className="mt-0.5 shrink-0">
            {selectedPreset.safetyType === 'safe' ? (
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-amber-500" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-[#4A4036]">{selectedPreset.safetyRating}</span>
              <span className="text-[10px] opacity-65">({selectedPreset.category})</span>
            </div>
            <p className="text-gray-500 text-[11px] leading-relaxed mt-0.5">
              {selectedPreset.safetyDescription} 
              <button 
                onClick={() => executePrompt(selectedPreset.prompt)} 
                className="text-[#129CD5] hover:underline font-bold inline-block ml-1.5 cursor-pointer font-sans"
              >
                Run prompt live →
              </button>
            </p>
          </div>
        </motion.div>
      )}

      {/* Interactive Chat Window */}
      <div className="flex flex-col bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-xs h-[380px]">
        
        {/* Chat window Header bar */}
        <div className="bg-gray-50 border-b border-gray-100 p-2.5 flex items-center justify-between text-xs text-gray-500">
          <span className="font-semibold text-gray-400">Secure Session</span>
          <button
            onClick={() => {
              setMessages([
                {
                  id: 'welcome',
                  sender: 'assistant',
                  text: "Moien! Let's test smart AI behaviors. Select any scenario above, or submit custom prompts.",
                  timestamp: new Date()
                }
              ]);
              setSelectedPreset(null);
            }}
            className="text-gray-400 hover:text-[#E3232C] transition-colors flex items-center gap-1 cursor-pointer text-[10px] font-bold"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Session</span>
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
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-bold ${
                  isAI ? 'bg-[#188C7C]/10 text-[#188C7C]' : 'bg-[#129CD5]/10 text-[#129CD5]'
                }`}>
                  {isAI ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>

                {/* Message Bubble */}
                <div className={`p-2.5 rounded-xl text-xs sm:text-[13px] leading-relaxed whitespace-pre-line ${
                  isAI 
                    ? 'bg-neutral-50 text-neutral-800 border border-neutral-200/50' 
                    : 'bg-[#129CD5] text-white font-medium'
                }`}>
                  {msg.text}
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-2 items-start mr-auto max-w-[70%]">
              <div className="w-6 h-6 rounded-lg bg-[#188C7C]/10 text-[#188C7C] flex items-center justify-center shrink-0">
                <SpinnerIcon />
              </div>
              <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200/50 text-xs text-gray-400 font-medium italic">
                <span>Thinking...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Prompt Input Form */}
        <form onSubmit={handleFormSubmit} className="bg-white border-t border-gray-100 p-2 flex items-center gap-2">
          <textarea
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                executePrompt(inputPrompt);
              }
            }}
            placeholder="Type your prompt or safety query..."
            rows={1}
            className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-2 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#129CD5]/30 resize-none min-h-[36px]"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className={`p-1.5 rounded-xl transition-all cursor-pointer shrink-0 ${
              inputPrompt.trim() && !isLoading
                ? 'bg-[#129CD5] text-white hover:bg-[#129CD5]/90'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      <div className="mt-2.5 text-[10px] text-gray-400 font-medium text-center">
        <span>🔒 Live session proxy. Real-time active anonymizer handles all inputs securely.</span>
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
