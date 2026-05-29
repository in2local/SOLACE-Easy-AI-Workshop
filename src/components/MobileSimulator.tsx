import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ShieldAlert, MessageSquare, PhoneCall, Trophy, Wifi, Battery, Volume2, ArrowLeft, RefreshCw, Eye, ThumbsUp, BellRing, Smartphone } from 'lucide-react';

interface SMSMessage {
  id: string;
  sender: string;
  text: string;
  isScam: boolean;
  explanation: string;
}

const getSmsTriageFeedback = (id: string, correct: boolean) => {
  if (correct) {
    switch (id) {
      case 'sms-1': return "🎯 Why it's a good choice: Official postal agencies never text urgent links asking for package payment. You safely avoided credit card harvest risk.";
      case 'sms-2': return "🎯 Why it's a good choice: Official digital admin portals (Guichet.lu) never request tax refunds through random SMS links. Your government credentials are safe.";
      case 'sms-3': return "🎯 Why it's a good choice: Authentic state status notifications refer you directly to official applications. Proceeding without clicking arbitrary links keeps you safe.";
      case 'sms-4': default: return "🎯 Why it's a good choice: Real banks in Luxembourg never threaten you with instant suspension via clickable SMS links. Your bank accounts remain secure.";
    }
  } else {
    switch (id) {
      case 'sms-1': return "⚠️ Real-Life Consequence: Submitting payment details for a fake €1.85 deposit yields your complete physical credit card credentials to fraud rings for high-cost offshore purchases.";
      case 'sms-2': return "⚠️ Real-Life Consequence: Handing secure government logins to forged duplicate websites lets scammers hijack your public profiles, steal papers, or execute state-identity theft.";
      case 'sms-3': return "⚠️ Real-Life Consequence: Flagging actual, non-link state reminders stops you from staying abreast of critical national notices or tax/court schedules.";
      case 'sms-4': default: return "⚠️ Real-Life Consequence: Clicking banking phishes routes you to elaborate fake portals where automated scripts grab active tokens and initiate immediate wire transfers.";
    }
  }
};

const getVoiceSafeFeedback = (callState: 'hangup' | 'compromise') => {
  if (callState === 'hangup') {
    return "🎯 Why it's a good choice: Cutting off the call and calling their vetted personal number or requesting a secret code blocks voice cloning engines completely.";
  } else {
    return "⚠️ Real-Life Consequence: You would wire valuable funds to offshore scam cells under severe chemical panic and psychological distress before verifying if your loved one is actually OK.";
  }
};

const getQuizChampFeedback = (idx: number, isCorrect: boolean) => {
  if (idx === 0) {
    if (isCorrect) {
      return "🎯 Why it's a good choice: Paying key attention to robotic breathing rates or speaker pauses allows accurate classification of synthesizers before making payments.";
    } else {
      return "⚠️ Real-Life Consequence: Blindly trusting synthesized audio leaves you highly susceptible to high-pressure family emergency voice-cloning schemes.";
    }
  } else {
    if (isCorrect) {
      return "🎯 Why it's a good choice: Separating employee/customer data from public AI processors ensures full compliance with Luxembourg and European GDPR protection laws.";
    } else {
      return "⚠️ Real-Life Consequence: Pasting raw spreadsheets or databases violates legal privacy codes, leaving your company open to major lawsuits and severe state leaks.";
    }
  }
};

