// src/services/api.ts
import axios from 'axios';
import { ITask } from '../types/task';

const API_URL = 'http://localhost:5000/api/tasks';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export const getTasks = (name: string = '', date?: string) => {
  const query = name ? `?name=${encodeURIComponent(name)}` : '';
  return axiosInstance.get<{ 
    status: string; 
    results: number; 
    totalTasks: number; 
    data: { tasks: ITask[] } 
  }>(`/${query}`); 
};

export const createTask = (task: ITask) => {
  return axiosInstance.post<ITask>(``, task);
};

export const updateTask = (id: string, task: Partial<ITask>) => {
  return axiosInstance.put<ITask>(`/${id}`, task);
};

export const deleteTask = (id: string) => {
  return axiosInstance.delete<{ message: string }>(`/${id}`);
};
