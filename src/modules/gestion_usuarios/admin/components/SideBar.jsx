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
// import {img} from '../imgs/';

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
    <Box
      sx={{
        bgcolor: '#303030',
        height: '100%',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        component="img"
        sx={{
            height: '130px',
            width: '100px',
            alignSelf: 'center',
            margin: '10px 0',
            justifySelf: 'center',
        }}
        alt="Logo de la clínica San José"
        // src="../imgs/logo2.png"
        src="/src/modules/gestion_usuarios/admin/imgs/logo2.png"
      />
      <Divider sx={{ bgcolor: 'white', width: '80%', alignSelf: 'center' }} />

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
                cursor: 'pointer',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

    </Box>
  );

  return (
    <>
      <Box sx={{ display: 'flex', mt: '64px' }}>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, ml: '10px', mt: '9px', position: 'fixed', top: 8, left: 8, zIndex: 1100 }}
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