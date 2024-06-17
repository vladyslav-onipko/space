import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import PlaceItem from './PlaceItem';
import Button from '../UI/Base/Button';
import ContentWrapper from '../UI/Helpers/ContentWrapper';

import { PlacesSliderProps } from '../../models/place';
import generateNumber from '../../utils/helpers/generate-number';

const PlacesSliderWrapper = styled.div`
  padding-top: 70px;
  position: relative;
  width: 100%;

  @media (max-width: 767px) {
    padding-top: 0;
  }
`;

const PlacesSwiper = styled(Swiper)`
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

const PlacesSlide = styled(SwiperSlide)`
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

const PlacesSlider: React.FC<PlacesSliderProps> = ({ places, slidesPerView, ...props }) => {
  const navButtonIndex = generateNumber();

  if (!places.length) {
    return (
      <ContentWrapper>
        <DummyText>There are no places now :(</DummyText>
      </ContentWrapper>
    );
  }

  return (
    <PlacesSliderWrapper {...props}>
      <NavWrapper>
        <NavButton
          mode="secondary"
          text="Previous"
          className={`review-swiper-button-prev-${navButtonIndex}`}
          icon={['fas', 'angle-left']}
          onlyIcon
        />
        <NavButton
          mode="secondary"
          text="Next"
          className={`review-swiper-button-next-${navButtonIndex}`}
          icon={['fas', 'angle-right']}
          onlyIcon
        />
      </NavWrapper>
      <PlacesSwiper
        modules={[Navigation, Pagination, A11y]}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: `.review-swiper-button-next-${navButtonIndex}`,
          prevEl: `.review-swiper-button-prev-${navButtonIndex}`,
        }}
        breakpoints={{
          640: { slidesPerView: slidesPerView?.mobile || 1 },
          768: { slidesPerView: slidesPerView?.tablet || 2 },
          1279: { slidesPerView: slidesPerView?.desktop || 3 },
        }}
      >
        {places.map((place) => {
          return (
            <PlacesSlide key={place.id}>
              <PlaceItem place={place} />
            </PlacesSlide>
          );
        })}
      </PlacesSwiper>
    </PlacesSliderWrapper>
  );
};

export default PlacesSlider;
