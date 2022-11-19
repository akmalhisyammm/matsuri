import { useToast } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { EVENTS } from 'constants/access';
import { AuthContext } from 'contexts/auth';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authorizedAccess, setAuthorizedAccess] = useState<
    ('READ' | 'CREATE' | 'UPDATE' | 'DELETE')[]
  >([]);

  const authCtx = useContext(AuthContext);
  const categoriesCtx = useContext(CategoryContext);
  const talentsCtx = useContext(TalentContext);
  const imagesCtx = useContext(ImageContext);
  const toast = useToast();
  const token = getToken();

  const create = async (payload: IEventPayload) => {
    try {
      setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  const update = async (id: string, payload: IEventPayload) => {
    try {
      setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  const toggle = async (id: string) => {
    const currentStatus = events.find((event) => event._id === id)?.status;
    const payload = { status: currentStatus === 'Published' ? 'Draft' : 'Published' };

    try {
      setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  const destroy = async (id: string) => {
    try {
      setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      if (token) {
        try {
          setIsLoading(true);

          const { data } = await getFetcher('/events', {}, token);

          setEvents(data);
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
      const access = (Object.keys(EVENTS) as ('READ' | 'CREATE' | 'UPDATE' | 'DELETE')[]).filter(
        (key) => EVENTS[key as keyof typeof EVENTS].includes(authCtx.user?.role as string)
      );

      setAuthorizedAccess(access);
    }
  }, [authCtx.user]);

  return (
    <EventContext.Provider
      value={{ events, isLoading, authorizedAccess, create, update, toggle, destroy }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
