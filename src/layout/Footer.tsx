import { styled } from 'styled-components';

import logo from '../assets/img/logo-footer.svg';

import Container from '../components/UI/Base/Container';
import Link from '../components/UI/Base/Link';

const FooterBlock = styled.footer`
  background-color: var(--color-1--2);
  padding: 50px 0;
  position: relative;

  @media (max-width: 1279px) {
    padding: 25px 0;
  }
`;

const FooterWrapper = styled.div`
  width: 100%;
`;

const FooterRow = styled.div`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 1279px) {
    align-items: center;
    flex-direction: column;
    justify-content: center;

    & > * {
      margin-bottom: 20px;
    }
  }
`;

const FooterLogo = styled.div`
  display: inline-block;
`;

const FooterLogoImg = styled.img`
  display: block;
  height: auto;
  max-width: 100%;
`;

const ContactInfo = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SocialLinksList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const SocialLinksItem = styled.li`
  margin: 0 0 5px 0;
  padding: 0 6px;
`;

const EmailLink = styled(Link)`
  border-color: var(--color-white);
  color: var(--color-white);
  margin-bottom: 20px;

  svg path {
    fill: var(--color-white);
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterBlock role="contentinfo">
      <FooterWrapper>
        <Container>
          <FooterRow>
            <FooterLogo>
              <FooterLogoImg src={logo} alt="" />
            </FooterLogo>
            <ContactInfo>
              <EmailLink
                type="anchor"
                href="mailto:v.onipko.v.com"
                text="contact me"
                mode="default"
                icon={['fas', 'at']}
              />
              <SocialLinksList>
                <SocialLinksItem>
                  <Link
                    type="anchor"
                    mode="primary"
                    text="github"
                    href="https://github.com/vladyslav-onipko"
                    icon={['fab', 'github']}
                    tooltipContent="github"
                    target="_blank"
                    onlyIcon
                  />
                </SocialLinksItem>
                <SocialLinksItem>
                  <Link
                    type="anchor"
                    mode="primary"
                    text="linkedin"
                    href="https://www.linkedin.com/in/vladislav-onipko/"
                    icon={['fab', 'linkedin-in']}
                    tooltipContent="linkedin"
                    target="_blank"
                    onlyIcon
                  />
                </SocialLinksItem>
              </SocialLinksList>
            </ContactInfo>
            <Link
              type="anchor"
              href="Vladyslav-Onipko-Full-Stack.pdf"
              text="download CV"
              mode="primary"
              icon={['fas', 'download']}
              download
            />
          </FooterRow>
        </Container>
      </FooterWrapper>
    </FooterBlock>
  );
};

export default Footer;
