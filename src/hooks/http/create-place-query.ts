import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import isequal from 'lodash.isequal';

import { createPlace } from '../../utils/http/place';
import { ServerInputError, ResponseError } from '../../models/http-error';
import { showNotification } from '../../store/notification/notification-slice';
import useAppDispatch from '../app/app-dispatch';
import { UrlParamsContext } from '../../store/http/url-params-context';

export const useCreatePlace = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { urlParams, setUrlParams } = useContext(UrlParamsContext);

  const mutationData = useMutation({
    mutationFn: createPlace,
    onSuccess(data) {
      const newUrlParams = { filter: '', page: 1, search: '' };

      if (isequal(urlParams, newUrlParams)) {
        queryClient.invalidateQueries({ queryKey: ['places'] });
      } else {
        setUrlParams(newUrlParams);
      }

      dispatch(showNotification({ message: data!.message, status: 'success' }));
      navigate(-1);
    },
    onError(error: ResponseError, data) {
      dispatch(showNotification({ message: error.message, status: 'error' }));

      if (error.errors && error.errors.length) {
        error.errors.forEach((error: ServerInputError) => data.setFieldError!(error.field, error.message));
      }
    },
  });

  return { ...mutationData };
};
