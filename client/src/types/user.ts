export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
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
