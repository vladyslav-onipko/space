import { styled } from 'styled-components';

import Routs from '../models/Routs';
import Logo from '../components/logo/Logo';
import MainNav from '../components/Navigation/MainNav';
import Button from '../ui/Button';
import { ReactComponent as Heart } from '../assets/img/heart.svg';

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
    padding: 13px 80px;

    @media (max-width: 1279px) {
        flex-wrap: wrap;
        height: auto;
        padding: 10px 10px 0 16px;
    }

    @media (max-width: 767px) {
        padding: 0 0 0 10px;
    }
`;

const HeaderActions = styled.div`
    align-items: center;
    display: flex;
    gap: 12px;

    @media (max-width: 767px) {
        gap: 3px;
    }
`;

const Header: React.FC = () => {
    return (
        <HeaderWrapper>
            <HeaderMain role='banner'>
                <Logo />
                <MainNav />
                <HeaderActions>
                    <Button navLink onlyIcon href={Routs.FAVORITES} hiddenText='favorites' icon={<Heart />}/>
                    <Button link href='/'>Sing in</Button>
                </HeaderActions>
            </HeaderMain>
        </HeaderWrapper>
    )
};

export default Header;