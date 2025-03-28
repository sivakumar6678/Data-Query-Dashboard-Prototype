import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Chip,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimelineIcon from '@mui/icons-material/Timeline';
import BarChartIcon from '@mui/icons-material/BarChart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import { setCurrentQuery, submitQuery } from '../store/querySlice';

const suggestions = [
  {
    id: 1,
    type: 'query',
    text: 'Show me sales trends for the last quarter',
    icon: TrendingUpIcon,
    category: 'Trends',
  },
  {
    id: 2,
    type: 'visualization',
    text: 'Create a time series chart for monthly revenue',
    icon: TimelineIcon,
    category: 'Charts',
  },
  {
    id: 3,
    type: 'analysis',
    text: 'Compare performance across regions',
    icon: BarChartIcon,
    category: 'Analysis',
  },
];

const AISuggestions = () => {
  const dispatch = useDispatch();

  const handleSuggestionClick = async (suggestion) => {
    // Set the query text
    dispatch(setCurrentQuery(suggestion.text));
    
    // Submit the query
    try {
      await dispatch(submitQuery(suggestion.text)).unwrap();
    } catch (error) {
      console.error('Failed to execute suggestion:', error);
    }
  };

  // Group suggestions by category
  const groupedSuggestions = suggestions.reduce((acc, suggestion) => {
    if (!acc[suggestion.category]) {
      acc[suggestion.category] = [];
    }
    acc[suggestion.category].push(suggestion);
    return acc;
  }, {});

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <AutoAwesomeIcon sx={{ color: 'primary.main', mr: 1 }} />
        <Typography variant="h6" color="primary">
          AI Suggestions
        </Typography>
      </Box>
      
      <Stack spacing={2}>
        {Object.entries(groupedSuggestions).map(([category, categorySuggestions]) => {
          const Icon = categorySuggestions[0].icon;
          
          return (
            <Accordion
              key={category}
              sx={{
                borderRadius: 2,
                '&:before': {
                  display: 'none',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  bgcolor: 'primary.50',
                  borderRadius: '16px 16px 0 0',
                  '& .MuiAccordionSummary-content': {
                    alignItems: 'center',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Icon color="primary" />
                  <Typography variant="subtitle1" color="primary">
                    {category}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 2 }}>
                <Stack spacing={2}>
                  {categorySuggestions.map((suggestion) => (
                    <Card
                      key={suggestion.id}
                      sx={{
                        borderRadius: 1,
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: (theme) => theme.shadows[4],
                        },
                      }}
                    >
                      <CardContent sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        p: 2,
                        '&:last-child': { pb: 2 },
                      }}>
                        <Typography variant="body1" sx={{ flex: 1 }}>
                          {suggestion.text}
                        </Typography>
                        <Tooltip title="Use this suggestion">
                          <IconButton
                            color="primary"
                            onClick={() => handleSuggestionClick(suggestion)}
                            sx={{
                              '&:hover': {
                                bgcolor: 'primary.50',
                              },
                            }}
                          >
                            <AddCircleIcon />
                          </IconButton>
                        </Tooltip>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Stack>
    </Box>
  );
};

export default AISuggestions; 