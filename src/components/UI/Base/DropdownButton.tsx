import { useRef, useState, useEffect, useCallback } from 'react';

import { styled } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import { fadeAnimation } from '../../../assets/css/helpers/animations';

import Button from './Button';

import { ButtonProps } from '../../../models/button';

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownBlock = styled.div`
  background-color: var(--color-2--1);
  top: 100%;
  border-radius: 5px;
  color: var(--color-1--3);
  font-size: 1.4rem;
  margin-top: 10px;
  min-width: 100%;
  padding: 10px 20px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: all 250ms ease-in-out;
  width: auto;
  z-index: 5;

  ${fadeAnimation};

  ul {
    list-style: none;
  }

  li {
    margin-bottom: 5px;
  }

  button,
  a {
    background-color: transparent;
    border: none;
    flex-direction: row-reverse;
    font-size: inherit;
    text-transform: capitalize;
    min-height: auto;
    min-width: auto;
    padding: 0;

    &:hover,
    &:focus {
      background-color: inherit;
      color: inherit;
      text-decoration: underline;

      span:last-child svg path {
        fill: var(--color-1--3);
      }
    }

    span:last-child {
      height: 14px;
      margin: 0 5px 0;
      width: 14px;
    }
  }

  &::before {
    content: '';
    height: 0;
    position: absolute;
    bottom: 100%;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid var(--color-2--1);
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    z-index: 1;
  }
`;

const DropdownToggle = styled(Button)`
  border-radius: 50%;
  min-width: 50px;
`;

const DropdownButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const handleToggleDropDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowDropdown((prevState) => !prevState);
  };

  const handleKeyClose = useCallback((event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      setShowDropdown(false);
    }
  }, []);

  const handleCloseDropDown = useCallback((event: MouseEvent) => {
    event.stopPropagation();
    setShowDropdown(false);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyClose);
    document.addEventListener('click', handleCloseDropDown);

    return () => {
      document.removeEventListener('keydown', handleKeyClose);
      document.removeEventListener('click', handleCloseDropDown);
    };
  }, [handleKeyClose, handleCloseDropDown]);

  return (
    <DropdownContainer>
      <DropdownToggle aria-expanded={showDropdown} {...props} onClick={handleToggleDropDown} />
      <CSSTransition nodeRef={dropdownRef} in={showDropdown} timeout={200} classNames="fade" mountOnEnter unmountOnExit>
        <DropdownBlock ref={dropdownRef}>{children}</DropdownBlock>
      </CSSTransition>
    </DropdownContainer>
  );
};

export default DropdownButton;
