import { ComponentPropsWithoutRef } from 'react';

import { styled } from 'styled-components';

const FormContainer = styled.div`
  border-radius: 10px;
  display: flex;
  background-color: var(--color-1--3);
  min-height: 700px;

  @media (max-width: 1279px) {
    min-height: 500px;
  }

  @media (max-width: 767px) {
    flex-direction: column-reverse;
  }
`;

const FormContentWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 70px;
  width: 100%;

  & label {
    color: var(--color-2--1);
  }

  & picture {
    border: 1px solid var(--color-2--1);

    & + button {
      &:hover,
      &:focus {
        background-color: var(--color-white);
        border-color: var(--color-white);
        color: var(--color-1--3);
      }
    }
  }

  & input {
    background-color: var(--color-1--2);
    border-color: var(--color-1--2);
    color: var(--color-white);

    &::placeholder {
      color: var(--color-4--3);
    }

    & + span svg path,
    & + button span:last-child svg path {
      fill: var(--color-4--3);
    }
  }

  & button {
    box-shadow: 0px 0px 10px 3px rgba(249, 177, 122, 1);
  }

  @media (max-width: 1279px) {
    padding: 20px;
  }
`;

const FormPicture = styled.picture`
  border-radius: 0 10px 10px 0;
  height: auto;
  overflow: hidden;
  width: 100%;

  @media (max-width: 767px) {
    border-radius: 10px 10px 0 0;
  }
`;

const FormTitle = styled.h3`
  color: var(--color-white);
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 50px;
  text-align: center;
  text-transform: uppercase;
`;

interface FormWrapperProps extends ComponentPropsWithoutRef<'div'> {
  image?: string;
  title: string;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ image, children, title, ...props }) => {
  const Picture = image ? (
    <FormPicture>
      <img src={image} alt="" />
    </FormPicture>
  ) : null;

  return (
    <FormContainer {...props}>
      <FormContentWrapper>
        <>
          <FormTitle>{title}</FormTitle>
          {children}
        </>
      </FormContentWrapper>
      {Picture}
    </FormContainer>
  );
};

export default FormWrapper;
