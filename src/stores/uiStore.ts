import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  modals: {
    [key: string]: boolean;
  };
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleModal: (modalName: string) => void;
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
  closeAllModals: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      theme: 'light',
      modals: {},
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleModal: (modalName) =>
        set((state) => ({
          modals: {
            ...state.modals,
            [modalName]: !state.modals[modalName],
          },
        })),
      openModal: (modalName) =>
        set((state) => ({
          modals: {
            ...state.modals,
            [modalName]: true,
          },
        })),
      closeModal: (modalName) =>
        set((state) => ({
          modals: {
            ...state.modals,
            [modalName]: false,
          },
        })),
      closeAllModals: () => set({ modals: {} }),
    }),
    {
      name: 'ui-storage',
    }
  )
);
