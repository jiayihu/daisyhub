import React from 'react';
import { FieldProps, ErrorMessage, getIn } from 'formik';

export const TextInputComponent = ({ field, form: { touched, errors }, ...props }: FieldProps) => {
  return (
    <div>
      <input
        type="text"
        {...field}
        {...props}
        className={
          getIn(touched, field.name) && getIn(errors, field.name)
            ? 'is-invalid form-control'
            : 'form-control'
        }
      />
      <ErrorMessage
        name={field.name}
        className="invalid-feedback"
        render={msg => <div className="invalid-feedback">{msg}</div>}
      />
    </div>
  );
};

export const TextAreaInputComponent = ({
  field,
  form: { touched, errors },
  ...props
}: FieldProps) => {
  return (
    <div>
      <textarea
        {...field}
        {...props}
        className={
          getIn(touched, field.name) && getIn(errors, field.name)
            ? 'is-invalid form-control'
            : 'form-control'
        }
      />
      <ErrorMessage
        name={field.name}
        className="invalid-feedback"
        render={msg => <div className="invalid-feedback">{msg}</div>}
      />
    </div>
  );
};

export const NumberInputComponent = ({
  field,
  form: { touched, errors },
  ...props
}: FieldProps) => {
  return (
    <div>
      <input
        type="number"
        {...field}
        {...props}
        className={
          getIn(touched, field.name) && getIn(errors, field.name)
            ? 'is-invalid form-control'
            : 'form-control'
        }
      />
      <ErrorMessage
        name={field.name}
        className="invalid-feedback"
        render={msg => <div className="invalid-feedback">{msg}</div>}
      />
    </div>
  );
};
