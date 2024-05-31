import { css } from 'styled-components';

import { ButtonStylesConfig } from '../../../../models/button';

export const disabledButtonStyles = css`
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const buttonTextStyles = css`
  font-family: var(--typo-1);
  pointer-events: none;
`;

export const buttonIconStyles = css<ButtonStylesConfig>`
  display: inline-block;
  height: ${({ $onlyIcon }) => ($onlyIcon ? '30px' : '18px')};
  margin-left: ${({ $onlyIcon }) => ($onlyIcon ? '0' : '5px')};
  pointer-events: none;
  width: ${({ $onlyIcon }) => ($onlyIcon ? '30px' : '18px')};

  & svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;

export const defaultButtonStyles = css<ButtonStylesConfig>`
  align-items: center;
  background-color: transparent;
  border: 1px solid var(--color-1--3);
  border-radius: 4px;
  color: var(--color-1--3);
  cursor: pointer;
  display: flex;
  font-size: 2.4rem;
  font-weight: 700;
  justify-content: center;
  min-height: 50px;
  min-width: ${({ $onlyIcon }) => ($onlyIcon ? '40px' : '150px')};
  padding: 5px 7px;
  text-align: center;
  text-transform: uppercase;
  transition: all 250ms ease-in-out;

  &:hover,
  &:focus {
    background-color: var(--color-1--3);
    border-color: var(--color-1--3);
    color: var(--color-white);

    & svg path {
      fill: var(--color-white);
    }
  }

  & svg path {
    transition: all 250ms ease-in-out;
    fill: var(--color-1--3);
  }

  @media (max-width: 767px) {
    font-size: 1.8rem;
  }
`;

export const secondaryButtonStyles = css`
  ${defaultButtonStyles};
  background-color: var(--color-1--2);
  border-color: var(--color-1--2);
  color: var(--color-white);

  &:hover,
  &:focus {
    background-color: var(--color-1--3);
    border-color: var(--color-1--3);
    color: var(--color-2--1);

    & svg path {
      fill: var(--color-2--1);
    }
  }

  & svg path {
    fill: var(--color-white);
  }
`;

export const primaryButtonStyles = css`
  ${defaultButtonStyles};
  background-color: var(--color-2--1);
  border-color: var(--color-2--1);
  color: var(--color-1--3);

  &:hover,
  &:focus {
    background-color: var(--color-1--3);
    border-color: var(--color-1--3);
    color: var(--color-2--1);

    & svg path {
      fill: var(--color-2--1);
    }
  }

  & svg path {
    fill: var(--color-1--3);
  }
`;
