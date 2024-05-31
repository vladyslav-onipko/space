import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { FormikErrors, FieldHookConfig } from 'formik';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

// default input props

interface DefaultInputProps {
  label: string;
  hiddenLabel?: boolean;
  hiddenInput?: boolean;
  required?: boolean;
  icon?: IconProp;
  onChangePasswordVisibility?: () => void;
}

// form component

export interface FormProps {
  actions: ReactNode;
}

// input component

export interface InputStylesConfig {
  $label?: boolean;
  $hasError?: boolean;
  $hiddenInput?: boolean;
  $required?: boolean;
}

interface InputProps extends DefaultInputProps, ComponentPropsWithoutRef<'input'> {
  inputType?: 'input';
  type: 'text' | 'email' | 'password' | 'file';
}

interface TextareaProps extends DefaultInputProps, ComponentPropsWithoutRef<'textarea'> {
  inputType?: 'textarea';
  type?: never;
}

export type InputPropsType = React.FC & FieldHookConfig<string> & InputProps;

export type TextareaPropsType = React.FC & FieldHookConfig<string> & TextareaProps;

// checkbox component

export interface CheckboxProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  hiddenLabel?: boolean;
  required?: boolean;
  type?: 'checkbox';
}

// image picker component

export interface ImagePickerProps extends ComponentPropsWithoutRef<'div'> {
  name: string;
  id: string;
  label: string;
  required?: boolean;
  imagePath?: string;
  onSetFieldTouched: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<{ image: File }>>;
  onSetFieldValue: (
    field: string,
    value: File,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<{ image: File }>>;
}
