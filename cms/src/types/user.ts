import { IOrganizer } from './organizer';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Organizer' | 'Admin';
  organizer: string;
}

export interface IOtherUser {
  _id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Organizer' | 'Admin';
  organizer: IOrganizer;
}

export interface IUserPayload {
  email: string;
  password: string;
}
export interface IOtherUserPayload {
  name: string;
  email: string;
  password?: string;
  organizerName?: string;
}

export interface IJWTPayload {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Organizer' | 'Admin';
  organizer: string;
  iat: number;
  exp: number;
}
