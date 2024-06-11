import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import useAppDispatch from '../app/app-dispatch';
import useAppSelector from '../app/app-selector';
import { showNotification } from '../../store/notification/notification-slice';
import { deletePlace } from '../../utils/http/places';
import { userRouts } from '../../router/routs';

export const useDeletePlace = (placeId: string | undefined) => {
  const user = useAppSelector((state) => state.auth.user);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const profileRoute = userRouts.PROFILE.replace(':id', user.id);
  const queryKey = ['places'];

  const mutationData = useMutation({
    mutationFn: deletePlace,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey, refetchType: 'none' });
      dispatch(showNotification({ message: data.message, status: 'success' }));
      navigate(profileRoute, { replace: true });
    },
    onError(error) {
      dispatch(showNotification({ message: error.message, status: 'error' }));
    },
  });

  return { ...mutationData };
};
