import React from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

/**
 * Search input component for filtering tasks.
 * Provides a controlled text field with an adornment icon and a clear button.
 */
interface SearchBarProps {
  value: string;
  onChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <TextField
        placeholder="חפש משימות..."
        variant="outlined"
        size="small"
        fullWidth
        dir='rtl'
        sx={{ maxWidth: 400 }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: value && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => onChange('')} edge="end">
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
