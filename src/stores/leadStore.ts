import { create } from 'zustand';
import type { Lead } from '@/types/database';

interface LeadState {
  leads: Lead[];
  selectedLead: Lead | null;
  filters: {
    status?: string;
    search?: string;
    userId?: string;
  };
  setLeads: (leads: Lead[]) => void;
  addLead: (lead: Lead) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  setSelectedLead: (lead: Lead | null) => void;
  setFilters: (filters: Partial<LeadState['filters']>) => void;
  clearFilters: () => void;
}

export const useLeadStore = create<LeadState>((set) => ({
  leads: [],
  selectedLead: null,
  filters: {},
  setLeads: (leads) => set({ leads }),
  addLead: (lead) => set((state) => ({ leads: [...state.leads, lead] })),
  updateLead: (id, updates) =>
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === id ? { ...lead, ...updates } : lead
      ),
      selectedLead:
        state.selectedLead?.id === id
          ? { ...state.selectedLead, ...updates }
          : state.selectedLead,
    })),
  deleteLead: (id) =>
    set((state) => ({
      leads: state.leads.filter((lead) => lead.id !== id),
      selectedLead:
        state.selectedLead?.id === id ? null : state.selectedLead,
    })),
  setSelectedLead: (lead) => set({ selectedLead: lead }),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  clearFilters: () => set({ filters: {} }),
}));
