import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Paper,
  Divider,
  Chip,
  Tooltip,
  useTheme,
  useMediaQuery,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Skeleton,
  Stack,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { processQuery, setQuery, clearError, clearResult } from '../store/querySlice';
import { addQuery, removeQuery, updateQueryStatus } from '../store/historySlice';
import HistoryIcon from '@mui/icons-material/History';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const QueryHistory = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.query);
  const { queries, loading } = useSelector((state) => state.history);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [editText, setEditText] = useState('');
  const [error, setError] = useState(null);

  // Load queries from localStorage on component mount
  useEffect(() => {
    try {
      const savedQueries = localStorage.getItem('queryHistory');
      if (savedQueries) {
        const parsedQueries = JSON.parse(savedQueries);
        parsedQueries.forEach(query => {
          dispatch(addQuery(query));
        });
      }
    } catch (error) {
      console.error('Error loading query history:', error);
    }
  }, [dispatch]);

  // Save queries to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('queryHistory', JSON.stringify(queries));
    } catch (error) {
      console.error('Error saving query history:', error);
    }
  }, [queries]);

  const handleRerun = async (query) => {
    if (!query.text || !query.text.trim()) {
      setError('Please enter a valid query');
      return;
    }

    try {
      setError(null);
      dispatch(clearError());
      dispatch(clearResult());

      // Create a new query entry with current timestamp
      const newTimestamp = new Date().toISOString();
      
      // Add to history first with pending status
      dispatch(addQuery({
        text: query.text,
        mode: query.mode,
        timestamp: newTimestamp,
        status: 'pending'
      }));

      // Process the query
      await dispatch(processQuery({ query: query.text, mode: query.mode })).unwrap();
      
      // Update the status to completed using the new timestamp
      dispatch(updateQueryStatus({
        timestamp: newTimestamp,
        status: 'completed'
      }));
    } catch (error) {
      console.error('Failed to re-execute query:', error);
      setError(error.message || 'Failed to re-execute query');
      
      // Update the status to failed using the new timestamp
      dispatch(updateQueryStatus({
        timestamp: newTimestamp,
        status: 'failed'
      }));
    }
  };

  const handleDelete = (timestamp) => {
    try {
      // Remove from Redux store
      dispatch(removeQuery(timestamp));
      
      // Clear any existing errors
      setError(null);
    } catch (error) {
      console.error('Error deleting query:', error);
      setError('Failed to delete query. Please try again.');
    }
  };

  const handleEdit = (query) => {
    setSelectedQuery(query);
    setEditText(query.text);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editText.trim()) {
      setError('Please enter a valid query');
      return;
    }

    try {
      setError(null);
      dispatch(clearError());
      dispatch(clearResult());

      // Add to history first with pending status
      dispatch(addQuery({
        text: editText,
        mode: selectedQuery.mode,
        timestamp: new Date().toISOString(),
        status: 'pending'
      }));

      // Process the query
      await dispatch(processQuery({ query: editText, mode: selectedQuery.mode })).unwrap();
      
      // Update the status to completed
      dispatch(updateQueryStatus({
        timestamp: selectedQuery.timestamp,
        status: 'completed'
      }));

      setEditDialogOpen(false);
    } catch (error) {
      console.error('Failed to process edited query:', error);
      setError(error.message || 'Failed to process query');
    }
  };

  const handleCancelEdit = () => {
    setEditDialogOpen(false);
    setSelectedQuery(null);
    setEditText('');
    setError(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon color="success" />;
      case 'failed':
        return <ErrorIcon color="error" />;
      case 'pending':
        return <PendingIcon color="warning" />;
      default:
        return <PendingIcon color="action" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'failed':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <Typography variant="h6" gutterBottom>
          Query History
        </Typography>
        <List>
          {[1, 2, 3].map((index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Skeleton variant="circular" width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary={<Skeleton variant="text" width="80%" />}
                secondary={<Skeleton variant="text" width="60%" />}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        mb: { xs: 1.5, sm: 2 },
        flexWrap: 'wrap',
        gap: 1
      }}>
        <Typography 
          variant="h6"
          sx={{ 
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            fontWeight: 600
          }}
        >
          Query History
        </Typography>
        <Chip
          label={mode === 'ai' ? 'AI Mode' : 'Local Mode'}
          color={mode === 'ai' ? 'primary' : 'secondary'}
          size={isMobile ? "small" : "medium"}
        />
      </Box>

      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: { xs: 1.5, sm: 2 },
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          {error}
        </Alert>
      )}

      <Paper 
        sx={{ 
          maxHeight: { xs: 'calc(100vh - 300px)', sm: 'calc(100vh - 200px)' },
          overflow: 'auto',
          position: 'relative',
          '& .MuiList-root': {
            position: 'relative',
            zIndex: 1
          }
        }}
      >
        <List>
          {queries.map((query, index) => (
            <React.Fragment key={query.timestamp}>
              <ListItem
                sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                  position: 'relative',
                  zIndex: 1,
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  py: { xs: 1.5, sm: 2 }
                }}
              >
                <Box sx={{ 
                  width: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: { xs: 0.5, sm: 1 },
                  flexWrap: 'wrap',
                  gap: 1
                }}>
                  <ListItemIcon>
                    {getStatusIcon(query.status)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography 
                        variant="body1" 
                        noWrap
                        sx={{ 
                          fontSize: { xs: '0.875rem', sm: '1rem' }
                        }}
                      >
                        {query.text}
                      </Typography>
                    }
                    secondary={
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ 
                          fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}
                      >
                        {formatTimestamp(query.timestamp)}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Box sx={{ 
                      display: 'flex', 
                      gap: { xs: 0.5, sm: 1 },
                      flexWrap: 'wrap'
                    }}>
                      <Tooltip title="Edit query">
                        <IconButton
                          edge="end"
                          size={isMobile ? "small" : "medium"}
                          onClick={() => handleEdit(query)}
                          sx={{ 
                            color: theme.palette.primary.main,
                            '&:hover': {
                              backgroundColor: `${theme.palette.primary.main}10`
                            }
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Re-run query">
                        <IconButton
                          edge="end"
                          size={isMobile ? "small" : "medium"}
                          onClick={() => handleRerun(query)}
                          sx={{ 
                            color: theme.palette.success.main,
                            '&:hover': {
                              backgroundColor: `${theme.palette.success.main}10`
                            }
                          }}
                        >
                          <RefreshIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete query">
                        <IconButton
                          edge="end"
                          size={isMobile ? "small" : "medium"}
                          onClick={() => handleDelete(query.timestamp)}
                          sx={{ 
                            color: theme.palette.error.main,
                            '&:hover': {
                              backgroundColor: `${theme.palette.error.main}10`
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </ListItemSecondaryAction>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: { xs: 0.5, sm: 1 }, 
                  pl: { xs: 7, sm: 7 },
                  flexWrap: 'wrap'
                }}>
                  <Chip
                    label={query.status}
                    color={getStatusColor(query.status)}
                    size={isMobile ? "small" : "medium"}
                  />
                  <Chip
                    label={query.mode === 'ai' ? 'AI' : 'Local'}
                    size={isMobile ? "small" : "medium"}
                    variant="outlined"
                  />
                </Box>
              </ListItem>
              {index < queries.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Edit Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={handleCancelEdit} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            m: { xs: 1, sm: 2 }
          }
        }}
      >
        <DialogTitle>Edit Query</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Query"
            fullWidth
            multiline
            rows={3}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: { xs: 1.5, sm: 2 } }}>
          <Button 
            onClick={handleCancelEdit} 
            startIcon={<CancelIcon />}
            sx={{ 
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveEdit} 
            startIcon={<SaveIcon />} 
            variant="contained"
            sx={{ 
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            Save & Run
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QueryHistory;
