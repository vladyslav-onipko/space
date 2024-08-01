import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from '../UI/Base/Link';

import { UserItemProps } from '../../models/user';
import { placeRouts } from '../../router/routs';

const UserContainer = styled.article`
  border: 1px solid var(--color-1--2);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const UserPicture = styled.picture`
  border-radius: 50%;
  display: block;
  flex-shrink: 0;
  height: 250px;
  margin: 20px auto;
  overflow: hidden;
  width: 250px;
`;

const UserImage = styled.img`
  display: block;
`;

const UserContentWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px;
`;

const UserContent = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const UserName = styled.p`
  color: var(--color-1--3);
  font-size: 4.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
`;

const UserRating = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const UserRatingIcon = styled.span`
  display: inline-block;
  margin-right: 15px;

  svg {
    height: 40px;
    width: 40px;

    path {
      fill: var(--color-2--1);
    }
  }
`;

const UserRatingNumber = styled.p`
  color: var(--color-1--3);
  font-size: 4rem;
  font-weight: 700;
`;

const UserActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
`;

const UserLink = styled(Link)`
  flex-grow: 1;
`;

const UserItem: React.FC<UserItemProps> = ({ item: user, ...props }) => {
  return (
    <UserContainer {...props}>
      <UserPicture>
        <UserImage src={user.image} alt={user.name} height="300" width="400" />
      </UserPicture>
      <UserContentWrapper>
        <UserContent>
          <UserName>{user.name}</UserName>
          <UserRating>
            <UserRatingIcon data-tooltip-id="place-tooltip" data-tooltip-place="top" data-tooltip-content="rating">
              <FontAwesomeIcon icon={['fas', 'star']} />
            </UserRatingIcon>
            <UserRatingNumber>{user.rating}</UserRatingNumber>
          </UserRating>
        </UserContent>
        <UserActions>
          <UserLink
            type="nav-link"
            mode="secondary"
            text="see places"
            to={placeRouts.USER_PLACES.replace(':userId', user.id)}
          />
        </UserActions>
      </UserContentWrapper>
    </UserContainer>
  );
};

export default UserItem;
