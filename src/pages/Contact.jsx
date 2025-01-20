import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const ContactForm = () => {
  const { handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    localStorage.setItem('contactForm', JSON.stringify(data));
    alert('Form submitted successfully!');
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 5,
        p: 3,
        borderRadius: 2,
        backgroundColor: '#2E2E2E',
        color: '#FBFBFB', 
        boxShadow: 3,
      }}>
      <Typography 
        variant="h4" 
        component="h1" 
        align="center" 
        gutterBottom 
        sx={{ color: '#FBFBFB' }}>
        Contact Us
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
              InputLabelProps={{ style: { color: '#FBFBFB' } }} 
              InputProps={{
                style: { color: '#FBFBFB' }, 
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#BE3144', 
                  },
                  '&:hover fieldset': {
                    borderColor: '#872341',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#BE3144',
                  },
                },
              }}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              InputLabelProps={{ style: { color: '#FBFBFB' } }}
              InputProps={{
                style: { color: '#FBFBFB' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#BE3144',
                  },
                  '&:hover fieldset': {
                    borderColor: '#872341',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#BE3144',
                  },
                },
              }}
            />
          )}
        />
        <Controller
          name="message"
          control={control}
          defaultValue=""
          rules={{ required: 'Message is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Message"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              error={!!errors.message}
              helperText={errors.message?.message}
              InputLabelProps={{ style: { color: '#FBFBFB' } }}
              InputProps={{
                style: { color: '#FBFBFB' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#BE3144',
                  },
                  '&:hover fieldset': {
                    borderColor: '#872341',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#BE3144',
                  },
                },
              }}
            />
          )}
        />
        <Button
          type="submit"
          variant="outlined"
          fullWidth
          sx={{
            color: '#FBFBFB',
            borderColor: '#BE3144',
            '&:hover': {
              backgroundColor: '#872341',
              borderColor: '#700F1C',
            },
          }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ContactForm;
