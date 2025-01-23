import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import AsciiArt from './components/AsciiArt';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container
      sx={{
        backgroundColor: '#242424',
        color: '#FBFBFB',
      }}
      maxWidth="sm"
      className="mt-20 text-white min-h-screen"
    >
      <Box  className="text-center p-8">
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#872341' }}
        >
          {t('welcome')}
        </Typography>
        <Typography
          variant="body1"
          color="inherit"
          className="text-base"
        >
          {t('description')}
        </Typography>
        <Typography
          component="div"
          color="#DDE5B4"
        >
          <AsciiArt />
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;