import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Grid,
  Alert,
  Card,
  CardContent,
  Divider,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ComposedChart,
  ReferenceLine,
} from 'recharts';
import { useSelector } from 'react-redux';
import InfoIcon from '@mui/icons-material/Info';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TimelineIcon from '@mui/icons-material/Timeline';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import InsightsIcon from '@mui/icons-material/Insights';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import DescriptionIcon from '@mui/icons-material/Description';
import DataObjectIcon from '@mui/icons-material/DataObject';
import PsychologyIcon from '@mui/icons-material/Psychology';
import Timeline from '@mui/icons-material/Timeline';
import TableChartIcon from '@mui/icons-material/TableChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import RadarIcon from '@mui/icons-material/Radar';
import AreaChartIcon from '@mui/icons-material/AreaChart';
import BulletPointIcon from '@mui/icons-material/ArrowRight';
import HelpIcon from '@mui/icons-material/Help';
import SearchIcon from '@mui/icons-material/Search';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const ResultsDisplay = () => {
  const theme = useTheme();
  const { result, loading, error } = useSelector((state) => state.query);
  const [selectedTab, setSelectedTab] = useState(0);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!result) {
    return (
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        maxWidth: 800,
        mx: 'auto',
        p: 4
      }}>
        {/* Welcome Section */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Welcome to AI-Powered Query Analyzer!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Transform your data into actionable insights using natural language queries. Our AI-powered system helps you analyze data and visualize results instantly.
          </Typography>
        </Box>

        {/* How to Use Section */}
        <Paper sx={{ p: 3, width: '100%' }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HelpIcon color="primary" />
            How to Use
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <DataObjectIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Enter Your Query" 
                secondary="Type your question in natural language"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PsychologyIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="AI Processing" 
                secondary="Our AI analyzes your query and processes the data"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InsightsIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="View Results" 
                secondary="Get visualizations, trends, and detailed analysis"
              />
            </ListItem>
          </List>
        </Paper>

        {/* Example Queries Section */}
        <Paper sx={{ p: 3, width: '100%' }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DescriptionIcon color="primary" />
            Example Queries
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              "Show me the top-selling products of 2024",
              "Analyze customer retention trends",
              "Compare sales performance across regions",
              "What are the key metrics for Q1 2024?"
            ].map((query, index) => (
              <Button 
                key={index}
                variant="outlined" 
                onClick={() => {
                  dispatch(setQuery(query));
                }}
                sx={{ justifyContent: 'flex-start', textAlign: 'left' }}
              >
                <BulletPointIcon sx={{ mr: 1 }} />
                {query}
              </Button>
            ))}
          </Box>
        </Paper>

        {/* Benefits Section */}
        <Paper sx={{ p: 3, width: '100%' }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon color="primary" />
            Why Use This Tool?
          </Typography>
          <Grid container spacing={2}>
            {[
              { icon: <TimelineIcon />, text: "Real-time data analysis and visualization" },
              { icon: <TrendingUpIcon />, text: "Identify trends and patterns quickly" },
              { icon: <AnalyticsIcon />, text: "AI-powered insights and recommendations" },
              { icon: <CompareArrowsIcon />, text: "Easy comparison and benchmarking" }
            ].map((benefit, index) => (
              <Grid xs={12} sm={6} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {benefit.icon}
                  <Typography variant="body2">{benefit.text}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1" gutterBottom>
            Ready to start analyzing your data?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SearchIcon />}
            onClick={() => {
              const queryInput = document.querySelector('input[placeholder="Enter your query here..."]');
              if (queryInput) queryInput.focus();
            }}
          >
            Start Your Analysis
          </Button>
        </Box>
      </Box>
    );
  }

  const renderBarChart = (data) => {
    if (!data || !data.labels || !data.values) return null;

    const chartData = data.labels.map((label, index) => ({
      name: label,
      value: data.values[index],
    }));

        return (
      <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
          <RechartsTooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
  };

  const renderPieChart = (data) => {
    if (!data || !data.labels || !data.values) return null;

    const chartData = data.labels.map((label, index) => ({
      name: label,
      value: data.values[index],
    }));

        return (
      <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
            outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
          <RechartsTooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
  };

  const renderLineChart = (data) => {
    if (!data || !data.labels || !data.values) return null;

    const chartData = data.labels.map((label, index) => ({
      name: label,
      value: data.values[index],
    }));

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <RechartsTooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderAreaChart = (data) => {
    if (!data || !data.labels || !data.values) return null;

    const chartData = data.labels.map((label, index) => ({
      name: label,
      value: data.values[index],
    }));

    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <RechartsTooltip />
          <Legend />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  const renderRadarChart = (data) => {
    if (!data || !data.labels || !data.values) return null;

    const chartData = data.labels.map((label, index) => ({
      category: label,
      value: data.values[index],
    }));

    return (
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" />
          <PolarRadiusAxis />
          <Radar name="Value" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    );
  };

  const renderAnalysis = (data) => {
    if (!data) return null;

    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AssessmentIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">
            Analysis
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          {data.summary}
        </Typography>
        {data.metrics && (
          <Grid container spacing={2}>
            {Object.entries(data.metrics).map(([key, value]) => (
              <Grid item xs={12} sm={4} key={key}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    );
  };

  const renderInsights = (data) => {
    if (!data || !data.insights) return null;

    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">
            Key Insights
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {data.insights.map((insight, index) => (
            <Grid item xs={12} key={index}>
              <Chip
                label={insight}
                color="primary"
                variant="outlined"
                sx={{ mr: 1, mb: 1 }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderDetailedMetrics = (data) => {
    if (!data || !data.metrics) return null;

    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AnalyticsIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">
            Detailed Metrics
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {Object.entries(data.metrics).map(([key, value]) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {value}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.min(100, (value / 100) * 100)} 
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderTrendAnalysis = (data) => {
    if (!data || !data.trends) return null;

    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TimelineIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">
            Trend Analysis
          </Typography>
        </Box>
        <List>
          {data.trends.map((trend, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                {trend.type === 'positive' ? (
                  <CheckCircleIcon color="success" />
                ) : trend.type === 'negative' ? (
                  <ErrorIcon color="error" />
                ) : (
                  <WarningIcon color="warning" />
                )}
              </ListItemIcon>
              <ListItemText 
                primary={trend.title}
                secondary={trend.description}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  const renderComparativeAnalysis = (data) => {
    if (!data || !data.comparison) return null;

    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CompareArrowsIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">
            Comparative Analysis
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {data.comparison.map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.description}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" color="textSecondary">
                      Change: {item.change}
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.abs(item.change)} 
                      color={item.change >= 0 ? 'success' : 'error'}
                      sx={{ height: 4, borderRadius: 2 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderPredictiveInsights = (data) => {
    if (!data || !data.predictions) return null;

    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <InsightsIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">
            Predictive Insights
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {data.predictions.map((prediction, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    {prediction.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {prediction.description}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" color="textSecondary">
                      Confidence: {prediction.confidence}%
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={prediction.confidence} 
                      color="primary"
                      sx={{ height: 4, borderRadius: 2 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderDataTable = (data) => {
    if (!data || !data.labels || !data.values) return null;

    const tableData = data.labels.map((label, index) => ({
      label,
      value: data.values[index],
    }));

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell align="right">Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.label}
                </TableCell>
                <TableCell align="right">{row.value}</TableCell>
                <TableCell align="right">
                  {((row.value / data.values.reduce((a, b) => a + b, 0)) * 100).toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderMethodology = (data) => {
    if (!data || !data.methodology) return null;

    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PsychologyIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">
            Analysis Methodology
        </Typography>
        </Box>
        <Stepper activeStep={activeStep} orientation="vertical">
          {data.methodology.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.title}</StepLabel>
              <StepContent>
                <Typography variant="body2" paragraph>
                  {step.description}
              </Typography>
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => setActiveStep((prevStep) => prevStep + 1)}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === data.methodology.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={() => setActiveStep((prevStep) => prevStep - 1)}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    );
  };

  const renderDataQuality = (data) => {
    if (!data || !data.dataQuality) return null;

    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <DataObjectIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">
            Data Quality Assessment
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {Object.entries(data.dataQuality).map(([key, value]) => (
            <Grid item xs={12} sm={6} key={key}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {value.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      Quality Score:
        </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={value.score}
                      color={value.score >= 80 ? 'success' : value.score >= 60 ? 'warning' : 'error'}
                      sx={{ flex: 1, height: 8, borderRadius: 4 }}
                    />
                  </Box>
                  <Typography variant="caption" color="textSecondary">
                    {value.recommendations}
            </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderChartDescription = (data) => {
    if (!data || !data.chartDescriptions) return null;

    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">
            Chart Interpretations
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {Object.entries(data.chartDescriptions).map(([chartType, description]) => (
            <Grid item xs={12} key={chartType}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {chartType === 'bar' && <BarChartIcon sx={{ mr: 1 }} />}
                    {chartType === 'line' && <ShowChartIcon sx={{ mr: 1 }} />}
                    {chartType === 'pie' && <PieChartIcon sx={{ mr: 1 }} />}
                    {chartType === 'radar' && <RadarIcon sx={{ mr: 1 }} />}
                    {chartType === 'area' && <AreaChartIcon sx={{ mr: 1 }} />}
                    <Typography variant="subtitle1">
                      {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderDetailedDescription = (data) => {
    if (!data) return null;

    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
          {result.title}
        </Typography>
        
        {/* Executive Summary */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Executive Summary
        </Typography>
        <Typography variant="body1" paragraph>
          {result.content}
        </Typography>

        {/* Detailed Analysis */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Detailed Analysis
        </Typography>
        <Typography variant="body1" paragraph>
          {data.summary}
        </Typography>

        {/* Key Findings */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Key Findings
        </Typography>
        <List>
          {data.insights.map((insight, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <BulletPointIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={insight} />
            </ListItem>
          ))}
        </List>

        {/* Performance Metrics */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Performance Metrics
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(data.metrics).map(([key, value]) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {key}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {value}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.min(100, (value / 100) * 100)} 
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Conclusion */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Conclusion
        </Typography>
        <Typography variant="body1" paragraph>
          Based on the analysis of the data, we can conclude that the overall performance shows positive trends. The key metrics indicate strong growth and stability across different aspects of the business. The insights gathered from this analysis provide valuable information for strategic decision-making and future planning.
        </Typography>
        <Typography variant="body1" paragraph>
          Moving forward, it is recommended to focus on maintaining the current growth trajectory while addressing areas that require improvement. The data suggests several opportunities for optimization and expansion, particularly in the areas highlighted in the key findings section.
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'grid', gap: 3 }}>
        {/* Detailed Description Section */}
        <Paper sx={{ p: 3, mb: 2 }}>
          {renderDetailedDescription(result.data)}
        </Paper>

        {/* Charts Section */}
        {result.data && result.data.labels && (
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Data Visualization
            </Typography>
            <Tabs
              value={selectedTab}
              onChange={(e, newValue) => setSelectedTab(newValue)}
              sx={{ mb: 2 }}
            >
              <Tab label="Bar Chart" />
              <Tab label="Pie Chart" />
              <Tab label="Line Chart" />
              <Tab label="Area Chart" />
              <Tab label="Radar Chart" />
            </Tabs>
            <Box sx={{ height: 400 }}>
              {selectedTab === 0 && renderBarChart(result.data)}
              {selectedTab === 1 && renderPieChart(result.data)}
              {selectedTab === 2 && renderLineChart(result.data)}
              {selectedTab === 3 && renderAreaChart(result.data)}
              {selectedTab === 4 && renderRadarChart(result.data)}
            </Box>
          </Paper>
        )}

        {/* Detailed Analysis Section */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AssessmentIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Detailed Analysis</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
                {renderDetailedMetrics(result.data)}
                {renderTrendAnalysis(result.data)}
                {renderComparativeAnalysis(result.data)}
                {renderPredictiveInsights(result.data)}
                <Box sx={{ gridColumn: '1 / -1' }}>
                  {renderMethodology(result.data)}
                </Box>
                <Box sx={{ gridColumn: '1 / -1' }}>
                  {renderDataQuality(result.data)}
                </Box>
                <Box sx={{ gridColumn: '1 / -1' }}>
                  {renderChartDescription(result.data)}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
      </Paper>
      </Box>
    </Box>
  );
};

export default ResultsDisplay; 
