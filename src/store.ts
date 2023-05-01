import { create } from "zustand";
import { persist } from "zustand/middleware";

interface QueryState {
  queries: { queryMessage: string; queryOutput: string }[];
  setQueries: (queryMessage: string, queryOutput: string) => void;
  clearQueries: () => void;
  selectedQuery: number;
  setSelectedQuery: (idx: number) => void;
}

export const useQueryStore = create<QueryState>()(
  persist(
    (set) => ({
      queries: [],
      setQueries: (queryMessage, queryOutput) =>
        set((state) => ({
          queries: [...state.queries, { queryMessage, queryOutput }],
        })),
      clearQueries: () => set({ queries: [] }),
      selectedQuery: -1,
      setSelectedQuery: (idx) => set({ selectedQuery: idx }),
    }),
    {
      name: "query-storage",
    }
  )
);
