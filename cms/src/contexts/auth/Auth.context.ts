import { createContext } from 'react';

import type { IUser } from 'types/user';

interface IAuthContext {
  user: IUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  isLoading: false,
  signIn: () => null,
  signOut: () => null,
});

export default AuthContext;
