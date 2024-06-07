import axios from 'axios';

import HttpError from '../../models/http-error';

import {
  GetRocketConfig,
  ResponseGetRocketData,
  CreateRocketConfig,
  EditRocketConfig,
  DeleteRocketConfig,
} from '../../models/rockets';

export const getRocket = async ({ rocketId, signal }: GetRocketConfig): Promise<ResponseGetRocketData | undefined> => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/rockets/${rocketId}`;

  try {
    const response = await axios.get(url, { signal });

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

export const createRocket = async ({ rocketData, userId, token }: CreateRocketConfig) => {
  const requestData = new FormData();

  requestData.append('address', rocketData.address);
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
      throw new HttpError(e.response.data.message, e.response.data.errors);
    }

    if (e.request) {
      throw new HttpError('Sorry, something went wrong, please try again later');
    }
  }
};

export const editRocket = async ({ rocketData, rocketId, token, shared }: EditRocketConfig) => {
  const requestData = new FormData();

  if ('title' in rocketData) {
    requestData.append('title', rocketData.title);
    requestData.append('image', rocketData.image);
    requestData.append('description', rocketData.description);
  }

  try {
    const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/rockets/${rocketId}`, requestData, {
      params: { shared },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (e: any) {
    if (e.response) {
      throw new HttpError(e.response.data.message, e.response.data.errors);
    }

    if (e.request) {
      throw new HttpError('Sorry, something went wrong, please try again later');
    }
  }
};

export const deleteRocket = async ({ rocketId, token }: DeleteRocketConfig) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/rockets/${rocketId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (e: any) {
    if (e.response) {
      throw new HttpError(e.response.data.message, e.response.data.errors);
    }

    if (e.request) {
      throw new HttpError('Sorry, something went wrong, please try again later');
    }
  }
};
