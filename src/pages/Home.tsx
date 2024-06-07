import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import HeroSlider from '../components/Hero/HeroSlider';
import PlacesSlider from '../components/Place/PlacesSlider';
import Loader from '../components/UI/Helpers/Loader';
import ErrorBlock from '../components/UI/Helpers/ErrorBlock';
import Section from '../components/UI/Base/Section';
import Container from '../components/UI/Base/Container';
import Title from '../components/UI/Base/Title';

import { GET_ROCKETS } from '../schemas/query/get-rockets';
import { Place } from '../models/places';
import { images } from '../utils/helpers/images';

const Home: React.FC = () => {
  const [rockets, setRockets] = useState([]);
  const { data, loading, error } = useQuery(GET_ROCKETS);

  useEffect(() => {
    if (data) {
      const updatedRockets = data.rockets.map((rocket: Place & { name: string; id: string }, index: number) => {
        const imageIndex = index >= images.length ? 0 : index;
        return { ...rocket, _id: rocket.id, image: images[imageIndex].path, title: rocket.name };
      });
      setRockets(updatedRockets);
    }
  }, [data, setRockets]);

  let rocketsContent = <PlacesSlider title="Popular tours" places={rockets} />;

  if (loading) {
    rocketsContent = <Loader />;
  }

  if (error) {
    rocketsContent = <ErrorBlock message={error.message}></ErrorBlock>;
  }

  return (
    <>
      <HeroSlider />
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
