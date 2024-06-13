import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import orderBy from 'lodash.orderby';

import { Place } from '../../models/place';

interface PlacesState {
  places: Place[];
}

const initialPlacesState: PlacesState = {
  places: [],
};

const placesSlice = createSlice({
  name: 'places',
  initialState: initialPlacesState,
  reducers: {
    setPlaces(state, actions: PayloadAction<{ places: Place[]; clearOld?: boolean }>) {
      if (actions.payload.clearOld) {
        state.places = [];
      }

      state.places = [...state.places, ...actions.payload.places];
    },
    sortPlaces(state, actions: PayloadAction<string>) {
      state.places = orderBy(state.places, [actions.payload], ['desc']);
    },
  },
});

export const placesReducer = placesSlice.reducer;
export const { setPlaces, sortPlaces } = placesSlice.actions;
