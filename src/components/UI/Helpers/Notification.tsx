import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { styled } from 'styled-components';

import useAppDispatch from '../../../hooks/app/app-dispatch';
import useAppSelector from '../../../hooks/app/app-selector';

import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { slideAnimation } from '../../../assets/css/helpers/animations';
import { closeNotification } from '../../../store/notification/notification-slice';

import Button from '../Base/Button';

const NotificationBlock = styled.div<{ $isError: boolean }>`
  background-color: ${({ $isError }) => ($isError ? 'var(--color-red-light)' : 'var(--color-green-light)')};
  bottom: 50px;
  border-radius: 4px;
  min-height: 150px;
  max-width: 500px;
  min-width: 500px;
  overflow: hidden;
  padding: 30px 30px 30px 100px;
  position: fixed;
  right: 10px;
  z-index: 1000;

  ${slideAnimation};

  &::before {
    background-color: ${({ $isError }) => ($isError ? 'var(--color-red)' : 'var(--color-green)')};
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 65px;
  }

  @media (max-width: 767px) {
    max-width: 340px;
    min-width: 340px;
  }
`;

const NotificationCloseBtn = styled(Button)`
  border: none;
  min-height: 30px;
  min-width: 30px;
  padding: 0;
  position: absolute;
  right: 5px;
  top: 5px;

  &:hover,
  &:focus {
    & span:last-child svg path {
      fill: var(--color-white);
    }
  }

  & span:last-child {
    height: 25px;
    width: 25px;

    & svg path {
      fill: var(--color-black);
    }
  }
`;

const NotificationIcon = styled.span`
  position: absolute;
  left: 13px;
  top: 30px;

  & svg {
    height: 40px;
    width: 40px;

    path {
      fill: var(--color-white);
    }
  }
`;

const NotificationTitle = styled.h2<{ $isError: boolean }>`
  font-size: 2.4rem;
  font-weight: 700;
  color: ${({ $isError }) => ($isError ? 'var(--color-red-dark)' : 'var(--color-green-dark)')};
  margin-bottom: 5px;
  text-transform: capitalize;
`;

const NotificationMessage = styled.p`
  color: var(--color-black);
  word-wrap: break-word;
`;

const EXPIRE_TIME = 5000;
let timer: ReturnType<typeof setTimeout>;

const Notification: React.FC = () => {
  const { show, status, message } = useAppSelector((state) => state.notification);
  const notificationBlockRef = useRef(null);
  const dispatch = useAppDispatch();

  const contentIcon: IconProp = status === 'error' ? ['fas', 'circle-exclamation'] : ['fas', 'circle-check'];
  const hasError = status === 'error';

  const handleCloseNotification = () => {
    dispatch(closeNotification());
  };

  useEffect(() => {
    if (show) {
      timer = setTimeout(() => {
        dispatch(closeNotification());
      }, EXPIRE_TIME);

      return () => clearTimeout(timer);
    }
  }, [dispatch, show]);

  return createPortal(
    <CSSTransition nodeRef={notificationBlockRef} in={show} timeout={200} classNames="slide" mountOnEnter unmountOnExit>
      <NotificationBlock ref={notificationBlockRef} $isError={hasError}>
        <NotificationCloseBtn
          mode="default"
          text="Close"
          icon={['fas', 'xmark']}
          title="close"
          onlyIcon
          onClick={handleCloseNotification}
        />
        <NotificationIcon>
          <FontAwesomeIcon icon={contentIcon} />
        </NotificationIcon>
        <NotificationTitle $isError={hasError}>{`${status}!`}</NotificationTitle>
        <NotificationMessage>{message}</NotificationMessage>
      </NotificationBlock>
    </CSSTransition>,
    document.getElementById('notification')!
  );
};

export default Notification;
