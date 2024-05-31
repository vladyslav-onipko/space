import { ComponentPropsWithoutRef } from 'react';

import { styled } from 'styled-components';

const AsideBlock = styled.aside`
  border: 1px solid var(--color-1--3);
  border-radius: 4px;
  flex-shrink: 0;
  height: 100%;
  margin-right: 30px;
  min-height: 500px;
  padding: 25px 20px;
  width: 300px;

  @media (max-width: 1279px) {
    margin: 0 20px 30px;
    width: 500px;
  }

  @media (max-width: 767px) {
    margin: 0 0 30px;
    width: 100%;
  }
`;

const Aside: React.FC<React.PropsWithChildren & ComponentPropsWithoutRef<'aside'>> = ({ children, ...props }) => {
  return <AsideBlock {...props}>{children}</AsideBlock>;
};

export default Aside;
