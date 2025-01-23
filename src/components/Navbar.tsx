import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import '../utils/i18n';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';


interface NavLinkItem {
  label: string;
  to: string;
}

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent): void => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const navLinks: NavLinkItem[] = [
    { label: t('home'), to: '/' },
    { label: t('search'), to: '/search' },
    { label: t('characterTable'), to: '/table' },
    { label: t('contact'), to: '/contact' },
  ];

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#2E2E2E', color: '#FBFBFB' }}>
        <Toolbar className="flex justify-between items-center">
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', cursor: 'pointer' }}
            component={NavLink}
            to="/"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            StarWars App
          </Typography>

          <Box className="block md:hidden">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{ width: 250, backgroundColor: '#2E2E2E', height: '100%' }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  {navLinks.map((item) => (
                    <ListItem
                      key={item.to}
                      component={NavLink}
                      to={item.to}
                      sx={{
                        color: '#FBFBFB',
                        textTransform: 'none',
                        '&.active': { color: '#BE3144', fontWeight: 'bold' },
                      }}
                    >
                      <ListItemText primary={item.label} />
                    </ListItem>
                  ))}
                </List>
                <Box className="flex justify-center gap-4 mt-4">
                  <Button
                    onClick={() => handleLanguageChange('en')}
                    sx={{
                      color: i18n.language === 'en' ? '#BE3144' : '#FBFBFB',
                      textTransform: 'none',
                      fontWeight: i18n.language === 'en' ? 'bold' : 'normal',
                    }}
                  >
                    EN
                  </Button>
                  <Button
                    onClick={() => handleLanguageChange('lt')}
                    sx={{
                      color: i18n.language === 'lt' ? '#BE3144' : '#FBFBFB',
                      textTransform: 'none',
                      fontWeight: i18n.language === 'lt' ? 'bold' : 'normal',
                    }}
                  >
                    LT
                  </Button>
                </Box>
              </Box>
            </Drawer>
          </Box>

          <Box className="hidden md:flex items-center gap-4">
            {navLinks.map((item) => (
              <Button
                key={item.to}
                component={NavLink}
                to={item.to}
                sx={{
                  color: '#FBFBFB',
                  textTransform: 'none',
                  '&.active': { color: '#BE3144', fontWeight: 'bold' },
                  '&:hover': { color: '#BE3144' },
                }}
              >
                {item.label}
              </Button>
            ))}
            <Box className="flex gap-4 ml-4">
              <Button
                onClick={() => handleLanguageChange('en')}
                sx={{
                  color: i18n.language === 'en' ? '#BE3144' : '#FBFBFB',
                  textTransform: 'none',
                  fontWeight: i18n.language === 'en' ? 'bold' : 'normal',
                }}
              >
                EN
              </Button>
              <Button
                onClick={() => handleLanguageChange('lt')}
                sx={{
                  color: i18n.language === 'lt' ? '#BE3144' : '#FBFBFB',
                  textTransform: 'none',
                  fontWeight: i18n.language === 'lt' ? 'bold' : 'normal',
                }}
              >
                LT
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar />
    </>
  );
};

export default Navbar;
