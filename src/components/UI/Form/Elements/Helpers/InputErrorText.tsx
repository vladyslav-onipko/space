import { useRef } from 'react';

import { CSSTransition } from 'react-transition-group';
import { styled } from 'styled-components';

import { fadeAnimation } from '../../../../../assets/css/helpers/animations';

const ErrorText = styled.p`
  bottom: -20px;
  color: var(--color-3--1);
  font-size: 1.4rem;
  left: 0;
  margin-top: 5px;
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;

  ${fadeAnimation};
`;

interface InputErrorTextProps {
  show: boolean;
  text: string;
}

const InputErrorText: React.FC<InputErrorTextProps> = ({ show, text }) => {
  const errorTextRef = useRef(null);

  return (
    <CSSTransition nodeRef={errorTextRef} in={show} timeout={200} classNames="fade" mountOnEnter unmountOnExit>
      <ErrorText ref={errorTextRef}>{text}</ErrorText>
    </CSSTransition>
  );
};

export default InputErrorText;
