import { ComponentPropsWithoutRef } from 'react';

import { css, styled } from 'styled-components';

const defaultContainerStyles = css`
  margin: 0 auto;
  max-width: 1280px;
  padding: 0 20px;
  position: relative;
  width: 100%;

  @media (max-width: 767px) {
    padding: 0 10px;
  }
`;

const ContainerXSmall = styled.div`
  ${defaultContainerStyles};
  max-width: 480px;
`;

const ContainerSmall = styled.div`
  ${defaultContainerStyles};
  max-width: 768px;
`;

const ContainerDefault = styled.div`
  ${defaultContainerStyles};
`;

const ContainerLarge = styled.div`
  ${defaultContainerStyles};
  max-width: 1600px;
`;

const ContainerFluid = styled.div`
  ${defaultContainerStyles};
  max-width: 1920px;
`;

interface ContentWrapperProps extends ComponentPropsWithoutRef<'div'> {
  size?: 'default' | 'lg' | 'sm' | 'xs' | 'fuild';
}

const Container: React.FC<ContentWrapperProps> = ({ size, children, ...props }) => {
  switch (size) {
    case 'xs':
      return <ContainerXSmall {...props}>{children}</ContainerXSmall>;
    case 'sm':
      return <ContainerSmall {...props}>{children}</ContainerSmall>;
    case 'lg':
      return <ContainerLarge {...props}>{children}</ContainerLarge>;
    case 'fuild':
      return <ContainerFluid {...props}>{children}</ContainerFluid>;
  }

  return <ContainerDefault {...props}>{children}</ContainerDefault>;
};

export default Container;
