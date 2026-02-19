'use client';

import { useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase';
import type { PostgrestError } from '@supabase/supabase-js';

interface UseSupabaseQueryOptions<T extends { id: string }> {
  immediate?: boolean;
  transform?: (data: T[]) => T[];
}

export function useSupabaseQuery<T extends { id: string }>(
  tableName: string,
  options: UseSupabaseQueryOptions<T> = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(options.immediate !== false);
  const [error, setError] = useState<PostgrestError | null>(null);

  const fetchData = async (queryBuilder?: any) => {
    try {
      setLoading(true);
      setError(null);

      const supabase = getSupabaseClient();
      let query = supabase.from(tableName).select('*');

      if (queryBuilder) {
        query = queryBuilder(query);
      }

      const { data: result, error } = await query;

      if (error) throw error;

      setData(options.transform ? options.transform(result || []) : (result || []));
    } catch (err) {
      setError(err as PostgrestError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.immediate !== false) {
      fetchData();
    }
  }, [tableName]);

  const refetch = () => fetchData();

  const insert = async (record: Partial<T>) => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from(tableName).insert(record).select().single();
    if (!error && data) {
      setData((prev) => [...prev, data]);
    }
    return { data, error };
  };

  const update = async (id: string, updates: Partial<T>) => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from(tableName)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (!error && data) {
      setData((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
    }
    return { data, error };
  };

  const remove = async (id: string) => {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from(tableName).delete().eq('id', id);
    if (!error) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
    return { error };
  };

  return {
    data,
    loading,
    error,
    fetchData,
    refetch,
    insert,
    update,
    remove,
  };
}

export function useSupabaseRealtime<T extends { id: string }>(
  tableName: string,
  options: UseSupabaseQueryOptions<T> = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(options.immediate !== false);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    if (options.immediate !== false) {
      fetchData();
    }

    const supabase = getSupabaseClient();
    const subscription = supabase
      .channel(`public:${tableName}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: tableName },
        (payload) => {
          setData((current) => {
            switch (payload.eventType) {
              case 'INSERT':
                return [...current, payload.new as T];
              case 'UPDATE':
                return current.map((item) =>
                  item.id === (payload.new as any).id ? { ...item, ...(payload.new as T) } : item
                );
              case 'DELETE':
                return current.filter((item) => item.id !== (payload.old as any).id);
              default:
                return current;
            }
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [tableName]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const supabase = getSupabaseClient();
      const { data: result, error } = await supabase.from(tableName).select('*');

      if (error) throw error;

      setData(options.transform ? options.transform(result || []) : (result || []));
    } catch (err) {
      setError(err as PostgrestError);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchData,
  };
}
