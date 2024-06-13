import { styled } from 'styled-components';

import { PlacesListProps } from '../../models/place';

import PlaceItem from './PlaceItem';
import ContentWrapper from '../UI/Helpers/ContentWrapper';

const PlaceList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0 -12px;
  row-gap: 24px;
`;

const PlaceListItem = styled.li`
  padding: 0 12px;
  width: calc(100% / 3);

  @media (max-width: 1279px) {
    width: 50%;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const DummyText = styled.p`
  font-size: 2.2rem;
`;

const PlacesList: React.FC<PlacesListProps> = ({ places, ...props }) => {
  if (!places.length) {
    return (
      <ContentWrapper>
        <DummyText>There are no places now :(</DummyText>
      </ContentWrapper>
    );
  }

  return (
    <PlaceList {...props}>
      {places.map((place) => {
        return (
          <PlaceListItem key={place.id}>
            <PlaceItem place={place} />
          </PlaceListItem>
        );
      })}
    </PlaceList>
  );
};

export default PlacesList;
