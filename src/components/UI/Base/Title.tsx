import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { styled, css } from 'styled-components';

export const defaultTitlteStyles = css`
  color: var(--color-black);
  font-size: 3.2rem;
  font-weight: 800;
  margin-bottom: 40px;
  text-transform: uppercase;

  @media (max-width: 1279px) {
    font-size: 3rem;
  }

  @media (max-width: 767px) {
    font-size: 2.5rem;
    margin-bottom: 30px;
    text-align: center;
  }
`;

const TitleElement = styled.h1<{ $mode: TitleMode }>`
  ${({ $mode }) => ($mode === 'default' ? defaultTitlteStyles : null)};
`;

type TitleMode = 'default' | 'secondary';
type TitlteTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

type TitleProps<T extends TitlteTag> = ComponentPropsWithoutRef<T> & {
  tag: T;
  mode?: TitleMode;
  children: ReactNode;
};

const Title = <T extends TitlteTag>({ children, tag, mode, ...props }: TitleProps<T>) => {
  return (
    <TitleElement as={tag} $mode={mode || 'default'} {...props}>
      {children}
    </TitleElement>
  );
};

export default Title;
