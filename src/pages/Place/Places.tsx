import { useCallback, useContext, useEffect, useRef } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { styled } from 'styled-components';

import PlacesList from '../../components/Place/PlacesList';
import ErrorBlock from '../../components/UI/Helpers/ErrorBlock';
import Loader from '../../components/UI/Helpers/Loader';
import Container from '../../components/UI/Base/Container';
import Section from '../../components/UI/Base/Section';
import ToolsBar from '../../components/ToolsBar/ToolsBar';
import Title from '../../components/UI/Base/Title';
import PlacesStatusBar from '../../components/Place/PlacesStatusBar';

import { getPlaces } from '../../utils/http/place';
import useAppSelector from '../../hooks/app/app-selector';
import useAppDispatch from '../../hooks/app/app-dispatch';
import { UrlParamsContext } from '../../store/http/url-params-context';
import { setPlaces } from '../../store/place/place-slice';
import { Place } from '../../models/place';

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
  const { id: userId } = useAppSelector((state) => state.auth.user);
  const appPlaces = useAppSelector((state) => state.places.places);
  const { urlParams } = useContext(UrlParamsContext);
  const dispatch = useAppDispatch();

  const { data, isSuccess, isLoading, isError, fetchNextPage, hasNextPage, error } = useInfiniteQuery({
    queryKey: ['places', urlParams.search],
    initialPageParam: 1,
    queryFn: ({ pageParam, signal }) => getPlaces({ pageParam, searchParam: urlParams.search, signal, userId }),
    getNextPageParam: (lastPage) => (lastPage?.hasNextPage ? lastPage?.nextPage : null),
  });

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
    content = <PlacesList places={appPlaces} />;
  }

  return (
    <Section>
      <Container>
        <Title tag="h2">People share these places</Title>
        <ToolsBar />
        <PlacesStatusBar loaded={appPlaces.length} from={data?.pages[0]?.totalPlaces || 0} />
        {content}
        <LoadMoreTarget ref={loadMoreRef}></LoadMoreTarget>
      </Container>
    </Section>
  );
};

export default Places;