import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Formik, FormikHelpers, FormikProps } from 'formik';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Form from '../UI/Form/Form';
import Modal from '../UI/Base/Modal';
import Button from '../UI/Base/Button';
import Input from '../UI/Form/Elements/Input';
import ImagePicker from '../UI/Form/Elements/ImagePicker';
import ErrorBlock from '../UI/Helpers/ErrorBlock';
import Spinner from '../UI/Helpers/Spinner';
import ContentWrapper from '../UI/Helpers/ContentWrapper';

import useAppSelector from '../../hooks/app-selector';
import useAppDispatch from '../../hooks/app-dispatch';

import { RocketEditSchema } from '../../schemas/form-validation/rockets';
import { Rocket, RocketEditInputValues } from '../../models/rockets';
import { getRocket } from '../../utils/http/rockets';
import { editRocket } from '../../utils/http/rockets';
import { showNotification } from '../../store/notification/notification-slice';
import { ServerError, ResponseError } from '../../models/http-error';

const RocketEditModal: React.FC = () => {
  const [showModal, setShowModal] = useState(true);
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id: rocketId } = useParams();

  const queryKey = ['rockets', rocketId];

  const { data, isPending, isError, error } = useQuery({
    queryKey,
    queryFn: ({ signal }) => getRocket({ signal, rocketId: rocketId! }),
  });

  const { mutate } = useMutation({
    mutationFn: editRocket,
    onMutate: async ({ rocketData }) => {
      await queryClient.cancelQueries({ queryKey });

      const { rocket: oldRocket }: { rocket: Rocket } = queryClient.getQueryData(queryKey)!;
      const newRocket = { rocket: { ...oldRocket, ...rocketData } };

      queryClient.setQueryData(queryKey, newRocket);
      navigate(-1);

      return { oldRocket };
    },
    onSuccess(data) {
      dispatch(showNotification({ message: data.message, status: 'success' }));
    },
    onError(error: ResponseError, data, context) {
      queryClient.setQueryData(queryKey, { rocket: context?.oldRocket });
      dispatch(showNotification({ message: error.message, status: 'error' }));

      if (error.errors && error.errors.length) {
        error.errors.forEach((error: ServerError) => data.setFieldError!(error.field, error.message));
      }
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  let modalContent;

  const initialInputValues: RocketEditInputValues = {
    title: data?.rocket.title || '',
    description: data?.rocket.description || '',
    image: '',
  };

  const handleShowModal = () => {
    setShowModal(false);
    setTimeout(() => navigate(-1), 200);
  };

  const handleSubmit = (values: RocketEditInputValues, actions: FormikHelpers<RocketEditInputValues>) => {
    mutate({
      rocketData: values,
      rocketId: rocketId!,
      token: token!,
      setFieldError: actions.setFieldError,
    });
  };

  if (isPending) {
    modalContent = (
      <ContentWrapper>
        <Spinner />
      </ContentWrapper>
    );
  }

  if (data && !isPending) {
    modalContent = (
      <Formik initialValues={initialInputValues} onSubmit={handleSubmit} validationSchema={RocketEditSchema}>
        {({ isValid, dirty, isSubmitting, setFieldValue, setFieldTouched }: FormikProps<RocketEditInputValues>) => (
          <Form
            actions={
              <>
                <Button text="Cancel" onClick={handleShowModal} />
                <Button
                  type="submit"
                  text={isSubmitting ? 'Submitting' : 'Edit'}
                  mode="secondary"
                  disabled={(!isValid || !dirty) && !isSubmitting}
                  data-valid={isValid}
                  data-dirty={dirty}
                />
              </>
            }
          >
            <ImagePicker
              id="image"
              name="image"
              label="Image"
              imagePath={data.rocket.image}
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
          </Form>
        )}
      </Formik>
    );
  }

  return (
    <Modal title="Edit rocket" showModal={showModal} onShowModal={handleShowModal}>
      {modalContent}
      {isError && !isPending && <ErrorBlock message={error.message} />}
    </Modal>
  );
};

export default RocketEditModal;
