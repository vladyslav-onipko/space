import { keyframes, css } from 'styled-components';

export const pointerAnimation = keyframes`
    from {
        transform: translateY(-5px);
    }

    to {
        transform: translateY(5px);
    }
`;

export const fadeAnimation = css`
  &.fade-enter {
    opacity: 0;
  }

  &.fade-enter-active {
    opacity: 1;
    transition: opacity 200ms;
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit-active {
    opacity: 0;
    transition: opacity 200ms;
  }
`;

export const slideAnimation = css`
  &.slide-enter {
    opacity: 0;
    transform: translateX(100%);
  }

  &.slide-enter-active {
    opacity: 1;
    transform: translateX(0%);
    transition: opacity 300ms, transform 300ms;
  }

  &.slide-exit {
    opacity: 1;
    transform: translateX(0%);
  }

  &.slide-exit-active {
    opacity: 0;
    transform: translateX(100%);
    transition: opacity 300ms, transform 300ms;
  }
`;

export const modalAnimation = css`
  &.modal-enter {
    opacity: 0;
    transform: translateY(-10rem);
  }

  &.modal-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: all 200ms;
  }

  &.modal-exit {
    opacity: 1;
    transform: translateY(0);
  }

  &.modal-exit-active {
    opacity: 0;
    transform: translateY(-10rem);
    transition: all 200ms;
  }
`;
