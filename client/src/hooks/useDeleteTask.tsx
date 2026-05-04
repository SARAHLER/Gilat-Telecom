import React, { useState } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, Typography 
} from '@mui/material';

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

  const handleConfirm = async () => {
    if (!idToDelete) return;
    
    setIsLoading(true);
    const success = await removeTaskFn(idToDelete);
    setIsLoading(false);
    
    if (success) {
      closeDeleteConfirm();
    }
  };

  const DeleteDialog = () => (
    <Dialog open={isOpen} onClose={closeDeleteConfirm}>
      <DialogTitle>אישור מחיקה</DialogTitle>
      <DialogContent dividers>
        <Typography>האם ברצונך למחוק את המשימה? פעולה זו אינה ניתנת לביטול.</Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={closeDeleteConfirm} color="inherit" disabled={isLoading}>
          ביטול
        </Button>
        <Button 
          onClick={handleConfirm} 
          variant="contained" 
          color="error" 
          disabled={isLoading}
          autoFocus
        >
          {isLoading ? 'מוחק...' : 'מחק'}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return {
    openDeleteConfirm,
    DeleteDialog 
  };
};