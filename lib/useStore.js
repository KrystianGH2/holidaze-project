import { create } from 'zustand'

 export const useStore = create((set) => ({
  currentPage: 1,
  limit: 25,
  setCurrentPage: (page) => set({ currentPage: page }),
  increasePage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
  decreasePage: () => set((state) => ({ currentPage: state.currentPage - 1 })),
}))