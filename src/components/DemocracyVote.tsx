import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Vote, ThumbsUp, Calendar, Heart, Share2, Info, Users, Sparkles, CheckCircle2 } from 'lucide-react';

interface NameCandidate {
  id: string;
  name: string;
  translation: string;
  focus: string;
  initialVotes: number;
}

export default function DemocracyVote() {
  const [candidates, setCandidates] = useState<NameCandidate[]>([
    {
      id: 'name-1',
      name: 'SOLACE Digital Demo AI Workshop',
      translation: 'Official suggestion',
      focus: 'Workshop, direct simulation, friendly local engagement',
      initialVotes: 52
    },
    {
      id: 'name-2',
      name: 'Civic AI & CyberShield Luxembourg',
      translation: 'Zivile AI & Cyberschëld Lëtzebuerg',
      focus: 'High-contrast security protection, civil rights tracking',
      initialVotes: 44
    },
    {
      id: 'name-3',
      name: 'ZensDemokratech',
      translation: 'Citizen Demo-tech',
      focus: 'Combining citizen democracy and advanced digital technology',
      initialVotes: 29
    },
    {
      id: 'name-4',
      name: 'Séchert Liewen & AI',
      translation: 'Secure Life and AI',
      focus: 'Warm, approachable, Luxembourgish direct phrasing',
      initialVotes: 18
    },
    {
      id: 'name-5',
      name: 'SOLACE CyberDemocracy Hub',
      translation: 'Civic engagement network',
      focus: 'Strong focus on active political debate and deep fakes prevention',
      initialVotes: 36
    }
  ]);

  const [userVotedId, setUserVotedId] = useState<string | null>(null);
  const [totalWorkshopVotes, setTotalWorkshopVotes] = useState(179);

  const handleVote = (candidateId: string) => {
    if (userVotedId) return;
    setUserVotedId(candidateId);
    setCandidates((prev) => 
      prev.map((c) => {
        if (c.id === candidateId) {
          return { ...c, initialVotes: c.initialVotes + 1 };
        }
        return c;
      })
    );
    setTotalWorkshopVotes((v) => v + 1);
  };

  return (
    <div className="flex-1 flex flex-col items-center py-6 max-w-4xl mx-auto w-full">
      {/* Platform naming header */}
      <div className="text-center mb-10">
        <span className="inline-block py-1.5 px-4 rounded-full bg-[#C7652A]/10 text-[#C7652A] font-bold text-xs uppercase tracking-widest mb-4 shadow-xs border border-[#C7652A]/20">
          🗳️ LUXEMBOURG CIVIC ENGAGEMENT BALLOT
        </span>
        <h2 className="text-3.5xl font-extrabold text-[#4A4036] tracking-tight mb-2 leading-tight">
          Vote on Your Platform Name
        </h2>
        <p className="text-[#887868] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Part of digital democracy is active, collaborative participation! Cast your ballot below for the name that makes the biggest splash in your commune or workshop group.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Ballot list to click and vote */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-[#E8E1D5] shadow-xs">
            <h3 className="font-extrabold text-[#4A4036] text-sm uppercase tracking-wider mb-4 pb-2 border-b">
              OFFICIAL BALLOT PRESET LIST:
            </h3>

            <div className="space-y-3">
              {candidates.map((cand) => {
                const hasVotedThis = userVotedId === cand.id;
                return (
                  <button
                    key={cand.id}
                    disabled={userVotedId !== null}
                    onClick={() => handleVote(cand.id)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex flex-col gap-1 relative overflow-hidden cursor-pointer ${
                      hasVotedThis 
                        ? 'border-[#C7652A] bg-[#C7652A]/5' 
                        : userVotedId !== null 
                        ? 'border-[#E8E1D5]/40 opacity-55' 
                        : 'border-[#E8E1D5] hover:border-[#C7652A] bg-white group hover:shadow-xs'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full gap-2">
                      <span className="font-bold text-sm sm:text-base text-[#4A4036] leading-tight">{cand.name}</span>
                      {hasVotedThis && (
                        <span className="bg-[#C7652A] text-white text-[9px] px-2.5 py-1 rounded-full uppercase font-bold tracking-widest shrink-0 animate-pulse">
                          Your Vote Cast
                        </span>
                      )}
                    </div>
                    
                    <span className="text-[11px] font-mono text-gray-500 italic">
                      {cand.translation}
                    </span>
                    <span className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                      <strong>Focus:</strong> {cand.focus}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic scoreboard tracking */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#4A4036] text-white p-6 rounded-3xl border border-[#584D42] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C7652A]/10 rounded-bl-full"></div>
            
            <h3 className="text-lg font-bold mb-1">Live Workshop Standings</h3>
            <span className="text-[10px] text-[#A69B8F] uppercase tracking-widest font-semibold block mb-4">Total Votes: {totalWorkshopVotes}</span>

            {/* Voting Bar charts */}
            <div className="space-y-4">
              {candidates.map((cand) => {
                const percentage = Math.round((cand.initialVotes / totalWorkshopVotes) * 100);
                const hasVotedThis = userVotedId === cand.id;
                
                return (
                  <div key={cand.id} className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className={`truncate w-44 ${hasVotedThis ? 'text-[#C7652A] font-bold' : 'text-gray-200'}`}>
                        {cand.name}
                      </span>
                      <span className="text-[#FAF7EE] text-[11px] font-mono shrink-0">{cand.initialVotes} votes ({percentage}%)</span>
                    </div>
                    
                    <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.6 }}
                        className={`h-full rounded-full ${hasVotedThis ? 'bg-[#C7652A]' : 'bg-[#129CD5]'}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {userVotedId ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 bg-white/5 border border-white/10 p-3.5 rounded-xl text-center flex flex-col items-center gap-1.5"
              >
                <CheckCircle2 className="w-5 h-5 text-[#188C7C]" />
                <p className="text-xs text-[#FAF7EE] font-bold">Democratic choice registered securely.</p>
                <p className="text-[10px] text-gray-300">Your selection represents the optimal match of cybersecurity with citizen engagement.</p>
              </motion.div>
            ) : (
              <div className="mt-6 text-[10px] text-gray-300 italic text-center p-3 border border-white/10 rounded-xl leading-relaxed">
                🚨 Click of check options in the left ballot card to cast your vote live in our simulated workshop booth!
              </div>
            )}
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8E1D5] text-xs text-[#887868] flex gap-3 shadow-xs font-medium">
            <Info className="w-5 h-5 text-[#C7652A] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Naming matters in Luxembourg! Friendly titles containing words like <strong>Demokratie, Sécherheet, and AI</strong> resonate across communal community workshops. Vote to confirm your preference.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
