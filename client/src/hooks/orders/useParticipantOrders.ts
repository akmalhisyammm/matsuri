import useSWR from 'swr';

import { getFetcher } from 'utils/fetcher';
import { getToken } from 'utils/storeToken';

export const useParticipantOrders = () => {
  const token = getToken();

  const { data, error } = useSWR(['/orders', {}, token], getFetcher);

  return { data: data?.data, isLoading: !error && !data, isError: !!error };
};
