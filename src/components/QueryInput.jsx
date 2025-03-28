import React, { useState } from 'react';
import { Box, TextField, Button, Autocomplete, Paper, Typography, Chip, Alert, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQuery, submitQuery } from '../store/querySlice';
import { addQuery } from '../store/historySlice';
import SearchIcon from '@mui/icons-material/Search';

const AI_SUGGESTIONS = [
  "Show me sales trends for the last quarter",
  "Compare revenue between departments",
  "Display customer satisfaction metrics",
  "Analyze product performance by category",
  "Show monthly growth rate",
  "Compare year-over-year metrics",
];

const QueryInput = () => {
  const dispatch = useDispatch();
  const { currentQuery, loading, error } = useSelector((state) => state.query);
  const { queries } = useSelector((state) => state.history);
  const [suggestions, setSuggestions] = useState([]);

  const handleQueryChange = (_, newValue) => {
    dispatch(setCurrentQuery(newValue));
    if (newValue) {
      const filtered = AI_SUGGESTIONS.filter(suggestion =>
        suggestion.toLowerCase().includes(newValue.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleQuerySubmit = async () => {
    if (!currentQuery.trim()) return;

    try {
      const result = await dispatch(submitQuery(currentQuery)).unwrap();
      dispatch(addQuery({ query: currentQuery, results: result }));
    } catch (error) {
      console.error('Failed to process query:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        AI-Powered Query Dashboard
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Autocomplete
            freeSolo
            options={[...queries.map(q => q.query), ...AI_SUGGESTIONS]}
            value={currentQuery}
            onChange={handleQueryChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Ask your data question"
                variant="outlined"
                fullWidth
                placeholder="e.g., Show me sales data for last month"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
                }}
                disabled={loading}
              />
            )}
            sx={{ flex: 1 }}
            disabled={loading}
          />
          <Button
            variant="contained"
            onClick={handleQuerySubmit}
            disabled={!currentQuery.trim() || loading}
            size="large"
            sx={{ minWidth: 120 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Analyze'
            )}
          </Button>
        </Box>
        {suggestions.length > 0 && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {suggestions.map((suggestion, index) => (
              <Chip
                key={index}
                label={suggestion}
                onClick={() => dispatch(setCurrentQuery(suggestion))}
                sx={{ m: 0.5 }}
                disabled={loading}
              />
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default QueryInput; 