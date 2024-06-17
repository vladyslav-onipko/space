import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Formik, FormikHelpers, FormikProps } from 'formik';

import Form from '../UI/Form/Form';
import Modal from '../UI/Base/Modal';
import Button from '../UI/Base/Button';
import Input from '../UI/Form/Elements/Input';
import ImagePicker from '../UI/Form/Elements/ImagePicker';
import ErrorBlock from '../UI/Helpers/ErrorBlock';
import Spinner from '../UI/Helpers/Spinner';
import ContentWrapper from '../UI/Helpers/ContentWrapper';

import useAppSelector from '../../hooks/app/app-selector';
import { PlaceEditSchema } from '../../schemas/form-validation/place';
import { PlaceEditInputValues } from '../../models/place';
import { useEditPlace } from '../../hooks/http/place/edit-place-query';
import { useGetPlace } from '../../hooks/http/place/get-place-query';

const PlaceEditModal: React.FC = () => {
  const [showModal, setShowModal] = useState(true);
  const { token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id: placeId } = useParams();

  const editPlaceQueryKey = ['places', placeId!];

  const { data, isPending, isError, error } = useGetPlace(editPlaceQueryKey, placeId!);
  const { mutate } = useEditPlace(editPlaceQueryKey);

  let modalContent;

  const initialInputValues: PlaceEditInputValues = {
    title: data?.place.title || '',
    description: data?.place.description || '',
    image: '',
  };

  const handleShowModal = () => {
    setShowModal(false);
    setTimeout(() => navigate(-1), 200);
  };

  const handleSubmit = (values: PlaceEditInputValues, actions: FormikHelpers<PlaceEditInputValues>) => {
    mutate({
      placeData: values,
      placeId: placeId!,
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
      <Formik initialValues={initialInputValues} onSubmit={handleSubmit} validationSchema={PlaceEditSchema}>
        {({ isValid, dirty, isSubmitting, setFieldValue, setFieldTouched }: FormikProps<PlaceEditInputValues>) => (
          <Form
            actions={
              <>
                <Button text="Cancel" onClick={handleShowModal} />
                <Button
                  type="submit"
                  text={isSubmitting ? 'Editing...' : 'Edit'}
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
              imagePath={data.place.image}
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
          </Form>
        )}
      </Formik>
    );
  }

  return (
    <Modal title="Edit place" showModal={showModal} onShowModal={handleShowModal}>
      {modalContent}
      {isError && !isPending && <ErrorBlock message={error.message} />}
    </Modal>
  );
};

export default PlaceEditModal;
