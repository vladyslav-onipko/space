import { styled } from 'styled-components';

const InfoContainer = styled.div`
  background-color: var(--color-1--3);
  border: 1px solid var(--color-1--3);
  border-radius: 10px;
  box-shadow: 0px 0px 23px -3px rgba(45, 50, 80, 0.5);
  margin: 0 auto;
  padding: 15px 20px;
  text-align: center;
  width: 80%;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const InfoText = styled.p`
  color: var(--color-white);
  font-size: 2rem;

  @media (max-width: 767px) {
    font-size: 1.8rem;
  }
`;

interface InfoBlockProps {
  message?: string;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ message }) => {
  return (
    <InfoContainer>
      <InfoText>
        {message ||
          'Thank you for your patience. There is currently no content available, but new and exciting updates will be coming soon! Please check it later.'}
      </InfoText>
    </InfoContainer>
  );
};

export default InfoBlock;
