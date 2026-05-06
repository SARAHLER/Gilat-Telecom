import { useState } from 'react';

/**
 * Custom hook to manage the task deletion process.
 * Handles the confirmation dialog state, tracks the task ID to be deleted, 
 * and manages the asynchronous loading state during the operation.
 */
export const useDeleteTask = (removeTaskFn: (id: string) => Promise<boolean>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openDeleteConfirm = (id: string) => {
    setIdToDelete(id);
    setIsOpen(true);
  };

  const closeDeleteConfirm = () => {
    setIsOpen(false);
    setIdToDelete(null);
  };

  const confirmDelete = async () => {
    if (!idToDelete) return;
    setIsLoading(true);
    const success = await removeTaskFn(idToDelete);
    setIsLoading(false);
    if (success) closeDeleteConfirm();
  };

  return {
    isOpen,
    isLoading,
    openDeleteConfirm,
    closeDeleteConfirm,
    confirmDelete,
  };
};
