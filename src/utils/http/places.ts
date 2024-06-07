import axios from 'axios';

import HttpError from '../../models/http-error';

import {
  RequestCreatePlaceData,
  ResponseGetPlaceData,
  ResponseCreatePlaceData,
  ResponseEditPlaceData,
  RequestEditPlaceData,
  RequestDeletePlaceData,
  RequestGetPlaceData,
  RequestLikePlaceData,
} from '../../models/places';

export const getPlace = async ({ placeId, signal }: RequestGetPlaceData): Promise<ResponseGetPlaceData | undefined> => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/places/${placeId}`;

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

export const createPlace = async ({
  placeData,
  userId,
  token,
}: RequestCreatePlaceData): Promise<ResponseCreatePlaceData | undefined> => {
  const requestData = new FormData();

  requestData.append('address', placeData.address);
  requestData.append('title', placeData.title);
  requestData.append('image', placeData.image);
  requestData.append('description', placeData.description);
  requestData.append('creator', userId);
  requestData.append('shared', placeData.shared.toString());

  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/places`, requestData, {
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

export const editPlace = async ({
  placeData,
  placeId,
  token,
  shared,
}: RequestEditPlaceData): Promise<ResponseEditPlaceData | undefined> => {
  const requestData = new FormData();

  if ('title' in placeData) {
    requestData.append('title', placeData.title);
    requestData.append('image', placeData.image);
    requestData.append('description', placeData.description);
  }

  try {
    const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/places/${placeId}`, requestData, {
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

export const likePlace = async ({ placeId, userId, userLike }: RequestLikePlaceData) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/api/places/${placeId}/favorite`,
      {},
      {
        params: {
          userId,
          like: userLike,
        },
      }
    );

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

export const deletePlace = async ({ placeId, token }: RequestDeletePlaceData) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/places/${placeId}`, {
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
