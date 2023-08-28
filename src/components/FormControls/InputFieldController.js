import React, { forwardRef } from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from '@mui/material';

const Input = forwardRef(({ name, label,disabled, placeholder, ...otherProps }, ref) => {
  return <TextField name={name} disabled={disabled ? disabled : false} label={label} placeholder={placeholder} inputRef={ref} variant="outlined" fullWidth {...otherProps} />;
});

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string
};

export default function InputFieldController({ name, control, rules, label, placeholder, variant, defaultValue = '', ref, errorPath, ...otherProps }) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { value, ...otherRenderProps }, fieldState: { error } }) => (
        <>
          <Input
            label={label}
            placeholder={placeholder}
            helperText={error?.message}
            variant={!variant ? "outlined" : "standard"}
            error={Boolean(error)}
            value={value === null ? '' : value}
            {...otherProps}
            {...otherRenderProps}
          />
        </>
      )}
    />
  );
}

InputFieldController.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
  ref: PropTypes.object,
  errorPath: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  label: PropTypes.string,
};
