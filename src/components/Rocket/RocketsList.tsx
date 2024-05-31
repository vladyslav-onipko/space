import { styled } from 'styled-components';

import { RocketsListProps } from '../../models/rockets';

import RocketItem from './RocketItem';
import ContentWrapper from '../UI/Helpers/ContentWrapper';

const RocketList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0 -12px;
  row-gap: 24px;
`;

const RocketListItem = styled.li`
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

const RocketsList: React.FC<RocketsListProps> = ({ rockets, ...props }) => {
  if (!rockets.length) {
    return (
      <ContentWrapper>
        <DummyText>There are no rockets now :(</DummyText>
      </ContentWrapper>
    );
  }

  return (
    <RocketList {...props}>
      {rockets.map((rocket) => {
        return (
          <RocketListItem key={rocket.id}>
            <RocketItem rocket={rocket} />
          </RocketListItem>
        );
      })}
    </RocketList>
  );
};

export default RocketsList;
