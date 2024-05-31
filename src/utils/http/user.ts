import axios from 'axios';

import HttpError from '../../models/http-error';
import { RocketCreateInputValues, RocketEditInputValues } from '../../models/rockets';

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

interface createRocketConfig {
  rocketData: RocketCreateInputValues;
  userId: string;
  token: string;
}

export const createRocket = async ({ rocketData, userId, token }: createRocketConfig) => {
  const requestData = new FormData();

  requestData.append('title', rocketData.title);
  requestData.append('image', rocketData.image);
  requestData.append('description', rocketData.description);
  requestData.append('creator', userId);
  requestData.append('shared', rocketData.shared.toString());

  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/rockets`, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
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

interface EditRocketConfig {
  rocketData: RocketEditInputValues | {};
  rocketId: string;
  creator?: string;
  token?: string;
  userLike?: string;
  shared?: boolean;
}

export const editRocket = async ({ rocketData, rocketId, creator, token, shared, userLike }: EditRocketConfig) => {
  const requestData = new FormData();

  let url = `${process.env.REACT_APP_BACKEND_URL}/api/rockets/${rocketId}`;
  let params: {} = { shared };
  let headers: {} = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  };

  if ('title' in rocketData && creator) {
    requestData.append('title', rocketData.title);
    requestData.append('image', rocketData.image);
    requestData.append('description', rocketData.description);
    requestData.append('creator', creator);
  }

  if (userLike) {
    url = `${process.env.REACT_APP_BACKEND_URL}/api/rockets/${rocketId}/favorite`;
    params = { userLike };
    headers = {};
  }

  try {
    const response = await axios.patch(url, requestData, {
      params,
      headers,
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
