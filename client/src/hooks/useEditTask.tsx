import { useState } from 'react';
import { ITask } from '../types/task';

export const useEditTask = (editTaskFn: (id: string, data: Partial<ITask>) => Promise<boolean>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState<ITask | null>(null);

  const openEdit = (taskToEdit: ITask) => {
    setTask(taskToEdit);
    setIsOpen(true);
  };

  const closeEdit = () => {
    setIsOpen(false);
    setTask(null);
  };

  const saveEdit = async (updatedData: Partial<ITask>) => {
    if (task?._id) {
      const success = await editTaskFn(task._id, updatedData);
      if (success) closeEdit();
      return success;
    }
    return false;
  };

  return { isOpen, task, openEdit, closeEdit, saveEdit };
};