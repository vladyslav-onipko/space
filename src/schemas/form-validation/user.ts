import { string, object, mixed, ref } from 'yup';

// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const FILE_SIZE_BYTES = 5_120_000;

const fileFormatValidation = (file: any) => {
  if (!file) return true;
  return ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
};

const fileSizeValidation = (file: any) => {
  if (!file) return true;
  return file.size <= FILE_SIZE_BYTES;
};

export const SignupSchema = object().shape({
  email: string().email('Please enter a valid email').required('Field must not be empty'),
  name: string().min(3, 'Name must be at least 3 characters long').required('Field must not be empty'),
  image: mixed()
    .test('fileFormat', 'Only .jpg, .png, .jpeg are allowed', fileFormatValidation)
    .test('fileSize', 'File size must be less than 5MB', fileSizeValidation),
  password: string()
    .min(6)
    .matches(passwordRules, {
      message: 'Min 5 char, 1 upper case, 1 lower case, 1 digit',
    })
    .required('Field must not be empty'),
  confirmPassword: string()
    .oneOf([ref('password')], 'Password must match')
    .required('Field must not be empty'),
});

export const SigninSchema = object().shape({
  email: string().email('Please enter a valid email').required('Field must not be empty'),
  password: string()
    .min(6)
    .matches(passwordRules, {
      message: 'Min 5 char, 1 upper, 1 lower, 1 digit',
    })
    .required('Field must not be empty'),
});

export const ProfileEditSchema = object().shape({
  name: string().min(3, 'Name must be at least 3 characters long').required('Field must not be empty'),
  image: mixed()
    .test('fileFormat', 'Only .jpg, .png, .jpeg are allowed', fileFormatValidation)
    .test('fileSize', 'File size must be less than 5MB', fileSizeValidation),
});
