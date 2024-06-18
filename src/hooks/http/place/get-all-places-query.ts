import { useContext } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import useAppSelector from '../../app/app-selector';
import { UrlParamsContext } from '../../../store/http/url-params-context';
import { getPlaces } from '../../../utils/http/place';
import { ResponseGetAllPlacesData } from '../../../models/place';
import { ResponseError } from '../../../models/http-error';

export const useGetAllPlaces = (filter: string = '', creator: string = '') => {
  const { urlParams } = useContext(UrlParamsContext);
  const user = useAppSelector((state) => state.auth.user);

  const queryData = useInfiniteQuery<ResponseGetAllPlacesData, ResponseError>({
    queryKey: ['places', urlParams.search, filter, creator],
    initialPageParam: 1,
    queryFn: ({ pageParam, signal }) =>
      getPlaces({
        pageParam,
        searchParam: urlParams.search,
        filterParam: filter,
        sessionUserId: user.id,
        creatorId: creator,
        signal,
      }),
    getNextPageParam: (lastPage) => (lastPage?.hasNextPage ? lastPage?.nextPage : null),
  });

  return { ...queryData };
};
