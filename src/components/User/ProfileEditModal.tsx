import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Formik, FormikHelpers, FormikProps } from 'formik';

import Modal from '../../components/UI/Base/Modal';
import Form from '../../components/UI/Form/Form';
import Input from '../UI/Form/Elements/Input';
import ImagePicker from '../../components/UI/Form/Elements/ImagePicker';
import Button from '../../components/UI/Base/Button';

import useAppSelector from '../../hooks/app/app-selector';
import useAppDispatch from '../../hooks/app/app-dispatch';

import { ProfileEditSchema } from '../../schemas/form-validation/user';
import { ProfileEditInputValues } from '../../models/user';
import { updateProfile } from '../../store/user/profile/profile-actions';
import { showNotification } from '../../store/notification/notification-slice';
import { ServerInputError } from '../../models/http-error';

const ProfileEditModal: React.FC = () => {
  const { user, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  const initialInputValues: ProfileEditInputValues = {
    image: '',
    name: user.name,
  };

  const handleShowModal = () => {
    setShowModal(false);
    setTimeout(() => navigate(-1), 200);
  };

  const handleSubmit = async (values: ProfileEditInputValues, actions: FormikHelpers<ProfileEditInputValues>) => {
    try {
      const data = await dispatch(updateProfile(values, user.id, token));
      dispatch(showNotification({ message: data.message, status: 'success' }));
      navigate(-1);
    } catch (e: any) {
      dispatch(showNotification({ message: e.message, status: 'error' }));
      if (e.errors && e.errors.length) {
        e.errors.forEach((error: ServerInputError) => actions.setFieldError(error.field, error.message));
      }
    }
  };

  return (
    <Modal title="Edit profile" showModal={showModal} onShowModal={handleShowModal}>
      <Formik initialValues={initialInputValues} onSubmit={handleSubmit} validationSchema={ProfileEditSchema}>
        {({ isValid, dirty, isSubmitting, setFieldValue, setFieldTouched }: FormikProps<ProfileEditInputValues>) => (
          <Form
            actions={
              <>
                <Button text="Cancel" onClick={handleShowModal} />
                <Button
                  disabled={(!isValid || !dirty) && !isSubmitting}
                  type="submit"
                  text={isSubmitting ? 'Submitting...' : 'Edit'}
                  mode="secondary"
                />
              </>
            }
          >
            <ImagePicker
              id="image"
              name="image"
              label="Avatar"
              imagePath={user.image}
              onSetFieldValue={setFieldValue}
              onSetFieldTouched={setFieldTouched}
            />
            <Input
              type="text"
              label="Username"
              placeholder="enter your name"
              id="name"
              name="name"
              icon={['far', 'circle-user']}
              required
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ProfileEditModal;
