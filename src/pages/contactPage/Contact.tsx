import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import ControlledInput from './components/Controller';
import SnackbarAlert from './components/SnackBar';
import PageButton from '../../components/PageButton';
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
  const { t } = useTranslation();
  const { handleSubmit, control, reset, formState: { errors } } = useForm();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onSubmit = (data: any) => {
    localStorage.setItem('contactForm', JSON.stringify(data));
    setOpenSnackbar(true);
    reset();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
      }}
      className="max-w-md mx-auto mt-12 p-6 rounded-lg bg-gray-800 text-white shadow-lg"
    >
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{ color: '#FBFBFB' }}
        className="text-2xl font-semibold text-center mb-4"
      >
        {t('contactUs')}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <ControlledInput
          name="name"
          control={control}
          label={t('characterDetails.name')}
          rules={{ required: t('nameRequired') }}
        />
        <ControlledInput
          name="email"
          control={control}
          label={t('email')}
          rules={{
            required: t('emailRequired'),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t('invalidEmail'),
            },
          }}
        />
        <ControlledInput
          name="message"
          control={control}
          label={t('message')}
          rules={{ required: t('messageRequired') }}
          multiline
          rows={4}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
          }}
          className="flex justify-center mt-4"
        >
          <PageButton
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            {t('submit')}
          </PageButton>
        </Box>
      </form>

      <SnackbarAlert
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message={t('formSubmitted')}
        severity="success"
      />
    </Box>
  );
};

export default ContactForm;
