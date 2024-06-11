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
}

// Place item props
export interface PlaceItemProps extends ComponentPropsWithoutRef<'article'> {
  place: Place;
}

// Place slider props
export interface PlacesSliderProps extends ComponentPropsWithoutRef<'div'> {
  places: Place[];
  slidesPerView?: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
}

// Place list props
export interface PlacesListProps extends ComponentPropsWithoutRef<'ul'> {
  places: Place[];
}

// Get place reques/response data
export interface RequestGetPlaceData {
  placeId: string;
  signal: any;
}

export interface ResponseGetPlaceData {
  message: string;
  place: Place;
  userPlacesAmount: number;
  userRating: number;
  topUserPlaces: { title: string; image: string; id: string }[];
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
  shared: boolean;
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
  userLike: boolean;
  userId: string;
  onSetIsFavorite: (favorite: boolean | null) => void;
}

// Delete place reques/response data
export interface RequestDeletePlaceData {
  placeId: string;
  token: string;
}
