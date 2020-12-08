import { StandardTextFieldProps } from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";
import React from "react";

interface FormikTextFieldProps extends StandardTextFieldProps {
  formik: any;
  field: string;
  label: string;
}

export function FormikTextField({ formik, field, label, ...otherProps }: FormikTextFieldProps) {
  return <TextField
    fullWidth
    size="small"
    variant="outlined"
    id={field}
    name={field}
    label={label}
    value={formik.values[field]}
    onChange={formik.handleChange}
    error={formik.touched[field] && Boolean(formik.errors[field])}
    helperText={formik.touched[field] && formik.errors[field]}
    {...otherProps}
  />;
}