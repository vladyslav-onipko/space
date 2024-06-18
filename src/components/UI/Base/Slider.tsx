import { ComponentPropsWithoutRef, ElementType } from 'react';

import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import Button from '../../UI/Base/Button';
import InfoBlock from '../../UI/Helpers/InfoBlock';

import generateNumber from '../../../utils/helpers/generate-number';

const SliderWrapper = styled.div`
  padding-top: 70px;
  position: relative;
  width: 100%;

  @media (max-width: 767px) {
    padding-top: 0;
  }
`;

const SwiperContainer = styled(Swiper)`
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

const SlideWrapper = styled(SwiperSlide)`
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

interface SliderProps extends ComponentPropsWithoutRef<'div'> {
  items: { [key: string]: any }[];
  slideItem: ElementType;
  slidesPerView?: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
}

const Slider: React.FC<SliderProps> = ({ items, slidesPerView, slideItem, ...props }) => {
  const navButtonIndex = generateNumber();
  const Component = slideItem;

  if (!items.length) {
    return <InfoBlock />;
  }

  return (
    <SliderWrapper {...props}>
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
      <SwiperContainer
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
        {items.map((item) => {
          return (
            <SlideWrapper key={item.id}>
              <Component item={item} />
            </SlideWrapper>
          );
        })}
      </SwiperContainer>
    </SliderWrapper>
  );
};

export default Slider;
