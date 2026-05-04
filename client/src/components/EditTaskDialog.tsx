import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { ITask } from '../types/task';

interface Props {
  open: boolean;
  task: ITask | null;
  onClose: () => void;
  onSave: (data: Partial<ITask>) => void;
}

const EditTaskDialog: React.FC<Props> = ({ open, task, onClose, onSave }) => {
  const [formData, setFormData] = useState({ title: '', description: '' });

  useEffect(() => {
    if (task) {
      setFormData({ title: task.title, description: task.description });
    }
  }, [task]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>ערוך משימה</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense" label="כותרת" fullWidth
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <TextField
          margin="dense" label="תיאור" fullWidth multiline rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ביטול</Button>
        <Button onClick={() => onSave(formData)} variant="contained">שמור</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;