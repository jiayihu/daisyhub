import React from 'react';
import { CustomInput } from 'reactstrap';

type Props = {
  onClick: () => void;
  type: 'checkbox' | 'radio';
  id: string;
  name?: string;
  label?: string;
  defaultChecked?: boolean;
  className?: string;
  invalid?: boolean;
  disabled?: boolean;
};

export const Checkbox = (props: Props) => {
  return <CustomInput {...props} />;
};
