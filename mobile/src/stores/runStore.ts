import { create } from 'zustand';

interface Run {
  id: string;
  userId: string;
  uploadTime: string;
  processingStatus: string;
  [key: string]: any;
}

interface RunStore {
  runs: Run[];
  currentRun: Run | null;
  setRuns: (runs: Run[]) => void;
  setCurrentRun: (run: Run | null) => void;
  addRun: (run: Run) => void;
  updateRun: (runId: string, updates: Partial<Run>) => void;
}

export const useRunStore = create<RunStore>((set) => ({
  runs: [],
  currentRun: null,
  setRuns: (runs) => set({ runs }),
  setCurrentRun: (run) => set({ currentRun: run }),
  addRun: (run) => set((state) => ({ runs: [run, ...state.runs] })),
  updateRun: (runId, updates) =>
    set((state) => ({
      runs: state.runs.map((r) => (r.id === runId ? { ...r, ...updates } : r)),
      currentRun:
        state.currentRun?.id === runId
          ? { ...state.currentRun, ...updates }
          : state.currentRun,
    })),
}));
