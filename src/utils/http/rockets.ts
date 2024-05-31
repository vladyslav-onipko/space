import axios from 'axios';

import HttpError from '../../models/http-error';

interface getRocketConfig {
  rocketId: string;
  signal: any;
}

export const getRocket = async ({ rocketId, signal }: getRocketConfig) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/rockets/${rocketId}`;

  try {
    const response = await axios.get(url, { signal });

    console.log(response.data);
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
