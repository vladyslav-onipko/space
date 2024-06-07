import { useState } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loader from '../../components/UI/Helpers/Loader';
import Section from '../../components/UI/Base/Section';
import Container from '../../components/UI/Base/Container';
import HeroImage from '../../components/Hero/HeroImage';
import ErrorBlock from '../../components/UI/Helpers/ErrorBlock';
import DropdownButton from '../../components/UI/Base/DropdownButton';
import Button from '../../components/UI/Base/Button';
import Map from '../../components/UI/Base/Map';
import Modal from '../../components/UI/Base/Modal';
import Link from '../../components/UI/Base/Link';

import useAppSelector from '../../hooks/app-selector';
import useAppDispatch from '../../hooks/app-dispatch';
import { getRocket, editRocket, deleteRocket } from '../../utils/http/rockets';
import { rocketRouts } from '../../router/routs';
import { showNotification } from '../../store/notification/notification-slice';
import { userRouts } from '../../router/routs';

const RocketWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const RocketPicture = styled.picture`
  border-radius: 10px;
  overflow: hidden;
  width: 50%;
`;

const RocketContent = styled.article`
  height: 700px;
  min-height: 700px;
  overflow: auto;
  padding: 0 50px;
  width: 50%;
`;

const RocketContentWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 40px;
  }
`;

const RocketContentText = styled.p`
  color: var(--color-4--5);
  font-size: 2rem;
`;

const RocketContentIcon = styled.span`
  display: inline-block;
  margin-right: 15px;
`;

const RocketContentTags = styled.div`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
`;

const RocketContentTag = styled.p`
  align-items: center;
  background-color: var(--color-2--1);
  border-radius: 10px;
  color: var(--color-1--3);
  display: flex;
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 5px;
  padding: 5px 15px;
  width: fit-content;
`;

const RocketHeader = styled.header`
  align-items: flex-start;
  display: flex;
  margin-bottom: 40px;
  position: relative;
`;

const RocketHeaderTag = styled.span<{ $isShared: boolean }>`
  background-color: ${({ $isShared }) => ($isShared ? 'var(--color-green-dark)' : 'var(--color-red-dark)')};
  border-radius: 10px;
  color: var(--color-white);
  margin: 0 25px;
  padding: 5px 15px;
`;

const RocketTitle = styled.h3`
  color: var(--color-1--3);
  font-size: 4.5rem;
  line-height: 1;
`;

const RocketDescription = styled(RocketContentWrapper)`
  border: 1px solid var(--color-4--5);
  border-radius: 10px;
  padding: 15px;
`;

const RocketContentTitle = styled.h4`
  color: var(--color-1--3);
  font-size: 2.2rem;
  margin-bottom: 20px;
`;

const RocketAuthorContent = styled.div`
  display: flex;
`;

const RocketAuthorPicture = styled.picture`
  border-radius: 10px;
  display: block;
  height: 150px;
  margin-right: 20px;
  overflow: hidden;
  width: 140px;
`;

const RocketMapContainer = styled.div`
  height: 400px;
  width: 100%;
`;

const ModalContentText = styled.p`
  color: var(--color-red-dark);
  font-size: 2.5rem;
  text-align: center;
