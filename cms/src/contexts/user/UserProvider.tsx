import { useToast } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { USERS } from 'constants/access';
import { AuthContext } from 'contexts/auth';
import { getToken } from 'utils/storeToken';
import { deleteFetcher, getFetcher, postFetcher, putFetcher } from 'utils/fetcher';
import UserContext from './User.context';

import type { IOtherUser, IOtherUserPayload } from 'types/user';

type UserProviderProps = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [users, setUsers] = useState<IOtherUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authorizedAccess, setAuthorizedAccess] = useState<
    ('READ' | 'CREATE' | 'UPDATE' | 'DELETE')[]
  >([]);

  const authCtx = useContext(AuthContext);
  const toast = useToast();
  const token = getToken();

  const create = async (payload: IOtherUserPayload) => {
    const endpoint = authCtx.user?.role === 'Owner' ? 'organizers' : 'admins';

    try {
      setIsLoading(true);

      const { data } = await postFetcher(`/users/${endpoint}`, payload, token);

      const organizer = { _id: data.organizer, name: payload.organizerName };

      const updatedUsers = [...users, { ...data, organizer }];

      setUsers(updatedUsers);

      toast({
        title: 'Success',
        description: `${data.role} has been created.`,
        status: 'success',
        duration: 3000,
      });
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

  const update = async (id: string, payload: IOtherUserPayload) => {
    const endpoint = authCtx.user?.role === 'Owner' ? 'organizers' : 'admins';

    try {
      setIsLoading(true);

      const { data } = await putFetcher(`/users/${endpoint}/${id}`, payload, token);

      const organizer = { _id: data.organizer, name: payload.organizerName };

      const updatedUsers = users.map((user) => {
        if (user._id === id) {
          return { ...data, organizer };
        }

        return user;
      });

      setUsers(updatedUsers);

      toast({
        title: 'Success',
        description: `${data.role} has been updated.`,
        status: 'success',
        duration: 3000,
      });
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

  const destroy = async (id: string) => {
    const endpoint = authCtx.user?.role === 'Owner' ? 'organizers' : 'admins';

    try {
      setIsLoading(true);

      const { data } = await deleteFetcher(`/users/${endpoint}/${id}`, token);

      const updatedUsers = users.filter((user) => user._id !== id);

      setUsers(updatedUsers);

      toast({
        title: 'Success',
        description: `${data.role} has been deleted.`,
        status: 'success',
        duration: 3000,
      });
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

  useEffect(() => {
    const fetch = async () => {
      if (authCtx.user) {
        const endpoint = authCtx.user.role === 'Owner' ? 'organizers' : 'admins';

        if (token) {
          try {
            setIsLoading(true);

            const { data } = await getFetcher(`/users/${endpoint}`, {}, token);

            setUsers(data);
          } catch (err) {
            if (err instanceof Error) {
              return err.message;
            }
          } finally {
            setIsLoading(false);
          }
        }
      }
    };

    fetch();
  }, [authCtx.user, token]);

  useEffect(() => {
    if (authCtx.user) {
      const access = (Object.keys(USERS) as ('READ' | 'CREATE' | 'UPDATE' | 'DELETE')[]).filter(
        (key) => USERS[key as keyof typeof USERS].includes(authCtx.user?.role as string)
      );

      setAuthorizedAccess(access);
    }
  }, [authCtx.user]);

  return (
    <UserContext.Provider value={{ users, isLoading, authorizedAccess, create, update, destroy }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
