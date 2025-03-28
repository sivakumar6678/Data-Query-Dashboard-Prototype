import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import {
  Download,
  Share,
  Print,
  TableChart,
  BarChart,
  PieChart,
  Timeline,
  Save,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

const ResultsDisplay = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const { results, loading, error } = useSelector((state) => state.query);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleExport = () => {
    setExportDialogOpen(true);
  };

  const handleCloseExportDialog = () => {
    setExportDialogOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, bgcolor: 'error.light' }}>
        <Alert severity="error">{error}</Alert>
      </Paper>
    );
  }

  if (!results) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="text.secondary">
          Enter a query to see results
        </Typography>
      </Paper>
    );
  }

  // Handle different result structures
  const renderResults = () => {
    try {
      // If results is an array of objects (table data)
      if (Array.isArray(results) && results.length > 0 && typeof results[0] === 'object') {
        const headers = Object.keys(results[0]);
        return (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      borderBottom: '1px solid #e0e0e0',
                      fontWeight: 600,
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, index) => (
                <tr key={index}>
                  {headers.map((header, cellIndex) => (
                    <td
                      key={cellIndex}
                      style={{
                        padding: '12px',
                        borderBottom: '1px solid #e0e0e0',
                      }}
                    >
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
      }

      // If results is a text response
      if (typeof results === 'string') {
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {results}
            </Typography>
          </Box>
        );
      }

      // If results is an object with specific structure
      if (typeof results === 'object' && results !== null) {
        return (
          <Box sx={{ p: 2 }}>
            {Object.entries(results).map(([key, value]) => (
              <Box key={key} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {key}
                </Typography>
                <Typography variant="body1">
                  {typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                </Typography>
              </Box>
            ))}
          </Box>
        );
      }

      // Fallback for unknown data structure
      return (
        <Box sx={{ p: 2 }}>
          <Alert severity="warning">
            Unknown data structure. Raw data:
          </Alert>
          <pre style={{ marginTop: '1rem', overflow: 'auto' }}>
            {JSON.stringify(results, null, 2)}
          </pre>
        </Box>
      );
    } catch (err) {
      return (
        <Box sx={{ p: 2 }}>
          <Alert severity="error">
            Error displaying results: {err.message}
          </Alert>
          <pre style={{ marginTop: '1rem', overflow: 'auto' }}>
            {JSON.stringify(results, null, 2)}
          </pre>
        </Box>
      );
    }
  };

  return (
    <Box>
      {/* Results Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2 
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Query Results
        </Typography>
        <Box>
          <Tooltip title="Download">
            <IconButton onClick={handleExport}>
              <Download />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton>
              <Share />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton>
              <Print />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Visualization Options */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab icon={<TableChart />} label="Table" />
          <Tab icon={<BarChart />} label="Bar Chart" />
          <Tab icon={<PieChart />} label="Pie Chart" />
          <Tab icon={<Timeline />} label="Line Chart" />
        </Tabs>
      </Box>

      {/* Results Content */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ overflowX: 'auto' }}>
          {renderResults()}
        </Box>
      </Paper>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onClose={handleCloseExportDialog}>
        <DialogTitle>Export Results</DialogTitle>
        <DialogContent>
          <Typography>
            Choose your preferred export format:
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseExportDialog}>Cancel</Button>
          <Button variant="contained" startIcon={<Save />}>
            Export as CSV
          </Button>
          <Button variant="contained" startIcon={<Save />}>
            Export as Excel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ResultsDisplay; 