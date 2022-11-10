import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import CategoryContext from './Category.context';
import { getToken } from 'utils/storeToken';
import { deleteFetcher, getFetcher, postFetcher, putFetcher } from 'utils/fetcher';

import type { ICategory } from 'types/category';

type CategoryProviderProps = {
  children: React.ReactNode;
};

const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const token = getToken();

  const create = async (name: string) => {
    setIsLoading(true);

    try {
      const { data } = await postFetcher('/categories', { name }, token);

      setCategories([...categories, data]);

      toast({
        title: 'Success',
        description: `${data.name} has been created.`,
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
    }

    setIsLoading(false);
  };

  const update = async (id: string, name: string) => {
    setIsLoading(true);

    try {
      const { data } = await putFetcher(`/categories/${id}`, { name }, token);

      const updatedCategories = categories.map((category) => {
        if (category._id === id) {
          return data;
        }

        return category;
      });

      setCategories(updatedCategories);

      toast({
        title: 'Success',
        description: `${data.name} has been updated.`,
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
    }

    setIsLoading(false);
  };

  const destroy = async (id: string) => {
    setIsLoading(true);

    try {
      const { data } = await deleteFetcher(`/categories/${id}`, token);

      const updatedCategories = categories.filter((category) => category._id !== id);

      setCategories(updatedCategories);

      toast({
        title: 'Success',
        description: `${data.name} has been deleted.`,
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
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);

      if (token) {
        const { data } = await getFetcher('/categories', {}, token);

        setCategories(data);
      }

      setIsLoading(false);
    };

    fetch();
  }, [token]);

  return (
    <CategoryContext.Provider value={{ categories, isLoading, create, update, destroy }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
