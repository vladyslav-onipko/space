import { useContext } from 'react';

import { useQuery } from '@tanstack/react-query';

import useAppSelector from '../../app/app-selector';
import { getUserProfile } from '../../../utils/http/user';
import { UrlParamsContext } from '../../../store/http/url-params-context';

export const useGetProfile = () => {
  const { user, token } = useAppSelector((state) => state.auth);
  const { urlParams } = useContext(UrlParamsContext);

  const queryData = useQuery({
    queryKey: ['places', urlParams],
    queryFn: ({ signal }) => getUserProfile({ userId: user.id, token, urlParams, signal }),
    staleTime: 5000,
  });

  return { ...queryData };
};
