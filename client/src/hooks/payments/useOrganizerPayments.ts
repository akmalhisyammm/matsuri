import useSWR from 'swr';
import { getFetcher } from 'utils/fetcher';
import { getToken } from 'utils/storeToken';

export const useOrganizerPayments = (organizerId: string) => {
  const token = getToken();

  const { data, error } = useSWR([`/api/v1/payments/${organizerId}`, {}, token], getFetcher);

  return { data: data?.data, isLoading: !error && !data, isError: error };
};
