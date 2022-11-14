import { useToast } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';

import { getToken } from 'utils/storeToken';
import { deleteFetcher, getFetcher, postFetcher, putFetcher } from 'utils/fetcher';
import EventContext from './Event.context';

import type { IEvent, IEventPayload } from 'types/event';

type EventProviderProps = {
  children: React.ReactNode;
};

const EventProvider = ({ children }: EventProviderProps) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const token = getToken();

  const fetch = useCallback(async () => {
    setIsLoading(true);

    if (token) {
      const { data } = await getFetcher('/events', {}, token);

      setEvents(data);
    }

    setIsLoading(false);
  }, [token]);

  const create = async (payload: IEventPayload) => {
    setIsLoading(true);

    try {
      const { data } = await postFetcher('/events', payload, token);

      fetch();

      toast({
        title: 'Success',
        description: `Event has been created: ${data.title}`,
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

  const update = async (id: string, payload: IEventPayload) => {
    setIsLoading(true);

    try {
      const { data } = await putFetcher(`/events/${id}`, payload, token);

      fetch();

      toast({
        title: 'Success',
        description: `Event has been updated: ${data.title}`,
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

  const toggle = async (id: string) => {
    setIsLoading(true);

    const currentStatus = events.find((event) => event._id === id)?.status;
    const payload = { status: currentStatus === 'Published' ? 'Draft' : 'Published' };

    try {
      const { data } = await putFetcher(`/events/${id}/status`, payload, token);

      fetch();

      toast({
        title: 'Success',
        description: `Event status has been changed: ${data.title}`,
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
      const { data } = await deleteFetcher(`/events/${id}`, token);

      fetch();

      toast({
        title: 'Success',
        description: `Event has been deleted: ${data.title}`,
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
    fetch();
  }, [fetch, token]);

  return (
    <EventContext.Provider value={{ events, isLoading, create, update, toggle, destroy }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
