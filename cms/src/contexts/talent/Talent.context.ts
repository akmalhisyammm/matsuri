import { createContext } from 'react';

import type { ITalent } from 'types/talent';

interface ITalentContext {
  talents: ITalent[];
  isLoading: boolean;
  create: (name: string, role: string, imageId: string, imageUrl: string) => void;
  update: (id: string, name: string, role: string, imageId: string, imageUrl: string) => void;
  destroy: (id: string) => void;
}

const TalentContext = createContext<ITalentContext>({
  talents: [],
  isLoading: false,
  create: () => null,
  update: () => null,
  destroy: () => null,
});

export default TalentContext;
