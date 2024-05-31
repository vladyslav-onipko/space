export type User = {
  id: string;
  name: string;
  image: string;
};

// user auth

export interface UserData {
  token: string | null;
  isAuth: boolean;
  user: User;
}

export interface SignupInputValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: File | string;
}

export interface SigninInputValues {
  email: string;
  password: string;
}

// user profile

export interface ProfileEditInputValues {
  image: File | string;
  name: string;
}

// user cookies data

export interface UserCookiesData {
  user: User;
  token: string;
  tokenExpiration: number;
}
