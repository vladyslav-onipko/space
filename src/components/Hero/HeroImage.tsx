import { memo } from 'react';

import { styled } from 'styled-components';

import Section from '../UI/Base/Section';

import generateNumber from '../../utils/helpers/generate-number';
import generateWords from '../../utils/helpers/generate-words';

const HeroPicture = styled.picture`
  display: block;
  position: relative;

  &::before {
    background-color: rgba(30, 30, 30, 0.6);
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
  color: var(--color-white);
  font-size: 2.8rem;
  font-weight: 800;
  left: 50%;
  position: absolute;
  text-align: center;
  text-transform: uppercase;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  @media (max-width: 1279px) {
    font-size: 2rem;
  }

  @media (max-width: 767px) {
    font-size: 1.8rem;
  }
`;

const HeroImage: React.FC<{ title: string }> = ({ title }) => {
  const imageId = generateNumber();

  return (
    <Section>
      <HeroTitlte>{title}</HeroTitlte>
      <HeroPicture>
        <source
          srcSet={`${process.env.REACT_APP_IMAGE_SERVICE_URL}/479/240?random=${imageId}`}
          media="(max-width: 479px)"
        />
        <source
          srcSet={`${process.env.REACT_APP_IMAGE_SERVICE_URL}/767/240?random=${imageId}`}
          media="(max-width: 767px)"
        />
        <source
          srcSet={`${process.env.REACT_APP_IMAGE_SERVICE_URL}/1279/340?random=${imageId}`}
          media="(max-width: 1279px)"
        />
        <HeroImg src={`${process.env.REACT_APP_IMAGE_SERVICE_URL}/1920/440?random=${imageId}`} alt={generateWords(3)} />
      </HeroPicture>
    </Section>
  );
};

export default memo(HeroImage);
