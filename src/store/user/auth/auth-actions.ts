import axios from 'axios';

import { SignupInputValues, SigninInputValues, ResponseUserAuthData } from '../../../models/user';
import { setUserData } from './auth-slice';
import { AppDispatch } from '../..';
import { setUserCookies, getUserCookies, removeUserCookies } from '../../../utils/helpers/user-cookies';
import HttpError from '../../../models/http-error';
import { showNotification } from '../../notification/notification-slice';

let tokenTimer: ReturnType<typeof setTimeout>;

export const auth = (mode: 'signin' | 'signup', userData: SignupInputValues | SigninInputValues) => {
  return async (dispatch: AppDispatch) => {
    const url =
      mode === 'signin'
        ? `${process.env.REACT_APP_BACKEND_URL}/api/users/signin`
        : `${process.env.REACT_APP_BACKEND_URL}/api/users/signup`;
    let requestData: SigninInputValues | FormData;

    if (mode === 'signup' && 'name' in userData) {
      requestData = new FormData();

      requestData.append('name', userData.name);
      requestData.append('email', userData.email);
      requestData.append('password', userData.password);
      requestData.append('image', userData.image);
    } else {
      requestData = userData;
    }

    try {
      const response = (await axios.post(url, requestData)) as ResponseUserAuthData;
      const tokenExpirationDate = new Date().getTime() + response.data.tokenExpiration; // calculate expires token time in future

      dispatch(setUserData({ isAuth: true, token: response.data.token, user: response.data.user }));
      setUserCookies({ user: response.data.user, token: response.data.token, tokenExpiration: tokenExpirationDate });

      tokenTimer = setTimeout(() => {
        dispatch(logout());
        dispatch(
          showNotification({ message: 'Your session token has expired. Need to log in again.', status: 'error' })
        );
      }, response.data.tokenExpiration);

      return { message: response.data.message };
    } catch (e: any) {
      if (e.response) {
        throw new HttpError(
          e.response.data.message || 'Sorry, something went wrong, please try again later',
          e.response.data.errors
        );
      }

      if (e.request) {
        throw new HttpError('Sorry, something went wrong, please try again later');
      }
    }
  };
};

export const logout = () => {
  return (dispatch: AppDispatch) => {
    removeUserCookies();
    dispatch(setUserData({ isAuth: false, token: null, user: { id: '', name: '', image: '' } }));
    clearTimeout(tokenTimer);
  };
};

export const autoLogin = () => {
  return (dispatch: AppDispatch) => {
    const userData = getUserCookies();

    if (!userData) return;

    const tokenExpiration = userData.tokenExpiration - new Date().getTime(); // calculate expires token time left

    if (tokenExpiration <= 0) return;

    dispatch(setUserData({ isAuth: true, token: userData.token, user: userData.user }));

    tokenTimer = setTimeout(() => {
      dispatch(logout());
    }, tokenExpiration);
  };
};
