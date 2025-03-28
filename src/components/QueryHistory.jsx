import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
  Paper,
  Chip,
  Divider,
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import ReplayIcon from '@mui/icons-material/Replay';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { removeQuery, rerunQuery } from '../store/historySlice';
import { setCurrentQuery, submitQuery } from '../store/querySlice';
import { format } from 'date-fns';

const QueryHistory = () => {
  const dispatch = useDispatch();
  const { queries } = useSelector((state) => state.history);

  const handleRerun = async (query) => {
    // Add to history
    dispatch(rerunQuery(query));
    
    // Set and submit the query
    dispatch(setCurrentQuery(query.text));
    try {
      await dispatch(submitQuery(query.text)).unwrap();
    } catch (error) {
      console.error('Failed to re-execute query:', error);
    }
  };

  const handleDelete = (queryId) => {
    dispatch(removeQuery(queryId));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <HistoryIcon sx={{ color: 'primary.main', mr: 1 }} />
        <Typography variant="h6" color="primary">
          Recent Queries
        </Typography>
      </Box>

      <List sx={{ width: '100%' }}>
        {queries.map((query, index) => (
          <React.Fragment key={query.id}>
            <ListItem
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 1,
                mb: 1,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: 1,
                }}>
                  <Typography variant="body1" sx={{ fontWeight: 500, flex: 1 }}>
                    {query.text}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Rerun query">
                      <IconButton
                        size="small"
                        onClick={() => handleRerun(query)}
                        sx={{ color: 'primary.main' }}
                      >
                        <ReplayIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(query.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    label={query.status}
                    size="small"
                    color={query.status === 'completed' ? 'success' : 'warning'}
                    sx={{ height: 20 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {format(new Date(query.timestamp), 'MMM d, yyyy HH:mm')}
                  </Typography>
                </Box>
              </Box>
            </ListItem>
            {index < queries.length - 1 && (
              <Divider sx={{ my: 1 }} />
            )}
          </React.Fragment>
        ))}
        {queries.length === 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center', py: 4 }}
          >
            No queries in history
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default QueryHistory; 