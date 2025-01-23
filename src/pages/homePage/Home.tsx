import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import AsciiArt from './components/AsciiArt';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container
      sx={{
        marginTop: '80px',
        backgroundColor: '#242424',
        color: '#FBFBFB',
        minHeight: '100vh',
      }}
      maxWidth="sm"
    >
      <Box sx={{ textAlign: 'center', padding: '2rem' }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#872341' }}>
          {t('welcome')}
        </Typography>
        <Typography variant="body1" color="inherit">
          {t('description')}
        </Typography>
        <Typography component="div" color="#DDE5B4" sx={{ textAlign: 'center', marginTop: '1rem' }}>
          <AsciiArt />
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
