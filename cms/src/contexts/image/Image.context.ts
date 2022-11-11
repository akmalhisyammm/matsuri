import { createContext } from 'react';

import type { IImage } from 'types/image';

interface IImageContext {
  image: IImage | null;
  isLoading: boolean;
  upload: (image: File) => void;
  remove: () => void;
}

const ImageContext = createContext<IImageContext>({
  image: null,
  isLoading: false,
  upload: () => null,
  remove: () => null,
});

export default ImageContext;
