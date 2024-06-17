import { ComponentPropsWithoutRef, MouseEvent } from 'react';

import { styled } from 'styled-components';

import Button from '../UI/Base/Button';

const MobileNav = styled.nav`
  @media (min-width: 1279px) {
    display: none;
  }
`;

interface MobileNavToggleProps extends ComponentPropsWithoutRef<'nav'> {
  onShowNav: (e: MouseEvent) => void;
}

const MobileNavToggle: React.FC<MobileNavToggleProps> = ({ onShowNav, ...props }) => {
  return (
    <MobileNav {...props}>
      <Button
        text="Mobile navigation toggle"
        mode="secondary"
        icon={['fas', 'bars']}
        onlyIcon
        onClick={onShowNav}
      ></Button>
    </MobileNav>
  );
};

export default MobileNavToggle;
