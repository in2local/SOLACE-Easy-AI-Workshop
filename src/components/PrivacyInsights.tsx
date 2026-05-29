import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Award, 
  ClipboardCheck, 
  Scale, 
  RotateCcw, 
  Sparkles, 
  CheckSquare, 
  ChevronRight, 
  Printer, 
  Users, 
  Share2 
} from 'lucide-react';

interface Technique {
  id: string;
  title: string;
  concept: string;
  gdprArticle: string;
  howPracticed: string;
  badgeColor: string;
  bgHex: string;
}

const SANITIZATION_TECHNIQUES: Technique[] = [
  {
    id: 'pii-stripping',
    title: 'PII (Personally Identifiable Information) Stripping',
    concept: 'Identifying and removing direct identifiers—such as names, addresses, phone numbers, and email accounts—before feeding inputs into large language models.',
    gdprArticle: 'Article 5(1)(c) - Data Minimisation',
    howPracticed: 'Practiced in the Laptop Simulator (Professional View) where you filtered customer rows, and in the AI Safety Auditor where you flagged prompt compliance.',
    badgeColor: 'text-[#188C7C] bg-[#188C7C]/10 border-[#188C7C]/20',
    bgHex: '#188C7C',
  },
  {
    id: 'pseudonymisation',
    title: 'Data Pseudonymisation',
    concept: 'Replacing direct identifiers with coded identifiers (pseudonyms) such as "Client_Alpha" or "Citizen_942" so that the raw text cannot be linked to a person without additional, separately held keys.',
    gdprArticle: 'Article 4(5) & Article 25 - Privacy by Design',
    howPracticed: 'Practiced in the Laptop Simulator scenarios where personal identifiers were processed into generalized category markers.',
    badgeColor: 'text-[#e23f46] bg-[#e23f46]/10 border-[#e23f46]/20',
    bgHex: '#E3232C',
  },
  {
    id: 'secret-redaction',
    title: 'Secret & Token Redaction',
    concept: 'Ensuring passwords, developer API tokens, credit card raw digits, and authorization cookies are redacted from public prompts to block serious backend leaks.',
    gdprArticle: 'Article 32 - Security of Processing',
    howPracticed: 'Practiced in the AI Chat Sandbox and Safety Auditor, where users are reminded never to share API keys or active database login links in public chatbots.',
    badgeColor: 'text-[#129CD5] bg-[#129CD5]/10 border-[#129CD5]/20',
    bgHex: '#129CD5',
  },
  {
    id: 'synthetic-mocking',
    title: 'Synthetic Mock Datasets',
    concept: 'Generating artificial, fully fake records that retain the statistical properties of original corporate sheets, enabling testing and playground audits without violating real-world privacy.',
    gdprArticle: 'Recital 26 - Anonymous Information Exemption',
    howPracticed: 'Utilized across the entire SOLACE mobile and laptop client frames to test responses safely without logging actual private Luxembourgish citizens.',
    badgeColor: 'text-[#C7652A] bg-[#C7652A]/10 border-[#C7652A]/20',
    bgHex: '#C7652A',
  },
  {
    id: 'local-first-processing',
    title: 'Local-First Client Sandbox',
    concept: 'Executing data checks and mock audits entirely inside the client browser’s volatile memory, bypasses storage on background servers entirely.',
    gdprArticle: 'Article 25 - Privacy by Default',
    howPracticed: 'We rely 100% on sandboxed in-browser state, keeping all workshop choices isolated locally inside your device.',
    badgeColor: 'text-[#74345E] bg-[#74345E]/10 border-[#74345E]/20',
    bgHex: '#74345E',
  },
];

