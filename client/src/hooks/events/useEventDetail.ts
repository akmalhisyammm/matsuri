import useSWR from 'swr';

import { getFetcher } from 'utils/fetcher';

export const useEventDetail = (eventId?: string) => {
  const { data, error } = useSWR(eventId ? `/events/${eventId}` : null, getFetcher);

  return { data: data?.data, isLoading: !error && !data, isError: !!error };
};
