import { useContext } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { UrlParamsContext } from '../../../store/http/url-params-context';
import useAppSelector from '../../app/app-selector';
import { getPlaces } from '../../../utils/http/place';
import { ResponseGetAllPlacesData } from '../../../models/place';
import { ResponseError } from '../../../models/http-error';

export const useGetAllPlaces = () => {
  const { urlParams } = useContext(UrlParamsContext);
  const { id: userId } = useAppSelector((state) => state.auth.user);

  const queryData = useInfiniteQuery<ResponseGetAllPlacesData, ResponseError>({
    queryKey: ['places', urlParams.search],
    initialPageParam: 1,
    queryFn: ({ pageParam, signal }) => getPlaces({ pageParam, searchParam: urlParams.search, signal, userId }),
    getNextPageParam: (lastPage) => (lastPage?.hasNextPage ? lastPage?.nextPage : null),
  });

  return { ...queryData };
};
