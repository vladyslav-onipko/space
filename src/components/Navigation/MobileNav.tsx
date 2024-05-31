import { useRef, MouseEvent } from 'react';
import { createPortal } from 'react-dom';

import { styled } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import NavList from './NavList';
import NavActions from './NavActions';
import Button from '../UI/Base/Button';
import Overlay from '../../components/UI/Helpers/Overlay';

import DUMMY_LINKS from '../../utils/helpers/nav-links';
import { slideAnimation } from '../../assets/css/helpers/animations';

const MobileNavBlock = styled.aside`
  background-color: var(--color-1--3);
  height: 100vh;
  display: block;
  left: 0;
  overflow: hidden auto;
  position: fixed;
  padding: 100px 20px 50px;
  top: 0;
  width: 50%;
  z-index: 1000;

  ${slideAnimation};

  @media (max-width: 767px) {
    width: 100%;
  }

  @media (min-width: 1279px) {
    display: none;
  }
`;

const MobileNavActions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 30px;
`;

const MobileNavWrapper = styled.nav`
  @media (max-width: 1279px) {
    margin: 100px 0;
  }
`;

const ModileCloseButton = styled(Button)`
  position: absolute;
  right: 15px;
  top: 15px;
`;

interface MobileNavProps {
  show: boolean;
  onShowNav: (e: MouseEvent) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ show, onShowNav }) => {
  const navRef = useRef(null);
  return createPortal(
    <CSSTransition nodeRef={navRef} in={show} timeout={200} classNames="slide" mountOnEnter unmountOnExit>
      <MobileNavBlock ref={navRef} onClick={onShowNav}>
        <ModileCloseButton
          text="Close navigation"
          mode="secondary"
          icon={['fas', 'xmark']}
          onlyIcon
          onClick={() => onShowNav}
        />
        <MobileNavActions>
          <NavActions />
        </MobileNavActions>
        <MobileNavWrapper role="dialog" aria-modal="true">
          <NavList items={DUMMY_LINKS} />
        </MobileNavWrapper>
        <Overlay show={show} onShow={onShowNav} />
      </MobileNavBlock>
    </CSSTransition>,
    document.getElementById('aside-nav')!
  );
};

export default MobileNav;
