import { useContext, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import HeroImage from '../../components/Hero/HeroImage';
import Container from '../../components/UI/Base/Container';
import Aside from '../../components/UI/Base/Aside';
import Button from '../../components/UI/Base/Button';
import ToolsBar from '../../components/ToolsBar/ToolsBar';
import Loader from '../../components/UI/Helpers/Loader';
import Section from '../../components/UI/Base/Section';
import ErrorBlock from '../../components/UI/Helpers/ErrorBlock';
import RocketsStatusBar from '../../components/Rocket/RocketsStatusBar';
import RocketsList from '../../components/Rocket/RocketsList';
import Title from '../../components/UI/Base/Title';

import useAppSelector from '../../hooks/app-selector';
import useAppDispatch from '../../hooks/app-dispatch';

import { userRouts } from '../../router/routs';
import { getUserProfile } from '../../utils/http/user';
import { UrlParamsContext } from '../../store/http/url-params-context';
import { setRockets } from '../../store/rockets/rockets-slice';

const ProfileContentContainer = styled(Container)`
  display: flex;
  justify-content: center;

  @media (max-width: 1279px) {
    flex-wrap: wrap;
  }
`;
const ProfileSection = styled(Section)`
  flex-grow: 1;
  margin: 0;
  width: 100%;
`;

const AsideContent = styled.div`
  border-bottom: 1px solid var(--color-1--3);
  text-align: center;
`;

const UserPicture = styled.picture`
  border: 3px solid var(--color-2--1);
  border-radius: 50%;
  display: block;
  height: 250px;
  margin: 0 auto 30px;
  overflow: hidden;
  width: 250px;
`;

const UserName = styled.p`
  color: var(--color-1--3);
  font-size: 4.5rem;
`;

const AsideContentActions = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 30px 0;
`;

const AsideContentAction = styled(Button)`
  font-size: 1.8rem;
  margin: 5px;
  min-height: auto;
  min-width: auto;
  padding: 3px 5px;
  text-transform: lowercase;
`;

const AsideActions = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;

  & > * {
    font-size: 2rem;
    margin-bottom: 15px;
    text-transform: none;
  }
`;

const RocketsContentWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Profile: React.FC = () => {
  const { user, token } = useAppSelector((state) => state.auth);
  const appRockets = useAppSelector((state) => state.rockets.rockets);
  const { urlParams, setUrlParams } = useContext(UrlParamsContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data, isSuccess, isPending, isError, error } = useQuery({
    queryKey: ['rockets', urlParams],
    queryFn: ({ signal }) => getUserProfile({ userId: user.id, token, urlParams, signal }),
    staleTime: 5000,
  });

  let rocketsContent;
  const clearRockets = useRef(true);
  const { rockets, currentPage, hasNextPage, currentAmount, amount, amountFavorites, amountShared } = data || {};

  const handleFilterRockets = ({ target }: React.MouseEvent) => {
    const dataValue = (target as HTMLButtonElement).dataset.filter || '';
    setUrlParams({ filter: dataValue, page: 1, search: '' });
  };

  const handleLoadMoreRockets = () => {
    setUrlParams({ page: currentPage + 1 });
    clearRockets.current = false;
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setRockets({ rockets, clearOld: clearRockets.current }));
      clearRockets.current = true;
    }
  }, [isSuccess, dispatch, rockets]);

  if (isError && !isPending) {
    rocketsContent = <ErrorBlock message={error.message} />;
  }

  if (isPending) {
    rocketsContent = <Loader />;
  }

  if (isSuccess && !isPending) {
    rocketsContent = <RocketsList rockets={appRockets} />;
  }

  return (
    <>
      <HeroImage title="Profile" />
      <ProfileContentContainer size="lg">
        <Aside>
          <AsideContent>
            <UserPicture>
              <img src={`${process.env.REACT_APP_BACKEND_URL}/${user.image}`} alt={user.name} />
            </UserPicture>
            <UserName>{user.name}</UserName>
            <AsideContentActions>
              <AsideContentAction
                text={`${amount || 0} total`}
                mode="primary"
                icon={['fas', 'space-shuttle']}
                onClick={handleFilterRockets}
              />
              <AsideContentAction
                text={`${amountFavorites || 0} favorites`}
                mode="primary"
                icon={['far', 'heart']}
                data-filter="favorites"
                onClick={handleFilterRockets}
              />
              <AsideContentAction
                text={`${amountShared || 0} shared`}
                mode="primary"
                icon={['far', 'share-square']}
                data-filter="shared"
                onClick={handleFilterRockets}
              />
            </AsideContentActions>
          </AsideContent>
          <AsideActions>
            <Button
              text="Load more"
              mode="primary"
              icon={['fas', 'rotate']}
              disabled={!hasNextPage}
              onClick={handleLoadMoreRockets}
            />
            <Button
              text="Edit profile"
              icon={['fas', 'user-astronaut']}
              aria-haspopup="true"
              onClick={() => navigate(userRouts.EDIT_PROFILE)}
            />
            <Button
              text="Add new rocket"
              icon={['fas', 'rocket']}
              aria-haspopup="true"
              onClick={() => navigate(userRouts.ADD_ROCKET)}
            />
          </AsideActions>
        </Aside>
        <ProfileSection>
          <ToolsBar />
          <RocketsStatusBar loaded={appRockets.length} from={currentAmount} />
          <RocketsContentWrapper>
            <Title tag="h2">{`${urlParams?.filter || 'All'} rockets`}</Title>
            {rocketsContent}
          </RocketsContentWrapper>
        </ProfileSection>
      </ProfileContentContainer>
      <Outlet />
    </>
  );
};

export default Profile;
