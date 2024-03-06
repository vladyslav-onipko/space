import { Rocket } from "../models/Rockets";

// util function for extracting current message name
const getErrorMessage = (message: string): string => {
    return message.toLowerCase().split('_').join(' ');
};

export const getFavoriteRockets = async () => {
    const response = await fetch('https://react-space-f9692-default-rtdb.firebaseio.com/rockets.json');
    const data = await response.json();

    if (!response.ok) {
        return new Error(getErrorMessage(data.error.message) || 'Failed to load rockets.');
    }

    const rockets = [];

    for (const rocket in data) {
        rockets.push({...data[rocket], fbId: rocket} as Rocket);
    }

    return rockets;
};

export const addFavoriteRockets = async (rocket: Rocket) => {
    const response = await fetch('https://react-space-f9692-default-rtdb.firebaseio.com/rockets.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rocket)
    });

    const data = await response.json();

    if (!response.ok) {
        return new Error(getErrorMessage(data.error.message) || 'Failed to save rocket.');
    }

    return data;
};

export const removeFavoriteRocket = async (id: string) => {
    const response = await fetch(`https://react-space-f9692-default-rtdb.firebaseio.com/rockets/${id}.json`, {
        method: 'DELETE'
    });

    const data = await response.json();

    if (!response.ok) {
        return new Error(getErrorMessage(data.error.message) || 'Failed to remove rocket.');
    }

    return data;
};

export const removeAllFavoriteRocket = async () => {
    const response = await fetch(`https://react-space-f9692-default-rtdb.firebaseio.com/rockets.json`, {
        method: 'DELETE'
    });

    const data = await response.json();

    if (!response.ok) {
        return new Error(getErrorMessage(data.error.message) || 'Failed to remove rockets.');
    }

    return data;
};