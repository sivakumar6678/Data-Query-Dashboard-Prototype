import React from 'react';
import { Box, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../store/querySlice';

const QueryModeSelector = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.query);

  const handleModeChange = (event, newMode) => {
    if (newMode !== null) {
      dispatch(setMode(newMode));
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleModeChange}
        aria-label="query mode"
      >
        <Tooltip title="Query local data">
          <ToggleButton value="local" aria-label="local mode">
            Manual 
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Use AI for query suggestions">
          <ToggleButton value="ai" aria-label="ai mode">
            Advanced
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
    </Box>
  );
};

export default QueryModeSelector; 