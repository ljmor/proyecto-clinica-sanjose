import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
  Box,
  Typography,
  Alert,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { FaChartBar, FaUserMd, FaNotesMedical, FaUserInjured } from 'react-icons/fa';
import { LogoutRounded } from '@mui/icons-material';
import { Navigate } from 'react-router-dom';

const menuItems = [
  { text: 'Estadísticas', icon: <FaChartBar /> },
  { text: 'Médicos', icon: <FaUserMd /> },
  { text: 'Enfermería', icon: <FaNotesMedical /> },
  { text: 'Pacientes', icon: <FaUserInjured /> },
];

export const SideBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Médicos');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleItemClick = (text) => {
    if (text !== 'Médicos') {
      alert('En construcción');
    } else {
      setSelectedItem(text);
    }
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const onExit = () => {
    // Implementar el cierre de sesión
    location.reload();
  };

  const drawerContent = (
    <Box sx={{ width: 240, bgcolor: '#303030', height: '100%', color: 'white', overflow: 'hidden', }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 64 }}>
        <Typography variant="h6">LOGO</Typography>
      </Box>
      <Divider sx={{ bgcolor: 'white', width: '80%', margin: '0 20px' }} />
      <List sx={{ overflow: 'hidden' }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleItemClick(item.text)}
            sx={{
              bgcolor: selectedItem === item.text ? 'rgba(176, 205, 111, 0.15)' : 'transparent',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Box
        sx={{
          justifySelf: 'start',
          alignSelf: 'flex-end',
          ml: '10px',
          mt: '30px'
        }}
      >
          <IconButton onClick={onExit} >
            <LogoutRounded sx={{ backgroundColor: '#FFF', borderRadius: '10px', width: '50px'}}/>
          </IconButton>
        </Box>
    </Box>
  );

  return (
    <>
      <Box sx={{ display: 'flex', marginTop: '64px' }}>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, position: 'fixed', top: 8, left: 8, zIndex: 1100 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box
          component="nav"
          sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
        >
          {isMobile ? (
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
              }}
            >
              {drawerContent}
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              sx={{
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
              }}
              open
            >
              {drawerContent}
            </Drawer>
          )}
        </Box>
      </Box>
    </>
  );
}