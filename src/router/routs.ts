export const baseRouts = {
  HOME: '/space',
};

export const userRouts = {
  SIGNIN: `${baseRouts.HOME}/signin`,
  SIGNUP: `${baseRouts.HOME}/signup`,
  PROFILE: `${baseRouts.HOME}/user/:id`,
  EDIT_PROFILE: 'edit',
  ADD_PLACE: 'place/create',
};

export const placeRouts = {
  ALL_PLACES: 'places',
  DETAIL_PLACE: `${baseRouts.HOME}/place/:id`,
  USER_PLACES: `${baseRouts.HOME}/places/user/:userId`,
  EDIT_PLACE: 'edit',
};
