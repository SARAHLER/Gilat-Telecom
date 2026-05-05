import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, MenuItem, DialogActions, Box } from '@mui/material';
import { createTask } from '../services/api';
import { useSnackbar } from 'notistack';
import { ITask } from '../types/task';
// @ts-ignore
import './AddTaskDialog.css';

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
const handleClose = () => {
  setOpen(false);
  setNewTask({ title: '', description: '', status: 'Pending' });
};
  return (
    <>
    <Box  className="add-task-button">
      <Button variant="contained" onClick={() => setOpen(true)} >
        הוסף משימה חדשה
      </Button>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" dir="rtl">
        <DialogTitle>הוסף משימה חדשה</DialogTitle>
<DialogContent dividers className="rtl-dialog-content">
            <TextField
            autoFocus
            margin="normal"
            label="כותרת"
            fullWidth
            variant="outlined"
            dir="rtl"
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
            dir="rtl"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value as ITask['status'] })}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={handleClose} color="inherit">ביטול</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">שמור משימה</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTaskDialog;