import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Trends = () => {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <TrendingUpIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
      <Typography variant="h5" gutterBottom>
        Trends Analysis
      </Typography>
      <Typography color="text.secondary">
        Track and analyze trends in your data...
      </Typography>
    </Box>
  );
};

export default Trends; 