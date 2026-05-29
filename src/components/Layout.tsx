import { ReactNode } from 'react';
import { ShieldCheck, Laptop, Phone, Vote, BookOpen, Info } from 'lucide-react';

export type AppTab = 'laptop-sim' | 'mobile-sim' | 'ai-audit' | 'democracy-vote' | 'host-toolkit';

interface LayoutProps {
  children: ReactNode;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  resetLaptopSim: () => void;
  isHomepage?: boolean;
  onGoHome?: () => void;
}

export default function Layout({ children, activeTab, setActiveTab, resetLaptopSim, isHomepage = false, onGoHome }: LayoutProps) {
  const navItems: { id: AppTab; label: string; icon: ReactNode; color: string }[] = [
    { id: 'laptop-sim', label: 'Laptop Simulator', icon: <Laptop className="w-4 h-4" />, color: 'hover:text-[#E3232C]' },
    { id: 'mobile-sim', label: 'Smartphone Simulator', icon: <Phone className="w-4 h-4" />, color: 'hover:text-[#129CD5]' },
    { id: 'ai-audit', label: 'AI Safety Auditor', icon: <ShieldCheck className="w-4 h-4" />, color: 'hover:text-[#188C7C]' },
    { id: 'democracy-vote', label: 'Democracy Ballot Box', icon: <Vote className="w-4 h-4" />, color: 'hover:text-[#C7652A]' },
    { id: 'host-toolkit', label: 'Facilitator Guide', icon: <BookOpen className="w-4 h-4" />, color: 'hover:text-[#74345E]' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7EE] flex flex-col font-sans text-[#4A4036]">
      {/* Dynamic Status Bar - Fully GDPR Compliant notification */}
      <div className="bg-[#4A4036] text-[#E8E1D5] py-2 px-4 text-center text-xs border-b border-[#584D42] flex items-center justify-center gap-2 font-medium">
        <ShieldCheck className="w-4 h-4 text-[#188C7C] shrink-0" />
        <span>Strictly GDPR Compliant: No personal data collected, stored, or sent to external servers.</span>
      </div>

      <header className="bg-white border-b border-[#E8E1D5] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 gap-4">
            
            {/* Header Brand */}
            <div 
              className="flex flex-col cursor-pointer group" 
              onClick={() => {
                setActiveTab('laptop-sim');
                resetLaptopSim();
              }}
            >
              <div className="flex items-baseline space-x-2 sm:space-x-3">
                <div className="font-extrabold text-2xl sm:text-3.5xl tracking-tighter flex items-center group-hover:scale-102 transition-transform duration-300">
                  <span className="text-[#E3232C]">S</span>
                  <span className="text-[#129CD5]">O</span>
                  <span className="text-[#129CD5]">L</span>
                  <span className="text-[#188C7C]">A</span>
                  <span className="text-[#C7652A]">C</span>
                  <span className="text-[#74345E]">E</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#887868] text-sm sm:text-lg leading-tight">Digital Demo AI & Civic Security</span>
                </div>
              </div>
              <span className="text-[9px] sm:text-[10px] text-[#A69B8F] uppercase tracking-widest mt-0.5 font-semibold">
                Stories of Local Active Citizen Engagement • Luxembourg
              </span>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                let activeStyle = '';
                if (isActive) {
                  switch(item.id) {
                    case 'laptop-sim': activeStyle = 'bg-[#E3232C]/10 text-[#E3232C] border-[#E3232C]'; break;
                    case 'mobile-sim': activeStyle = 'bg-[#129CD5]/10 text-[#129CD5] border-[#129CD5]'; break;
                    case 'ai-audit': activeStyle = 'bg-[#188C7C]/10 text-[#188C7C] border-[#188C7C]'; break;
                    case 'democracy-vote': activeStyle = 'bg-[#C7652A]/10 text-[#C7652A] border-[#C7652A]'; break;
                    case 'host-toolkit': activeStyle = 'bg-[#74345E]/10 text-[#74345E] border-[#74345E]'; break;
                  }
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (item.id === 'laptop-sim') {
                        resetLaptopSim();
                      }
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all transition-colors duration-200 cursor-pointer ${
                      isActive 
                        ? `${activeStyle} shadow-xs` 
                        : `border-transparent text-[#887868] hover:bg-[#FAF7EE] ${item.color}`
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {onGoHome && !isHomepage && (
          <div className="w-full mb-6 flex justify-start">
            <button
              id="back-to-home-bar-btn"
              onClick={onGoHome}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-[#E8E1D5] text-[#887868] hover:border-[#188C7C] hover:text-[#188C7C] text-xs sm:text-sm font-extrabold uppercase tracking-widest rounded-xl shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group shrink-0"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-200 inline-block font-mono text-base">←</span>
              <span>🏠 BACK TO HOMEPAGE (SELECT PROFILE)</span>
            </button>
          </div>
        )}
        {children}
      </main>
      
      <footer className="bg-[#4A4036] py-10 text-center text-[#E8E1D5] text-sm mt-auto border-t-6 border-[#188C7C]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
          <div className="max-w-2xl mx-auto leading-relaxed text-[#D2C8BC] space-y-2">
            <p>
              <strong>SOLACE asbl (Luxembourg) Civic Protection Initiative.</strong> Our interactive platform simulates real digital and security scenarios. Since we strictly respect EU GDPR, this framework utilizes 100% client-side memory. absolutely no data is logged, shared, or sent back of your device.
            </p>
            <p className="text-xs text-[#A69B8F]">
              Workshop Facilitation Tool • Compatible across Laptops, Tablets, and Mobile screens. Take mistakes safely.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-2">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#FAF7EE]">
              <span>Made for Luxembourg Diversity</span>
              <div className="flex items-center gap-0.5">
                <span className="w-3.5 h-2 bg-[#E3232C] rounded-xs inline-block" title="Red"></span>
                <span className="w-3.5 h-2 bg-white rounded-xs inline-block" title="White"></span>
                <span className="w-3.5 h-2 bg-[#129CD5] rounded-xs inline-block" title="Blue"></span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
