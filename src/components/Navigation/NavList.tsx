import { styled } from 'styled-components';

import { NavListProps } from '../../models/navigation';

import NavItem from './NavItem';

const List = styled.ul`
  align-items: center;
  display: flex;
  list-style: none;

  @media (max-width: 1279px) {
    flex-direction: column;
  }
`;

const NavList: React.FC<NavListProps> = ({ items, ...props }) => {
  const links = items.map((link) => <NavItem key={link.text} href={link.href} text={link.text} />);

  return <List {...props}>{links}</List>;
};

export default NavList;
