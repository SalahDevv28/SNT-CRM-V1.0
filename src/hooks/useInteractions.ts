'use client';

import { useSupabaseQuery } from './useSupabaseQuery';
import type { Interaction } from '@/types/database';

export function useInteractions() {
  const { data: interactions, loading, error, fetchData, insert, update, remove } = useSupabaseQuery<Interaction>('interactions', {
    immediate: true,
  });

  return {
    interactions,
    loading,
    error,
    fetchData,
    insert,
    update,
    remove,
  };
}
