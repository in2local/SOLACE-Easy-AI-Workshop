export type AgeGroup = 'explorers' | 'digital-citizens' | 'professionals' | 'seniors';

export interface ScenarioOption {
  id: string;
  text: string;
  isSafe: boolean;
  feedback: string;
  suggestion?: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  type: 'phishing' | 'data-leak' | 'deepfake' | 'safe-prompt' | 'misinformation' | 'ai-usage';
  content: string;
  options: ScenarioOption[];
}
