import React from 'react';
import { Typography, Box } from '@mui/material';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Box
      className="text-center mb-3"
      sx={{
        color: '#FBFBFB',
      }}
    >
      <Typography variant="h4">{title}</Typography>
    </Box>
  );
};

export default Header;
