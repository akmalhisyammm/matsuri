import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { getToken } from 'utils/storeToken';
import { deleteFetcher, getFetcher, postFetcher, putFetcher } from 'utils/fetcher';
import PaymentContext from './Payment.context';

import type { IPayment } from 'types/payment';

type PaymentProviderProps = {
  children: React.ReactNode;
};

const PaymentProvider = ({ children }: PaymentProviderProps) => {
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const token = getToken();

  const create = async (type: string, imageId: string, imageUrl: string) => {
    setIsLoading(true);

    try {
      const { data } = await postFetcher('/payments', { type, imageId }, token);

      setPayments([...payments, { ...data, image: { _id: imageId, url: imageUrl } }]);

      toast({
        title: 'Success',
        description: `${data.type} has been created.`,
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

  const update = async (id: string, type: string, imageId: string, imageUrl: string) => {
    setIsLoading(true);

    try {
      const { data } = await putFetcher(`/payments/${id}`, { type, imageId }, token);

      const updatedPayments = payments.map((payment) => {
        if (payment._id === id) {
          return { ...data, image: { _id: imageId, url: imageUrl } };
        }

        return payment;
      });

      setPayments(updatedPayments);

      toast({
        title: 'Success',
        description: `${data.type} has been updated.`,
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
      const { data } = await deleteFetcher(`/payments/${id}`, token);

      const updatedPayments = payments.filter((payment) => payment._id !== id);

      setPayments(updatedPayments);

      toast({
        title: 'Success',
        description: `${data.type} has been deleted.`,
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
        const { data } = await getFetcher('/payments', {}, token);

        setPayments(data);
      }

      setIsLoading(false);
    };

    fetch();
  }, [token]);

  return (
    <PaymentContext.Provider value={{ payments, isLoading, create, update, destroy }}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentProvider;
