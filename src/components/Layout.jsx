import React, { useState } from 'react';
import {
  Box,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  IconButton,
  Tooltip,
  Badge,
  Divider,
  ListItemButton,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StorageIcon from '@mui/icons-material/Storage';
import { useSelector } from 'react-redux';
import QueryInput from './QueryInput';
import ResultsDisplay from './ResultsDisplay';
import AISuggestions from './AISuggestions';
import QueryHistory from './QueryHistory';
import App from '../App';
import Analytics from './Analytics';
import DataSources from './DataSources';
import Trends from './Trends';

const DRAWER_WIDTH = 280;

const Layout = () => {
  const theme = useTheme();
  const [selectedSection, setSelectedSection] = useState('home');
  const { queries } = useSelector((state) => state.history);

  const menuItems = [
    { id: 'home', icon: HomeIcon, label: 'Home', badge: 0 },
    { id: 'dashboard', icon: DashboardIcon, label: 'Dashboard', badge: 3 },
    { id: 'analytics', icon: AnalyticsIcon, label: 'Analytics', badge: 0 },
    { id: 'history', icon: HistoryIcon, label: 'Query History', badge: queries.length },
    { id: 'data', icon: StorageIcon, label: 'Data Sources', badge: 0 },
    { id: 'trends', icon: TrendingUpIcon, label: 'Trends', badge: 2 },
  ];

  const renderContent = () => {
    switch (selectedSection) {
      case 'home':
        return (
          <>
            <QueryInput />
            <Box sx={{ mt: 3 }}>
              <ResultsDisplay />
              <AISuggestions />
            </Box>
          </>
        );
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <Analytics />;
      case 'history':
        return <QueryHistory />;
      case 'data':
        return <DataSources />;
      case 'trends':
        return <Trends />;
      default:
        return null;
    }
  };

  const renderMenuItem = (item) => {
    const Icon = item.icon;
    const isSelected = selectedSection === item.id;

    return (
      <ListItem
        key={item.id}
        disablePadding
        sx={{ mb: 0.5 }}
      >
        <ListItemButton
          selected={isSelected}
          onClick={() => setSelectedSection(item.id)}
          sx={{
            borderRadius: 1,
            '&.Mui-selected': {
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            },
          }}
        >
          <ListItemIcon sx={{ color: isSelected ? 'white' : 'grey.500', minWidth: 40 }}>
            <Icon />
          </ListItemIcon>
          <ListItemText 
            primary={item.label}
            sx={{ 
              '& .MuiListItemText-primary': {
                color: isSelected ? 'white' : 'grey.300',
                fontWeight: isSelected ? 600 : 400,
              }
            }}
          />
          {item.badge > 0 && (
            <Badge
              badgeContent={item.badge}
              color="secondary"
              sx={{
                '& .MuiBadge-badge': {
                  right: -3,
                  top: 13,
                  border: `2px solid ${theme.palette.background.paper}`,
                  padding: '0 4px',
                },
              }}
            />
          )}
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            bgcolor: '#1a1c1e',
            color: 'white',
            borderRight: 'none',
          },
        }}
      >
        {/* Logo */}
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            component="img"
            src="/logo.svg"
            alt="Logo"
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
            Data Query AI
          </Typography>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mx: 2 }} />

        {/* Main Menu */}
        <Box sx={{ px: 2, py: 3 }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              color: 'grey.500', 
              mb: 2, 
              px: 1,
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
            }}
          >
            Main Menu
          </Typography>
          <List>
            {menuItems.map(renderMenuItem)}
          </List>
        </Box>

        {/* Settings */}
        <Box sx={{ mt: 'auto', px: 2, pb: 3 }}>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mb: 2 }} />
          <List>
            <ListItem
              disablePadding
              sx={{ mb: 0.5 }}
            >
              <ListItemButton sx={{ borderRadius: 1 }}>
                <ListItemIcon sx={{ color: 'grey.500', minWidth: 40 }}>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Settings"
                  sx={{ '& .MuiListItemText-primary': { color: 'grey.300' } }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
            >
              <ListItemButton sx={{ borderRadius: 1 }}>
                <ListItemIcon sx={{ color: 'grey.500', minWidth: 40 }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Log Out"
                  sx={{ '& .MuiListItemText-primary': { color: 'grey.300' } }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: '#f5f5f5',
          minHeight: '100vh',
          overflow: 'auto',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: 'white',
            maxWidth: 1200,
            mx: 'auto',
          }}
        >
          {renderContent()}
        </Paper>
      </Box>
    </Box>
  );
};

export default Layout; 