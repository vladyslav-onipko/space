import { useMutation, useQueryClient } from '@tanstack/react-query';

import { likePlace } from '../../../utils/http/place';
import { Place } from '../../../models/place';

export const useLikePlace = (
  queryKey: (string | number | boolean | null)[],
  favorite: boolean,
  onSetIsFavorite: (favorite: boolean) => void
) => {
  const queryClient = useQueryClient();

  const mutationData = useMutation({
    mutationFn: likePlace,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const oldPlace: Place = queryClient.getQueryData(queryKey)!;
      const updatedPlace = { ...oldPlace, favorite };

      queryClient.setQueryData(queryKey, updatedPlace);
      onSetIsFavorite(favorite);

      return { oldPlace };
    },
    onError(_, _2, context) {
      queryClient.setQueryData(queryKey, context?.oldPlace);
      onSetIsFavorite(!favorite);
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['places'] });
    },
  });

  return { ...mutationData };
};
