import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type EngineType = 'openai' | 'perplexity';

interface AppState {
  wpUrl: string;
  wpUser: string;
  wpAppPassword: string;
  cptSlug: string;
  taxonomySlug: string;
  openaiApiKey: string;
  perplexityApiKey: string;
  activeEngine: EngineType;
  activeModel: string;
  systemPrompt: string;
  setSettings: (settings: Partial<AppState>) => void;
  getAuthHeader: () => string;
}

const DEFAULT_PROMPT = `Du bist ein strenger wissenschaftlicher Ichthyologe (Fischexperte).
Deine Aufgabe: Deep Research Faktencheck.
INPUT DATEN: Du erhältst ein JSON mit "CustomFields".
AUFGABE: Analysiere jeden Wert auf wissenschaftliche Korrektheit.
WICHTIG: Wenn du einen Fehler findest, gib zwingend den exakten Key (Schlüssel) zurück.
FORMAT BEIBEHALTEN: 22-24 °C bleibt 22-24 °C, nicht "bis" schreiben.
Antworte NUR im JSON Format.`;

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      wpUrl: '',
      wpUser: '',
      wpAppPassword: '',
      cptSlug: 'tierfische',
      taxonomySlug: 'kategorie',
      openaiApiKey: '',
      perplexityApiKey: '',
      activeEngine: 'perplexity',
      activeModel: 'sonar-reasoning',
      systemPrompt: DEFAULT_PROMPT,
      setSettings: (settings) => set((state) => ({ ...state, ...settings })),
      getAuthHeader: () => {
        const { wpUser, wpAppPassword } = get();
        return `Basic ${btoa(`${wpUser}:${wpAppPassword}`)}`;
      },
    }),
    { name: 'fish-checker-ultimate' }
  )
);