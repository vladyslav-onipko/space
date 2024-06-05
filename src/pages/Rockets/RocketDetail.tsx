import { useParams, useNavigate, Outlet } from 'react-router-dom';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { styled } from 'styled-components';

import Loader from '../../components/UI/Helpers/Loader';
import Section from '../../components/UI/Base/Section';
import Container from '../../components/UI/Base/Container';
import HeroImage from '../../components/Hero/HeroImage';
import ErrorBlock from '../../components/UI/Helpers/ErrorBlock';
import DropdownButton from '../../components/UI/Base/DropdownButton';
import Button from '../../components/UI/Base/Button';
import Map from '../../components/UI/Base/Map';

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

const RocketHeader = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  position: relative;
`;

const RocketTitlte = styled.h3`
  color: var(--color-1--3);
  font-size: 4.5rem;
  margin-right: 20px;
`;

const RocketDescription = styled.div`
  border: 1px solid var(--color-4--5);
  border-radius: 10px;
  margin-bottom: 40px;
  padding: 15px;
`;

const RocketContetnTitle = styled.h4`
  color: var(--color-1--3);
  font-size: 2.2rem;
  margin-bottom: 20px;
`;

const RocketDescriptionText = styled.p`
  color: var(--color-4--5);
  font-size: 2rem;
`;

const RocketLocation = styled.div`
  margin-bottom: 40px;
`;

const RocketMapContainer = styled.div`
  height: 400px;
  width: 100%;
`;

const RocketDetail: React.FC = () => {
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
      navigate(profileRoute, { replace: true });
    },
    onError(error) {
      dispatch(showNotification({ message: error.message, status: 'error' }));
    },
  });

  const { mutate: removeRocket } = useMutation({
    mutationFn: deleteRocket,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey });
      dispatch(showNotification({ message: data.message, status: 'success' }));
    },
    onError(error) {
      dispatch(showNotification({ message: error.message, status: 'error' }));
    },
  });

  const showMoreActions = data ? user.id === data.rocket.creator : null;

  const handleShareRocket = () => {
    shareRocket({
      rocketData: {},
      rocketId: rocketId!,
      shared: !data?.rocket.shared,
      token: token!,
    });
  };

  const handleDeleteRocket = () => {
    removeRocket({ rocketId: rocketId!, token: token! });
  };

  let content;

  if (isPending) {
    content = <Loader />;
  }

  if (isError && !isPending) {
    content = <ErrorBlock message={error.message} />;
  }

  if (isSuccess && data && !isPending) {
    content = (
      <RocketWrapper>
        <RocketPicture>
          <img src={`${process.env.REACT_APP_BACKEND_URL}/${data.rocket.image}`} alt={data.rocket.title} />
        </RocketPicture>
        <RocketContent>
          <RocketHeader>
            <RocketTitlte>{data.rocket.title}</RocketTitlte>
            {showMoreActions && (
              <DropdownButton text="more rocket actions" icon={['fas', 'ellipsis-vertical']} mode="secondary" onlyIcon>
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
                    <Button text="delete" icon={['far', 'trash-can']} onClick={handleDeleteRocket} />
                  </li>
                </ul>
              </DropdownButton>
            )}
          </RocketHeader>
          <RocketDescription>
            <RocketContetnTitle>Overview</RocketContetnTitle>
            <RocketDescriptionText>{data.rocket.description}</RocketDescriptionText>
          </RocketDescription>
          <RocketLocation>
            <RocketContetnTitle>Location</RocketContetnTitle>
            <RocketMapContainer>
              <Map center={data.rocket.location} markerTitle={data.rocket.title} />
            </RocketMapContainer>
          </RocketLocation>
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
    </>
  );
};

export default RocketDetail;
