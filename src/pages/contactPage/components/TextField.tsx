import React, { FC } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

const StyledTextField: FC<TextFieldProps> = (props) => (
  <TextField
    {...props}
    InputLabelProps={{ style: { color: '#FBFBFB' } }}
    InputProps={{ style: { color: '#FBFBFB' } }}
    sx={{
      '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: '#BE3144' },
        '&:hover fieldset': { borderColor: '#872341' },
        '&.Mui-focused fieldset': { borderColor: '#BE3144' },
      },
    }}
  />
);

export default StyledTextField;