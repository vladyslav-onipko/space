import { ComponentPropsWithoutRef } from 'react';

import { User } from './user';

// Full place data
export interface Place {
  id: string;
  address: string;
  location: google.maps.LatLngLiteral;
  image: string;
  title: string;
  description: string;
  shared: boolean;
  createdAt: string;
  creator: User;
  favorite: boolean;
  likes: number;
  [key: string]: any;
}

// Place data in detail page
export interface UserTopPlace {
  title: string;
  image: string;
  likes: number;
  id: string;
}

// Place item props
export interface PlaceItemProps extends ComponentPropsWithoutRef<'article'> {
  item: Place;
}

// Get place reques/response data
export interface RequestGetPlaceData {
  placeId: string;
  signal: AbortSignal;
}

export interface ResponseGetPlaceData {
  place: Place;
  userPlacesAmount: number;
  userRating: number;
  topUserPlaces: UserTopPlace[];
}

// Edit place reques/response data
export interface PlaceEditInputValues {
  image: File | string;
  title: string;
  description: string;
}

export interface RequestEditPlaceData {
  placeData: PlaceEditInputValues | {};
  placeId: string;
  token: string;
  shared?: boolean;
  setFieldError?: (field: string, errorMsg: string) => void;
}

export interface ResponseEditPlaceData {
  message: string;
  place: Place;
}

// Create place reques/response data
export interface PlaceCreateInputValues extends PlaceEditInputValues {
  address: string;
  shared: boolean | string;
}

export interface RequestCreatePlaceData {
  placeData: PlaceCreateInputValues;
  userId: string;
  token: string;
  setFieldError?: (field: string, errorMsg: string) => void;
}

export interface ResponseCreatePlaceData {
  message: string;
  place: Place;
}

// Like place reques/response data
export interface RequestLikePlaceData {
  placeId: string;
  userId: string;
}

// Delete place reques/response data
export interface RequestDeletePlaceData {
  placeId: string;
  token: string;
}

// Get users places reques/response data
export interface RequestGetPlacesData {
  signal: AbortSignal;
  sessionUserId?: string;
  creatorId?: string;
  pageParam?: number | unknown;
  searchParam?: string;
  filterParam?: string;
  topPlacesCount?: number;
}

export interface ResponseGetAllPlacesData {
  places: Place[];
  nextPage: number | null;
  hasNextPage: boolean;
  placesAmount: number;
}

export interface ResponseGetTopPlacesData {
  places: Place[];
}
