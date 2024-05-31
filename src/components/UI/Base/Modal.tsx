import { ComponentPropsWithoutRef, useRef, forwardRef, ReactNode, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import { styled } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Overlay from '../Helpers/Overlay';
import Button from './Button';

import { fadeAnimation } from '../../../assets/css/helpers/animations';

const ModalBlock = styled.div`
  background-color: var(--color-white);
  border: none;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  left: 50%;
  margin: 0;
  max-height: 90%;
  min-height: 500px;
  overflow-y: auto;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  z-index: 1000;

  @media (max-width: 1279px) {
    width: 80%;
  }

  @media (max-width: 767px) {
    width: 90%;
  }

  ${fadeAnimation};
`;

const ModalHeader = styled.header`
  border-bottom: 1px solid var(--color-1--3);
  padding: 30px 50px 30px;
  position: relative;

  @media (max-width: 1279px) {
    padding: 20px 50px 20px 20px;
  }
`;

const ModalTitle = styled.h2`
  color: var(--color-1--3);
  font-size: 3.5rem;
  font-weight: 700;

  @media (max-width: 1279px) {
    font-size: 2.5rem;
  }
`;

const ModalCloseButton = styled(Button)`
  border: none;
  min-height: 40px;
  padding: 0;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 767px) {
    right: 5px;
  }
`;

const ModalContent = styled.div`
  height: 100%;
  overflow: auto;
  padding: 50px;
  width: 100%;

  @media (max-width: 1279px) {
    padding: 20px;
  }
`;

const ModalActions = styled.footer`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;

  & > *:not(:last-child) {
    margin: 5px;
  }
`;

interface ModalProps extends ComponentPropsWithoutRef<'div'> {
  showModal: boolean;
  actions?: ReactNode;
  title: string;
  onShowModal: () => void;
  onAction?: (data?: any) => void;
}

const ModalOverlay = forwardRef<HTMLDivElement, ModalProps>(({ actions, title, onShowModal, children }, ref) => {
  return createPortal(
    <ModalBlock ref={ref} aria-modal="true" role="dialog">
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
        <ModalCloseButton text="close" icon={['fas', 'xmark']} onlyIcon onClick={onShowModal} />
      </ModalHeader>
      <ModalContent>{children}</ModalContent>
      {actions && (
        <ModalActions>
          <Button text="Close" onClick={onShowModal} />
          {actions}
        </ModalActions>
      )}
    </ModalBlock>,
    document.getElementById('modal')!
  );
});

const Modal: React.FC<ModalProps> = (props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { showModal, onShowModal } = props;

  const handleKeyClose = useCallback(
    (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        onShowModal();
      }
    },
    [onShowModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyClose);
    return () => document.removeEventListener('keydown', handleKeyClose);
  }, [handleKeyClose]);

  return (
    <>
      <Overlay show={showModal} onShow={onShowModal} />
      <CSSTransition nodeRef={modalRef} in={showModal} timeout={200} classNames="fade" mountOnEnter unmountOnExit>
        <ModalOverlay ref={modalRef} {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
