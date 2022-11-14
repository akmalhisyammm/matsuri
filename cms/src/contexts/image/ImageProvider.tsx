import { useToast } from '@chakra-ui/react';
import { useState } from 'react';

import { getToken } from 'utils/storeToken';
import { postFetcher } from 'utils/fetcher';
import ImageContext from './Image.context';

import type { IImage } from 'types/image';

type ImageProviderProps = {
  children: React.ReactNode;
};

const ImageProvider = ({ children }: ImageProviderProps) => {
  const [image, setImage] = useState<IImage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();
  const token = getToken();

  const upload = async (image: File) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const { data } = await postFetcher('/images', formData, token);

      setImage(data);

      toast({
        title: 'Success',
        description: 'Image has been uploaded.',
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

  const set = (image: IImage | null) => {
    setIsLoading(true);
    setImage(image);
    setIsLoading(false);
  };

  const remove = async () => {
    setIsLoading(true);
    setImage(null);
    setIsLoading(false);
  };

  return (
    <ImageContext.Provider value={{ image, isLoading, upload, set, remove }}>
      {children}
    </ImageContext.Provider>
  );
};

export default ImageProvider;
