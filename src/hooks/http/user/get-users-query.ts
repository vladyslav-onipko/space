import { useQuery } from '@tanstack/react-query';

import { getUsers } from '../../../utils/http/user';

export const useGetUsers = (maxUsers?: number) => {
  const queryData = useQuery({
    queryKey: ['users', maxUsers],
    queryFn: ({ signal }) => getUsers({ signal, max: maxUsers }),
  });

  return { ...queryData };
};
