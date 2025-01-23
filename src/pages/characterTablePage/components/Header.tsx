import React from 'react';
import { Typography, Box } from '@mui/material';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        mb: 3,
        color: '#FBFBFB',
      }}
    >
      <Typography variant="h4">{title}</Typography>
    </Box>
  );
};

export default Header;
