import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';

import AuthContext from './Auth.context';
import { IJWTPayload, IUser } from 'types/user';
import { postFetcher, putFetcher } from 'utils/fetcher';
import { getToken, removeToken, setToken } from 'utils/storeToken';

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signUp = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
  ) => {
    await postFetcher('/api/v1/auth/sign-up', { firstName, lastName, email, password, role });

    toast.success('Sign up successful.');
  };

  const signIn = async (email: string, password: string) => {
    const { data } = await postFetcher('/api/v1/auth/sign-in', { email, password });

    setToken(data.token);

    toast.success('Sign in successful.');
    setIsAuthenticated(true);
  };

  const signOut = () => {
    removeToken();

    toast.success('Sign out successful.');
    setIsAuthenticated(false);
  };

  const activate = async (otp: string, email: string) => {
    await putFetcher('/api/v1/auth/activate', { otp, email });

    toast.success('Your account has been activated.');
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
