import { NavLink } from 'react-router-dom';

import { styled } from 'styled-components';

import { NavItem as NavItemProps } from '../../models/navigation';

const ListItem = styled.li`
  @media (max-width: 1279px) {
    margin-bottom: 30px;
  }
`;

const Link = styled(NavLink)`
  color: var(--color-white);
  font-family: var(--typo-2);
  font-size: 1.6rem;
  padding: 4px 16px;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;

  &:hover,
  &:focus,
  &.active {
    &::before {
      opacity: 1;
    }
  }

  &::before {
    background-color: var(--color-white);
    bottom: 0;
    content: '';
    left: 16px;
    height: 1px;
    opacity: 0;
    position: absolute;
    right: 16px;
    transition: opacity 250ms ease-in-out;
  }

  @media (max-width: 1279px) {
    font-size: 2.6rem;
  }
`;

const NavItem: React.FC<NavItemProps> = ({ href, text, ...props }) => {
  return (
    <ListItem {...props}>
      <Link end to={href}>
        {text}
      </Link>
    </ListItem>
  );
};

export default NavItem;
