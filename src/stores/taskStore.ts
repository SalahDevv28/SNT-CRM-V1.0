import { create } from 'zustand';
import type { Task } from '@/types/database';

interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
  filters: {
    status?: string;
    priority?: string;
    assignedTo?: string;
    dueDate?: string;
  };
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setSelectedTask: (task: Task | null) => void;
  setFilters: (filters: Partial<TaskState['filters']>) => void;
  clearFilters: () => void;
  getTasksByStatus: (status: string) => Task[];
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  selectedTask: null,
  filters: {},
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
      selectedTask:
        state.selectedTask?.id === id
          ? { ...state.selectedTask, ...updates }
          : state.selectedTask,
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
      selectedTask:
        state.selectedTask?.id === id ? null : state.selectedTask,
    })),
  setSelectedTask: (task) => set({ selectedTask: task }),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  clearFilters: () => set({ filters: {} }),
  getTasksByStatus: (status) => get().tasks.filter((task) => task.status === status),
}));
