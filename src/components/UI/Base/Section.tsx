import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { styled } from 'styled-components';

import hiddenTextStyles from '../../../assets/css/helpers/hiddenText';

import Title from './Title';

const SectionBlock = styled.section`
  margin-bottom: 100px;
  position: relative;
  width: 100%;

  @media (max-width: 1279px) {
    margin-bottom: 80px;
  }

  @media (max-width: 767px) {
    margin-bottom: 60px;
  }
`;

const HiddenTitle = styled.h2`
  ${hiddenTextStyles};
`;

interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  hiddenTitle?: string;
  title?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(({ title, hiddenTitle, children, ...props }, ref) => {
  return (
    <SectionBlock ref={ref} {...props}>
      {hiddenTitle && <HiddenTitle>{hiddenTitle}</HiddenTitle>}
      {title && <Title tag="h2">{title}</Title>}
      {children}
    </SectionBlock>
  );
});

export default Section;
