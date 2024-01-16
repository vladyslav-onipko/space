import { styled } from 'styled-components';

const SpinnerContainer = styled.div`
    display: inline-block;
    height: 80px;
    margin: 10px auto;
    position: relative;
    width: 80px;
`;

const SpinnerBlock = styled.div`
    animation: spinn 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border: 8px solid var(--color-1--1);
    border-radius: 50%;
    border-color: var(--color-1--1) transparent transparent transparent;
    display: block;
    height: 64px;
    left: 50%;
    margin: 8px;
    position: absolute;
    width: 64px;

    &:nth-child(1) {
        animation-delay: -0.45s;
    }

    &:nth-child(2) {
        animation-delay: -0.3s;
    }

    &:nth-child(3) {
        animation-delay: -0.15s;
    }

    @keyframes spinn {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const Spinner: React.FC = () => {
    return (
        <SpinnerContainer>
            <SpinnerBlock></SpinnerBlock>
            <SpinnerBlock></SpinnerBlock>
            <SpinnerBlock></SpinnerBlock>
            <SpinnerBlock></SpinnerBlock>
        </SpinnerContainer>
    );
};

export default Spinner;


