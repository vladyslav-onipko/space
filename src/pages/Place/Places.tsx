import { useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { styled } from 'styled-components';

import PlaceItem from '../../components/Place/PlaceItem';
import ItemsList from '../../components/UI/Base/ItemsList';
import ErrorBlock from '../../components/UI/Helpers/ErrorBlock';
import Loader from '../../components/UI/Helpers/Loader';
import Container from '../../components/UI/Base/Container';
import Section from '../../components/UI/Base/Section';
import ToolsBar from '../../components/ToolsBar/ToolsBar';
import Title from '../../components/UI/Base/Title';
import PlacesStatusBar from '../../components/Place/PlacesStatusBar';

import useAppSelector from '../../hooks/app/app-selector';
import useAppDispatch from '../../hooks/app/app-dispatch';
import { setPlaces } from '../../store/place/place-slice';
import { Place } from '../../models/place';
import { useGetAllPlaces } from '../../hooks/http/place/get-all-places-query';

const LoadMoreTarget = styled.div`
  bottom: -18%;
  height: 50px;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
  visibility: hidden;
  width: 100px;

  @media (max-width: 1279px) {
    bottom: -8%;
  }

  @media (max-width: 767px) {
    bottom: -4%;
  }
`;

const Places: React.FC = () => {
  const appPlaces = useAppSelector((state) => state.places.places);
  const dispatch = useAppDispatch();
  const { userId } = useParams();

  const filter: 'user' | '' = userId ? 'user' : '';

  const { data, isSuccess, isLoading, isError, fetchNextPage, hasNextPage, error } = useGetAllPlaces(filter, userId);

  let content;
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { pages } = data || {};

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage) fetchNextPage();
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const targetRef = loadMoreRef.current;
    const observerOptions = { root: null, rootMargin: '20px', threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, observerOptions);

    observer.observe(targetRef!);

    return () => observer.unobserve(targetRef!);
  }, [handleObserver]);

  useEffect(() => {
    if (isSuccess && pages) {
      const places = pages.flatMap((page) => page?.places) as Place[];
      dispatch(setPlaces({ places, clearOld: true }));
    }
  }, [isSuccess, dispatch, pages]);

  if (isLoading) {
    content = <Loader />;
  }

  if (isError) {
    content = <ErrorBlock message={error.message} />;
  }

  if (isSuccess && !isLoading) {
    content = <ItemsList items={appPlaces} listItem={PlaceItem} />;
  }

  return (
    <Section>
      <Container>
        <Title tag="h2">{filter === 'user' ? 'User shares these places' : 'People share these places'}</Title>
        <ToolsBar />
        <PlacesStatusBar loaded={appPlaces.length} from={data?.pages[0]?.placesAmount || 0} />
        {content}
        <LoadMoreTarget ref={loadMoreRef}></LoadMoreTarget>
      </Container>
    </Section>
  );
};

export default Places;
