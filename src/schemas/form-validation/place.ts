import { string, object, mixed } from 'yup';

const FILE_SIZE_BYTES = 5_120_000;

const fileFormatValidation = (file: any) => {
  if (!file) return true;
  return ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
};

const fileSizeValidation = (file: any) => {
  if (!file) return true;
  return file.size <= FILE_SIZE_BYTES;
};

export const PlaceCreateSchema = object().shape({
  address: string().required('Field must not be empty'),
  title: string().min(3, 'Title must be at least 3 characters long').required('Field must not be empty'),
  image: mixed()
    .test('fileFormat', 'Only .jpg, .png, .jpeg are allowed', fileFormatValidation)
    .test('fileSize', 'File size must be less than 5MB', fileSizeValidation),
  description: string()
    .min(10, 'Description must be at least 10 characters long')
    .max(200, 'Description must be less than 200 characters long')
    .required('Field must not be empty'),
});

export const PlaceEditSchema = object().shape({
  title: string().min(3, 'Title must be at least 3 characters long').required('Field must not be empty'),
  image: mixed()
    .test('fileFormat', 'Only .jpg, .png, .jpeg are allowed', fileFormatValidation)
    .test('fileSize', 'File size must be less than 5MB', fileSizeValidation),
  description: string()
    .min(10, 'Description must be at least 10 characters long')
    .max(200, 'Description must be less than 200 characters long')
    .required('Field must not be empty'),
});
