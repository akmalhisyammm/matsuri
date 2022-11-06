import useSWR from 'swr';
import { getFetcher } from 'utils/fetcher';

export const useEventList = () => {
  const { data, error } = useSWR('/api/v1/events', getFetcher);

  return { data: data?.data, isLoading: !error && !data, isError: error };
};
