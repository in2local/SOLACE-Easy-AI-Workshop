import { motion } from 'motion/react';
import { Play, Trophy, Shield, Info, ArrowRight, RefreshCw } from 'lucide-react';
import { AgeGroup } from '../data/content';

interface DashboardProps {
  ageGroup: AgeGroup;
  score: number;
  onStartSimulation: () => void;
  onReset: () => void;
}

export default function Dashboard({ ageGroup, score, onStartSimulation, onReset }: DashboardProps) {
  const getGreeting = () => {
    switch (ageGroup) {
      case 'explorers': return "Welcome, Explorer! Ready to learn organic digital security?";
      case 'digital-citizens': return "Hello Digital Citizen. Ready to defend democracy and your media ID?";
      case 'professionals': return "Welcome, Active Professional. Secure your workflows & GDPR safety.";
      case 'seniors': return "Welcome Senior Guardian. Let's guard your family against AI scams.";
    }
  };

  const getSubText = () => {
    switch (ageGroup) {
      case 'explorers': return "Learn basic digital hygiene, avoid gaming scams, and leverage AI constructively.";
      case 'digital-citizens': return "Check deepfakes, spot elections clickbait, and safeguard civic democratic integrity.";
      case 'professionals': return "Avoid advanced spear-phishing billing fraud, protect consumer data, and use private AI.";
      case 'seniors': return "Avoid text fraud (MyGuichet/Post.lu) and malicious grandkid cloning calls.";
    }
  };

  const getProfileTheme = () => {
    switch (ageGroup) {
      case 'explorers': return { activeColor: 'bg-[#E3232C]', outlineColor: 'border-[#E3232C]/30', text: 'text-[#E3232C]' };
      case 'digital-citizens': return { activeColor: 'bg-[#129CD5]', outlineColor: 'border-[#129CD5]/30', text: 'text-[#129CD5]' };
      case 'professionals': return { activeColor: 'bg-[#188C7C]', outlineColor: 'border-[#188C7C]/30', text: 'text-[#188C7C]' };
      case 'seniors': return { activeColor: 'bg-[#C7652A]', outlineColor: 'border-[#C7652A]/30', text: 'text-[#C7652A]' };
    }
  };

  const theme = getProfileTheme();

  return (
    <div className="flex-1 flex flex-col items-center py-6 md:py-8 max-w-5xl mx-auto w-full">
      {/* Top Welcome Title */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full text-center mb-8"
      >
        <span className="inline-block px-3 py-1 bg-white rounded-full text-xs font-bold shadow-xs border border-[#E8E1D5] mb-4 text-[#887868] uppercase tracking-wider">
          Active Profile: <strong className={theme.text}>{ageGroup.replace('-', ' ')}</strong>
        </span>
        <h2 className="text-2.5xl sm:text-4xl font-extrabold text-[#4A4036] tracking-tight mb-3 leading-tight">{getGreeting()}</h2>
        <p className="text-[#887868] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">{getSubText()}</p>
      </motion.div>

      {/* Main Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch mt-3">
        {/* Play Card */}
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-sm flex flex-col relative overflow-hidden group justify-between"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -z-0 group-hover:scale-105 transition-transform duration-300"></div>
          
          <div className="z-10 flex-1">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner ${theme.activeColor} text-white`}>
              <Play className="w-6 h-6 fill-current ml-1" />
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-[#4A4036] mb-3">Interactive Training Scenarios</h3>
            <p className="text-[#887868] text-sm sm:text-base leading-relaxed mb-6">
              Step into fully interactive, local text-based simulations mirroring realistic scenarios. Practice evaluating prompt risks, parsing phishes, and spotting AI misinformation. Learn from mistakes without any danger.
            </p>
          </div>
          
          <div className="z-10 flex flex-col sm:flex-row gap-3">
            <button 
              onClick={onStartSimulation}
              className={`flex-1 group/btn text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-3 cursor-pointer ${theme.activeColor}`}
            >
              Start Simulator
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-200" />
            </button>
            <button
              onClick={onReset}
              className="px-4 py-3 border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-50 text-gray-500 rounded-xl transition-all flex items-center justify-center text-xs font-bold gap-1 cursor-pointer"
              title="Change Profile Role"
            >
              <RefreshCw className="w-4 h-4" /> Change Profile
            </button>
          </div>
        </motion.div>

        {/* Info/Gamification Stats Card */}
        <motion.div 
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#4A4036] text-[#FAF7EE] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col relative overflow-hidden justify-between"
        >
          <div className="absolute bottom-0 right-0 w-36 h-36 bg-[#C7652A]/10 rounded-tl-full blur-2xl"></div>

          <div>
            <div className="w-14 h-14 bg-[#3d342c] text-[#E3232C] rounded-2xl flex items-center justify-center mb-6 border border-[#584D42] shadow-inner relative z-10">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 relative z-10">Workshop Tracker</h3>
            <p className="text-[#D2C8BC] text-sm leading-relaxed mb-6 relative z-10">
              Complete the workshop tasks correctly to earn your prestigious <strong>SOLACE digital defender status</strong> and secure safety badge.
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-auto relative z-10">
            <div className="flex items-center gap-4 bg-[#3d342c] p-4 rounded-xl border border-[#584D42]">
              <Shield className="w-6 h-6 text-[#188C7C]" />
              <div>
                <div className="font-bold text-xs sm:text-sm text-[#FAF7EE]">Security Score</div>
                <div className="text-xs text-[#D2C8BC] mt-0.5">{score} / 100 Points</div>
              </div>
            </div>
            
            <div className="flex gap-2.5 items-start text-xs text-[#D2C8BC] bg-[#3d342c]/50 p-4 rounded-xl border border-[#584D42]/50">
              <Info className="w-5 h-5 text-[#C7652A] shrink-0" />
              <p className="leading-relaxed">
                GDPR Rule: All workshop responses remain completely private on your desktop. We collect absolutely zero tracking codes or server logs. Stay safe.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
