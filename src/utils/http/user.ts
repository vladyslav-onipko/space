import axios from 'axios';

import HttpError from '../../models/http-error';

interface getUserProfileConfig {
  userId: string;
  token: string | null;
  urlParams: { [key: string]: string | number };
  signal: any;
}

export const getUserProfile = async ({ userId, token, urlParams, signal }: getUserProfileConfig) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`;

  try {
    const response = await axios.get(url, {
      params: urlParams,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal,
    });

    return response.data;
  } catch (e: any) {
    if (e.response) {
      throw new HttpError(e.response.data.message);
    }

    if (e.request) {
      throw new HttpError('Sorry, something went wrong, please try again later');
    }
  }
};
