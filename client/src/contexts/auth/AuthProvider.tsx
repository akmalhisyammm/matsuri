import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';

import { postFetcher, putFetcher } from 'utils/fetcher';
import { getToken, removeToken, setToken } from 'utils/storeToken';
import AuthContext from './Auth.context';

import type {
  IActivatePayload,
  IJWTPayload,
  ISignInPayload,
  ISignUpPayload,
  IUser,
} from 'types/user';

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const router = useRouter();

  const signUp = async (payload: ISignUpPayload) => {
    await postFetcher('/auth/sign-up', payload);

    toast.success('OTP has been sent to your email.');
    router.push({ pathname: '/sign-up/activate', query: { email: payload.email } });
  };

  const signIn = async (
    payload: ISignInPayload,
    query: Record<'eventId' | 'ticketId' | 'organizerId', string | undefined>
  ) => {
    const { data } = await postFetcher('/auth/sign-in', payload);

    setToken(data.token);
    setIsAuthenticated(true);

    toast.success('Sign in successful.');

    if (query.eventId && query.ticketId && query.organizerId) {
      router.push({
        pathname: `/checkout/${query.eventId}`,
        query: { ticketId: query.ticketId, organizerId: query.organizerId },
      });
    } else {
      router.push('/');
    }
  };

  const signOut = () => {
    removeToken();

    setIsAuthenticated(false);

    toast.success('Sign out successful.');
  };

  const activate = async (payload: IActivatePayload) => {
    await putFetcher('/auth/activate', payload);

    toast.success('Your account has been activated.');
    router.push('/sign-in');
  };

  useEffect(() => {
    const token = getToken();

    if (token) {
      const payload: IJWTPayload = jwtDecode(token);

      setUser({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        role: payload.role,
      });
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const token = getToken();

    if (token) {
      const payload: IJWTPayload = jwtDecode(token);

      if (payload.exp * 1000 < Date.now()) {
        removeToken();

        toast.error('Your session has expired.');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, activate }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
