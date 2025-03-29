import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { processQuery, setQuery, clearError, clearResult } from '../store/querySlice';
import { addQuery } from '../store/historySlice';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import HelpIcon from '@mui/icons-material/Help';

const QueryInput = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const dispatch = useDispatch();
  const { query, loading, error, mode } = useSelector((state) => state.query);
  const [localQuery, setLocalQuery] = useState('');
  const [localError, setLocalError] = useState(null);

  // Sync local state with Redux state
  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    dispatch(clearError());
    dispatch(clearResult());
    
    const trimmedQuery = localQuery.trim();
    if (!trimmedQuery) {
      setLocalError('Please enter a query');
      return;
    }

    try {
      // Add to history first
      dispatch(addQuery({
        text: trimmedQuery,
        mode,
        timestamp: new Date().toISOString(),
        status: 'pending'
      }));

      // Process the query
      await dispatch(processQuery({ query: trimmedQuery, mode })).unwrap();
      
      // Clear the input
      setLocalQuery('');
      dispatch(setQuery(''));
    } catch (error) {
      console.error('Error processing query:', error);
      setLocalError(error.message || 'Failed to process query');
    }
  };

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setLocalQuery(newQuery);
    dispatch(setQuery(newQuery));
    setLocalError(null);
    dispatch(clearError());
  };

  const handleClear = () => {
    setLocalQuery('');
    dispatch(setQuery(''));
    dispatch(clearError());
    dispatch(clearResult());
    setLocalError(null);
  };

  return (
    <Paper 
      sx={{ 
        p: { xs: 1.5, sm: 2, md: 2.5 },
        mb: { xs: 1, sm: 2 },
        width: { xs: '100%', sm: '90%', md: '80%' },
        mx: 'auto',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          gap: { xs: 0.5, sm: 1 },
          width: '100%'
        }}>
          <TextField
            fullWidth
            multiline
            rows={isMobile ? 1 : 2}
            variant="outlined"
            placeholder="Enter your query here..."
            value={localQuery}
            onChange={handleChange}
            error={!!(error || localError)}
            helperText={error || localError}
            disabled={loading}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
              '& .MuiInputBase-multiline': {
                padding: { xs: '8px', sm: '12px' },
              }
            }}
            InputProps={{
              endAdornment: localQuery && (
                <IconButton
                  size="small"
                  onClick={handleClear}
                  sx={{ 
                    position: 'absolute', 
                    right: 8, 
                    top: 8,
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'error.main'
                    }
                  }}
                >
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />
          <Tooltip title="Submit query">
            <span>
              <IconButton
                type="submit"
                color="primary"
                disabled={loading || !localQuery.trim()}
                sx={{ 
                  alignSelf: 'flex-end',
                  mb: { xs: 0.5, sm: 1 },
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 },
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  },
                  '&:disabled': {
                    backgroundColor: theme.palette.action.disabledBackground,
                    color: theme.palette.action.disabled,
                  }
                }}
              >
                {loading ? (
                  <CircularProgress 
                    size={isMobile ? 20 : 24} 
                    color="inherit" 
                  />
                ) : (
                  <SendIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                )}
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </form>
    </Paper>
  );
};

export default QueryInput;
