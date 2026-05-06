
/**
 * Interface representing a task entity.
 */
export interface ITask {
  _id?: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  createdAt?: string;
}

export type CreateTaskDto = Omit<ITask, '_id'>;
