import { useEffect, useMemo, useState } from 'react';

import { styled } from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';

import Button from '../UI/Base/Button';
import Link from '../UI/Base/Link';

import useAppSelector from '../../hooks/app/app-selector';
import { PlaceItemProps, Place } from '../../models/places';
import { placeRouts } from '../../router/routs';
import { useLikePlace } from '../../hooks/http/like-place-query';

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

const RokectImage = styled.img`
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

const PlaceItem: React.FC<PlaceItemProps> = ({ place }) => {
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
  const user = useAppSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  const { id: placeId } = place;

  const detailPlaceRout = placeRouts.DETAIL_PLACE.replace(':id', placeId);
  const queryKey = useMemo(() => ['places', placeId], [placeId]);

  const { mutate: likePlace } = useLikePlace(queryKey);

  const handleLikePlace = ({ target }: React.MouseEvent<HTMLButtonElement>) => {
    likePlace({ placeId, userId: user.id, userLike: !isFavorite, onSetIsFavorite: setIsFavorite });
    (target as HTMLButtonElement).blur();
  };

  useEffect(() => {
    const setQueryData = async () => {
      await queryClient.cancelQueries({ queryKey });
      const oldPlace: Place = queryClient.getQueryData(queryKey) || place;

      queryClient.setQueryData(queryKey, oldPlace);
      setIsFavorite(oldPlace.favorite);
    };

    setQueryData();
  }, [place, queryClient, queryKey]);

  return (
    <PlaceContainer>
      <PlacePicture>
        <RokectImage src={`${process.env.REACT_APP_BACKEND_URL}/${place.image}`} alt={place.title}></RokectImage>
      </PlacePicture>
      <PlaceContentWrapper>
        <PlaceContent>
          <PlaceTitle>{place.title}</PlaceTitle>
          <PlaceTeaser>{place.description}</PlaceTeaser>
        </PlaceContent>
        <PlaceActions>
          <DetailButton text="Detail" mode="secondary" type="router-link" to={detailPlaceRout} />
          <Button
            text="like"
            icon={['far', 'heart']}
            title="favorite"
            mode={isFavorite ? 'favorite' : 'default'}
            onlyIcon
            onClick={handleLikePlace}
          />
        </PlaceActions>
      </PlaceContentWrapper>
    </PlaceContainer>
  );
};

export default PlaceItem;
