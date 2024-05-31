import { styled } from 'styled-components';

const FooterWrapper = styled.div`
  width: 100%;
`;

const Footer: React.FC = () => {
  return (
    <footer role="contentinfo">
      <FooterWrapper></FooterWrapper>
    </footer>
  );
};

export default Footer;
