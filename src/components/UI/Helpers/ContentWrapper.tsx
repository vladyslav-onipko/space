import { styled } from 'styled-components';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
  text-align: center;
`;

const ContentWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default ContentWrapper;
