import React, { useEffect, useState } from 'react';
import {
  Grid, Card, CardContent, Typography, CardActions,
  IconButton, Tooltip, Stack, Chip, CircularProgress, Box, Snackbar, Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ITask } from '../types/task';
import { useEditTask } from '../hooks/useEditTask';
import { useDeleteTask } from '../hooks/useDeleteTask';
import EditTaskDialog from './EditTaskDialog';
import DeleteTaskDialog from './DeleteTaskDialog';
import './TaskList.css';

/**
 * Component for rendering the collection of tasks.
 * Manages various UI states (loading, error, empty list) and integrates 
 * editing and deletion dialogs for individual task management.
 */
interface TaskListProps {
  tasks: ITask[];
  loading: boolean;
  error: string | null;
  removeTask: (id: string) => Promise<boolean>;
  editTask: (id: string, data: Partial<ITask>) => Promise<boolean>;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks, loading, error, removeTask, editTask,
}) => {
  const editApi = useEditTask(editTask);
  const deleteApi = useDeleteTask(removeTask);
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    if (error) setSnackOpen(true);
  }, [error]);

  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="error-container">
        <Alert severity="error" className="error-alert">{error}</Alert>
      </Box>
    );
  }

  if (!tasks.length) {
    return (
      <Box className="no-tasks-container">
        <Typography variant="h6" className="task-title-text">אין משימות להצגה</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box className="task-list-wrapper">
        <Grid container className="tasks-grid-container">
          {tasks.map((task) => (
            <Grid key={task._id} className="task-grid-item">
              <Card elevation={3}>
                <CardContent>
                  <Stack direction="row" className="card-header-stack">
                    <Typography variant="h6" className="task-title-text">
                      {task.title}
                    </Typography>
                    <Chip
                      label={task.status}
                      size="small"
                      color={task.status === 'Completed' ? 'success' : 'primary'}
                    />
                  </Stack>
                  <Typography variant="body2" className="task-description">
                    {task.description}
                  </Typography>
                  {task.createdAt ? new Date(task.createdAt).toLocaleDateString('he-IL') : ''}
                </CardContent>
                <CardActions className="task-card-actions">
                  <Tooltip title="ערוך">
                    <IconButton onClick={() => editApi.openEdit(task)} color="info">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="מחיקה">
                    <IconButton
                      onClick={() => deleteApi.openDeleteConfirm(task._id!)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <EditTaskDialog
        open={editApi.isOpen}
        task={editApi.task}
        onClose={editApi.closeEdit}
        onSave={editApi.saveEdit}
      />

      <DeleteTaskDialog
        open={deleteApi.isOpen}
        isLoading={deleteApi.isLoading}
        onClose={deleteApi.closeDeleteConfirm}
        onConfirm={deleteApi.confirmDelete}
      />

      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={() => setSnackOpen(false)}
      >
        <Alert severity="error" onClose={() => setSnackOpen(false)}>
          {error || 'חלה שגיאה בפעולה'}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TaskList;
