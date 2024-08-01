import { useState, useMemo } from 'react';

import { styled } from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';

import Button from '../UI/Base/Button';
import Link from '../UI/Base/Link';
import Modal from '../UI/Base/Modal';

import useAppSelector from '../../hooks/app/app-selector';
import { PlaceItemProps } from '../../models/place';
import { placeRouts } from '../../router/routs';
import { useLikePlace } from '../../hooks/http/place/like-place-query';
import { userRouts } from '../../router/routs';
import imagePlaceholder from '../../assets/img/placeholder-image.jpg';

const PlaceContainer = styled.article`
  border: 1px solid var(--color-1--2);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const PlacePicture = styled.picture`
  display: block;
  flex-shrink: 0;
`;

const PlaceImage = styled.img`
  display: block;
  height: 296px;
`;

const PlaceContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px;
`;

const PlaceContent = styled.div`
  font-size: 2.4rem;
  text-align: center;
`;

const PlaceTitle = styled.h3`
  color: var(--color-gray-4--4);
  font-size: inherit;
  font-weight: 700;
  margin-bottom: 16px;
  text-transform: uppercase;
`;

const PlaceTeaser = styled.p`
  color: var(--color-1--3);
  font-size: inherit;
  font-family: var(--typo-2);
  font-weight: 300;
  line-height: 1.2;
  margin-bottom: 40px;
`;

const PlaceActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: auto;
`;

const DetailButton = styled(Link)`
  flex-grow: 1;
  max-width: 280px;
`;

const ModalContentText = styled.p`
  color: var(--color-1--3);
  font-size: 2.4rem;
  font-weight: 700;
  text-align: center;

  a span:first-child {
    color: var(--color-1--3);
    font-size: inherit;
  }

  @media (max-width: 1279px) {
    font-size: 1.8rem;
  }
`;

const PlaceItem: React.FC<PlaceItemProps> = ({ item: place, ...props }) => {
  const [showModal, setShowModal] = useState(false);
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const detailPlaceRout = placeRouts.DETAIL_PLACE.replace(':id', place.id);
  const { id: placeId, favorite: placeFavorite } = place;
  const favoritePlaceQueryKey = useMemo(() => ['places', placeId, 'favorite'], [placeId]);
  const isFavorite: boolean = queryClient.getQueryData(favoritePlaceQueryKey) || placeFavorite;

  const { mutate: likePlace } = useLikePlace(!placeFavorite, favoritePlaceQueryKey);

  const handleLikePlace = ({ target }: React.MouseEvent<HTMLButtonElement>) => {
    if (!isAuth) {
      setShowModal(true);
    } else {
      likePlace({ placeId, userId: user.id });
    }

    (target as HTMLButtonElement).blur();
  };

  return (
    <>
      <Modal title="Login is required" actions showModal={showModal} onShowModal={() => setShowModal(false)}>
        <ModalContentText>
          Unfortunately you cannot like until you are{' '}
          <Link type="router-link" mode="regular" text="logged in" to={userRouts.SIGNIN} />
        </ModalContentText>
      </Modal>
      <PlaceContainer {...props}>
        <PlacePicture>
          <PlaceImage
            src={typeof place.image === 'string' ? place.image : imagePlaceholder}
            alt={place.title}
            height="300"
            width="400"
          ></PlaceImage>
        </PlacePicture>
        <PlaceContentWrapper>
          <PlaceContent>
            <PlaceTitle>{place.title}</PlaceTitle>
            <PlaceTeaser>{place.description}</PlaceTeaser>
          </PlaceContent>
          {!place.hideActions && (
            <PlaceActions>
              <DetailButton text="Detail" mode="secondary" type="router-link" to={detailPlaceRout} />
              <Button
                text="like"
                icon={['far', 'heart']}
                mode={isFavorite ? 'favorite' : 'default'}
                onlyIcon
                onClick={handleLikePlace}
              />
            </PlaceActions>
          )}
        </PlaceContentWrapper>
      </PlaceContainer>
    </>
  );
};

export default PlaceItem;
