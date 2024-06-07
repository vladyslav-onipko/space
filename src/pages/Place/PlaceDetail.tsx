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
import { getPlace, editPlace, deletePlace } from '../../utils/http/places';
import { placeRouts } from '../../router/routs';
import { showNotification } from '../../store/notification/notification-slice';
import { userRouts } from '../../router/routs';
import { ResponseEditPlaceData } from '../../models/places';

const PlaceWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PlacePicture = styled.picture`
  border-radius: 10px;
  overflow: hidden;
  width: 50%;
`;

const PlaceContent = styled.article`
  height: 700px;
  min-height: 700px;
  overflow: auto;
  padding: 0 50px;
  width: 50%;
`;

const PlaceContentWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 40px;
  }
`;

const PlaceContentText = styled.p`
  color: var(--color-4--5);
  font-size: 2rem;
`;

const PlaceContentIcon = styled.span`
  display: inline-block;
  margin-right: 15px;
`;

const PlaceContentTags = styled.div`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
`;

const PlaceContentTag = styled.p`
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

const PlaceHeader = styled.header`
  align-items: flex-start;
  display: flex;
  margin-bottom: 40px;
  position: relative;
`;

const PlaceHeaderTag = styled.span<{ $isShared: boolean }>`
  background-color: ${({ $isShared }) => ($isShared ? 'var(--color-green-dark)' : 'var(--color-red-dark)')};
  border-radius: 10px;
  color: var(--color-white);
  margin: 0 25px;
  padding: 5px 15px;
`;

const PlaceTitle = styled.h3`
  color: var(--color-1--3);
  font-size: 4.5rem;
  line-height: 1;
`;

const PlaceDescription = styled(PlaceContentWrapper)`
  border: 1px solid var(--color-4--5);
  border-radius: 10px;
  padding: 15px;
`;

const PlaceContentTitle = styled.h4`
  color: var(--color-1--3);
  font-size: 2.2rem;
  margin-bottom: 20px;
`;

const PlaceAuthorContent = styled.div`
  display: flex;
`;

const PlaceAuthorPicture = styled.picture`
  border-radius: 10px;
  display: block;
  height: 150px;
  margin-right: 20px;
  overflow: hidden;
  width: 140px;
`;

const PlaceMapContainer = styled.div`
  height: 400px;
  width: 100%;
`;

const ModalContentText = styled.p`
  color: var(--color-red-dark);
  font-size: 2.5rem;
  text-align: center;
`;

