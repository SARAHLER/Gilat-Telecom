import { useState } from 'react';
import { ITask } from '../types/task';

/**
 * Custom hook to manage the task editing state and flow.
 * Handles the visibility of the edit dialog, stores the currently edited task,
 * and executes the update operation through the provided API function.
 */
export const useEditTask = (
  editTaskFn: (id: string, data: Partial<ITask>) => Promise<boolean>
) => {
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
    if (!task?._id) return false;
    const success = await editTaskFn(task._id, updatedData);
    if (success) closeEdit();
    return success;
  };

  return { isOpen, task, openEdit, closeEdit, saveEdit };
};
