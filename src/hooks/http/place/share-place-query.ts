import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editPlace } from '../../../utils/http/place';
import { ResponseEditPlaceData } from '../../../models/place';
import useAppDispatch from '../../app/app-dispatch';
import { showNotification } from '../../../store/notification/notification-slice';

export const useSharePlace = (queryKey: (string | number | boolean | null)[]) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const mutationData = useMutation({
    mutationFn: editPlace,
    onMutate: async ({ shared }) => {
      await queryClient.cancelQueries({ queryKey });

      const oldData: ResponseEditPlaceData = queryClient.getQueryData(queryKey)!;
      const updatedPlace = { ...oldData, place: { ...oldData.place, shared } };

      queryClient.setQueryData(queryKey, updatedPlace);

      return { oldData };
    },
    onSuccess(data) {
      dispatch(showNotification({ message: data!.message, status: 'success' }));
    },
    onError(error, _, context) {
      queryClient.setQueryData(queryKey, context?.oldData);
      dispatch(showNotification({ message: error.message, status: 'error' }));
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return { ...mutationData };
};
