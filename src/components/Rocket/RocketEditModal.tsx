import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Formik, FormikProps } from 'formik';
import { useQuery, useMutation } from '@tanstack/react-query';

import Form from '../UI/Form/Form';
import Modal from '../UI/Base/Modal';
import Button from '../UI/Base/Button';
import Input from '../UI/Form/Elements/Input';
import ImagePicker from '../UI/Form/Elements/ImagePicker';
import ErrorBlock from '../UI/Helpers/ErrorBlock';
import Spinner from '../UI/Helpers/Spinner';
import ContentWrapper from '../UI/Helpers/ContentWrapper';

import useAppSelector from '../../hooks/app-selector';

import { userRouts } from '../../router/routs';
import { RocketSchema } from '../../schemas/form-validation/user';
import { RocketEditInputValues } from '../../models/rockets';
import { getRocket } from '../../utils/http/rockets';
import { editRocket } from '../../utils/http/user';
import { queryClient } from '../..';

const RocketEditModal: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id: rocketId } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['rocket', rocketId],
    queryFn: ({ signal }) => getRocket({ signal, rocketId: rocketId! }),
  });

  const { mutate } = useMutation({
    mutationFn: editRocket,
    onSuccess(data) {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['rockets'] });
      navigate(-1);
    },
    onError(error) {
      console.log(error.message);
    },
  });

  const rocketEditRoute = userRouts.EDIT_ROCKET.replace(':id', rocketId!);
  const { rocket } = data || {};
  let modalContent;

  const initialInputValues: RocketEditInputValues = {
    title: rocket?.title || '',
    description: rocket?.description || '',
    image: '',
  };

  const handleShowModal = () => {
    setShowModal((show) => {
      if (!show) {
        navigate(rocketEditRoute);
      } else {
        setTimeout(() => navigate(-1), 200);
      }
      return !show;
    });
  };

  const handleSubmit = (values: RocketEditInputValues) => {
    mutate({ rocketData: values, rocketId: rocketId!, creator: rocket.creator, token: token! });
  };

  useEffect(() => {
    setShowModal(true);
  }, []);

  if (isPending) {
    modalContent = (
      <ContentWrapper>
        <Spinner />
      </ContentWrapper>
    );
  }

  if (!isPending) {
    modalContent = (
      <Formik initialValues={initialInputValues} onSubmit={handleSubmit} validationSchema={RocketSchema}>
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
                />
              </>
            }
          >
            <ImagePicker
              id="image"
              name="image"
              label="Image"
              imagePath={rocket.image}
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
