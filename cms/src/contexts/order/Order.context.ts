import { createContext } from 'react';

import type { IOrder } from 'types/order';

interface IOrderContext {
  orders: IOrder;
  isLoading: boolean;
  authorizedAccess: ('READ' | 'CREATE' | 'UPDATE' | 'DELETE')[];
  toggle: (id: string) => void;
}

const OrderContext = createContext<IOrderContext>({
  orders: {
    order: [],
    pages: 0,
    total: 0,
  },
  isLoading: false,
  authorizedAccess: [],
  toggle: () => null,
});

export default OrderContext;
