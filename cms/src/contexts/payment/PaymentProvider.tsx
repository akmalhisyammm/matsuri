import { useToast } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { PAYMENTS } from 'constants/access';
import { AuthContext } from 'contexts/auth';
import { ImageContext } from 'contexts/image';
import { getToken } from 'utils/storeToken';
import { deleteFetcher, getFetcher, postFetcher, putFetcher } from 'utils/fetcher';
import PaymentContext from './Payment.context';

import type { IPayment, IPaymentPayload } from 'types/payment';

type PaymentProviderProps = {
  children: React.ReactNode;
};

const PaymentProvider = ({ children }: PaymentProviderProps) => {
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authorizedAccess, setAuthorizedAccess] = useState<
    ('READ' | 'CREATE' | 'UPDATE' | 'DELETE')[]
  >([]);

  const authCtx = useContext(AuthContext);
  const imagesCtx = useContext(ImageContext);
  const toast = useToast();
  const token = getToken();

  const create = async (payload: IPaymentPayload) => {
    try {
      setIsLoading(true);

      const { data } = await postFetcher('/payments', payload, token);

      const image = { _id: imagesCtx.image?._id, url: imagesCtx.image?.url };

      const updatedPayments = [...payments, { ...data, image }];

      setPayments(updatedPayments);

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
    } finally {
      setIsLoading(false);
    }
  };

  const update = async (id: string, payload: IPaymentPayload) => {
    try {
      setIsLoading(true);

      const { data } = await putFetcher(`/payments/${id}`, payload, token);

      const image = { _id: imagesCtx.image?._id, url: imagesCtx.image?.url };

      const updatedPayments = payments.map((payment) => {
        if (payment._id === id) {
          return { ...data, image };
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
    } finally {
      setIsLoading(false);
    }
  };

  const destroy = async (id: string) => {
    try {
      setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      if (token) {
        try {
          setIsLoading(true);

          const { data } = await getFetcher('/payments', {}, token);

          setPayments(data);
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
      const access = (Object.keys(PAYMENTS) as ('READ' | 'CREATE' | 'UPDATE' | 'DELETE')[]).filter(
        (key) => PAYMENTS[key as keyof typeof PAYMENTS].includes(authCtx.user?.role as string)
      );

      setAuthorizedAccess(access);
    }
  }, [authCtx.user]);

  return (
    <PaymentContext.Provider
      value={{ payments, isLoading, authorizedAccess, create, update, destroy }}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentProvider;
