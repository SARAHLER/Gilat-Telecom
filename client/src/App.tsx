import React, { useState } from 'react';
import { Container, Box, CssBaseline, Typography } from '@mui/material';
import SearchBar from './components/SearchBar';
import AddTaskDialog from './components/AddTaskDialog';
import TaskList from './components/TaskList';
import { useTasks } from './hooks/useTasks';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const { tasks, loading, error, refresh, removeTask, editTask } = useTasks(searchTerm);

  return (
    <Box className="app-container">
      <CssBaseline />
      <Container>
      <Box className="header-container">
  <Typography variant="h4" className="main-title" align="center">
    ניהול המשימות שלי
  </Typography>
  <Typography variant="body1" className="subtitle" align="center">
    עקוב אחר המשימות שלך בקלות ובנוחות
  </Typography>
</Box>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <AddTaskDialog onTaskAdded={refresh} />

        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          removeTask={removeTask}
          editTask={editTask}
        />
      </Container>
    </Box>
  );
}

export default App;
