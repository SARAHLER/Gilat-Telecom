import React, { useState } from 'react';
import { ITask } from '../types/task';
import EditTaskDialog from './EditTaskDialog'; // ייבוא הקומפוננטה שיצרת

export const useEditTask = (editTaskFn: (id: string, data: Partial<ITask>) => Promise<boolean>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState<ITask | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openEdit = (taskToEdit: ITask) => {
    setTask(taskToEdit);
    setIsOpen(true);
  };

  const closeEdit = () => {
    setIsOpen(false);
    setTask(null);
  };

  const handleSave = async (updatedData: Partial<ITask>) => {
    if (!task?._id) return;

    setIsLoading(true);
    const success = await editTaskFn(task._id, updatedData);
    setIsLoading(false);

    if (success) {
      closeEdit();
    }
  };

  // מחזירים פונקציה שמייצרת את הדיאלוג כדי לשמור על עקביות עם useDeleteTask
  const EditDialog = () => (
    <EditTaskDialog
      open={isOpen}
      task={task}
      onClose={closeEdit}
      onSave={handleSave}
      isLoading={isLoading} // הוספתי תמיכה במצב טעינה
    />
  );

  return {
    openEdit,
    EditDialog
  };
};