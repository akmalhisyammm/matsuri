import { useToast } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { ImageContext } from 'contexts/image';
import { getToken } from 'utils/storeToken';
import { deleteFetcher, getFetcher, postFetcher, putFetcher } from 'utils/fetcher';
import TalentContext from './Talent.context';

import type { ITalent, ITalentPayload } from 'types/talent';

type TalentProviderProps = {
  children: React.ReactNode;
};

const TalentProvider = ({ children }: TalentProviderProps) => {
  const [talents, setTalents] = useState<ITalent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const imagesCtx = useContext(ImageContext);
  const toast = useToast();
  const token = getToken();

  const create = async (payload: ITalentPayload) => {
    setIsLoading(true);

    try {
      const { data } = await postFetcher('/talents', payload, token);

      const image = { _id: imagesCtx.image?._id, url: imagesCtx.image?.url };

      const updatedTalents = [...talents, { ...data, image }];

      setTalents(updatedTalents);

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

  const update = async (id: string, payload: ITalentPayload) => {
    setIsLoading(true);

    try {
      const { data } = await putFetcher(`/talents/${id}`, payload, token);

      const image = { _id: imagesCtx.image?._id, url: imagesCtx.image?.url };

      const updatedTalents = talents.map((talent) => {
        if (talent._id === id) {
          return { ...data, image };
        }

        return talent;
      });

      setTalents(updatedTalents);

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
      const { data } = await deleteFetcher(`/talents/${id}`, token);

      const updatedTalents = talents.filter((talent) => talent._id !== id);

      setTalents(updatedTalents);

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
        const { data } = await getFetcher('/talents', {}, token);

        setTalents(data);
      }

      setIsLoading(false);
    };

    fetch();
  }, [token]);

  return (
    <TalentContext.Provider value={{ talents, isLoading, create, update, destroy }}>
      {children}
    </TalentContext.Provider>
  );
};

export default TalentProvider;
