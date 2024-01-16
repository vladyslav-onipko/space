import { styled } from 'styled-components';

import NavItem from "./NavItem";
import { LinksList } from '../../models/Navigation';

const List = styled.ul`
    align-items: center;
    display: flex;
    list-style: none;
`;

const NavList: React.FC<LinksList> = ({ items }) => {
    const links = items.map(link => <NavItem key={link.text} href={link.href} text={link.text} />);

    return <List>{links}</List>
};

export default NavList;