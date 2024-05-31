import { ComponentPropsWithoutRef } from 'react';

import { styled } from 'styled-components';
import { Form as FormicForm } from 'formik';

import { FormProps } from '../../../models/form';

const FormBlock = styled(FormicForm)`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 100%;
`;

const FormActions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;

  & > *:not(:last-child) {
    margin: 5px;
  }
`;

const Form: React.FC<FormProps & ComponentPropsWithoutRef<'form'>> = ({ actions, children, ...props }) => {
  return (
    <FormBlock {...props}>
      {children}
      <FormActions>{actions}</FormActions>
    </FormBlock>
  );
};

export default Form;
