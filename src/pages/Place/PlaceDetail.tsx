import { useState } from 'react';
import { useParams, useNavigate, Outlet, Link as RouterLink } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
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

import useAppSelector from '../../hooks/app/app-selector';
import { getPlace } from '../../utils/http/places';
import { placeRouts } from '../../router/routs';
import { useSharePlace } from '../../hooks/http/share-place-query';
import { useDeletePlace } from '../../hooks/http/delete-place-query';

const PlaceWrapper = styled.div`
  display: flex;

  @media (max-width: 767px) {
    align-items: center;
    flex-direction: column;
  }
`;

const PlacePicture = styled.picture`
  border-radius: 10px;
  flex-shrink: 0;
  overflow: hidden;
  width: 50%;

  @media (max-width: 1279px) {
    width: 40%;
  }

  @media (max-width: 767px) {
    margin-bottom: 50px;
    width: 60%;
  }

  @media (max-width: 479px) {
    margin-bottom: 25px;
    width: 100%;
  }
`;

const PlaceContent = styled.article`
  height: 700px;
  min-height: 700px;
  overflow: auto;
  padding: 0 50px;
  width: 100%;

  @media (max-width: 1279px) {
    height: 500px;
    min-height: 500px;
    padding: 0 15px;
  }

  @media (max-width: 767px) {
    height: 100%;
    min-height: 100%;
  }
`;

const PlaceContentWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 40px;
  }

  @media (max-width: 1279px) {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
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
  height: 100%;
`;

const PlaceContentTag = styled.p`
  align-items: center;
  background-color: var(--color-2--1);
  border-radius: 10px;
  color: var(--color-1--3);
  display: flex;
  font-size: 2.2rem;
  font-weight: 700;
  margin: 3px 5px;
  padding: 5px 15px;
  width: fit-content;

  @media (max-width: 1279px) {
    font-size: 1.6rem;
    padding: 5px 10px;
  }
`;

const PlaceHeader = styled.header`
  align-items: flex-start;
  display: flex;
  margin-bottom: 40px;
  position: relative;

  @media (max-width: 1279px) {
    margin-bottom: 20px;
  }

  @media (max-width: 479px) {
    flex-direction: column-reverse;
    padding: 50px 0 0;
  }
`;

const PlaceHeaderTag = styled.span<{ $isShared: boolean }>`
  background-color: ${({ $isShared }) => ($isShared ? 'var(--color-green-dark)' : 'var(--color-red-dark)')};
  border-radius: 10px;
  color: var(--color-white);
  margin: 0 25px;
  padding: 5px 15px;

  @media (max-width: 1279px) {
    font-size: 1.6rem;
    margin: 0 20px;
    padding: 5px 10px;
  }

  @media (max-width: 479px) {
    left: 0;
    margin: 0;
    position: absolute;
    top: 0;
  }
`;

const PlaceHeaderTitle = styled.h3`
  color: var(--color-1--3);
  font-size: 4rem;
  line-height: 1;
  word-break: break-all;

  @media (max-width: 1279px) {
    font-size: 2.5rem;
  }
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

  @media (max-width: 1279px) {
    font-size: 1.8rem;
  }
`;

const PlaceAuthorContent = styled.div`
  display: flex;
`;

const PlaceAuthorPicture = styled.picture`
  border-radius: 10px;
  display: block;
  flex-shrink: 0;
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

const TopPlacesList = styled.ul`
  display: flex;
  margin: 0 -5px;

  @media (max-width: 479px) {
    flex-wrap: wrap;
  }
`;

const TopPlaceItem = styled.li`
  margin-bottom: 5px;
  padding: 0 5px;
  width: calc(100% / 3);

  @media (max-width: 479px) {
    width: calc(100% / 2);
  }
`;

const TopPlaceLink = styled(RouterLink)`
  border-radius: 10px;
  display: block;
  overflow: hidden;
  transition: all 250ms ease-in-out;

  &:hover,
  &:focus {
    box-shadow: 0px 0px 20px 0px rgba(249, 177, 122, 1);
  }
`;

const TopPlacePicture = styled.picture`
  display: block;
  height: 150px;
`;

const UserTopPlacesList: React.FC<{ items: { title: string; image: string; id: string }[] }> = ({ items }) => {
  return (
    <TopPlacesList>
      {items.map((item) => (
        <TopPlaceItem key={item.id}>
          <TopPlaceLink title={item.title} to={placeRouts.DETAIL_PLACE.replace(':id', item.id)}>
            <TopPlacePicture>
              <img src={`${process.env.REACT_APP_BACKEND_URL}/${item.image}`} alt={item.title} />
            </TopPlacePicture>
          </TopPlaceLink>
        </TopPlaceItem>
      ))}
    </TopPlacesList>
  );
};

const PlaceDetail: React.FC = () => {
  const [showRemovePlaceModal, setShowRemovePlaceModal] = useState(false);
  const navigate = useNavigate();
  const { user, token } = useAppSelector((state) => state.auth);
  const { id: placeId } = useParams();

  const { data, isSuccess, isPending, isError, error } = useQuery({
    queryKey: ['places', placeId, 'detail'],
    queryFn: ({ signal }) => getPlace({ signal, placeId: placeId! }),
  });

  const { mutate: sharePlace } = useSharePlace(placeId);
  const { mutate: removePlace, isPending: isRemoving } = useDeletePlace(placeId);

  const isAuthorized = user.id === data?.place.creator.id;

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
            <PlaceHeaderTitle>{data.place.title}</PlaceHeaderTitle>
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
          <PlaceContentWrapper>
            <PlaceContentTitle>Top places</PlaceContentTitle>
            <UserTopPlacesList items={data.topUserPlaces} />
          </PlaceContentWrapper>
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
            <Link text={`see all ${data.place.creator.name}'s places`} type="router-link" to="/" />
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
