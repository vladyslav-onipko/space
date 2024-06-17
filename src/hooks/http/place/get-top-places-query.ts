import { useQuery } from '@tanstack/react-query';

import { getPlaces } from '../../../utils/http/place';
import { ResponseGetTopPlacesData } from '../../../models/place';
import { ResponseError } from '../../../models/http-error';
import useAppSelector from '../../app/app-selector';

export const useGetTopPlaces = () => {
  const { id: userId } = useAppSelector((state) => state.auth.user);

  const queryData = useQuery<ResponseGetTopPlacesData, ResponseError>({
    queryKey: ['places'],
    queryFn: ({ signal }) => getPlaces({ signal, userId, topPlacesCount: 9 }),
  });

  return { ...queryData };
};
