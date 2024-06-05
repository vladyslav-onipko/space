import { styled } from 'styled-components';

import Button from '../UI/Base/Button';
import Link from '../UI/Base/Link';

import { RocketItemProps } from '../../models/rockets';
import { rocketRouts } from '../../router/routs';

const RocketContainer = styled.article`
  border: 1px solid var(--color-1--2);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const RocketPicture = styled.picture`
  display: block;
  flex-shrink: 0;
`;

const RokectImage = styled.img`
  display: block;
  height: 296px;
`;

const RocketContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px;
`;

const RocketContent = styled.div`
  font-size: 2.4rem;
  text-align: center;
`;

const RocketTitle = styled.h3`
  color: var(--color-gray-4--4);
  font-size: inherit;
  font-weight: 700;
  margin-bottom: 16px;
  text-transform: uppercase;
`;

const RocketTeaser = styled.p`
  color: var(--color-1--3);
  font-size: inherit;
  font-family: var(--typo-2);
  font-weight: 300;
  line-height: 1.2;
  margin-bottom: 40px;
`;

const RocketActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: auto;
`;

const DetailButton = styled(Link)`
  flex-grow: 1;
  max-width: 280px;
`;

const RocketItem: React.FC<RocketItemProps> = ({ rocket }) => {
  const detailRocketRout = rocketRouts.DETAIL_ROCKET.replace(':id', rocket.id);

  return (
    <RocketContainer>
      <RocketPicture>
        <RokectImage src={`${process.env.REACT_APP_BACKEND_URL}/${rocket.image}`} alt={rocket.title}></RokectImage>
      </RocketPicture>
      <RocketContentWrapper>
        <RocketContent>
          <RocketTitle>{rocket.title}</RocketTitle>
          <RocketTeaser>{rocket.description}</RocketTeaser>
        </RocketContent>
        <RocketActions>
          <DetailButton text="Detail" mode="secondary" type="router-link" to={detailRocketRout} />
          <Button text="like" icon={['far', 'heart']} onlyIcon />
        </RocketActions>
      </RocketContentWrapper>
    </RocketContainer>
  );
};

export default RocketItem;
