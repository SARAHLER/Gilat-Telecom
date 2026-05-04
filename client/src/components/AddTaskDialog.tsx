import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, MenuItem, DialogActions } from '@mui/material';
import { createTask } from '../services/api';
import { useSnackbar } from 'notistack';
import { ITask } from '../types/task';

interface Props {
  onTaskAdded: () => void;
}

const AddTaskDialog: React.FC<Props> = ({ onTaskAdded }) => {
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'Pending' as ITask['status'] });
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    if (!newTask.title.trim()) {
      enqueueSnackbar('חובה להזין כותרת', { variant: 'warning' });
      return;
    }
    try {
      await createTask(newTask);
      setNewTask({ title: '', description: '', status: 'Pending' });
      setOpen(false);
      onTaskAdded();
      enqueueSnackbar('המשימה נוצרה בהצלחה', { variant: 'success' });
    } catch (error: any) {
      console.error('Create error:', error);
      enqueueSnackbar(error.response?.data?.message || 'חלה שגיאה בעת הוספת משימה', { variant: 'error' });
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mt: 2 }}>
        הוסף משימה חדשה
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>הוסף משימה חדשה</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="normal"
            label="כותרת"
            fullWidth
            variant="outlined"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <TextField
            margin="normal"
            label="תיאור"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <TextField
            margin="normal"
            label="סטטוס"
            select
            fullWidth
            variant="outlined"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value as ITask['status'] })}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)} color="inherit">ביטול</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">שמור משימה</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTaskDialog;