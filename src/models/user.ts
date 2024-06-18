import { ComponentPropsWithoutRef } from 'react';
import { Place } from './place';

// User data
export type User = {
  id: string;
  name: string;
  image: string;
  [key: string]: any;
};

// User auth data
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

// User profile response/request deta
export interface ProfileEditInputValues {
  image: File | string;
  name: string;
}

export interface RequestGetUserProfileData {
  userId: string;
  token: string | null;
  urlParams: { [key: string]: string | number };
  signal: any;
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

// Get users response/request deta
export interface ResposneGetUsersData {
  users: User[];
}

export interface RequestGetUsersData {
  max?: number;
  signal: AbortSignal;
}

// User cookies data
export interface UserCookiesData {
  user: User;
  token: string;
  tokenExpiration: number;
}

export interface UserItemProps extends ComponentPropsWithoutRef<'article'> {
  item: User;
}
