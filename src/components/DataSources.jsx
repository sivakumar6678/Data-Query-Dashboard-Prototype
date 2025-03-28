import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';

const DataSources = () => {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <StorageIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
      <Typography variant="h5" gutterBottom>
        Data Sources
      </Typography>
      <Typography color="text.secondary">
        Manage your data connections and sources here...
      </Typography>
    </Box>
  );
};

export default DataSources; 