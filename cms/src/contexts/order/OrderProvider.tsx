import { useToast } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { ORDERS } from 'constants/access';
import { AuthContext } from 'contexts/auth';
import { getToken } from 'utils/storeToken';
import { getFetcher, putFetcher } from 'utils/fetcher';
import OrderContext from './Order.context';

import type { IOrder } from 'types/order';

type OrderProviderProps = {
  children: React.ReactNode;
};

const OrderProvider = ({ children }: OrderProviderProps) => {
  const [orders, setOrders] = useState<IOrder>({
    order: [],
    pages: 0,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authorizedAccess, setAuthorizedAccess] = useState<
    ('READ' | 'CREATE' | 'UPDATE' | 'DELETE')[]
  >([]);

  const authCtx = useContext(AuthContext);
  const toast = useToast();
  const token = getToken();

  const toggle = async (id: string) => {
    const currentStatus = orders.order.find((order) => order._id === id)?.status;
    const payload = { status: currentStatus === 'Pending' ? 'Paid' : 'Pending' };

    try {
      setIsLoading(true);

      const { data } = await putFetcher(`/orders/${id}/status`, payload, token);

      const updatedOrders = orders.order.map((order) => {
        if (order._id === id) {
          return { ...order, status: data.status };
        }

        return order;
      });

      setOrders({ ...orders, order: updatedOrders });

      toast({
        title: 'Success',
        description: 'Order status has been changed.',
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      if (token) {
        try {
          setIsLoading(true);

          const { data } = await getFetcher('/orders', {}, token);

          setOrders(data);
        } catch (err) {
          if (err instanceof Error) {
            return err.message;
          }
        } finally {
          setIsLoading(false);
        }
      }

      setIsLoading(false);
    };

    fetch();
  }, [token, toast]);

  useEffect(() => {
    if (authCtx.user) {
      const access = (Object.keys(ORDERS) as ('READ' | 'CREATE' | 'UPDATE' | 'DELETE')[]).filter(
        (key) => ORDERS[key as keyof typeof ORDERS].includes(authCtx.user?.role as string)
      );

      setAuthorizedAccess(access);
    }
  }, [authCtx.user]);

  return (
    <OrderContext.Provider value={{ orders, isLoading, authorizedAccess, toggle }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
