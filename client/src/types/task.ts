// src/types/task.ts
export interface ITask {
  _id?: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  createdAt?: string;
}
