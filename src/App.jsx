import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import store from './store/store';
import QueryInput from './components/QueryInput';
import QueryHistory from './components/QueryHistory';
import ResultsDisplay from './components/ResultsDisplay';
import AISuggestions from './components/AISuggestions';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import { Box, IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: 'clamp(2rem, 5vw, 2.5rem)',
      fontWeight: 500,
    },
    h2: {
      fontSize: 'clamp(1.75rem, 4vw, 2rem)',
      fontWeight: 500,
    },
    h3: {
      fontSize: 'clamp(1.5rem, 3vw, 1.75rem)',
      fontWeight: 500,
    },
    h4: {
      fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
      fontWeight: 500,
    },
    h5: {
      fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
      fontWeight: 500,
    },
    h6: {
      fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/query" element={
              <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                {/* Mobile AppBar */}
                {isMobile && (
                  <AppBar 
                    position="fixed" 
                    sx={{ 
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                      backgroundColor: 'background.paper',
                      color: 'text.primary',
                      boxShadow: 1
                    }}
                  >
                    <Toolbar>
                      <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleSidebarToggle}
                        sx={{ mr: 2 }}
                      >
                        <MenuIcon />
                      </IconButton>
                      <Typography variant="h6" noWrap component="div">
                        Query Dashboard
                      </Typography>
                    </Toolbar>
                  </AppBar>
                )}

                {/* Sidebar */}
                <Sidebar 
                  open={sidebarOpen} 
                  onToggle={handleSidebarToggle}
                  isMobile={isMobile}
                  isTablet={isTablet}
                />

                {/* Main Content */}
                <Box 
                  component="main" 
                  sx={{ 
                    flexGrow: 1, 
                    p: { xs: 1, sm: 2, md: 3 },
                    ml: { 
                      xs: 0,
                      sm: sidebarOpen ? '0px' : '64px'
                    },
                    mt: { xs: '56px', sm: 0 }, // Add top margin for mobile AppBar
                    transition: 'margin-left 0.3s ease-in-out, padding 0.3s ease-in-out',
                    width: { 
                      xs: '100%',
                      sm: `calc(100% - ${sidebarOpen ? '240px' : '64px'})`
                    }
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: { xs: 1, sm: 2, md: 3 },
                    // maxWidth: '100%',
                    overflowX: 'hidden',
                    width: '75vw',
                    ...(isMobile && {
                      width: '100vw'
                    })
                  }}>
                    <QueryInput />
                    
                    <ResultsDisplay />
                    {isMobile && 
                    <QueryHistory /> && 
                    <AISuggestions />}
                  </Box>
                </Box>
              </Box>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
