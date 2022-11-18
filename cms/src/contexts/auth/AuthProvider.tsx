import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';

import { postFetcher } from 'utils/fetcher';
import { getToken, removeToken, setToken } from 'utils/storeToken';
import AuthContext from './Auth.context';

import type { IJWTPayload, IUser } from 'types/user';

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const router = useRouter();
  const toast = useToast();
  const token = getToken();

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const { data } = await postFetcher('/auth/sign-in', { email, password });

      setToken(data.token);
      setIsAuthenticated(true);

      toast({
        title: 'Success',
        description: 'Sign in successful.',
        status: 'success',
        duration: 3000,
      });

      router.push('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: 'Error',
          description: err.message,
          status: 'error',
          duration: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setIsLoading(true);

    removeToken();

    setIsAuthenticated(false);
    setIsLoading(false);

    toast({
      title: 'Success',
      description: 'Sign out successful.',
      status: 'success',
      duration: 3000,
    });

    router.push('/');
  };

  useEffect(() => {
    if (token) {
      const payload: IJWTPayload = jwtDecode(token);

      setUser({
        _id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role,
        organizer: payload.organizer,
      });
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [token, isAuthenticated]);

  useEffect(() => {
    const token = getToken();

    if (token) {
      const payload: IJWTPayload = jwtDecode(token);

      if (payload.exp * 1000 < Date.now()) {
        removeToken();

        toast({
          title: 'Error',
          description: 'Your session has expired.',
          status: 'error',
          duration: 3000,
        });
      }
    }
  }, [toast]);

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
