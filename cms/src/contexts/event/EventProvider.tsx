import { useToast } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { CategoryContext } from 'contexts/category';
import { ImageContext } from 'contexts/image';
import { TalentContext } from 'contexts/talent';
import { deleteFetcher, getFetcher, postFetcher, putFetcher } from 'utils/fetcher';
import { getToken } from 'utils/storeToken';
import EventContext from './Event.context';

import type { IEvent, IEventPayload } from 'types/event';

type EventProviderProps = {
  children: React.ReactNode;
};

const EventProvider = ({ children }: EventProviderProps) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const categoriesCtx = useContext(CategoryContext);
  const talentsCtx = useContext(TalentContext);
  const imagesCtx = useContext(ImageContext);
  const toast = useToast();
  const token = getToken();

  const create = async (payload: IEventPayload) => {
    setIsLoading(true);

    try {
      const { data } = await postFetcher('/events', payload, token);

      const category = categoriesCtx.categories.find((category) => category._id === data.category);
      const talent = talentsCtx.talents.find((talent) => talent._id === data.talent);
      const image = { _id: imagesCtx.image?._id, url: imagesCtx.image?.url };

      const updatedEvents = [...events, { ...data, category, talent, image }];

      setEvents(updatedEvents);

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

      const category = categoriesCtx.categories.find((category) => category._id === data.category);
      const talent = talentsCtx.talents.find((talent) => talent._id === data.talent);
      const image = { _id: imagesCtx.image?._id, url: imagesCtx.image?.url };

      const updatedEvents = events.map((event) => {
        if (event._id === id) {
          return { ...data, category, talent, image };
        }

        return event;
      });

      setEvents(updatedEvents);

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

      const updatedEvents = events.map((event) => {
        if (event._id === id) {
          return { ...event, status: data.status };
        }

        return event;
      });

      setEvents(updatedEvents);

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

      const updatedEvents = events.filter((event) => event._id !== id);

      setEvents(updatedEvents);

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
    const fetch = async () => {
      setIsLoading(true);

      if (token) {
        const { data } = await getFetcher('/events', {}, token);

        setEvents(data);
      }

      setIsLoading(false);
    };

    fetch();
  }, [token]);

  return (
    <EventContext.Provider value={{ events, isLoading, create, update, toggle, destroy }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
