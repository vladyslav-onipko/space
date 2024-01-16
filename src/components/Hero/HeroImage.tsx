import { styled } from 'styled-components';

import astronautIMG from '../../assets/img/astronaut.jpg';

const HeroContainer = styled.section`
    margin-bottom: 65px;
    position: relative;
`;

const HeroPicture = styled.picture`
    display: block;
    position: relative;

    &::before {
        background-color: rgba(30,30,30, 0.6);
        content: '';
        height: 100%;
        position: absolute;
        width: 100%;
    }
`;

const HeroImg = styled.img`
    display: block;
    height: 440px;

    @media (max-width: 1279px) {
        height: 340px;
    }

    @media (max-width: 767px) {
        height: 240px;
    }
`;

const HeroTitlte = styled.h2`
    bottom: 160px;
    color: var(--color-white);
    font-size: 4.8rem;
    font-weight: 800;
    left: 50%;
    position: absolute;
    text-transform: uppercase;
    transform: translateX(-50%);
    z-index: 1;

    @media (max-width: 1279px) {
        bottom: 110px;
        font-size: 3.8rem;
    }

    @media (max-width: 767px) {
        bottom: 80px;
        font-size: 2.5rem;
    }
`;

const HeroImage: React.FC = () => {
    return (
        <HeroContainer>
            <HeroTitlte>Favourites</HeroTitlte>
            <HeroPicture>
                <HeroImg src={astronautIMG} alt='astronaut'/>
            </HeroPicture>
        </HeroContainer>
    );
};

export default HeroImage;