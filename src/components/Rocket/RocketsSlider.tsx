import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Navigation } from 'swiper/modules';
import { useQuery } from '@apollo/client';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Section } from "../../assets/css/section";
import RocketItem from './RocketItem';
import Spinner from '../../ui/Spinner';
import ErrorBlock from '../../ui/ErrorBlock';
import Button from '../../ui/Button';

import { GET_ROCKETS } from '../../query/rockets';
import rocketsState from '../../store/atoms/RocketsState';
import favRocketsState from '../../store/atoms/FavRocketsState';
import { LocalStorageKeys } from '../../models/Rockets';
import totalRockets from '../../store/selectors/TotalRockets';

import { images } from '../../helpers/images';
import { ReactComponent as ArrowRight } from '../../assets/img/arrow-right.svg';
import { ReactComponent as ArrowLeft } from '../../assets/img/arow-left.svg';

const RocketsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;

    @media (max-width: 767px) {
        padding: 0 10px;
    }
`;

const RocketsTitlte = styled.h2`
    color: var(--color-black);
    font-size: 3.2rem;
    font-weight: 800;
    margin-bottom: 40px;
    max-width: calc(100% - 125px);
    text-transform: uppercase;

    @media (max-width: 1279px) {
        font-size: 3rem;
    }

    @media (max-width: 767px) {
        font-size: 2.5rem;
        margin-bottom: 20px;
        max-width: none;
        text-align: center;
    }
`;

const RocketsSwiper = styled(Swiper)`
    margin: 0 -12px;

    & .swiper-button-prev,
    & .swiper-button-next {
        background-color: var(--color-gray);
        height: 44px;
        padding: 10px;
        width: 44px;

        &::after {
            color: var(--color-black);
            font-size: 2.4rem;
        }
    }

    & .swiper-pagination {
        height: 24px;
        margin-top: 40px;
        position: static;

        & .swiper-pagination-bullet {
            background-color: transparent;
            height: 12px;
            margin: 0 8px;
            position: relative;
            width: 12px;

            &.swiper-pagination-bullet-active {
                background-color: var(--color-black);
            }

            &::before {
                border: 1px solid var(--color-black);
                border-radius: 50%;
                content: '';
                height: 22px;
                left: -6px;
                top: -6px;
                position: absolute;
                width: 22px;
            }
        }
    }
`;

const RocketsSlide = styled(SwiperSlide)`
    height: auto;
    padding: 0 12px;
`;

const NavWrapper = styled.div`
    display: flex;
    gap: 16px;
    position: absolute;
    right: 20px;
    top: -4px;

    @media (max-width: 767px) {
        justify-content: center;
        margin-bottom: 20px;
        position: static;
    }
`;

const NavButton = styled(Button)`
    background-color: var(--color-gray);
    height: 44px;
    padding: 0;
    width: 44px;

    &:hover,
    &:focus {
        background-color: var(--color-1--1);
    }

    &:disabled {
        opacity: 0.5;
        pointer-events: none;
    }
`;

const RocketsSlider: React.FC = () => {
    const { data, loading, error } = useQuery(GET_ROCKETS);
    const [rockets, setRockets] = useRecoilState(rocketsState);
    const [favRockets, setFavRockets] = useRecoilState(favRocketsState);
    const hasRockets = useRecoilValue(totalRockets);

    useEffect(() => {
        if (data) {
            const updatedRockets = data.rockets.map((rocket: {}, index: number) => {
                const imageIndex = index >= images.length ? 0 : index;
                return {...rocket, img: images[imageIndex]};
            });
    
            setRockets(updatedRockets);
        }
    }, [data, setRockets]);

    const addFavoriteHandler = (id: string) => {
        const favRocket = rockets.find(r => r.id === id)!;

        setFavRockets((prevRockets) => {
            const updtedRockets = [...prevRockets, favRocket];
            localStorage.setItem(LocalStorageKeys.FAVORITES, JSON.stringify(updtedRockets));

            return updtedRockets;
        });
    };

    let content = (
        <>
            <NavWrapper>
                <NavButton className='review-swiper-button-prev' onlyIcon={true} icon={<ArrowLeft />}>Prev</NavButton>
                <NavButton className='review-swiper-button-next' onlyIcon={true} icon={<ArrowRight />}>Next</NavButton>
            </NavWrapper>
            <RocketsSwiper
                modules={[Navigation, Pagination, A11y]}
                pagination={{ clickable: true }}
                navigation={{
                    nextEl: '.review-swiper-button-next',
                    prevEl: '.review-swiper-button-prev',
                }}
                breakpoints={{
                    640: {slidesPerView: 1},
                    768: {slidesPerView: 2},
                    1279: {slidesPerView: 3}
                }}
            >
                {rockets.map(rocket => {
                    const isFavorite = favRockets.find(r => r.id === rocket.id) ? true : false;
                    return (
                        <RocketsSlide key={rocket.id}>
                            <RocketItem 
                                img={rocket.img}
                                name={rocket.name}
                                description={rocket.description}
                                isFavorite={isFavorite}
                                onAddFavorite={() => addFavoriteHandler(rocket.id)}
                            />
                        </RocketsSlide>
                    );
                })}
            </RocketsSwiper>
        </>
    );

    if (loading) {
        content = <Spinner />;
    }

    if (error) {
        content = <ErrorBlock title='An error occurred' message={error.message}></ErrorBlock>
    }

    if (!loading && !hasRockets) {
        content = <p>There are no Rockets now! Please, try later.</p>
    }

    return (
        <Section>
            <RocketsContainer>
                <RocketsTitlte>Popular tours</RocketsTitlte>
                {content}
            </RocketsContainer>
        </Section>
    );
};

export default RocketsSlider;

