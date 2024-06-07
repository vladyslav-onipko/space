import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import RocketItem from './RocketItem';
import Button from '../UI/Base/Button';
import ContentWrapper from '../UI/Helpers/ContentWrapper';

import { RocketsSliderProps } from '../../models/rockets';

const RocketsSliderWrapper = styled.div`
  padding-top: 70px;
  position: relative;
  width: 100%;

  @media (max-width: 767px) {
    padding-top: 0;
  }
`;

const RocketsSwiper = styled(Swiper)`
  margin: 0 -12px;

  & .swiper-button-prev,
  & .swiper-button-next {
    background-color: var(--color-4--3);
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
  right: 0;
  top: 0;

  @media (max-width: 767px) {
    justify-content: center;
    margin-bottom: 20px;
    position: static;
  }
`;

const NavButton = styled(Button)`
  min-height: 44px;
  padding: 0;
  min-width: 44px;
`;

const DummyText = styled.p`
  font-size: 2.2rem;
`;

const RocketsSlider: React.FC<RocketsSliderProps> = ({ rockets, slidesPerView, ...props }) => {
  if (!rockets.length) {
    return (
      <ContentWrapper>
        <DummyText>There are no rockets now :(</DummyText>
      </ContentWrapper>
    );
  }

  return (
    <RocketsSliderWrapper {...props}>
      <NavWrapper>
        <NavButton
          mode="secondary"
          text="Previous"
          className="review-swiper-button-prev"
          icon={['fas', 'angle-left']}
          title="Previous"
          onlyIcon
        />
        <NavButton
          mode="secondary"
          text="Next"
          title="Next"
          className="review-swiper-button-next"
          icon={['fas', 'angle-right']}
          onlyIcon
        />
      </NavWrapper>
      <RocketsSwiper
        modules={[Navigation, Pagination, A11y]}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: '.review-swiper-button-next',
          prevEl: '.review-swiper-button-prev',
        }}
        breakpoints={{
          640: { slidesPerView: slidesPerView?.mobile || 1 },
          768: { slidesPerView: slidesPerView?.tablet || 2 },
          1279: { slidesPerView: slidesPerView?.desktop || 3 },
        }}
      >
        {rockets.map((rocket) => {
          return (
            <RocketsSlide key={rocket.id}>
              <RocketItem rocket={rocket} />
            </RocketsSlide>
          );
        })}
      </RocketsSwiper>
    </RocketsSliderWrapper>
  );
};

export default RocketsSlider;
