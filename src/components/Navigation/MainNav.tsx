import NavList from './NavList';
import Routs from '../../models/Routs';
import styled from 'styled-components';

const DUMMY_LINKS = [
    {
        text: 'Home',
        href: Routs.HOME
    },
    {
        text: 'Tours',
        href: Routs.TOURS
    },
    {
        text: 'about',
        href: Routs.ABOUT
    },
    {
        text: 'Help',
        href: Routs.HELP
    }
];

const Navigation = styled.nav`
    @media (max-width: 1279px) {
        background-color: rgba(30, 30, 30, 0.5);
        margin: 10px -16px 0;
        order: 1;
        padding: 3px 0;
        width: calc(100% + 26px);
    }

    @media (max-width: 767px) {
        margin-top: 0;
    }
`

const MainNav: React.FC = () => {
    return (
        <Navigation role='navigation'>
            <NavList items={DUMMY_LINKS} />
        </Navigation>
    );
};

export default MainNav;