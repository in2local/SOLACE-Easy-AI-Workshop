import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, ShieldCheck, ArrowRight, BrainCircuit, Mic, FileText, CheckCircle2, Megaphone, Trophy, Printer, Award, Medal, ShieldAlert as AlertIcon, AlertTriangle } from 'lucide-react';
import { AgeGroup, SCENARIOS, Scenario } from '../data/content';
import { cn } from '../lib/utils';

const getDetailedFeedback = (type: Scenario['type'], isSafe: boolean) => {
  if (isSafe) {
    switch (type) {
      case 'phishing':
        return "By ignoring or deleting unsolicited messages and verifying through official, secure channels (like Post.lu or MyGuichet.lu), you entirely prevent credential and banking cards theft.";
      case 'deepfake':
        return "Hanging up and cross-checking via a known trusted personal number, or demanding a family secure 'safe-word', foils conversational AI synthesis and catfishing immediately.";
      case 'data-leak':
        return "Anonymizing personal identifiers ensures strict alignment with EU GDPR requirements, maintaining corporate compliance and safeguarding proprietary databases.";
      case 'safe-prompt':
        return "Setting explicit instruction parameters and using private cloud rules blocks third-party models from re-using your intellectual works for publicly training algorithms.";
      case 'misinformation':
        return "Verifying sudden, highly emotional videos against trustworthy local entities (RTL.lu, Luxembourger Wort) stops unverified automated information warfare from spreading.";
      case 'ai-usage':
      default:
        return "Leveraging generative AI responsibly as a drafting skeleton while keeping ultimate human oversight optimizes daily output while guarding against hallucinations.";
    }
  } else {
    switch (type) {
      case 'phishing':
        return "Fraudsters will capture your full credit card credentials and drain accounts. Clicking unauthorized links can automatically harvest single-sign-on credentials and session cookies.";
      case 'deepfake':
        return "You could wire thousands of Euros to offshore fraud nodes under severe emotional panic, or facilitate the spread of malicious election deepfakes that skew communal views.";
      case 'data-leak':
        return "Leaking private company deals or customer identities to outer servers violates EU data hygiene, making your group liable for steep GDPR legal fines and business secrets degradation.";
      case 'safe-prompt':
        return "Your proprietary technical recipes or enterprise details become trained content, meaning other public users could easily prompt the AI and view your copyrighted materials.";
      case 'misinformation':
        return "You actively amplify foreign automatic spam campaigns, induce mass anxiety in local communes, and become a carrier of electoral misinformation.";
      case 'ai-usage':
      default:
        return "Relying blindly on AI chatbots causes critical mistakes due to hallucinations (fake medical recommendations or bogus legal precedent), leading to organizational errors or academic sanctions.";
    }
  }
};

interface SimulationProps {
  ageGroup: AgeGroup;
  onBack: () => void;
  onComplete: (score: number) => void;
}

