import { ComponentPropsWithoutRef } from 'react';

export interface Rocket {
  id: string;
  location: google.maps.LatLngLiteral;
  image: string;
  title: string;
  description: string;
  likes: string[];
  shared: boolean;
  createdAt: string;
  creator: string;
  rating: number;
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
