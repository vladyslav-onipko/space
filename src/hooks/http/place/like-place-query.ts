import { useMutation, useQueryClient } from '@tanstack/react-query';

import { likePlace } from '../../../utils/http/place';

export const useLikePlace = (favorite: boolean, queryKey: (string | number | boolean | null)[]) => {
  const queryClient = useQueryClient();

  const mutationData = useMutation({
    mutationFn: likePlace,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData(queryKey, favorite);
    },
    onError() {
      queryClient.setQueryData(queryKey, !favorite);
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['places'] });
    },
  });

  return { ...mutationData };
};