export default function Simulation({ ageGroup, onBack, onComplete }: SimulationProps) {
  const scenarios = SCENARIOS[ageGroup];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState<{scenario: Scenario, badChoice: string, expectedSuggestion: string}[]>([]);
  const [showCertificate, setShowCertificate] = useState(false);
  const [participantName, setParticipantName] = useState('');
  
  const currentScenario = scenarios[currentIdx];
  const isFinished = currentIdx >= scenarios.length;

  useEffect(() => {
    if (isFinished) {
      const percentage = Math.round((correctCount / scenarios.length) * 100);
      onComplete(percentage);
    }
  }, [isFinished, correctCount, scenarios.length, onComplete]);


  const handleSelect = (optionId: string, isSafe: boolean) => {
    if (selectedOptionId) return; // Prevent double clicking
    setSelectedOptionId(optionId);
    
    if (isSafe) {
      setCorrectCount(c => c + 1);
    } else {
      const badOpt = currentScenario.options.find(o => o.id === optionId);
      const goodOpt = currentScenario.options.find(o => o.isSafe);
      setMistakes(m => [...m, { 
        scenario: currentScenario, 
        badChoice: badOpt?.text || '',
        expectedSuggestion: goodOpt?.suggestion || goodOpt?.feedback || ''
      }]);
    }
  };

  const handleNext = () => {
    setSelectedOptionId(null);
    setCurrentIdx(i => i + 1);
  };

  const handlePrint = () => {
    window.print();
  };

  if (isFinished) {
    const percentage = Math.round((correctCount / scenarios.length) * 100);
    
    let badgeName = '';
    let badgeDesc = '';
    let colorClass = '';
    let BadgeIcon = Award;

    if (percentage >= 90) {
      badgeName = "Grand Duke's Golden Shield";
      badgeDesc = "Exceptional civic digital vigilance! You are officially a master of European digital safety.";
      BadgeIcon = ShieldCheck;
      colorClass = "text-yellow-500 bg-yellow-500/10";
    } else if (percentage >= 70) {
      badgeName = "SOLACE Digital Defender";
      badgeDesc = "Strong civic engagement and protective digital awareness. Ready for modern democracy!";
      BadgeIcon = Medal;
      colorClass = "text-[#188C7C] bg-[#188C7C]/10";
    } else {
      badgeName = "Gëlle Fra Civic Learner";
      badgeDesc = "You have embarked on the journey of digital protection. Continue studying to boost security!";
      BadgeIcon = Award;
      colorClass = "text-[#C7652A] bg-[#C7652A]/10";
    }

    return (
      <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full py-6 px-4">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-6 sm:p-10 rounded-3xl shadow-md border border-[#E8E1D5] text-center w-full"
        >
          {/* Certificate Layout Overlay */}
          {showCertificate ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-8 border-[#FAF7EE] p-6 rounded-2xl bg-white text-center shadow-inner relative max-w-2xl mx-auto print:border-8 print:shadow-none"
              id="solace-print-cert"
            >
              <div className="absolute top-2 right-2 w-16 h-16 bg-[#188C7C]/5 rounded-bl-full flex items-center justify-center pr-3 pb-3">
                <ShieldCheck className="w-8 h-8 text-[#188C7C]" />
              </div>
              <div className="flex justify-center items-center gap-1.5 mb-4">
                <span className="font-extrabold text-2xl tracking-tighter">
                  <span className="text-[#E3232C]">S</span>
                  <span className="text-[#129CD5]">O</span>
                  <span className="text-[#129CD5]">L</span>
                  <span className="text-[#188C7C]">A</span>
                  <span className="text-[#C7652A]">C</span>
                  <span className="text-[#74345E]">E</span>
                </span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest bg-[#FAF7EE] px-2 py-0.5 rounded-full border">LUXEMBOURG</span>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-serif text-[#4A4036] uppercase tracking-wide font-extrabold mt-6">CERTIFICATE OF CIVIC AI SECURITY</h2>
              <p className="text-xs text-[#887868] mt-2 tracking-widest uppercase">This is proudly awarded to:</p>
              
              <div className="my-6 max-w-sm mx-auto">
                {participantName ? (
                  <h3 className="text-2xl font-bold text-[#188C7C] border-b-2 border-[#188C7C]/40 pb-1 font-mono italic">{participantName}</h3>
                ) : (
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Enter your name to generate" 
                      className="w-full text-center px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-[#129CD5] focus:outline-hidden"
                      onChange={(e) => setParticipantName(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <p className="text-sm text-[#584D42] max-w-md mx-auto leading-relaxed my-4">
                For successfully completing the interactive workshop simulation under the <strong>{ageGroup.replace('-', ' ')}</strong> cohort, demonstrating a safety accuracy profile score of <strong className="text-[#129CD5]">{percentage}%</strong>.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mt-10 max-w-md mx-auto text-left text-xs border-t pt-6 border-dashed">
                <div>
                  <p className="font-bold text-[#4A4036]">WORKSHOP PATHWAY</p>
                  <p className="text-[#887868] capitalize">{ageGroup.replace('-', ' ')} Scenarios</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#4A4036]">OFFLINE VALIDATION</p>
                  <p className="text-[#887868]">{new Date().toISOString().split('T')[0]} • GDPR Safe</p>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-3 print:hidden">
                <button 
                  onClick={handlePrint}
                  disabled={!participantName}
                  className="bg-[#188C7C] hover:bg-[#106659] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-xs text-sm flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> Print Certificate
                </button>
                <button 
                  onClick={() => setShowCertificate(false)}
                  className="bg-gray-100 hover:bg-gray-200 border text-gray-700 font-bold py-2.5 px-5 rounded-xl transition-all text-sm cursor-pointer"
                >
                  Hide Certificate
                </button>
              </div>
            </motion.div>
          ) : (
            <>
              <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-xs border", colorClass)}>
                <BadgeIcon className="w-10 h-10" />
              </div>
              
              <span className="inline-block py-1 px-3 rounded-full bg-[#FAF7EE] text-[#4A4036] font-bold text-xs uppercase tracking-widest mb-3 border border-[#E8E1D5]">
                Role Simulator Complete
              </span>
              
              <h2 className="text-2.5xl sm:text-3.5xl font-extrabold text-[#4A4036] mb-2">{badgeName}</h2>
              <p className="text-[#887868] mb-6 text-sm sm:text-base max-w-lg mx-auto">{badgeDesc}</p>
              
              <div className="flex items-center justify-center gap-6 mb-8 bg-[#FAF7EE] p-4 rounded-xl max-w-xs mx-auto border border-[#E8E1D5]">
                <div className="text-center">
                  <div className="text-xs font-bold text-[#887868] uppercase tracking-wider">Scenarios Answered</div>
                  <div className="text-xl font-bold text-[#584D42]">{scenarios.length}</div>
                </div>
                <div className="w-px h-10 bg-[#E8E1D5]"></div>
                <div className="text-center">
                  <div className="text-xs font-bold text-[#887868] uppercase tracking-wider">Final Accuracy</div>
                  <div className="text-xl font-extrabold text-[#129CD5]">{percentage}%</div>
                </div>
              </div>
              
              {/* Output analysis suggestions for incorrect scenarios */}
              {mistakes.length > 0 && (
                <div className="bg-[#FAF7EE] p-5 sm:p-6 rounded-2xl border border-[#E8E1D5] mb-8 text-left relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#E3232C]"></div>
                  <h3 className="font-extrabold text-[#4A4036] mb-3 text-lg flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-[#E3232C]" /> Mistakes Analysis & Improvements
                  </h3>
                  <p className="text-xs text-[#887868] mb-4">Review suggestions based on the slips you made in the simulator:</p>
                  
                  <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                    {mistakes.map((m, idx) => (
                      <div key={idx} className="bg-white p-3.5 rounded-xl border border-[#E8E1D5] shadow-xs">
                        <div className="flex items-center gap-2 mb-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-[#C7652A]" />
                          <h4 className="font-bold text-[#4A4036] text-xs sm:text-sm">{m.scenario.title}</h4>
                        </div>
                        <div className="text-[11px] text-[#E3232C] font-semibold mb-2">You chose: "{m.badChoice}"</div>
                        <div className="text-xs text-[#584D42] bg-[#FAF7EE] p-2.5 rounded-lg border border-[#E8E1D5]">
                          <strong className="text-[9px] uppercase tracking-widest text-[#188C7C] font-bold block mb-0.5">Improvement suggestion</strong>
                          {m.expectedSuggestion}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {mistakes.length === 0 && (
                <div className="bg-[#188C7C]/10 p-5 rounded-2xl border border-[#188C7C]/30 mb-8 text-left">
                  <h3 className="font-extrabold text-[#106659] mb-1.5 flex items-center gap-2 text-base sm:text-lg">
                    <CheckCircle2 className="w-5 h-5" /> Perfect Digital Run!
                  </h3>
                  <p className="text-[#106659] text-xs sm:text-sm">Excellent work! You avoided all digital scams and successfully recognized safe vs unsafe usages on this run.</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                <button 
                  onClick={() => setShowCertificate(true)}
                  className="w-full sm:w-auto bg-[#188C7C] hover:bg-[#106659] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Trophy className="w-5 h-5" /> Generate Digital Certificate
                </button>
                <button 
                  onClick={onBack}
                  className="w-full sm:w-auto bg-[#4A4036] hover:bg-[#3d342c] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    );
  }

  const getIcon = (type: Scenario['type']) => {
    switch (type) {
      case 'deepfake': return <Mic className="w-5 h-5" />;
      case 'phishing': return <ShieldAlert className="w-5 h-5" />;
      case 'data-leak': return <FileText className="w-5 h-5" />;
      case 'safe-prompt': return <BrainCircuit className="w-5 h-5" />;
      case 'misinformation': return <Megaphone className="w-5 h-5" />;
      default: return <BrainCircuit className="w-5 h-5" />;
    }
  };

  const selectedOption = currentScenario.options.find(o => o.id === selectedOptionId);

  return (
    <div className="flex-1 flex flex-col items-center max-w-2xl mx-auto w-full py-2 sm:py-6">
      {/* Progress Bar */}
      <div className="w-full flex items-center justify-between mb-4 px-1.5">
        <span className="text-xs font-bold text-[#887868] uppercase tracking-widest">
          Scenario {currentIdx + 1} of {scenarios.length}
        </span>
        <span className="text-xs sm:text-sm font-extrabold text-[#129CD5]">
          Accuracy Score: {Math.round((correctCount / (currentIdx === 0 ? 1 : currentIdx)) * 100)} / 100
        </span>
      </div>

      <div className="w-full bg-[#E8E1D5] h-2 rounded-full mb-8 overflow-hidden shadow-inner">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#129CD5] to-[#188C7C]"
          initial={{ width: `${(currentIdx / scenarios.length) * 100}%` }}
          animate={{ width: `${((currentIdx + (selectedOptionId ? 1 : 0)) / scenarios.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentScenario.id}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          className="w-full bg-white rounded-3xl shadow-md border border-[#E8E1D5] overflow-hidden flex flex-col relative"
        >
          {/* Color Accent line */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#74345E]"></div>

          {/* Header */}
          <div className="p-5 sm:p-8 pb-4 sm:pb-5 flex gap-4 sm:gap-5 items-start">
            <div className="w-11 h-11 sm:w-13 sm:h-13 bg-[#FAF7EE] text-[#74345E] rounded-2xl flex items-center justify-center shrink-0 mt-0.5 shadow-xs border border-[#E8E1D5]">
              {getIcon(currentScenario.type)}
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#74345E] uppercase tracking-widest bg-[#74345E]/5 px-2.5 py-0.5 rounded-full border border-[#74345E]/10 mb-2 inline-block">
                {currentScenario.type.replace('-', ' ')} Check
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#4A4036] mb-1 leading-tight">{currentScenario.title}</h2>
              <p className="text-[#887868] text-sm leading-relaxed">{currentScenario.description}</p>
            </div>
          </div>

          {/* Simulation Content (The fake message/prompt box) */}
          <div className="px-5 sm:px-8 pb-5 sm:pb-6 flex justify-center">
            <div className="bg-[#FAF7EE] p-4.5 rounded-2xl shadow-inner border border-[#E8E1D5] w-full font-mono text-xs sm:text-sm text-[#584D42] min-h-[100px] flex items-center whitespace-pre-wrap break-words border-dashed leading-relaxed">
              {currentScenario.content}
            </div>
          </div>

          <div className="w-full h-px bg-[#E8E1D5]"></div>

          {/* Action Area */}
          <div className="p-5 sm:p-8 bg-[#FAF7EE]/40">
            {!selectedOptionId ? (
              <div className="space-y-4">
                <h3 className="font-bold text-[#4A4036] mb-4 text-center text-sm uppercase tracking-wider">What is your next safe move?</h3>
                {currentScenario.options.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id, opt.isSafe)}
                    className="w-full text-left p-4 rounded-xl border-2 border-[#E8E1D5] bg-white hover:border-[#129CD5] hover:shadow-xs transition-all font-semibold text-[#584D42] text-sm sm:text-base break-words cursor-pointer"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "p-5 sm:p-6 rounded-2xl shadow-xs",
                  selectedOption?.isSafe ? "bg-[#188C7C]/10 border border-[#188C7C]/30" : "bg-[#E3232C]/10 border border-[#E3232C]/30"
                )}
              >
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-xs text-white",
                    selectedOption?.isSafe ? "bg-[#188C7C]" : "bg-[#E3232C]"
                  )}>
                    {selectedOption?.isSafe ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <h3 className={cn(
                      "font-extrabold text-base sm:text-lg mb-1 leading-tight",
                      selectedOption?.isSafe ? "text-[#106659]" : "text-[#B31A21]"
                    )}>
                      {selectedOption?.isSafe ? 'Correct Choice!' : 'Dangerous Play / Security Loss'}
                    </h3>
                    <p className="text-[#584D42] leading-relaxed text-xs sm:text-sm mb-3">
                      {selectedOption?.feedback}
                    </p>

                    <div className="mt-3.5 mb-4 space-y-2.5">
                      {selectedOption?.isSafe ? (
                        <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-3 rounded-r-xl text-xs">
                          <span className="font-bold text-[#106659] block uppercase tracking-wider text-[10px] mb-1">🎯 Why This is a Good Choice:</span>
                          <span className="text-[#3c4a3e] font-medium leading-relaxed">{getDetailedFeedback(currentScenario.type, true)}</span>
                        </div>
                      ) : (
                        <div className="bg-red-500/10 border-l-4 border-red-500 p-3 rounded-r-xl text-xs">
                          <span className="font-bold text-[#B31A21] block uppercase tracking-wider text-[10px] mb-1">⚠️ Real-Life Consequence:</span>
                          <span className="text-[#4e3b3c] font-medium leading-relaxed">{getDetailedFeedback(currentScenario.type, false)}</span>
                        </div>
                      )}
                    </div>

                    {selectedOption?.suggestion && (
                      <div className="bg-white/90 p-3 sm:p-4 rounded-xl border border-[#FAF7EE] text-xs shadow-xs text-[#584D42]">
                        <strong className="block text-[9px] uppercase tracking-widest text-[#C7652A] mb-1 font-bold">Pro Tip & Safe Action</strong>
                        {selectedOption.suggestion}
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  onClick={handleNext}
                  className={cn(
                    "mt-5 w-full py-3.5 px-5 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all hover:translate-y-[-1px] shadow-sm hover:shadow-xs cursor-pointer",
                    selectedOption?.isSafe ? "bg-[#188C7C] hover:bg-[#106659]" : "bg-[#E3232C] hover:bg-[#B31A21]"
                  )}
                >
                  Confirm & Next Scenario <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
