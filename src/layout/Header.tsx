import { useState, MouseEvent } from 'react';

import { styled } from 'styled-components';

import Logo from '../components/Logo/Logo';
import MainNav from '../components/Navigation/MainNav';
import MobileNavToggle from '../components/Navigation/MobileNavToggle';
import MobileNav from '../components/Navigation/MobileNav';
import NavActions from '../components/Navigation/NavActions';

const HeaderWrapper = styled.div`
  background-color: rgba(30, 30, 30, 0.48);
  display: block;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;

const HeaderMain = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 80px;
  margin: 0 auto;
  max-width: 1440px;
  padding: 13px 30px;

  @media (max-width: 1279px) {
    height: 70px;
    padding: 10px;
  }

  @media (max-width: 767px) {
    padding: 5px;
  }
`;

const HeaderActions = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;

  @media (max-width: 1279px) {
    display: none;
  }
`;

const Header: React.FC = () => {
  const [showNav, setShowNav] = useState(false);

  const handleShowNav = (event: MouseEvent) => {
    event.stopPropagation();
    setShowNav((prevState) => !prevState);
  };

  return (
    <HeaderWrapper>
      <HeaderMain role="banner">
        <Logo />
        <MainNav />
        <MobileNav show={showNav} onShowNav={handleShowNav} />
        <HeaderActions>
          <NavActions />
        </HeaderActions>
        <MobileNavToggle onShowNav={handleShowNav} />
      </HeaderMain>
    </HeaderWrapper>
  );
};

export default Header;
