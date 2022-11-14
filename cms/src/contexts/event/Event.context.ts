import { createContext } from 'react';

import type { IEvent, IEventPayload } from 'types/event';

interface IEventContext {
  events: IEvent[];
  isLoading: boolean;
  create: (payload: IEventPayload) => void;
  update: (id: string, payload: IEventPayload) => void;
  toggle: (id: string) => void;
  destroy: (id: string) => void;
}

const TalentContext = createContext<IEventContext>({
  events: [],
  isLoading: false,
  create: () => null,
  update: () => null,
  toggle: () => null,
  destroy: () => null,
});

export default TalentContext;
