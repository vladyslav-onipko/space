import { forwardRef, memo } from 'react';

import { styled } from 'styled-components';
import { useField } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  defaultInputStyles,
  inputHelperTextStyles,
  inputControlStyles,
  inputLabelStyles,
} from '../../../../assets/css/ui/form/input';

import Button from '../../Base/Button';
import InputInfoIcon from './Helpers/InputInfoIcon';
import InputErrorText from './Helpers/InputErrorText';

import { InputPropsType, TextareaPropsType, InputStylesConfig } from '../../../../models/form';

const InputControl = styled.div`
  ${inputControlStyles};
`;

const InputWrapper = styled.div`
  position: relative;
`;

const InputLabel = styled.label<InputStylesConfig>`
  ${inputLabelStyles};
`;

const InputEl = styled.input<InputStylesConfig>`
  ${defaultInputStyles};
`;

const Textarea = styled.textarea<InputStylesConfig>`
  ${defaultInputStyles};
  font-family: var(--typo-1);
  overflow-y: auto;
  resize: none;
`;

const InputHelperText = styled.em<InputStylesConfig>`
  ${inputHelperTextStyles};
`;

const InputIcon = styled.span`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);

  & svg path {
    fill: var(--color-1--3);
  }
`;

const InputPasswordBtn = styled(Button)`
  ${InputControl} & {
    border: none;
    box-shadow: unset;
    margin-top: 0;
    min-height: 30px;
    min-width: 30px;
    padding: 0;
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);

    &:hover,
    &:focus {
      background-color: transparent;
      border-color: transparent;
    }

    & span:last-child {
      height: 18px;
      width: 22px;
    }
  }
`;

const Input = forwardRef<HTMLInputElement, InputPropsType | TextareaPropsType>(
  (
    { label, hiddenLabel, hiddenInput, required, icon, inputType, children, onChangePasswordVisibility, ...props },
    ref
  ) => {
    const [field, meta] = useField(props);

    const showError = !!(meta.touched && meta.error);
    const isPassword = !!onChangePasswordVisibility;

    const helperText = required ? (
      <InputHelperText $required={!!required} aria-hidden="true">
        (required)
      </InputHelperText>
    ) : (
      <InputHelperText aria-hidden="true">(optional)</InputHelperText>
    );

    const formElement =
      inputType === 'textarea' ? (
        <Textarea ref={ref} {...field} {...props} />
      ) : (
        <InputEl ref={ref} $hiddenInput={hiddenInput} {...field} {...props} />
      );

    return (
      <InputControl>
        <InputLabel $label={!!hiddenLabel} htmlFor={props.id}>
          {label}
          {helperText}
        </InputLabel>
        <InputWrapper>
          {children}
          {formElement}
          {icon && !isPassword && (
            <InputIcon aria-hidden="true">
              <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
            </InputIcon>
          )}
          {isPassword && (
            <InputPasswordBtn
              text="Change password visibility"
              icon={icon}
              onlyIcon
              title="Change password visibility"
              onClick={onChangePasswordVisibility}
            />
          )}
          <InputInfoIcon show={showError} />
        </InputWrapper>
        <InputErrorText show={showError} text={meta.error || 'An error occurred, try filling out field again'} />
      </InputControl>
    );
  }
);

export default memo(Input);
