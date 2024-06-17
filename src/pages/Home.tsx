import { useEffect, useState } from 'react';

import { useQuery as useApolloQuery } from '@apollo/client';

import PlacesSlider from '../components/Place/PlacesSlider';
import ErrorBlock from '../components/UI/Helpers/ErrorBlock';
import Section from '../components/UI/Base/Section';
import Container from '../components/UI/Base/Container';
import Title from '../components/UI/Base/Title';
import Spinner from '../components/UI/Helpers/Spinner';
import ContentWrapper from '../components/UI/Helpers/ContentWrapper';

import { GET_ROCKETS } from '../schemas/query/get-rockets';
import { Place } from '../models/place';
import { useGetTopPlaces } from '../hooks/http/place/get-top-places-query';

const Home: React.FC = () => {
  const [rockets, setRockets] = useState([]);

  const { data: rocketsData, loading: isRocketsLoading, error: rocketsError } = useApolloQuery(GET_ROCKETS);
  const {
    data: topPlacesData,
    isSuccess: isPlacesSuccess,
    isPending: isPlacesPending,
    isError: isPlacesError,
    error: topPlacesError,
  } = useGetTopPlaces();

  useEffect(() => {
    if (rocketsData) {
      const updatedRockets = rocketsData.rockets.map((rocket: Place & { name: string; id: string }, index: number) => {
        return {
          ...rocket,
          id: rocket.id,
          customImage: `${process.env.REACT_APP_IMAGE_SERVICE_URL}/400/300?random=${index}`,
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
          {!isRocketsLoading && rocketsData && <PlacesSlider places={rockets} />}
        </Container>
      </Section>
      <Section>
        <Container>
          <Title tag="h2">Top people places</Title>
          {isPlacesPending && (
            <ContentWrapper>
              <Spinner />
            </ContentWrapper>
          )}
          {isPlacesError && <ErrorBlock message={topPlacesError.message}></ErrorBlock>}
          {isPlacesSuccess && !isPlacesPending && <PlacesSlider places={topPlacesData.places} />}
        </Container>
      </Section>
    </>
  );
};

export default Home;
