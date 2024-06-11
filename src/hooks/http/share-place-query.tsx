import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editPlace } from '../../utils/http/places';
import { ResponseEditPlaceData } from '../../models/places';
import useAppDispatch from '../app/app-dispatch';
import { showNotification } from '../../store/notification/notification-slice';

export const useSharePlace = (placeId: string | undefined) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const queryKey = ['places', placeId];

  const mutationData = useMutation({
    mutationFn: editPlace,
    onMutate: async ({ shared }) => {
      await queryClient.cancelQueries({ queryKey });

      const { place: oldPlace }: ResponseEditPlaceData = queryClient.getQueryData(queryKey)!;
      const updatedPlace = { place: { ...oldPlace, shared } };

      queryClient.setQueryData(queryKey, updatedPlace);

      return { oldPlace };
    },
    onSuccess(data) {
      dispatch(showNotification({ message: data!.message, status: 'success' }));
    },
    onError(error, _, context) {
      queryClient.setQueryData(queryKey, { place: context?.oldPlace });
      dispatch(showNotification({ message: error.message, status: 'error' }));
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return { ...mutationData };
};
