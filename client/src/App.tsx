import React, { useState, useRef } from 'react';
import { Container, Box, CssBaseline, Typography } from '@mui/material';
import SearchBar from './components/SearchBar';
import AddTaskDialog from './components/AddTaskDialog';
import TaskList from './components/TaskList';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const taskListRef = useRef<{ refresh: () => void; search: (s: string) => void } | null>(null);

  const handleTaskAdded = () => {
    setRefreshKey(prev => prev + 1);
    taskListRef.current?.refresh();
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    taskListRef.current?.search(term);
  };

  return (
    <Box className="app-container">
      <CssBaseline />
      <Container >
        <Box className="header-container">
          <Typography variant="h4" className="main-title">
            ניהול המשימות שלי
          </Typography>
          <Typography variant="body1" className="subtitle">
            עקוב אחר המשימות שלך בקלות ובנוחות
          </Typography>
          </Box>
          <SearchBar onSearch={handleSearch} />
          <AddTaskDialog onTaskAdded={handleTaskAdded} />
        <TaskList 
          key={`${refreshKey}-${searchTerm}`} 
          ref={taskListRef} 
          searchTerm={searchTerm} 
        />
      </Container>
    </Box>
  );
}

export default App;