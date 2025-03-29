import React from 'react';
import { Box, Drawer, Divider, IconButton, Tooltip, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import QueryModeSelector from './QueryModeSelector';
import AISuggestions from './AISuggestions';
import QueryHistory from './QueryHistory';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';

function Sidebar({ open, onToggle, onHistorySelect, isMobile, isTablet }) {
  const theme = useTheme();

  const drawerWidth = {
    xs: '100%',
    sm: open ? 300 : 64,
  };

  const drawerContent = (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      width: { xs: '100%', sm: open ? 300 : 64 },
      transition: 'width 0.2s ease-in-out'
    }}>
      <Box sx={{ 
        p: { xs: 2, sm: 1 }, 
        display: 'flex', 
        justifyContent: { xs: 'space-between', sm: 'flex-end' },
        alignItems: 'center'
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            display: { xs: 'block', sm: 'none' },
            fontWeight: 600
          }}
        >
          Dashboard
        </Typography>
        <Tooltip title={open ? 'Collapse sidebar' : 'Expand sidebar'}>
          <IconButton 
            onClick={onToggle} 
            size="small"
            sx={{ 
              display: { xs: 'none', sm: 'block' }
            }}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Divider />
      <Box sx={{ p: { xs: 2, sm: 2 } }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <ListItemButton 
            sx={{ 
              mb: 2,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              }
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Home"
              sx={{ 
                display: { xs: 'block', sm: open ? 'block' : 'none' }
              }}
            />
          </ListItemButton>
        </Link>
        
        <QueryModeSelector />
        <AISuggestions />
      </Box>
      <Divider />
      <QueryHistory onHistorySelect={onHistorySelect} />
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onToggle}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: '100%',
            maxWidth: '100%',
            backgroundColor: 'background.paper',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        display: { xs: 'none', sm: 'block' },
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          transition: 'width 0.2s ease-in-out',
          backgroundColor: 'background.paper',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}

export default Sidebar;