`;

const RocketDetail: React.FC = () => {
  const [showRemoveRocketModal, setShowRemoveRocketModal] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  const { id: rocketId } = useParams();

  const queryKey = ['rockets', rocketId];
  const profileRoute = userRouts.PROFILE.replace(':id', user.id);

  const { data, isSuccess, isPending, isError, error } = useQuery({
    queryKey,
    queryFn: ({ signal }) => getRocket({ signal, rocketId: rocketId! }),
  });

  const { mutate: shareRocket } = useMutation({
    mutationFn: editRocket,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey });
      dispatch(showNotification({ message: data.message, status: 'success' }));
    },
    onError(error) {
      dispatch(showNotification({ message: error.message, status: 'error' }));
    },
  });

  const { mutate: removeRocket, isPending: isRemoving } = useMutation({
    mutationFn: deleteRocket,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey });
      dispatch(showNotification({ message: data.message, status: 'success' }));
      navigate(profileRoute, { replace: true });
    },
    onError(error) {
      dispatch(showNotification({ message: error.message, status: 'error' }));
    },
  });

  const isAuthorized = user.id === data?.rocket.creator.id;

  const handleShareRocket = () => {
    shareRocket({
      rocketData: {},
      rocketId: rocketId!,
      shared: !data?.rocket.shared,
      token: token!,
    });
  };

  const handleRemoveRocket = () => {
    removeRocket({ rocketId: rocketId!, token: token! });
  };

  const handleShowRemoveRocketModal = () => {
    setShowRemoveRocketModal((show) => !show);
  };

  let content;

  if (isPending) {
    content = <Loader />;
  }

  if (isError && !isPending) {
    content = <ErrorBlock message={error.message} />;
  }

  if (isSuccess && data && !isPending) {
    const formatedDate = new Date(data.rocket.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    content = (
      <RocketWrapper>
        <RocketPicture>
          <img src={`${process.env.REACT_APP_BACKEND_URL}/${data.rocket.image}`} alt={data.rocket.title} />
        </RocketPicture>
        <RocketContent>
          <RocketHeader>
            <RocketTitle>{data.rocket.title}</RocketTitle>
            {isAuthorized && (
              <RocketHeaderTag $isShared={data.rocket.shared}>
                {data.rocket.shared ? 'shared' : 'not shared'}
              </RocketHeaderTag>
            )}
            {isAuthorized && (
              <DropdownButton
                title="more"
                text="more rocket actions"
                icon={['fas', 'ellipsis-vertical']}
                mode="secondary"
                onlyIcon
              >
                <ul>
                  <li>
                    <Button
                      text="edit"
                      icon={['far', 'pen-to-square']}
                      onClick={() => navigate(rocketRouts.EDIT_ROCKET)}
                    />
                  </li>
                  <li>
                    <Button
                      text={data.rocket.shared ? 'unshare' : 'share'}
                      icon={['far', 'share-square']}
                      onClick={handleShareRocket}
                    />
                  </li>
                  <li>
                    <Button text="delete" icon={['far', 'trash-can']} onClick={handleShowRemoveRocketModal} />
                  </li>
                </ul>
              </DropdownButton>
            )}
          </RocketHeader>
          <RocketDescription>
            <RocketContentTitle>Overview</RocketContentTitle>
            <RocketContentText>{data.rocket.description}</RocketContentText>
          </RocketDescription>
          <RocketContentWrapper>
            <RocketContentTitle>Author</RocketContentTitle>
            <RocketAuthorContent>
              <RocketAuthorPicture>
                <img src={`${process.env.REACT_APP_BACKEND_URL}/${data.rocket.creator.image}`} alt="Rocket author" />
              </RocketAuthorPicture>
              <RocketContentTags>
                <RocketContentTag>
                  <RocketContentIcon>
                    <FontAwesomeIcon icon={['fas', 'user-astronaut']} />
                  </RocketContentIcon>{' '}
                  {data.rocket.creator.name}
                </RocketContentTag>
                <RocketContentTag>
                  <RocketContentIcon>
                    <FontAwesomeIcon icon={['fas', 'rocket']} />
                  </RocketContentIcon>
                  {data.userRocketsAmount}
                </RocketContentTag>
                <RocketContentTag>
                  <RocketContentIcon>
                    <FontAwesomeIcon icon={['fas', 'star']} />
                  </RocketContentIcon>
                  {data.userRating}
                </RocketContentTag>
              </RocketContentTags>
            </RocketAuthorContent>
          </RocketContentWrapper>
          <RocketContentWrapper>
            <RocketContentTitle>Location</RocketContentTitle>
            <RocketMapContainer>
              <Map center={data.rocket.location} markerTitle={data.rocket.address} />
            </RocketMapContainer>
          </RocketContentWrapper>
          <RocketContentWrapper>
            <RocketContentTitle>Details</RocketContentTitle>
            <RocketContentTags>
              <RocketContentTag>
                <RocketContentIcon>
                  <FontAwesomeIcon icon={['far', 'heart']} />
                </RocketContentIcon>
                {`${data.rocket.likesAmount} like${data.rocket.likesAmount > 1 ? 's' : ''}`}
              </RocketContentTag>
              <RocketContentTag>
                <RocketContentIcon>
                  <FontAwesomeIcon icon={['far', 'clock']} />
                </RocketContentIcon>
                {formatedDate}
              </RocketContentTag>
            </RocketContentTags>
          </RocketContentWrapper>
          <RocketContentWrapper>
            <Link text="see all user places" type="router-link" to="/" />
          </RocketContentWrapper>
        </RocketContent>
      </RocketWrapper>
    );
  }

  return (
    <>
      <HeroImage title="Rocket detail" />
      <Section hiddenTitle="Rocket detail">
        <Container size="lg">{content}</Container>
      </Section>
      <Outlet />
      {showRemoveRocketModal && (
        <Modal
          title="Deleting rocket"
          showModal={showRemoveRocketModal}
          onShowModal={handleShowRemoveRocketModal}
          actions={
            <Button
              text={isRemoving ? 'deleting...' : 'delete'}
              disabled={isRemoving}
              mode="secondary"
              onClick={handleRemoveRocket}
            />
          }
        >
          <ModalContentText>Are you sure you want to remove the place ?</ModalContentText>
        </Modal>
      )}
    </>
  );
};

export default RocketDetail;
