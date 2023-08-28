
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const Input = forwardRef(({ name, ...otherProps }, ref) => {
    return <TextField name={name}  inputRef={ref} variant="outlined" fullWidth {...otherProps} />;
});

Input.propTypes = {
    name: PropTypes.string,
};

export default Input;
