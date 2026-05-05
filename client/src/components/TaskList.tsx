import React, { useState, forwardRef, useEffect } from 'react';
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
// @ts-ignore
import './TaskList.css';

const TaskList = forwardRef((props: any, ref) => {
  const { searchTerm } = props;
  const { tasks, loading, error, refresh, removeTask, editTask } = useTasks();
  const { openDeleteConfirm, DeleteDialog } = useDeleteTask(removeTask);
  const { isOpen: editOpen, task: taskToEdit, openEdit, closeEdit, saveEdit } = useEditTask(editTask);
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    if (searchTerm !== undefined) refresh(searchTerm);
  }, [searchTerm, refresh]);

  useEffect(() => {
    if (error) setSnackOpen(true);
  }, [error]);

  if (loading) return ( 
    <Box className="loading-container">
    <CircularProgress />
  </Box>
  );

  if (error) return (
    <Box className="error-container">
    <Alert severity="error" className="error-alert">
      {error}
    </Alert>
  </Box>
  );

  if (!tasks || tasks.length === 0) return (
    <Box className="no-tasks-container">
        <Typography variant="h6" className='task-title-text'>אין משימות להצגה</Typography>
    </Box>
  );

  return (
    <>
<Box className="task-list-wrapper">
<Grid container className="tasks-grid-container">          {tasks.map((task) => (
            <Grid key={task._id} className="task-grid-item">
              <Card elevation={3}>
                <CardContent >
                  <Stack direction="row" className='card-header-stack' >
                    <Typography variant="h6" className='task-title-text'>{task.title}</Typography>
                    <Chip label={task.status} size="small" color={task.status === 'Completed' ? 'success' : 'primary'} />
                  </Stack>
                  <Typography variant="body2" className='task-description'>{task.description}</Typography>
                </CardContent>
<CardActions className="task-card-actions">
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
      <EditTaskDialog open={editOpen} task={taskToEdit} onClose={closeEdit} onSave={saveEdit} />
      <DeleteDialog />
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={() => setSnackOpen(false)}>
        <Alert severity="error">{error || 'חלה שגיאה בפעולה'}</Alert>
      </Snackbar>
    </>
  );
});

TaskList.displayName = 'TaskList';
export default TaskList;