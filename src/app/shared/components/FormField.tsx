import React from "react";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";

type NativeInputs = 'input' | 'select' | 'textarea';

type Props = ControllerProps<React.ReactElement | React.ComponentType<any> | NativeInputs, FieldValues> & FormProps;

type FormProps = {
  name: string;
  className?: string;
  label?: string;
  type?: React.InputHTMLAttributes<unknown>['type'];
}

export function FormField({ defaultValue = '', ...props }: Props) {
  return (
    <Controller
      defaultValue={defaultValue}
      fullWidth={true} size="small" variant="outlined"
      {...props}
    />
  );

}