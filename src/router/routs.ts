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
  ALL_Places: 'places',
  DETAIL_PLACE: `${baseRouts.HOME}/place/:id`,
  EDIT_PLACE: 'edit',
};
