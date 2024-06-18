import axios from 'axios';

import HttpError from '../../models/http-error';
import {
  ResponseGetUserProfileData,
  RequestGetUserProfileData,
  ResposneGetUsersData,
  RequestGetUsersData,
} from '../../models/user';

export const getUserProfile = async ({
  userId,
  token,
  urlParams,
  signal,
}: RequestGetUserProfileData): Promise<ResponseGetUserProfileData | undefined> => {
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

export const getUsers = async ({ max, signal }: RequestGetUsersData): Promise<ResposneGetUsersData | undefined> => {
  try {
    const response = await axios.get<ResposneGetUsersData>(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
      signal,
      params: { max },
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
