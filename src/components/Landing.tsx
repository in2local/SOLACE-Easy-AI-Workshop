import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Users, GraduationCap, Briefcase, Glasses, ArrowRight } from 'lucide-react';
import { AgeGroup } from '../data/content';
import { cn } from '../lib/utils';
import AIChatSandbox from './AIChatSandbox';

interface LandingProps {
  onSelectAge: (age: AgeGroup) => void;
}

export default function Landing({ onSelectAge }: LandingProps) {
  const options: { id: AgeGroup; label: string; icon: ReactNode; color: string; bgLabel: string; desc: string; targetText: string }[] = [
    { 
      id: 'explorers', 
      label: 'Explorers (9-14)', 
      bgLabel: 'bg-[#E3232C] text-white',
      icon: <Users className="w-8 h-8" />, 
      color: 'border-[#E3232C] hover:shadow-[#E3232C]/20',
      desc: 'Learn basic digital hygiene, spot gaming scams, and separate AI study aids from plagiarism helper bots.',
      targetText: 'Basic Digital Safety'
    },
    { 
      id: 'digital-citizens', 
      label: 'Digital Citizens (15-24)', 
      bgLabel: 'bg-[#129CD5] text-white',
      icon: <GraduationCap className="w-8 h-8" />, 
      color: 'border-[#129CD5] hover:shadow-[#129CD5]/20',
      desc: 'Protect democratic voting from deepfakes, verify viral political election texts, and safeguard social identity.',
      targetText: 'Democracy & Fraud Defense'
    },
    { 
      id: 'professionals', 
      label: 'Professionals (25-55)', 
      bgLabel: 'bg-[#188C7C] text-white',
      icon: <Briefcase className="w-8 h-8" />, 
      color: 'border-[#188C7C] hover:shadow-[#188C7C]/20',
      desc: 'Prevent corporate customer leaks in third-party AI, identify spear phishing invoices, and secure workflows.',
      targetText: 'Enterprise Safety'
    },
    { 
      id: 'seniors', 
      label: 'Senior Guardians (55+)', 
      bgLabel: 'bg-[#C7652A] text-white',
      icon: <Glasses className="w-8 h-8" />, 
      color: 'border-[#C7652A] hover:shadow-[#C7652A]/20',
      desc: 'Master AI voice cloning identification (grandparent scams), detect smishing claiming to be from Guichet.lu or Post.lu.',
      targetText: 'Identity & Fraud Guard'
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-6xl mx-auto w-full py-6 md:py-12">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 sm:mb-16"
      >
        <span className="inline-block py-1.5 px-4 rounded-full bg-[#188C7C]/10 text-[#188C7C] font-bold text-xs tracking-widest uppercase mb-6 shadow-xs border border-[#188C7C]/20">
          🏆 MULTI-GENERATIONAL CIVIC SECURITY SIMULATOR
        </span>
        <h1 className="text-3.5xl md:text-5xl font-extrabold text-[#4A4036] tracking-tight mb-5 leading-tight">
          Engage in Democracy. <br className="hidden sm:block" />
          Master AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#129CD5] to-[#188C7C]">Securely.</span>
        </h1>
        <p className="text-md sm:text-lg text-[#887868] max-w-3xl mx-auto leading-relaxed">
          Welcome to the SOLACE digital workshop training suite. Select your profile group below to practice real threat detection, safeguard your democratic views, and secure your digital works completely offline and risk-free.
        </p>
      </motion.div>

      <div className="w-full">
        <h2 className="text-lg sm:text-xl font-bold text-center text-[#4A4036] mb-8 uppercase tracking-wider">
          Select profile to play your simulation:
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {options.map((opt, i) => (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectAge(opt.id)}
              className={cn(
                "flex flex-col items-center bg-white p-5 px-3 sm:px-4 lg:px-2.5 xl:px-5 rounded-3xl shadow-sm border-2 transition-all text-left relative overflow-hidden group cursor-pointer",
                opt.color, "hover:shadow-lg"
              )}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-full -z-0 opacity-40 transition-transform group-hover:scale-110"></div>
              
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-inner z-10", opt.bgLabel)}>
                {opt.icon}
              </div>
              
              <h3 className="text-xs sm:text-[14px] md:text-[15px] lg:text-[13px] xl:text-[15.5px] 2xl:text-base font-bold tracking-tight text-[#4A4036] mb-1.5 w-full text-center z-10 whitespace-nowrap">{opt.label}</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#887868] bg-[#FAF7EE] px-3 py-1 rounded-full text-center mb-4 border border-[#E8E1D5]/60 z-10">
                {opt.targetText}
              </p>
              
              <p className="text-[#887868] text-xs sm:text-sm w-full text-center leading-relaxed mb-6 z-10 flex-grow">
                {opt.desc}
              </p>

              <span className="text-xs font-bold text-gray-500 group-hover:text-gray-900 transition-colors flex items-center gap-1.5 mt-auto z-10 group-hover:translate-x-1.5 transition-transform duration-200">
                Play This Scenario <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Live AI Interactive Prompt Sandbox */}
      <AIChatSandbox />
    </div>
  );
}
