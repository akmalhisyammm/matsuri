import { createContext } from 'react';

import type { ICategory } from 'types/category';

interface ICategoryContext {
  categories: ICategory[];
  isLoading: boolean;
  create: (name: string) => void;
  update: (id: string, name: string) => void;
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
