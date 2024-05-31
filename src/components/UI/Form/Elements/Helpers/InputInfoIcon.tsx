import { useRef } from 'react';

import { CSSTransition } from 'react-transition-group';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { InputStylesConfig } from '../../../../../models/form';

const Icon = styled.span<InputStylesConfig>`
  left: -40px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  & svg {
    height: 30px;
    width: 30px;

    & path {
      fill: ${({ $hasError }) => ($hasError ? 'var(--color-3--1)' : 'var(--color-green)')};
    }

    @media (max-width: 1279px) {
      height: 25px;
      width: 25px;
    }
  }

  @media (max-width: 1279px) {
    left: auto;
    right: 5px;
    top: -15px;
  }
`;

interface InputInfoIconProps {
  show: boolean;
}

const InputInfoIcon: React.FC<InputInfoIconProps> = ({ show }) => {
  const infoIconRef = useRef(null);

  const infoIcon: IconProp = show ? ['fas', 'circle-exclamation'] : ['fas', 'circle-check'];

  return (
    <CSSTransition nodeRef={infoIconRef} in={show} timeout={400} classNames="fade" mountOnEnter unmountOnExit>
      <Icon ref={infoIconRef} $hasError={show}>
        <FontAwesomeIcon icon={infoIcon}></FontAwesomeIcon>
      </Icon>
    </CSSTransition>
  );
};

export default InputInfoIcon;
