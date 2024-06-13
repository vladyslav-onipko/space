import { Place } from './place';

// Full user data
export type User = {
  id: string;
  name: string;
  image: string;
};

// user auth
export interface UserData {
  token: string | null;
  isAuth: boolean;
  user: User;
}

export interface ResponseUserAuthData {
  data: {
    message: string;
    token: string;
    tokenExpiration: number;
    user: User;
  };
}

export interface SignupInputValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: File | string;
}

export interface SigninInputValues {
  email: string;
  password: string;
}

// user profile
export interface ProfileEditInputValues {
  image: File | string;
  name: string;
}

export interface ResponseGetUserProfileData {
  places: Place[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  placesAmount: number;
  favoritesAmount: number;
  sharedAmount: number;
  currentPlacesAmount: number;
}

// user cookies data
export interface UserCookiesData {
  user: User;
  token: string;
  tokenExpiration: number;
}
