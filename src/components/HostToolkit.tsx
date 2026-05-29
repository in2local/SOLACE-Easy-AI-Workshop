import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, BookOpen, Clock, Download, FileText, CheckSquare, Target, GraduationCap } from 'lucide-react';

export default function HostToolkit() {
  const [activeSlide, setActiveSlide] = useState(0);

  const presentationModule = [
    {
      title: "Module 1: Democratic AI Introductions",
      duration: "10 mins",
      bullets: [
        "What is generative AI? Demonstrate simple local prompts.",
        "Establishing Luxembourg diversity: Why does cybersecurity safeguard active digital civic engagement?",
        "Strict compliance guidelines: Introduction of GDPR as an offline personal safety net."
      ]
    },
    {
      title: "Module 2: Multigenerational Threat Defense",
      duration: "25 mins",
      bullets: [
        "Run the SOLACE Laptop Scenario player live as a classroom.",
        "Deconstruct deepfake voice cloning and government TAX-SMS indicators.",
        "Interactive Debate: Ask participants what physical safe practices they execute before making a payout."
      ]
    },
    {
      title: "Module 3: Hands-On Triage Challenge",
      duration: "20 mins",
      bullets: [
        "Prompt users to load the Smartphone Simulator inside their browsers.",
        "Practice Smish-Shield SMS checks and check cloned phone voicemails.",
        "Run rapid-fire QuizChamp trivia (or real pin-based Kahoot games) to benchmark students."
      ]
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center py-6 max-w-5xl mx-auto w-full">
      
      {/* Facilitator Header */}
      <div className="text-center mb-10">
        <span className="inline-block py-1.5 px-4 rounded-full bg-[#74345E]/10 text-[#74345E] font-bold text-xs uppercase tracking-widest mb-4 shadow-xs border border-[#74345E]/20">
          📚 FACILITATOR CORNER & WORKSHOP TOOLKIT
        </span>
        <h2 className="text-3.5xl font-extrabold text-[#4A4036] tracking-tight mb-2 leading-tight">
          Host Your SOLACE Workgroup
        </h2>
        <p className="text-[#887868] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Ready-to-use curriculum structures and pedagogical suggestions tailored for Luxembourg teachers, communale managers, and group leaders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
        
        {/* Left Column: Age Bracket Analysis and Feedback query */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-xs flex-1">
            <h3 className="font-extrabold text-[#4A4036] text-sm uppercase tracking-wider mb-4 pb-2 border-b flex items-center gap-1.5">
              <Target className="w-4 h-4 text-[#74345E]" /> Age Bracket Strategy
            </h3>
            
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              The updated <strong>4-tier sorting</strong> represents an outstanding upgrade for Luxembourgish workshops:
            </p>

            <div className="space-y-3.5 text-xs">
              <div className="bg-[#E3232C]/5 p-3 rounded-xl border border-[#E3232C]/10 text-gray-700">
                <strong className="text-[#E3232C] block font-bold">Explorers (9-14)</strong>
                Perfect capacity for spotting cyber-bullying avatar bots and identifying essay/homework plagiarism borders.
              </div>
              <div className="bg-[#129CD5]/5 p-3 rounded-xl border border-[#129CD5]/10 text-gray-700">
                <strong className="text-[#129CD5] block font-bold">Digital Citizens (15-24)</strong>
                Crucial age to address political deepfake manipulation during communal/European elections.
              </div>
              <div className="bg-[#188C7C]/5 p-3 rounded-xl border border-[#188C7C]/10 text-gray-700">
                <strong className="text-[#188C7C] block font-bold">Professionals (25-55)</strong>
                High business email compromise (BEC) invoice redirections and private ledger leaks focus.
              </div>
              <div className="bg-[#C7652A]/5 p-3 rounded-xl border border-[#C7652A]/10 text-gray-700">
                <strong className="text-[#C7652A] block font-bold">Senior Guardians (55+)</strong>
                Key tier prone to physical panic triggers regarding voice-cloned grandkid emergency calls.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Slide Presentation and Checklist bento */}
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          
          {/* Slide Deck Controller */}
          <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-xs">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="font-extrabold text-[#74345E] text-xs uppercase tracking-widest flex items-center gap-2">
                <BookOpen className="w-4.5 h-4.5" /> Presenter Slide Deck Layout
              </h3>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider font-mono">3 Stages</span>
            </div>

            <div className="flex gap-2 mb-4 overflow-x-auto pb-1.5 scrollbar-thin">
              {presentationModule.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    activeSlide === idx 
                      ? 'bg-[#74345E] text-white' 
                      : 'bg-[#FAF7EE] text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  Stage {idx + 1} ({slide.duration})
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="bg-[#FAF7EE] p-5 rounded-2xl border min-h-[140px]"
              >
                <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  <span>FACILITATOR INSTRUCTIONS</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{presentationModule[activeSlide].duration}</span>
                  </div>
                </div>

                <h4 className="font-bold text-[#4A4036] text-sm sm:text-base mb-3">{presentationModule[activeSlide].title}</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed list-disc list-inside">
                  {presentationModule[activeSlide].bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quick Checklist Bento */}
          <div className="bg-[#4A4036] text-white p-5 rounded-3xl border border-[#584D42] shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#FAF7EE] flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-[#188C7C]" /> Checklist Pre-Session:
              </h4>
              <ul className="space-y-1.5 text-xs text-[#D2C8BC] leading-relaxed">
                <li className="flex items-baseline gap-1.5 opacity-85">
                  <span className="text-[#188C7C]">✓</span> Be sure the workshop screen is visible.
                </li>
                <li className="flex items-baseline gap-1.5 opacity-85">
                  <span className="text-[#188C7C]">✓</span> Direct students to access this web page on their devices.
                </li>
                <li className="flex items-baseline gap-1.5 opacity-85">
                  <span className="text-[#188C7C]">✓</span> Emphasize we gather no emails (GDPR certified!).
                </li>
              </ul>
            </div>

            <div className="space-y-2 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-4 border-white/10">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#FAF7EE] flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#C7652A]" /> Certify Scholars:
              </h4>
              <p className="text-xs text-[#D2C8BC] leading-relaxed">
                Trainees that conclude the role simulator can output standard certificates directly. Ensure they print or save their certification with pride!
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
