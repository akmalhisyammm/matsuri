export interface IUser {
  name: string;
  email: string;
  role: string;
  organizer: string;
}

export interface IJWTPayload {
  id: string;
  name: string;
  email: string;
  role: string;
  organizer: string;
  iat: number;
  exp: number;
}
