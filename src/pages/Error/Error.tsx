import { styled } from 'styled-components';

import errorIMG from '../../assets/img/404.avif';

import Section from '../../components/UI/Base/Section';
import Header from '../../layout/Header';

const ErrorContainer = styled.div`
  text-align: center;
  padding: 100px 20px 40px;
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
  font-size: 4rem;
  margin-bottom: 25px;
  text-transform: uppercase;

  @media (max-width: 767px) {
    font-size: 3rem;
  }
`;

const ErrorText = styled.p`
  font-size: 2.4rem;
  margin-bottom: 25px;

  @media (max-width: 767px) {
    font-size: 1.8rem;
  }
`;

const Error: React.FC = () => {
  return (
    <>
      <Header />
      <Section>
        <ErrorContainer>
          <ErrorPicture>
            <ErrorImg src={errorIMG} alt="not found" />
          </ErrorPicture>
          <ErrorTitle>404 - page not found</ErrorTitle>
          <ErrorText>
            The server could not locate the page you are looking for. This may be due to a broken link, outdated URL, or
            the page may have been removed or relocated.
          </ErrorText>
        </ErrorContainer>
      </Section>
    </>
  );
};

export default Error;
