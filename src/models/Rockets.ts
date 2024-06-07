import { ComponentPropsWithoutRef } from 'react';
import { User } from './user';

export interface Rocket {
  id: string;
  address: string;
  location: google.maps.LatLngLiteral;
  image: string;
  title: string;
  description: string;
  likes: string[];
  shared: boolean;
  createdAt: string;
  creator: User;
  likesAmount: number;
}

export interface RocketItemProps extends ComponentPropsWithoutRef<'article'> {
  rocket: Rocket;
}

export interface RocketsSliderProps extends ComponentPropsWithoutRef<'div'> {
  rockets: Rocket[];
  slidesPerView?: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
}

export interface RocketsListProps extends ComponentPropsWithoutRef<'ul'> {
  rockets: Rocket[];
}

export interface RocketEditInputValues {
  image: File | string;
  title: string;
  description: string;
}

export interface RocketCreateInputValues extends RocketEditInputValues {
  address: string;
  shared: boolean;
}

export interface GetRocketConfig {
  rocketId: string;
  signal: any;
}

export interface ResponseGetRocketData {
  message: string;
  rocket: Rocket;
  userRocketsAmount: number;
  userRating: number;
}

export interface CreateRocketConfig {
  rocketData: RocketCreateInputValues;
  userId: string;
  token: string;
  setFieldError?: (field: string, errorMsg: string) => void;
}

export interface EditRocketConfig {
  rocketData: RocketEditInputValues | {};
  rocketId: string;
  token: string;
  shared?: boolean;
  setFieldError?: (field: string, errorMsg: string) => void;
}

export interface DeleteRocketConfig {
  rocketId: string;
  token: string;
}
