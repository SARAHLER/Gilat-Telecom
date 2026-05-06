import axios from 'axios';
import { ITask, CreateTaskDto } from '../types/task';

/**
 * API service module using Axios.
 * Handles HTTP requests for task operations, including custom instance configuration,
 * interceptors for global error logging, and type-safe request methods.
 */
const API_URL = process.env.API_URL || 'http://localhost:5000/api/tasks';
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

interface GetTasksResponse {
  status: string;
  results: number;
  totalTasks: number;
  data: { tasks: ITask[] };
}

export const getTasks = (name: string = '') => {
  const query = name ? `?name=${encodeURIComponent(name)}` : '';
  return axiosInstance.get<GetTasksResponse>(`/${query}`);
};

export const createTask = (task: CreateTaskDto) => {
  return axiosInstance.post<ITask>('', task);
};

export const updateTask = (id: string, task: Partial<ITask>) => {
  return axiosInstance.put<ITask>(`/${id}`, task);
};

export const deleteTask = (id: string) => {
  return axiosInstance.delete<{ message: string }>(`/${id}`);
};
