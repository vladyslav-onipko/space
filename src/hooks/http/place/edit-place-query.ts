import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editPlace } from '../../../utils/http/place';
import { ResponseEditPlaceData } from '../../../models/place';
import useAppDispatch from '../../app/app-dispatch';
import { showNotification } from '../../../store/notification/notification-slice';
import { ResponseError } from '../../../models/http-error';

export const useEditPlace = (queryKey: (string | number | boolean | null)[]) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const mutationData = useMutation({
    mutationFn: editPlace,
    onMutate: async ({ placeData }) => {
      await queryClient.cancelQueries({ queryKey });

      const oldData: ResponseEditPlaceData = queryClient.getQueryData(queryKey)!;
      const updatedData = { ...oldData, place: { ...oldData.place, ...placeData } };

      queryClient.setQueryData(queryKey, updatedData);
      navigate(-1);

      return { oldData };
    },
    onSuccess(data) {
      dispatch(showNotification({ message: data!.message, status: 'success' }));
    },
    onError(error: ResponseError, data, context) {
      queryClient.setQueryData(queryKey, context?.oldData);
      dispatch(showNotification({ message: error.message, status: 'error' }));

      if (error.errors && error.errors.length) {
        error.errors.forEach((error) => data.setFieldError!(error.field, error.message));
      }
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return { ...mutationData };
};
