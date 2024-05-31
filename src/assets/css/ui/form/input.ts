import { css } from 'styled-components';

import hiddenTextStyles from '../../helpers/hiddenText';

import { InputStylesConfig } from '../../../../models/form';

export const inputControlStyles = css`
  flex-grow: 1;
  margin-bottom: 30px;
  position: relative;
  width: 100%;
`;

export const defaultInputStyles = css<InputStylesConfig>`
  background-color: var(--color-white);
  border: 1px solid var(--color-1--3);
  color: var(--color-1--3);
  display: ${({ $hiddenInput }) => ($hiddenInput ? 'none' : 'block')};
  font-size: 1.6rem;
  margin: 0;
  min-height: 30px;
  overflow: hidden;
  padding: 0.81em 2em 0.81em 1.25em;
  width: 100%;

  &::placeholder {
    color: var(--color-4--4);
    font-style: italic;
    font-size: 1.4rem;
  }

  &:focus {
    box-shadow: 0px 0px 23px -3px rgba(45, 50, 80, 0.5);
    outline: 1px solid var(--color-1--3);
    outline-offset: 0;
  }
`;

export const inputLabelStyles = css<InputStylesConfig>`
  color: var(--color-1--3);
  cursor: pointer;
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 5px;
  ${({ $label }) => ($label ? hiddenTextStyles : null)};
`;

export const inputHelperTextStyles = css<InputStylesConfig>`
  color: ${({ $required }) => ($required ? 'var(--color-3--1)' : 'var(--color-4--4)')};
  font-size: 1.4rem;
  font-weight: 600;
  margin-left: 5px;
`;
