import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';

/**
 * Confirmation dialog for task deletion.
 * Ensures users don't delete tasks accidentally and manages the deletion loading state.
 */
interface Props {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>; 
}

const DeleteTaskDialog: React.FC<Props> = ({ open, isLoading, onClose, onConfirm }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleConfirm = async () => {
    try {
      await onConfirm();
      enqueueSnackbar('המשימה נמחקה בהצלחה', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('חלה שגיאה בעת מחיקת המשימה', { variant: 'error' });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} dir="rtl">
      <DialogTitle>אישור מחיקה</DialogTitle>
      <DialogContent dividers>
        <Typography>האם ברצונך למחוק את המשימה? פעולה זו אינה ניתנת לביטול.</Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit" disabled={isLoading}>
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
};

export default DeleteTaskDialog;