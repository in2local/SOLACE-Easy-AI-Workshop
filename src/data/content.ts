import { AgeGroup, Scenario } from './types';
import { explorers } from './explorers';
import { digitalCitizens } from './digitalCitizens';
import { professionals } from './professionals';
import { seniors } from './seniors';

export * from './types';

export const SCENARIOS: Record<AgeGroup, Scenario[]> = {
  'explorers': explorers,
  'digital-citizens': digitalCitizens,
  'professionals': professionals,
  'seniors': seniors,
};
