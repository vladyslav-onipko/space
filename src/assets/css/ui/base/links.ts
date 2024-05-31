import { css } from 'styled-components';

import {
  defaultButtonStyles,
  secondaryButtonStyles,
  primaryButtonStyles,
  buttonTextStyles,
  buttonIconStyles,
} from './buttons';

import { LinkStylesConfig } from '../../../../models/link';

const defaultStyles = css`
  text-decoration: none;

  &.active {
    box-shadow: 0px 0px 15px 5px rgba(249, 177, 122, 1);
  }
`;

export const regularLinkStyles = css`
  color: var(--color-black);
  transition: all 250ms ease-in-out;

  &:hover,
  &:focus {
    color: var(--color-1--2);

    & svg path {
      fill: var(--color-1--2);
    }
  }

  & svg path {
    fill: var(--color-black);
    transition: all 250ms ease-in-out;
  }

  & span:first-child {
    font-size: 1.8rem;
    text-transform: none;
  }
`;

export const linkTextStyles = css<LinkStylesConfig>`
  ${buttonTextStyles};
`;

export const linkIconStyles = css<LinkStylesConfig>`
  ${buttonIconStyles};
`;

export const defaultLinkStyles = css<LinkStylesConfig>`
  ${defaultStyles};
  ${defaultButtonStyles};
`;

export const secondaryLinkStyles = css`
  ${defaultStyles};
  ${secondaryButtonStyles};
`;

export const primaryLinkStyles = css`
  ${defaultStyles};
  ${primaryButtonStyles};
`;
