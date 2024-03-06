import { useQuery } from '@tanstack/react-query';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import RocketsList from "../components/Rocket/RocketsList";
import HeroImage from "../components/Hero/HeroImage";
import Spinner from '../ui/Spinner';
import ErrorBlock from '../ui/ErrorBlock';
import ContentWrapper from '../ui/ContentWrapper';

import { getFavoriteRockets } from '../utils/http';
import totalFavRockets from '../store/selectors/TotalFavRockets';
import favRocketsState from '../store/atoms/FavRocketsState';

const HomeLink = styled(Link)`
    color: var(--color-2--2);

    &:hover,
    &:focus {
        text-decoration: none;
    }
`;

const Favorites: React.FC = () => {
    const [favRockets, setFavRockets] = useRecoilState(favRocketsState);
    const hasFavRockets = useRecoilValue(totalFavRockets);

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['rockets'],
        queryFn: getFavoriteRockets,
    });

    useEffect(() => {
        if (Array.isArray(data)) {
            setFavRockets(data);
        }
    }, [data, setFavRockets]);

    let content = <RocketsList rockets={favRockets}/>;

    if (isPending) {
        content = <ContentWrapper><Spinner /></ContentWrapper>;
    }

    if (isError) {
        content = (
            <ContentWrapper>
                <ErrorBlock title='An error occurred' message={error.message}></ErrorBlock>
            </ContentWrapper>
        );
    }

    if (!isPending && !hasFavRockets && !isError) {
        content = (
            <ContentWrapper>
                <p>Your favorite Rockets will be here. <HomeLink to='/space'>Plese add one!</HomeLink></p>
            </ContentWrapper>
        );
    }

    return (
        <>
            <HeroImage />
            {content}
        </>
    );
};

export default Favorites;