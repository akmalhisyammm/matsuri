import { createContext } from 'react';

import type { IPayment } from 'types/payment';

interface IPaymentContext {
  payments: IPayment[];
  isLoading: boolean;
  create: (type: string, imageId: string, imageUrl: string) => void;
  update: (id: string, type: string, imageId: string, imageUrl: string) => void;
  destroy: (id: string) => void;
}

const CategoryContext = createContext<IPaymentContext>({
  payments: [],
  isLoading: false,
  create: () => null,
  update: () => null,
  destroy: () => null,
});

export default CategoryContext;
