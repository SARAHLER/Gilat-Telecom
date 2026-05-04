import React, { useState, useRef } from 'react';
import { Container, Box, CssBaseline } from '@mui/material';
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
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4, mt: 4 }}>
          <SearchBar onSearch={handleSearch} />
          <AddTaskDialog onTaskAdded={handleTaskAdded} />
        </Box>
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