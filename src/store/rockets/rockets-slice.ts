import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import orderBy from 'lodash.orderby';

import { Rocket } from '../../models/rockets';

interface RocketsState {
  rockets: Rocket[];
}

const initialRocketsState: RocketsState = {
  rockets: [],
};

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState: initialRocketsState,
  reducers: {
    setRockets(state, actions: PayloadAction<{ rockets: Rocket[]; clearOld?: boolean }>) {
      if (actions.payload.clearOld) {
        state.rockets = [];
      }

      state.rockets = [...state.rockets, ...actions.payload.rockets];
    },
    sortRockets(state, actions: PayloadAction<string>) {
      state.rockets = orderBy(state.rockets, [actions.payload], ['desc']);
    },
  },
});

export const rocketsReducer = rocketsSlice.reducer;
export const { setRockets, sortRockets } = rocketsSlice.actions;
