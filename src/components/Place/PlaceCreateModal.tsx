import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Formik, FormikHelpers, FormikProps } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import isequal from 'lodash.isequal';

import Modal from '../UI/Base/Modal';
import Form from '../UI/Form/Form';
import Button from '../UI/Base/Button';
import Input from '../UI/Form/Elements/Input';
import ImagePicker from '../UI/Form/Elements/ImagePicker';
import Checkbox from '../UI/Form/Elements/Checkbox';

import useAppDispatch from '../../hooks/app-dispatch';
import useAppSelector from '../../hooks/app-selector';

import { PlaceCreateInputValues } from '../../models/places';
import { PlaceCreateSchema } from '../../schemas/form-validation/places';
import { showNotification } from '../../store/notification/notification-slice';
import { createPlace } from '../../utils/http/places';
import { UrlParamsContext } from '../../store/http/url-params-context';
import { ServerInputError, ResponseError } from '../../models/http-error';

const PlaceCreateModal: React.FC = () => {
  const [showModal, setShowModal] = useState(true);
  const { token, user } = useAppSelector((state) => state.auth);
  const { urlParams, setUrlParams } = useContext(UrlParamsContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
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

  const initialInputValues: PlaceCreateInputValues = {
    image: '',
    title: '',
    description: '',
    address: '',
    shared: false,
  };

  const handleShowModal = () => {
    setShowModal(false);
    setTimeout(() => navigate(-1), 200);
  };

  const handleSubmit = async (values: PlaceCreateInputValues, actions: FormikHelpers<PlaceCreateInputValues>) => {
    mutate({ placeData: values, userId: user.id, token: token!, setFieldError: actions.setFieldError });
  };

  return (
    <Modal title="Create new place" showModal={showModal} onShowModal={handleShowModal}>
      <Formik initialValues={initialInputValues} onSubmit={handleSubmit} validationSchema={PlaceCreateSchema}>
        {({ isValid, dirty, isSubmitting, setFieldValue, setFieldTouched }: FormikProps<PlaceCreateInputValues>) => (
          <Form
            actions={
              <>
                <Button text="Cancel" onClick={handleShowModal} />
                <Button
                  disabled={(!isValid || !dirty) && !isSubmitting}
                  type="submit"
                  text={isSubmitting ? 'Creating...' : 'Create'}
                  mode="secondary"
                />
              </>
            }
          >
            <ImagePicker
              id="image"
              name="image"
              label="Image"
              onSetFieldValue={setFieldValue}
              onSetFieldTouched={setFieldTouched}
            />
            <Input type="text" label="Title" placeholder="enter place title" id="title" name="title" required />
            <Input
              label="Description"
              placeholder="enter place description"
              id="description"
              name="description"
              inputType="textarea"
              cols={5}
              rows={5}
              required
            />
            <Input type="text" label="Address" placeholder="enter place address" id="address" name="address" required />
            <Checkbox label="Share place with people" name="shared" id="shared" />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default PlaceCreateModal;
