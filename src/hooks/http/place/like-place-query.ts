import { useMutation, useQueryClient } from '@tanstack/react-query';

import { likePlace } from '../../../utils/http/place';
import { Place } from '../../../models/place';

export const useLikePlace = (queryKey: (string | number | boolean | null)[]) => {
  const queryClient = useQueryClient();

  const mutationData = useMutation({
    mutationFn: likePlace,
    onMutate: async ({ userLike, onSetIsFavorite }) => {
      await queryClient.cancelQueries({ queryKey });

      const oldPlace: Place = queryClient.getQueryData(queryKey)!;
      const updatedPlace = { ...oldPlace, favorite: userLike };

      queryClient.setQueryData(queryKey, updatedPlace);
      onSetIsFavorite(userLike);

      return { oldPlace, onSetIsFavorite };
    },
    onError(_, _2, context) {
      queryClient.setQueryData(queryKey, context?.oldPlace);
      context?.onSetIsFavorite(context.oldPlace.favorite);
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey, exact: true });
    },
  });

  return { ...mutationData };
};
