import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { ReactComponent as logo } from '../../assets/img/logo.svg';
import Routs from '../../models/Routs';

const LogoLink = styled(Link)`
    display: block;
    height: 42px;
    width: 230px;

    @media (max-width: 767px) {
        height: 33px;
        width: 180px;
    }
`;

const LogoHeader = styled.h1`
    display: inline-block;
`;

const LogoImage = styled.span`
    align-items: center;
    display: flex;
`;

const LogoSvg = styled(logo)`
    @media (max-width: 767px) {
        height: auto;
        width: 100%;
    }
`;

const Logo: React.FC = () => {
    return <LogoLink to={Routs.HOME}>
        <LogoHeader>
            <LogoImage aria-hidden="true">
                <LogoSvg />
            </LogoImage>
        </LogoHeader>
    </LogoLink>
};

export default Logo;