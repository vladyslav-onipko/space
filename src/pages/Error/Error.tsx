import { styled } from 'styled-components';

import errorIMG from '../../assets/img/oops.jpg';

import Section from '../../components/UI/Base/Section';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';

const ErrorSection = styled(Section)`
  margin: 80px 0;

  @media (max-width: 1279px) {
    margin: 70px 0;
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
`;

const ErrorPicture = styled.picture`
  display: block;
  height: 100%;
  width: 100%;
`;

const ErrorImg = styled.img`
  width: 40%;

  @media (max-width: 767px) {
    width: 60%;
  }
`;

const ErrorTitle = styled.h2`
  color: var(--color-1--3);
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 25px;
  text-transform: uppercase;

  @media (max-width: 767px) {
    font-size: 3rem;
  }
`;

const ErrorText = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 25px;

  @media (max-width: 767px) {
    font-size: 1.8rem;
  }
`;

const Error: React.FC = () => {
  return (
    <>
      <Header />
      <ErrorSection>
        <ErrorContainer>
          <ErrorPicture>
            <ErrorImg src={errorIMG} alt="not found" />
          </ErrorPicture>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorText>
            The server encountered an error processing the request. Please try again. Sorry for the trouble :(
          </ErrorText>
        </ErrorContainer>
      </ErrorSection>
      <Footer />
    </>
  );
};

export default Error;
