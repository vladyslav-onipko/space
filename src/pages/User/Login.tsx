import { Formik, FormikHelpers, FormikProps } from 'formik';
import { styled } from 'styled-components';

import HeroImage from '../../components/Hero/HeroImage';
import Link from '../../components/UI/Base/Link';
import Section from '../../components/UI/Base/Section';
import Container from '../../components/UI/Base/Container';
import FormWrapper from '../../components/UI/Form/FormWrapper';
import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Form/Elements/Input';
import Button from '../../components/UI/Base/Button';

import useAppDispatch from '../../hooks/app/app-dispatch';
import usePasswordVisibility from '../../hooks/form/password-visibility';

import { userRouts } from '../../router/routs';
import shuttleImage from '../../assets/img/shuttle.jpg';
import { SigninSchema } from '../../schemas/form-validation/user';
import { SigninInputValues } from '../../models/user';
import { auth } from '../../store/user/auth/auth-actions';
import { ServerInputError } from '../../models/http-error';
import { showNotification } from '../../store/notification/notification-slice';

const RegisterLink = styled(Link)`
  color: var(--color-white);
  margin-top: 35px;

  &:hover,
  &:focus {
    color: var(--color-2--1);
  }
`;

const Login: React.FC = () => {
  const { icon, type, changePasswordVisibility } = usePasswordVisibility();
  const dispatch = useAppDispatch();

  const initialInputValues: SigninInputValues = {
    email: '',
    password: '',
  };

  const handleChangePasswordVisibility = () => {
    changePasswordVisibility();
  };

  const handleSubmit = async (values: SigninInputValues, actions: FormikHelpers<SigninInputValues>) => {
    try {
      const response = await dispatch(auth('signin', values));
      dispatch(showNotification({ message: response!.message, status: 'success' }));
    } catch (e: any) {
      dispatch(showNotification({ message: e.message, status: 'error' }));

      if (e.errors && e.errors.length) {
        e.errors.forEach((error: ServerInputError) => actions.setFieldError(error.field, error.message));
      }
    }
  };

  return (
    <>
      <HeroImage title="Become a part of space" />
      <Section hiddenTitle="Login form">
        <Container>
          <FormWrapper image={shuttleImage} title="Sign in">
            <Formik initialValues={initialInputValues} onSubmit={handleSubmit} validationSchema={SigninSchema}>
              {({ isValid, dirty, isSubmitting }: FormikProps<SigninInputValues>) => (
                <Form
                  actions={
                    <Button
                      disabled={(!isValid || !dirty) && !isSubmitting}
                      type="submit"
                      text={isSubmitting ? 'Submitting...' : 'Sign in'}
                      mode="primary"
                    />
                  }
                >
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
                </Form>
              )}
            </Formik>
            <RegisterLink type="router-link" mode="regular" text="Do not have an account?" to={userRouts.SIGNUP} />
          </FormWrapper>
        </Container>
      </Section>
    </>
  );
};

export default Login;
