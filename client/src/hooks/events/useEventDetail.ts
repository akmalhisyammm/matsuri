import useSWR from 'swr';
import { getFetcher } from 'utils/fetcher';

export const useEventDetail = (eventId: string) => {
  const { data, error } = useSWR(`/api/v1/events/${eventId}`, getFetcher);

  return { data: data?.data, isLoading: !error && !data, isError: error };
};
