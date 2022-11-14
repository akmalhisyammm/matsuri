import { createContext } from 'react';

import type { IPayment, IPaymentPayload } from 'types/payment';

interface IPaymentContext {
  payments: IPayment[];
  isLoading: boolean;
  create: (payload: IPaymentPayload) => void;
  update: (id: string, payload: IPaymentPayload) => void;
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