export default function MobileSimulator() {
  const [activeApp, setActiveApp] = useState<'home' | 'smishshield' | 'voicesafe' | 'quizchamp'>('home');
  const [phoneTime, setPhoneTime] = useState('11:42');

  // SmishShield State
  const [smsList, setSmsList] = useState<SMSMessage[]>([
    {
      id: 'sms-1',
      sender: 'POST.LU',
      text: 'POST Luxembourg: Your package cannot be delivered because a customs fee of €1.85 has not been paid. Click post-lu-fees.com to settle.',
      isScam: true,
      explanation: 'Official postal services do not text shortened links asking for urgent cent payments to process standard parcels.'
    },
    {
      id: 'sms-2',
      sender: 'Guichet.lu',
      text: 'MyGuichet: A message from the tax authorities is waiting in your workspace. Log in at secure-guichet-id.com to receive your €150 refund immediately.',
      isScam: true,
      explanation: 'The Luxembourgish state portal never uses SMS with refund links. It requires secure login with Luxtrust or Govemment eIDs directly through guichet.lu'
    },
    {
      id: 'sms-3',
      sender: 'MyGuichet.lu',
      text: 'Notification: A secure document was uploaded to your personal MyGuichet.lu dashboard. Log in securely via the app to view.',
      isScam: false,
      explanation: 'A normal status message that indicates you have a document without providing strange links. It encourages using the official application directly.'
    },
    {
      id: 'sms-4',
      sender: 'BGL BNP',
      text: 'BGL BNP Paribas: Unusual AI login detected in Mersch. Click secure-bgl-portal.com to block or your card will be suspended.',
      isScam: true,
      explanation: 'Financial institutions in Luxembourg never send active clickable links via text warning you about sudden suspension.'
    }
  ]);
  const [smsIdx, setSmsIdx] = useState(0);
  const [smsScore, setSmsScore] = useState(0);
  const [smsFeedback, setSmsFeedback] = useState<{ correct: boolean; explanation: string } | null>(null);

  // VoiceSafe State
  const [callState, setCallState] = useState<'ringing' | 'active' | 'hangup' | 'compromise'>('ringing');
  const [audioTranscript, setAudioTranscript] = useState("Audio Synth Cloning (Max): 'Grandpa! Grandpa! I am in dynamic crisis in Paris, I lost my cards and passport. I need you to send €400 right now so the hotel doesn't call police...'");
  const [voiceFeedback, setVoiceFeedback] = useState<string | null>(null);

  // QuizChamp State (Kahoot play simulation)
  const triviaQuestions = [
    {
      q: "Which of these is a typical sign of an AI-generated deepfake voice call?",
      options: [
        { id: '1-red', text: "Minor metallic latency or robotic breathing pauses", isCorrect: true, shortcut: "Red Triangle" },
        { id: '1-blue', text: "Perfect audio quality that sounds like a professional studio", isCorrect: false, shortcut: "Blue Diamond" },
        { id: '1-green', text: "The person speaks only in French and German", isCorrect: false, shortcut: "Green Circle" },
        { id: '1-yellow', text: "The caller immediately invites you for dinner", isCorrect: false, shortcut: "Yellow Star" }
      ]
    },
    {
      q: "Under GDPR regulations, when using public AI models for work you should:",
      options: [
        { id: '2-red', text: "Paste raw customer details so the draft is highly accurate", isCorrect: false, shortcut: "Red Triangle" },
        { id: '2-blue', text: "Submit everything but make the chatbot promise secrets", isCorrect: false, shortcut: "Blue Diamond" },
        { id: '2-green', text: "Anonymize and de-identify all personal information first", isCorrect: true, shortcut: "Green Circle" },
        { id: '2-yellow', text: "Avoid reading the document before pasting it", isCorrect: false, shortcut: "Yellow Star" }
      ]
    }
  ];
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizTimer, setQuizTimer] = useState(20);
  const [quizState, setQuizState] = useState<'playing' | 'feedback' | 'finished'>('playing');
  const [quizScore, setQuizScore] = useState(0);
  const [selectedTriviaOption, setSelectedTriviaOption] = useState<string | null>(null);
  const [triviaResult, setTriviaResult] = useState<{ isCorrect: boolean; feedback: string } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setPhoneTime(`${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Trivia countdown timer
  useEffect(() => {
    let interval: any;
    if (activeApp === 'quizchamp' && quizState === 'playing') {
      interval = setInterval(() => {
        setQuizTimer((prev) => {
          if (prev <= 1) {
            handleTriviaTimeout();
            return 20;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeApp, quizState, quizIdx]);

  const handleTriviaTimeout = () => {
    setTriviaResult({ isCorrect: false, feedback: "Time is up! Speed matters in Kahoot-style workshop games, but accuracy prevents cyber loss." });
    setQuizState('feedback');
  };

  const handleAnswerSms = (scamChoice: boolean) => {
    const currentSms = smsList[smsIdx];
    const correct = currentSms.isScam === scamChoice;
    if (correct) setSmsScore((s) => s + 25);
    setSmsFeedback({
      correct,
      explanation: currentSms.explanation
    });
  };

  const nextSms = () => {
    setSmsFeedback(null);
    if (smsIdx < smsList.length - 1) {
      setSmsIdx((i) => i + 1);
    } else {
      // Loop or restart smish shield
      setSmsIdx(0);
      setSmsScore(0);
    }
  };

  const handleTriviaAnswer = (optionId: string, isCorrect: boolean) => {
    setSelectedTriviaOption(optionId);
    if (isCorrect) {
      setQuizScore((qs) => qs + 500 + quizTimer * 10);
      setTriviaResult({ isCorrect: true, feedback: "Perfect! Speed and precise knowledge earns huge points. Spotting metallic traces keeps you safe." });
    } else {
      setTriviaResult({ isCorrect: false, feedback: "Incorrect. Remember, AI deepfakes can sound very realistic but often display telltale latency or unnatural cadence." });
    }
    setQuizState('feedback');
  };

  const nextTrivia = () => {
    setSelectedTriviaOption(null);
    setTriviaResult(null);
    setQuizTimer(20);
    if (quizIdx < triviaQuestions.length - 1) {
      setQuizIdx((i) => i + 1);
      setQuizState('playing');
    } else {
      setQuizState('finished');
    }
  };

  const resetTrivia = () => {
    setQuizIdx(0);
    setQuizScore(0);
    setQuizTimer(20);
    setQuizState('playing');
    setSelectedTriviaOption(null);
    setTriviaResult(null);
  };

  return (
    <div className="flex-1 flex flex-col items-center py-6">
      {/* Introduction text */}
      <div className="text-center max-w-2xl mx-auto mb-10 px-4">
        <span className="inline-block py-1 px-3.5 bg-[#129CD5]/10 text-[#129CD5] font-bold text-xs uppercase tracking-widest rounded-full mb-3 border border-[#129CD5]/20">
          📱 EXPERIENCE TWO: PHONE SHELL INTERACTIVE
        </span>
        <h2 className="text-2.5xl sm:text-4xl font-extrabold text-[#4A4036] tracking-tight mb-3">
          Tactile Mobile Simulator
        </h2>
        <p className="text-[#887868] text-sm sm:text-base leading-relaxed">
          Workshop participants can interact directly with this simulated Luxembourg smartphone interface. Test cellular phishes, check cloned call voice-clips, and try rapid quiz mechanics offline.
        </p>
      </div>

      {/* Main Grid: Presenter Instructions + Central Phone Simulator */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl">
        
        {/* Left column: Presenter Instructions for Mobile games */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E8E1D5] shadow-xs">
            <h3 className="font-extrabold text-[#4A4036] mb-3 text-lg flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#129CD5]" /> Mobile Gamification
            </h3>
            <p className="text-xs text-[#887868] leading-relaxed mb-4">
              In a workshop, active smartphone interactions keep engagement exceptionally high. 
              Use this simulation to demonstrate critical handheld risks representing Luxembourg citizens.
            </p>

            <ul className="space-y-3.5 text-xs text-[#584D42]">
              <li className="flex gap-2">
                <span className="w-5 h-5 bg-[#E3232C]/10 text-[#E3232C] text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">1</span>
                <div>
                  <strong>Smish-Shield App:</strong> Practice flagging text messages claiming fake refunds (Guichet) or express postage (Post) immediately.
                </div>
              </li>
              <li className="flex gap-2">
                <span className="w-5 h-5 bg-[#129CD5]/10 text-[#129CD5] text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">2</span>
                <div>
                  <strong>VoiceSafe Guard:</strong> Test responses to emotional voice scams mimicking direct relatives. Perfect for younger classes and Senior programs.
                </div>
              </li>
              <li className="flex gap-2">
                <span className="w-5 h-5 bg-[#188C7C]/10 text-[#188C7C] text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">3</span>
                <div>
                  <strong>QuizChamp Game:</strong> Standard Kahoot-styled live trivia controller simulated right on their handsets.
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-[#4A4036] text-[#FAF7EE] p-5 rounded-2xl border border-[#584D42] space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-[#C7652A] font-bold block">💡 Workshop Facilitator Tip</span>
            <p className="text-xs text-[#D2C8BC] leading-relaxed">
              Have one participant pretend to be the grandchild in "VoiceSafe", then operate the mock phone live in front of the classroom to trigger a rich debate on how they verify "grandparent emergency" stories.
            </p>
          </div>
        </div>

        {/* Right column: Physical Phone Frame Mockup */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="relative z-10 w-[340px] h-[680px] bg-slate-900 rounded-[50px] p-3.5 shadow-2xl border-4 border-slate-700 overflow-hidden ring-12 ring-slate-800">
            
            {/* Phone Notch/Dynamic Island */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50 flex items-center justify-center ring-1 ring-slate-800">
              <div className="w-2.5 h-2.5 bg-slate-900 rounded-full border border-slate-800 mr-20"></div>
              <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
            </div>

            {/* Inner Phone screen container */}
            <div className="w-full h-full bg-[#FAF7EE] rounded-[38px] overflow-hidden flex flex-col relative select-none">
              
              {/* Virtual Smartphone status bar */}
              <div className="h-10 bg-white border-b border-[#E8E1D5]/35 flex justify-between items-center px-6 pt-2 text-xs font-bold text-gray-700 shrink-0 z-30">
                <span>{phoneTime}</span>
                <div className="flex items-center gap-1.5 opacity-80">
                  <Wifi className="w-3.5 h-3.5" />
                  <span className="text-[9px]">LUX-5G</span>
                  <Battery className="w-4 h-4 ml-0.5" />
                </div>
              </div>

              {/* Dynamic Application Container */}
              <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col justify-start relative z-10">
                <AnimatePresence mode="wait">
                  
                  {/* Smartphone Home Screen App Selection */}
                  {activeApp === 'home' && (
                    <motion.div
                      key="phone-home"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col items-center"
                    >
                      {/* Solace minimal lockscreen background card */}
                      <div className="w-full bg-[#4A4036] text-white p-5 rounded-2xl text-center mb-6 mt-2 relative overflow-hidden shadow-inner flex flex-col items-center justify-center">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-[#188C7C]/20 rounded-bl-full"></div>
                        <span className="text-[8px] uppercase tracking-widest text-[#188C7C] font-extrabold mb-1 bg-[#188C7C]/10 px-2 py-0.5 rounded-full inline-block">SYSTEM SHIELD SAFE</span>
                        <h4 className="font-serif font-bold text-sm">LUXEMBOURG LABS</h4>
                        <p className="text-[9px] text-[#D2C8BC] mt-1 leading-tight">Explore cyberthreat simulators styled specifically for citizens.</p>
                      </div>

                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Tap Simulated App to launch:</span>
                      
                      {/* Grid of Apps */}
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <button
                          onClick={() => setActiveApp('smishshield')}
                          className="flex flex-col items-center bg-white p-4.5 rounded-2xl border border-[#E8E1D5] shadow-xs hover:border-[#129CD5] hover:shadow-md transition-all group cursor-pointer"
                        >
                          <div className="w-11 h-11 bg-[#129CD5] text-white rounded-xl flex items-center justify-center mb-2.5 shadow-md">
                            <MessageSquare className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold text-[#4A4036]">SmishShield</span>
                          <span className="text-[8px] text-[#A69B8F] uppercase mt-0.5 font-bold">SMS Triage</span>
                        </button>

                        <button
                          onClick={() => setActiveApp('voicesafe')}
                          className="flex flex-col items-center bg-white p-4.5 rounded-2xl border border-[#E8E1D5] shadow-xs hover:border-[#E3232C] hover:shadow-md transition-all group cursor-pointer"
                        >
                          <div className="w-11 h-11 bg-[#E3232C] text-white rounded-xl flex items-center justify-center mb-2.5 shadow-md">
                            <PhoneCall className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold text-[#4A4036]">VoiceSafe</span>
                          <span className="text-[8px] text-[#A69B8F] uppercase mt-0.5 font-bold">Voice Clone</span>
                        </button>

                        <button
                          onClick={() => setActiveApp('quizchamp')}
                          className="flex flex-col items-center bg-white p-4.5 rounded-2xl border border-[#E8E1D5] shadow-xs hover:border-[#188C7C] hover:shadow-md transition-all group cursor-pointer lg:col-span-2"
                        >
                          <div className="w-11 h-11 bg-[#188C7C] text-white rounded-xl flex items-center justify-center mb-2.5 shadow-md mx-auto">
                            <Trophy className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold text-[#4A4036]">QuizChamp</span>
                          <span className="text-[8px] text-[#A69B8F] uppercase mt-0.5 font-bold">Classroom Trivia</span>
                        </button>
                      </div>

                      {/* Info footer on phone */}
                      <div className="mt-auto bg-white/70 p-3.5 rounded-2xl border text-center text-[10px] text-[#887868] font-medium leading-relaxed">
                        SOLACE civic workshops help you learn securely. Swipe up / click buttons to interact.
                      </div>
                    </motion.div>
                  )}

                  {/* SmishShield SMS Triage Game */}
                  {activeApp === 'smishshield' && (
                    <motion.div
                      key="phone-smish"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col justify-between"
                    >
                      <div>
                        {/* App Header bar */}
                        <div className="flex items-center justify-between mb-4 bg-white p-2 border rounded-xl shadow-xs">
                          <button onClick={() => setActiveApp('home')} className="p-1 hover:bg-gray-100 rounded-lg cursor-pointer">
                            <ArrowLeft className="w-4 h-4 text-gray-500" />
                          </button>
                          <span className="text-xs font-bold text-[#129CD5]">SmishShield v1.0</span>
                          <div className="text-[10px] font-bold bg-[#129CD5]/10 px-2 py-0.5 rounded-full text-[#129CD5]">Score: {smsScore}</div>
                        </div>

                        <span className="text-[9px] uppercase tracking-wider text-[#887868] font-extrabold mb-2 block text-center">SMS TRIAGE SCENARIO {smsIdx + 1} OF 4</span>

                        {/* Simulated SMS Bubble */}
                        <div className="bg-white rounded-2xl border shadow-xs overflow-hidden mb-4">
                          <div className="bg-gray-100 px-4 py-2 text-xs font-bold text-gray-600 border-b flex justify-between">
                            <span>From: {smsList[smsIdx].sender}</span>
                            <span className="text-[9px] opacity-70">Just Now</span>
                          </div>
                          <div className="p-4 text-xs select-text font-mono text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                            {smsList[smsIdx].text}
                          </div>
                        </div>

                        {!smsFeedback ? (
                          <div className="space-y-2.5">
                            <p className="text-[10px] font-bold text-center uppercase tracking-wider text-gray-400 my-2">Is this message an AI-automated Scam?</p>
                            <button
                              onClick={() => handleAnswerSms(true)}
                              className="w-full bg-[#E3232C] hover:bg-[#B31A21] text-white text-xs font-bold py-3 rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <ShieldAlert className="w-4 h-4" /> SCAM! Mark as Phishing
                            </button>
                            <button
                              onClick={() => handleAnswerSms(false)}
                              className="w-full bg-[#188C7C] hover:bg-[#106659] text-white text-xs font-bold py-3 rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <ShieldCheck className="w-4 h-4" /> SAFE. Trust Sender
                            </button>
                          </div>
                        ) : (
                          <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            className={`p-4 rounded-xl border mb-4 text-xs ${smsFeedback.correct ? 'bg-[#188C7C]/10 border-[#188C7C]/30 text-[#106659]' : 'bg-[#E3232C]/10 border-[#E3232C]/30 text-[#B31A21]'}`}
                          >
                            <h5 className="font-extrabold mb-1 text-xs">{smsFeedback.correct ? '🏆 Triage Correct!' : '⚠️ Misclassified Alert'}</h5>
                            <p className="text-[#584D42] text-[11px] leading-relaxed mb-3">{smsFeedback.explanation}</p>
                            
                            <div className="bg-white/80 p-2.5 rounded-lg border border-[inherit] text-[10px] text-gray-700 leading-relaxed font-semibold mb-3">
                              {getSmsTriageFeedback(smsList[smsIdx].id, smsFeedback.correct)}
                            </div>

                            <button
                              onClick={nextSms}
                              className="w-full bg-[#4A4036] hover:bg-[#3d342c] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              Continue to Next SMS <Eye className="w-3.5 h-3.5" />
                            </button>
                          </motion.div>
                        )}
                      </div>

                      <div className="text-[9px] text-[#A69B8F] leading-tight text-center bg-gray-50 p-2.5 rounded-xl border border-dashed mt-4">
                        💡 Smishing impersonates authentic local brands (Cactus, POST, MyGuichet) to manipulate you.
                      </div>
                    </motion.div>
                  )}

                  {/* VoiceSafe Grandparent call scam */}
                  {activeApp === 'voicesafe' && (
                    <motion.div
                      key="phone-voice"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col justify-between"
                    >
                      <div>
                        {/* App Header */}
                        <div className="flex items-center justify-between mb-4 bg-white p-2 border rounded-xl shadow-xs">
                          <button onClick={() => setActiveApp('home')} className="p-1 hover:bg-gray-100 rounded-lg cursor-pointer">
                            <ArrowLeft className="w-4 h-4 text-gray-500" />
                          </button>
                          <span className="text-xs font-bold text-[#E3232C]">Incoming Voice Shield</span>
                          <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></div>
                        </div>

                        {callState === 'ringing' && (
                          <div className="text-center py-6">
                            <div className="w-16 h-16 bg-[#FAF7EE] border-4 border-[#C7652A] rounded-full mx-auto flex items-center justify-center text-[#C7652A] mb-4 shadow-xs">
                              <PhoneCall className="w-8 h-8 animate-bounce" />
                            </div>
                            <h4 className="font-bold text-[#4A4036] text-sm">CALLER: GRANDKID MAX</h4>
                            <p className="text-[10px] text-[#887868] uppercase mt-1 tracking-wider">Estimated Match AI Score: 98%</p>
                            
                            <p className="text-xs italic text-red-500 font-bold bg-white border border-[#E8E1D5] py-2 px-3 rounded-xl mt-6">
                              🚨 Audio claims urgent dynamic safety crisis in Paris.
                            </p>

                            <button
                              onClick={() => setCallState('active')}
                              className="mt-8 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-8 rounded-full shadow-lg text-xs tracking-wider flex items-center justify-center gap-2 mx-auto cursor-pointer"
                            >
                              <Volume2 className="w-4 h-4 animate-pulse" /> ANSWER VOICE CALL
                            </button>
                          </div>
                        )}

                        {callState === 'active' && (
                          <div className="space-y-4">
                            <div className="bg-[#4A4036] text-[#FAF7EE] p-4 rounded-xl border border-[#584D42] text-[11px] font-mono leading-relaxed relative">
                              <span className="absolute top-2 right-2 text-red-400 text-[8px] tracking-widest font-extrabold uppercase animate-pulse">Voice Synthesized</span>
                              <strong className="block text-red-300 uppercase mb-1">Cloned Voice Stream:</strong>
                              "{audioTranscript}"
                            </div>

                            <p className="text-[10px] text-center font-bold text-[#887868] uppercase tracking-wider">SELECT YOUR CRITICAL SAFE MOVE:</p>

                            <div className="space-y-2">
                              <button
                                onClick={() => {
                                  setCallState('compromise');
                                  setVoiceFeedback("Security Loss: Grandkids never tell their grandparents 'Don't tell mom!' in real legal binding states. Scammers clone voices in 3 seconds to manipulate you.");
                                }}
                                className="w-full text-left bg-white border-2 hover:border-[#E3232C] p-3 rounded-xl text-xs font-semibold text-[#584D42] cursor-pointer"
                              >
                                ⚠️ Pay €400 by instant Wire Transfer
                              </button>
                              <button
                                onClick={() => {
                                  setCallState('hangup');
                                  setVoiceFeedback("Perfect Civic Action! You hung up and verified their status out-of-band on a true trusted channel. AI voice deepfakes are foiled.");
                                }}
                                className="w-full text-left bg-white border-2 hover:border-[#188C7C] p-3 rounded-xl text-xs font-semibold text-[#584D42] cursor-pointer"
                              >
                                ✅ Hang up & call Max directly on his real number
                              </button>
                              <button
                                onClick={() => {
                                  setCallState('hangup');
                                  setVoiceFeedback("Excellent! You asked of a secret family 'safe word'. The scammer hesitated and ended the stream immediately. You successfully protected your funds.");
                                }}
                                className="w-full text-left bg-white border-2 hover:border-[#129CD5] p-3 rounded-xl text-xs font-semibold text-[#584D42] cursor-pointer"
                              >
                                🚨 Ask Max for the family secret 'safe-word'
                              </button>
                            </div>
                          </div>
                        )}

                        {(callState === 'hangup' || callState === 'compromise') && (
                          <div className={`p-4 rounded-xl border text-xs leading-relaxed ${callState === 'hangup' ? 'bg-[#188C7C]/10 border-[#188C7C]/30 text-[#106659]' : 'bg-[#E3232C]/10 border-[#E3232C]/30 text-[#B31A21]'}`}>
                            <h4 className="font-extrabold mb-1.5 text-xs">{callState === 'hangup' ? '🏆 Family Protection Perfect' : '⚠️ System Compromise Alert'}</h4>
                            <p className="text-[#584D42] text-[11px] font-medium leading-relaxed mb-3">{voiceFeedback}</p>
                            
                            <div className="bg-white/80 p-2.5 rounded-lg border border-[inherit] text-[10px] text-gray-700 leading-relaxed font-semibold mb-4">
                              {getVoiceSafeFeedback(callState)}
                            </div>

                            <button
                              onClick={() => {
                                setCallState('ringing');
                                setVoiceFeedback(null);
                              }}
                              className="w-full bg-[#4A4036] text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <RefreshCw className="w-3.5 h-3.5" /> Re-verify simulated caller
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="text-[9px] text-[#A69B8F] text-center mt-4">
                        📞 Cloned Voice scams exploit parental adrenaline and fear. Always stop, breathe, and verify in-person.
                      </div>
                    </motion.div>
                  )}

                  {/* QuizChamp: Simulated classroom Rapid Trivia Kahoot style */}
                  {activeApp === 'quizchamp' && (
                    <motion.div
                      key="phone-quiz"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col justify-between"
                    >
                      <div>
                        {/* App Header */}
                        <div className="flex items-center justify-between mb-3 bg-white p-2 border rounded-xl shadow-xs">
                          <button onClick={() => setActiveApp('home')} className="p-1 hover:bg-gray-100 rounded-lg cursor-pointer">
                            <ArrowLeft className="w-4 h-4 text-gray-500" />
                          </button>
                          <span className="text-xs font-bold text-[#188C7C]">QuizChamp Trivia</span>
                          <div className="text-[9px] font-bold bg-[#188C7C]/10 text-[#188C7C] px-2 py-0.5 rounded-full">PIN: 728-109</div>
                        </div>

                        {quizState === 'playing' && (
                          <div className="space-y-4">
                            {/* Quiz Timer Indicator */}
                            <div className="flex justify-between items-center text-[10px] font-extrabold tracking-wide text-[#887868]">
                              <span>QUESTION {quizIdx + 1} OF 2</span>
                              <span className="text-red-500 bg-red-100 px-2 py-0.5 rounded-full animate-pulse">{quizTimer}s LEFT</span>
                            </div>

                            {/* Presenter simulated display */}
                            <div className="bg-white p-3 border-2 border-dashed rounded-xl shadow-inner text-center">
                              <h5 className="text-xs font-bold text-[#4A4036] leading-relaxed mb-1">Presenter view displays this:</h5>
                              <p className="text-xs text-gray-700 font-semibold">{triviaQuestions[quizIdx].q}</p>
                            </div>

                            <p className="text-[9px] font-extrabold text-[#A69B8F] uppercase tracking-wider text-center">Tap matching option on phone screen:</p>

                            {/* Trivia colors (Kahoot layout on smartphone) */}
                            <div className="grid grid-cols-2 gap-2.5">
                              {triviaQuestions[quizIdx].options.map((opt, i) => {
                                let colorStyle = '';
                                switch (i) {
                                  case 0: colorStyle = 'bg-[#E3232C] hover:bg-[#B31A21]'; break;
                                  case 1: colorStyle = 'bg-[#129CD5] hover:bg-[#0D7BA8]'; break;
                                  case 2: colorStyle = 'bg-[#188C7C] hover:bg-[#106659]'; break;
                                  case 3: colorStyle = 'bg-[#C7652A] hover:bg-[#9E4D1D]'; break;
                                }

                                return (
                                  <button
                                    key={opt.id}
                                    onClick={() => handleTriviaAnswer(opt.id, opt.isCorrect)}
                                    className={`p-3.5 text-white rounded-xl text-[10px] font-bold text-center leading-tight shadow-md flex flex-col justify-center items-center min-h-[64px] transition-all cursor-pointer ${colorStyle}`}
                                  >
                                    <span className="text-[8px] uppercase tracking-wider opacity-65 mb-1">{opt.shortcut}</span>
                                    <span>{opt.text}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {quizState === 'feedback' && (
                          <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            className="bg-white p-4 border rounded-xl shadow-xs text-center space-y-4"
                          >
                            <div className="w-12 h-12 rounded-full mx-auto bg-gray-50 flex items-center justify-center shadow-inner">
                              {triviaResult?.isCorrect ? (
                                <ShieldCheck className="w-7 h-7 text-[#188C7C]" />
                              ) : (
                                <ShieldAlert className="w-7 h-7 text-[#E3232C]" />
                              )}
                            </div>
                            
                            <h4 className="text-sm font-extrabold text-[#4A4036]">{triviaResult?.isCorrect ? "🏆 Speedy & Correct!" : "⚠️ Accuracy Missing"}</h4>
                            <p className="text-xs text-gray-700 leading-relaxed">{triviaResult?.feedback}</p>

                            <div className="text-[10px] text-gray-700 leading-relaxed font-semibold bg-gray-50 p-3 rounded-xl border border-dashed text-left">
                              {getQuizChampFeedback(quizIdx, triviaResult?.isCorrect || false)}
                            </div>

                            <button
                              onClick={nextTrivia}
                              className="w-full bg-[#188C7C] text-white py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                            >
                              Go to Next Question
                            </button>
                          </motion.div>
                        )}

                        {quizState === 'finished' && (
                          <div className="bg-white p-5 border rounded-2xl shadow-xs text-center space-y-4">
                            <span className="text-xs font-bold text-[#188C7C] bg-[#188C7C]/10 px-3 py-1 rounded-full uppercase tracking-wider">TRIVIA GRADUATE</span>
                            <h4 className="text-base font-extrabold text-[#4A4036]">Your Trivia Score: {quizScore} pts</h4>
                            <p className="text-xs text-[#887868] leading-relaxed">
                              Fantastic speed and response rate. In workshops, live trivia is prime for verifying student concepts.
                            </p>
                            <button
                              onClick={resetTrivia}
                              className="w-full bg-[#129CD5] hover:bg-[#0D7BA8] text-white py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                            >
                              Restart Classroom Quiz
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="text-[9px] text-[#A69B8F] text-center mt-3 bg-gray-50 p-2.5 rounded-xl border border-dashed">
                        🏆 Trivia platforms like Kahoot are highly effective for quick review of phishing indicators.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Physical Bottom Apple iOS styled Home Screen handle line */}
              <div className="h-4 flex justify-center items-center pb-2 shrink-0 z-30">
                <div 
                  className="w-24 h-1 bg-gray-400 rounded-full cursor-pointer hover:bg-gray-600 transition-colors"
                  onClick={() => setActiveApp('home')}
                  title="iOS Home button link"
                ></div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
