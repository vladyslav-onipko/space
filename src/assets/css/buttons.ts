import { css } from 'styled-components';

export const defaulButtonStyles = css`
    align-items: center;
    background-color: var(--color-1--1);
    border: 0;
    color: var(--color-black);
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 12px 34px;
    text-align: center;
    transition: all 250ms ease-in-out;

    &:hover,
    &:focus {
        background-color: var(--color-black);
        color: var(--color-white);
    }

    & svg path {
        transition: all 250ms ease-in-out;
    }

    @media (max-width: 767px) {
        min-height: 45px;
        padding: 10px 17px;
    }
`;

export const secondaryButtonStyles = css`
    background-color: var(--color-gray);
    height: 53px;
    width: 53px;
    padding: 0;

    &:hover,
    &:focus {
        background-color: var(--color-1--1);
    }

    &:disabled {
        background-color: var(--color-2--2);
        pointer-events: none;

        & svg path {
            fill: var(--color-white);
        }
    }
`;

export const defaultLinkStyles = css`
    align-items: center;
    background-color: var(--color-gray);
    display: flex;
    height: 53px;
    justify-content: center;
    transition: all 250ms ease-in-out;
    width: 53px;

    &:hover,
    &:focus {
        background-color: var(--color-1--1);
    }

    @media (max-width: 767px) {
        height: 45px;
        width: 45px;
    }

    &.active {
        background-color: var(--color-2--2);

        & svg path {
            fill: var(--color-white);
        }
    }
`;