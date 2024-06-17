import { useQuery } from '@tanstack/react-query';

import { getPlace } from '../../../utils/http/place';

export const useGetPlace = (queryKey: (string | number | boolean | null)[], placeId: string) => {
  const queryData = useQuery({
    queryKey,
    queryFn: ({ signal }) => getPlace({ signal, placeId }),
  });

  return { ...queryData };
};
