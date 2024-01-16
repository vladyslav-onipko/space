import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';

import { LinkItem } from '../../models/Navigation';

const ListItem = styled.li``;

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
`;

const NavItem: React.FC<LinkItem> = ({ href, text }) => {
    return (
        <ListItem>
            <Link end to={href}>{text}</Link>
        </ListItem>
    );
};

export default NavItem;