export interface Rocket {
    id: string;
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
    isFavorite?: boolean;
    onAddFavorite?: (id: string) => void;
    onDeleteFavite?: (id: string) => void;
};

export enum LocalStorageKeys {
    FAVORITES = 'Favorites'
};