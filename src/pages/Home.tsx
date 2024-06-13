import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import PlacesSlider from '../components/Place/PlacesSlider';
import Loader from '../components/UI/Helpers/Loader';
import ErrorBlock from '../components/UI/Helpers/ErrorBlock';
import Section from '../components/UI/Base/Section';
import Container from '../components/UI/Base/Container';
import Title from '../components/UI/Base/Title';

import { GET_ROCKETS } from '../schemas/query/get-rockets';
import { Place } from '../models/place';

const Home: React.FC = () => {
  const [rockets, setRockets] = useState([]);
  const { data, loading, error } = useQuery(GET_ROCKETS);

  useEffect(() => {
    if (data) {
      const updatedRockets = data.rockets.map((rocket: Place & { name: string; id: string }, index: number) => {
        return {
          ...rocket,
          _id: rocket.id,
          customImage: `${process.env.REACT_APP_IMAGE_SERVICE_URL}/400/300?random=${index}`,
          title: rocket.name,
        };
      });
      setRockets(updatedRockets);
    }
  }, [data, setRockets]);

  let rocketsContent = <PlacesSlider places={rockets} />;

  if (loading) {
    rocketsContent = <Loader />;
  }

  if (error) {
    rocketsContent = <ErrorBlock message={error.message}></ErrorBlock>;
  }

  return (
    <>
      <Section>
        <Container>
          <Title tag="h2">Space X offers you</Title>
          {rocketsContent}
        </Container>
      </Section>
    </>
  );
};

export default Home;
