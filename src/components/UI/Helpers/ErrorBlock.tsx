import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ErrorBlockProps {
  title?: string;
  message: string;
}

const ErrorContainer = styled.div`
  background-color: var(--color-red-light);
  border: 3px solid var(--color-red-dark);
  border-radius: 10px;
  margin: 20px auto;
  padding: 20px;
  text-align: center;
  width: fit-content;
`;

const ErrorTitlteWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const ErrorTitle = styled.h2`
  color: var(--color-red-dark);
  font-size: 3.5rem;
  margin-bottom: 15px;

  @media (max-width: 767px) {
    font-size: 2rem;
  }
`;

const ErrorIcon = styled.span`
  margin-left: 10px;

  & svg {
    height: 40px;
    width: 40px;

    @media (max-width: 767px) {
      height: 25px;
      width: 25px;
    }

    & path {
      fill: var(--color-red-dark);
    }
  }
`;

const ErrorMessage = styled.p`
  color: var(--color-1--3);
  font-size: 2.2rem;
  font-style: italic;

  @media (max-width: 767px) {
    font-size: 1.5rem;
  }
`;

const ErrorBlock: React.FC<ErrorBlockProps> = ({ title, message }) => {
  return (
    <ErrorContainer>
      <ErrorTitlteWrap>
        <ErrorTitle>{title || 'Sorry, an error occurred'}</ErrorTitle>
        <ErrorIcon>
          <FontAwesomeIcon icon={['far', 'face-sad-tear']} />
        </ErrorIcon>
      </ErrorTitlteWrap>
      <ErrorMessage>{message || 'Failed to fetch Places. Please, try again later.'}</ErrorMessage>
    </ErrorContainer>
  );
};

export default ErrorBlock;
