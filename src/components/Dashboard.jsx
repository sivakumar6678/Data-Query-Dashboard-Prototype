import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Refresh,
  MoreVert,
  Assessment,
  Timeline,
  BarChart,
  PieChart,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [loading, setLoading] = useState(false);
  const { queries } = useSelector((state) => state.history);

  // Mock data - replace with real data from your API
  const metrics = {
    totalQueries: queries.length,
    successRate: (queries.filter(q => q.status === 'completed').length / queries.length) * 100 || 0,
    avgResponseTime: '2.5s',
    dataVolume: '1.2GB',
  };

  const trends = [
    { label: 'Query Volume', value: '+12%', trend: 'up' },
    { label: 'Success Rate', value: '+5%', trend: 'up' },
    { label: 'Response Time', value: '-8%', trend: 'down' },
    { label: 'Data Growth', value: '+15%', trend: 'up' },
  ];

  const recentQueries = queries.slice(0, 5);

  const handleRefresh = () => {
    setLoading(true);
    // Simulate data refresh
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Dashboard Overview
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="day">Last 24 Hours</MenuItem>
              <MenuItem value="week">Last Week</MenuItem>
              <MenuItem value="month">Last Month</MenuItem>
              <MenuItem value="year">Last Year</MenuItem>
            </Select>
          </FormControl>
          <Tooltip title="Refresh Data">
            <IconButton onClick={handleRefresh} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : <Refresh />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Metrics Grid */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {Object.entries(metrics).map(([key, value]) => (
          <Grid item xs={12} sm={6} md={3} key={key}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Typography>
                    <Typography variant="h4" component="div">
                      {value}
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Trends */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {trends.map((trend) => (
          <Grid item xs={12} sm={6} md={3} key={trend.label}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {trend.trend === 'up' ? (
                    <TrendingUp color="success" />
                  ) : (
                    <TrendingDown color="error" />
                  )}
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      {trend.label}
                    </Typography>
                    <Typography variant="h6" component="div">
                      {trend.value}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Timeline sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Query Volume Trend</Typography>
            </Box>
            <Box sx={{ height: 'calc(100% - 40px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">Chart will be implemented here</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PieChart sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Query Distribution</Typography>
            </Box>
            <Box sx={{ height: 'calc(100% - 40px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">Chart will be implemented here</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Queries */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Assessment sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">Recent Queries</Typography>
        </Box>
        <Box>
          {recentQueries.map((query) => (
            <Box
              key={query.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 1,
                borderBottom: '1px solid',
                borderColor: 'divider',
                '&:last-child': {
                  borderBottom: 'none',
                },
              }}
            >
              <Typography variant="body2">{query.text}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(query.timestamp).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard; 