import React from 'react';
import { FieldProps, ErrorMessage, getIn } from 'formik';
import { Input } from 'reactstrap';

export const FormInput = ({ field, form: { touched, errors }, ...props }: FieldProps<string>) => {
  return (
    <div>
      <Input
        {...field}
        {...props}
        className={getIn(touched, field.name) && getIn(errors, field.name) ? 'is-invalid' : ''}
      />
      <ErrorMessage
        name={field.name}
        className="invalid-feedback"
        render={msg => <div className="invalid-feedback">{msg}</div>}
      />
    </div>
  );
};
