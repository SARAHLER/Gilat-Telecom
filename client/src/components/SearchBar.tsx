import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const onSearchRef = useRef(onSearch);
  
  useEffect(() => { 
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    const delay = inputValue === '' ? 0 : 500;

    const timer = setTimeout(() => {
      onSearchRef.current(inputValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleClear = () => {
    setInputValue('');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <TextField
        placeholder="חפש משימות..."
        variant="outlined"
        size="small"
        fullWidth
        sx={{ maxWidth: 400 }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: inputValue && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClear} edge="end">
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;