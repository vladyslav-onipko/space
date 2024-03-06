import { useQuery } from '@apollo/client';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';

import HeroSlider from "../components/Hero/HeroSlider";
import RocketsSlider from "../components/Rocket/RocketsSlider";
import Spinner from '../ui/Spinner';
import ErrorBlock from '../ui/ErrorBlock';
import ContentWrapper from '../ui/ContentWrapper';

import { GET_ROCKETS } from '../query/rockets';
import { images } from '../helpers/images';
import rocketsState from '../store/atoms/RocketsState';
import totalRockets from '../store/selectors/TotalRockets';
import { LocalStorageKeys, Rocket } from '../models/Rockets';

const Home: React.FC = () => {
    const { data, loading, error } = useQuery(GET_ROCKETS);
    const [rockets, setRockets] = useRecoilState(rocketsState);
    const hasRockets = useRecoilValue(totalRockets);

    useEffect(() => {
        if (data) {
            // get favorite rockets ids from LS to set isFavorite property correct
            const favRocketsId = JSON.parse(localStorage.getItem(LocalStorageKeys.FAVORITES)!) || [];
            const updatedRockets = data.rockets.map((rocket: Rocket, index: number) => {
                const imageIndex = index >= images.length ? 0 : index;
                // check if current rocket is favorite
                const isFavorite = favRocketsId.includes(rocket.id) ? true : false;
                return {...rocket, img: images[imageIndex], isFavorite};
            });
            setRockets(updatedRockets);
        }
    }, [data, setRockets]);

    let content = <RocketsSlider rockets={rockets}/>;

    if (loading) {
        content = <ContentWrapper><Spinner /></ContentWrapper>;
    }

    if (error) {
        content = (
            <ContentWrapper>
                <ErrorBlock title='An error occurred' message={error.message}></ErrorBlock>
            </ContentWrapper>
        );
    }

    if (!loading && !hasRockets && !error) {
        content = <ContentWrapper><p>There are no Rockets now! Please, try later.</p></ContentWrapper>;
    }

    return (
        <>
            <HeroSlider />
            {content}
        </>
    );
};

export default Home;