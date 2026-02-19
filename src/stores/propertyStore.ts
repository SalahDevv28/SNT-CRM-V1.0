import { create } from 'zustand';
import type { Property } from '@/types/database';

interface PropertyState {
  properties: Property[];
  selectedProperty: Property | null;
  filters: {
    status?: string;
    type?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  };
  setProperties: (properties: Property[]) => void;
  addProperty: (property: Property) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  setSelectedProperty: (property: Property | null) => void;
  setFilters: (filters: Partial<PropertyState['filters']>) => void;
  clearFilters: () => void;
}

export const usePropertyStore = create<PropertyState>((set) => ({
  properties: [],
  selectedProperty: null,
  filters: {},
  setProperties: (properties) => set({ properties }),
  addProperty: (property) => set((state) => ({ properties: [...state.properties, property] })),
  updateProperty: (id, updates) =>
    set((state) => ({
      properties: state.properties.map((prop) =>
        prop.id === id ? { ...prop, ...updates } : prop
      ),
      selectedProperty:
        state.selectedProperty?.id === id
          ? { ...state.selectedProperty, ...updates }
          : state.selectedProperty,
    })),
  deleteProperty: (id) =>
    set((state) => ({
      properties: state.properties.filter((prop) => prop.id !== id),
      selectedProperty:
        state.selectedProperty?.id === id ? null : state.selectedProperty,
    })),
  setSelectedProperty: (property) => set({ selectedProperty: property }),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  clearFilters: () => set({ filters: {} }),
}));
