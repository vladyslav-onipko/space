import { FieldHookConfig, useField } from 'formik';
import { styled } from 'styled-components';

import { inputHelperTextStyles, inputControlStyles, inputLabelStyles } from '../../../../assets/css/ui/form/input';

import InputInfoIcon from './Helpers/InputInfoIcon';
import InputErrorText from './Helpers/InputErrorText';

import { CheckboxProps } from '../../../../models/form';
import { InputStylesConfig } from '../../../../models/form';

const InputControl = styled.div`
  ${inputControlStyles};
`;

const InputLabel = styled.label<InputStylesConfig>`
  ${inputLabelStyles};
  margin-bottom: 0;
  padding: 0 0 0 33px;
  position: relative;
  width: fit-content;

  &::before {
    background-color: var(--color-white);
    border: 1px solid var(--color-1--3);
    box-sizing: border-box;
    content: '';
    height: 24px;
    left: 0;
    position: absolute;
    top: -1px;
    width: 24px;
  }

  &::after {
    border-bottom: 4px solid var(--color-4--2);
    border-right: 4px solid var(--color-4--2);
    content: '';
    height: 12px;
    left: 7px;
    position: absolute;
    top: 1px;
    transition: all 250ms ease-in-out;
    transform: rotate(45deg);
    width: 6px;
  }
`;

const Input = styled.input`
  background: transparent;
  border: 0;
  left: -9999px;
  padding: inherit;
  position: absolute;
  width: auto;

  &:disabled + label {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:disabled + label::before {
    background-color: var(--color-4--3);
    border-color: var(--color-4--3);
    cursor: default;
  }

  &:checked + label,
  &:checked:disabled + label {
    &::after {
      display: block;
      opacity: 1;
    }
  }

  &:checked + label::after {
    border-color: var(--color-1--3);
  }

  &:checked:disabled + label::after {
    border-color: transparent var(--color-1--2) var(--color-1--2) transparent;
    color: var(--color-1--2);
  }

  &:focus + label {
    outline: 1px solid rgba(45, 50, 80, 0.5);
    outline-offset: 3px;
  }
`;

const InputHelperText = styled.em<InputStylesConfig>`
  ${inputHelperTextStyles}
`;

const Checkbox: React.FC<CheckboxProps & FieldHookConfig<string>> = ({
  label,
  hiddenLabel,
  required,
  type,
  ...props
}) => {
  const [field, meta] = useField(props);

  const showError = !!(meta.touched && meta.error);

  const helperText = required ? (
    <InputHelperText $required={!!required} aria-hidden="true">
      (required)
    </InputHelperText>
  ) : (
    <InputHelperText aria-hidden="true">(optional)</InputHelperText>
  );

  return (
    <InputControl>
      <Input type={type ? type : 'checkbox'} {...field} {...props} />
      <InputLabel htmlFor={props.id}>
        {label}
        {helperText}
        <InputInfoIcon show={showError} />
      </InputLabel>
      <InputErrorText show={showError} text={meta.error || 'An error occurred, try filling out field again'} />
    </InputControl>
  );
};

export default Checkbox;
