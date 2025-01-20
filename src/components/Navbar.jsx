import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerOpen(open);
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Search', to: '/search' },
    { label: 'Character Table', to: '/table' },
    { label: 'Contact', to: '/contact' },];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#2E2E2E',
          color: '#FBFBFB',
        }}>

        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>

          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', cursor: 'pointer' }}
            component={NavLink}
            to="/"
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}>
            StarWars App
          </Typography>

          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}>
              <Box
                sx={{
                  width: 250,
                  backgroundColor: '#2E2E2E',
                  height: '100%',
                }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}>
                <List>
                  {navLinks.map((item) => (
                    <ListItem
                      button
                      key={item.to}
                      component={NavLink}
                      to={item.to}
                      sx={{
                        color: '#FBFBFB',
                        textTransform: 'none',
                        '&.active': {
                          color: '#BE3144',
                          fontWeight: 'bold',
                        },
                      }}>
                      <ListItemText primary={item.label} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}>
            {navLinks.map((item) => (
              <Button
                key={item.to}
                component={NavLink}
                to={item.to}
                sx={{
                  color: '#FBFBFB',
                  textTransform: 'none',
                  '&.active': {
                    color: '#BE3144',
                    fontWeight: 'bold',
                  },
                  '&:hover': {
                    color: '#BE3144',
                  },
                }}>
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
