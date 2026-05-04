// src/hooks/useTasks.ts
import { useState, useEffect, useCallback } from 'react';
import { ITask } from '../types/task';
import * as api from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async (search: string = '') => {
  try {
    setLoading(true);
    setError(null);
    const response = await api.getTasks(search);
    const tasksData = response.data.data?.tasks || [];
    setTasks(tasksData);
    
  } catch (err: any) {
    console.error('useTasks: fetch error', err);
    setError(err.response?.data?.message || err.message || 'שגיאה בטעינת נתונים');
  } finally {
    setLoading(false);
  }
}, []);

  const removeTask = async (id: string) => {
    try {
      await api.deleteTask(id);
      await fetchTasks();
      return true;
    } catch (err) {
      console.error('useTasks: delete error', err);
      setError('המחיקה נכשלה');
      return false;
    }
  };

  const editTask = async (id: string, data: Partial<ITask>) => {
    try {
      await api.updateTask(id, data);
      await fetchTasks();
      return true;
    } catch (err) {
      console.error('useTasks: update error', err);
      setError('העדכון נכשל');
      return false;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    refresh: fetchTasks,
    removeTask,
    editTask,
  };
};