const PlaceDetail: React.FC = () => {
  const [showRemovePlaceModal, setShowRemovePlaceModal] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  const { id: placeId } = useParams();

  const queryKey = ['places', placeId];
  const profileRoute = userRouts.PROFILE.replace(':id', user.id);

  const { data, isSuccess, isPending, isError, error } = useQuery({
    queryKey,
    queryFn: ({ signal }) => getPlace({ signal, placeId: placeId! }),
  });

  // need to rewrite to the custom hook
  const { mutate: sharePlace } = useMutation({
    mutationFn: editPlace,
    onMutate: async ({ shared }) => {
      await queryClient.cancelQueries({ queryKey });

      const { place: oldPlace }: ResponseEditPlaceData = queryClient.getQueryData(queryKey)!;
      const updatedPlace = { place: { ...oldPlace, shared } };

      queryClient.setQueryData(queryKey, updatedPlace);

      return { oldPlace };
    },
    onSuccess(data) {
      dispatch(showNotification({ message: data!.message, status: 'success' }));
    },
    onError(error, _, context) {
      queryClient.setQueryData(queryKey, { place: context?.oldPlace });
      dispatch(showNotification({ message: error.message, status: 'error' }));
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const { mutate: removePlace, isPending: isRemoving } = useMutation({
    mutationFn: deletePlace,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey });
      dispatch(showNotification({ message: data.message, status: 'success' }));
      navigate(profileRoute, { replace: true });
    },
    onError(error) {
      dispatch(showNotification({ message: error.message, status: 'error' }));
    },
  });

  const isAuthorized = user.id === data?.place.creator.id;
  console.log(data);

  const handleSharePlace = () => {
    sharePlace({
      placeData: {},
      placeId: placeId!,
      shared: !data?.place.shared,
      token: token!,
    });
  };

  const handleRemovePlace = () => {
    removePlace({ placeId: placeId!, token: token! });
  };

  const handleShowRemovePlaceModal = () => {
    setShowRemovePlaceModal((show) => !show);
  };

  let content;

  if (isPending) {
    content = <Loader />;
  }

  if (isError && !isPending) {
    content = <ErrorBlock message={error.message} />;
  }

  if (isSuccess && data && !isPending) {
    const formatedDate = new Date(data.place.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    content = (
      <PlaceWrapper>
        <PlacePicture>
          <img src={`${process.env.REACT_APP_BACKEND_URL}/${data.place.image}`} alt={data.place.title} />
        </PlacePicture>
        <PlaceContent>
          <PlaceHeader>
            <PlaceTitle>{data.place.title}</PlaceTitle>
            {isAuthorized && (
              <PlaceHeaderTag $isShared={data.place.shared}>
                {data.place.shared ? 'shared' : 'not shared'}
              </PlaceHeaderTag>
            )}
            {isAuthorized && (
              <DropdownButton
                title="more"
                text="more place actions"
                icon={['fas', 'ellipsis-vertical']}
                mode="secondary"
                onlyIcon
              >
                <ul>
                  <li>
                    <Button
                      text="edit"
                      icon={['far', 'pen-to-square']}
                      onClick={() => navigate(placeRouts.EDIT_PLACE)}
                    />
                  </li>
                  <li>
                    <Button
                      text={data.place.shared ? 'unshare' : 'share'}
                      icon={['far', 'share-square']}
                      onClick={handleSharePlace}
                    />
                  </li>
                  <li>
                    <Button text="delete" icon={['far', 'trash-can']} onClick={handleShowRemovePlaceModal} />
                  </li>
                </ul>
              </DropdownButton>
            )}
          </PlaceHeader>
          <PlaceDescription>
            <PlaceContentTitle>Overview</PlaceContentTitle>
            <PlaceContentText>{data.place.description}</PlaceContentText>
          </PlaceDescription>
          <PlaceContentWrapper>
            <PlaceContentTitle>Author</PlaceContentTitle>
            <PlaceAuthorContent>
              <PlaceAuthorPicture>
                <img src={`${process.env.REACT_APP_BACKEND_URL}/${data.place.creator.image}`} alt="Place author" />
              </PlaceAuthorPicture>
              <PlaceContentTags>
                <PlaceContentTag>
                  <PlaceContentIcon>
                    <FontAwesomeIcon icon={['fas', 'user-astronaut']} />
                  </PlaceContentIcon>{' '}
                  {data.place.creator.name}
                </PlaceContentTag>
                <PlaceContentTag>
                  <PlaceContentIcon>
                    <FontAwesomeIcon icon={['fas', 'rocket']} />
                  </PlaceContentIcon>
                  {data.userPlacesAmount}
                </PlaceContentTag>
                <PlaceContentTag>
                  <PlaceContentIcon>
                    <FontAwesomeIcon icon={['fas', 'star']} />
                  </PlaceContentIcon>
                  {data.userRating}
                </PlaceContentTag>
              </PlaceContentTags>
            </PlaceAuthorContent>
          </PlaceContentWrapper>
          <PlaceContentWrapper>
            <PlaceContentTitle>Location</PlaceContentTitle>
            <PlaceMapContainer>
              <Map center={data.place.location} markerTitle={data.place.address} />
            </PlaceMapContainer>
          </PlaceContentWrapper>
          <PlaceContentWrapper>
            <PlaceContentTitle>Details</PlaceContentTitle>
            <PlaceContentTags>
              <PlaceContentTag>
                <PlaceContentIcon>
                  <FontAwesomeIcon icon={['far', 'heart']} />
                </PlaceContentIcon>
                {`${data.place.likes} like${data.place.likes > 1 ? 's' : ''}`}
              </PlaceContentTag>
              <PlaceContentTag>
                <PlaceContentIcon>
                  <FontAwesomeIcon icon={['far', 'clock']} />
                </PlaceContentIcon>
                {formatedDate}
              </PlaceContentTag>
            </PlaceContentTags>
          </PlaceContentWrapper>
          <PlaceContentWrapper>
            <Link text="see all user places" type="router-link" to="/" />
          </PlaceContentWrapper>
        </PlaceContent>
      </PlaceWrapper>
    );
  }

  return (
    <>
      <HeroImage title="Place detail" />
      <Section hiddenTitle="Place detail">
        <Container size="lg">{content}</Container>
      </Section>
      <Outlet />
      {showRemovePlaceModal && (
        <Modal
          title="Deleting place"
          showModal={showRemovePlaceModal}
          onShowModal={handleShowRemovePlaceModal}
          actions={
            <Button
              text={isRemoving ? 'deleting...' : 'delete'}
              disabled={isRemoving}
              mode="secondary"
              onClick={handleRemovePlace}
            />
          }
        >
          <ModalContentText>Are you sure you want to remove the place ?</ModalContentText>
        </Modal>
      )}
    </>
  );
};

export default PlaceDetail;
