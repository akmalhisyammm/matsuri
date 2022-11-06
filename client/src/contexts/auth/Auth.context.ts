import { createContext } from 'react';
import { IUser } from 'types/user';

interface IAuthContext {
  user: IUser | null;
  signUp: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
  ) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  activate: (otp: string, email: string) => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  signUp: () => null,
  signIn: () => null,
  signOut: () => null,
  activate: () => null,
});

export default AuthContext;