export default function PrivacyInsights() {
  // Input playground state
  const defaultPlaygroundInput = "Moien! Im Jean Dupont (CNS: 1983 0505 123) living in Strassen, Luxembourg. Send my contract to jean.dupont@cargolux.lu or call at +352 621 987 654. Let me know!";
  const [inputText, setInputText] = useState(defaultPlaygroundInput);
  const [sanitizedText, setSanitizedText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [hasSanitized, setHasSanitized] = useState(false);

  // Settings configs
  const [sanitizeNames, setSanitizeNames] = useState(true);
  const [sanitizeEmails, setSanitizeEmails] = useState(true);
  const [sanitizePhones, setSanitizePhones] = useState(true);
  const [sanitizeCNS, setSanitizeCNS] = useState(true);

  // Gamified Tracker list
  const [checkedPractices, setCheckedPractices] = useState<Record<string, boolean>>({
    'p1': true, // Finished spreadsheet check
    'p2': false, // Mobile simulator complete
    'p3': false, // Diagnostic Auditor used
    'p4': false, // Chat Sandbox checked
    'p5': false, // Cleaned custom draft in playground
  });

  // Certificate State
  const [userName, setUserName] = useState('');
  const [isCertificateGenerated, setIsCertificateGenerated] = useState(false);

  // Auto-fill playground sanitization on load
  useEffect(() => {
    handleSanitize();
  }, [inputText, sanitizeNames, sanitizeEmails, sanitizePhones, sanitizeCNS]);

  const handleSanitize = () => {
    let result = inputText;

    if (sanitizeEmails) {
      // Basic Email regex finder
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      result = result.replace(emailRegex, '[REDACTED_EMAIL_ADDRESS]');
    }

    if (sanitizePhones) {
      // standard +352 mobile or basic pattern
      const phoneRegex = /(?:\+352|00352)?\s?6[269]1\s?\d{3}\s?\d{3}|\+?\d{1,4}[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}/g;
      result = result.replace(phoneRegex, '[REDACTED_PHONE_NUMBER]');
    }

    if (sanitizeCNS) {
      // CNS matches 13 or 11 digits
      const cnsRegex = /\b\d{4}\s?\d{2}\s?\d{2}\s?\d{3}\b|\b\d{11,13}\b/g;
      result = result.replace(cnsRegex, '[REDACTED_CNS_RECORDS]');
    }

    if (sanitizeNames) {
      // Simple custom replacements for standard names Jean Dupont for teaching demo
      const names = ['Jean Dupont', 'Dupont Jean', 'Jean', 'Dupont'];
      names.forEach(name => {
        const regex = new RegExp(`\\b${name}\\b`, 'gi');
        result = result.replace(regex, '[REDACTED_NAME]');
      });
    }

    setSanitizedText(result);
  };

  const handleResetPlayground = () => {
    setInputText(defaultPlaygroundInput);
    setSanitizeNames(true);
    setSanitizeEmails(true);
    setSanitizePhones(true);
    setSanitizeCNS(true);
    setHasSanitized(false);
  };

  const executeTriggerSanitization = () => {
    handleSanitize();
    setHasSanitized(true);
    setCheckedPractices(p => ({ ...p, 'p5': true }));
  };

  const togglePractice = (id: string) => {
    setCheckedPractices(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalPoints = Object.values(checkedPractices).filter(Boolean).length;
  const maxPoints = Object.keys(checkedPractices).length;
  const progressPercent = Math.round((totalPoints / maxPoints) * 100);

  // Badge classification
  let complianceBadge = { label: 'GDPR Apprentice', color: 'text-amber-700 bg-amber-50 border-amber-200' };
  if (progressPercent >= 50 && progressPercent < 80) {
    complianceBadge = { label: 'Compliance Advocate 🛡️', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
  } else if (progressPercent >= 80) {
    complianceBadge = { label: 'GDPR Data Guardian 🏆', color: 'text-[#188C7C] bg-[#188C7C]/10 border-[#188C7C]/30' };
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 flex flex-col items-center py-6 max-w-5xl mx-auto w-full">
      
      {/* Tab Announcement Banner */}
      <div className="text-center mb-10 w-full animate-fade-in">
        <span className="inline-block py-1.5 px-4 rounded-full bg-[#188C7C]/10 text-[#188C7C] font-bold text-xs uppercase tracking-widest mb-4 shadow-xs border border-[#188C7C]/20">
          🛡️ GDPR COMPLIANCE & PRIVACY HUB
        </span>
        <h2 className="text-3.5xl font-extrabold text-[#4A4036] tracking-tight mb-2 leading-tight">
          Your Privacy Insights Dashboard
        </h2>
        <p className="text-[#887868] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Review the core data sanitization principles you completed during the SOLACE Workshop and test your redaction skills below. Strict privacy starts at the local desktop!
        </p>
      </div>

      {/* Main Grid: Checklist & Metrics left, Sandbox right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full mb-10">
        
        {/* Left Side: Score card and interactive checklist */}
        <div className="lg:col-span-5 space-y-6 flex flex-col">
          
          {/* Progress Card */}
          <div className="bg-white p-6 rounded-3xl border border-[#E8E1D5] shadow-xs flex flex-col">
            <h3 className="font-extrabold text-[#4A4036] text-sm uppercase tracking-wider mb-4 pb-2 border-b flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#188C7C]" /> Compliance Progress
            </h3>

            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-2xl font-black text-[#4A4036]">{progressPercent}%</span>
                <span className="text-xs text-[#887868] block mt-0.5">Workshop Requirements met</span>
              </div>
              <span className={`px-3 py-1.5 rounded-xl text-xs font-extrabold tracking-wide border ${complianceBadge.color}`}>
                {complianceBadge.label}
              </span>
            </div>

            {/* Custom styled progress rail */}
            <div className="w-full bg-[#FAF7EE] h-3.5 rounded-full overflow-hidden border border-[#E8E1D5] mb-6">
              <div 
                className="bg-[#188C7C] h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Micro details */}
            <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
              *By practicing how to mask CNS cards, remove raw corporate files, and replace names, you actively fulfill the strict <strong>minimisation guidelines specified in Article 5 of the EU GDPR</strong>. Keep auditing!
            </p>
          </div>

          {/* Interactive Check-off List */}
          <div className="bg-white p-6 rounded-3xl border border-[#E8E1D5] shadow-xs flex-1">
            <h3 className="font-extrabold text-[#4A4036] text-sm uppercase tracking-wider mb-4 pb-2 border-b flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-[#188C7C]" /> Checklist of Completed Exercises
            </h3>

            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              Mark the scenarios you completed during the group session to update your SOLACE Guardian credentials in real time:
            </p>

            <div className="space-y-3">
              {[
                { id: 'p1', label: 'Filtered raw profiles & analyzed anonymized datasets', source: 'Laptop Simulator (Professional)' },
                { id: 'p2', label: 'Classified public AI usage constraints securely', source: 'Smartphone Simulator' },
                { id: 'p3', label: 'Audited sample diagnostic prompts for PII leaks', source: 'AI Safety Auditor' },
                { id: 'p4', label: 'Submitted safe inquiries within the chat simulator', source: 'AI Chat Sandbox' },
                { id: 'p5', label: 'Successfully test-redacted private variables below', source: 'Sanitization Playground' },
              ].map((item) => (
                <button
                  key={item.id}
                  id={`practice-chk-${item.id}`}
                  onClick={() => togglePractice(item.id)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all duration-150 flex items-start gap-3 cursor-pointer ${
                    checkedPractices[item.id]
                      ? 'bg-[#188C7C]/5 border-[#188C7C]/20 hover:bg-[#188C7C]/10'
                      : 'bg-white border-dashed border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    <CheckSquare 
                      className={`w-4.5 h-4.5 transition-colors ${
                        checkedPractices[item.id] ? 'text-[#188C7C] fill-[#188C7C]/10' : 'text-gray-400'
                      }`} 
                    />
                  </div>
                  <div>
                    <span className={`text-xs font-bold block ${checkedPractices[item.id] ? 'text-[#4A4036]' : 'text-gray-500'}`}>
                      {item.label}
                    </span>
                    <span className="text-[10px] text-[#A69B8F] font-mono tracking-tight mt-0.5 block">{item.source}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Sanitization Playground */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-white p-6 rounded-3xl border border-[#E8E1D5] shadow-xs">
          <div>
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <h3 className="font-extrabold text-[#4A4036] text-sm uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#188C7C]" /> Interactive Sanitization Playground
              </h3>
              <button 
                id="reset-playground-btn"
                onClick={handleResetPlayground} 
                className="text-xs text-gray-400 hover:text-[#188C7C] flex items-center gap-1 font-bold tracking-tight uppercase"
              >
                <RotateCcw className="w-3.5 h-3.5" /> reset demo
              </button>
            </div>

            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              Before submitting any text to public AI endpoints, sanitize your prompt. Check the filters to see how raw local names, CNS card identifiers, and contact details are automatically masked:
            </p>

            {/* Redaction configuration tickboxes */}
            <div className="grid grid-cols-2 gap-3 mb-4 bg-[#FAF7EE] p-3 rounded-2xl border border-[#E8E1D5]">
              <label id="lbl-check-names" className="flex items-center gap-2 cursor-pointer">
                <input 
                  id="chk-sanitize-names"
                  type="checkbox" 
                  checked={sanitizeNames} 
                  onChange={(e) => setSanitizeNames(e.target.checked)} 
                  className="accent-[#188C7C] h-4 w-4"
                />
                <span className="text-[11px] font-bold text-gray-700">Names & Nicknames</span>
              </label>
              <label id="lbl-check-emails" className="flex items-center gap-2 cursor-pointer">
                <input 
                  id="chk-sanitize-emails"
                  type="checkbox" 
                  checked={sanitizeEmails} 
                  onChange={(e) => setSanitizeEmails(e.target.checked)} 
                  className="accent-[#188C7C] h-4 w-4"
                />
                <span className="text-[11px] font-bold text-gray-700">Emails addresses</span>
              </label>
              <label id="lbl-check-phones" className="flex items-center gap-2 cursor-pointer">
                <input 
                  id="chk-sanitize-phones"
                  type="checkbox" 
                  checked={sanitizePhones} 
                  onChange={(e) => setSanitizePhones(e.target.checked)} 
                  className="accent-[#188C7C] h-4 w-4"
                />
                <span className="text-[11px] font-bold text-gray-700">Phone numbers (+352)</span>
              </label>
              <label id="lbl-check-cns" className="flex items-center gap-2 cursor-pointer">
                <input 
                  id="chk-sanitize-cns"
                  type="checkbox" 
                  checked={sanitizeCNS} 
                  onChange={(e) => setSanitizeCNS(e.target.checked)} 
                  className="accent-[#188C7C] h-4 w-4"
                />
                <span className="text-[11px] font-bold text-gray-700">CNS Registration Cards</span>
              </label>
            </div>

            {/* Input area */}
            <div className="mb-4">
              <label className="text-[10px] uppercase font-extrabold tracking-wider text-gray-400 block mb-1.5">Raw Text (with private variables):</label>
              <textarea
                id="playground-raw-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full text-xs font-mono p-3 rounded-2xl bg-white border-2 border-[#E8E1D5] h-28 focus:border-[#188C7C] focus:outline-hidden text-gray-700"
                placeholder="Type any raw query here..."
              />
            </div>

            {/* Output preview */}
            <div>
              <label className="text-[10px] uppercase font-extrabold tracking-wider text-[#188C7C] block mb-1.5">Sanitized Output (Ready for GDPR Safety):</label>
              <div 
                id="playground-sanitized-output"
                className="w-full text-xs font-mono p-3 rounded-2xl bg-[#188C7C]/5 border border-[#188C7C]/30 text-gray-700 min-h-24 whitespace-pre-wrap select-all selection:bg-[#188C7C]/25"
              >
                {sanitizedText || <span className="text-gray-400 italic">Outputs will appear redacted...</span>}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              id="execute-sanitize-btn"
              onClick={executeTriggerSanitization}
              className="flex-1 py-3 px-4 bg-[#188C7C] text-white hover:bg-[#15796b] text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🛡️ Run GDPR Sanitizer</span>
            </button>
            <button
              id="copy-sanitized-btn"
              onClick={() => {
                navigator.clipboard.writeText(sanitizedText);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
              }}
              className="py-3 px-4 bg-white border border-[#E8E1D5] text-[#4A4036] hover:bg-gray-50 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isCopied ? '📋 Copied!' : '📋 Copy Clean Text'}</span>
            </button>
          </div>
          
          <AnimatePresence>
            {hasSanitized && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 p-3 rounded-2xl bg-[#188C7C]/15 border border-[#188C7C]/30 text-xs text-[#188C7C] font-bold flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-[#188C7C] animate-ping" />
                <span>Playground Verified: 100% of Direct Identifiers filtered in memory. Perfect GDPR alignment!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Structured Techniques Showcase List */}
      <div className="w-full mb-10">
        <h3 className="text-xl font-bold text-[#4A4036] mb-6 text-center lg:text-left flex items-center justify-center lg:justify-start gap-2">
          <Lock className="w-5 h-5 text-[#188C7C]" /> 5 Core Sanitization Techniques Practiced
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SANITIZATION_TECHNIQUES.map((tech) => (
            <div 
              key={tech.id} 
              id={`tech-card-${tech.id}`}
              className="bg-white p-5 rounded-3xl border border-[#E8E1D5] hover:border-[#188C7C]/40 transition-all duration-300 shadow-xs hover:shadow-xs flex flex-col justify-between relative group overflow-hidden"
            >
              {/* Colored side ribbon indicator */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 group-hover:w-2"
                style={{ backgroundColor: tech.bgHex }}
              />

              <div className="pl-2">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[9px] border ${tech.badgeColor}`}>
                    {tech.gdprArticle}
                  </span>
                </div>
                
                <h4 className="font-extrabold text-[#4A4036] text-sm group-hover:text-[#188C7C] transition-colors mb-2">
                  {tech.title}
                </h4>
                
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  {tech.concept}
                </p>
              </div>

              <div className="pl-2 mt-auto pt-3 border-t border-dashed border-gray-100 text-[11px] text-gray-600 bg-gray-50/50 p-2.5 rounded-xl border border-gray-100/50">
                <span className="font-bold text-[#4A4036] block mb-0.5">How practiced:</span>
                {tech.howPracticed}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GDPR Workshop Certificate Generation */}
      <div className="bg-white p-8 rounded-3xl border-2 border-dashed border-[#188C7C]/30 w-full animate-fade-in relative overflow-hidden">
        
        <div className="max-w-2xl mx-auto text-center">
          <Award className="w-10 h-10 text-amber-500 mx-auto mb-4" />
          <h3 className="text-2xl font-black text-[#4A4036] mb-2">SOLACE GDPR Workshop Certificate</h3>
          <p className="text-xs text-gray-500 max-w-lg mx-auto mb-6">
            Input your name below to unlock your Attendance and GDPR Sanitization Certificate, ready to export or show your facilitators:
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto mb-8">
            <input 
              id="cert-name-input"
              type="text" 
              placeholder="e.g. Jean-Pierre Ries"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                if (e.target.value.trim() !== '') {
                  setIsCertificateGenerated(true);
                } else {
                  setIsCertificateGenerated(false);
                }
              }}
              className="flex-1 py-3 px-4 font-bold text-center sm:text-left text-sm rounded-xl border-2 border-[#E8E1D5] bg-white focus:border-[#188C7C] focus:outline-hidden text-gray-700 uppercase tracking-wide placeholder-gray-300"
            />
            <button
              id="generate-cert-btn"
              onClick={() => userName.trim() !== '' ? setIsCertificateGenerated(true) : null}
              className="w-full sm:w-auto py-3 px-6 bg-[#188C7C] hover:bg-[#15796b] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-150 cursor-pointer text-center"
            >
              Print / Preview
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Certificate rendering */}
        <AnimatePresence>
          {isCertificateGenerated && userName.trim() !== '' && (
            <motion.div
              id="solace-print-cert-body"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FAF7EE] border-8 border-double border-[#4a392b] p-6 sm:p-10 rounded-2xl w-full max-w-3xl mx-auto select-none shadow-md text-center flex flex-col items-center justify-between font-serif relative"
            >
              {/* Outer classic certification frames */}
              <div className="absolute top-2 left-2 right-2 bottom-2 border border-[#8f7e6e]/40 pointer-events-none" />

              <div className="w-full flex items-center justify-between text-[10px] text-gray-500 font-sans tracking-wide border-b pb-4 mb-6 uppercase">
                <span>Cert. No: SOLACE-2026-{(userName.length * 123 + 456)}</span>
                <span className="font-extrabold text-[#188C7C] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> GDPR Certified
                </span>
                <span>Luxembourg Town hall</span>
              </div>

              <div className="space-y-4">
                <span className="font-sans text-xs uppercase tracking-widest text-[#887868] font-black block">
                  Certificate of Attendance & Mastery
                </span>
                
                <h4 className="text-3xl sm:text-4.5xl font-extrabold text-[#4A4036] tracking-tight leading-none italic capitalize py-4">
                  {userName}
                </h4>

                <p className="text-xs text-gray-600 max-w-xl mx-auto font-sans leading-relaxed">
                  has actively participated in the local <strong>SOLACE Digital Democracy workshop</strong>, demonstrating compliance readiness, spotting synthetic threats, and mastering the 
                  <strong> 5 Core Data Sanitization Techniques</strong> in accordance with General Data Protection Regulation (GDPR) mandates.
                </p>

                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <span className="px-3 py-1 bg-[#188C7C]/10 text-[#188C7C] text-[10px] font-bold rounded-full font-sans border border-[#188C7C]/20 uppercase">
                    ✓ Masked direct identifiers
                  </span>
                  <span className="px-3 py-1 bg-[#129CD5]/10 text-[#129CD5] text-[10px] font-bold rounded-full font-sans border border-[#129CD5]/20 uppercase">
                    ✓ Safe mock-driven datasets
                  </span>
                  <span className="px-3 py-1 bg-[#C7652A]/10 text-[#C7652A] text-[10px] font-bold rounded-full font-sans border border-[#C7652A]/20 uppercase">
                    ✓ Input de-identification
                  </span>
                </div>
              </div>

              {/* Legal verification and signoff */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 items-end mt-10 pt-6 border-t border-dashed border-[#8f7e6e]/30 font-sans">
                
                {/* Left Signature block */}
                <div className="flex flex-col items-center">
                  <div className="italic text-gray-400 text-xs select-none">Luxembourg Civic Board</div>
                  <div className="w-24 h-0.5 bg-[#4A4036] my-1" />
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 font-extrabold">SOLACE asbl Initiative</span>
                </div>

                {/* Right Seal indicator with level details */}
                <div className="flex items-center justify-center gap-3">
                  <div className="p-2 border-2 border-dashed border-amber-500 rounded-full bg-white rotate-6 shrink-0 shadow-sm">
                    <ShieldCheck className="w-7 h-7 text-amber-500" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] uppercase text-gray-400 block font-black">Level Attained</span>
                    <span className="text-xs font-extrabold text-[#4A4036]">{complianceBadge.label}</span>
                  </div>
                </div>

              </div>

              <button
                id="print-cert-trigger-btn"
                onClick={handlePrint}
                className="mt-8 py-2 px-4 bg-[#4A4036] hover:bg-[#5c5044] text-[#FAF7EE] text-[10px] font-extrabold uppercase tracking-wide rounded-lg flex items-center justify-center gap-1.5 transition-colors font-sans cursor-pointer print:hidden shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" /> Print / Save Certificate Layout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
