import Cookies from 'js-cookie';

import { UserCookiesData } from '../../models/user';

const COOKIES_KEY = 'user-data';

export const setUserCookies = (data: UserCookiesData) => {
  Cookies.set(
    COOKIES_KEY,
    JSON.stringify({ user: data.user, token: data.token, tokenExpiration: data.tokenExpiration })
  );
};

export const getUserCookies = (): UserCookiesData => {
  const userData = Cookies.get(COOKIES_KEY) as string;

  return userData ? JSON.parse(userData) : null;
};

export const removeUserCookies = () => {
  Cookies.remove(COOKIES_KEY);
};
