import { createContext } from 'react';

import type { IActivatePayload, ISignInPayload, ISignUpPayload, IUser } from 'types/user';

interface IAuthContext {
  user: IUser | null;
  signUp: (payload: ISignUpPayload) => void;
  signIn: (
    payload: ISignInPayload,
    query: Record<'eventId' | 'ticketId' | 'organizerId', string | undefined>
  ) => void;
  signOut: () => void;
  activate: (payload: IActivatePayload) => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  signUp: () => null,
  signIn: () => null,
  signOut: () => null,
  activate: () => null,
});

export default AuthContext;
