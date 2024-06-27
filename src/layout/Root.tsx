import { Outlet, useLocation } from 'react-router-dom';

import { styled } from 'styled-components';
import { Tooltip } from 'react-tooltip';

import Header from './Header';
import Footer from './Footer';
import HeroImage from '../components/Hero/HeroImage';
import HeroSlider from '../components/Hero/HeroSlider';

import Notification from '../components/UI/Helpers/Notification';
import { baseRouts } from '../router/routs';
import quotes from '../utils/helpers/quotes';

const SiteWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
`;

const SiteWrapperHeader = styled.div`
  flex-basis: auto;
  flex-grow: 0;
  position: relative;
  width: 100%;
`;

const SiteWrapperMain = styled.div`
  flex-grow: 1;
  min-height: 1px;
  position: relative;
  width: 100%;
`;

const SiteWrapperFooter = styled.div`
  position: relative;
  flex-basis: auto;
  flex-grow: 0;
  width: 100%;
`;

const Root: React.FC = () => {
  const location = useLocation();
  const randomNumber = Math.floor(Math.random() * (quotes.length - 1 - 1 + 1)) + 1;

  const pageContentTop =
    location.pathname === baseRouts.HOME || location.pathname === `${baseRouts.HOME}/` ? (
      <HeroSlider />
    ) : (
      <HeroImage title={quotes[randomNumber].text} />
    );

  return (
    <SiteWrapper>
      <SiteWrapperHeader>
        <Header />
      </SiteWrapperHeader>
      <SiteWrapperMain>
        <main role="main">
          {pageContentTop}
          <Outlet />
          <Notification />
          <Tooltip id="place-tooltip" style={{ backgroundColor: '#2d3250', zIndex: 9999 }} />
        </main>
      </SiteWrapperMain>
      <SiteWrapperFooter>
        <Footer />
      </SiteWrapperFooter>
    </SiteWrapper>
  );
};

export default Root;
