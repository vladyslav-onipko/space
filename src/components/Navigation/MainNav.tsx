import styled from 'styled-components';

import NavList from './NavList';

import DUMMY_LINKS from '../../utils/helpers/nav-links';

const Navigation = styled.nav`
  @media (max-width: 1279px) {
    display: none;
  }
`;

const MainNav: React.FC = () => {
  return (
    <Navigation role="navigation">
      <NavList items={DUMMY_LINKS} />
    </Navigation>
  );
};

export default MainNav;
