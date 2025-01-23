import React from 'react';
import { Button } from '@mui/material';

interface PageButtonProps {
  isActive?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  sx?: object;
  disabled?: boolean;
  isRound?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const PageButton: React.FC<PageButtonProps> = ({
  isActive = false,
  onClick,
  children,
  variant,
  sx = {},
  disabled = false,
  isRound = false,
}) => (
  <Button
    variant={variant || (isActive ? 'contained' : 'outlined')}
    onClick={onClick}
    disabled={disabled}
    sx={{
      color: '#FBFBFB',
      borderColor: '#BE3144',
      minWidth: '60px',
      height: '32px',
      fontSize: '0.875rem',
      borderRadius: isRound ? '50%' : '4px',
      padding: '8 16px',
      textAlign: 'center',
      textTransform: 'none',
      backgroundColor: isActive ? '#872341' : undefined,
      '&:hover': {
        backgroundColor: '#872341',
        borderColor: '#700F1C',
      },
      ...sx,
    }}
  >
    {children}
  </Button>
);

export default PageButton;
