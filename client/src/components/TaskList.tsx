import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { 
  Grid, Card, CardContent, Typography, CardActions, 
  IconButton, Tooltip, Stack, Chip, CircularProgress, Box, Snackbar, Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTasks } from '../hooks/useTasks';
import { useEditTask } from '../hooks/useEditTask';
import EditTaskDialog from './EditTaskDialog';
import { useDeleteTask } from '../hooks/useDeleteTask';


const TaskList = forwardRef((props: any, ref) => {
  const { searchTerm } = props;
  const { tasks, loading, error, refresh, removeTask, editTask } = useTasks();
  const { openDeleteConfirm, DeleteDialog } = useDeleteTask(removeTask);
  const { isOpen: editOpen, task: taskToEdit, openEdit, closeEdit, saveEdit } = useEditTask(editTask);
  const [snackOpen, setSnackOpen] = useState(false);

  useImperativeHandle(ref, () => ({ 
    refresh,
    search: (s: string) => refresh(s)
  }));

  useEffect(() => {
    if (searchTerm !== undefined) refresh(searchTerm);
  }, [searchTerm, refresh]);

  useEffect(() => {
    if (error) setSnackOpen(true);
  }, [error]);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}>
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
    </Box>
  );

  if (!tasks || tasks.length === 0) return (
    <Box sx={{ p: 6, textAlign: 'center' }}>
      <Typography variant="h6" color="text.secondary">אין משימות להצגה</Typography>
    </Box>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={3}>
          {tasks.map((task) => (
            <Grid key={task._id} sx={{ width: { xs: '100%', sm: '50%', md: '33.333%' }, p: 1.5 }}>
              <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{task.title}</Typography>
                    <Chip label={task.status} size="small" color={task.status === 'Completed' ? 'success' : 'primary'} />
                  </Stack>
                  <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>{task.description}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', borderTop: '1px solid #eee' }}>
                  <Tooltip title="ערוך">
                    <IconButton onClick={() => openEdit(task)} color="info"><EditIcon /></IconButton>
                  </Tooltip>
                  <Tooltip title="מחיקה">
                    <IconButton onClick={() => openDeleteConfirm(task._id!)} color="error"><DeleteIcon /></IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* דיאלוג עריכה */}
      <EditTaskDialog open={editOpen} task={taskToEdit} onClose={closeEdit} onSave={saveEdit} />

      {/* דיאלוג מחיקה - עכשיו המשתנים קיימים! */}
      <DeleteDialog />
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={() => setSnackOpen(false)}>
        <Alert severity="error">{error || 'חלה שגיאה בפעולה'}</Alert>
      </Snackbar>
    </>
  );
});

TaskList.displayName = 'TaskList';
export default TaskList;