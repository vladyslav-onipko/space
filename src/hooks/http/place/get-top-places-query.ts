import { useQuery } from '@tanstack/react-query';

import { getPlaces } from '../../../utils/http/place';
import { ResponseGetTopPlacesData } from '../../../models/place';
import { ResponseError } from '../../../models/http-error';
import useAppSelector from '../../app/app-selector';

export const useGetTopPlaces = (maxPlaces?: number) => {
  const user = useAppSelector((state) => state.auth.user);

  const queryData = useQuery<ResponseGetTopPlacesData, ResponseError>({
    queryKey: ['places', maxPlaces],
    queryFn: ({ signal }) => getPlaces({ signal, sessionUserId: user.id, topPlacesCount: maxPlaces }),
  });

  return { ...queryData };
};
