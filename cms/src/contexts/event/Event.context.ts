import { createContext } from 'react';

import type { IEvent, IEventPayload } from 'types/event';

interface IEventContext {
  events: IEvent[];
  isLoading: boolean;
  authorizedAccess: ('READ' | 'CREATE' | 'UPDATE' | 'DELETE')[];
  create: (payload: IEventPayload) => void;
  update: (id: string, payload: IEventPayload) => void;
  toggle: (id: string) => void;
  destroy: (id: string) => void;
}

const TalentContext = createContext<IEventContext>({
  events: [],
  isLoading: false,
  authorizedAccess: [],
  create: () => null,
  update: () => null,
  toggle: () => null,
  destroy: () => null,
});

export default TalentContext;
