import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, ShieldCheck, HelpCircle, ArrowRight, RefreshCw, Star, Info, Dumbbell, Sparkles } from 'lucide-react';

interface AuditQuestion {
  id: string;
  category: string;
  question: string;
  choices: {
    id: string;
    text: string;
    score: number; // 0 to 10
    explanation: string;
    improvement: string;
  }[];
}

export default function AISafetyAuditor() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { choiceId: string; score: number }>>({});
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const questions: AuditQuestion[] = [
    {
      id: 'q1',
      category: 'Data Confidentiality & GDPR',
      question: 'When asked to summarize a corporate PDF report containing customer names or private company deals, you usually...',
      choices: [
        {
          id: 'q1-a',
          text: 'Upload the raw pdf file straight into your favorite free online AI chatbot.',
          score: 1,
          explanation: 'Feeding PII or active corporate telemetry to public servers violates GDPR and leaks enterprise secrets.',
          improvement: 'Censor or anonymize customer data before upload, or request access to an enterprise offline AI tool.'
        },
        {
          id: 'q1-b',
          text: 'Anonymize sensitive customer names, emails, and financial columns first, or use a certified local, enterprise model.',
          score: 10,
          explanation: 'This ensures complete data security. Personal identifiers remain strictly secure within your local network.',
          improvement: 'Excellent! Keep using certified data separation protocols.'
        }
      ]
    },
    {
      id: 'q2',
      category: 'Evaluating Hallucinations & Plagiarism',
      question: 'You output a complex program code or historical summary from the AI. What are your standard review steps?',
      choices: [
        {
          id: 'q2-a',
          text: 'Review the text/code immediately, fact-check key claims against official documentation, and test compile outputs manually.',
          score: 10,
          explanation: 'AI models regularly hallucinate incorrect library procedures or outdated legal references.',
          improvement: 'This critical oversight is key to responsibly working beside AI.'
        },
        {
          id: 'q2-b',
          text: 'Copy and paste the code/document directly into production, assuming the model has the ultimate intelligence.',
          score: 2,
          explanation: 'Pasting unchecked code/data causes security flaws, performance bugs, or school academic suspensions.',
          improvement: 'Treat AI as a source of templates, but verify every final claim against authoritative databases.'
        }
      ]
    },
    {
      id: 'q3',
      category: 'Social Media & Information Integrity',
      question: 'You read an outrageous statement from a prominent Luxembourgish politician in an online video with a slight audio buzz...',
      choices: [
        {
          id: 'q3-a',
          text: 'Share the clip immediately on local WhatsApp groups to alert everyone.',
          score: 2,
          explanation: 'This creates mass civic misinformation. Audio deepfakes are cheap, highly realistic, and trigger emotional distress.',
          improvement: 'Always stop. Check sources like RTL, Tageblatt, or Luxembourg Chronicle (Luxembourgish official news outlets).'
        },
        {
          id: 'q3-b',
          text: 'Search top news aggregators (RTL, Wort) first to crosscheck if standard press has verified this claim.',
          score: 10,
          explanation: 'This protects democracy and defends elections against automated propaganda bots.',
          improvement: 'Fabulous civic awareness! Help your elderly or younger friends do the same.'
        }
      ]
    },
    {
      id: 'q4',
      category: 'AI Tool Sourcing (Shadow IT)',
      question: 'You need an instant tool to convert slides to videos, and you find a cool free online extension that requests Google sign-in permissions...',
      choices: [
        {
          id: 'q4-a',
          text: 'Approve all requested browser access keys without reading, just to get the quick slide render done.',
          score: 1,
          explanation: 'Many popup AI tools are wrappers that harvest your single-sign-on (SSO) credentials or reading tokens.',
          improvement: 'Only authorize keys to certified products or clear it first with your company\'s IT security Officer or admin.'
        },
        {
          id: 'q4-b',
          text: 'Decline browser permissions, inspect the privacy policy, or use your corporate-sanctioned enterprise accounts.',
          score: 10,
          explanation: 'This guards against Shadow IT and prevents account hijack and session hijacking.',
          improvement: 'Smart! Safeguard your administrative access.'
        }
      ]
    }
  ];

  const handleSelectChoice = (choiceId: string, score: number) => {
    setSelectedChoiceId(choiceId);
    setAnswers((prev) => ({
      ...prev,
      [questions[currentIdx].id]: { choiceId, score }
    }));
  };

  const handleNext = () => {
    setSelectedChoiceId(null);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const resetAudit = () => {
    setCurrentIdx(0);
    setAnswers({});
    setSelectedChoiceId(null);
    setIsFinished(false);
  };

  const calculateResults = () => {
    const keys = Object.keys(answers);
    const totalScore = keys.reduce((sum, key) => sum + answers[key].score, 0);
    const maxScore = questions.length * 10;
    const percentage = Math.round((totalScore / maxScore) * 100);

    let personaName = '';
    let personaDesc = '';
    let feedbackColor = '';
    
    if (percentage >= 85) {
      personaName = "Exemplary AI Citizen";
      personaDesc = "You display outstanding cyber-awareness, respect data protection regulations (GDPR), and review AI-generated items with crisp critical thinking. Model behavior!";
      feedbackColor = "text-[#188C7C]";
    } else if (percentage >= 60) {
      personaName = "Cautious Navigator";
      personaDesc = "You possess decent safe habits but are prone to speed-pasting or occasionally trusting unverified media. Tighten up your document filters to stay secure.";
      feedbackColor = "text-[#129CD5]";
    } else {
      personaName = "AI Cowboy (High Risk)";
      personaDesc = "Your current workflow exposes you to high risk. Pasting unanonymized customer items and skipping fact-checking can lead to security, legal, or intellectual loss.";
      feedbackColor = "text-[#E3232C]";
    }

    return { totalScore, maxScore, percentage, personaName, personaDesc, feedbackColor };
  };

  const currentQuestion = questions[currentIdx];
  const selectedChoice = currentQuestion.choices.find((c) => c.id === selectedChoiceId);

  return (
    <div className="flex-1 flex flex-col items-center py-6 max-w-4xl mx-auto w-full">
      
      {/* Upper header */}
      <div className="text-center mb-10">
        <span className="inline-block py-1.5 px-4 rounded-full bg-[#188C7C]/10 text-[#188C7C] font-bold text-xs uppercase tracking-widest mb-4 shadow-xs border border-[#188C7C]/20">
          ⚖️ LUXEMBOURG AI SAFETY CHECKLIST
        </span>
        <h2 className="text-3.5xl font-extrabold text-[#4A4036] tracking-tight mb-2 leading-tight">
          How Safely Are You Using AI?
        </h2>
        <p className="text-[#887868] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Take our diagnostic questionnaire to audit your real AI hygiene. Get direct Suggestions to secure your work, protect school assignments, and prevent civic corporate data leaks.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full bg-white rounded-3xl border border-[#E8E1D5] relative overflow-hidden shadow-sm p-6 sm:p-8 flex flex-col"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#188C7C]"></div>

            {/* Audit Question Meta */}
            <div className="flex justify-between items-center mb-5 text-[10px] tracking-widest font-extrabold text-[#887868] uppercase pb-3 border-b border-[#E8E1D5]/60">
              <span className="text-[#188C7C]">Audit {currentIdx + 1} of {questions.length}</span>
              <span>Category: {currentQuestion.category}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-[#4A4036] mb-6 flex items-start gap-2">
              <HelpCircle className="w-5.5 h-5.5 text-[#188C7C] shrink-0 mt-0.5" />
              <span>{currentQuestion.question}</span>
            </h3>

            {/* Answer Options Grid */}
            <div className="space-y-4">
              {currentQuestion.choices.map((choice) => {
                const isSelected = selectedChoiceId === choice.id;
                return (
                  <button
                    key={choice.id}
                    disabled={selectedChoiceId !== null}
                    onClick={() => handleSelectChoice(choice.id, choice.score)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all leading-relaxed flex items-center justify-between gap-4 cursor-pointer ${
                      isSelected 
                        ? 'border-[#188C7C] bg-[#188C7C]/5 font-bold text-[#4A4036]' 
                        : selectedChoiceId !== null 
                        ? 'border-[#E8E1D5]/50 opacity-60 bg-white text-[#887868]' 
                        : 'border-[#E8E1D5] hover:border-gray-500 bg-white text-[#584D42] hover:shadow-xs'
                    }`}
                  >
                    <span>{choice.text}</span>
                    <span className="text-[10px] uppercase font-bold text-[#887868] tracking-widest shrink-0">Select</span>
                  </button>
                );
              })}
            </div>

            {/* Option Feedback and prescriptive advice to improve AI actions */}
            {selectedChoiceId !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-[#FAF7EE] p-5 rounded-2xl border border-[#E8E1D5] flex gap-3.5"
              >
                <div className="w-10 h-10 bg-[#188C7C] text-white rounded-full flex items-center justify-center shrink-0 shadow-inner">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#4A4036] text-sm mb-1">EVALUATION METRIC</h4>
                  <p className="text-xs text-[#584D42] leading-relaxed mb-3">{selectedChoice?.explanation}</p>
                  
                  <div className="space-y-2 mb-3">
                    {selectedChoice?.score === 10 ? (
                      <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-2.5 rounded-r-xl text-xs">
                        <span className="font-bold text-[#106659] block uppercase tracking-wider text-[9px] mb-0.5">🎯 Why This is a Good Choice:</span>
                        <span className="text-[#3c4a3e]">This choice protects administrative transparency, prevents identity leaks, complies with GDPR guidelines, and ensures digital safety offline.</span>
                      </div>
                    ) : (
                      <div className="bg-red-500/10 border-l-4 border-red-500 p-2.5 rounded-r-xl text-xs">
                        <span className="font-bold text-[#B31A21] block uppercase tracking-wider text-[9px] mb-0.5">⚠️ Real-Life Consequence:</span>
                        <span className="text-[#4e3b3c]">Failing here exposes critical organizational processes or passwords to external servers, increasing risks of financial losses, social engineering breaches, and compliance audits.</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border">
                    <strong className="text-[9px] uppercase tracking-widest text-[#C7652A] block mb-1 font-bold">SUGGESTION TO IMPROVE YOUR WORKFLOW:</strong>
                    <p className="text-xs text-[#4A4036] leading-relaxed">{selectedChoice?.improvement}</p>
                  </div>

                  <button
                    onClick={handleNext}
                    className="mt-5 bg-[#188C7C] hover:bg-[#106659] text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-1 cursor-pointer shadow-sm hover:shadow-xs"
                  >
                    Proceed <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

          </motion.div>
        ) : (
          /* Finished State: Total Diagnostic metrics and customized suggestions dashboard */
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full bg-white rounded-3xl border border-[#E8E1D5] p-6 sm:p-10 text-center shadow-md flex flex-col items-center"
          >
            {/* Visual safety speedometer / level icon */}
            <div className="w-16 h-16 bg-[#FAF7EE] border border-[#E8E1D5] rounded-full flex items-center justify-center text-yellow-500 mb-4 shadow-inner">
              <Star className="w-8 h-8 fill-current text-[#188C7C]" />
            </div>

            <span className="text-xs font-bold text-[#887868] uppercase tracking-widest bg-[#FAF7EE] px-4 py-1 rounded-full border mb-3">Audit Complete</span>
            
            <h3 className={`text-2.5xl font-black mb-1 ${calculateResults().feedbackColor}`}>
              {calculateResults().personaName}
            </h3>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-6">AI Responsibility Profile</p>
            
            <p className="text-[#887868] text-sm sm:text-base max-w-lg leading-relaxed mb-8">
              {calculateResults().personaDesc}
            </p>

            <div className="w-full max-w-sm bg-[#FAF7EE] p-5 rounded-2xl border border-[#E8E1D5] flex items-center justify-around mb-8">
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">YOUR COMPLIANCE SCORE</div>
                <div className="text-2xl font-black text-[#584D42] mt-1">
                  {calculateResults().totalScore} / {calculateResults().maxScore} pts
                </div>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">SAFETY GRADE</div>
                <div className="text-2xl font-black text-[#129CD5] mt-1">
                  {calculateResults().percentage}% Secure
                </div>
              </div>
            </div>

            {/* Prescriptive recommendations panel */}
            <div className="bg-[#FAF7EE] border border-[#E8E1D5] p-5 rounded-2xl text-left w-full relative overflow-hidden mb-8">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#188C7C]"></div>
              <h4 className="font-extrabold text-xs tracking-wider text-[#4A4036] uppercase mb-4 flex items-center gap-1.5 border-b pb-2">
                <Dumbbell className="w-4 h-4 text-[#188C7C]" /> SUMMARY WORKFLOW ENHANCEMENTS FOR YOUR DIAL-IN:
              </h4>

              <ol className="space-y-4 text-xs text-gray-700 leading-relaxed">
                <li className="flex gap-2">
                  <span className="w-5 h-5 bg-[#188C7C]/10 text-[#188C7C] font-bold rounded-full flex items-center justify-center shrink-0">1</span>
                  <div>
                    <strong>Sanitize input buffers always:</strong> Never trust raw customer profiles, tax receipts, or enterprise emails in public tools to stay 100% GDPR compliant.
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 bg-[#188C7C]/10 text-[#188C7C] font-bold rounded-full flex items-center justify-center shrink-0">2</span>
                  <div>
                    <strong>Enforce out-of-band verification:</strong> Invoices demanding sudden wire payouts require a separate physical call to the vendor, never reply directly to the source email.
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 bg-[#188C7C]/10 text-[#188C7C] font-bold rounded-full flex items-center justify-center shrink-0">3</span>
                  <div>
                    <strong>Combat political misinformation:</strong> Elections are sensitive to automated voice deepfakes. If lips or cadence have a blur, wait for reputable local entities (RTL, Wort) to confirm.
                  </div>
                </li>
              </ol>
            </div>

            <button
              onClick={resetAudit}
              className="bg-[#4A4036] hover:bg-[#3d342c] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer text-xs"
            >
              <RefreshCw className="w-4 h-4" /> Restart Diagnostic Audit
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
