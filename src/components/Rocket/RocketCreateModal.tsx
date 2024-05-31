import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Formik, FormikProps } from 'formik';
import { useMutation } from '@tanstack/react-query';
import isequal from 'lodash.isequal';

import Modal from '../UI/Base/Modal';
import Form from '../UI/Form/Form';
import Button from '../UI/Base/Button';
import Input from '../UI/Form/Elements/Input';
import ImagePicker from '../UI/Form/Elements/ImagePicker';
import Checkbox from '../UI/Form/Elements/Checkbox';

import useAppDispatch from '../../hooks/app-dispatch';
import useAppSelector from '../../hooks/app-selector';

import { RocketCreateInputValues } from '../../models/rockets';
import { RocketSchema } from '../../schemas/form-validation/user';
import { userRouts } from '../../router/routs';
import { showNotification } from '../../store/notification/notification-slice';
import { createRocket } from '../../utils/http/user';
import { UrlParamsContext } from '../../store/http/url-params-context';
import { queryClient } from '../..';

const RocketCreateModal: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { token, user } = useAppSelector((state) => state.auth);
  const { urlParams, setUrlParams } = useContext(UrlParamsContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate } = useMutation({
    mutationFn: createRocket,
    onSuccess(data) {
      const newUrlParams = { filter: '', page: 1, search: '' };

      if (isequal(urlParams, newUrlParams)) {
        queryClient.invalidateQueries({ queryKey: ['rockets'] });
      } else {
        setUrlParams(newUrlParams);
      }

      navigate(-1);
      dispatch(showNotification({ message: data.message, status: 'success' }));
    },
    onError(error) {
      dispatch(showNotification({ message: error.message, status: 'error' }));
    },
  });

  const initialInputValues: RocketCreateInputValues = {
    image: '',
    title: '',
    description: '',
    shared: false,
  };

  const handleShowModal = () => {
    setShowModal((show) => {
      if (!show) {
        navigate(userRouts.ADD_ROCKET);
      } else {
        setTimeout(() => navigate(-1), 200);
      }
      return !show;
    });
  };

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleSubmit = async (values: RocketCreateInputValues) => {
    mutate({ rocketData: values, userId: user.id, token: token! });
  };

  return (
    <Modal title="Create new rocket" showModal={showModal} onShowModal={handleShowModal}>
      <Formik initialValues={initialInputValues} onSubmit={handleSubmit} validationSchema={RocketSchema}>
        {({ isValid, dirty, isSubmitting, setFieldValue, setFieldTouched }: FormikProps<RocketCreateInputValues>) => (
          <Form
            actions={
              <>
                <Button text="Cancel" onClick={handleShowModal} />
                <Button
                  disabled={(!isValid || !dirty) && !isSubmitting}
                  type="submit"
                  text={isSubmitting ? 'Submitting...' : 'Add'}
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
            <Input type="text" label="Title" placeholder="enter rocket title" id="title" name="title" required />
            <Input
              label="Description"
              placeholder="enter rocket description"
              id="description"
              name="description"
              inputType="textarea"
              cols={5}
              rows={5}
              required
            />
            <Checkbox label="Share rocket with people" name="shared" id="shared" />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default RocketCreateModal;
