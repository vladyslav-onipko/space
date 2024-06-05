import { Formik, FormikProps, FormikHelpers } from 'formik';
import { styled } from 'styled-components';

import HeroImage from '../../components/Hero/HeroImage';
import Input from '../../components/UI/Form/Elements/Input';
import Form from '../../components/UI/Form/Form';
import Button from '../../components/UI/Base/Button';
import Section from '../../components/UI/Base/Section';
import Container from '../../components/UI/Base/Container';
import FormWrapper from '../../components/UI/Form/FormWrapper';
import ImagePicker from '../../components/UI/Form/Elements/ImagePicker';
import Link from '../../components/UI/Base/Link';

import useAppDispatch from '../../hooks/app-dispatch';
import usePasswordVisibility from '../../hooks/password-visibility';

import spacexImage from '../../assets/img/spacex.jpg';
import { SignupSchema } from '../../schemas/form-validation/user';
import { userRouts } from '../../router/routs';
import { SignupInputValues } from '../../models/user';
import { auth } from '../../store/user/auth/auth-actions';
import { ServerError } from '../../models/http-error';
import { showNotification } from '../../store/notification/notification-slice';

const LoginLink = styled(Link)`
  color: var(--color-white);
  margin-top: 35px;

  &:hover,
  &:focus {
    color: var(--color-2--1);
  }
`;

const Registration: React.FC = () => {
  const { icon, type, changePasswordVisibility } = usePasswordVisibility();
  const dispatch = useAppDispatch();
  const {
    icon: confPwIcon,
    type: confPwType,
    changePasswordVisibility: changeConfirmPasswordVisibility,
  } = usePasswordVisibility();

  const initialInputValues: SignupInputValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '',
  };

  const handleChangePasswordVisibility = () => {
    changePasswordVisibility();
  };

  const handleChangeConfirmPasswordVisibility = () => {
    changeConfirmPasswordVisibility();
  };

  const handleSubmit = async (values: SignupInputValues, actions: FormikHelpers<SignupInputValues>) => {
    try {
      const response = await dispatch(auth('signup', values));
      dispatch(showNotification({ message: response!.message, status: 'success' }));
    } catch (e: any) {
      dispatch(showNotification({ message: e.message, status: 'error' }));

      if (e.errors && e.errors.length) {
        e.errors.forEach((error: ServerError) => actions.setFieldError(error.field, error.message));
      }
    }
  };

  return (
    <>
      <HeroImage title="Become a part of space" />
      <Section hiddenTitle="Signup form">
        <Container>
          <FormWrapper image={spacexImage} title="Sing up for free">
            <Formik initialValues={initialInputValues} onSubmit={handleSubmit} validationSchema={SignupSchema}>
              {({ isValid, dirty, isSubmitting, setFieldValue, setFieldTouched }: FormikProps<SignupInputValues>) => (
                <Form
                  actions={
                    <Button
                      disabled={(!isValid || !dirty) && !isSubmitting}
                      type="submit"
                      text={isSubmitting ? 'Submitting...' : 'Sign up'}
                      mode="primary"
                    />
                  }
                >
                  <ImagePicker
                    id="image"
                    name="image"
                    label="Avatar"
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
                  <Input
                    type="email"
                    label="Email"
                    placeholder="enter your email"
                    id="email"
                    name="email"
                    icon={['far', 'envelope']}
                    required
                  />
                  <Input
                    type={type as 'password' | 'text'}
                    label="Password"
                    placeholder="enter your password"
                    id="password"
                    name="password"
                    icon={icon}
                    onChangePasswordVisibility={handleChangePasswordVisibility}
                    required
                  />
                  <Input
                    type={confPwType as 'password' | 'text'}
                    label="Confirm password"
                    placeholder="confirm your password"
                    id="confirmPassword"
                    name="confirmPassword"
                    icon={confPwIcon}
                    onChangePasswordVisibility={handleChangeConfirmPasswordVisibility}
                    required
                  />
                </Form>
              )}
            </Formik>
            <LoginLink type="router-link" mode="regular" text="Already have an account?" to={userRouts.SIGNIN} />
          </FormWrapper>
        </Container>
      </Section>
    </>
  );
};

export default Registration;
