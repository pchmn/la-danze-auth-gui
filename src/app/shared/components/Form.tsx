import React from "react";
import { UseFormMethods } from "react-hook-form";
import { FormField } from "./FormField";

interface FormProps extends React.HTMLAttributes<any> {
  form: UseFormMethods<Record<string, any>> & { onSubmit?: any };
  disabled?: boolean;
}

export function Form({ children, form, disabled, ...otherProps }: FormProps) {

  function childrenWithProps() {
    return React.Children.map(children, child => {
      // Check if child is FormikTextField
      if (React.isValidElement(child) && child.type === FormField) {
        return React.cloneElement(child, {
          control: form.control,
          error: Boolean(form.errors[child.props.name]?.type),
          helperText: form.errors[child.props.name]?.message,
          disabled
        });
      }
      return child;
    });
  }

  return (
    <form {...otherProps}>
      {childrenWithProps()}
    </form>
  );
}