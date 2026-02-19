import { create } from 'zustand';
import type { Lead, Property, Interaction } from '@/types/database';

interface DashboardMetrics {
  totalLeads: number;
  activeLeads: number;
  totalProperties: number;
  activeProperties: number;
  upcomingShowings: number;
  pendingTasks: number;
  revenuePipeline: number;
  conversionRate: number;
}

interface DashboardState {
  metrics: DashboardMetrics;
  recentActivity: Interaction[];
  topLeads: Lead[];
  loading: boolean;
  setMetrics: (metrics: DashboardMetrics) => void;
  setRecentActivity: (activity: Interaction[]) => void;
  setTopLeads: (leads: Lead[]) => void;
  setLoading: (loading: boolean) => void;
  refreshDashboard: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  metrics: {
    totalLeads: 0,
    activeLeads: 0,
    totalProperties: 0,
    activeProperties: 0,
    upcomingShowings: 0,
    pendingTasks: 0,
    revenuePipeline: 0,
    conversionRate: 0,
  },
  recentActivity: [],
  topLeads: [],
  loading: false,
  setMetrics: (metrics) => set({ metrics }),
  setRecentActivity: (activity) => set({ recentActivity: activity }),
  setTopLeads: (leads) => set({ topLeads: leads }),
  setLoading: (loading) => set({ loading }),
  refreshDashboard: async () => {
    set({ loading: true });
    // TODO: Implement dashboard data fetching
    set({ loading: false });
  },
}));
