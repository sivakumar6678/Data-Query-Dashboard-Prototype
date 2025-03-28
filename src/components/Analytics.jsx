import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const Analytics = () => {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <AnalyticsIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
      <Typography variant="h5" gutterBottom>
        Analytics Dashboard
      </Typography>
      <Typography color="text.secondary">
        Advanced analytics features coming soon...
      </Typography>
    </Box>
  );
};

export default Analytics; 