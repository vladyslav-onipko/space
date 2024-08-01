import axios from 'axios';

import HttpError from '../../models/http-error';
import uploadImage from '../../lib/cloudinary';

import {
  RequestCreatePlaceData,
  ResponseGetPlaceData,
  ResponseCreatePlaceData,
  ResponseEditPlaceData,
  RequestEditPlaceData,
  RequestDeletePlaceData,
  RequestGetPlaceData,
  RequestLikePlaceData,
  RequestGetPlacesData,
} from '../../models/place';

const DEFAULT_ERROR_MESSAGE = 'Sorry, something went wrong, please try again later';

export const getPlace = async ({ placeId, signal }: RequestGetPlaceData): Promise<ResponseGetPlaceData | undefined> => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/places/${placeId}`;

  try {
    const response = await axios.get(url, { signal });

    return response.data;
  } catch (e: any) {
    if (e.response) {
      throw new HttpError(e.response.data.message || DEFAULT_ERROR_MESSAGE);
    }

    if (e.request) {
      throw new HttpError(DEFAULT_ERROR_MESSAGE);
    }
  }
};

export const getPlaces = async ({
  signal,
  sessionUserId,
  creatorId,
  pageParam,
  searchParam,
  topPlacesCount,
  filterParam,
}: RequestGetPlacesData) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/places`, {
      signal,
      params: {
        user: sessionUserId,
        creator: creatorId,
        page: pageParam,
        search: searchParam,
        filter: filterParam,
        top: topPlacesCount,
      },
    });
    return response.data;
  } catch (e: any) {
    if (e.response) {
      throw new HttpError(e.response.data.message || DEFAULT_ERROR_MESSAGE);
    }

    if (e.request) {
      throw new HttpError(DEFAULT_ERROR_MESSAGE);
    }
  }
};

export const createPlace = async ({
  placeData,
  userId,
  token,
}: RequestCreatePlaceData): Promise<ResponseCreatePlaceData | undefined> => {
  const requestData = { ...placeData, creator: '' };

  requestData.image = await uploadImage(placeData.image as File);
  requestData.shared = placeData.shared.toString();
  requestData.creator = userId;

  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/places`, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (e: any) {
    if (e.response) {
      throw new HttpError(e.response.data.message || DEFAULT_ERROR_MESSAGE, e.response.data.errors);
    }

    if (e.request) {
      throw new HttpError(DEFAULT_ERROR_MESSAGE);
    }
  }
};

export const editPlace = async ({
  placeData,
  placeId,
  token,
  shared,
}: RequestEditPlaceData): Promise<ResponseEditPlaceData | undefined> => {
  if ('image' in placeData) {
    placeData.image = await uploadImage(placeData.image as File);
  }

  try {
    const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/places/${placeId}`, placeData, {
      params: { shared },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (e: any) {
    if (e.response) {
      throw new HttpError(e.response.data.message || DEFAULT_ERROR_MESSAGE, e.response.data.errors);
    }

    if (e.request) {
      throw new HttpError(DEFAULT_ERROR_MESSAGE);
    }
  }
};

export const likePlace = async ({ placeId, userId }: RequestLikePlaceData) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/api/places/${placeId}/favorite`,
      {},
      {
        params: { userId },
      }
    );

    return response.data;
  } catch (e: any) {
    if (e.response) {
      throw new HttpError(e.response.data.message || DEFAULT_ERROR_MESSAGE);
    }

    if (e.request) {
      throw new HttpError(DEFAULT_ERROR_MESSAGE);
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
      throw new HttpError(e.response.data.message || DEFAULT_ERROR_MESSAGE, e.response.data.errors);
    }

    if (e.request) {
      throw new HttpError(DEFAULT_ERROR_MESSAGE);
    }
  }
};
