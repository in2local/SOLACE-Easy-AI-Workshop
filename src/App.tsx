import { useState, useCallback } from 'react';
import Layout, { AppTab } from './components/Layout';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Simulation from './components/Simulation';
import MobileSimulator from './components/MobileSimulator';
import AISafetyAuditor from './components/AISafetyAuditor';
import PrivacyInsights from './components/PrivacyInsights';
import { AgeGroup } from './data/content';

export type LaptopViewState = 'group-select' | 'dashboard' | 'simulation';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('laptop-sim');
  
  // States specific to the Laptop Simulator view
  const [laptopView, setLaptopView] = useState<LaptopViewState>('group-select');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});

  const handleSelectAgeGroup = (group: AgeGroup) => {
    setSelectedAgeGroup(group);
    setLaptopView('dashboard');
  };

  const resetLaptopSim = () => {
    setLaptopView('group-select');
    setSelectedAgeGroup(null);
  };

  const handleCompleteLaptopSim = useCallback((score: number) => {
    if (selectedAgeGroup) {
      setScores(s => {
        const current = s[selectedAgeGroup] || 0;
        if (score <= current) return s;
        return { ...s, [selectedAgeGroup]: score };
      });
    }
  }, [selectedAgeGroup]);

  const handleGoHome = useCallback(() => {
    setActiveTab('laptop-sim');
    resetLaptopSim();
  }, []);

  const isHomepage = activeTab === 'laptop-sim' && laptopView === 'group-select';

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      resetLaptopSim={resetLaptopSim}
      isHomepage={isHomepage}
      onGoHome={handleGoHome}
    >
      {/* 1. Core Laptop Multi-Generational Simulator */}
      {activeTab === 'laptop-sim' && (
        <>
          {laptopView === 'group-select' && (
            <Landing onSelectAge={handleSelectAgeGroup} />
          )}
          {laptopView === 'dashboard' && selectedAgeGroup && (
            <Dashboard 
              ageGroup={selectedAgeGroup} 
              score={scores[selectedAgeGroup] || 0} 
              onStartSimulation={() => setLaptopView('simulation')}
              onReset={resetLaptopSim}
            />
          )}
          {laptopView === 'simulation' && selectedAgeGroup && (
            <Simulation 
              ageGroup={selectedAgeGroup} 
              onBack={() => setLaptopView('dashboard')} 
              onComplete={handleCompleteLaptopSim} 
            />
          )}
        </>
      )}

      {/* 2. Interactive Mobile Simulator Device */}
      {activeTab === 'mobile-sim' && (
        <MobileSimulator />
      )}

      {/* 3. Diagnostic AI Safety Auditor */}
      {activeTab === 'ai-audit' && (
        <AISafetyAuditor />
      )}

      {/* 5. Privacy Insights Compliance Tab */}
      {activeTab === 'privacy-insights' && (
        <PrivacyInsights />
      )}
    </Layout>
  );
}
