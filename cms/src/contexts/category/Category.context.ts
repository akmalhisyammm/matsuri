import { createContext } from 'react';

import type { ICategory, ICategoryPayload } from 'types/category';

interface ICategoryContext {
  categories: ICategory[];
  isLoading: boolean;
  create: (payload: ICategoryPayload) => void;
  update: (id: string, payload: ICategoryPayload) => void;
  destroy: (id: string) => void;
}

const CategoryContext = createContext<ICategoryContext>({
  categories: [],
  isLoading: false,
  create: () => null,
  update: () => null,
  destroy: () => null,
});

export default CategoryContext;
