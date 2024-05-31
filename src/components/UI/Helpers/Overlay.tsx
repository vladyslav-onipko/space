import { createPortal } from 'react-dom';
import { useRef, MouseEvent } from 'react';

import { styled } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const OverlayBlock = styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
`;

interface OverlayProps {
  show: boolean;
  onShow: (e: MouseEvent) => void;
}

const Overlay: React.FC<OverlayProps> = ({ show, onShow }) => {
  const overlayRef = useRef(null);
  const content = (
    <CSSTransition nodeRef={overlayRef} in={show} timeout={200} classNames="fade" mountOnEnter unmountOnExit>
      <OverlayBlock ref={overlayRef} aria-expanded={show} onClick={onShow}></OverlayBlock>
    </CSSTransition>
  );
  return createPortal(content, document.getElementById('overlay')!);
};

export default Overlay;
