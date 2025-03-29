import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Divider,
  Chip,
  Skeleton,
  Button,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setQuery } from '../store/querySlice';
import { setSuggestions, setLoading } from '../store/suggestionsSlice';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssessmentIcon from '@mui/icons-material/Assessment';
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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const AISuggestions = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.query);
  const { suggestions, loading } = useSelector((state) => state.suggestions);

  useEffect(() => {
    // Simulate loading suggestions
    dispatch(setLoading(true));
    
    // Set default suggestions based on mode
    const defaultSuggestions = mode === 'ai' 
      ? [
          'Show me sales trends over time',
          'Compare product performance across categories',
          'Identify top performing customers',
          'Analyze seasonal patterns in sales',
          'What are the key insights from our data?',
          'Show me customer demographics analysis',
          'Compare sales performance by region',
          'Analyze inventory turnover rates',
        ]
      : [
          'Show total sales',
          'List all customers',
          'Display product inventory',
          'View order details',
          'Show customer orders',
          'Display product categories',
          'List suppliers',
          'Show warehouse locations',
        ];

    // Simulate API delay
    setTimeout(() => {
      dispatch(setSuggestions(defaultSuggestions));
    }, 500);
  }, [mode, dispatch]);

  const handleSuggestionClick = (suggestion) => {
    dispatch(setQuery(suggestion));
  };

  const getSuggestionIcon = (suggestion) => {
    const lowerSuggestion = suggestion.toLowerCase();
    if (lowerSuggestion.includes('trend')) return <TrendingUpIcon />;
    if (lowerSuggestion.includes('compare')) return <CompareArrowsIcon />;
    if (lowerSuggestion.includes('customer')) return <AssessmentIcon />;
    if (lowerSuggestion.includes('inventory')) return <TableChartIcon />;
    if (lowerSuggestion.includes('sales')) return <ShowChartIcon />;
    if (lowerSuggestion.includes('analysis')) return <AnalyticsIcon />;
    if (lowerSuggestion.includes('insight')) return <InsightsIcon />;
    if (lowerSuggestion.includes('methodology')) return <PsychologyIcon />;
    if (lowerSuggestion.includes('data')) return <DataObjectIcon />;
    if (lowerSuggestion.includes('timeline')) return <TimelineIcon />;
    return <LightbulbIcon />;
  };

  const getSuggestionCategory = (suggestion) => {
    const lowerSuggestion = suggestion.toLowerCase();
    if (lowerSuggestion.includes('trend')) return 'Trend Analysis';
    if (lowerSuggestion.includes('compare')) return 'Comparison';
    if (lowerSuggestion.includes('customer')) return 'Customer Analysis';
    if (lowerSuggestion.includes('inventory')) return 'Inventory';
    if (lowerSuggestion.includes('sales')) return 'Sales';
    if (lowerSuggestion.includes('analysis')) return 'Analysis';
    if (lowerSuggestion.includes('insight')) return 'Insights';
    if (lowerSuggestion.includes('methodology')) return 'Methodology';
    if (lowerSuggestion.includes('data')) return 'Data Analysis';
    if (lowerSuggestion.includes('timeline')) return 'Timeline';
    return 'General';
  };

  if (loading) {
    return (
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ 
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            fontWeight: 600
          }}
        >
          AI Suggestions
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

  if (!suggestions || suggestions.length === 0) {
    return (
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ 
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            fontWeight: 600
          }}
        >
          AI Suggestions
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          No suggestions available. Try changing your query mode or rephrasing your question.
        </Typography>
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
          AI Suggestions
        </Typography>
        <Chip
          label={mode === 'ai' ? 'AI Mode' : 'Local Mode'}
          color={mode === 'ai' ? 'primary' : 'secondary'}
          size={isMobile ? "small" : "medium"}
        />
      </Box>
      <List>
        {suggestions.map((suggestion, index) => (
          <React.Fragment key={index}>
            <ListItem
              component="div"
              onClick={() => handleSuggestionClick(suggestion)}
              sx={{
                borderRadius: '8px',
                mb: { xs: 0.5, sm: 1 },
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                  transform: 'translateX(4px)',
                },
                p: { xs: 1, sm: 1.5 }
              }}
            >
              <ListItemIcon>
                <Box sx={{ 
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: { xs: 32, sm: 40 },
                  height: { xs: 32, sm: 40 },
                  borderRadius: '50%',
                  backgroundColor: `${theme.palette.primary.main}10`,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: `${theme.palette.primary.main}20`,
                    transform: 'scale(1.1)'
                  }
                }}>
                  {getSuggestionIcon(suggestion)}
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography 
                    variant="body1"
                    sx={{ 
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      fontWeight: 500
                    }}
                  >
                    {suggestion}
                  </Typography>
                }
                secondary={
                  <Typography 
                    variant="body2"
                    color="text.secondary"
                    sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}
                  >
                    {getSuggestionCategory(suggestion)}
                  </Typography>
                }
              />
              <IconButton 
                size={isMobile ? "small" : "medium"}
                color="primary"
                sx={{ 
                  '&:hover': {
                    backgroundColor: `${theme.palette.primary.main}10`
                  }
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            </ListItem>
            {index < suggestions.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default AISuggestions; 