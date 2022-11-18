import { createContext } from 'react';

import type { ITalent, ITalentPayload } from 'types/talent';

interface ITalentContext {
  talents: ITalent[];
  isLoading: boolean;
  authorizedAccess: ('READ' | 'CREATE' | 'UPDATE' | 'DELETE')[];
  create: (payload: ITalentPayload) => void;
  update: (id: string, payload: ITalentPayload) => void;
  destroy: (id: string) => void;
}

const TalentContext = createContext<ITalentContext>({
  talents: [],
  isLoading: false,
  authorizedAccess: [],
  create: () => null,
  update: () => null,
  destroy: () => null,
});

export default TalentContext;
