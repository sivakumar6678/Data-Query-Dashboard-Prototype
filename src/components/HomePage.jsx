import React from 'react';
import { Box, Typography, Paper, Grid, Button, Container, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimelineIcon from '@mui/icons-material/Timeline';
import AssessmentIcon from '@mui/icons-material/Assessment';

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const features = [
    {
      icon: <QueryStatsIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />,
      title: 'Natural Language Queries',
      description: 'Ask questions in plain English and get instant insights from your data.',
      color: '#1976d2'
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />,
      title: 'Advanced Analytics',
      description: 'Get detailed analysis with charts, metrics, and actionable insights.',
      color: '#2e7d32'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />,
      title: 'Real-time Processing',
      description: 'Process queries instantly and get results in seconds.',
      color: '#ed6c02'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />,
      title: 'Secure & Reliable',
      description: 'Your data is processed securely with enterprise-grade reliability.',
      color: '#9c27b0'
    }
  ];

  const quickStartSteps = [
    {
      icon: <TrendingUpIcon />,
      title: 'Enter Your Query',
      description: 'Type your question in natural language, like "Show me sales trends for the last quarter"',
      color: '#1976d2'
    },
    {
      icon: <TimelineIcon />,
      title: 'Get Instant Results',
      description: 'View comprehensive analysis with charts, metrics, and insights',
      color: '#2e7d32'
    },
    {
      icon: <AssessmentIcon />,
      title: 'Explore Further',
      description: 'Use the interactive charts and filters to dive deeper into your data',
      color: '#ed6c02'
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      width: '100vw',
      overflowX: 'hidden',
      background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`
    }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ 
          py: { xs: 4, sm: 6, md: 8 },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 4, sm: 6, md: 8 }
        }}>
          {/* Hero Section */}
          <Box sx={{ 
            textAlign: 'center', 
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -20,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '4px',
              backgroundColor: 'primary.main',
              borderRadius: '2px'
            }
          }}>
            <Typography 
              variant={isMobile ? 'h3' : 'h2'}
              component="h1" 
              gutterBottom
              sx={{
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                backgroundClip: 'text',
                textFillColor: 'transparent',
                mb: 2,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                lineHeight: 1.2
              }}
            >
              Welcome to Data Query Dashboard
            </Typography>
            <Typography 
              variant={isMobile ? 'body1' : 'h5'}
              color="text.secondary" 
              paragraph
              sx={{ 
                maxWidth: '800px', 
                mx: 'auto', 
                mb: 4,
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                px: { xs: 2, sm: 0 }
              }}
            >
              Transform your data into actionable insights with natural language queries
            </Typography>
            <Button
              variant="contained"
              size={isMobile ? "medium" : "large"}
              onClick={() => navigate('/query')}
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                mt: 2,
                px: { xs: 3, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                borderRadius: '30px',
                textTransform: 'none',
                fontSize: { xs: '0.9rem', sm: '1.1rem' },
                boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px 0 rgba(0,0,0,0.15)'
                }
              }}
            >
              Start Querying
            </Button>
          </Box>

          {/* Features Section */}
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {features.map((feature, index) => (
              <Grid key={index} xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: { xs: 2, sm: 3 },
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'all 0.3s ease-in-out',
                    border: `2px solid ${feature.color}20`,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 8px 24px ${feature.color}20`,
                      borderColor: feature.color
                    }
                  }}
                >
                  <Box sx={{ 
                    color: feature.color, 
                    mb: { xs: 1.5, sm: 2 },
                    p: { xs: 1.5, sm: 2 },
                    borderRadius: '50%',
                    backgroundColor: `${feature.color}10`,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant={isMobile ? "subtitle1" : "h6"}
                    component="h3" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: '1rem', sm: '1.25rem' }
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body2"
                    color="text.secondary"
                    sx={{ 
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Quick Start Guide */}
          <Box>
            <Typography 
              variant={isMobile ? "h5" : "h4"}
              component="h2" 
              gutterBottom
              sx={{ 
                textAlign: 'center',
                mb: { xs: 4, sm: 6 },
                fontWeight: 700,
                color: 'primary.main',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
              }}
            >
              Quick Start Guide
            </Typography>
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {quickStartSteps.map((step, index) => (
                <Grid xs={12} md={4} key={index}>
                  <Paper 
                    sx={{ 
                      p: { xs: 2, sm: 3 },
                      height: '100%',
                      transition: 'all 0.3s ease-in-out',
                      border: `2px solid ${step.color}20`,
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: `0 8px 24px ${step.color}20`,
                        borderColor: step.color
                      }
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: { xs: 1.5, sm: 2 },
                      color: step.color
                    }}>
                      <Box sx={{ 
                        mr: { xs: 1.5, sm: 2 },
                        p: { xs: 0.75, sm: 1 },
                        borderRadius: '50%',
                        backgroundColor: `${step.color}10`
                      }}>
                        {step.icon}
                      </Box>
                      <Typography 
                        variant={isMobile ? "subtitle1" : "h6"} 
                        sx={{ 
                          fontWeight: 600,
                          fontSize: { xs: '1rem', sm: '1.25rem' }
                        }}
                      >
                        {step.title}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body2"
                      color="text.secondary"
                      sx={{ 
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                      }}
                    >
                      {step.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage; 