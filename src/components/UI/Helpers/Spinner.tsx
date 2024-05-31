import { styled } from 'styled-components';

const SpinnerEl = styled.span`
  animation: rotation 1s linear infinite;
  border: 10px solid;
  border-color: var(--color-1--3) transparent;
  border-radius: 50%;
  box-sizing: border-box;
  display: inline-block;
  height: 70px;
  width: 70px;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Spinner: React.FC = () => {
  return <SpinnerEl />;
};

export default Spinner;
