import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editPlace } from '../../utils/http/places';
import { ResponseEditPlaceData } from '../../models/places';
import useAppDispatch from '../app/app-dispatch';
import { showNotification } from '../../store/notification/notification-slice';
import { ResponseError, ServerInputError } from '../../models/http-error';

export const useEditPlace = (placeId: string | undefined) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const queryKey = ['places', placeId];

  const mutationData = useMutation({
    mutationFn: editPlace,
    onMutate: async ({ placeData }) => {
      await queryClient.cancelQueries({ queryKey });

      const { place: oldPlace }: ResponseEditPlaceData = queryClient.getQueryData(queryKey)!;
      const updatedPlace = { place: { ...oldPlace, ...placeData } };

      queryClient.setQueryData(queryKey, updatedPlace);
      navigate(-1);

      return { oldPlace };
    },
    onSuccess(data) {
      dispatch(showNotification({ message: data!.message, status: 'success' }));
    },
    onError(error: ResponseError, data, context) {
      queryClient.setQueryData(queryKey, { place: context?.oldPlace });
      dispatch(showNotification({ message: error.message, status: 'error' }));

      if (error.errors && error.errors.length) {
        error.errors.forEach((error: ServerInputError) => data.setFieldError!(error.field, error.message));
      }
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return { ...mutationData };
};
