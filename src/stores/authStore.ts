import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/database';

interface AuthState {
  user: User | null;
  session: any | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: any | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      loading: false,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setLoading: (loading) => set({ loading }),
      logout: () => set({ user: null, session: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
