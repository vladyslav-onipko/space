import { useEffect, useState } from 'react';

import { useQuery as useApolloQuery } from '@apollo/client';

import PlaceItem from '../components/Place/PlaceItem';
import ErrorBlock from '../components/UI/Helpers/ErrorBlock';
import Section from '../components/UI/Base/Section';
import Container from '../components/UI/Base/Container';
import Title from '../components/UI/Base/Title';
import Spinner from '../components/UI/Helpers/Spinner';
import ContentWrapper from '../components/UI/Helpers/ContentWrapper';
import Slider from '../components/UI/Base/Slider';
import UserItem from '../components/User/UserItem';

import { GET_ROCKETS } from '../schemas/query/get-rockets';
import { Place } from '../models/place';
import { useGetTopPlaces } from '../hooks/http/place/get-top-places-query';
import { useGetUsers } from '../hooks/http/user/get-users-query';

const Home: React.FC = () => {
  const [rockets, setRockets] = useState([]);

  const { data: rocketsData, loading: isRocketsLoading, error: rocketsError } = useApolloQuery(GET_ROCKETS);

  const {
    data: placesData,
    isSuccess: isPlacesSuccess,
    isPending: isPlacesPending,
    isError: isPlacesError,
    error: placesError,
  } = useGetTopPlaces(9);

  const {
    data: usersData,
    isSuccess: isUsersSuccess,
    isPending: isUsersPending,
    isError: isUsersError,
    error: usersError,
  } = useGetUsers(9);

  useEffect(() => {
    if (rocketsData) {
      const updatedRockets = rocketsData.rockets.map((rocket: Place & { name: string; id: string }, index: number) => {
        return {
          ...rocket,
          id: rocket.id,
          image: `${process.env.REACT_APP_IMAGE_SERVICE_URL}/400/300?random=${index}`,
          title: rocket.name,
          hideActions: true,
          favorite: false,
        };
      });
      setRockets(updatedRockets);
    }
  }, [rocketsData, setRockets]);

  return (
    <>
      <Section>
        <Container>
          <Title tag="h2">Space X offers you</Title>
          {isRocketsLoading && (
            <ContentWrapper>
              <Spinner />
            </ContentWrapper>
          )}
          {rocketsError && <ErrorBlock message={rocketsError.message}></ErrorBlock>}
          {!isRocketsLoading && rocketsData && <Slider items={rockets} slideItem={PlaceItem} />}
        </Container>
      </Section>
      <Section>
        <Container>
          <Title tag="h2">Top places</Title>
          {isPlacesPending && (
            <ContentWrapper>
              <Spinner />
            </ContentWrapper>
          )}
          {isPlacesError && <ErrorBlock message={placesError.message}></ErrorBlock>}
          {isPlacesSuccess && !isPlacesPending && <Slider items={placesData.places} slideItem={PlaceItem} />}
        </Container>
      </Section>
      <Section>
        <Container>
          <Title tag="h2">Top people</Title>
          {isUsersPending && (
            <ContentWrapper>
              <Spinner />
            </ContentWrapper>
          )}
          {isUsersError && <ErrorBlock message={usersError.message}></ErrorBlock>}
          {isUsersSuccess && usersData && !isPlacesPending && <Slider items={usersData.users} slideItem={UserItem} />}
        </Container>
      </Section>
    </>
  );
};

export default Home;
