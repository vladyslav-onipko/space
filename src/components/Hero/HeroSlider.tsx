import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import { useRef } from 'react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { images } from '../../helpers/images';
import { Section } from '../../assets/css/section';
import Button from '../../ui/Button';

import { ReactComponent as ArrowDown } from '../../assets/img/arrow-down.svg';

const HeroSwiper = styled(Swiper)`
    & .swiper-pagination {
        bottom: 270px;
        height: 24px;
        left: 50%;
        position: absolute;
        transform: translateX(calc(-50% - 40px));
        width: auto;

        @media (max-width: 1279px) {
            bottom: 180px;
            transform: translateX(calc(-50% - 28px));
        }

        @media (max-width: 767px) {
            bottom: 75px;
            transform: translateX(-50%);
        }

        & .swiper-pagination-bullet {
            background-color: transparent;
            height: 12px;
            margin: 0 8px;
            position: relative;
            width: 12px;

            &.swiper-pagination-bullet-active {
                background-color: var(--color-white);
            }

            &::before {
                border: 1px solid var(--color-white);
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

const HeroTitle = styled.h2`
    bottom: 130px;
    left: 50%;
    pointer-events: none;
    position: absolute;
    text-align: center;
    transform: translateX(-50%);
    width: 100%;
    z-index: 10;

    @media (max-width: 1279px) {
        bottom: 100px;
    }

    @media (max-width: 767px) {
        bottom: 110px;
    }

    & span {
        color: var(--color-white);
        display: block;
        font-size: 4.8rem;
        font-weight: 800;
        text-transform: uppercase;

        @media (max-width: 1279px) {
            font-size: 2.8rem;
        }

        @media (max-width: 767px) {
            font-size: 1.3rem;
        }

        &:last-child {
            font-size: 31rem;
            line-height: 1;

            @media (max-width: 1279px) {
                font-size: 18.5rem;
            }

            @media (max-width: 767px) {
                font-size: 8.5rem;
            }
        }
    }
`;

const HeroPicture = styled.picture`
    display: block;
    position: relative;

    &::before {
        background-color: rgba(30,30,30, 0.5);
        content: '';
        height: 100%;
        position: absolute;
        width: 100%;
    }
`;

const HeroImage = styled.img`
    display: block;
    height: 740px;

    @media (max-width: 1279px) {
        height: 500px;
    }

    @media (max-width: 767px) {
        height: 360px;
    }
`;


const ButtonAnchor = styled(Button)`
    background-color: transparent;
    bottom: 33px;
    color: var(--color-white);
    left: 50%;
    position: absolute;
    transform: translate(-50%);
    z-index: 10;

    &:hover,
    &:focus {
        background-color: transparent;
        color: var(--color-1--1);
    }

    & span {
        font-family: var(--typo-2);
        font-size: 3.2rem;
        font-weight: 300;
        text-transform: none;

        @media (max-width: 767px) {
            font-size: 2.2rem;
        }
    }

    @media (max-width: 767px) {
        bottom: 0;
        padding: 10px 5px;
    }
`;

const HeroSlider: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);
    const scrollDown = () => {
        window.scrollTo(0, heroRef.current!.scrollHeight);
    };

    return (
        <Section ref={heroRef}>
            <HeroTitle>
                <span>The space is waiting for</span>
                <span>you</span>
            </HeroTitle>
            <ButtonAnchor icon={<ArrowDown />} onClick={scrollDown}>Explore tours</ButtonAnchor>
            <HeroSwiper 
                modules={[Autoplay, Pagination, A11y]}
                slidesPerView={1} 
                pagination={{ clickable: true }}
                autoplay
            >
                {
                    images.map(img => 
                    <SwiperSlide key={img.alt}>
                        <HeroPicture>
                            <HeroImage src={img.path} alt={img.alt} />
                        </HeroPicture>
                    </SwiperSlide>
                    )
                }
            </HeroSwiper>
        </Section>
    );
};

export default HeroSlider;