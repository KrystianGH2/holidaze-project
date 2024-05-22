import { create } from 'zustand'

 export const useStore = create((set) => ({
  currentPage: 1,
  limit: 25,
  currentGuests: 2,
  isOpen: false,
  isModalOpen:false,


  setCurrentPage: (page) => set({ currentPage: page }),
  increasePage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
  decreasePage: () => set((state) => ({ currentPage: state.currentPage - 1 })),
  setCurrentGuests: (guests) => set({ currentGuests: guests }),
  increaseGuests: () => set((state) => ({ currentGuests: state.currentGuests + 1 })),
  decreaseGuests: () => set((state) => ({ currentGuests: state.currentGuests - 1 })),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  toggleModalOpen: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}))