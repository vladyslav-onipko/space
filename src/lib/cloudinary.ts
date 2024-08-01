import axios from 'axios';

import HttpError from '../models/http-error';

const uploadImage = async (image: File) => {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
  const formData = new FormData();

  formData.append('file', image);
  formData.append('upload_preset', uploadPreset as string);

  try {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);

    return response.data.secure_url;
  } catch (e: any) {
    if (e.response) {
      throw new HttpError('Failed to save image. Please try again later');
    }

    if (e.request) {
      throw new HttpError('Sorry, something went wrong, please try again later');
    }
  }
};

export default uploadImage;
