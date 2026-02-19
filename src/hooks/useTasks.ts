'use client';

import { useMemo } from 'react';
import { useSupabaseQuery } from './useSupabaseQuery';
import type { Task } from '@/types/database';
import { useTaskStore } from '@/stores/taskStore';

export function useTasks() {
  const { data: tasks, loading, error, fetchData, insert, update, remove } = useSupabaseQuery<Task>('tasks', {
    immediate: true,
  });

  const { filters, getTasksByStatus } = useTaskStore();

  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (filters.status) {
      result = result.filter((task) => task.status === filters.status);
    }

    if (filters.priority) {
      result = result.filter((task) => task.priority === filters.priority);
    }

    if (filters.assignedTo) {
      result = result.filter((task) => task.assigned_to_user_id === filters.assignedTo);
    }

    return result;
  }, [tasks, filters]);

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    loading,
    error,
    fetchData,
    insert,
    update,
    remove,
    getTasksByStatus,
  };
}
