import { useState, useEffect, useCallback } from 'react';
import { ITask } from '../types/task';
import * as api from '../services/api';

/**
 * Custom hook to manage the lifecycle of fetching, filtering, and updating tasks.
 * Handles loading and error states, implements search debouncing, 
 * and provides methods for refreshing, removing, and editing tasks.
 */
export const useTasks = (searchTerm: string = '') => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async (search: string = '') => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getTasks(search);
      setTasks(response.data.data?.tasks || []);
    } catch (err: any) {
      console.error('useTasks: fetch error', err);
      setError(err.response?.data?.message || err.message || 'שגיאה בטעינת נתונים');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const delay = searchTerm === '' ? 0 : 400;
    const timer = setTimeout(() => {
      fetchTasks(searchTerm);
    }, delay);
    return () => clearTimeout(timer);
  }, [searchTerm, fetchTasks]);

  const refresh = useCallback(() => fetchTasks(searchTerm), [fetchTasks, searchTerm]);

  const removeTask = async (id: string) => {
    try {
      await api.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      return true;
    } catch (err) {
      console.error('useTasks: delete error', err);
      setError('המחיקה נכשלה');
      return false;
    }
  };

  const editTask = async (id: string, data: Partial<ITask>) => {
    try {
      const response = await api.updateTask(id, data);
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, ...data, ...response.data } : t))
      );
      return true;
    } catch (err) {
      console.error('useTasks: update error', err);
      setError('העדכון נכשל');
      return false;
    }
  };

  return {
    tasks,
    loading,
    error,
    refresh,
    removeTask,
    editTask,
  };
};
