import React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { TextField } from '@mui/material';

const ReactSelectController = ({
  control,
  name,
  label,
  options,
  getOptionLabel,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          {...rest}
          options={options}
          getOptionLabel={getOptionLabel}
          isClearable
          isSearchable
          renderInput={(params) => (
            <TextField {...params} label={label} variant="outlined" />
          )}
        />
      )}
    />
  );
};

export default ReactSelectController;
