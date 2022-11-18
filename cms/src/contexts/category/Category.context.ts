import { createContext } from 'react';

import type { ICategory, ICategoryPayload } from 'types/category';

interface ICategoryContext {
  categories: ICategory[];
  isLoading: boolean;
  authorizedAccess: ('READ' | 'CREATE' | 'UPDATE' | 'DELETE')[];
  create: (payload: ICategoryPayload) => void;
  update: (id: string, payload: ICategoryPayload) => void;
  destroy: (id: string) => void;
}

const CategoryContext = createContext<ICategoryContext>({
  categories: [],
  isLoading: false,
  authorizedAccess: [],
  create: () => null,
  update: () => null,
  destroy: () => null,
});

export default CategoryContext;
