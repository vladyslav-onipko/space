import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Formik, FormikHelpers, FormikProps } from 'formik';

import Modal from '../UI/Base/Modal';
import Form from '../UI/Form/Form';
import Button from '../UI/Base/Button';
import Input from '../UI/Form/Elements/Input';
import ImagePicker from '../UI/Form/Elements/ImagePicker';
import Checkbox from '../UI/Form/Elements/Checkbox';

import useAppSelector from '../../hooks/app/app-selector';
import { PlaceCreateInputValues } from '../../models/places';
import { PlaceCreateSchema } from '../../schemas/form-validation/places';
import { useCreatePlace } from '../../hooks/http/create-place-query';

const PlaceCreateModal: React.FC = () => {
  const [showModal, setShowModal] = useState(true);
  const { token, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const { mutate: createPlace } = useCreatePlace();

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
    createPlace({ placeData: values, userId: user.id, token: token!, setFieldError: actions.setFieldError });
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
