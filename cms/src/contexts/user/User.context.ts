import { createContext } from 'react';

import type { IOtherUser, IOtherUserPayload } from 'types/user';

interface IUserContext {
  users: IOtherUser[];
  isLoading: boolean;
  authorizedAccess: ('READ' | 'CREATE' | 'UPDATE' | 'DELETE')[];
  create: (payload: IOtherUserPayload) => void;
  update: (id: string, payload: IOtherUserPayload) => void;
  destroy: (id: string) => void;
}

const UserContext = createContext<IUserContext>({
  users: [],
  isLoading: false,
  authorizedAccess: [],
  create: () => null,
  update: () => null,
  destroy: () => null,
});

export default UserContext;
