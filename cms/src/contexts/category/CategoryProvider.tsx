import { useToast } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { CATEGORIES } from 'constants/access';
import { AuthContext } from 'contexts/auth';
import { deleteFetcher, getFetcher, postFetcher, putFetcher } from 'utils/fetcher';
import { getToken } from 'utils/storeToken';
import CategoryContext from './Category.context';

import type { ICategory, ICategoryPayload } from 'types/category';

type CategoryProviderProps = {
  children: React.ReactNode;
};

const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authorizedAccess, setAuthorizedAccess] = useState<
    ('READ' | 'CREATE' | 'UPDATE' | 'DELETE')[]
  >([]);

  const authCtx = useContext(AuthContext);
  const toast = useToast();
  const token = getToken();

  const create = async (payload: ICategoryPayload) => {
    try {
      setIsLoading(true);

      const { data } = await postFetcher('/categories', payload, token);

      const updatedCategories = [...categories, data];

      setCategories(updatedCategories);

      toast({
        title: 'Success',
        description: `Category has been created: ${data.name}`,
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

  const update = async (id: string, payload: ICategoryPayload) => {
    try {
      setIsLoading(true);

      const { data } = await putFetcher(`/categories/${id}`, payload, token);

      const updatedCategories = categories.map((category) => {
        if (category._id === id) {
          return data;
        }

        return category;
      });

      setCategories(updatedCategories);

      toast({
        title: 'Success',
        description: `Category has been updated: ${data.name}`,
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
    try {
      setIsLoading(true);

      const { data } = await deleteFetcher(`/categories/${id}`, token);

      const updatedCategories = categories.filter((category) => category._id !== id);

      setCategories(updatedCategories);

      toast({
        title: 'Success',
        description: `Category has been deleted: ${data.name}`,
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
      if (token) {
        try {
          setIsLoading(true);

          const { data } = await getFetcher('/categories', {}, token);

          setCategories(data);
        } catch (err) {
          if (err instanceof Error) {
            return err.message;
          }
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetch();
  }, [token, toast]);

  useEffect(() => {
    if (authCtx.user) {
      const access = (
        Object.keys(CATEGORIES) as ('READ' | 'CREATE' | 'UPDATE' | 'DELETE')[]
      ).filter((key) =>
        CATEGORIES[key as keyof typeof CATEGORIES].includes(authCtx.user?.role as string)
      );

      setAuthorizedAccess(access);
    }
  }, [authCtx.user]);

  return (
    <CategoryContext.Provider
      value={{ categories, isLoading, authorizedAccess, create, update, destroy }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
