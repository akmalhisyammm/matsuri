export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface ISignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface ISignInPayload {
  email: string;
  password: string;
}

export interface IActivatePayload {
  email: string;
  otp: string;
}

export interface IJWTPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
