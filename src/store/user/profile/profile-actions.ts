import axios from 'axios';

import { AppDispatch } from '../..';
import { ProfileEditInputValues } from '../../../models/user';
import HttpError from '../../../models/http-error';
import { getUserCookies, setUserCookies } from '../../../utils/helpers/user-cookies';
import { UserData } from '../../../models/user';
import { setUserData } from '../auth/auth-slice';
import uploadImage from '../../../lib/cloudinary';

const DEFAULT_ERROR_MESSAGE = 'Sorry, something went wrong, please try again later';

export const updateProfile = (userData: ProfileEditInputValues, userId: string, token: string | null) => {
  return async (dispatch: AppDispatch) => {
    userData.image = await uploadImage(userData.image as File);

    try {
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const oldUserCookies = getUserCookies();

      const updatedUser: UserData = {
        isAuth: true,
        token: oldUserCookies.token,
        user: response.data.user,
      };

      dispatch(setUserData(updatedUser));
      setUserCookies({
        token: oldUserCookies.token,
        tokenExpiration: oldUserCookies.tokenExpiration,
        user: updatedUser.user,
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
};
