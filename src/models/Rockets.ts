import { ReactNode } from "react";

export interface Rocket {
    id: string;
    fbId: string;
    img: {
        path: string,
        alt: string
    },
    name: string;
    description: string;
    isFavorite: boolean;
};

export interface RocketItem {
    img: {
        path: string,
        alt: string
    },
    name: string;
    description: string;
    action: ReactNode;
};

export interface RocketsSlider {
    rockets: Rocket[];
};

export interface RocketsList {
    rockets: Rocket[];
}

export enum LocalStorageKeys {
    FAVORITES = 'Favorites'
};