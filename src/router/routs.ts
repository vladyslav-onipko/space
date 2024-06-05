export const baseRouts = {
  HOME: '/space',
};

export const userRouts = {
  SIGNIN: `${baseRouts.HOME}/signin`,
  SIGNUP: `${baseRouts.HOME}/signup`,
  PROFILE: `${baseRouts.HOME}/user/:id`,
  EDIT_PROFILE: 'edit',
  ADD_ROCKET: 'rocket/create',
};

export const rocketRouts = {
  ALL_ROCKETS: 'rockets',
  DETAIL_ROCKET: `${baseRouts.HOME}/rocket/:id`,
  EDIT_ROCKET: 'edit',
};
