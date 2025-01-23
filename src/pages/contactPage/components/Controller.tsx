import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import StyledTextField from './TextField';

interface ControlledInputProps {
  name: string;
  control: any;
  label: string;
  rules: Record<string, any>;
  multiline?: boolean;
  rows?: number;
}

const ControlledInput: FC<ControlledInputProps> = ({
  name,
  control,
  label,
  rules,
  multiline = false,
  rows,
}) => (
  <Controller
    name={name}
    control={control}
    defaultValue=""
    rules={rules}
    render={({ field, fieldState: { error } }) => (
      <StyledTextField
        {...field}
        label={label}
        fullWidth
        margin="normal"
        error={!!error}
        helperText={error?.message}
        multiline={multiline}
        rows={rows}
      />
    )}
  />
);

export default ControlledInput;
